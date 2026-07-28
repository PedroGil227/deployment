import { useEffect, useState } from "react";
import { useStore } from "../store";
import { uid, nameById, namesByIds } from "../lib/derive";
import { REGRA_STATUS, regraStatusClass } from "../lib/constants";
import { StatusBadge, Modal, Field, MultiSelect, MiniDropdown, Ic, icons } from "../ui";
import type { DB, Escopo, Named } from "../types";

// Peso com estado local — grava no Firebase só ao sair do campo.
function PesoInput({ value, onCommit }: { value: number; onCommit: (n: number) => void }) {
  const [v, setV] = useState(String(value ?? 1));
  useEffect(() => setV(String(value ?? 1)), [value]);
  return (
    <input type="number" min={0} step="any" value={v} title="Peso do escopo (usado na penetração ponderada)"
      style={{ width: 66, padding: "4px 6px" }}
      onChange={(e) => setV(e.target.value)}
      onBlur={() => { const n = parseFloat(v); if (!isNaN(n) && n !== value) onCommit(n); else setV(String(value ?? 1)); }} />
  );
}

// Seletor de escopos para a regra: lista suspensa com busca (são muitos escopos).
function EscopoPicker({ escopos, itens, value, onChange }: { escopos: Escopo[]; itens: Named[]; value: string[]; onChange: (v: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const itemName = (id: string) => nameById(itens, id) || "Sem item";
  const toggle = (id: string) => onChange(value.includes(id) ? value.filter((x) => x !== id) : [...value, id]);
  const filtered = escopos.filter((e) => (itemName(e.itemConta) + " " + e.nome).toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <div className="chips" style={{ marginBottom: 6 }}>
        {value.length ? value.map((id) => { const e = escopos.find((x) => x.id === id); return (
          <span key={id} className="chip b-purple">{e ? e.nome : id}<span style={{ cursor: "pointer", marginLeft: 2 }} onClick={() => toggle(id)}>×</span></span>
        ); }) : <span className="dim" style={{ fontSize: 11 }}>Nenhum escopo selecionado</span>}
      </div>
      <button type="button" className="btn sm" onClick={() => setOpen(!open)}>{open ? "Fechar" : "Selecionar escopos"} ▾</button>
      {open && (
        <div style={{ border: "1px solid var(--border)", borderRadius: 8, marginTop: 6, padding: 8, maxHeight: 260, overflow: "auto" }}>
          <input type="text" placeholder="Buscar escopo…" value={q} onChange={(e) => setQ(e.target.value)} style={{ width: "100%", marginBottom: 6 }} autoFocus />
          {filtered.map((e) => (
            <label key={e.id} className="row" style={{ gap: 6, padding: "3px 4px", cursor: "pointer" }}>
              <input type="checkbox" checked={value.includes(e.id)} onChange={() => toggle(e.id)} />
              <span style={{ fontSize: 12 }}><span className="dim">{itemName(e.itemConta)} ·</span> {e.nome}</span>
            </label>
          ))}
          {!filtered.length && <div className="dim" style={{ padding: 6, fontSize: 12 }}>Nada encontrado.</div>}
        </div>
      )}
    </div>
  );
}

export function Regras() {
  const { db, upd } = useStore();
  const [editE, setEditE] = useState<any>(null);
  const [editR, setEditR] = useState<any>(null);
  const [f, setF] = useState({ operadora: "", item: "" });

  const itemIds = new Set(db.itensConta.map((i) => i.id));
  const matchEscOp = (e: Escopo) => !f.operadora || (e.operadoras || []).length === 0 || (e.operadoras || []).includes(f.operadora);
  const matchR = (r: any) => (!f.operadora || (r.operadoras || []).includes(f.operadora)) && (!f.item || (r.itensConta || []).includes(f.item));
  const regras = db.regras.filter(matchR);

  const setPeso = (id: string, peso: number) => upd((d: DB) => { const e = d.escopos.find((x) => x.id === id); if (e) e.peso = peso; });
  const delEscopo = (id: string, nome: string) => { if (!confirm('Excluir o escopo "' + nome + '"?')) return; upd((d: DB) => { d.escopos = d.escopos.filter((x) => x.id !== id); d.regras.forEach((r) => { if (r.escopos) r.escopos = r.escopos.filter((x) => x !== id); }); }); };

  // Grupos por item da conta (na ordem do cadastro) + um grupo "Sem item da conta" para escopos órfãos.
  const grupos: { key: string; nome: string; itens: Escopo[] }[] = [];
  db.itensConta.forEach((it) => {
    if (f.item && it.id !== f.item) return;
    const items = db.escopos.filter((e) => e.itemConta === it.id && matchEscOp(e));
    grupos.push({ key: it.id, nome: it.nome, itens: items });
  });
  if (!f.item) {
    const orfaos = db.escopos.filter((e) => !itemIds.has(e.itemConta) && matchEscOp(e));
    if (orfaos.length) grupos.push({ key: "__sem__", nome: "Sem item da conta", itens: orfaos });
  }
  const totalEscopos = grupos.reduce((s, g) => s + g.itens.length, 0);

  return (
    <div>
      <div className="page-head"><div className="h1">Regras de Auditoria</div><p>Os <b>escopos</b> são dores/motivos de glosa genéricos, agrupados por item da conta (biblioteca compartilhada). Cada escopo tem um <b>peso</b> (usado na penetração ponderada) e pode valer para todas as operadoras ou operadoras específicas. As <b>regras</b> endereçam um ou mais escopos.</p></div>
      <div className="filters">
        <select className="select-sm" value={f.operadora} onChange={(e) => setF({ ...f, operadora: e.target.value })}><option value="">Operadora</option>{db.operadoras.map((o) => <option key={o.id} value={o.id}>{o.nome}</option>)}</select>
        <select className="select-sm" value={f.item} onChange={(e) => setF({ ...f, item: e.target.value })}><option value="">Item da conta</option>{db.itensConta.map((o) => <option key={o.id} value={o.id}>{o.nome}</option>)}</select>
        {(f.operadora || f.item) && <button className="btn ghost sm" onClick={() => setF({ operadora: "", item: "" })}>Limpar</button>}
      </div>
      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", alignItems: "start" }}>
        {/* ---------- Escopos ---------- */}
        <div>
          <div className="between" style={{ marginBottom: 10 }}><div className="h2">Escopos <span className="chip">{totalEscopos}</span> <span className="dim" style={{ fontWeight: 400, fontSize: 11 }}>· por item da conta</span></div><button className="btn primary sm" onClick={() => setEditE({})}><Ic d={icons.plus} size={13} />Escopo</button></div>
          {grupos.map((g) => (
            <div className="card" key={g.key} style={{ overflow: "hidden", marginBottom: 12 }}>
              <div className="rel-col-h"><span>{g.nome}</span><span className="chip">{g.itens.length}</span></div>
              <div className="tbl-scroll"><table>
                <thead><tr><th>Escopo</th><th style={{ width: 80 }}>Peso</th><th style={{ width: 150 }}>Operadoras</th><th style={{ width: 90 }} /></tr></thead>
                <tbody>{g.itens.map((e) => (<tr key={e.id}>
                  <td>{e.nome}</td>
                  <td><PesoInput value={e.peso} onCommit={(n) => setPeso(e.id, n)} /></td>
                  <td>{(e.operadoras || []).length ? <span className="chips">{namesByIds(db.operadoras, e.operadoras).map((n, i) => <span className="chip" key={i}>{n}</span>)}</span> : <span className="chip b-blue">Todas</span>}</td>
                  <td><div className="row" style={{ gap: 4, justifyContent: "flex-end" }}><button className="btn ghost sm" onClick={() => setEditE(e)}>Editar</button><button className="btn ghost sm danger" onClick={() => delEscopo(e.id, e.nome)}>×</button></div></td>
                </tr>))}
                {!g.itens.length && <tr><td colSpan={4}><div className="empty">Nenhum escopo.</div></td></tr>}</tbody>
              </table></div>
            </div>
          ))}
          {!grupos.length && <div className="empty">Nenhum item da conta cadastrado. Cadastre os itens em Cadastros.</div>}
        </div>

        {/* ---------- Regras ---------- */}
        <div>
          <div className="between" style={{ marginBottom: 10 }}><div className="h2">Regras <span className="chip">{regras.length}</span></div><button className="btn primary sm" onClick={() => setEditR({})}><Ic d={icons.plus} size={13} />Regra</button></div>
          <div className="tbl-wrap"><div className="tbl-scroll"><table>
            <thead><tr><th>Regra</th><th>Item</th><th>Operadora</th><th>Escopos</th><th>Status</th><th /></tr></thead>
            <tbody>{regras.map((r) => (<tr key={r.id}>
              <td style={{ minWidth: 150 }}><div style={{ fontWeight: 600 }}>{r.nome}</div><div className="muted" style={{ fontSize: 11.5 }}>{r.descricao}</div></td>
              <td><span className="chips">{namesByIds(db.itensConta, r.itensConta).map((n, i) => <span className="chip" key={i}>{n}</span>)}</span></td>
              <td><span className="chips">{namesByIds(db.operadoras, r.operadoras).map((n, i) => <span className="chip" key={i}>{n}</span>)}</span></td>
              <td><MiniDropdown label={(r.escopos || []).length + " escopo(s)"} items={namesByIds(db.escopos, r.escopos || [])} /></td>
              <td><StatusBadge s={r.status} fn={regraStatusClass} /></td>
              <td><div className="row" style={{ gap: 4 }}><button className="btn ghost sm" onClick={() => setEditR(r)}>Editar</button><button className="btn ghost sm danger" onClick={() => { if (confirm('Excluir a regra "' + r.nome + '"?')) upd((d: DB) => { d.regras = d.regras.filter((x) => x.id !== r.id); }); }}>×</button></div></td>
            </tr>))}
            {!regras.length && <tr><td colSpan={6}><div className="empty">Nenhuma regra.</div></td></tr>}</tbody>
          </table></div></div>
        </div>
      </div>

      {editE && <EscopoEditor e={editE} onClose={() => setEditE(null)} onSave={(data: any) => { upd((d: DB) => { if (editE.id) Object.assign(d.escopos.find((x) => x.id === editE.id)!, data); else d.escopos.push({ id: uid("esc"), ...data }); }); setEditE(null); }} />}
      {editR && <RegraEditor r={editR} onClose={() => setEditR(null)} onSave={(data: any) => { upd((d: DB) => { if (editR.id) Object.assign(d.regras.find((x) => x.id === editR.id)!, data); else d.regras.push({ id: uid("r"), ...data }); }); setEditR(null); }} />}
    </div>
  );
}

function EscopoEditor({ e, onClose, onSave }: any) {
  const { db } = useStore();
  const [f, setF] = useState<any>({ nome: "", itemConta: "", peso: 1, operadoras: [], ...e });
  const set = (k: string, v: any) => setF({ ...f, [k]: v });
  return (
    <Modal title={e.id ? "Editar escopo" : "Novo escopo"} onClose={onClose} onSave={() => { if (f.nome) onSave({ ...f, peso: Number(f.peso) || 0 }); }}>
      <Field label="Nome do escopo"><input type="text" value={f.nome} onChange={(ev) => set("nome", ev.target.value)} /></Field>
      <div className="row" style={{ gap: 10 }}>
        <Field label="Item da conta"><select value={f.itemConta} onChange={(ev) => set("itemConta", ev.target.value)}><option value="">—</option>{db.itensConta.map((o) => <option key={o.id} value={o.id}>{o.nome}</option>)}</select></Field>
        <Field label="Peso"><input type="number" min={0} step="any" value={f.peso} onChange={(ev) => set("peso", ev.target.value)} /></Field>
      </div>
      <Field label="Operadoras (vazio = todas)"><MultiSelect options={db.operadoras} value={f.operadoras} onChange={(v) => set("operadoras", v)} /></Field>
    </Modal>
  );
}

function RegraEditor({ r, onClose, onSave }: any) {
  const { db } = useStore();
  const [f, setF] = useState<any>({ nome: "", descricao: "", itensConta: [], operadoras: [], tiposAtendimento: [], escopos: [], status: "Ativa", obs: "", ...r });
  const set = (k: string, v: any) => setF({ ...f, [k]: v });
  return (
    <Modal title={r.id ? "Editar regra" : "Nova regra"} onClose={onClose} onSave={() => { if (f.nome) onSave(f); }}>
      <Field label="Nome"><input type="text" value={f.nome} onChange={(e) => set("nome", e.target.value)} /></Field>
      <Field label="Descrição"><textarea rows={2} value={f.descricao} onChange={(e) => set("descricao", e.target.value)} /></Field>
      <Field label="Status"><select value={f.status} onChange={(e) => set("status", e.target.value)}>{REGRA_STATUS.map((x) => <option key={x}>{x}</option>)}</select></Field>
      <Field label="Operadora (múltipla)"><MultiSelect options={db.operadoras} value={f.operadoras} onChange={(v) => set("operadoras", v)} /></Field>
      <Field label="Item da conta (múltipla)"><MultiSelect options={db.itensConta} value={f.itensConta} onChange={(v) => set("itensConta", v)} /></Field>
      <Field label="Tipo de atendimento (múltipla)"><MultiSelect options={db.tiposAtendimento} value={f.tiposAtendimento} onChange={(v) => set("tiposAtendimento", v)} /></Field>
      <Field label="Escopos relacionados"><EscopoPicker escopos={db.escopos} itens={db.itensConta} value={f.escopos || []} onChange={(v) => set("escopos", v)} /></Field>
      <Field label="Observações"><textarea rows={2} value={f.obs} onChange={(e) => set("obs", e.target.value)} /></Field>
    </Modal>
  );
}
