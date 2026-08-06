// Checklists de teste embutidos, extraídos dos PDFs de homologação da AACD.
// As respostas (check/pendência/comentário/autor) ficam no Firebase (db.testChecklist),
// indexadas pelo id — mantenha os ids estáveis.
export interface TestChecklistItem { id: string; secao: string; pergunta: string; }

export const CHECK_AUDITORIA: TestChecklistItem[] = [
  { id: "aud-01", secao: "Passo 1 — Subir as regras (HML)", pergunta: "Confirmar que as regras publicadas são exatamente as homologadas." },
  { id: "aud-02", secao: "Passo 1 — Subir as regras (HML)", pergunta: "Executar a publicação das regras em produção." },
  { id: "aud-03", secao: "Passo 1 — Subir as regras (HML)", pergunta: "Conferir contagem de regras esperadas vs. publicadas." },
  { id: "aud-04", secao: "Passo 2 — Validação do espelho de contas", pergunta: "Para cada tipo de conta, abrir o espelho em modo consulta/simulação." },
  { id: "aud-05", secao: "Passo 2 — Validação do espelho de contas", pergunta: "Conferir que o espelho reflete corretamente as regras aplicadas." },
  { id: "aud-06", secao: "Passo 2 — Validação do espelho de contas", pergunta: "Validar valores, itens auditados e sinalizações por tipo de conta." },
  { id: "aud-07", secao: "Passo 2 — Validação do espelho de contas", pergunta: "Validar que cada integração retorna os dados esperados no espelho." },
  { id: "aud-08", secao: "Passo 2 — Validação do espelho de contas", pergunta: "Validação dos anexos em HML." },
  { id: "aud-09", secao: "Passo 3 — Alertas e pendência ao ERP", pergunta: "Levantar a lista de alertas com integração de pendência e One Rivio configurados." },
  { id: "aud-10", secao: "Passo 3 — Alertas e pendência ao ERP", pergunta: "Para cada alerta, reproduzir o cenário que deve dispará-lo." },
  { id: "aud-11", secao: "Passo 3 — Alertas e pendência ao ERP", pergunta: "Confirmar que o alerta aparece e bloqueia a ação corretamente." },
  { id: "aud-12", secao: "Passo 3 — Alertas e pendência ao ERP", pergunta: "Confirmar que cenários válidos não disparam bloqueio (sem falso positivo)." },
  { id: "aud-13", secao: "Passo 3 — Alertas e pendência ao ERP", pergunta: "Validar a mensagem/orientação exibida ao usuário." },
  { id: "aud-14", secao: "Passo 3 — Alertas e pendência ao ERP", pergunta: "Validar se a consulta de autorização foi executada e a regra aplicada." },
  { id: "aud-15", secao: "Passo 3 — Alertas e pendência ao ERP", pergunta: "Validar se a consulta de elegibilidade foi executada e a regra aplicada." },
  { id: "aud-16", secao: "Passo 3 — Alertas e pendência ao ERP", pergunta: "Validar se os anexos estão disponíveis e classificados corretamente." },
  { id: "aud-17", secao: "Passo 3 — Alertas e pendência ao ERP", pergunta: "Validar que regras de inclusão e exclusão estão ativas conforme configuração." },
  { id: "aud-18", secao: "Passo 3 — Alertas e pendência ao ERP", pergunta: "Validar o fechamento automático das contas." },
  { id: "aud-19", secao: "Passo 4 — Validar pendências", pergunta: "Levantar os tipos de pendência esperados." },
  { id: "aud-20", secao: "Passo 4 — Validar pendências", pergunta: "Verificar que as pendências corretas são geradas no One Rivio." },
  { id: "aud-21", secao: "Passo 4 — Validar pendências", pergunta: "Conferir descrição, setor e status de cada pendência." },
  { id: "aud-22", secao: "Passo 5 — Operações de ajuste de contas", pergunta: "Testar ação da conta: unificar período." },
  { id: "aud-23", secao: "Passo 5 — Operações de ajuste de contas", pergunta: "Testar ação da conta: quebra de período." },
  { id: "aud-24", secao: "Passo 5 — Operações de ajuste de contas", pergunta: "Testar ação da conta: mover itens entre contas." },
  { id: "aud-25", secao: "Passo 5 — Operações de ajuste de contas", pergunta: "Testar ação da conta: criar passagem de setor." },
  { id: "aud-26", secao: "Passo 5 — Operações de ajuste de contas", pergunta: "Testar ação da conta: editar guias." },
  { id: "aud-27", secao: "Passo 6 — Checklist de envio de e-mails", pergunta: "Concorrente: testar o envio de e-mails para os responsáveis." },
  { id: "aud-28", secao: "Passo 6 — Checklist de envio de e-mails", pergunta: "Retrospectiva: testar o envio de e-mails para supervisores." },
];

export const CHECK_FDE: TestChecklistItem[] = [
  { id: "fde-01", secao: "1. Importação de contas para o Marvin", pergunta: "Contas abertas são importadas conforme trigger para o ambiente de auditoria concorrente do Marvin?" },
  { id: "fde-02", secao: "1. Importação de contas para o Marvin", pergunta: "Contas abertas aparecem no One Rivio nas abas de auditoria e contas?" },
  { id: "fde-03", secao: "1. Importação de contas para o Marvin", pergunta: "Importação manual de contas no Marvin está funcionando corretamente?" },
  { id: "fde-04", secao: "2. Importação dos documentos necessários", pergunta: "Todos os documentos disponíveis para o atendimento testado foram importados para o Marvin e estão prontos para uso?" },
  { id: "fde-05", secao: "3. Mudança de etapas de contas", pergunta: "Finalizada a conta na auditoria concorrente, ela avança para a etapa de auditoria retrospectiva no Tasy?" },
  { id: "fde-06", secao: "3. Mudança de etapas de contas", pergunta: "Finalizada a concorrente, a conta muda de concorrente para retrospectiva na aba de auditoria do One Rivio?" },
  { id: "fde-07", secao: "3. Mudança de etapas de contas", pergunta: "Finalizada a retrospectiva, a conta avança corretamente para a etapa de Início Faturamento?" },
  { id: "fde-08", secao: "3. Mudança de etapas de contas", pergunta: "Finalizada a retrospectiva, a conta avança corretamente para a etapa de Início Consenso?" },
  { id: "fde-09", secao: "4. Mudança de status das contas", pergunta: "Finalizada a retrospectiva, a conta muda o status de provisório para definitivo no Tasy?" },
  { id: "fde-10", secao: "4. Mudança de status das contas", pergunta: "Contas em protocolos com críticas são retiradas do protocolo e voltam de definitivo para provisório automaticamente?" },
  { id: "fde-11", secao: "5. Criação de protocolos", pergunta: "Protocolos são criados automaticamente no Tasy quando uma conta que atende os requisitos chega à etapa de Início Faturamento?" },
  { id: "fde-12", secao: "5. Criação de protocolos", pergunta: "Protocolos criados têm as configurações corretas (datas, referência, título, competência)?" },
  { id: "fde-13", secao: "6. Inserção de contas em protocolos", pergunta: "Contas em definitivo na etapa 'Início Faturamento Rivio' entram automaticamente nos protocolos criados para recebê-las?" },
  { id: "fde-14", secao: "6. Inserção de contas em protocolos", pergunta: "Protocolos respeitam o limite de contas por tipo?" },
  { id: "fde-15", secao: "6. Inserção de contas em protocolos", pergunta: "Protocolos com críticas no portal, ao voltarem para provisório, deixam de receber novas contas automaticamente?" },
  { id: "fde-16", secao: "7. Mudança de status de protocolos", pergunta: "Protocolos mudam de provisório para definitivo ao atingir o limite de contas?" },
  { id: "fde-17", secao: "7. Mudança de status de protocolos", pergunta: "Protocolos colocados em definitivo com estrutura inválida voltam para provisório automaticamente no Tasy?" },
  { id: "fde-18", secao: "7. Mudança de status de protocolos", pergunta: "Protocolos com críticas no portal da operadora voltam para provisório automaticamente no Tasy?" },
  { id: "fde-19", secao: "7. Mudança de status de protocolos", pergunta: "Protocolos que voltaram para provisório sem correção nas contas não são retransmitidos ao serem colocados em definitivo de novo?" },
  { id: "fde-20", secao: "8. Transmissão de protocolos (Tasy → Rivio)", pergunta: "Protocolos colocados em definitivo são transmitidos para a Rivio dentro do range de tempo esperado?" },
  { id: "fde-21", secao: "8. Transmissão de protocolos (Tasy → Rivio)", pergunta: "Protocolos em definitivo com estrutura inválida apontam XML inválido na tela de remessas do One Rivio?" },
];

export const CHECK_AUDITORIA_SECOES = Array.from(new Set(CHECK_AUDITORIA.map((c) => c.secao)));
export const CHECK_FDE_SECOES = Array.from(new Set(CHECK_FDE.map((c) => c.secao)));
