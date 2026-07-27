import { useState } from "react";
import { useStore } from "../store";
import { deriveTobe, nameById, namesByIds } from "../lib/derive";
import { STATUS_FUTURO, OWNERS } from "../lib/constants";
import { Badge, Chips, PastaBar, pastaMatch } from "../ui";

export function ToBe() {
  const { db, upd } = useStore();
  const [pastaH, setPastaH] = useState<string | null>(null);
  const allRows = deriveTobe(db);
  const rows = allRows;
  const [f, setF] = useState({ operadora: "", atendimento: "", responsavel: "", status: "", owner: "", gap: "" });
  const [uowPick, setUowPick] = useState<string | null>(null);
  const [uowPos, setUowPos] = useState<{ top: number; left: number } | null>(null);
  const openUowPick = (e: any, rid: string) => {
    if (uowPick === rid) { setUowPick(null); return; }
    const rect = e.currentTarget.getBoundingClientRect();
    setUowPos({ top: rect.bottom + 4, left: rect.left });
    setUowPick(rid);
  };
  // Ordena por "sequência": primeiro o campo ordem do PROCESSO, agrupando as ações do mesmo
  // processo (mesmo quando dois processos têm o mesmo número), depois o campo ordem da AÇÃO.
  // Valores vazios/não numéricos vão para o fim.
  const parseOrd = (v?: string) => { const n = parseFloat(String(v ?? "").replace(",", ".")); return isNaN(n) ? Infinity : n; };
  const filtered = rows.filter((r) =>
    (!f.operadora || r.operadoras.includes(f.operadora)) && (!f.atendimento || r.tiposAtendimento.includes(f.atendimento)) &&
    (!f.responsavel || r.responsavel === f.responsavel) && (!f.status || r.statusFuturo === f.status) &&
    (!f.owner || r.owner === f.owner) && (f.gap === "" || (f.gap === "sim" ? r.isGap : !r.isGap)))
    .sort((a, b) => {
      const pa = parseOrd(a.proc?.ordem), pb = parseOrd(b.proc?.ordem);
      if (pa !== pb) return pa - pb;
      if (a.processo !== b.processo) return String(a.processo).localeCompare(String(b.processo));
      return parseOrd(a.ordem) - parseOrd(b.ordem);
    });
  const setStatus = (aid: string, val: string) => upd((d) => { const t = d.tobe[aid] || { statusFuturo: "", owner: "Hospital", uows: [], obs: "" }; t.statusFuturo = val; if (val !== "Executada pelo produto") t.uows = []; if (val === "Executada pelo produto") t.owner = "Rivio"; d.tobe[aid] = t; });
  const setOwner = (aid: string, val: string) => upd((d) => { const t = d.tobe[aid] || { statusFuturo: "Executada por ação humana", owner: val, uows: [], obs: "" }; t.owner = val; d.tobe[aid] = t; });
  const toggleUow = (aid: string, u: string) => upd((d) => { const t = d.tobe[aid] || { statusFuturo: "Executada pelo produto", owner: "Rivio", uows: [], obs: "" }; const cur = t.uows || []; t.uows = cur.includes(u) ? cur.filter((x) => x !== u) : [...cur, u]; d.tobe[aid] = t; });
  const setObs = (aid: string, val: string) => upd((d) => { const t = d.tobe[aid] || { statusFuturo: "Executada por ação humana", owner: "Hospital", uows: [], obs: "" }; t.obs = val; d.tobe[aid] = t; });

  return (
    <div>
      <div className="page-head"><div className="h1">To Be</div><p>Gerado a partir das ações do AS IS. Defina o status futuro, o owner (Rivio ou Hospital) e as Units of Work. Ação marcada como "Executada pelo produto" sem UoW vira Gap automaticamente.</p></div>
      <div className="filters">
        <select className="select-sm" value={f.operadora} onChange={(e) => setF({ ...f, operadora: e.target.value })}><option value="">Operadora</option>{db.operadoras.map((o) => <option key={o.id} value={o.id}>{o.nome}</option>)}</select>
        <select className="select-sm" value={f.atendimento} onChange={(e) => setF({ ...f, atendimento: e.target.value })}><option value="">Atendimento</option>{db.tiposAtendimento.map((o) => <option key={o.id} value={o.id}>{o.nome}</option>)}</select>
        <select className="select-sm" value={f.responsavel} onChange={(e) => setF({ ...f, responsavel: e.target.value })}><option value="">Responsável</option>{db.funcionarios.map((o) => <option key={o.id} value={o.id}>{o.nome}</option>)}</select>
        <select className="select-sm" value={f.status} onChange={(e) => setF({ ...f, status: e.target.value })}><option value="">Status futuro</option>{STATUS_FUTURO.map((s) => <option key={s}>{s}</option>)}</select>
        <select className="select-sm" value={f.owner} onChange={(e) => setF({ ...f, owner: e.target.value })}><option value="">Owner</option>{OWNERS.map((s) => <option key={s}>{s}</option>)}</select>
        <select className="select-sm" value={f.gap} onChange={(e) => setF({ ...f, gap: e.target.value })}><option value="">Gap?</option><option value="sim">Só gaps</option><option value="nao">Sem gap</option></select>
        <span className="chip" style={{ marginLeft: "auto" }}>{filtered.length} ações</span>
      </div>
      <div className="tbl-wrap"><div className="tbl-scroll"><table>
        <thead><tr><th>Ação</th><th>Processo</th><th>Sistema</th><th>Setor</th><th>Status futuro</th><th>Owner</th><th>Unit of Work / O que mudou</th><th>Gap</th></tr></thead>
        <tbody>{filtered.map((r) => (<tr key={r.id}>
          <td style={{ minWidth: 180 }}><div style={{ fontWeight: 600 }}>{r.ordem && <span className="chip" style={{ marginRight: 6 }} title="Sequência da ação">{r.ordem}</span>}{r.nome}</div></td>
          <td className="muted">{r.proc ? (<>{r.proc.ordem && <span className="chip" style={{ marginRight: 6 }} title="Sequência do processo">{r.proc.ordem}</span>}{r.proc.nome}</>) : "—"}</td>
          <td className="muted">{r.sistema ? nameById(db.sistemas, r.sistema) : "—"}</td>
          <td className="muted">{r.proc ? nameById(db.setores, r.proc.setor) : "—"}</td>
          <td><select className="select-sm" value={r.statusFuturo} onChange={(e) => setStatus(r.id, e.target.value)}>{STATUS_FUTURO.map((s) => <option key={s}>{s}</option>)}</select></td>
          <td><select className="select-sm" value={r.owner} onChange={(e) => setOwner(r.id, e.target.value)}>{OWNERS.map((s) => <option key={s}>{s}</option>)}</select></td>
          <td style={{ minWidth: 220 }}>{r.uows.length > 0 ? (<div>
            <div className="chips" style={{ marginBottom: 4 }}>{r.uows.map((u) => <span key={u} className="chip b-green">{nameById(db.unitsOfWork, u)}</span>)}</div>
            {r.statusFuturo === "Executada pelo produto" && <button className="btn ghost sm link" onClick={(e) => openUowPick(e, r.id)}>editar</button>}
          </div>) : (<div>
            {r.statusFuturo === "Executada pelo produto" && <button className="btn ghost sm link" onClick={(e) => openUowPick(e, r.id)} style={{ marginBottom: 4 }}>+ vincular UoW</button>}
            <textarea rows={2} placeholder="Sem UoW — o que mudou nessa ação? (Hospital ou Rivio)" value={r.obs} onChange={(e) => setObs(r.id, e.target.value)} style={{ width: "100%", fontSize: 11.5 }} />
          </div>)}</td>
          <td>{r.isGap ? <Badge cls="b-red">Gap</Badge> : <Badge cls="b-green">OK</Badge>}</td>
        </tr>))}
        {!filtered.length && <tr><td colSpan={8}><div className="empty">Nenhuma ação. Cadastre processos e ações no AS IS.</div></td></tr>}</tbody>
      </table></div></div>
      {uowPick && uowPos && (() => { const r = filtered.find((x) => x.id === uowPick); if (!r) return null; return (<>
        <div style={{ position: "fixed", inset: 0, zIndex: 39 }} onClick={() => setUowPick(null)} />
        <div className="card card-pad" style={{ position: "fixed", top: uowPos.top, left: uowPos.left, zIndex: 40, width: 300, maxHeight: 280, overflow: "auto", boxShadow: "var(--shadow-lg)" }}>
          {db.unitsOfWork.map((u) => (<label key={u.id} className="row" style={{ gap: 6, padding: "3px 0", cursor: "pointer" }}><input type="checkbox" checked={r.uows.includes(u.id)} onChange={() => toggleUow(r.id, u.id)} /><span style={{ fontSize: 12 }}>{u.id} · {u.nome}</span></label>))}
        </div>
      </>); })()}
    </div>
  );
}
