# Rivio · Plataforma de Implantação — Contexto para desenvolvimento

> Cole este arquivo (ou o conteúdo dele) no início de um novo chat com o Claude antes de pedir alterações.
> Ele resume o que o app é, como está construído e as convenções/armadilhas importantes.

## 1. O que é

Aplicação web interna da Rivio para conduzir e documentar a **implantação do produto em um hospital**
(ciclo de receita: auditoria, faturamento, glosa, conciliação). Cada **hospital é um workspace** próprio.

## 2. Stack e execução

- **React + TypeScript + Vite**. Sem backend próprio. **Firebase Realtime Database** (RTDB) + **Login Google** restrito a `@rivio.com.br`.

```bash
npm install
npm run dev      # valida mudanças localmente
npm run build    # tsc -b && vite build
```

Deploy: **GitHub Pages** (repo `filipeorsatto-source/deployment`). Config Firebase em `src/firebase.ts` (client-side, ok no repo).

## 3. Hierarquia de Hospitais (workspaces)

Estrutura no RTDB:

- `hospitais/index/<id> = nome`  → lista leve para a tela inicial.
- `hospitais/data/<id>  = DB`    → o app inteiro opera sobre este nó (o DB daquele hospital).
- `frame` (legado) = workspace único antigo, **preservado como backup** e migrado 1x para o hospital "Samuel Libânio".

Fluxo (`src/App.tsx`): Auth → `Hospitais` → se nenhum selecionado mostra `HospitalPicker` (listar/abrir/adicionar); ao abrir,
renderiza `StoreProvider hospitalId+hospitalNome` → `Shell` (todas as abas) com botão **"Trocar hospital"**.

- `src/hospitais.ts`: `INDEX_PATH`, `dataPath(id)`, `buildNewHospitalDB()`, `createHospital(nome)`, `migrateLegacyIfNeeded()` (id fixo `h_samuel_libanio`).
- `src/views/HospitalPicker.tsx`: tela inicial (lê `hospitais/index`).
- `src/store.tsx`: `StoreProvider({hospitalId, hospitalNome})` lê/grava `hospitais/data/<id>`; contexto expõe `db`, `upd`, `hospitalNome`.

Novo hospital nasce em branco, mas com **bases padrão** (ver `src/data/defaults.ts`): 110 Units of Work, escopos (`buildEscoposSeed`),
13 itens da conta (`ITENS_CONTA_BASE`), catálogo padrão de **pendências** (`PENDENCIAS_BASE`) e de **inconsistências** (`INCONSISTENCIAS_BASE`).
Checklists (AS IS/Testes) são embutidos no código (aparecem em todo workspace; só as respostas são por hospital).

⚠️ **Regras do Firebase**: precisam cobrir o caminho `hospitais` (não só `frame`). Use regra na **raiz**:
`".read"/".write" = auth != null && email verificado && email termina com @rivio.com.br`.

## 4. Modelo de dados (`src/types.ts`)

Coleções do `DB`: cadastros (`operadoras, tiposAtendimento, tiposConta, itensConta, setores, funcionarios, sistemas, plataformas, produtosRivio`);
núcleo (`unitsOfWork, processos, conexoes, acoes, tobe, escopos, regras, pendencias, documentos, inconsistencias`);
checklists/respostas (`checklist, testChecklist, regraTestes, checklistExtra, testExtra`); legado (não usar em telas novas: `problemas, gapsManuais, testes, perguntas, respostas`).

Campos que valem destacar:

- `Escopo { id, itemConta, nome, peso, operadoras[] }` — peso **editável** (pondera cobertura); operadoras vazio = todas.
- `Regra { …, escopos[], status, codigo?, alertasGerados?, alertasResolvidos?, isLLM? }` — efetividade = `res/gen`.
- `Pendencia { …, area?, codigo? }` · `Inconsistencia { …, codigo?, tipo?, fechaConta?, fechaAtendimento?, fechaProtocolo? }`.

## 5. Store e convenções

- `const { db, upd, hospitalNome } = useStore();`
- `upd(fn)` clona o `db`, aplica `fn` e **grava o nó inteiro** do hospital no RTDB. `onValue` mantém sincronizado entre usuários.
- `normalize()`/`sanitize*()` preenchem defaults na leitura. **RTDB não guarda arrays vazios** → sempre proteja acessos com `(x.campo || [])`.
- Migração automática de escopos (`buildEscoposSeed`/`relinkEscopos`) roda na leitura.
- **Concorrência**: como grava o DB inteiro, há risco de last-write-wins com edições simultâneas. Próximo passo técnico (não feito): gravações granulares por caminho.

## 6. Regras, escopos e efetividade (aba Regras)

`src/views/Regras.tsx` — drill-down **Categoria (item da conta) → Escopo → Regras**:

- Escopo tem peso editável (inline), operadoras, **efetividade** agregada e badge de **gap** (sem regra). O filtro de operadora no topo
  afeta o gap: escopo coberto por ≥1 operadora do filtro não é gap.
- Escopos **base + manuais** (add/excluir). Editor do escopo tem multiselect de operadoras.
- Lista de regras abaixo: código, categoria, escopo, operadora, **LLM (Y/N)**, status e **efetividade ordenável**.
- Regra só fica **Ativa** com o teste marcado como Ok (aba Testes, `regraTestes`).
- Botão **"Atualizar base de regras"** → aplica o dataset do hospital preservando o status já editado.

Efetividade: `effVal(gen,res)=res/gen`; cores verde ≥35%, âmbar ≥15%, vermelho <15%.

`src/views/Dashboards.tsx` (`DashRegras`): penetração ponderada/absoluta, **cobertura por categoria** (% ponderado por peso, % absoluto, efetividade média)
e caixinha **"Considerar regras em teste na cobertura"**.

## 7. Ingestão de regras por hospital (`src/data/hospitalRules/`)

- `saoCamilo.ts` → `RULES_SAO_CAMILO` (339 regras já categorizadas + `gen`/`res` de efetividade), gerado por Claude a partir das planilhas.
- `index.ts` → `HOSPITAL_RULE_SEEDS` (registry **por nome de hospital**), `seedsForHospital(nome)` e `applyRuleSeeds(d, seeds)`.
- `applyRuleSeeds` faz **merge por `codigo`**: cria regras/escopos faltantes; atualiza sempre alertas gerados/resolvidos; **preserva** status, isLLM, operadoras, vínculos já editados. Regra nova nasce "Em teste".
- Aplicado automaticamente na 1ª abertura da aba Regras (se o hospital tem seeds e ainda não tem regras) e via botão "Atualizar base de regras".

### Como as datasets são geradas (fluxo de dados)
As planilhas do hospital ficam em `…/Deployment Tool …/Base de Dados/<Hospital>/Alertas.xlsx` e `Regras.xlsx`.
O app **não** lê xlsx; **o Claude** gera o `.ts` a partir delas (categorização heurística pela **descrição** da regra, casando com o catálogo de escopos/categorias base;
efetividade agregando os alertas por código). O sandbox do Claude **não alcança xlsx no Drive** → envie os arquivos no chat para ele processar.
Categorização é heurística e **editável** na tela.

## 8. Telas (`src/views/`)

Dashboards (`DashProcesso`, `DashRegras`, `DashTestes`); Diagnóstico (`QuestionarioASIS`, `Flow`, `ToBe`, `ChangeMgmt`, `Coverage`);
Produto & Regras (`Regras`, `Pendencias`, `Testes`, `Documentos`, `Inconsistencias`); Base (`UoW`, `Cadastros`). Tela inicial: `HospitalPicker`.
Órfãos (podem apagar): `Gaps.tsx`, `QuestionariosASIS.tsx`, `MapeamentoAI.tsx`.

## 9. Componentes/helpers

- `src/ui.tsx`: `Modal`, `Field`, `Badge`, `StatusBadge`, `Chips`, `MiniDropdown`, `MultiSelect` (dropdown multi), `FilterMulti` (filtro multi, vazio=todos), `inSel`/`anySel`, `Ic`/`icons`, `CrudTable`.
- `src/lib/constants.ts`: `REGRA_STATUS` (`Ativa`,`Em teste`,`Inativa`), `STATUS_WEIGHT`, listas e funções `*Class` de cor.
- `src/lib/derive.ts`: `uid`, `nameById`, `namesByIds`, `deriveTobe`, `deriveGaps`.
- Padrão checklist: `ChecklistAnswer{status,comentario,editadoPor,editadoEm}` (status `""`→`check`→`x`); comentário grava no `onBlur`.

## 10. Armadilhas / ambiente

- `tsconfig` com `noUnusedLocals:false` → imports não usados não quebram o build.
- Sempre `(campo || [])` (RTDB some com arrays vazios). Ids de itens base **estáveis** (respostas indexadas por id).
- A pasta do projeto é sincronizada no Google Drive; **o Claude edita via ferramentas de arquivo (Read/Write/Edit)** e **não compila** contra ela → **validar com `npm run dev`** e mandar o erro se houver.
- Subir só a pasta `src` basta para o código (sem deps novas). A regra do Firebase (`hospitais`) é à parte, no console.

---
_Mantenha este contexto em dia ao adicionar telas/coleções relevantes._
