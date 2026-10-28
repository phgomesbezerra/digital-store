# Digital Store

Loja virtual desenvolvida em React como projeto final do curso de Front-end da Digital College, a partir do layout DRIP STORE no Figma. Projeto acadêmico de demonstração, com catálogo, carrinho e pedidos simulados.

## Funcionalidades

- **Home** com destaque, coleções, categorias e produtos em alta
- **Listagem de produtos** com busca por texto, filtros por marca/categoria/gênero/estado e ordenação por preço (funcionais, não apenas visuais)
- **Página de detalhe** com galeria, miniaturas, seleção de tamanho/cor e compra simulada que adiciona ao carrinho
- **Consumo real de API**: as páginas buscam o catálogo em `/api/products` (ver seção API abaixo)
- **Layout responsivo** testado em 320px, 390px e 1280px
- **Cadastro, login e perfil de demonstração**: até 5 personagens com nome, CPF fictício, e-mail fictício, celular e entrega editáveis. Seleção pelo e-mail ou lista, edição e exclusão com confirmação. Dados somente no localStorage, sem envio ao servidor ou senha real.
- **Carrinho de demonstração**: ao escolher tamanho e cor, o botão Comprar adiciona o produto ao carrinho (salvo no navegador, com contador no cabeçalho). Dá para mudar quantidades, remover itens, esvaziar e ver subtotais e total somados automaticamente. O aviso de validação diz exatamente o que falta escolher (tamanho, cor ou ambos)
- **Mini-carrinho** no cabeçalho com itens, quantidades, total, Esvaziar e Ver Carrinho; fecha ao clicar fora ou pressionar Escape.
- **Checkout de demonstração** com dados pessoais e entrega preenchidos pelo cadastro escolhido, pagamento ilustrativo e resumo calculado. Confirmação gera recibo persistente e imprimível. Cartão, validade e CVV não são editáveis.
- **Meus Pedidos de demonstração**: A confirmação do checkout registra um pedido simulado como pendente; em Meus Pedidos aparece o relatório das simulações (itens, quantidades, total e status pendente/finalizado), com opção de finalizar a simulação ou remover do histórico. Tudo só neste navegador

## Tecnologias

- React 19 + Vite 8
- React Router 8
- Tailwind CSS 4
- API didática em Node (sem dependências extras) e funções serverless prontas para Vercel

## Como rodar

Requisito: Node 22.12+ (ambiente testado em `docs/TESTES.md`).

```sh
npm ci
npm run dev        # frontend (usa a cópia local do catálogo)
```

Para consumir a API local:

```sh
npm run dev:full   # frontend + API juntos
# ou, em dois terminais:
npm run dev:api    # API em http://localhost:3001
npm run dev
```

### Windows / PowerShell

O iniciador `npm run dev:full` executa o Vite e a API diretamente pelo Node, sem `npm.cmd`. Isso evita a falha `spawn EINVAL` observada no Windows. A correção foi testada em Linux; confirmação no PowerShell ainda pendente. Não é necessário reinstalar as dependências para trocar somente `server/dev.mjs`.

Se preferir, use os dois terminais mostrados acima. Deixe ambos abertos durante os testes.

Outros comandos:

```sh
npm run lint       # análise estática
npm run build      # build de produção em dist/
npm run preview    # visualiza a build
```

## API

O catálogo é servido por uma API real, mantida no próprio projeto:

| Rota | Descrição |
| --- | --- |
| `GET /api/products` | lista completa do catálogo |
| `GET /api/products/:id` | um produto pelo id (404 se não existir) |

- Em desenvolvimento, `server/dev-api.mjs` atende na porta 3001 e o Vite encaminha `/api` por proxy.
- Em produção na Vercel, as funções em `api/` atendem o mesmo caminho, sem configuração extra.
- Se a API não responder, o frontend usa a cópia local do catálogo (`src/data/products.js`) e o site continua funcionando.

O catálogo é de demonstração, montado a partir do layout do Figma; preços e avaliações são exemplos.

## Rotas

- `/`: Home
- `/products`: catálogo (busca: `?filter=texto`)
- `/produtos`: alias do catálogo
- `/product/:id`: detalhe do produto
- `/carrinho`: carrinho de demonstração
- `/pedidos`: relatório de pedidos de demonstração (pendentes/finalizados)
- `/cadastro`: entrada para criação de personagem
- `/cadastro/dados`: formulário completo de cadastro fictício
- `/login`: seleção de cadastro local (sem autenticação real)
- `/perfil` e `/perfil/pagamentos`: informações, edição, troca e exclusão de cadastro
- `/finalizar-compra`: checkout simulado
- `/compra/sucesso/:id`: recibo da simulação salvo neste navegador

## Estrutura

```
api/               funções serverless da API (Vercel)
server/            servidor local da API e script dev:full
src/components/    componentes reutilizáveis (Header, Gallery, BuyBox…)
src/pages/         Home, listagem, detalhe, carrinho, pedidos, cadastro/login e layout
src/services/      consumo da API com fallback local; carrinho, pedidos e cadastros de demonstração (localStorage)
src/data/          catálogo de demonstração
public/design/     fotos e ícones originais exportados do Figma
docs/              relatório, testes e fontes (base original preservada separadamente)
```

## Evolução do projeto: antes e depois

Este repositório começou de uma base de exercícios que ainda não era uma loja: a Home consumia a API de Rick and Morty, havia um formulário de CEP sem consulta e textos provisórios no cabeçalho e rodapé.

A versão atual implementa a loja do layout: rotas próprias, catálogo com busca, filtros e ordenação, galeria com miniaturas, compra simulada com carrinho e relatório de pedidos de demonstração, responsividade, fonte Inter e as seis fotos originais recuperadas do Figma. Ícones e medidas das três páginas foram comparados aos frames originais exportados. Como extra, o catálogo passou a ser consumido de uma API real mantida no projeto.

Créditos atualizados em 28/10/2026: Pedro Henrique, Anderson Maia e Anderson Oliveira. Antes, os demais integrantes estavam pendentes de confirmação; agora os três nomes constam no rodapé e na documentação.

A descrição detalhada do antes/depois, critério por critério, está em [docs/RELATORIO-APRENDIZADO.md](docs/RELATORIO-APRENDIZADO.md).

## Limites do projeto

- Não é uma cópia pixel a pixel do Figma; as diferenças intencionais estão documentadas no relatório.
- A galeria repete a mesma foto em fundos diferentes, como o exemplo do layout.
- Compra, carrinho, pedidos, login e cadastro são simulações; não há pagamento, checkout transacional, entrega, senha real nem backend de usuários. Não existe autenticação real: cadastros, carrinho e pedidos ficam só naquele navegador, não passam para outros computadores e se perdem se os dados do navegador forem apagados.
- Fotos e ícones vieram do Figma fornecido para fins acadêmicos.

## Integrantes

- Pedro Henrique
- Anderson Maia
- Anderson Oliveira



## Documentos

- `docs/RELATORIO-APRENDIZADO.md`: antes/depois detalhado e critérios
- `docs/TESTES.md`: resultados e como repetir os testes
- `docs/REFERENCIA-DIGITAL-COLLEGE.md`: documentação oficial consultada
- Base original: preservada separadamente, não incluída neste repositório público
- `docs/FONTES-ASSETS.md`: origem e limites das imagens


## Publicação e hospedagem

O projeto é preparado para Vercel, com Vite no frontend e funções Node em `api/`. `vercel.json` reescreve as rotas da interface para `index.html` sem capturar os caminhos da API. Se importar este repositório na Vercel, mantenha a raiz no diretório que contém `package.json`, comando `npm run build` e saída `dist`. Não envie uma pasta `digital-store` dentro de outra pasta `digital-store`.

A publicação no GitHub não cria, por si só, o site hospedado. Os endereços do repositório e do site devem ser registrados somente após a publicação e conferência.


## Publicação conferida - 28/10/2026

Site público: https://digital-store-pearl-three.vercel.app/

Hospedagem Vercel Hobby, sem cartão nem plano pago. Frontend Vite e funções Node da API no mesmo endereço. A publicação foi feita com uma cópia pública auditada, sem a base pessoal original, credenciais, registros de sessão ou caminhos pessoais. Os três integrantes permanecem nos créditos. Não há pasta digital-store duplicada.

Verificações no site publicado: Home, listagem, detalhe, carrinho, pedidos, cadastro/login e links diretos; /categorias e /informacoes abrem o aviso acadêmico. A rota desconhecida mostra Página não encontrada no aplicativo (HTTP 200, comportamento SPA). GET /api/products retorna JSON com 15 produtos; GET /api/products/1 retorna o produto; ID 99 retorna 404. A API não foi substituída pelo fallback HTML.

No navegador online, tamanho/cor foram selecionados, um produto foi adicionado ao carrinho, quantidade alterada para 2 e total R$ 339,80 conferido. A compra simulada gerou pedido pendente e depois finalizado, sem pagamento nem entrega reais. A tela de pedidos foi inspecionada em 390px.

O primeiro deploy revelou /categorias com erro 404 e um texto institucional antigo; ambos foram corrigidos e o mesmo projeto foi atualizado. Lint e build passaram novamente após os ajustes.

Repositório público: https://github.com/phgomesbezerra/digital-store . O código está na raiz, com documentação e créditos dos três integrantes. Site: https://digital-store-pearl-three.vercel.app/ .


## Versão revisada dos sprints - 28/10/2026

Demonstração da versão revisada: https://digital-store-revisao-sprints.vercel.app/

Inclui hover lilás nos botões Comprar das coleções, mini-carrinho, checkout com recibo e até cinco cadastros fictícios editáveis. O site anterior continua em endereço separado, sem atualização automática por Git.

Use apenas dados inventados. No checkout, você pode ajustar os dados daquele pedido sem mudar o cadastro. O recibo preserva uma cópia da simulação; editar ou excluir o cadastro não altera os recibos anteriores. Recibos podem ser removidos em Meus Pedidos. Não existe login social, recuperação de senha, cobrança ou emissão de boleto real.

Guia desta revisão: [REVIEW-FOUR-BLOCKS.md](REVIEW-FOUR-BLOCKS.md).
