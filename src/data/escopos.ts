import type { Escopo, Named } from "../types";

// Base embutida de escopos genéricos de regra, agrupados por item da conta.
// "item" é o NOME do item da conta (o vínculo com o id do cadastro é resolvido na migração,
// em store.tsx, comparando pelo nome). As RESPOSTAS/edições (peso, operadoras, add/del) ficam
// no Firebase — esta base só é injetada uma vez, quando o banco ainda não tem escopos.
export const ESCOPOS_BASE: { item: string; nome: string }[] = [
  // Honorário Médico
  { item: "Honorário Médico", nome: "Ausência de equipe cirúrgica" },
  { item: "Honorário Médico", nome: "Ausência de honorário" },
  { item: "Honorário Médico", nome: "Ausência do setor do médico executor" },
  { item: "Honorário Médico", nome: "Grau de participação incorreto" },
  { item: "Honorário Médico", nome: "Honorário em duplicidade" },
  { item: "Honorário Médico", nome: "Outras inconsistências de honorário" },
  { item: "Honorário Médico", nome: "Participante divergente/ausente" },
  { item: "Honorário Médico", nome: "Porte / valoração divergente" },
  { item: "Honorário Médico", nome: "Visita hospitalar (ausência/duplicidade)" },
  // Materiais
  { item: "Materiais", nome: "Ausência de justificativa/evidência" },
  { item: "Materiais", nome: "Ausência de lançamento/cobrança" },
  { item: "Materiais", nome: "Cobrança a maior (valor)" },
  { item: "Materiais", nome: "Cobrança em duplicidade" },
  { item: "Materiais", nome: "Divergência de quantidade" },
  { item: "Materiais", nome: "Inclusão/sugestão de item" },
  { item: "Materiais", nome: "Item / valor zerado" },
  { item: "Materiais", nome: "Item fora do setor permitido" },
  { item: "Materiais", nome: "Item incluso em taxa/pacote" },
  { item: "Materiais", nome: "Item incorreto/inválido" },
  { item: "Materiais", nome: "Outras inconsistências" },
  { item: "Materiais", nome: "Quantidade cobrada a maior" },
  { item: "Materiais", nome: "Quantidade cobrada a menor" },
  // OPME
  { item: "OPME", nome: "Ausência de autorização" },
  { item: "OPME", nome: "Ausência de lançamento/cobrança" },
  { item: "OPME", nome: "Divergência de quantidade" },
  { item: "OPME", nome: "Divergência de totalizadores" },
  { item: "OPME", nome: "Divergência utilizado x cobrado" },
  { item: "OPME", nome: "Documentação / rastreabilidade" },
  { item: "OPME", nome: "Fonte pagadora incorreta" },
  { item: "OPME", nome: "OPME incluso / valor acima do pacote" },
  { item: "OPME", nome: "Outras regras de OPME" },
  { item: "OPME", nome: "Taxa de comercialização de OPME" },
  // Medicamentos
  { item: "Medicamentos", nome: "Ausência de justificativa/evidência" },
  { item: "Medicamentos", nome: "Ausência de lançamento/cobrança" },
  { item: "Medicamentos", nome: "Cobrança a maior (valor)" },
  { item: "Medicamentos", nome: "Divergência de quantidade" },
  { item: "Medicamentos", nome: "Item incluso em taxa/pacote" },
  { item: "Medicamentos", nome: "Outras inconsistências" },
  { item: "Medicamentos", nome: "Quantidade cobrada a maior" },
  { item: "Medicamentos", nome: "Quantidade cobrada a menor" },
  // Pacotes
  { item: "Pacotes", nome: "Ausência de item do pacote" },
  { item: "Pacotes", nome: "Item cobrado fora do pacote" },
  { item: "Pacotes", nome: "Item incluso no pacote cobrado à parte" },
  { item: "Pacotes", nome: "Outras regras de pacote" },
  { item: "Pacotes", nome: "Pacote em duplicidade" },
  { item: "Pacotes", nome: "Possibilidade de pacote / proc. gerenciado" },
  // Taxas
  { item: "Taxas", nome: "Ausência de justificativa para taxa" },
  { item: "Taxas", nome: "Ausência de lançamento de taxa" },
  { item: "Taxas", nome: "Inclusão/sugestão de taxa" },
  { item: "Taxas", nome: "Outras regras de taxa" },
  { item: "Taxas", nome: "Quantidade de taxa a maior" },
  { item: "Taxas", nome: "Quantidade de taxa a menor" },
  { item: "Taxas", nome: "Taxa em duplicidade" },
  { item: "Taxas", nome: "Taxa já inclusa em outra taxa/pacote" },
  { item: "Taxas", nome: "Taxa não permitida no setor" },
  { item: "Taxas", nome: "Valor de taxa incorreto/zerado" },
  // Procedimentos
  { item: "Procedimentos", nome: "Ausência de justificativa/evidência" },
  { item: "Procedimentos", nome: "Ausência de lançamento/cobrança" },
  { item: "Procedimentos", nome: "Cobrança em duplicidade" },
  { item: "Procedimentos", nome: "Item incluso em taxa/pacote" },
  { item: "Procedimentos", nome: "Outras inconsistências" },
  { item: "Procedimentos", nome: "Quantidade cobrada a maior" },
  // Diárias
  { item: "Diárias", nome: "Ausência de justificativa/evidência" },
  { item: "Diárias", nome: "Ausência de lançamento/cobrança" },
  { item: "Diárias", nome: "Cobrança em duplicidade" },
  { item: "Diárias", nome: "Item incluso em taxa/pacote" },
  { item: "Diárias", nome: "Outras inconsistências" },
  { item: "Diárias", nome: "Quantidade cobrada a maior" },
  // Exames / SADT
  { item: "Exames / SADT", nome: "Ausência de justificativa/evidência" },
  { item: "Exames / SADT", nome: "Ausência de lançamento/cobrança" },
  { item: "Exames / SADT", nome: "Cobrança em duplicidade" },
  { item: "Exames / SADT", nome: "Divergência de quantidade" },
  { item: "Exames / SADT", nome: "Item incluso em taxa/pacote" },
  { item: "Exames / SADT", nome: "Outras inconsistências" },
  { item: "Exames / SADT", nome: "Quantidade cobrada a maior" },
  { item: "Exames / SADT", nome: "Quantidade cobrada a menor" },
  // Gases Medicinais
  { item: "Gases Medicinais", nome: "Ausência de justificativa/evidência" },
  { item: "Gases Medicinais", nome: "Ausência de lançamento/cobrança" },
  { item: "Gases Medicinais", nome: "Cobrança a menor (valor)" },
  { item: "Gases Medicinais", nome: "Divergência de quantidade" },
  { item: "Gases Medicinais", nome: "Item fora do setor permitido" },
  { item: "Gases Medicinais", nome: "Item incorreto/inválido" },
  { item: "Gases Medicinais", nome: "Outras inconsistências" },
  { item: "Gases Medicinais", nome: "Quantidade cobrada a maior" },
  { item: "Gases Medicinais", nome: "Quantidade cobrada a menor" },
  // Curativos
  { item: "Curativos", nome: "Ausência de justificativa/evidência" },
  { item: "Curativos", nome: "Ausência de lançamento/cobrança" },
  { item: "Curativos", nome: "Item incluso em taxa/pacote" },
  { item: "Curativos", nome: "Outras inconsistências" },
  { item: "Curativos", nome: "Quantidade cobrada a maior" },
  { item: "Curativos", nome: "Quantidade cobrada a menor" },
  // Nutrição / Dieta
  { item: "Nutrição / Dieta", nome: "Ausência de justificativa/evidência" },
  { item: "Nutrição / Dieta", nome: "Ausência de lançamento/cobrança" },
  { item: "Nutrição / Dieta", nome: "Divergência de quantidade" },
  { item: "Nutrição / Dieta", nome: "Outras inconsistências" },
  { item: "Nutrição / Dieta", nome: "Quantidade cobrada a maior" },
  // Administrativo / Faturamento
  { item: "Administrativo / Faturamento", nome: "Ausência de senha / autorização" },
  { item: "Administrativo / Faturamento", nome: "Consistência de dados da conta" },
  { item: "Administrativo / Faturamento", nome: "Dados do beneficiário inválidos" },
  { item: "Administrativo / Faturamento", nome: "Data / período fora do faturamento" },
  { item: "Administrativo / Faturamento", nome: "Divergência de totalizadores" },
  { item: "Administrativo / Faturamento", nome: "Documentação / anexos da conta" },
  { item: "Administrativo / Faturamento", nome: "Item / valor zerado" },
  { item: "Administrativo / Faturamento", nome: "Item inexistente ou inválido" },
  { item: "Administrativo / Faturamento", nome: "Itens negativos" },
  { item: "Administrativo / Faturamento", nome: "Lançamento em duplicidade" },
  { item: "Administrativo / Faturamento", nome: "Outras validações administrativas" },
  { item: "Administrativo / Faturamento", nome: "Valor fora do contratado / sem negociação" },
];

const norm = (s: string) => (s || "").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").trim();

// Constrói os escopos iniciais resolvendo o item da conta pelo nome (contra o cadastro do banco).
// peso inicial = 1; operadoras vazio = vale para todas.
export function buildEscoposSeed(itens: Named[]): Escopo[] {
  return ESCOPOS_BASE.map((e, i) => {
    const it = itens.find((x) => norm(x.nome) === norm(e.item));
    return { id: "esc-" + String(i + 1).padStart(3, "0"), itemConta: it ? it.id : "", nome: e.nome, peso: 1, operadoras: [] };
  });
}
