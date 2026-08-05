import { Fragment, useEffect, useMemo, useState } from "react";
import { useStore } from "../store";
import { uid, nameById, namesByIds } from "../lib/derive";
import { REGRA_STATUS, regraStatusClass } from "../lib/constants";
import { Badge, StatusBadge, Modal, Field, MultiSelect, MiniDropdown, FilterMulti, anySel, Ic, icons } from "../ui";
import { seedsForHospital, applyRuleSeeds } from "../data/hospitalRules";
import type { DB, Escopo, Named } from "../types";

const effVal = (g?: number, r?: number) => (g && g > 0 ? (r || 0) / g : null);
const effCls = (e: number | null) => (e == null ? "b-gray" : e >= 0.35 ? "b-green" : e >= 0.15 ? "b-amber" : "b-red");
const pctS = (x: number) => Math.round(x * 100) + "%";
const effLabel = (e: number | null) => (e == null ? "—" : pctS(e));

// Peso com estado local — grava no Firebase só ao sair do campo.
function PesoInput({ value, onCommit }: { value: number; onCommit: (n: number) => void }) {
  const [v, setV] = useState(String(value ?? 1));
  useEffect(() => setV(String(value ?? 1)), [value]);
  return (
    <input type="number" min={0} step="any" value={v} title="Peso do escopo (pondera a cobertura)"
      style={{ width: 60, padding: "3px 6px" }}
      onChange={(e) => setV(e.target.value)}
      onBlur={() => { const n = parseFloat(v); if (!isNaN(n) && n !== value) onCommit(n); else setV(String(value ?? 1)); }} />
  );
}

// Seletor de escopos (lista suspensa com busca).
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
  const { db, upd, hospitalNome } = useStore();
  const seeds = seedsForHospital(hospitalNome);
  const [editE, setEditE] = useState<any>(null);
  const [editR, setEditR] = useState<any>(null);
  const [f, setF] = useState<{ operadora: string[]; item: string[] }>({ operadora: [], item: [] });
  const [q, setQ] = useState("");
  const [openCat, setOpenCat] = useState<Set<string>>(new Set());
  const [openEsc, setOpenEsc] = useState<Set<string>>(new Set());
  const [sortEff, setSortEff] = useState<0 | 1 | -1>(0);

  // Aplica a base de regras do hospital uma vez, se ainda não houver regras.
  useEffect(() => {
    if (seeds && db.regras.length === 0) upd((d: DB) => { applyRuleSeeds(d, seeds); });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const opMatchR = (r: any) => !f.operadora.length || !(r.operadoras || []).length || (r.operadoras || []).some((o: string) => f.operadora.includes(o));
  const matchEscOp = (e: Escopo) => !f.operadora.length || !(e.operadoras || []).length || (e.operadoras || []).some((o) => f.operadora.includes(o));
  const itemIds = new Set(db.itensConta.map((i) => i.id));

  const rulesForEscopo = (eid: string) => db.regras.filter((r) => (r.escopos || []).includes(eid) && opMatchR(r));
  const escEff = (eid: string) => { let g = 0, r = 0; rulesForEscopo(eid).forEach((x) => { g += x.alertasGerados || 0; r += x.alertasResolvidos || 0; }); return effVal(g, r); };

  const grupos: { key: string; nome: string; itens: Escopo[] }[] = [];
  db.itensConta.forEach((it) => {
    if (f.item.length && !f.item.includes(it.id)) return;
    grupos.push({ key: it.id, nome: it.nome, itens: db.escopos.filter((e) => e.itemConta === it.id && matchEscOp(e)) });
  });
  if (!f.item.length) {
    const orf = db.escopos.filter((e) => !itemIds.has(e.itemConta) && matchEscOp(e));
    if (orf.length) grupos.push({ key: "__sem__", nome: "Sem item da conta", itens: orf });
  }
  const totalEscopos = grupos.reduce((s, g) => s + g.itens.length, 0);
  const gapCount = grupos.reduce((s, g) => s + g.itens.filter((e) => rulesForEscopo(e.id).length === 0).length, 0);

  const matchR = (r: any) => anySel(f.operadora, r.operadoras || []) && anySel(f.item, r.itensConta || []) &&
    (!q || ((r.nome || "") + " " + (r.codigo || "") + " " + (r.descricao || "")).toLowerCase().includes(q.toLowerCase()));
  const regras = useMemo(() => {
    let list = db.regras.filter(matchR);
    if (sortEff !== 0) list = [...list].sort((a, b) => {
      const ea = effVal(a.alertasGerados, a.alertasResolvidos), eb = effVal(b.alertasGerados, b.alertasResolvidos);
      return ((ea == null ? -1 : ea) - (eb == null ? -1 : eb)) * sortEff;
    });
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db.regras, f, q, sortEff]);

  const setPeso = (id: string, peso: number) => upd((d: DB) => { const e = d.escopos.find((x) => x.id === id); if (e) e.peso = peso; });
  const delEscopo = (id: string, nome: string) => { if (!confirm('Excluir o escopo "' + nome + '"?')) return; upd((d: DB) => { d.escopos = d.escopos.filter((x) => x.id !== id); d.regras.forEach((r) => { if (r.escopos) r.escopos = r.escopos.filter((x) => x !== id); }); }); };
  const tog = (s: Set<string>, setter: (x: Set<string>) => void, id: string) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); setter(n); };
  const atualizarBase = () => { if (seeds) upd((d: DB) => { applyRuleSeeds(d, seeds); }); };

  const catName = (r: any) => namesByIds(db.itensConta, r.itensConta || [])[0] || "—";
  const escName = (r: any) => (r.escopos || []).map((id: string) => nameById(db.escopos, id)).filter(Boolean).join(", ") || "—";

  return (
    <div>
      <div className="page-head"><div className="h1">Regras de Auditoria</div><p>Categorias (item da conta) → <b>escopos</b> (com peso e operadoras) → <b>regras</b>. Cada regra mostra a efetividade (resolvidos ÷ alertas gerados). Escopo sem regra vira <b>gap</b>.</p></div>

      <div className="filters">
        <FilterMulti label="Operadora" options={db.operadoras} value={f.operadora} onChange={(v) => setF({ ...f, operadora: v })} />
        <FilterMulti label="Item da conta" options={db.itensConta} value={f.item} onChange={(v) => setF({ ...f, item: v })} />
        <input type="text" placeholder="Buscar regra…" value={q} onChange={(e) => setQ(e.target.value)} style={{ width: 200 }} />
        {(f.operadora.length || f.item.length || q) ? <button className="btn ghost sm" onClick={() => { setF({ operadora: [], item: [] }); setQ(""); }}>Limpar</button> : null}
        <span className="chip">{totalEscopos} escopos</span>
        {gapCount > 0 && <Badge cls="b-red">{gapCount} gap(s)</Badge>}
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          {seeds && <button className="btn ghost sm" title="Recarrega a base de regras do hospital, preservando o status já editado" onClick={atualizarBase}><Ic d={icons.uow} size={13} />Atualizar base de regras</button>}
          <button className="btn primary sm" onClick={() => setEditE({})}><Ic d={icons.plus} size={13} />Escopo</button>
          <button className="btn primary sm" onClick={() => setEditR({})}><Ic d={icons.plus} size={13} />Regra</button>
        </div>
      </div>

      {/* ---------- Árvore Categoria → Escopo → Regras ---------- */}
      {grupos.map((g) => {
        const gaps = g.itens.filter((e) => rulesForEscopo(e.id).length === 0).length;
        const catOpen = openCat.has(g.key);
        return (
          <div className="card" key={g.key} style={{ overflow: "hidden", marginBottom: 12 }}>
            <div className="rel-col-h" style={{ cursor: "pointer" }} onClick={() => tog(openCat, setOpenCat, g.key)}>
              <span><span style={{ display: "inline-block", width: 14 }}>{catOpen ? "▾" : "▸"}</span>{g.nome}</span>
              <span className="row" style={{ gap: 6 }}><span className="chip">{g.itens.length} escopos</span>{gaps > 0 && <Badge cls="b-red">{gaps} gap</Badge>}</span>
            </div>
            {catOpen && (
              <div className="tbl-scroll"><table>
                <thead><tr><th style={{ width: 24 }} /><th>Escopo</th><th style={{ width: 70 }}>Peso</th><th style={{ width: 150 }}>Operadoras</th><th style={{ width: 80 }}>Efet.</th><th style={{ width: 110 }}>Regras</th><th style={{ width: 90 }} /></tr></thead>
                <tbody>{g.itens.map((e) => {
                  const rs = rulesForEscopo(e.id);
                  const gap = rs.length === 0;
                  const eff = escEff(e.id);
                  const escOpen = openEsc.has(e.id);
                  return (
                    <Fragment key={e.id}>
                      <tr style={gap ? { background: "rgba(220,80,80,.06)" } : undefined}>
                        <td style={{ cursor: rs.length ? "pointer" : "default", textAlign: "center" }} onClick={() => rs.length && tog(openEsc, setOpenEsc, e.id)}>{rs.length ? (escOpen ? "▾" : "▸") : ""}</td>
                        <td>{e.nome}</td>
                        <td><PesoInput value={e.peso} onCommit={(n) => setPeso(e.id, n)} /></td>
                        <td>{(e.operadoras || []).length ? <span className="chips">{namesByIds(db.operadoras, e.operadoras).map((n, i) => <span className="chip" key={i}>{n}</span>)}</span> : <span className="chip b-blue">Todas</span>}</td>
                        <td><Badge cls={effCls(eff)}>{effLabel(eff)}</Badge></td>
                        <td>{gap ? <Badge cls="b-red">gap · sem regra</Badge> : <span className="chip">{rs.length} regra(s)</span>}</td>
                        <td><div className="row" style={{ gap: 4, justifyContent: "flex-end" }}><button className="btn ghost sm" onClick={() => setEditE(e)}>Editar</button><button className="btn ghost sm danger" onClick={() => delEscopo(e.id, e.nome)}>×</button></div></td>
                      </tr>
                      {escOpen && rs.map((r) => {
                        const re = effVal(r.alertasGerados, r.alertasResolvidos);
                        return (<tr key={e.id + "_" + r.id} style={{ background: "var(--panel2, rgba(0,0,0,.02))" }}>
                          <td />
                          <td colSpan={2} style={{ paddingLeft: 18, fontSize: 12.5 }}><span className="dim" style={{ fontFamily: "monospace", marginRight: 6 }}>{r.codigo || ""}</span>{r.nome}</td>
                          <td>{r.isLLM ? <Badge cls="b-purple">LLM</Badge> : null}</td>
                          <td><Badge cls={effCls(re)}>{effLabel(re)}</Badge></td>
                          <td><StatusBadge s={r.status} fn={regraStatusClass} /></td>
                          <td><div className="row" style={{ justifyContent: "flex-end" }}><button className="btn ghost sm" onClick={() => setEditR(r)}>Editar</button></div></td>
                        </tr>);
                      })}
                    </Fragment>
                  );
                })}
                {!g.itens.length && <tr><td colSpan={7}><div className="empty">Nenhum escopo nesta categoria.</div></td></tr>}</tbody>
              </table></div>
            )}
          </div>
        );
      })}
      {!grupos.length && <div className="empty">Nenhum item da conta cadastrado. Cadastre os itens em Cadastros.</div>}

      {/* ---------- Lista de regras cadastradas ---------- */}
      <div className="between" style={{ margin: "18px 0 10px" }}>
        <div className="h2">Regras cadastradas <span className="chip">{regras.length}</span></div>
      </div>
      <div className="tbl-wrap"><div className="tbl-scroll" style={{ maxHeight: "60vh" }}><table>
        <thead><tr>
          <th style={{ width: 90 }}>Código</th><th>Regra</th><th>Categoria</th><th>Escopo</th><th>Operadora</th><th style={{ width: 50 }}>LLM</th><th>Status</th>
          <th style={{ width: 90, cursor: "pointer" }} onClick={() => setSortEff(sortEff === -1 ? 1 : -1)}>Efet. {sortEff === -1 ? "▾" : sortEff === 1 ? "▴" : "⇅"}</th>
          <th style={{ width: 90 }} />
        </tr></thead>
        <tbody>{regras.map((r) => {
          const re = effVal(r.alertasGerados, r.alertasResolvidos);
          return (<tr key={r.id}>
            <td className="dim" style={{ fontFamily: "monospace", fontSize: 11.5 }}>{r.codigo || "—"}</td>
            <td style={{ minWidth: 200, fontWeight: 600 }}>{r.nome}{r.descricao && <div className="muted" style={{ fontSize: 11.5, fontWeight: 400 }}>{r.descricao}</div>}</td>
            <td className="muted" style={{ fontSize: 11.5, whiteSpace: "nowrap" }}>{catName(r)}</td>
            <td className="muted" style={{ fontSize: 11.5, maxWidth: 220 }}>{escName(r)}</td>
            <td>{(r.operadoras || []).length ? <MiniDropdown label={(r.operadoras || []).length + " oper."} items={namesByIds(db.operadoras, r.operadoras)} /> : <span className="chip b-blue">Todas</span>}</td>
            <td>{r.isLLM ? <Badge cls="b-purple">LLM</Badge> : <span className="dim">—</span>}</td>
            <td><StatusBadge s={r.status} fn={regraStatusClass} /></td>
            <td><Badge cls={effCls(re)}>{effLabel(re)}</Badge>{re != null && <span className="dim" style={{ fontSize: 10, marginLeft: 4 }}>{(r.alertasResolvidos || 0)}/{r.alertasGerados}</span>}</td>
            <td><div className="row" style={{ gap: 4 }}><button className="btn ghost sm" onClick={() => setEditR(r)}>Editar</button><button className="btn ghost sm danger" onClick={() => { if (confirm('Excluir a regra "' + r.nome + '"?')) upd((d: DB) => { d.regras = d.regras.filter((x) => x.id !== r.id); }); }}>×</button></div></td>
          </tr>);
        })}
        {!regras.length && <tr><td colSpan={9}><div className="empty">Nenhuma regra. {seeds ? 'Clique em "Atualizar base de regras" para carregar a base do hospital.' : ""}</div></td></tr>}</tbody>
      </table></div></div>

      {editE && <EscopoEditor e={editE} onClose={() => setEditE(null)} onSave={(data: any) => { upd((d: DB) => { if (editE.id) Object.assign(d.escopos.find((x) => x.id === editE.id)!, data); else d.escopos.push({ id: uid("esc"), ...data }); }); setEditE(null); }} />}
      {editR && <RegraEditor r={editR} testeOk={!!(editR.id && db.regraTestes[editR.id] && db.regraTestes[editR.id].status === "check")} onClose={() => setEditR(null)} onSave={(data: any) => { upd((d: DB) => { if (editR.id) Object.assign(d.regras.find((x) => x.id === editR.id)!, data); else d.regras.push({ id: uid("r"), ...data }); }); setEditR(null); }} />}
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
        <Field label="Categoria (item da conta)"><select value={f.itemConta} onChange={(ev) => set("itemConta", ev.target.value)}><option value="">—</option>{db.itensConta.map((o) => <option key={o.id} value={o.id}>{o.nome}</option>)}</select></Field>
        <Field label="Peso"><input type="number" min={0} step="any" value={f.peso} onChange={(ev) => set("peso", ev.target.value)} /></Field>
      </div>
      <Field label="Operadoras (vazio = todas)"><MultiSelect options={db.operadoras} value={f.operadoras} onChange={(v) => set("operadoras", v)} /></Field>
    </Modal>
  );
}

function RegraEditor({ r, testeOk, onClose, onSave }: any) {
  const { db } = useStore();
  const [f, setF] = useState<any>({ nome: "", descricao: "", itensConta: [], operadoras: [], tiposAtendimento: [], escopos: [], status: "Em teste", obs: "", isLLM: false, ...r });
  const set = (k: string, v: any) => setF({ ...f, [k]: v });
  const eff = effVal(f.alertasGerados, f.alertasResolvidos);
  return (
    <Modal title={r.id ? "Editar regra" : "Nova regra"} onClose={onClose} onSave={() => { if (!f.nome) return; if (f.status === "Ativa" && !testeOk) { alert("A regra só pode ficar Ativa quando o teste estiver marcado como Ok na aba Testes."); return; } onSave(f); }}>
      {f.codigo && <div className="row" style={{ gap: 10, marginBottom: 8 }}><span className="chip">{f.codigo}</span>{eff != null && <Badge cls={effCls(eff)}>Efet. {effLabel(eff)} · {f.alertasResolvidos || 0}/{f.alertasGerados}</Badge>}</div>}
      <Field label="Nome"><input type="text" value={f.nome} onChange={(e) => set("nome", e.target.value)} /></Field>
      <Field label="Descrição"><textarea rows={2} value={f.descricao} onChange={(e) => set("descricao", e.target.value)} /></Field>
      <div className="row" style={{ gap: 10 }}>
        <Field label="Status"><select value={f.status} onChange={(e) => set("status", e.target.value)}>{REGRA_STATUS.map((x) => <option key={x} value={x} disabled={x === "Ativa" && !testeOk}>{x}{x === "Ativa" && !testeOk ? " (requer teste Ok)" : ""}</option>)}</select></Field>
        <Field label="É um LLM?"><select value={f.isLLM ? "S" : "N"} onChange={(e) => set("isLLM", e.target.value === "S")}><option value="N">Não</option><option value="S">Sim</option></select></Field>
      </div>
      {!testeOk && <div className="dim" style={{ fontSize: 11, marginTop: -4, marginBottom: 6 }}>Para ativar, marque o teste desta regra como Ok na aba Testes.</div>}
      <Field label="Operadora (múltipla · vazio = todas)"><MultiSelect options={db.operadoras} value={f.operadoras} onChange={(v) => set("operadoras", v)} /></Field>
      <Field label="Item da conta (múltipla)"><MultiSelect options={db.itensConta} value={f.itensConta} onChange={(v) => set("itensConta", v)} /></Field>
      <Field label="Tipo de atendimento (múltipla)"><MultiSelect options={db.tiposAtendimento} value={f.tiposAtendimento} onChange={(v) => set("tiposAtendimento", v)} /></Field>
      <Field label="Escopos relacionados"><EscopoPicker escopos={db.escopos} itens={db.itensConta} value={f.escopos || []} onChange={(v) => set("escopos", v)} /></Field>
      <Field label="Observações"><textarea rows={2} value={f.obs} onChange={(e) => set("obs", e.target.value)} /></Field>
    </Modal>
  );
}
