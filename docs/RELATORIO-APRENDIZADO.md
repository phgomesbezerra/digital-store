# Digital Store: antes, depois e aprendizado

Análise e versão funcional de estudo em 28/10/2026. Entrega do curso: 20/11/2026. O acesso autenticado ao Figma permitiu confirmar Inter e recuperar as seis fotos originais. A revisão dimensional das três páginas foi feita contra os frames originais exportados. Este documento descreve a evolução técnica do projeto acadêmico. Não há garantia de nota.

## 1. O que havia na base
- React, Vite, Tailwind e React Router instalados; pastas components/pages.
- Home consumia a API Rick and Morty. Não era uma loja.
- Consulta era um exercício de CEP sem consulta implementada.
- Header e Footer exibiam textos provisórios.
- Logo Digital Store já existia; hero.png era uma ilustração do template, não o tênis do Figma.
- Layout existia, mas não envolvia a Home. Links /form/1 e /form/teste não batiam com a rota /a/form/:id.
- Input chamava onSetCep sem esse callback ser enviado pelo Form. Form declarava id sem usar.
- npm ci e build passaram na base. Lint acusou o id não utilizado no Form.

## 2. O que mudou e por quê
1. Rotas em src/App.jsx: /, /products, /produtos e /product/:id. Layout compartilhado com Header, Outlet e Footer. O alias resolve a diferença entre /products e /produtos no próprio README.
2. Dados em src/data/products.js: catálogo local de 15 exemplos. Na revisão de extras (seção 8), esse mesmo catálogo passou a ser servido por uma API real mantida no projeto, e a cópia local ficou como reserva automática.
3. Header: busca controlada por useState; submit no Enter ou lupa; useNavigate leva a /products?filter=termo. NavLink identifica a página ativa. Menu mobile abre em painel lateral; a lupa mostra/oculta a busca em telas pequenas.
4. ProductCard e ProductListing: props apresentam produto e map gera os cartões com key estável. Preço com desconto tem preço original riscado; sem desconto, só preço normal.
5. Section: title, titleAlign, link e children organizam seções reutilizáveis.
6. Gallery: índice atual no useState, setas limitadas, miniatura selecionada e faixa de imagens com translação CSS. Tem className, width, height, radius, images e showThumbs.
7. HomePage: hero, coleções, ícones, 8 produtos e oferta. Não usa mais Rick and Morty.
8. ProductListingPage: lê filter da URL, normaliza acentos, filtra catálogo por texto/grupos, ordena preço final e calcula total. Os controles poderiam ser só visuais pela orientação do professor; aqui a lógica foi adicionada como exercício.
9. ProductViewPage: useParams encontra o id; produto inválido tem mensagem própria. BuyBox recebe props e ProductOptions como children. Tamanho/cor usam estado local e seleção visível.
10. Comprar adiciona a variação escolhida a um carrinho de demonstração (src/services/demoCart.js), com contador no cabeçalho, quantidades, subtotais e total. Finalizar compra registra um pedido simulado em Meus Pedidos (src/services/demoOrders.js), com status pendente/finalizado. Não há checkout transacional, autenticação, pagamento ou coleta de dados.
11. CSS responsivo: 4 colunas na Home desktop, 3 na listagem desktop, 2 no mobile; detalhe empilha no telefone. Corrigida largura mínima das miniaturas para não alargar a tela.
12. Textos pt-BR, título da página, estados vazios, rota não encontrada, foco visível e link para pular conteúdo. Código formatado e lint sem erros.

## 3. Avaliação: evidência por critério
### Construção lógica
Veja ProductListingPage.jsx, data/products.js e Gallery.jsx. O fluxo é dados → filtros → ordenação → renderização. A lista é derivada do estado, não duplicada em outro estado. Teste busca com Enter, menor/maior preço, filtros e limpeza.
### Aplicação correta do React
Componentes funcionais, props, children, useState, useParams, useSearchParams e roteamento. Header controla busca; Gallery controla índice; detalhe controla opções. A key do detalhe força reinício das opções quando muda o produto. Não há manipulação manual do DOM para renderizar a loja.
### Requisitos mínimos
Há Home, listagem, detalhe, layout, busca por URL, logo, navegação, rodapé dinâmico, Section, ProductCard, ProductListing, Gallery, FilterGroup, ProductOptions e BuyBox. Dimensões desktop se adaptam para caber no mobile. A fonte Inter e as fotos originais foram conferidas no Figma. Ícones e medidas principais foram comparados aos exports originais do Figma. O ícone do carrinho abre o carrinho de demonstração (itens, quantidades, subtotais e total, salvos no navegador) e Meus Pedidos mostra o relatório das simulações com status pendente/finalizado; institucionais mostram aviso de demonstração. Login e cadastro têm telas de demonstração (nome e e-mail de exemplo, sem senha) com até 5 cadastros fictícios salvos no navegador. Nenhum é serviço real.
### Estilo e design
Comparação visual do canvas Figma desktop/mobile feita. Paleta primary #C92071, fundo claro, footer #1F1F1F, cartões brancos, selo claro e botão comprar amarelo. A inspeção autenticada confirmou Inter 700, 64px/66px no título desktop, com arquivo local e licença incluídos. As seis fotos principais foram recuperadas diretamente do arquivo Figma fornecido. Todos os PNGs antes obtidos de outro projeto foram substituídos ou removidos.

Os cinco ícones agora são exports SVG do próprio Figma, com 64x64px. O arquivo de referência usa o mesmo vetor de calça para Calças e Bonés; essa duplicação foi preservada. Foram exportados os três frames desktop como SVG e renderizados para comparação. Medidas principais verificadas em 1440px: header 192px; Home hero 681px, coleções em y=971, categorias em y≈1380, produtos em y=1699; listagem com painel de 308px, início dos cartões em x=436/y=332 e footer em y≈2822; detalhe com galeria de 700x571 em x=100/y≈274 e quatro relacionados. Grade e espaçamentos foram ajustados a partir dessas medidas, não por lembrança.

Diferenças restantes e escolhas conscientes: textos, preços e avaliações variam por dados locais para testar busca, descontos e ordenação, em vez de repetir o mesmo produto e preço em todos os cartões do mockup. Contato do rodapé não foi copiado como se esta loja oferecesse atendimento real. O ano é dinâmico, conforme o requisito. O símbolo de fogo foi desenhado em SVG para não depender de emoji ausente no sistema. A galeria repete a mesma foto com cinco fundos, como o exemplo do arquivo, não cinco vistas reais. A nota longa da galeria foi movida para este relatório para preservar a composição. Comprar mostra uma simulação somente após interação; não há compra real. Layout mobile foi adaptado e testado nas larguras 320/390; não há certificação de igualdade de todos os pixels em todos os aparelhos. Essas diferenças não são escondidas nem descritas como correspondência exata.
### Documentação e entrega
README completo com instalação, comandos, rotas, estrutura, API, testes, antes/depois resumido e limites; este relatório, roteiro de teste, fonte consultada e base original preservada separadamente, fora deste repositório público. Integrantes informados por Pedro: Pedro Henrique, Anderson Maia e Anderson Oliveira. Falta criar/enviar o link GitHub na entrega. Na etapa inicial de revisão, GitHub, deploy e PR ainda não tinham sido publicados. Dos opcionais, README, ordenação/filtros funcionais e API real já existem; a publicação é uma etapa separada da implementação; fork/PR não faz parte desta publicação.
### Boas práticas
Separação componentes/páginas/dados, ids estáveis, componentes reutilizáveis, nomes claros, form sem recarregar, labels, foco, alt e estados de erro. Build/lint e testes de navegação/estado passaram. Não substitui teste completo de acessibilidade, todos os navegadores ou dispositivo físico.

## 4. Como rodar
Requisito testado: Node 22.23.4 e npm 10.9.9 (confira a versão no arquivo TESTES.md atualizado). Use Node 22.12+ ou uma versão compatível com o Vite 8.
1. Extraia o ZIP.
2. Abra a pasta no VS Code e um terminal nessa pasta.
3. Execute npm ci.
4. Execute npm run dev e abra o endereço exibido. Para consumir a API local, use npm run dev:full (sobe Vite e API juntos) ou npm run dev:api em um segundo terminal.
5. npm run lint confere regras do código; npm run build gera dist; npm run preview visualiza a build.
Não publique node_modules. O package-lock deve acompanhar o projeto.

## 5. Roteiro para você explicar
- Por que ProductCard recebe props e não busca os próprios dados? Para apresentação ficar separada dos dados e poder reutilizar o cartão.
- Por que não guardar filtered em useState? Ele já é calculável com catálogo, termo e filtros; evitar duas fontes de verdade.
- O que é children? Conteúdo passado entre as tags, como ProductOptions dentro de BuyBox.
- Qual a diferença entre rota e query string? /product/1 escolhe um recurso; ?filter=texto informa um filtro para a listagem.
- Como limitar a Gallery? Índice inicial 0; esquerda desabilitada em 0; direita desabilitada no último índice.
- Por que finalPrice usa ?? e não ||? Desconto zero continua sendo valor definido; ?? só usa o original para null/undefined.
- Como funciona a responsividade? Media query muda grid, ordem, tamanho e exibição conforme largura, sem duplicar todo o conteúdo.

## 6. Exercícios práticos
1. Adicione um produto e explique cada propriedade.
2. Crie um desconto e observe preço riscado e selo.
3. Troque o título de Section e teste titleAlign center.
4. Adicione uma opção de filtro coerente com os dados.
5. Use Gallery sem showThumbs e compare com o detalhe.
6. Explique o clique em Comprar: estado, validação e mensagem, sem compra real.
7. Corrija uma diferença visual por vez olhando Figma e navegador lado a lado.

## 7. Para preparar a entrega acadêmica
- Estudar o roteiro, executar os testes e explicar o código com suas palavras.
- Revisar os créditos com os integrantes antes da entrega ao professor.
- Escolher conta, repositório e audiência antes de criar/publicar GitHub. Não houve publicação, deploy nem envio ao professor.
- Conferir com o professor se prefere repetir os dados estáticos do mockup ou manter o catálogo variado e funcional usado aqui.
- Fotos e ícones vieram do Figma fornecido, documentados em docs/figma-assets.json. Isso não equivale a uma licença universal das marcas/fotografias para uso comercial.

## 8. Extras opcionais (pedido de 28/10)

Os extras opcionais da orientação foram incluídos e registrados neste antes/depois. Situação em 28/10, separando o que já funciona do que depende de publicação.

### Já funcionam no projeto
- README completo: instalação, comandos, rotas, estrutura, API, testes, resumo do antes/depois e limites. A orientação recomenda documentar como rodar.
- Busca, filtros e ordenação: funcionais desde a primeira revisão, embora o professor permita controles apenas visuais.
- Consumo real de API: as três páginas buscam o catálogo em GET /api/products e GET /api/products/:id. Em desenvolvimento, npm run dev:full sobe o servidor local em Node, sem dependências novas; na Vercel, as funções em api/ atendem o mesmo caminho. Se a API estiver fora do ar, o site usa a cópia local do catálogo e continua funcionando. O catálogo continua sendo o de demonstração montado a partir do Figma, não produtos de outra loja nem serviço externo com credenciais.
- Testes repetidos após a mudança: lint, build, 16 verificações em Chrome headless (320/390/1280, busca, ordenação, filtro, detalhe, 404) e teste do modo reserva sem API, todos descritos em docs/TESTES.md.

### Etapa de publicação
- GitHub: subir o repositório com descrição completa e a seção "Evolução do projeto: antes e depois" no README, com link para este relatório. Publicação autorizada no repositório público digital-store da conta phgomesbezerra.
- Deploy: o projeto está pronto para a Vercel (frontend e API no mesmo endereço); Netlify também é possível para o frontend, mas a API serverless foi pensada para a Vercel.
- Fork e Pull Request: fork da documentação oficial e PR, úteis para portfólio, após o repositório estar no ar.

A implementação inicial foi revisada antes da etapa de publicação. Os três integrantes já estão identificados nos créditos.

## 9. Fontes
- Enunciado e critérios do curso revisados em 28/10/2026, incluindo a flexibilização de filtros/ordenação e opcionais.
- Documentação confirmada por Pedro: https://github.com/digitalcollegebr/projeto-digital-store
- Figma fornecido: https://www.figma.com/design/nUk0ihM3x4u8JQtxUoAEJf/DRIP-STORE---DIGITAL-COLLEGE--Copy-?node-id=22-30&t=2Qmq5rGoofvXzT47-0
- Fotos originais recuperadas do próprio Figma; URLs e arquivos estão em docs/figma-assets.json.
- Inter oficial e licença: https://rsms.me/inter/ e https://github.com/rsms/inter/blob/master/LICENSE.txt
- Histórico: um projeto público foi usado apenas como pista inicial de imagens, sem copiar código. Essas cópias de PNG foram substituídas ou removidas; não integram o pacote atual.


## Correção: clique em "Cadastre-se" parecia não fazer nada

Problema relatado: ao abrir o projeto e clicar em Cadastre-se, nada acontecia. Causa: o link levava a /cadastro, mas essa rota mostrava só um aviso genérico, igual ao de outras páginas, sem formulário, e a página mantinha a posição de rolagem. Para quem clicava, parecia que nada mudou.

Antes: /login e /cadastro mostravam o mesmo aviso "Demonstração acadêmica".
Depois: cada um tem sua tela (src/pages/AuthPage.jsx). No cadastro, nome e e-mail de exemplo, aviso para não digitar dados reais e confirmação clara. Até 5 cadastros ficam salvos no localStorage do navegador (src/services/demoAccounts.js), continuam depois de atualizar ou fechar a página, e podem ser removidos, limpos ou preenchidos com 5 exemplos fictícios. O login confere se o e-mail está entre os salvos. Não há campo de senha, nada vai para servidor. Cada navegação volta ao topo.

Limites: não é conta real nem autenticação. Os dados ficam só naquele navegador e computador, não sincronizam, e somem se os dados do navegador forem apagados. Autenticação real exigiria servidor e banco de usuários, o que não foi criado.

O que isso ensina: a pessoa precisa ver uma resposta ao clicar; localStorage guarda dados simples no navegador (JSON.parse/stringify, tratamento de erro); e simulação deve dizer com clareza que é simulação.

## Correção: Comprar não adicionava ao carrinho; Meus Pedidos era só aviso

Problema relatado: ao clicar em Comprar com tamanho e cor escolhidos, aparecia só uma mensagem de simulação; o produto não ia para um carrinho e não havia soma de itens. Pedro também pediu que Meus Pedidos mostrasse um relatório das compras feitas, finalizadas ou pendentes.

Antes: o botão Comprar só exibia uma frase ("Simulação: produto, tamanho, cor") e pedia "um tamanho e uma cor" mesmo quando só um dos dois faltava. O ícone do carrinho era decorativo e a rota /pedidos mostrava o aviso genérico de demonstração.

Depois:
- O aviso de validação diz exatamente o que falta: "Falta escolher o tamanho…", "Falta escolher a cor…" ou ambos (src/pages/ProductViewPage.jsx).
- Com tamanho e cor escolhidos, Comprar adiciona o item ao carrinho de demonstração (src/services/demoCart.js, localStorage). O ícone do carrinho no cabeçalho virou link com contador de itens.
- /carrinho (src/pages/CartPage.jsx) lista itens com foto, tamanho, cor, preço unitário, controles de quantidade, subtotal por item e total somado; dá para remover itens e esvaziar. Mesma combinação (produto+tamanho+cor) soma a quantidade em vez de duplicar a linha.
- Finalizar compra registra um pedido simulado com status pendente e esvazia o carrinho.
- /pedidos (src/pages/OrdersPage.jsx) virou o relatório de simulações: resumo (quantos pedidos, pendentes e finalizados), itens, quantidades, total, data da simulação e status; botão "Finalizar (simulação)" muda pendente para finalizado e dá para remover do histórico. Carrinho e pedidos persistem após atualizar ou fechar a página.

Limites: nada disso é compra real. Não há pagamento, cobrança, checkout, estoque ou entrega; finalizar um pedido só muda o status dentro da simulação. Carrinho e pedidos ficam só naquele navegador e computador, não sincronizam e somem se os dados do navegador forem apagados.

O que isso ensina: mensagem de validação deve dizer o que falta, não uma frase genérica; derivar o total com reduce a partir dos itens evita valores dessincronizados; eventos personalizados (CART_CHANGED) mantêm o contador do cabeçalho atualizado sem recarregar; e um "pedido" é só outro conjunto de dados no navegador, com estado (pendente/finalizado) modelado de forma explícita.


## Atualização: créditos dos integrantes (28/10/2026)

Antes: o README citava Pedro Henrique e deixava os demais integrantes pendentes; o rodapé não identificava a equipe.

Depois: os créditos do rodapé, o README e este relatório identificam Pedro Henrique, Anderson Maia e Anderson Oliveira, conforme os nomes informados por Pedro. A equipe não tem nome definido. Não foram atribuídas funções ou autoria de partes específicas.

Esta atualização altera apenas os créditos e a documentação; os fluxos de catálogo, API, cadastro, login, carrinho e pedidos de demonstração foram mantidos. Esta seção registra o estado da revisão dos créditos; a publicação é uma etapa posterior.


## Correção: iniciador local no Windows (spawn EINVAL)

Problema relatado no Windows PowerShell com Node.js v24.22.1: npm install concluiu, mas npm run dev:full falhou com spawn EINVAL em server/dev.mjs. A instalação não era o problema.

Antes: o iniciador tentava executar npm.cmd com spawn sem shell no Windows. Arquivos .cmd precisam de um interpretador nesse sistema.

Depois: server/dev.mjs inicia o Vite e a API diretamente com process.execPath (o executável Node atual), caminhos absolutos e argumentos separados, sem npm.cmd nem shell. O diretório de trabalho é definido pela localização do script; pastas com espaços não precisam de aspas montadas manualmente. Erros de início encerram o processo irmão e retornam código de falha; Ctrl+C encerra os dois serviços.

Como usar: na pasta com package.json, npm run dev:full. Quem já instalou as dependências pode substituir apenas server/dev.mjs e repetir esse comando, sem novo npm install. Ao extrair em uma pasta nova sem node_modules, rode npm ci antes.

Alternativa em dois terminais na mesma pasta: no primeiro, npm run dev:api; no segundo, npm run dev. Deixe os dois abertos e acesse o endereço mostrado pelo Vite.

Verificação: início do frontend e API, proxy /api/products, caminhos com espaços, Ctrl+C sem portas restantes, tratamento de porta ocupada, lint e build passaram em Linux. O código não depende mais do ramo win32 nem de scripts .cmd. Não foi executado no Windows: o teste final no PowerShell de Pedro ainda precisa ser confirmado.

Fonte técnica: https://nodejs.org/api/child_process.html (Spawning .bat and .cmd files on Windows).


## Preparação para publicação pública

A cópia para publicação mantém os três integrantes e a documentação técnica, sem a base pessoal original (preservada no pacote privado), sem registros de conta, caminhos pessoais, credenciais ou downloads de sessão. O código entra na raiz do repositório, sem duplicar a pasta digital-store.

Para hospedagem Vite + funções Node, `vercel.json` trata os links diretos das rotas da interface sem reescrever a API. O endereço final depende da publicação e da validação no serviço escolhido. Não foi aberto PR na documentação oficial.


## Publicação conferida - 28/10/2026

Site público: https://digital-store-pearl-three.vercel.app/

Hospedagem Vercel Hobby, sem cartão nem plano pago. Frontend Vite e funções Node da API no mesmo endereço. A publicação foi feita com uma cópia pública auditada, sem a base pessoal original, credenciais, registros de sessão ou caminhos pessoais. Os três integrantes permanecem nos créditos. Não há pasta digital-store duplicada.

Verificações no site publicado: Home, listagem, detalhe, carrinho, pedidos, cadastro/login e links diretos; /categorias e /informacoes abrem o aviso acadêmico. A rota desconhecida mostra Página não encontrada no aplicativo (HTTP 200, comportamento SPA). GET /api/products retorna JSON com 15 produtos; GET /api/products/1 retorna o produto; ID 99 retorna 404. A API não foi substituída pelo fallback HTML.

No navegador online, tamanho/cor foram selecionados, um produto foi adicionado ao carrinho, quantidade alterada para 2 e total R$ 339,80 conferido. A compra simulada gerou pedido pendente e depois finalizado, sem pagamento nem entrega reais. A tela de pedidos foi inspecionada em 390px.

O primeiro deploy revelou /categorias com erro 404 e um texto institucional antigo; ambos foram corrigidos e o mesmo projeto foi atualizado. Lint e build passaram novamente após os ajustes.

Repositório público: https://github.com/phgomesbezerra/digital-store . O código está na raiz, com documentação e créditos dos três integrantes. Site: https://digital-store-pearl-three.vercel.app/ . Nenhum PR na documentação oficial nem envio ao professor foi feito.
