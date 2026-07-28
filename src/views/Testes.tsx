import { useEffect, useState, type CSSProperties } from "react";
import { useStore } from "../store";
import { useAuth } from "../auth";
import { CHECK_AUDITORIA, CHECK_AUDITORIA_SECOES, CHECK_FDE, CHECK_FDE_SECOES, type TestChecklistItem } from "../data/testchecklists";
import { regraStatusClass } from "../lib/constants";
import { StatusBadge } from "../ui";
import type { DB, ChecklistAnswer } from "../types";

const EMPTY: ChecklistAnswer = { status: "", comentario: "", editadoPor: "", editadoEm: "" };
const NEXT: Record<string, string> = { "": "check", check: "x", x: "" };

const boxStyle = (st: string): CSSProperties => ({
  width: 26, height: 26, borderRadius: 6, lineHeight: 1, fontSize: 15, fontWeight: 800, cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
  border: "1.5px solid " + (st === "check" ? "#16a34a" : st === "x" ? "#dc2626" : "var(--border-strong)"),
  background: st === "check" ? "var(--green-soft)" : st === "x" ? "var(--red-soft)" : "#fff",
  color: st === "check" ? "#15803d" : st === "x" ? "#b91c1c" : "var(--text-3)",
});
const boxBin = (on: boolean): CSSProperties => ({
  width: 26, height: 26, borderRadius: 6, lineHeight: 1, fontSize: 15, fontWeight: 800, cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
  border: "1.5px solid " + (on ? "#16a34a" : "var(--border-strong)"),
  background: on ? "var(--green-soft)" : "#fff", color: on ? "#15803d" : "var(--text-3)",
});

function ComentarioInput({ value, onCommit, placeholder }: { value: string; onCommit: (v: string) => void; placeholder: string }) {
  const [v, setV] = useState(value);
  useEffect(() => setV(value), [value]);
  return (
    <input type="text" value={v} placeholder={placeholder} style={{ width: "100%" }}
      onChange={(e) => setV(e.target.value)}
      onBlur={() => { if (v !== value) onCommit(v); }}
      onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }} />
  );
}

function ChecklistSection({ items, secoes }: { items: TestChecklistItem[]; secoes: string[] }) {
  const { db, upd } = useStore();
  const { user } = useAuth();
  const ans = (id: string): ChecklistAnswer => (db.testChecklist && db.testChecklist[id]) || EMPTY;
  const stamp = () => ({ editadoPor: user?.email || "—", editadoEm: new Date().toISOString().slice(0, 10) });
  const cycle = (id: string) => upd((d: DB) => { const c: ChecklistAnswer = { ...EMPTY, ...(d.testChecklist[id] || {}) }; c.status = NEXT[c.status || ""]; Object.assign(c, stamp()); d.testChecklist[id] = c; });
  const setC = (id: string, v: string) => upd((d: DB) => { const c: ChecklistAnswer = { ...EMPTY, ...(d.testChecklist[id] || {}) }; c.comentario = v; Object.assign(c, stamp()); d.testChecklist[id] = c; });
  const checked = items.filter((q) => ans(q.id).status === "check").length;
  const pend = items.filter((q) => ans(q.id).status === "x").length;
  return (
    <div>
      <div className="row" style={{ gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        <span className="badge b-green">✓ {checked} ok</span>
        <span className="badge b-red">✕ {pend} pendências</span>
        <span className="chip">{checked}/{items.length}</span>
      </div>
      {secoes.map((sec) => {
        const its = items.filter((i) => i.secao === sec);
        if (!its.length) return null;
        const c = its.filter((q) => ans(q.id).status === "check").length;
        return (
          <div className="card" key={sec} style={{ overflow: "hidden", marginBottom: 12 }}>
            <div className="rel-col-h"><span>{sec}</span><span className="chip">{c}/{its.length}</span></div>
            <div className="tbl-scroll"><table>
              <thead><tr><th style={{ width: 170 }}>Última edição</th><th style={{ width: 60 }}>Check</th><th>Pergunta</th><th style={{ width: 300 }}>Comentário</th></tr></thead>
              <tbody>{its.map((q) => { const a = ans(q.id); return (
                <tr key={q.id}>
                  <td className="dim" style={{ fontSize: 11 }}>{a.editadoPor ? (<>{a.editadoPor}{a.editadoEm && <div style={{ opacity: 0.7 }}>{a.editadoEm}</div>}</>) : "—"}</td>
                  <td><button style={boxStyle(a.status)} onClick={() => cycle(q.id)} title="Clique: vazio → ✓ → ✕">{a.status === "check" ? "✓" : a.status === "x" ? "✕" : ""}</button></td>
                  <td style={{ minWidth: 300 }}>{q.pergunta}</td>
                  <td><ComentarioInput value={a.comentario} onCommit={(v) => setC(q.id, v)} placeholder="Observações…" /></td>
                </tr>
              ); })}</tbody>
            </table></div>
          </div>
        );
      })}
    </div>
  );
}

function RegraTestSection() {
  const { db, upd } = useStore();
  const { user } = useAuth();
  const ans = (id: string): ChecklistAnswer => (db.regraTestes && db.regraTestes[id]) || EMPTY;
  const stamp = () => ({ editadoPor: user?.email || "—", editadoEm: new Date().toISOString().slice(0, 10) });
  // Ao desmarcar o teste, se a regra estava Ativa, volta para "Em teste" (regra só é Ativa com teste Ok).
  const toggle = (rid: string) => upd((d: DB) => {
    const c: ChecklistAnswer = { ...EMPTY, ...(d.regraTestes[rid] || {}) };
    const novo = c.status === "check" ? "" : "check";
    c.status = novo; Object.assign(c, stamp()); d.regraTestes[rid] = c;
    if (novo !== "check") { const r = d.regras.find((x) => x.id === rid); if (r && r.status === "Ativa") r.status = "Em teste"; }
  });
  const setC = (rid: string, v: string) => upd((d: DB) => { const c: ChecklistAnswer = { ...EMPTY, ...(d.regraTestes[rid] || {}) }; c.comentario = v; Object.assign(c, stamp()); d.regraTestes[rid] = c; });
  const ok = db.regras.filter((r) => ans(r.id).status === "check").length;
  return (
    <div>
      <div className="between" style={{ marginBottom: 10 }}>
        <div className="h2">Testes de regra <span className="dim" style={{ fontWeight: 400, fontSize: 11 }}>· a regra só fica Ativa (aba Regras) com o teste marcado como Ok</span></div>
        <span className="chip">{ok}/{db.regras.length} ok</span>
      </div>
      <div className="tbl-wrap"><div className="tbl-scroll"><table>
        <thead><tr><th style={{ width: 170 }}>Última edição</th><th style={{ width: 60 }}>Ok</th><th>Regra</th><th style={{ width: 110 }}>Status</th><th style={{ width: 320 }}>Contas testadas</th></tr></thead>
        <tbody>{db.regras.map((r) => { const a = ans(r.id); const on = a.status === "check"; return (
          <tr key={r.id}>
            <td className="dim" style={{ fontSize: 11 }}>{a.editadoPor ? (<>{a.editadoPor}{a.editadoEm && <div style={{ opacity: 0.7 }}>{a.editadoEm}</div>}</>) : "—"}</td>
            <td><button style={boxBin(on)} onClick={() => toggle(r.id)} title="Marcar teste como Ok">{on ? "✓" : ""}</button></td>
            <td style={{ fontWeight: 600, minWidth: 180 }}>{r.nome}</td>
            <td><StatusBadge s={r.status} fn={regraStatusClass} /></td>
            <td><ComentarioInput value={a.comentario} onCommit={(v) => setC(r.id, v)} placeholder="Contas testadas…" /></td>
          </tr>
        ); })}
        {!db.regras.length && <tr><td colSpan={5}><div className="empty">Nenhuma regra cadastrada.</div></td></tr>}</tbody>
      </table></div></div>
    </div>
  );
}

export function Testes() {
  const [tab, setTab] = useState<"aud" | "fde" | "regras">("aud");
  return (
    <div>
      <div className="page-head"><div className="h1">Testes</div><p>Homologação em três frentes: checklist de Auditoria, checklist de Integrações (FDE) e o teste de cada regra criada. Clique na caixa para alternar (vazio → ✓ → ✕ nos checklists; ✓ Ok nos testes de regra).</p></div>
      <div className="chips" style={{ marginBottom: 16 }}>
        <button className={"ce-pill " + (tab === "aud" ? "active" : "")} onClick={() => setTab("aud")}>Checklist Auditoria</button>
        <button className={"ce-pill " + (tab === "fde" ? "active" : "")} onClick={() => setTab("fde")}>Checklist FDE</button>
        <button className={"ce-pill " + (tab === "regras" ? "active" : "")} onClick={() => setTab("regras")}>Testes de regra</button>
      </div>
      {tab === "aud" && <ChecklistSection items={CHECK_AUDITORIA} secoes={CHECK_AUDITORIA_SECOES} />}
      {tab === "fde" && <ChecklistSection items={CHECK_FDE} secoes={CHECK_FDE_SECOES} />}
      {tab === "regras" && <RegraTestSection />}
    </div>
  );
}
