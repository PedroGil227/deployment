import type { DB } from "../../types";
import { uid } from "../../lib/derive";
import { RULES_SAO_CAMILO, type HospitalRuleSeed } from "./saoCamilo";

export type { HospitalRuleSeed };

// Registry de bases de regras por NOME de hospital. O app aplica o dataset ao hospital
// cujo nome bate com a chave (merge por código, preservando o que o time já editou).
export const HOSPITAL_RULE_SEEDS: Record<string, HospitalRuleSeed[]> = {
  "São Camilo": RULES_SAO_CAMILO,
};

export function seedsForHospital(nome: string | undefined | null): HospitalRuleSeed[] | null {
  if (!nome) return null;
  return HOSPITAL_RULE_SEEDS[nome.trim()] || null;
}

// slug tolerante a acento/pontuação/plural (mesma ideia de escopos.ts) para casar
// categoria->item da conta e escopo->escopo já cadastrado no hospital.
const slug = (s: string) => (s || "").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
  .split(/[^a-z0-9]+/).filter(Boolean).map((w) => w.replace(/s$/, "")).join(" ");

// Aplica a base de regras a um DB de hospital. Retorna true se algo mudou.
// Preserva: status, isLLM, operadoras, obs, peso do escopo, vínculos já editados.
// Atualiza: alertas gerados/resolvidos (efetividade) sempre; cria regras/escopos faltantes.
export function applyRuleSeeds(d: DB, seeds: HospitalRuleSeed[], defaultStatus = "Em teste"): boolean {
  const itemBySlug = new Map<string, string>();
  d.itensConta.forEach((i) => itemBySlug.set(slug(i.nome), i.id));
  const escKey = (itemId: string, nome: string) => itemId + "||" + slug(nome);
  const escByKey = new Map<string, string>();
  d.escopos.forEach((e) => escByKey.set(escKey(e.itemConta, e.nome), e.id));
  const byCodigo = new Map<string, any>();
  d.regras.forEach((r) => { if (r.codigo) byCodigo.set(r.codigo, r); });

  let changed = false;
  seeds.forEach((s) => {
    const itemId = itemBySlug.get(slug(s.categoria)) || "";
    let escId = escByKey.get(escKey(itemId, s.escopo)) || "";
    if (!escId && itemId) {
      escId = uid("esc");
      d.escopos.push({ id: escId, itemConta: itemId, nome: s.escopo, peso: 1, operadoras: [] });
      escByKey.set(escKey(itemId, s.escopo), escId);
      changed = true;
    }
    const ex = byCodigo.get(s.codigo);
    if (ex) {
      ex.alertasGerados = s.gen; ex.alertasResolvidos = s.res;
      if (!ex.nome) ex.nome = s.descricao;
      if (!(ex.escopos || []).length && escId) ex.escopos = [escId];
      if (!(ex.itensConta || []).length && itemId) ex.itensConta = [itemId];
      changed = true;
    } else {
      d.regras.push({
        id: uid("r"), codigo: s.codigo, nome: s.descricao, descricao: "",
        itensConta: itemId ? [itemId] : [], operadoras: [], tiposAtendimento: [],
        problemas: [], escopos: escId ? [escId] : [], status: defaultStatus, obs: "",
        isLLM: false, alertasGerados: s.gen, alertasResolvidos: s.res,
      });
      byCodigo.set(s.codigo, true);
      changed = true;
    }
  });
  return changed;
}
