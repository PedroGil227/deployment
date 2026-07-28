import { useState } from "react";
import { useStore } from "../store";
import { deriveTobe, deriveGaps, nameById } from "../lib/derive";
import { PRIORIDADES, REGRA_STATUS, STATUS_WEIGHT, regraStatusClass } from "../lib/constants";
import { Badge, StatusBadge, Chips } from "../ui";

const Stat = ({ label, val, color, sub }: any) => (
  <div className="stat"><div className="label">{label}</div><div className="val" style={color ? { color } : {}}>{val}</div>{sub && <div className="delta">{sub}</div>}</div>
);

export function DashProcesso({ go }: { go: (v: string) => void }) {
  const { db } = useStore();
  const rows = deriveTobe(db);
  const total = rows.length;
  const cobertas = rows.filter((r) => r.cobre).length;
  const humanas = rows.filter((r) => r.statusFuturo === "Executada por ação humana").length;
  const eliminadas = rows.filter((r) => r.statusFuturo === "Eliminada").length;
  const descobertas = rows.filter((r) => r.isGap).length;
  const pct = total ? Math.round((cobertas / total) * 100) : 0;
  const setores = db.setores.map((s) => {
    const rr = rows.filter((r) => r.proc && r.proc.setor === s.id);
    return { nome: s.nome, total: rr.length, cob: rr.filter((r) => r.cobre).length, hum: rr.filter((r) => r.statusFuturo === "Executada por ação humana").length, eli: rr.filter((r) => r.statusFuturo === "Eliminada").length, gap: rr.filter((r) => r.isGap).length };
  }).filter((s) => s.total > 0);
  const procs = db.processos.map((p) => { const rr = rows.filter((r) => r.processo === p.id); return { nome: p.nome, total: rr.length, cob: rr.filter((r) => r.cobre).length }; }).filter((p) => p.total > 0);

  return (
    <div>
      <div className="page-head"><div className="h1">Dashboard · Processo</div><p>Análise do fluxo AS IS: volume de ações, quanto já é coberto pelo produto e quebras por setor e processo.</p></div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(6,1fr)" }}>
        <Stat label="Processos" val={db.processos.length} />
        <Stat label="Total de ações" val={total} />
        <Stat label="Cobertas por produto" val={cobertas} color="var(--green)" />
        <Stat label="Ação humana" val={humanas} color="var(--blue)" />
        <Stat label="Eliminadas" val={eliminadas} color="var(--text-2)" />
        <Stat label="% cobertura" val={pct + "%"} color="var(--brand)" />
      </div>
      {total === 0 && <div className="card card-pad" style={{ marginTop: 14 }} ><div className="dim">Nenhum processo/ação cadastrado ainda. Vá em <b>AS IS · Fluxo</b> para começar a mapear.</div></div>}
      {total > 0 && <div className="card card-pad" style={{ marginTop: 14 }}>
        <div className="between" style={{ marginBottom: 10 }}><div className="h2">Distribuição das ações (To Be)</div>
          <div className="tag-legend"><span><span className="dot" style={{ background: "#16a34a" }} /> Produto</span><span><span className="dot" style={{ background: "#2563eb" }} /> Humano</span><span><span className="dot" style={{ background: "#8b8f98" }} /> Eliminada</span><span><span className="dot" style={{ background: "#dc2626" }} /> Gap</span></div></div>
        <div className="progress" style={{ height: 14 }}>
          <span style={{ width: (cobertas / total) * 100 + "%", background: "#16a34a" }} />
          <span style={{ width: (humanas / total) * 100 + "%", background: "#2563eb" }} />
          <span style={{ width: (eliminadas / total) * 100 + "%", background: "#8b8f98" }} />
          <span style={{ width: (descobertas / total) * 100 + "%", background: "#dc2626" }} />
        </div>
        {descobertas > 0 && <div className="dim" style={{ fontSize: 11.5, marginTop: 8 }}>{descobertas} ação(ões) marcada(s) como produto sem UoW → <span className="link" onClick={() => go("gaps")}>ver gaps</span></div>}
      </div>}
      {total > 0 && <div className="grid" style={{ gridTemplateColumns: "1.4fr 1fr", marginTop: 18, alignItems: "start" }}>
        <div className="card" style={{ overflow: "hidden" }}>
          <div className="rel-col-h">Quebra por setor</div>
          <div className="tbl-scroll"><table><thead><tr><th>Setor</th><th>Ações</th><th>Produto</th><th>Humano</th><th>Elimin.</th><th>Gap</th><th>% cob.</th></tr></thead>
            <tbody>{setores.map((s) => (<tr key={s.nome}><td style={{ fontWeight: 600 }}>{s.nome}</td><td>{s.total}</td><td><span className="badge b-green">{s.cob}</span></td><td>{s.hum}</td><td>{s.eli}</td><td>{s.gap ? <span className="badge b-red">{s.gap}</span> : 0}</td><td>{s.total ? Math.round((s.cob / s.total) * 100) : 0}%</td></tr>))}</tbody></table></div>
        </div>
        <div className="card card-pad">
          <div className="h2" style={{ marginBottom: 12 }}>Cobertura por processo</div>
          {procs.map((p) => (<div className="bar-row" key={p.nome}><div className="bl" title={p.nome} style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.nome}</div><div className="bar-track"><div className="bar-fill" style={{ width: (p.total ? (p.cob / p.total) * 100 : 0) + "%", background: "#4f46e5" }}>{p.cob}/{p.total}</div></div></div>))}
        </div>
      </div>}
    </div>
  );
}

export function DashRegras() {
  const { db } = useStore();
  const [modo, setModo] = useState<"ponderada" | "absoluta">("ponderada");
  const escopos = db.escopos;
  const pesoTotal = escopos.reduce((s, e) => s + (e.peso || 0), 0);
  const rulesFor = (eid: string) => db.regras.filter((r) => (r.escopos || []).includes(eid));
  const lista = escopos.map((e) => {
    const rs = rulesFor(e.id);
    const coberto = rs.some((r) => r.status === "Ativa");
    return { ...e, rules: rs, coberto };
  });
  const totalEscopos = escopos.length;
  const cobAbs = lista.filter((e) => e.coberto).length;
  const cobPeso = lista.filter((e) => e.coberto).reduce((s, e) => s + (e.peso || 0), 0);
  const pctPnd = pesoTotal ? Math.round((cobPeso / pesoTotal) * 100) : 0;
  const pctAbs = totalEscopos ? Math.round((cobAbs / totalEscopos) * 100) : 0;
  const pctSel = modo === "ponderada" ? pctPnd : pctAbs;
  const byStatus = REGRA_STATUS.map((s) => ({ s, n: db.regras.filter((r) => r.status === s).length }));
  const byItem = db.itensConta.map((i) => {
    const es = lista.filter((e) => e.itemConta === i.id);
    const ativo = es.filter((e) => e.coberto).length;
    const parcial = es.filter((e) => !e.coberto && e.rules.length > 0).length;
    const sem = es.filter((e) => e.rules.length === 0).length;
    return { nome: i.nome, total: es.length, ativo, parcial, sem };
  }).filter((x) => x.total > 0);
  const byItemMax = Math.max(1, ...byItem.map((x) => x.total));

  return (
    <div>
      <div className="page-head"><div className="h1">Dashboard · Regras</div><p>Penetração das regras sobre os escopos. Um escopo é considerado <b>coberto</b> quando tem ao menos uma regra <b>Ativa</b>. Alterne entre a penetração <b>absoluta</b> (contagem de escopos) e a <b>ponderada</b> (pelo peso de cada escopo).</p></div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(5,1fr)" }}>
        <Stat label="Escopos" val={totalEscopos} />
        <Stat label="Cobertos (regra ativa)" val={cobAbs} color="var(--green)" />
        <Stat label="Regras criadas" val={db.regras.length} />
        <Stat label="Peso total" val={pesoTotal} sub="soma dos pesos" />
        <Stat label={"Penetração " + modo} val={pctSel + "%"} color="var(--brand)" sub={modo === "ponderada" ? Math.round(cobPeso) + "/" + pesoTotal + " de peso" : cobAbs + "/" + totalEscopos + " escopos"} />
      </div>
      <div className="card card-pad" style={{ marginTop: 14 }}>
        <div className="between" style={{ marginBottom: 10 }}>
          <div className="h2">Penetração (só regras ativas)</div>
          <div className="row" style={{ gap: 4 }}>
            <button className={"btn sm" + (modo === "ponderada" ? " primary" : "")} onClick={() => setModo("ponderada")}>Ponderada</button>
            <button className={"btn sm" + (modo === "absoluta" ? " primary" : "")} onClick={() => setModo("absoluta")}>Absoluta</button>
          </div>
        </div>
        <div className="bar-row"><div className="bl">Ponderada (peso)</div><div className="bar-track"><div className="bar-fill" style={{ width: pctPnd + "%", background: modo === "ponderada" ? "#4f46e5" : "#c7cad1" }}>{Math.round(cobPeso)}/{pesoTotal} · {pctPnd}%</div></div></div>
        <div className="bar-row"><div className="bl">Absoluta (contagem)</div><div className="bar-track"><div className="bar-fill" style={{ width: pctAbs + "%", background: modo === "absoluta" ? "#4f46e5" : "#c7cad1" }}>{cobAbs}/{totalEscopos} · {pctAbs}%</div></div></div>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", marginTop: 16, alignItems: "start" }}>
        <div className="card card-pad"><div className="h2" style={{ marginBottom: 12 }}>Regras por status</div>
          {byStatus.map((x) => (<div className="bar-row" key={x.s}><div className="bl">{x.s}</div><div className="bar-track"><div className="bar-fill" style={{ width: (db.regras.length ? (x.n / db.regras.length) * 100 : 0) + "%", background: x.s === "Ativa" ? "#16a34a" : x.s === "Em teste" ? "#d97706" : "#8b8f98" }}>{x.n}</div></div></div>))}
        </div>
        <div className="card card-pad">
          <div className="between" style={{ marginBottom: 12 }}><div className="h2">Escopos por item da conta</div>
            <div className="tag-legend"><span><span className="dot" style={{ background: "#16a34a" }} /> Regra ativa</span><span><span className="dot" style={{ background: "#d97706" }} /> Não ativa</span><span><span className="dot" style={{ background: "#8b8f98" }} /> Sem regra</span></div></div>
          {byItem.length ? byItem.map((x) => (<div className="bar-row" key={x.nome}><div className="bl" title={x.nome} style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{x.nome}</div>
            <div className="bar-track" style={{ display: "flex" }}>
              {x.ativo > 0 && <div className="bar-fill" style={{ width: (x.ativo / byItemMax) * 100 + "%", background: "#16a34a", borderRadius: 0, minWidth: 20 }} title={"Regra ativa: " + x.ativo}>{x.ativo}</div>}
              {x.parcial > 0 && <div className="bar-fill" style={{ width: (x.parcial / byItemMax) * 100 + "%", background: "#d97706", borderRadius: 0, minWidth: 20 }} title={"Regra não ativa: " + x.parcial}>{x.parcial}</div>}
              {x.sem > 0 && <div className="bar-fill" style={{ width: (x.sem / byItemMax) * 100 + "%", background: "#8b8f98", borderRadius: 0, minWidth: 20 }} title={"Sem regra: " + x.sem}>{x.sem}</div>}
            </div></div>)) : <div className="dim">Sem escopos.</div>}
        </div>
      </div>
      <div className="card" style={{ marginTop: 16, overflow: "hidden" }}>
        <div className="rel-col-h">Escopos e regra de cobertura</div>
        <div className="tbl-scroll" style={{ maxHeight: 420 }}><table><thead><tr><th>Escopo</th><th>Item da conta</th><th>Peso</th><th>Regra que cobre</th><th>Status regra</th><th>Cobertura</th></tr></thead>
          <tbody>{lista.map((e) => (<tr key={e.id}>
            <td style={{ fontWeight: 600, minWidth: 200 }}>{e.nome}</td>
            <td className="muted">{nameById(db.itensConta, e.itemConta)}</td>
            <td>{e.peso}</td>
            <td>{e.rules.length ? <Chips items={e.rules.map((r) => r.nome)} /> : <span className="badge b-red">Sem regra</span>}</td>
            <td>{e.rules.length ? <div className="chips">{e.rules.map((r) => <StatusBadge key={r.id} s={r.status} fn={regraStatusClass} />)}</div> : "—"}</td>
            <td>{e.coberto ? <Badge cls="b-green">Coberto</Badge> : e.rules.length ? <Badge cls="b-amber">Regra não ativa</Badge> : <Badge cls="b-red">Sem regra</Badge>}</td>
          </tr>))}
          {!lista.length && <tr><td colSpan={6}><div className="empty">Nenhum escopo.</div></td></tr>}</tbody>
        </table></div>
      </div>
    </div>
  );
}
