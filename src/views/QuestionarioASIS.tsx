import { useEffect, useState, type CSSProperties } from "react";
import { useStore } from "../store";
import { useAuth } from "../auth";
import { CHECKLIST, CHECKLIST_AREAS } from "../data/checklist";
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

// Comentário com estado local — só grava no Firebase ao sair do campo (evita escrever a cada tecla).
function ComentarioInput({ value, onCommit }: { value: string; onCommit: (v: string) => void }) {
  const [v, setV] = useState(value);
  useEffect(() => setV(value), [value]);
  return (
    <input type="text" value={v} placeholder="Observações…" style={{ width: "100%" }}
      onChange={(e) => setV(e.target.value)}
      onBlur={() => { if (v !== value) onCommit(v); }}
      onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }} />
  );
}

export function QuestionarioASIS() {
  const { db, upd } = useStore();
  const { user } = useAuth();
  const ans = (id: string): ChecklistAnswer => (db.checklist && db.checklist[id]) || EMPTY;
  const stamp = () => ({ editadoPor: user?.email || "—", editadoEm: new Date().toISOString().slice(0, 10) });

  const cycle = (id: string) => upd((d: DB) => {
    const cur: ChecklistAnswer = { ...EMPTY, ...(d.checklist[id] || {}) };
    cur.status = NEXT[cur.status || ""]; Object.assign(cur, stamp());
    d.checklist[id] = cur;
  });
  const setComentario = (id: string, val: string) => upd((d: DB) => {
    const cur: ChecklistAnswer = { ...EMPTY, ...(d.checklist[id] || {}) };
    cur.comentario = val; Object.assign(cur, stamp());
    d.checklist[id] = cur;
  });

  const total = CHECKLIST.length;
  const checked = CHECKLIST.filter((q) => ans(q.id).status === "check").length;
  const pend = CHECKLIST.filter((q) => ans(q.id).status === "x").length;
  const pct = total ? Math.round((checked / total) * 100) : 0;

  return (
    <div>
      <div className="page-head">
        <div className="h1">Questionário AS IS</div>
        <p>Guia de discovery do AS IS do hospital nas áreas do ciclo de receita (recepção, auditoria, autorização, faturamento, conciliação e glosa). Clique na caixa para alternar entre <b>vazio</b> → <b>✓ resolvido</b> → <b>✕ pendência</b>. Registre observações no comentário; à esquerda fica quem fez a última edição.</p>
      </div>

      <div className="row" style={{ gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <span className="badge b-green">✓ {checked} resolvidas</span>
        <span className="badge b-red">✕ {pend} pendências</span>
        <span className="chip">{checked}/{total} com check · {pct}%</span>
        <div className="bar-track" style={{ flex: 1, minWidth: 160, maxWidth: 320 }}>
          <div className="bar-fill" style={{ width: pct + "%", background: "#16a34a" }} />
        </div>
      </div>

      {CHECKLIST_AREAS.map((area) => {
        const items = CHECKLIST.filter((q) => q.area === area);
        if (!items.length) return null;
        const c = items.filter((q) => ans(q.id).status === "check").length;
        const p = items.filter((q) => ans(q.id).status === "x").length;
        return (
          <div className="card" key={area} style={{ overflow: "hidden", marginBottom: 14 }}>
            <div className="rel-col-h">
              <span>{area}</span>
              <span className="row" style={{ gap: 6 }}>
                {p > 0 && <span className="badge b-red">✕ {p}</span>}
                <span className="chip">{c}/{items.length} com check</span>
              </span>
            </div>
            <div className="tbl-scroll"><table>
              <thead><tr>
                <th style={{ width: 170 }}>Última edição</th>
                <th style={{ width: 60 }}>Check</th>
                <th>Pergunta</th>
                <th style={{ width: 300 }}>Comentário qualitativo</th>
              </tr></thead>
              <tbody>{items.map((q) => {
                const a = ans(q.id);
                return (
                  <tr key={q.id}>
                    <td className="dim" style={{ fontSize: 11 }}>
                      {a.editadoPor ? (<>{a.editadoPor}{a.editadoEm && <div style={{ opacity: 0.7 }}>{a.editadoEm}</div>}</>) : "—"}
                    </td>
                    <td><button style={boxStyle(a.status)} onClick={() => cycle(q.id)} title="Clique: vazio → ✓ resolvido → ✕ pendência">{a.status === "check" ? "✓" : a.status === "x" ? "✕" : ""}</button></td>
                    <td style={{ minWidth: 300 }}>{q.pergunta}</td>
                    <td><ComentarioInput value={a.comentario} onCommit={(v) => setComentario(q.id, v)} /></td>
                  </tr>
                );
              })}</tbody>
            </table></div>
          </div>
        );
      })}
    </div>
  );
}
