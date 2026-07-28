import { useStore } from "../store";
import { CHECK_AUDITORIA, CHECK_FDE } from "../data/testchecklists";
import { nameById, namesByIds } from "../lib/derive";
import { Badge } from "../ui";

const Stat = ({ label, val, color, sub }: any) => (
  <div className="stat"><div className="label">{label}</div><div className="val" style={color ? { color } : {}}>{val}</div>{sub && <div className="delta">{sub}</div>}</div>
);

export function DashTestes() {
  const { db } = useStore();
  const tst = (id: string) => (db.testChecklist && db.testChecklist[id] ? db.testChecklist[id].status : "") || "";
  const audIds = [...CHECK_AUDITORIA.map((q) => q.id), ...(db.testExtra || []).filter((e) => e.tipo === "aud").map((e) => e.id)];
  const fdeIds = [...CHECK_FDE.map((q) => q.id), ...(db.testExtra || []).filter((e) => e.tipo === "fde").map((e) => e.id)];
  const resumo = (ids: string[]) => ({ total: ids.length, ok: ids.filter((id) => tst(id) === "check").length, pend: ids.filter((id) => tst(id) === "x").length, vazio: ids.filter((id) => !tst(id)).length });
  const aud = resumo(audIds), fde = resumo(fdeIds);
  const regOk = db.regras.filter((r) => db.regraTestes && db.regraTestes[r.id] && db.regraTestes[r.id].status === "check").length;
  const regTotal = db.regras.length;
  const semRegra = db.pendencias.filter((p) => !(p.regras || []).length);
  const okGeral = aud.ok + fde.ok + regOk;
  const totalGeral = aud.total + fde.total + regTotal;
  const pctGeral = totalGeral ? Math.round((okGeral / totalGeral) * 100) : 0;

  const Barra = ({ label, s }: { label: string; s: { total: number; ok: number; pend: number; vazio: number } }) => (
    <div className="bar-row"><div className="bl">{label}</div>
      <div className="bar-track" style={{ display: "flex" }}>
        {s.ok > 0 && <div className="bar-fill" style={{ width: (s.ok / Math.max(1, s.total)) * 100 + "%", background: "#16a34a", borderRadius: 0, minWidth: 18 }} title={"Ok: " + s.ok}>{s.ok}</div>}
        {s.pend > 0 && <div className="bar-fill" style={{ width: (s.pend / Math.max(1, s.total)) * 100 + "%", background: "#dc2626", borderRadius: 0, minWidth: 18 }} title={"Pendência: " + s.pend}>{s.pend}</div>}
        {s.vazio > 0 && <div className="bar-fill" style={{ width: (s.vazio / Math.max(1, s.total)) * 100 + "%", background: "#c7cad1", color: "var(--text-2)", borderRadius: 0, minWidth: 18 }} title={"Não testado: " + s.vazio}>{s.vazio}</div>}
      </div>
      <div style={{ width: 64, textAlign: "right", fontSize: 12, fontWeight: 600 }}>{s.ok}/{s.total}</div>
    </div>
  );

  return (
    <div>
      <div className="page-head"><div className="h1">Dashboard · Testes</div><p>Status dos checklists de homologação (Auditoria e FDE), dos testes de cada regra e das pendências que ainda não têm regra associada.</p></div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
        <Stat label="Checklist Auditoria" val={aud.ok + "/" + aud.total} color="var(--green)" sub={aud.pend + " pendência(s)"} />
        <Stat label="Checklist FDE" val={fde.ok + "/" + fde.total} color="var(--green)" sub={fde.pend + " pendência(s)"} />
        <Stat label="Testes de regra" val={regOk + "/" + regTotal} color="var(--brand)" sub="marcados como Ok" />
        <Stat label="Progresso geral" val={pctGeral + "%"} color="var(--brand)" sub={okGeral + "/" + totalGeral + " ok"} />
        <Stat label="Pendências sem regra" val={semRegra.length} color="var(--red)" sub="precisam de regra" />
      </div>

      <div className="card card-pad" style={{ marginTop: 14 }}>
        <div className="between" style={{ marginBottom: 12 }}><div className="h2">Status dos testes</div>
          <div className="tag-legend"><span><span className="dot" style={{ background: "#16a34a" }} /> Ok</span><span><span className="dot" style={{ background: "#dc2626" }} /> Pendência</span><span><span className="dot" style={{ background: "#c7cad1" }} /> Não testado</span></div></div>
        <Barra label="Checklist Auditoria" s={aud} />
        <Barra label="Checklist FDE" s={fde} />
        <Barra label="Testes de regra" s={{ total: regTotal, ok: regOk, pend: 0, vazio: regTotal - regOk }} />
      </div>

      <div className="card" style={{ marginTop: 16, overflow: "hidden" }}>
        <div className="rel-col-h">Pendências sem regra associada <span className="chip">{semRegra.length}</span></div>
        <div className="tbl-scroll" style={{ maxHeight: 420 }}><table>
          <thead><tr><th>Pendência</th><th>Setor</th><th>Operadoras</th><th>Responsável</th><th>Status</th><th>Alerta e-mail</th></tr></thead>
          <tbody>{semRegra.map((p) => (<tr key={p.id}>
            <td style={{ fontWeight: 600, minWidth: 180 }}>{p.nome}</td>
            <td className="muted">{p.setor ? nameById(db.setores, p.setor) : "—"}</td>
            <td><span className="chips">{namesByIds(db.operadoras, p.operadorasAplicaveis || []).map((n, i) => <span className="chip" key={i}>{n}</span>)}</span></td>
            <td className="muted">{p.responsavel || "—"}</td>
            <td>{p.status ? <Badge cls="b-gray">{p.status}</Badge> : "—"}</td>
            <td>{p.alertaEmail ? <Badge cls="b-blue">Sim</Badge> : <span className="dim">Não</span>}</td>
          </tr>))}
          {!semRegra.length && <tr><td colSpan={6}><div className="empty">Todas as pendências têm ao menos uma regra associada.</div></td></tr>}</tbody>
        </table></div>
      </div>
    </div>
  );
}
