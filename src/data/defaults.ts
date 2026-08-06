// AUTOGERADO a partir das planilhas do time (São Camilo / Libânio).
// Bases PADRÃO replicadas em cada novo hospital — vêm com as listas, porém "não preenchidas"
// (sem vínculo de setor/regra/operadora nas pendências; sem plano de ação nas inconsistências).
// Editar aqui altera a base de FUTUROS hospitais; hospitais já criados não são afetados.

export const ITENS_CONTA_BASE: string[] = [
  "Honorários Médicos",
  "Materiais",
  "OPME",
  "Medicamentos",
  "Pacotes",
  "Taxas",
  "Procedimentos",
  "Diárias",
  "Exames / SADT",
  "Gases Medicinais",
  "Curativos",
  "Nutrição / Dieta",
  "Administrativo / Faturamento"
];

export const PENDENCIAS_BASE: { codigo: string; area: string; nome: string }[] = [
  {
    "codigo": "1151",
    "area": "Atendimento",
    "nome": "Acompanhamento de procedimentos ambulatoriais/PS sem autorização lançada"
  },
  {
    "codigo": "1341",
    "area": "Atendimento",
    "nome": "AUSÊNCIA DE DOC DE SOLICITAÇÃO DE INTERNAÇÃO (PROCEDÊNCIA PS)"
  },
  {
    "codigo": "1147",
    "area": "Atendimento",
    "nome": "Convênio/plano/categoria/carteirinha incorretos, inativos ou cadastrados errado"
  },
  {
    "codigo": "1051",
    "area": "Atendimento",
    "nome": "Divergência de elegibilidade do paciente"
  },
  {
    "codigo": "1149",
    "area": "Atendimento",
    "nome": "Paciente com autorização da operadora, mas sem cobertura contratual no hospital"
  },
  {
    "codigo": "1052",
    "area": "Atendimento",
    "nome": "Procedimento que requer/não requer autorização, com erro na validação inicial"
  },
  {
    "codigo": "1146",
    "area": "Atendimento",
    "nome": "Senha vencida / necessidade de revalidação no dia da internação"
  },
  {
    "codigo": "1148",
    "area": "Atendimento",
    "nome": "Senha/autorização ausente, vencida ou incompatível"
  },
  {
    "codigo": "1150",
    "area": "Atendimento",
    "nome": "Solicitação de autorização no mesmo dia, quando o procedimento já foi realizado e dá tempo"
  },
  {
    "codigo": "1041",
    "area": "Cadastro",
    "nome": "Ajuste de materiais/códigos quando há problema estrutural de cadastro"
  },
  {
    "codigo": "1039",
    "area": "Cadastro",
    "nome": "Ajustes de cadastro quando o problema é de parametrização/codificação no sistema"
  },
  {
    "codigo": "1139",
    "area": "Cadastro",
    "nome": "Atualização de código GMM quando há mudança de marca/referência"
  },
  {
    "codigo": "1042",
    "area": "Cadastro",
    "nome": "Casos de PME com prazo maior de inclusão"
  },
  {
    "codigo": "1040",
    "area": "Cadastro",
    "nome": "Erros de vínculo, número/código errado, regra cadastral incorreta"
  },
  {
    "codigo": "1141",
    "area": "Cadastro",
    "nome": "Inclusão de itens na tabela quando aplicável"
  },
  {
    "codigo": "1339",
    "area": "Cadastro",
    "nome": "Item com valor zerado"
  },
  {
    "codigo": "1140",
    "area": "Cadastro",
    "nome": "Levantamento de itens não cadastrados corretamente"
  },
  {
    "codigo": "1044",
    "area": "Comercial",
    "nome": "Casos em que falta definição contratual sobre cobrança"
  },
  {
    "codigo": "1045",
    "area": "Comercial",
    "nome": "Decisão de tratamento: cobrar do paciente / negociar com operadora / aceitar exclusão"
  },
  {
    "codigo": "1143",
    "area": "Comercial",
    "nome": "Itens com glosa garantida porque a operadora não aceita inclusão em tabela"
  },
  {
    "codigo": "1043",
    "area": "Comercial",
    "nome": "Itens não presentes em tabela quando a origem é negociação/condição comercial"
  },
  {
    "codigo": "1142",
    "area": "Comercial",
    "nome": "Itens sem código GMM, sem similaridade, que exigem decisão comercial"
  },
  {
    "codigo": "1048",
    "area": "Compras / Suprimentos",
    "nome": "Item zerado na conta (causa material/precificação)"
  },
  {
    "codigo": "1145",
    "area": "Compras / Suprimentos",
    "nome": "Itens com troca de marca / código ANVISA diferente, quando precisarem ajuste cadastral"
  },
  {
    "codigo": "1046",
    "area": "Compras / Suprimentos",
    "nome": "Itens fora da tabela GMM"
  },
  {
    "codigo": "1047",
    "area": "Compras / Suprimentos",
    "nome": "OPME e materiais que perdem receita por falta de rota clara"
  },
  {
    "codigo": "1049",
    "area": "Compras / Suprimentos",
    "nome": "Precificação de operadora"
  },
  {
    "codigo": "1144",
    "area": "Compras / Suprimentos",
    "nome": "Similaridade para itens sem correspondência direta"
  },
  {
    "codigo": "1440",
    "area": "Enfermagem",
    "nome": "AUSÊNCIA DE DESCRIÇÃO CIRÚRGICA"
  },
  {
    "codigo": "1340",
    "area": "Farmácia",
    "nome": "ITEM COM QUANTIDADE NEGATIVA EM CONTA"
  },
  {
    "codigo": "1050",
    "area": "Guias e Autorizações",
    "nome": "Ausência de autorização ou guia"
  },
  {
    "codigo": "1342",
    "area": "Guias e Autorizações",
    "nome": "GUIAS"
  },
  {
    "codigo": "1439",
    "area": "Médico",
    "nome": "AUSÊNCIA DE LAUDO EM EXAME"
  }
];

export const INCONSISTENCIAS_BASE: { codigo: string; tipo: string; nome: string; fechaConta: boolean; fechaAtendimento: boolean; fechaProtocolo: boolean }[] = [
  {
    "codigo": "1",
    "tipo": "Conta",
    "nome": "Falta Informe a Alta do Paciente",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2",
    "tipo": "Conta",
    "nome": "Existem Processos Pendentes",
    "fechaConta": true,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "3",
    "tipo": "Conta",
    "nome": "Materiais/Medicamentos Pendentes",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "4",
    "tipo": "Conta",
    "nome": "Existem Procedimentos Pendentes na Conta do Paciente",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "5",
    "tipo": "Conta",
    "nome": "A Conta Está com Status Provisório",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "6",
    "tipo": "Conta",
    "nome": "Existem Procedimento de Diagnostico sem Laudo",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "7",
    "tipo": "Conta",
    "nome": "Conta com pacote não rateado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "8",
    "tipo": "Conta",
    "nome": "Valor dos itens difere do valor da conta paciente guia",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "9",
    "tipo": "Conta",
    "nome": "Valor do médico maior que o valor total do procedimento",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "10",
    "tipo": "Conta",
    "nome": "Existem Proced. e/ou Materiais c/Convênio Diferente da Conta",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "11",
    "tipo": "Conta",
    "nome": "Total do Procedimento Não Fecha com o Informado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "12",
    "tipo": "Conta",
    "nome": "Valor Honorário Informado Difere da Regra",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "13",
    "tipo": "Conta",
    "nome": "Falta Informar Médico Executor",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "14",
    "tipo": "Conta",
    "nome": "Guia com valor negativo",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "20",
    "tipo": "Conta",
    "nome": "Data dos Proc/Mat Fora do Periodo de Atendimento",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": false
  },
  {
    "codigo": "21",
    "tipo": "Conta",
    "nome": "Data dos Proc/Mat Fora do Periodo da Conta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": false
  },
  {
    "codigo": "22",
    "tipo": "Conta",
    "nome": "Existem Procedimentos/Materiais Com Preco Zerado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "23",
    "tipo": "Conta",
    "nome": "Existem Procedimentos/Materiais Sem Guia",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "24",
    "tipo": "Conta",
    "nome": "Existem Procedimentos executados por Médicos Residentes",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "25",
    "tipo": "Conta",
    "nome": "Existem Procedimentos/Materiais com saldo negativo",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "26",
    "tipo": "Conta",
    "nome": "Falta CID principal (convênio)",
    "fechaConta": false,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "27",
    "tipo": "Conta",
    "nome": "Valor do procedimento não confere com honorários (próprio)",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "28",
    "tipo": "Conta",
    "nome": "Existem Proced/Materiais com valor positivo e qtde zerada",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": false
  },
  {
    "codigo": "29",
    "tipo": "Conta",
    "nome": "Falta informar médico executor/profissional",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "30",
    "tipo": "Conta",
    "nome": "Falta lançamento de procedimento CIH",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "31",
    "tipo": "Conta",
    "nome": "Existe mais de um procedimento de TC/RM com 100 % mesmo dia",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "32",
    "tipo": "Conta",
    "nome": "Período da guia no atendimento fora da vigência",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "33",
    "tipo": "Conta",
    "nome": "Não foi informada a senha no atendimento do paciente",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "33",
    "tipo": "Protocolo",
    "nome": "Não foi informada a senha no atendimento do paciente",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "34",
    "tipo": "Conta",
    "nome": "O convênio não permite o atendimento em função do tempo",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "35",
    "tipo": "Conta",
    "nome": "Alta de paciente no setor de UTI",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "36",
    "tipo": "Conta",
    "nome": "Existem lançamentos em setor de outro estabelecimento",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "37",
    "tipo": "Conta",
    "nome": "Procedimento não pode ter médico executor",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "38",
    "tipo": "Conta",
    "nome": "Procedimentos sem médico definido como prestador",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "39",
    "tipo": "Conta",
    "nome": "Não informada a guia principal na conta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "40",
    "tipo": "Conta",
    "nome": "Valor máximo da conta maior que o permitido pelo convênio",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "41",
    "tipo": "Conta",
    "nome": "Existe material inativo na conta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "42",
    "tipo": "Conta",
    "nome": "Existe mais de um procedimento de US com 100 % mesmo dia",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "43",
    "tipo": "Conta",
    "nome": "Conta com mais de uma guia informada",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "44",
    "tipo": "Conta",
    "nome": "Há itens com data superior à data de validade da carteirinha",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "45",
    "tipo": "Conta",
    "nome": "Os lanctos do proc estão fora do número de dias da conta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "46",
    "tipo": "Conta",
    "nome": "Existe diária dentro do período de tolerância posterior",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "47",
    "tipo": "Conta",
    "nome": "Existe desconto cadastrado sem estar gerado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "48",
    "tipo": "Conta",
    "nome": "E-mail do paciente não informado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "49",
    "tipo": "Conta",
    "nome": "Tipo de faturamento não informado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "50",
    "tipo": "Conta",
    "nome": "Existem materiais/medicamentos que estão em \"Negociação\"",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "51",
    "tipo": "Conta",
    "nome": "Qtde de diárias maior que a qtde de dias da conta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "52",
    "tipo": "Conta",
    "nome": "Existem Proced/Materiais com valor negativo e qtde zerada",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "53",
    "tipo": "Conta",
    "nome": "Procedimento sem cadastro de conversão SUS",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "54",
    "tipo": "Conta",
    "nome": "Existe mais de um procedimento de RX com 100 % mesmo dia",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "55",
    "tipo": "Conta",
    "nome": "Existem Procedimentos/Materiais com saldo negativo dentro do",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "100",
    "tipo": "Conta",
    "nome": "Este material deve ter autorização especial",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "290",
    "tipo": "Conta",
    "nome": "Numeração BPA não informada.",
    "fechaConta": false,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "300",
    "tipo": "Conta",
    "nome": "Validade da guia expirada",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "301",
    "tipo": "Conta",
    "nome": "Falta informar a guia (obrigatória)",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "302",
    "tipo": "Conta",
    "nome": "Falta guia para procedimento",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "401",
    "tipo": "Conta",
    "nome": "Procedimento Não Cadastrado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "402",
    "tipo": "Conta",
    "nome": "Sexo Incompativel com o Procedimento",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": false
  },
  {
    "codigo": "403",
    "tipo": "Conta",
    "nome": "Idade Incompatível com o Procedimento",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "404",
    "tipo": "Conta",
    "nome": "Este Plano Não Permite Este Tipo de Atendimento",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "405",
    "tipo": "Conta",
    "nome": "Este Plano Não Permite Este Procedimento",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": false
  },
  {
    "codigo": "406",
    "tipo": "Conta",
    "nome": "Falta Guia Para Este Procedimento",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "407",
    "tipo": "Conta",
    "nome": "Número de Procedimentos Executados é Superior ao Autorizado",
    "fechaConta": false,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "408",
    "tipo": "Conta",
    "nome": "Item não coberto pelo convênio",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "410",
    "tipo": "Conta",
    "nome": "Este Plano Não Permite Este Material",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "411",
    "tipo": "Conta",
    "nome": "Existe procedimento sem responsável pelo crédito",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "412",
    "tipo": "Conta",
    "nome": "Existe procedimento/material sem estrutura da conta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "413",
    "tipo": "Conta",
    "nome": "Não existe proced. com o campo \"Proc princ atend\" checado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "500",
    "tipo": "Conta",
    "nome": "BPA - Falta Tipo de Atendimento",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "501",
    "tipo": "Conta",
    "nome": "BPA - Falta Municipio do Convênio",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "502",
    "tipo": "Conta",
    "nome": "BPA - Falta Atividade Profissional Para Procedimento",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "503",
    "tipo": "Conta",
    "nome": "BPA - Procedimento Não Existe para Atendimento Externo",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "504",
    "tipo": "Conta",
    "nome": "Paciente Sem Data de Nascimento",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "505",
    "tipo": "Conta",
    "nome": "Faixa Etária Incorreta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "506",
    "tipo": "Conta",
    "nome": "Procedimento Inativo",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "507",
    "tipo": "Conta",
    "nome": "Atendimento Externo em Unidade de Internação",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "508",
    "tipo": "Conta",
    "nome": "Procedimento sem Preço Ultima Versão (Não importa no BPA)",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "509",
    "tipo": "Conta",
    "nome": "Procedimento exige cobrança por APAC",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "510",
    "tipo": "Conta",
    "nome": "BPA - Não há CID informado pra este atendimento(Informativa)",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "511",
    "tipo": "Conta",
    "nome": "BPA - Falta Grupo atendimento para procedimento",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": false
  },
  {
    "codigo": "512",
    "tipo": "Conta",
    "nome": "BPA - Falta Tipo atendimento para procedimento",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": false
  },
  {
    "codigo": "601",
    "tipo": "Conta",
    "nome": "O procedimento necessita da autorização do convênio",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "602",
    "tipo": "Conta",
    "nome": "O procedimento será glosado pelo convênio",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "603",
    "tipo": "Conta",
    "nome": "Conta sem categoria parâmetro informada",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "604",
    "tipo": "Conta",
    "nome": "Conta sem convênio ou categoria de cálculo informada",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "605",
    "tipo": "Conta",
    "nome": "Conta paciente sem categoria IVA informada.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "700",
    "tipo": "Conta",
    "nome": "Falta AIH para Atendimento, ou Mais de Uma AIH",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "701",
    "tipo": "Conta",
    "nome": "Nenhum Laudo para AIH",
    "fechaConta": false,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "702",
    "tipo": "Conta",
    "nome": "Falta, ou Mais de um Laudo Principal (Original)",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "703",
    "tipo": "Conta",
    "nome": "Mais de um Laudo de Mudança de Procedimento",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "704",
    "tipo": "Conta",
    "nome": "Mais de Cinco Laudos Especiais",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "705",
    "tipo": "Conta",
    "nome": "Procedimento Sem Tipo de Ato",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "706",
    "tipo": "Conta",
    "nome": "Procedimento Sem Tipo de Serviço",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "707",
    "tipo": "Conta",
    "nome": "Laudos Incompletos",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "708",
    "tipo": "Conta",
    "nome": "AIH Incompleta",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "709",
    "tipo": "Conta",
    "nome": "Falta Executar Procedimento Principal",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": false
  },
  {
    "codigo": "710",
    "tipo": "Conta",
    "nome": "Falta CID Principal",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "711",
    "tipo": "Conta",
    "nome": "CID Principal Exige Secundário",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "712",
    "tipo": "Conta",
    "nome": "Falta Idade, Sexo, Prontuário ou Nacionalidade do Paciente",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "713",
    "tipo": "Conta",
    "nome": "Falta Endereço, Município, UF, IBGE, CEP do paciente",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "714",
    "tipo": "Conta",
    "nome": "Falta Quantidade de Nascidos Vivos ou Mortos",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "715",
    "tipo": "Conta",
    "nome": "Falta Data Alta, Motivo Alta, Clínica ou Caráter Internação",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "716",
    "tipo": "Conta",
    "nome": "Participante Procedimento Com Erro",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "717",
    "tipo": "Conta",
    "nome": "Mais de um Lançamento de Longa Permanência",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "718",
    "tipo": "Conta",
    "nome": "Procedimento Não Permitir Longa Permanência",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "719",
    "tipo": "Conta",
    "nome": "Lançamento de Longa Permanência Indevido",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "720",
    "tipo": "Conta",
    "nome": "Procedimento Diferente de SUS Internado",
    "fechaConta": false,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "721",
    "tipo": "Conta",
    "nome": "Dias de Internação Menor que Mínima Exigida",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "722",
    "tipo": "Conta",
    "nome": "Orgão Emissor da AIH Difere do Orgão do IBGE do Paciente",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "723",
    "tipo": "Conta",
    "nome": "Data de internação anterior à emissão do laudo",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "724",
    "tipo": "Conta",
    "nome": "Enfermaria e/ou Leito Não Informado",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "725",
    "tipo": "Conta",
    "nome": "Município Origem do Paciente Não Informado",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "726",
    "tipo": "Conta",
    "nome": "Falta CPF do médico solicitante e/ou do executor",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "727",
    "tipo": "Conta",
    "nome": "Diferença Entre Internação e Emissão Maior que 15 dias",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "728",
    "tipo": "Conta",
    "nome": "Procedimento Exige NF do Prestador",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "729",
    "tipo": "Conta",
    "nome": "Tipo de Serviço Não Permitir Médico",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "730",
    "tipo": "Conta",
    "nome": "Tipo de Serviço Exige Médico",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "731",
    "tipo": "Conta",
    "nome": "Tipo de Serviço Inválido para Este Procedimento",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "732",
    "tipo": "Conta",
    "nome": "Tipo de Ato Inválido para Este Procedimento",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "733",
    "tipo": "Conta",
    "nome": "CID Exige Caráter de Internação 8",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "734",
    "tipo": "Conta",
    "nome": "Procedimento Requer outro Procedimento Primeiro",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "735",
    "tipo": "Conta",
    "nome": "Quantidade de Procedimento Diferente de 1",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "736",
    "tipo": "Conta",
    "nome": "Diarias de Acompanhante Maior que Diárias do Paciente",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "737",
    "tipo": "Conta",
    "nome": "AIH - Laudo original não permite mudança de procedimento",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "738",
    "tipo": "Conta",
    "nome": "AIH - Falta laudo original\\mudança procedimento",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "739",
    "tipo": "Conta",
    "nome": "AIH - Procedimento realizado não executado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "740",
    "tipo": "Conta",
    "nome": "Total da Quantidade Maior que Permitida para Procedimentos",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "741",
    "tipo": "Conta",
    "nome": "Quantidade de Procedimento Executado Difere do Laudo",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": false
  },
  {
    "codigo": "742",
    "tipo": "Conta",
    "nome": "Falta Laudo para Procedimento AIH Sus (Obrigatório)",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "743",
    "tipo": "Conta",
    "nome": "Falta Laudo para Procedimento AIH Sus",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "744",
    "tipo": "Conta",
    "nome": "AIH - Falta consulta (25001019) para procedimento",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "745",
    "tipo": "Conta",
    "nome": "Tipo de guia não informado na conta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "750",
    "tipo": "Conta",
    "nome": "CGC/CPF do Prestador Inválido Para Tipo de Serviço",
    "fechaConta": false,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "760",
    "tipo": "Conta",
    "nome": "Nome do Paciente com Caracteres inválidos",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "761",
    "tipo": "Conta",
    "nome": "Alta com Mais de 185 dias da Apresentação",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "762",
    "tipo": "Conta",
    "nome": "Mes/Ano da Alta Não Pode ser Igual ao da Apresentação",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "764",
    "tipo": "Conta",
    "nome": "Data de entrada no setor anterior à data de entrada",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "765",
    "tipo": "Conta",
    "nome": "CEP não cadastrado no SUS",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "766",
    "tipo": "Conta",
    "nome": "Existem Dois Cid Principais ou Dois Secundários",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "767",
    "tipo": "Conta",
    "nome": "Procedimento AIH sem Preço na Ultima Versão",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "768",
    "tipo": "Conta",
    "nome": "Procedimento Não Compativel com CID Principal",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "769",
    "tipo": "Conta",
    "nome": "Procedimento Urg/Emerg com Caractere de Internação Diferente",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "770",
    "tipo": "Conta",
    "nome": "Não informada diária acompanhante quando tem direito",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "771",
    "tipo": "Conta",
    "nome": "Diária de UTI NeoNatal com dados imcompletos",
    "fechaConta": false,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "772",
    "tipo": "Conta",
    "nome": "Laqueadura tubária com dados imcompletos",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "773",
    "tipo": "Conta",
    "nome": "Caráter internação  Urg/Emerg sem procedimento Urg/Emerg",
    "fechaConta": false,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "774",
    "tipo": "Conta",
    "nome": "Tipo de Serviço '4' falta médico. (Opcional)",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "775",
    "tipo": "Conta",
    "nome": "AIH-Informado diária acom. para paciente que não tem direito",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "776",
    "tipo": "Conta",
    "nome": "AIH - Diárias acomp. + diárias UTI supera dias internação",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "777",
    "tipo": "Conta",
    "nome": "AIH - Procedimento não pode ter laudo",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "778",
    "tipo": "Conta",
    "nome": "AIH - Mais de um honorário sem intercorrência checada",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "779",
    "tipo": "Conta",
    "nome": "Tipo de serviço \"45\" para médico não conveniado ao SUS",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "801",
    "tipo": "Conta",
    "nome": "Procedimento/Exame duplicado para o dia",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "802",
    "tipo": "Conta",
    "nome": "Medicamento incorreto",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "803",
    "tipo": "Conta",
    "nome": "Medicamento não pode ser prescrito por não médico",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "804",
    "tipo": "Conta",
    "nome": "Procedimento inconsitente",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "900",
    "tipo": "Protocolo",
    "nome": "Percentual de cesarianas superior ao permitido",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "901",
    "tipo": "Protocolo",
    "nome": "Ultrapassaram 10% das Coronarioplastias com Implante Duplo",
    "fechaConta": false,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "902",
    "tipo": "Protocolo",
    "nome": "Alta Com Mais de 185 Dias da Apresentação",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "903",
    "tipo": "Protocolo",
    "nome": "Mes/ Ano da Alta Não Pode ser Igual ao da Apresentação",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "904",
    "tipo": "Protocolo",
    "nome": "Existem Atendimentos com Pacientes Homonimos",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "905",
    "tipo": "Protocolo",
    "nome": "Existem data de saída da AIH diferente da alta.(Informativo)",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "906",
    "tipo": "Protocolo",
    "nome": "SUS - Orgão emissor AIH incorreto",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "910",
    "tipo": "Protocolo",
    "nome": "Existem contas Estornadas ou Canceladas no Protocolo",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "915",
    "tipo": "Conta",
    "nome": "Existem materiais especiais sem procedimento faturado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "916",
    "tipo": "Protocolo",
    "nome": "SUS - Protocolo não possui nenhuma AIH com SADT",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "917",
    "tipo": "Conta",
    "nome": "Existem auditorias abertas para a conta do paciente",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": false
  },
  {
    "codigo": "918",
    "tipo": "Conta",
    "nome": "Não existe nenhum procedimento lançado na conta paciente",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "919",
    "tipo": "Conta",
    "nome": "Existem mat/med pendentes para devolução no atendimento",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "920",
    "tipo": "Conta",
    "nome": "Existe alta desse mesmo paciente em um atendimento de PS.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "921",
    "tipo": "Conta",
    "nome": "Existe lançamento de procedimento de médico não conveniado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "922",
    "tipo": "Conta",
    "nome": "Falta nº DNV ou nº DFM",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "923",
    "tipo": "Conta",
    "nome": "Existem mat/med pendentes para devolução na conta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "924",
    "tipo": "Conta",
    "nome": "Guia TISS duplicada na conta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "925",
    "tipo": "Conta",
    "nome": "Existem medicamentos sem relacionamento com o Brasíndice",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "926",
    "tipo": "Conta",
    "nome": "Existem materiais sem relacionamento com o Simpro",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "927",
    "tipo": "Conta",
    "nome": "Existem exames (lab) com regra de dependentes sem aprovação",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "987",
    "tipo": "Conta",
    "nome": "Teste Mensagem",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2000",
    "tipo": "Conta",
    "nome": "Falta informar data de nascimento do paciente",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2001",
    "tipo": "Conta",
    "nome": "Falta informar o sexo do paciente",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2001",
    "tipo": "Conta",
    "nome": "Falta informação do sexo do paciente",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2002",
    "tipo": "Conta",
    "nome": "Deve ter no mínimo 1 e no máximo 10 procedimentos p/APAC",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2003",
    "tipo": "Conta",
    "nome": "Falta informar data de vigencia da APAC no sus parametros",
    "fechaConta": false,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2004",
    "tipo": "Conta",
    "nome": "Data início validade APAC incorreta",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2005",
    "tipo": "Conta",
    "nome": "Data final de validade APAC incorreta",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2006",
    "tipo": "Conta",
    "nome": "Período de validade maior de três meses",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2007",
    "tipo": "Conta",
    "nome": "Data de nascimento posterior à data início de vigência da AP",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2008",
    "tipo": "Conta",
    "nome": "Data de início de tratamento inválida",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2009",
    "tipo": "Conta",
    "nome": "Datas dos transplantes realizados inválidas",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2010",
    "tipo": "Conta",
    "nome": "Quantidade de transplante realizados c/datas não fecham",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2011",
    "tipo": "Conta",
    "nome": "Datas dos tratamentos anteriores inválidas",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2012",
    "tipo": "Conta",
    "nome": "APAC Inicial com início de validade diferente da competência",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2013",
    "tipo": "Conta",
    "nome": "APAC Continuidade c/início validade maior/igual competência.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2014",
    "tipo": "Conta",
    "nome": "Paciente falecido antes do início do tratamento",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2015",
    "tipo": "Conta",
    "nome": "Falta informar cidade de nascimento do paciente",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2016",
    "tipo": "Conta",
    "nome": "Falta informar nome da filiação 1 do paciente",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": false
  },
  {
    "codigo": "2017",
    "tipo": "Conta",
    "nome": "Falta informar cep do endereço do paciente",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2018",
    "tipo": "Conta",
    "nome": "Falta informar ou incorreto o município IBGE do paciente",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": false
  },
  {
    "codigo": "2019",
    "tipo": "Conta",
    "nome": "Falta informar endereço do paciente",
    "fechaConta": true,
    "fechaAtendimento": false,
    "fechaProtocolo": false
  },
  {
    "codigo": "2020",
    "tipo": "Conta",
    "nome": "APAC já utilizada em outro atendimento",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2021",
    "tipo": "Conta",
    "nome": "Falta informar ou incorreto o CID de Topografia",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2022",
    "tipo": "Conta",
    "nome": "Falta informar ou incorreto o CID de Morfologia",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2023",
    "tipo": "Conta",
    "nome": "Falta informar indicador de metastase (S/N)",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2024",
    "tipo": "Conta",
    "nome": "Finalidade do tratamento incorreta ou incompleta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2025",
    "tipo": "Conta",
    "nome": "Data do diagnóstico médico inválida",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2026",
    "tipo": "Conta",
    "nome": "Estadio do tratamento incorreto ou incompleto",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2027",
    "tipo": "Conta",
    "nome": "Falta informar ou incorreto CID da primeira área irradiada",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2028",
    "tipo": "Conta",
    "nome": "Número incorreto de campos planejados",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2029",
    "tipo": "Conta",
    "nome": "Falta informar total de meses previstos",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2030",
    "tipo": "Conta",
    "nome": "Falta informar ou incorreto CID diagnóstico principal",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2031",
    "tipo": "Conta",
    "nome": "Falta informar se paciente foi indicado para transplante",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2032",
    "tipo": "Conta",
    "nome": "Falta informar se paciente esta inscrito para transplante",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2033",
    "tipo": "Conta",
    "nome": "Data de inscrição para transplante incorreta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2034",
    "tipo": "Conta",
    "nome": "Creatinina incorreta ou incompleta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2035",
    "tipo": "Conta",
    "nome": "Uréia pré incorreta ou incompleta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2036",
    "tipo": "Conta",
    "nome": "Uréia pós incorreta ou incompleta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2037",
    "tipo": "Conta",
    "nome": "Hepatite C incorreta ou incompleta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2038",
    "tipo": "Conta",
    "nome": "HBsAG incorreta ou incompleta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2039",
    "tipo": "Conta",
    "nome": "HIV Incorreta ou incompleta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2040",
    "tipo": "Conta",
    "nome": "HLA Incorreta ou incompleta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2041",
    "tipo": "Conta",
    "nome": "CPF do paciente não informado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2042",
    "tipo": "Conta",
    "nome": "Número residência do endereço do paciente não informado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2043",
    "tipo": "Conta",
    "nome": "Resultado do exame incorreto",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2044",
    "tipo": "Conta",
    "nome": "Data do transplante incorreto",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2045",
    "tipo": "Conta",
    "nome": "Número da APAC fora do período permitido",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2046",
    "tipo": "Conta",
    "nome": "Número da APAC inválido",
    "fechaConta": false,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2047",
    "tipo": "Conta",
    "nome": "Atividade Profissional inválida p/procedimento",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2048",
    "tipo": "Conta",
    "nome": "Motivo de cobrança incompatível p/procedimento principal",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2049",
    "tipo": "Conta",
    "nome": "Existem procedimentos incompativeis para APAC Inicial",
    "fechaConta": false,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2050",
    "tipo": "Conta",
    "nome": "Existem procedimentos incompativeis para APAC Continuidade",
    "fechaConta": false,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2051",
    "tipo": "Conta",
    "nome": "Quantidade do procedimento superior ao permitido",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": false
  },
  {
    "codigo": "2052",
    "tipo": "Conta",
    "nome": "Falta Cadastro da UPS - Unidade Prestadora de Serviço",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2053",
    "tipo": "Conta",
    "nome": "Atividade inválida para tipo de UPS",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2054",
    "tipo": "Conta",
    "nome": "Procedimento inválido para tipo de prestador",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2055",
    "tipo": "Conta",
    "nome": "CID diagnóstico secundário incorreto",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2056",
    "tipo": "Conta",
    "nome": "CID da segunda área irradiada incorreto",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2057",
    "tipo": "Conta",
    "nome": "CID da terceira área irradiada incorreto",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2058",
    "tipo": "Conta",
    "nome": "Procedimento secundário incompatível p/principal",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2059",
    "tipo": "Conta",
    "nome": "Unidade da Federação diferente da Secretaria da Saúde",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2060",
    "tipo": "Conta",
    "nome": "Dígito do prestador inválido",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2061",
    "tipo": "Conta",
    "nome": "Data de ocorrência deve ser informada p/motivo cobrança",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2062",
    "tipo": "Conta",
    "nome": "Data de ocorrência não deve ser informada p/motivo cobrança",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2063",
    "tipo": "Conta",
    "nome": "Data da ocorrência difere da competência",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2064",
    "tipo": "Conta",
    "nome": "Data ocorrência deve ser posterior ou igual que ínicio da AP",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2065",
    "tipo": "Conta",
    "nome": "Motivo de cobrança não permitido p/assistência farmacêutica",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2066",
    "tipo": "Conta",
    "nome": "Procedimento exclusivo para portadores de HIV",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2067",
    "tipo": "Conta",
    "nome": "Procedimento principal somente para menores de 19 anos",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2068",
    "tipo": "Conta",
    "nome": "Procedimento principal somente para maiores de 18 anos",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2069",
    "tipo": "Conta",
    "nome": "Procedimento somente com metastase",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2070",
    "tipo": "Conta",
    "nome": "Inválido CID da segunda área irradiada",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2071",
    "tipo": "Conta",
    "nome": "Inválido CID da terceira área irradiada",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2072",
    "tipo": "Conta",
    "nome": "CID do diagnóstico secundário inválido",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2073",
    "tipo": "Conta",
    "nome": "Procedimento somente para pacientes menores de 10 anos",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2074",
    "tipo": "Conta",
    "nome": "Proced medicamento incompatível c/CID principal",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2075",
    "tipo": "Conta",
    "nome": "Proced medicamento incompatível c/CID secundário",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2076",
    "tipo": "Conta",
    "nome": "Prestador desativado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2077",
    "tipo": "Conta",
    "nome": "APAC Única já apresentada",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2078",
    "tipo": "Conta",
    "nome": "Cobrança anterior não encontrada",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2079",
    "tipo": "Conta",
    "nome": "Cobrança anterior não foi permanência e mesmo procedimento",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2080",
    "tipo": "Conta",
    "nome": "Paciente com motivo de cobrança de óbito movto anterior",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2081",
    "tipo": "Conta",
    "nome": "CID secundário para renal crônico inválido",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2082",
    "tipo": "Conta",
    "nome": "Inscrito para transplante deve ser indicado para transplante",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2083",
    "tipo": "Conta",
    "nome": "Sem exame 180 dias após inscrição para transplante",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2084",
    "tipo": "Conta",
    "nome": "Procedimento exclusivo para transplantado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2085",
    "tipo": "Conta",
    "nome": "Número da APAC fora da validade",
    "fechaConta": false,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2086",
    "tipo": "Conta",
    "nome": "CID não é de Topografia",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2087",
    "tipo": "Conta",
    "nome": "CID Morfologia não deve ser informado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2088",
    "tipo": "Conta",
    "nome": "CID Não permitido para Radioterapia",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2089",
    "tipo": "Conta",
    "nome": "CID não estadiável",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2090",
    "tipo": "Conta",
    "nome": "Áreas irradiadas devem ser diferentes",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2091",
    "tipo": "Conta",
    "nome": "Procedimento em duplicata",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2092",
    "tipo": "Conta",
    "nome": "Pacote com prejuizo acima do permitido",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2093",
    "tipo": "Conta",
    "nome": "Falta informar o CGC do fornecedor do material",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2094",
    "tipo": "Conta",
    "nome": "Erro de compatibilidade de procedimentos executados",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2095",
    "tipo": "Conta",
    "nome": "CID incompatível com sexo do paciente",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2096",
    "tipo": "Conta",
    "nome": "Falta CPF do médico responsável",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2097",
    "tipo": "Conta",
    "nome": "Procedimento 99085011 exige certidão de nascimento",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2098",
    "tipo": "Conta",
    "nome": "Procedimento exige carteira da gestante",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2099",
    "tipo": "Conta",
    "nome": "Paciente maior de 60 anos tem direito a diária de acompanhan",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2100",
    "tipo": "Conta",
    "nome": "Paciente com menos dias de internação da informada na AIH",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2101",
    "tipo": "Conta",
    "nome": "AIH - Data de autorização não informada - procedimento exige",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2102",
    "tipo": "Conta",
    "nome": "Diária UTI mês da Alta maior que dias de internação",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2103",
    "tipo": "Conta",
    "nome": "Falta número no endereço do paciente",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2104",
    "tipo": "Conta",
    "nome": "Diária UTI mês da Alta ultrapassou limite SUS",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2105",
    "tipo": "Conta",
    "nome": "CID inválido para proced. autorizado (tipo laudo 9-Outros)",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2106",
    "tipo": "Conta",
    "nome": "Número da AIH da aba AIH e laudos diferente",
    "fechaConta": false,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2107",
    "tipo": "Conta",
    "nome": "Número da AIH zerada",
    "fechaConta": false,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2108",
    "tipo": "Conta",
    "nome": "Cep logradouro do endereço, não fecha com município IBGE",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2109",
    "tipo": "Conta",
    "nome": "Falta médico executor p/tipo serviço 7 ou executor sem CPF",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2110",
    "tipo": "Conta",
    "nome": "Data de autorização na tela da AIH não informada",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2111",
    "tipo": "Conta",
    "nome": "Data de autorização na tela da AIH não pode ser informada",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2112",
    "tipo": "Conta",
    "nome": "Existem procedimentos com quantidade maior que 999",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2113",
    "tipo": "Conta",
    "nome": "Campos do gestor incorretos informar todos ou nenhum",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": false
  },
  {
    "codigo": "2114",
    "tipo": "Conta",
    "nome": "Dígito da AIH na aba da AIH incorreto",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2115",
    "tipo": "Conta",
    "nome": "Verificar quantidade de dígitos da AIH, na aba da AIH",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2116",
    "tipo": "Conta",
    "nome": "Proc. órtese,prótese mat espec., incorreto p/proc.solicitado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2117",
    "tipo": "Conta",
    "nome": "Tipo de convênio do atendimento não compatível com convênio",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2118",
    "tipo": "Conta",
    "nome": "Data autorização de acompanhante fora do período internação",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2119",
    "tipo": "Conta",
    "nome": "Tipo de serviço 21 exige médico",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2120",
    "tipo": "Conta",
    "nome": "Tipo de serviço 22 não pode ter médico",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2121",
    "tipo": "Conta",
    "nome": "Tipo de serviço 6 exige médico executor",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2122",
    "tipo": "Conta",
    "nome": "Tipo de serviço 23 exige médico executor",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2123",
    "tipo": "Conta",
    "nome": "SUS - Tipo de serviço 3-SADT Próprio exige CGC do Hospital",
    "fechaConta": false,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2124",
    "tipo": "Conta",
    "nome": "SUS - Existem participante em procedimentos que não permitem",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2125",
    "tipo": "Conta",
    "nome": "SUS - Procedimento realizado é de alta complexidade",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2126",
    "tipo": "Conta",
    "nome": "Cartão nacional SUS nao informado ou incorreto(Cad.paciente)",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2127",
    "tipo": "Conta",
    "nome": "SUS - Mais de um procedimento autorizado do mesmo grupo sus",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2128",
    "tipo": "Conta",
    "nome": "Diária de UTI supera dias de internação",
    "fechaConta": false,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2129",
    "tipo": "Conta",
    "nome": "Total UTI + diária acompanhante maior que período internação",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2130",
    "tipo": "Conta",
    "nome": "SUS - Tipo de serviço inválido para participante",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2131",
    "tipo": "Conta",
    "nome": "SUS - Tipo de ato inválido para participante",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2132",
    "tipo": "Conta",
    "nome": "Motivo de cobrança exige nro próxima AIH",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2133",
    "tipo": "Conta",
    "nome": "Quantidade de vivos difere da(alta + transf + óbitos)",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2134",
    "tipo": "Conta",
    "nome": "Procedimento da AIH difere da mudança de procedimento",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2135",
    "tipo": "Conta",
    "nome": "SUS - Paciente sem Identidade, CPF e Certidão Nasc.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2136",
    "tipo": "Conta",
    "nome": "AIH - Procedimento realizado não permite permanência",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2137",
    "tipo": "Conta",
    "nome": "Quantidade de meses previstos fora do permitido",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2150",
    "tipo": "Conta",
    "nome": "AIH sem conta vinculada",
    "fechaConta": false,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2151",
    "tipo": "Conta",
    "nome": "Existem outras AIH sem vinculação com conta neste atendiment",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2152",
    "tipo": "Conta",
    "nome": "Existem Laudos sem vinculação com conta neste atendimento",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2153",
    "tipo": "Conta",
    "nome": "Existe mais de uma AIH vinculada a esta conta",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2154",
    "tipo": "Conta",
    "nome": "Existem APAC com competencia diferente do protocolo",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2155",
    "tipo": "Conta",
    "nome": "Mais de um anestesista lançado p/mesmo proc. da AIH",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2156",
    "tipo": "Conta",
    "nome": "Existem procedimentos com quantidade zerada",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2157",
    "tipo": "Conta",
    "nome": "APAC - Quando metastase checado, estadio deve ser nulo",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2158",
    "tipo": "Conta",
    "nome": "APAC - Finalidade de tratamento inválido p/metastase checado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2159",
    "tipo": "Conta",
    "nome": "APAC - Duas APAC para mesmo paciente na mesma competencia",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2160",
    "tipo": "Conta",
    "nome": "Data ocorrência dever ser maior igual data início tratamento",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2161",
    "tipo": "Conta",
    "nome": "Quantidade procedimento APAC diferente procedimento conta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2162",
    "tipo": "Conta",
    "nome": "Existem procedimentos prescritos pendentes no atendimento",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2163",
    "tipo": "Conta",
    "nome": "Intervalo de solicitação do exame inferior ao cadastro",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2164",
    "tipo": "Conta",
    "nome": "APAC continuidade com período de validade diferente anterior",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2165",
    "tipo": "Conta",
    "nome": "SUS - Cobrança dupla da diária de acompanhante",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2166",
    "tipo": "Conta",
    "nome": "APAC - Procedimento principal não permite estadio",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2167",
    "tipo": "Conta",
    "nome": "SUS AIH - Tipo de atendimento difere de internado",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2168",
    "tipo": "Conta",
    "nome": "SUS - CEP Inválido para Datasus",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2169",
    "tipo": "Conta",
    "nome": "AIH - Quantidade do procedimento difere da qtd de diárias",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2170",
    "tipo": "Conta",
    "nome": "SUS - Qtde de leitos utilizados supera disponibilidade",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2171",
    "tipo": "Conta",
    "nome": "APAC - Procedimentos da apac diferem dos procedimentos conta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2172",
    "tipo": "Conta",
    "nome": "APAC - Data competência posterior à data de óbito do pacient",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2173",
    "tipo": "Conta",
    "nome": "APAC  Quant campos planejados diferente competência anterior",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2174",
    "tipo": "Conta",
    "nome": "APAC - Quant do procedimento maior que planejado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2175",
    "tipo": "Conta",
    "nome": "SUS - Procedimento indevido para o Hospital",
    "fechaConta": false,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2176",
    "tipo": "Conta",
    "nome": "APAC - CID Topografia não permite estadio",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2177",
    "tipo": "Conta",
    "nome": "Intervalo de solicitação do mat/med inferior ao cadastro",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2178",
    "tipo": "Conta",
    "nome": "APAC - Procedimento principal zerado com proced secundário",
    "fechaConta": false,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2179",
    "tipo": "Conta",
    "nome": "Existem materiais prescritos pendentes no atendimento",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2180",
    "tipo": "Conta",
    "nome": "APAC - Data competência posterior à data de alta do paciente",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2181",
    "tipo": "Conta",
    "nome": "APAC - Procedimento principal não lançado na conta",
    "fechaConta": false,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2182",
    "tipo": "Conta",
    "nome": "Sexo do paciente setado como Indeterminado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2200",
    "tipo": "Conta",
    "nome": "AIH - Existem procedimentos excludentes entre si",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2201",
    "tipo": "Conta",
    "nome": "AIH - Falta lançar procedimento obrigatório para esta AIH",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2202",
    "tipo": "Conta",
    "nome": "AIH - Existe procedimento impeditivo para esta AIH",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2203",
    "tipo": "Conta",
    "nome": "AIH - Procedimento ultrapassou % de restrição para a AIH",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2204",
    "tipo": "Conta",
    "nome": "AIH - Procedimento não liberado para as SIPAC do Hospital",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2205",
    "tipo": "Conta",
    "nome": "APAC - Informada a categoria no lugar do CID",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2206",
    "tipo": "Conta",
    "nome": "Motivo de cobrança incompatível com data final validade",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2207",
    "tipo": "Conta",
    "nome": "APAC - APAC inicial duplicada",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2208",
    "tipo": "Conta",
    "nome": "AIH - Falta informar procedimento compatível",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2210",
    "tipo": "Conta",
    "nome": "AIH - Qtd procedimento difere da qtd de dias úteis do atend.",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2220",
    "tipo": "Conta",
    "nome": "Qtd de auxiliares maior que permitido em tabela",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2221",
    "tipo": "Conta",
    "nome": "Anestesista informado p/proc sem porte anestesico",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2222",
    "tipo": "Conta",
    "nome": "Mais de um anestesista informado p/procedimento",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2223",
    "tipo": "Conta",
    "nome": "Cobrança anterior encontrada, mas não faturada",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2224",
    "tipo": "Conta",
    "nome": "Existem APAC com 11 e 13 dígitos neste protocolo",
    "fechaConta": false,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2225",
    "tipo": "Conta",
    "nome": "AIH Parto/cesária, não usar tipo de ato 6, usar proc. espec.",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2226",
    "tipo": "Conta",
    "nome": "AIH Proc de analgesia incorreto para proc. realizado",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2227",
    "tipo": "Conta",
    "nome": "AIH Não informado proc. de analgesia, qdo permitido",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2228",
    "tipo": "Conta",
    "nome": "AIH - Tipo de ato incompatível com tipo de serviço",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2229",
    "tipo": "Conta",
    "nome": "Data da AIH anterior à data de internação",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2230",
    "tipo": "Conta",
    "nome": "Qtd de auxiliares é inferior a quantidade máxima permitida",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2231",
    "tipo": "Conta",
    "nome": "AIH - Não existe nenhum proc. com tipo de serviço 4, 7 ou 45",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2232",
    "tipo": "Conta",
    "nome": "Há 2 tomografias de crânio e coluna na mesma AIH",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2233",
    "tipo": "Conta",
    "nome": "Data disgnóstico posterior ao início do tratamento",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2234",
    "tipo": "Conta",
    "nome": "AIH - Atend. ao recém-nato na sala de parto indevido",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2235",
    "tipo": "Conta",
    "nome": "AIH com mais de 84 Atos Profissionais",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2236",
    "tipo": "Conta",
    "nome": "AIH - Quantidade do ato superior ao Limite",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2237",
    "tipo": "Conta",
    "nome": "AIH - Falta CID causa de morte",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2238",
    "tipo": "Conta",
    "nome": "Procedimento Não Compativel com CID Causa de Morte",
    "fechaConta": true,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "2239",
    "tipo": "Conta",
    "nome": "AIH - Espec. da AIH diferente da espec. do cadastro de proc.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2240",
    "tipo": "Conta",
    "nome": "Período de validade menor de três meses",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2241",
    "tipo": "Conta",
    "nome": "Mat/med ou procedimento não possui código de conversão",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2242",
    "tipo": "Conta",
    "nome": "AIH - Caráter de internação diferente do informado no Atend",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2243",
    "tipo": "Conta",
    "nome": "Falta CPF do médico participante",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2244",
    "tipo": "Conta",
    "nome": "Existem mat. que não possuem cód. de conversão (menos OPME)",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2245",
    "tipo": "Conta",
    "nome": "Existem materiais que não possuem código de conversão",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2246",
    "tipo": "Conta",
    "nome": "Existem medicamentos que não possuem código de conversão",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2247",
    "tipo": "Conta",
    "nome": "Existem procedimentos que não possuem código de conversão",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2248",
    "tipo": "Conta",
    "nome": "Existem Serviços/Diárias que não possuem código de conversão",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2249",
    "tipo": "Conta",
    "nome": "Há itens pendentes c/ data prescrição no período da conta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2250",
    "tipo": "Conta",
    "nome": "Existem pacotes na conta que não foram gerados",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2251",
    "tipo": "Conta",
    "nome": "Declaração de Óbito não cadastrada para o Atendimento",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2252",
    "tipo": "Conta",
    "nome": "Não existem procedimentos lançados na aba \"Procedimento\"",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2253",
    "tipo": "Conta",
    "nome": "Procedimento TUSS não informado na aba \"Serviços\"",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2254",
    "tipo": "Conta",
    "nome": "Existem itens com valores negativos na conta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2255",
    "tipo": "Conta",
    "nome": "Proc TUSS não informado na aba \"Serviços\" (menos Pacote)",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2256",
    "tipo": "Conta",
    "nome": "Não há diárias lançadas na conta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2257",
    "tipo": "Conta",
    "nome": "Existem proc/mat de cirurgias com bloqueio de faturamento",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2258",
    "tipo": "Conta",
    "nome": "Existem procedimentos SUS em conta de convênio",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2259",
    "tipo": "Conta",
    "nome": "Existem proced. que exigem informação do \"Médico exec conta\"",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2260",
    "tipo": "Conta",
    "nome": "Existem cirurgias de anát. patológica sem proced. executado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2261",
    "tipo": "Conta",
    "nome": "Existem Mat/Med sem código TUSS",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2262",
    "tipo": "Conta",
    "nome": "Existem mat que não possuem cód. de conversão (somente OPME)",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2263",
    "tipo": "Conta",
    "nome": "Existem Mat/Med que não possuem códigos TISS/TUSS/Conversão",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2264",
    "tipo": "Conta",
    "nome": "Existem procedimentos com laudo ainda não liberados",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2265",
    "tipo": "Conta",
    "nome": "Existem Mat/Med sem código TUSS (Menos pacote)",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "2266",
    "tipo": "Conta",
    "nome": "Existe OPME sem código de conversão (Código Manual).",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3000",
    "tipo": "Conta",
    "nome": "TISS - Existem mat/med com valor zerado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3001",
    "tipo": "Conta",
    "nome": "Existem atendimentos cujo nome no convênio está diferente.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3002",
    "tipo": "Conta",
    "nome": "TISS - Existem procedimento com valor zerado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3003",
    "tipo": "Conta",
    "nome": "Paciente não possui dt. alta e dt. alta guia TISS informada",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3004",
    "tipo": "Conta",
    "nome": "Existem procedimentos sem o número da cirurgia",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3005",
    "tipo": "Conta",
    "nome": "Passaporte do paciente e/ou do responsável não informado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3006",
    "tipo": "Conta",
    "nome": "A conta possui materiais sem nota fiscal OPME",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3007",
    "tipo": "Conta",
    "nome": "Existe mat/med consignados com o valor zerado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3008",
    "tipo": "Conta",
    "nome": "O Total de descontos não é igual ao total de adicionais",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3009",
    "tipo": "Conta",
    "nome": "Há pendências da conta em aberto",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3010",
    "tipo": "Conta",
    "nome": "CPF ou Doc Est do paciente e/ou do responsável não informado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3011",
    "tipo": "Conta",
    "nome": "Existem materiais na conta não autorizados",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3012",
    "tipo": "Conta",
    "nome": "Conta sem Pagador informado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3013",
    "tipo": "Conta",
    "nome": "Conta paciente sem auditoria",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3014",
    "tipo": "Conta",
    "nome": "Conta paciente sem responsável informado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3015",
    "tipo": "Conta",
    "nome": "Atendimento sem lançamento de procedimento CIH",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3016",
    "tipo": "Conta",
    "nome": "Existe participante sem responsável pelo crédito",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3017",
    "tipo": "Conta",
    "nome": "Existem Materiais ou Medicamentos Com Valor Zerado",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": true
  },
  {
    "codigo": "3018",
    "tipo": "Conta",
    "nome": "Existe procedimento pendente de autorização no atendimento",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3019",
    "tipo": "Conta",
    "nome": "Existem itens na conta sem conferência",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3020",
    "tipo": "Conta",
    "nome": "Existem itens que não possuem o médico do convênio informado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3021",
    "tipo": "Conta",
    "nome": "A conta do paciente não foi recalculada",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3022",
    "tipo": "Conta",
    "nome": "TISS - A conta não possui guia TISS gerada",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3023",
    "tipo": "Conta",
    "nome": "Não foi informada senha no atendimento para a guia da conta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3024",
    "tipo": "Conta",
    "nome": "Conta Paciente sem Estágio informado",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3025",
    "tipo": "Conta",
    "nome": "Existem guias duplicadas para este convênio",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3026",
    "tipo": "Conta",
    "nome": "O número da autorização(Guia) deve ser preenchido.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3029",
    "tipo": "Conta",
    "nome": "Matrícula do prestador em materiais e medicamentos inválida",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3030",
    "tipo": "Conta",
    "nome": "Data do material ou medicamento anterior à data da internaçã",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3031",
    "tipo": "Conta",
    "nome": "Para o tipo do atendimento 3 e 8 o local de utilização do ma",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3033",
    "tipo": "Conta",
    "nome": "Função clínico deve ser apresentada somente para os procedim",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3034",
    "tipo": "Conta",
    "nome": "Número do conselho inválido ou profissional bloqueado nesta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3035",
    "tipo": "Conta",
    "nome": "Data do material ou medicamento posterior à data da alta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3036",
    "tipo": "Conta",
    "nome": "Motivo de alta inválida.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3037",
    "tipo": "Conta",
    "nome": "Prestador informado mais de uma vez para mesma função.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3038",
    "tipo": "Conta",
    "nome": "A função do prestador neste ato esta inválida.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3039",
    "tipo": "Conta",
    "nome": "A função apresentada não corresponde a função do tratamento",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3040",
    "tipo": "Conta",
    "nome": "Código do serviço hospitalar inválido/bloqueado nessa data.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3041",
    "tipo": "Conta",
    "nome": "O tipo de atendimento apresentado no registro tipo 2 não cor",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3042",
    "tipo": "Conta",
    "nome": "Campo CID não encontrado na tabela cid 10.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3043",
    "tipo": "Conta",
    "nome": "Tipo de tratamento inválido.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3044",
    "tipo": "Conta",
    "nome": "Código do serviço hospitalar está com o tamanho máximo que o",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3045",
    "tipo": "Conta",
    "nome": "Data do inicio é posterior à data do fim do ato.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3046",
    "tipo": "Conta",
    "nome": "A via de acesso deve ser preenchida.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3047",
    "tipo": "Conta",
    "nome": "Quando o tipo do prestador for 2 a matrícula do prestador em",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3048",
    "tipo": "Conta",
    "nome": "Código do procedimento inválido para este tipo do atendiment",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3049",
    "tipo": "Conta",
    "nome": "O profissional não pode ser cirurgião e auxiliar no mesmo at",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3050",
    "tipo": "Conta",
    "nome": "Quantidade de diárias não pode ser maior que o número de dia",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3051",
    "tipo": "Conta",
    "nome": "O código do procedimento em exames internos é inválido ou bl",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3052",
    "tipo": "Conta",
    "nome": "Código do serviço hospitalar deve ser preenchido.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3053",
    "tipo": "Conta",
    "nome": "Internação o \"CID\" principal deve ser preenchido.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3054",
    "tipo": "Conta",
    "nome": "Data do atendimento inválida.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3055",
    "tipo": "Conta",
    "nome": "Número do conselho maior que o permitido.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3056",
    "tipo": "Conta",
    "nome": "Data fim do ato é posterior à data da alta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3057",
    "tipo": "Conta",
    "nome": "Data inicio anterior à data da internação",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3059",
    "tipo": "Conta",
    "nome": "O código do conselho deve ser preenchido.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3060",
    "tipo": "Conta",
    "nome": "Quantidade máxima de taxa de salas.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3061",
    "tipo": "Conta",
    "nome": "Função do prestador inválida.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3062",
    "tipo": "Conta",
    "nome": "Tipo de acomodação inválida.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3063",
    "tipo": "Conta",
    "nome": "Data do exame interno anterior à da internação.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3064",
    "tipo": "Conta",
    "nome": "Plantões de U.T.I.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3065",
    "tipo": "Conta",
    "nome": "IPASGO - Atos.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3066",
    "tipo": "Conta",
    "nome": "Responsável pelo crédito.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3067",
    "tipo": "Conta",
    "nome": "Tipo de atendimento.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3068",
    "tipo": "Conta",
    "nome": "Entrada única.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3069",
    "tipo": "Conta",
    "nome": "IPASGO - Box.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3070",
    "tipo": "Conta",
    "nome": "IPASGO - Diárias.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3071",
    "tipo": "Conta",
    "nome": "IPASGO - Materiais/Medicamentos",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3072",
    "tipo": "Conta",
    "nome": "Existe mais de um procedimento de TC/RM com 100 % mesmo dia",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3073",
    "tipo": "Conta",
    "nome": "Existe procedimento pendente de autorização nesta conta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3074",
    "tipo": "Conta",
    "nome": "Existem procedimentos que exigem senha no atendimento",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3075",
    "tipo": "Conta",
    "nome": "Existem um ou mais procedimentos de diagnóstico sem laudo",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3076",
    "tipo": "Conta",
    "nome": "É necessário informar o tipo de cobrança da conta",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3077",
    "tipo": "Conta",
    "nome": "Há itens com valor unitário maior que o preço de venda regul",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3080",
    "tipo": "Conta",
    "nome": "O valor total de coparticipação pago é maior que o teto por",
    "fechaConta": false,
    "fechaAtendimento": false,
    "fechaProtocolo": false
  },
  {
    "codigo": "3081",
    "tipo": "Conta",
    "nome": "Não há um diagnóstico liberado para o paciente.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "3082",
    "tipo": "Conta",
    "nome": "Não há uma evolução liberada para o paciente.",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "12454",
    "tipo": "Conta",
    "nome": "Formação de preço inválida para esta segmentação",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "12500",
    "tipo": "Conta",
    "nome": "Pendência MIPRES",
    "fechaConta": true,
    "fechaAtendimento": false,
    "fechaProtocolo": false
  },
  {
    "codigo": "13100",
    "tipo": "Conta",
    "nome": "Valor máximo da conta maior que o permitido pelo valor máxim",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  },
  {
    "codigo": "13200",
    "tipo": "Conta",
    "nome": "Valor máximo da conta maior que o permitido pelo valor máxim",
    "fechaConta": true,
    "fechaAtendimento": true,
    "fechaProtocolo": true
  }
];
