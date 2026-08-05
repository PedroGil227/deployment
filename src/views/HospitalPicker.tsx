import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db as rtdb } from "../firebase";
import { createHospital, INDEX_PATH, type HospitalRef } from "../hospitais";
import { useAuth } from "../auth";
import { Ic, icons } from "../ui";

export function HospitalPicker({ onOpen }: { onOpen: (id: string, nome: string) => void }) {
  const { user, logout } = useAuth();
  const [list, setList] = useState<HospitalRef[] | null>(null);
  const [novo, setNovo] = useState("");
  const [criando, setCriando] = useState(false);

  useEffect(() => {
    const unsub = onValue(ref(rtdb, INDEX_PATH), (snap) => {
      const val = snap.val() || {};
      const arr: HospitalRef[] = Object.keys(val).map((id) => ({ id, nome: String(val[id]) }));
      arr.sort((a, b) => a.nome.localeCompare(b.nome));
      setList(arr);
    });
    return () => unsub();
  }, []);

  const criar = async () => {
    const nome = novo.trim();
    if (!nome || criando) return;
    setCriando(true);
    try { const id = await createHospital(nome); setNovo(""); onOpen(id, nome); }
    catch (e: any) { alert("Não consegui criar o hospital: " + (e?.message || e)); }
    finally { setCriando(false); }
  };

  return (
    <div className="login-wrap">
      <div className="login-card" style={{ width: 480, maxWidth: "94vw", textAlign: "left" }}>
        <div className="row" style={{ gap: 12, alignItems: "center", marginBottom: 6 }}>
          <div className="logo-mark">R</div>
          <div>
            <div className="h1" style={{ fontSize: 20 }}>Rivio · Implantação</div>
            <p className="muted" style={{ margin: 0, fontSize: 13 }}>Selecione um hospital para abrir o workspace.</p>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          {list === null && <div className="dim" style={{ padding: "18px 4px" }}>Carregando hospitais…</div>}
          {list !== null && list.length === 0 && (
            <div className="empty" style={{ padding: 18 }}>Nenhum hospital ainda. Adicione o primeiro abaixo.</div>
          )}
          {list !== null && list.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: "42vh", overflowY: "auto" }}>
              {list.map((h) => (
                <button key={h.id} className="btn ghost" style={{ width: "100%", justifyContent: "space-between", padding: "12px 14px" }} onClick={() => onOpen(h.id, h.nome)}>
                  <span className="row" style={{ gap: 10, alignItems: "center", fontWeight: 600 }}><Ic d={icons.explorer} size={15} />{h.nome}</span>
                  <span className="dim" style={{ fontSize: 12 }}>Abrir →</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ borderTop: "1px solid var(--line, #e5e7eb)", marginTop: 18, paddingTop: 16 }}>
          <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>Adicionar hospital</div>
          <div className="row" style={{ gap: 8 }}>
            <input type="text" placeholder="Nome do hospital" value={novo} onChange={(e) => setNovo(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") criar(); }} style={{ flex: 1 }} />
            <button className="btn primary" onClick={criar} disabled={criando || !novo.trim()}><Ic d={icons.plus} size={14} />{criando ? "Criando…" : "Adicionar"}</button>
          </div>
          <p className="dim" style={{ fontSize: 11.5, marginTop: 8 }}>O novo hospital nasce em branco, já com as bases padrão (Units of Work, escopos, itens da conta, checklists, pendências e inconsistências).</p>
        </div>

        <div className="dim" style={{ fontSize: 11.5, marginTop: 16 }}>{user?.email} · <span className="link" onClick={logout}>Sair</span></div>
      </div>
    </div>
  );
}
