import { useState } from "react";
import { useStore } from "../store";
import { uid, namesByIds } from "../lib/derive";
import { Modal, Field, MultiSelect, MiniDropdown, Ic, icons } from "../ui";
import type { DB, Named } from "../types";

const EMPTY = { nome: "", oQueValidar: "", acoes: [], itensConta: [], regras: [], operadoras: [], pendencias: [], uows: [], sistemas: [] };

export function Documentos() {
  const { db, upd } = useStore();
  const [edit, setEdit] = useState<any>(null);
  const [q, setQ] = useState("");
  const docs = db.documentos.filter((d) => (d.nome + " " + (d.oQueValidar || "")).toLowerCase().includes(q.toLowerCase()));
  const cols = [
    { k: "acoes", label: "Ações", list: db.acoes as any as Named[] },
    { k: "itensConta", label: "Itens", list: db.itensConta },
    { k: "regras", label: "Regras", list: db.regras as any as Named[] },
    { k: "operadoras", label: "Operadoras", list: db.operadoras },
    { k: "pendencias", label: "Pendências", list: db.pendencias as any as Named[] },
    { k: "uows", label: "UoW", list: db.unitsOfWork as any as Named[] },
    { k: "sistemas", label: "Sistemas", list: db.sistemas },
  ];
  return (
    <div>
      <div className="page-head"><div className="h1">Documentos</div><p>Cadastre documentos de referência e associe-os a ações do fluxo, itens da conta, regras, operadoras, pendências, Units of Work e sistemas. Use "O que validar" para registrar o que conferir em cada documento.</p></div>
      <div className="filters">
        <input type="text" placeholder="Buscar…" value={q} onChange={(e) => setQ(e.target.value)} style={{ width: 220 }} />
        <span className="chip">{docs.length}</span>
        <button className="btn primary sm" style={{ marginLeft: "auto" }} onClick={() => setEdit({})}><Ic d={icons.plus} size={13} />Novo documento</button>
      </div>
      <div className="tbl-wrap"><div className="tbl-scroll"><table>
        <thead><tr><th>Documento</th><th>O que validar</th>{cols.map((c) => <th key={c.k}>{c.label}</th>)}<th /></tr></thead>
        <tbody>{docs.map((d) => (<tr key={d.id}>
          <td style={{ fontWeight: 600, minWidth: 160 }}>{d.nome}</td>
          <td className="muted" style={{ minWidth: 200, maxWidth: 340, fontSize: 12.5 }}>{d.oQueValidar}</td>
          {cols.map((c) => { const ids = ((d as any)[c.k] || []) as string[]; return <td key={c.k}>{ids.length ? <MiniDropdown label={String(ids.length)} items={namesByIds(c.list, ids)} /> : <span className="dim">—</span>}</td>; })}
          <td><div className="row" style={{ gap: 4 }}><button className="btn ghost sm" onClick={() => setEdit(d)}>Editar</button><button className="btn ghost sm danger" onClick={() => { if (confirm('Excluir o documento "' + d.nome + '"?')) upd((x: DB) => { x.documentos = x.documentos.filter((y) => y.id !== d.id); }); }}>×</button></div></td>
        </tr>))}
        {!docs.length && <tr><td colSpan={cols.length + 3}><div className="empty">Nenhum documento cadastrado.</div></td></tr>}</tbody>
      </table></div></div>
      {edit && <DocEditor doc={edit} onClose={() => setEdit(null)} onSave={(data: any) => { upd((x: DB) => { if (edit.id) Object.assign(x.documentos.find((y) => y.id === edit.id)!, data); else x.documentos.push({ id: uid("doc"), ...data }); }); setEdit(null); }} />}
    </div>
  );
}

function DocEditor({ doc, onClose, onSave }: any) {
  const { db } = useStore();
  const [f, setF] = useState<any>({ ...EMPTY, ...doc });
  const set = (k: string, v: any) => setF({ ...f, [k]: v });
  return (
    <Modal title={doc.id ? "Editar documento" : "Novo documento"} onClose={onClose} onSave={() => { if (f.nome) onSave(f); }}>
      <Field label="Nome do documento"><input type="text" value={f.nome} onChange={(e) => set("nome", e.target.value)} /></Field>
      <Field label="O que validar nele"><textarea rows={3} value={f.oQueValidar} onChange={(e) => set("oQueValidar", e.target.value)} /></Field>
      <Field label="Ações (fluxo AS IS)"><MultiSelect options={db.acoes as any as Named[]} value={f.acoes} onChange={(v) => set("acoes", v)} /></Field>
      <Field label="Itens da conta"><MultiSelect options={db.itensConta} value={f.itensConta} onChange={(v) => set("itensConta", v)} /></Field>
      <Field label="Regras"><MultiSelect options={db.regras as any as Named[]} value={f.regras} onChange={(v) => set("regras", v)} /></Field>
      <Field label="Operadoras"><MultiSelect options={db.operadoras} value={f.operadoras} onChange={(v) => set("operadoras", v)} /></Field>
      <Field label="Pendências"><MultiSelect options={db.pendencias as any as Named[]} value={f.pendencias} onChange={(v) => set("pendencias", v)} /></Field>
      <Field label="Units of Work"><MultiSelect options={db.unitsOfWork as any as Named[]} value={f.uows} onChange={(v) => set("uows", v)} /></Field>
      <Field label="Sistemas"><MultiSelect options={db.sistemas} value={f.sistemas} onChange={(v) => set("sistemas", v)} /></Field>
    </Modal>
  );
}
