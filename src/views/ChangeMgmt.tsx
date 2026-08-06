import { useState } from "react";
import { useStore } from "../store";
import { deriveTobe, nameById, namesByIds } from "../lib/derive";
import { STATUS_FUTURO, OWNERS, futuroClass, ownerClass } from "../lib/constants";
import { StatusBadge, Badge, Chips, FilterMulti, anySel, inSel } from "../ui";

export function ChangeMgmt() {
  const { db } = useStore();
  const [pastaH, setPastaH] = useState<string | null>(null);
  const allRows = deriveTobe(db);
  const rows = allRows;
  const [f, setF] = useState<{ owner: string[]; status: string[]; setor: string[] }>({ owner: [], status: [], setor: [] });
  const parseOrd = (v?: string) => { const n = parseFloat(String(v ?? "").replace(",", ".")); return isNaN(n) ? Infinity : n; };
  const filtered = rows.filter((r) => inSel(f.owner, r.owner) && inSel(f.status, r.statusFuturo) && (!f.setor.length || (r.proc ? f.setor.includes(r.proc.setor) : false)))
    .sort((a, b) => {
      const pa = parseOrd(a.proc?.ordem), pb = parseOrd(b.proc?.ordem);
      if (pa !== pb) return pa - pb;
      if (a.processo !== b.processo) return String(a.processo).localeCompare(String(b.processo));
      return parseOrd(a.ordem) - parseOrd(b.ordem);
    });
  const rivio = rows.filter((r) => r.owner === "Rivio").length;
  const hosp = rows.filter((r) => r.owner === "Hospital").length;
  const eli = rows.filter((r) => r.statusFuturo === "Eliminada").length;
  const auto = rows.filter((r) => r.cobre).length;
  const impacto = (r: any) => r.statusFuturo === "Eliminada" ? { t: "Atividade removida", c: "b-red" } : r.statusFuturo === "Executada pelo produto" ? { t: r.cobre ? "Automação (produto)" : "Automação pendente (sem UoW)", c: r.cobre ? "b-green" : "b-amber" } : { t: "Mantida com equipe", c: "b-blue" };
  const Stat = ({ label, val, color }: any) => (<div className="stat"><div className="label">{label}</div><div className="val" style={color ? { color } : {}}>{val}</div></div>);

  return (
    <div>
      <div className="page-head"><div className="h1">Change Management</div><p>Plano de transição: o que muda em cada ação, quem assume (Rivio ou Hospital) e o impacto operacional por setor. Base para comunicação e treinamento na virada AS IS → To Be.</p></div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
        <Stat label="Ações assumidas pela Rivio" val={rivio} color="var(--purple)" />
        <Stat label="Mantidas pelo Hospital" val={hosp} color="var(--blue)" />
        <Stat label="Automatizadas (produto)" val={auto} color="var(--green)" />
        <Stat label="Atividades eliminadas" val={eli} color="var(--text-2)" />
      </div>
      <div className="filters" style={{ marginTop: 16 }}>
        <FilterMulti label="Owner" options={OWNERS.map((s) => ({ id: s, nome: s }))} value={f.owner} onChange={(v) => setF({ ...f, owner: v })} />
        <FilterMulti label="Status futuro" options={STATUS_FUTURO.map((s) => ({ id: s, nome: s }))} value={f.status} onChange={(v) => setF({ ...f, status: v })} />
        <FilterMulti label="Setor" options={db.setores} value={f.setor} onChange={(v) => setF({ ...f, setor: v })} />
        <span className="chip" style={{ marginLeft: "auto" }}>{filtered.length} mudanças</span>
      </div>
      <div className="tbl-wrap"><div className="tbl-scroll"><table>
        <thead><tr><th>Ação</th><th>Processo</th><th>Setor</th><th>Status futuro</th><th>Owner</th><th>Impacto</th><th>Unit of Work</th></tr></thead>
        <tbody>{filtered.map((r) => { const im = impacto(r); return (<tr key={r.id}>
          <td style={{ fontWeight: 600, minWidth: 180 }}>{r.ordem && <span className="chip" style={{ marginRight: 6 }} title="Sequência da ação">{r.ordem}</span>}{r.nome}</td>
          <td className="muted">{r.proc ? (<>{r.proc.ordem && <span className="chip" style={{ marginRight: 6 }} title="Sequência do processo">{r.proc.ordem}</span>}{r.proc.nome}</>) : "—"}</td>
          <td className="muted">{r.proc ? nameById(db.setores, r.proc.setor) : "—"}</td>
          <td><StatusBadge s={r.statusFuturo} fn={futuroClass} /></td>
          <td><Badge cls={ownerClass(r.owner)}>{r.owner}</Badge></td>
          <td><Badge cls={im.c}>{im.t}</Badge></td>
          <td><Chips items={namesByIds(db.unitsOfWork, r.uows)} /></td>
        </tr>); })}
        {!filtered.length && <tr><td colSpan={7}><div className="empty">Sem ações mapeadas.</div></td></tr>}</tbody>
      </table></div></div>
    </div>
  );
}
