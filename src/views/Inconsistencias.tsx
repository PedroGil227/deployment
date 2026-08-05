import { useMemo, useState } from "react";
import { useStore } from "../store";
import { uid } from "../lib/derive";
import { Badge, Modal, Field, FilterMulti, inSel, Ic, icons } from "../ui";
import type { DB } from "../types";

const STATUS = ["Pendente", "Resolvido"];

export function Inconsistencias() {
  const { db, upd } = useStore();
  const [q, setQ] = useState("");
  const [fs, setFs] = useState<string[]>([]);
  const [ft, setFt] = useState<string[]>([]);
  const [edit, setEdit] = useState<any>(null);

  const tipos = useMemo(() => Array.from(new Set(db.inconsistencias.map((i) => i.tipo).filter(Boolean))) as string[], [db.inconsistencias]);
  const items = db.inconsistencias.filter((i) =>
    inSel(fs, i.status || "Pendente") && inSel(ft, i.tipo || "") &&
    (!q || (i.nome + " " + (i.descricao || "") + " " + (i.planoAcao || "") + " " + (i.codigo || "") + " " + (i.tipo || "")).toLowerCase().includes(q.toLowerCase())));
  const pend = db.inconsistencias.filter((i) => (i.status || "Pendente") !== "Resolvido").length;

  return (
    <div>
      <div className="page-head"><div className="h1">Inconsistências</div><p>Consistências da conta (Tasy) e demais inconsistências encontradas na implantação, com plano de ação e status.</p></div>
      <div className="filters">
        <input type="text" placeholder="Buscar…" value={q} onChange={(e) => setQ(e.target.value)} style={{ width: 220 }} />
        <FilterMulti label="Status" options={STATUS.map((s) => ({ id: s, nome: s }))} value={fs} onChange={setFs} />
        {tipos.length > 0 && <FilterMulti label="Tipo" options={tipos.map((t) => ({ id: t, nome: t }))} value={ft} onChange={setFt} />}
        <span className="badge b-amber">{pend} pendente(s)</span>
        <span className="chip">{items.length}</span>
        <button className="btn primary sm" style={{ marginLeft: "auto" }} onClick={() => setEdit({})}><Ic d={icons.plus} size={13} />Nova inconsistência</button>
      </div>
      <div className="tbl-wrap"><div className="tbl-scroll" style={{ maxHeight: "calc(100vh - 250px)" }}><table>
        <thead><tr><th>Código</th><th>Inconsistência</th><th>Tipo</th><th>Descrição</th><th>Plano de ação</th><th>Fecha</th><th>Status</th><th /></tr></thead>
        <tbody>{items.map((i) => (<tr key={i.id}>
          <td className="muted" style={{ fontSize: 11.5, whiteSpace: "nowrap" }}>{i.codigo || <span className="dim">—</span>}</td>
          <td style={{ fontWeight: 600, minWidth: 220 }}>{i.nome}</td>
          <td className="muted" style={{ fontSize: 11.5, whiteSpace: "nowrap" }}>{i.tipo || <span className="dim">—</span>}</td>
          <td className="muted" style={{ minWidth: 160, maxWidth: 300, fontSize: 12.5 }}>{i.descricao || <span className="dim">—</span>}</td>
          <td className="muted" style={{ minWidth: 160, maxWidth: 300, fontSize: 12.5 }}>{i.planoAcao || <span className="dim">—</span>}</td>
          <td><div className="row" style={{ gap: 3 }}>
            {i.fechaConta && <Badge cls="b-gray">Conta</Badge>}
            {i.fechaAtendimento && <Badge cls="b-gray">Atend.</Badge>}
            {i.fechaProtocolo && <Badge cls="b-gray">Protoc.</Badge>}
            {!i.fechaConta && !i.fechaAtendimento && !i.fechaProtocolo && <span className="dim">—</span>}
          </div></td>
          <td><Badge cls={i.status === "Resolvido" ? "b-green" : "b-amber"}>{i.status || "Pendente"}</Badge></td>
          <td><div className="row" style={{ gap: 4 }}><button className="btn ghost sm" onClick={() => setEdit(i)}>Editar</button><button className="btn ghost sm danger" onClick={() => { if (confirm('Excluir "' + i.nome + '"?')) upd((d: DB) => { d.inconsistencias = d.inconsistencias.filter((x) => x.id !== i.id); }); }}>×</button></div></td>
        </tr>))}
        {!items.length && <tr><td colSpan={8}><div className="empty">Nenhuma inconsistência cadastrada.</div></td></tr>}</tbody>
      </table></div></div>
      {edit && <IncEditor inc={edit} onClose={() => setEdit(null)} onSave={(data: any) => { upd((d: DB) => { if (edit.id) Object.assign(d.inconsistencias.find((x) => x.id === edit.id)!, data); else d.inconsistencias.push({ id: uid("inc"), ...data }); }); setEdit(null); }} />}
    </div>
  );
}

function IncEditor({ inc, onClose, onSave }: any) {
  const [f, setF] = useState<any>({ nome: "", descricao: "", planoAcao: "", status: "Pendente", codigo: "", tipo: "", fechaConta: false, fechaAtendimento: false, fechaProtocolo: false, ...inc });
  const set = (k: string, v: any) => setF({ ...f, [k]: v });
  return (
    <Modal title={inc.id ? "Editar inconsistência" : "Nova inconsistência"} onClose={onClose} onSave={() => { if (f.nome) onSave(f); }} width={640}>
      <div className="row" style={{ gap: 10 }}>
        <Field label="Código"><input type="text" value={f.codigo} onChange={(e) => set("codigo", e.target.value)} /></Field>
        <Field label="Tipo"><input type="text" value={f.tipo} onChange={(e) => set("tipo", e.target.value)} placeholder="Conta, Protocolo…" /></Field>
        <Field label="Status"><select value={f.status} onChange={(e) => set("status", e.target.value)}>{STATUS.map((s) => <option key={s}>{s}</option>)}</select></Field>
      </div>
      <Field label="Nome da inconsistência"><input type="text" value={f.nome} onChange={(e) => set("nome", e.target.value)} /></Field>
      <Field label="Descrição"><textarea rows={2} value={f.descricao} onChange={(e) => set("descricao", e.target.value)} /></Field>
      <Field label="Plano de ação"><textarea rows={2} value={f.planoAcao} onChange={(e) => set("planoAcao", e.target.value)} /></Field>
      <Field label="Impede o fechamento de">
        <div className="row" style={{ gap: 16, fontSize: 13 }}>
          <label className="row" style={{ gap: 6 }}><input type="checkbox" checked={!!f.fechaConta} onChange={(e) => set("fechaConta", e.target.checked)} style={{ width: "auto" }} />Conta</label>
          <label className="row" style={{ gap: 6 }}><input type="checkbox" checked={!!f.fechaAtendimento} onChange={(e) => set("fechaAtendimento", e.target.checked)} style={{ width: "auto" }} />Atendimento</label>
          <label className="row" style={{ gap: 6 }}><input type="checkbox" checked={!!f.fechaProtocolo} onChange={(e) => set("fechaProtocolo", e.target.checked)} style={{ width: "auto" }} />Protocolo</label>
        </div>
      </Field>
    </Modal>
  );
}
