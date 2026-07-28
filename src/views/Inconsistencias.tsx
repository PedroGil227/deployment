import { useState } from "react";
import { useStore } from "../store";
import { uid } from "../lib/derive";
import { Badge, Modal, Field, FilterMulti, inSel, Ic, icons } from "../ui";
import type { DB } from "../types";

const STATUS = ["Pendente", "Resolvido"];

export function Inconsistencias() {
  const { db, upd } = useStore();
  const [q, setQ] = useState("");
  const [fs, setFs] = useState<string[]>([]);
  const [edit, setEdit] = useState<any>(null);
  const items = db.inconsistencias.filter((i) => inSel(fs, i.status || "Pendente") && (!q || (i.nome + " " + (i.descricao || "") + " " + (i.planoAcao || "")).toLowerCase().includes(q.toLowerCase())));
  const pend = db.inconsistencias.filter((i) => (i.status || "Pendente") !== "Resolvido").length;
  return (
    <div>
      <div className="page-head"><div className="h1">Inconsistências</div><p>Registro de inconsistências encontradas durante a implantação, com plano de ação e status.</p></div>
      <div className="filters">
        <input type="text" placeholder="Buscar…" value={q} onChange={(e) => setQ(e.target.value)} style={{ width: 220 }} />
        <FilterMulti label="Status" options={STATUS.map((s) => ({ id: s, nome: s }))} value={fs} onChange={setFs} />
        <span className="badge b-amber">{pend} pendente(s)</span>
        <span className="chip">{items.length}</span>
        <button className="btn primary sm" style={{ marginLeft: "auto" }} onClick={() => setEdit({})}><Ic d={icons.plus} size={13} />Nova inconsistência</button>
      </div>
      <div className="tbl-wrap"><div className="tbl-scroll"><table>
        <thead><tr><th>Inconsistência</th><th>Descrição</th><th>Plano de ação</th><th>Status</th><th /></tr></thead>
        <tbody>{items.map((i) => (<tr key={i.id}>
          <td style={{ fontWeight: 600, minWidth: 170 }}>{i.nome}</td>
          <td className="muted" style={{ minWidth: 200, maxWidth: 340, fontSize: 12.5 }}>{i.descricao}</td>
          <td className="muted" style={{ minWidth: 200, maxWidth: 340, fontSize: 12.5 }}>{i.planoAcao}</td>
          <td><Badge cls={i.status === "Resolvido" ? "b-green" : "b-amber"}>{i.status || "Pendente"}</Badge></td>
          <td><div className="row" style={{ gap: 4 }}><button className="btn ghost sm" onClick={() => setEdit(i)}>Editar</button><button className="btn ghost sm danger" onClick={() => { if (confirm('Excluir "' + i.nome + '"?')) upd((d: DB) => { d.inconsistencias = d.inconsistencias.filter((x) => x.id !== i.id); }); }}>×</button></div></td>
        </tr>))}
        {!items.length && <tr><td colSpan={5}><div className="empty">Nenhuma inconsistência cadastrada.</div></td></tr>}</tbody>
      </table></div></div>
      {edit && <IncEditor inc={edit} onClose={() => setEdit(null)} onSave={(data: any) => { upd((d: DB) => { if (edit.id) Object.assign(d.inconsistencias.find((x) => x.id === edit.id)!, data); else d.inconsistencias.push({ id: uid("inc"), ...data }); }); setEdit(null); }} />}
    </div>
  );
}

function IncEditor({ inc, onClose, onSave }: any) {
  const [f, setF] = useState<any>({ nome: "", descricao: "", planoAcao: "", status: "Pendente", ...inc });
  const set = (k: string, v: any) => setF({ ...f, [k]: v });
  return (
    <Modal title={inc.id ? "Editar inconsistência" : "Nova inconsistência"} onClose={onClose} onSave={() => { if (f.nome) onSave(f); }}>
      <Field label="Nome da inconsistência"><input type="text" value={f.nome} onChange={(e) => set("nome", e.target.value)} /></Field>
      <Field label="Descrição"><textarea rows={3} value={f.descricao} onChange={(e) => set("descricao", e.target.value)} /></Field>
      <Field label="Plano de ação"><textarea rows={3} value={f.planoAcao} onChange={(e) => set("planoAcao", e.target.value)} /></Field>
      <Field label="Status"><select value={f.status} onChange={(e) => set("status", e.target.value)}>{STATUS.map((s) => <option key={s}>{s}</option>)}</select></Field>
    </Modal>
  );
}
