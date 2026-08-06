import { ref, get, set } from "firebase/database";
import { db as rtdb } from "./firebase";
import { seed } from "./data/seed";
import { buildEscoposSeed } from "./data/escopos";
import { ITENS_CONTA_BASE, PENDENCIAS_BASE, INCONSISTENCIAS_BASE } from "./data/defaults";
import { uid } from "./lib/derive";
import type { DB, ItemConta, Pendencia, Inconsistencia } from "./types";

// ---------------------------------------------------------------------------
// Hierarquia de hospitais (workspaces).
//   hospitais/index/<id> = nome            (lista leve p/ a tela inicial)
//   hospitais/data/<id>  = DB do hospital  (o app inteiro opera sobre este nó)
// O nó legado "frame" (workspace único antigo) é preservado como backup e
// migrado uma única vez para o primeiro hospital ("Samuel Libânio").
// ---------------------------------------------------------------------------

export const INDEX_PATH = "hospitais/index";
export const dataPath = (id: string) => "hospitais/data/" + id;

export interface HospitalRef { id: string; nome: string; }

// DB de um NOVO hospital: em branco na maior parte, com as bases padrão embutidas.
export function buildNewHospitalDB(): DB {
  const itensConta: ItemConta[] = ITENS_CONTA_BASE.map((nome, i) => ({ id: "ic-" + String(i + 1).padStart(2, "0"), nome }));
  const escopos = buildEscoposSeed(itensConta);
  const pendencias: Pendencia[] = PENDENCIAS_BASE.map((p, i) => ({
    id: "pend-b-" + String(i + 1).padStart(3, "0"), nome: p.nome, descricao: "",
    operadorasAplicaveis: [], setor: "", responsavel: "", alertaEmail: false,
    regras: [], status: "Ativa", obs: "", area: p.area, codigo: p.codigo,
  }));
  const inconsistencias: Inconsistencia[] = INCONSISTENCIAS_BASE.map((x, i) => ({
    id: "inc-b-" + String(i + 1).padStart(4, "0"), nome: x.nome, descricao: "", planoAcao: "",
    status: "Pendente", codigo: x.codigo, tipo: x.tipo,
    fechaConta: x.fechaConta, fechaAtendimento: x.fechaAtendimento, fechaProtocolo: x.fechaProtocolo,
  }));
  // seed = 110 UoW + demais coleções vazias; sobrescrevemos as bases padrão.
  return { ...seed, itensConta, escopos, pendencias, inconsistencias };
}

// Cria um novo hospital e devolve o id.
export async function createHospital(nome: string): Promise<string> {
  const id = uid("hosp");
  await set(ref(rtdb, dataPath(id)), buildNewHospitalDB());
  await set(ref(rtdb, INDEX_PATH + "/" + id), nome);
  return id;
}

// Migração única: se ainda não há hospitais e existe o workspace legado ("frame")
// com dados, cria o hospital "Samuel Libânio" com esses dados. Idempotente: usa id fixo.
export async function migrateLegacyIfNeeded(): Promise<void> {
  const idxSnap = await get(ref(rtdb, INDEX_PATH));
  if (idxSnap.exists()) return; // já há hospitais — nada a fazer
  const legacySnap = await get(ref(rtdb, "frame"));
  const legacy = legacySnap.val();
  const temDados = legacy && typeof legacy === "object" &&
    (legacy.unitsOfWork || legacy.regras || legacy.processos || legacy.itensConta || legacy.escopos || legacy.pendencias);
  if (!temDados) return; // banco novo, sem legado — começa com lista vazia
  const id = "h_samuel_libanio";
  await set(ref(rtdb, dataPath(id)), legacy);
  await set(ref(rtdb, INDEX_PATH + "/" + id), "Samuel Libânio");
}
