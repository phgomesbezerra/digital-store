# Testes em 28/10/2026

Build e lint passaram após a implementação da API. Testes em Chrome headless, não em aparelho físico.

## Primeira bateria (loja sem API)

- home/products/detail em 320px: PASSOU (sem overflow, sem imagem quebrada)
- home/products/detail em 390px: PASSOU
- home/products/detail em 1280px: PASSOU
- Busca Enter altera URL e filtra: PASSOU
- Busca botão filtra: PASSOU
- Ordenação maior preço: PASSOU
- Filtro Nike: PASSOU
- Limpar filtros: PASSOU
- Busca vazia: PASSOU
- Seta inicial desabilitada: PASSOU
- Galeria próxima/última: PASSOU
- Miniatura seleciona imagem: PASSOU
- Comprar exige variações: PASSOU
- Comprar apenas simula sem transação: PASSOU
- Produto inexistente: PASSOU
- Rota 404: PASSOU
- Alias /produtos: PASSOU
- Menu e filtro mobile: PASSOU

## Segunda bateria (após consumo real de API)

Com `npm run dev:full` (frontend + API local):

- home/products/detail em 320px: PASSOU
- home/products/detail em 390px: PASSOU
- home/products/detail em 1280px: PASSOU
- Páginas buscam o catálogo em /api/products (requisições observadas): PASSOU
- GET /api/products retorna os 15 produtos: PASSOU
- GET /api/products/1 retorna o produto 1: PASSOU
- GET /api/products/99 retorna 404: PASSOU
- Busca Enter altera URL e filtra: PASSOU
- Ordenação maior preço: PASSOU
- Filtro Nike: PASSOU
- Detalhe do produto 2 e 3: PASSOU
- Produto inexistente exibe aviso próprio: PASSOU
- Rota 404: PASSOU
- Sem erros de JavaScript durante os testes: PASSOU (as únicas falhas de rede foram os 404 esperados do teste de produto inexistente)

Modo reserva (somente `npm run dev`, sem a API no ar):

- Home renderiza os produtos pela cópia local: PASSOU
- Listagem com ?filter=nike filtra pela cópia local: PASSOU
- Sem erros de JavaScript: PASSOU

A busca por botão teve uma falha de sincronização no teste inicial da primeira bateria. O teste passou a aguardar a lista renderizada após a URL e foi repetido com sucesso; não foi alterada a aplicação para esconder o resultado.

Repetir manualmente: subir `npm run dev:full`; conferir /api/products no navegador; buscar por Enter e lupa; ordenar; marcar/limpar filtros; abrir/fechar busca, menu e filtro mobile; testar setas/miniaturas; selecionar tamanho/cor e simular comprar; abrir produto e rota inválidos; derrubar a API e confirmar que o site continua funcionando. Imagens e overflow conferidos em 320/390/1280px.

Ambiente: Node v22.23.4, npm 10.9.9, Chrome headless.

## Correção de login/cadastro (28/10/2026)

Chrome headless controlado por script, build de produção:

- Build e lint: PASSOU
- Clicar em Cadastre-se no cabeçalho abre /cadastro com formulário: PASSOU
- Cadastrar 5 exemplos: PASSOU; sexto é recusado com mensagem de limite: PASSOU
- Após recarregar a página, os 5 continuam salvos: PASSOU
- Login com e-mail salvo encontra o cadastro de exemplo: PASSOU
- Captura mobile 390px inspecionada: PASSOU
- Adicionar exemplos completa 5 e desabilita o botão; remover tira 1 e persiste após recarregar; limpar zera: PASSOU
- Login com e-mail inexistente mostra mensagem de não encontrado: PASSOU
- Não testado: modo privado do navegador

## Carrinho e Meus Pedidos de demonstração (28/10/2026)

Chrome headless controlado por script (CDP), build de produção via npm run preview. 23 verificações, todas PASSARAM:

- Comprar sem selecionar nada pede "um tamanho e uma cor": PASSOU
- Só tamanho escolhido: mensagem "Falta escolher a cor…" (e não a genérica): PASSOU
- Tamanho e cor: item adicionado, mensagem com link Ver carrinho, contador do cabeçalho = 1: PASSOU
- Segundo produto adicionado: contador = 2: PASSOU
- Mesma combinação repetida soma quantidade (contador = 3, uma linha só): PASSOU
- Carrinho lista 2 linhas com quantidades e subtotais corretos; total exibido bate com a soma dos itens: PASSOU
- Aumentar quantidade atualiza linha e total: PASSOU
- Carrinho persiste após recarregar: PASSOU
- Finalizar compra registra pedido pendente, esvazia o carrinho e aponta Meus Pedidos: PASSOU
- Pedido aparece em Meus Pedidos com status Pendente e total igual ao do carrinho: PASSOU
- "Finalizar (simulação)" muda status para Finalizado e persiste após recarregar: PASSOU
- Remover item esvazia o carrinho: PASSOU
- Mobile 390px: mensagem de falta nomeada, carrinho e pedidos sem overflow horizontal; capturas inspecionadas: PASSOU

Regressão após a mudança (6 verificações, todas PASSARAM): home renderiza; /cadastro com formulário e 5 exemplos continuam salvando; /login com formulário; busca ?filter=nike filtra; contador ausente com carrinho vazio.

Não testado: modo privado do navegador; aparelho físico.


## Créditos dos integrantes - 28/10/2026

- npm ci, npm run lint e npm run build: passaram.
- Build de produção em Chrome headless: créditos com Pedro Henrique, Anderson Maia e Anderson Oliveira presentes em 320, 390 e 1280px; sem overflow horizontal nessas larguras. Capturas do rodapé inspecionadas.
- README e relatório antes/depois atualizados, sem pendências antigas sobre informar os integrantes.
- Escopo: apenas créditos e documentação; arquivos de lógica de API, catálogo, cadastro/login, carrinho e pedidos não foram alterados.


## Iniciador dev:full - correção Windows

Problema relatado no Windows PowerShell com Node.js v24.22.1: npm install concluiu, mas npm run dev:full falhou com spawn EINVAL em server/dev.mjs. A instalação não era o problema.

Antes: o iniciador tentava executar npm.cmd com spawn sem shell no Windows. Arquivos .cmd precisam de um interpretador nesse sistema.

Depois: server/dev.mjs inicia o Vite e a API diretamente com process.execPath (o executável Node atual), caminhos absolutos e argumentos separados, sem npm.cmd nem shell. O diretório de trabalho é definido pela localização do script; pastas com espaços não precisam de aspas montadas manualmente. Erros de início encerram o processo irmão e retornam código de falha; Ctrl+C encerra os dois serviços.

Como usar: na pasta com package.json, npm run dev:full. Quem já instalou as dependências pode substituir apenas server/dev.mjs e repetir esse comando, sem novo npm install. Ao extrair em uma pasta nova sem node_modules, rode npm ci antes.

Alternativa em dois terminais na mesma pasta: no primeiro, npm run dev:api; no segundo, npm run dev. Deixe os dois abertos e acesse o endereço mostrado pelo Vite.

Verificação: início do frontend e API, proxy /api/products, caminhos com espaços, Ctrl+C sem portas restantes, tratamento de porta ocupada, lint e build passaram em Linux. O código não depende mais do ramo win32 nem de scripts .cmd. Não foi executado no Windows: o teste final no PowerShell de Pedro ainda precisa ser confirmado.

Fonte técnica: https://nodejs.org/api/child_process.html (Spawning .bat and .cmd files on Windows).


## Publicação conferida - 28/10/2026

Site público: https://digital-store-pearl-three.vercel.app/

Hospedagem Vercel Hobby, sem cartão nem plano pago. Frontend Vite e funções Node da API no mesmo endereço. A publicação foi feita com uma cópia pública auditada, sem a base pessoal original, credenciais, registros de sessão ou caminhos pessoais. Os três integrantes permanecem nos créditos. Não há pasta digital-store duplicada.

Verificações no site publicado: Home, listagem, detalhe, carrinho, pedidos, cadastro/login e links diretos; /categorias e /informacoes abrem o aviso acadêmico. A rota desconhecida mostra Página não encontrada no aplicativo (HTTP 200, comportamento SPA). GET /api/products retorna JSON com 15 produtos; GET /api/products/1 retorna o produto; ID 99 retorna 404. A API não foi substituída pelo fallback HTML.

No navegador online, tamanho/cor foram selecionados, um produto foi adicionado ao carrinho, quantidade alterada para 2 e total R$ 339,80 conferido. A compra simulada gerou pedido pendente e depois finalizado, sem pagamento nem entrega reais. A tela de pedidos foi inspecionada em 390px.

O primeiro deploy revelou /categorias com erro 404 e um texto institucional antigo; ambos foram corrigidos e o mesmo projeto foi atualizado. Lint e build passaram novamente após os ajustes.

Repositório público: https://github.com/phgomesbezerra/digital-store . O código está na raiz, com documentação e créditos dos três integrantes. Site: https://digital-store-pearl-three.vercel.app/ .


## Revisão atual dos sprints

# Revisão Figma - quatro blocos

Esta revisão é uma simulação acadêmica. Sem pagamento, entrega, autenticação real ou coleta de dados sensíveis. Os dados de personagem são fixos e fictícios.

## Antes e depois

1. **Comprar nas coleções**: antes o botão não tinha o estado secundário do Figma. Agora o hover e o foco de teclado usam fundo #B5B6F2 e texto #F7F7FC. O destino continua /products.
2. **Mini-carrinho**: antes o ícone levava diretamente à página de carrinho. Agora abre um painel com os itens reais da simulação, quantidades, total, Esvaziar e Ver Carrinho. Fecha por Escape, fora do painel e navegação.
3. **Checkout e sucesso**: antes Finalizar compra criava o pedido diretamente no carrinho. Agora abre /finalizar-compra com cartões de informações, pagamento ilustrativo e resumo calculado. A confirmação só avança depois de salvar o pedido. O recibo tem rota persistente, impressão e retorno à home. Duplo clique não duplica o pedido. Os pedidos antigos continuam compatíveis.
4. **Cadastro, login e perfil**: antes havia um formulário simples isolado. Agora a entrada de cadastro leva ao formulário completo, login inicia sessão de exemplo e /perfil mostra informações e navegação lateral. O botão Editar demonstra o formulário, mas não altera o personagem. Não há cadastro, senha ou login social reais. A coleção antiga de cadastros permanece intacta no navegador e não é usada como autenticação.

## Código para estudar

- components/MiniCart.jsx: estado do painel, eventos do carrinho e fechamento.
- components/DemoForms.jsx: blocos compartilhados e campos somente leitura.
- services/demoProfile.js: personagem fictício e sessão local.
- pages/CheckoutPage.jsx: resumo, estados de pagamento, bloqueio de reentrada e confirmação.
- services/demoOrders.js: persistência antes do sucesso e identificador da tentativa.
- pages/SuccessPage.jsx: leitura do pedido pela rota e recibo de demonstração.
- pages/AuthPage.jsx e ProfilePage.jsx: telas distintas de conta.
- index.css: estilos e empilhamento mobile.

## Decisões conscientes

O Figma tem totais contraditórios. A revisão preserva a apresentação, mas soma quantidade × preço de venda. Frete e desconto adicional são zero nesta demonstração. Não inventa parcelas, cobrança ou boleto bancário. Campos pessoais e de cartão não aceitam entrada. A opção de ofertas é apenas visual, sem assinatura ou envio. As imagens sociais são botões ilustrativos, não integrações.

## Roteiro de revisão

1. Na home, passe sobre Comprar nas três coleções e teste com Tab.
2. Abra um produto, escolha tamanho/cor e adicione ao carrinho.
3. Abra o ícone do carrinho. Confira o valor e clique em Ver Carrinho.
4. Altere a quantidade, depois Finalizar compra. Compare o resumo com o carrinho.
5. Troque entre cartão e boleto. Confirme a simulação, recarregue o recibo e consulte Meus Pedidos.
6. Abra Cadastre-se, prossiga com o personagem de exemplo e confira Meu Perfil. Saia e entre em Login.
7. Repita no celular. Os dados são locais a cada navegador e origem, sem sincronização com o site original.

## Escopo de publicação

Prévia em projeto Vercel separado, sem conexão Git. O projeto digital-store e seu domínio principal não foram substituídos. Este pacote não implica aprovação para push no GitHub ou atualização do site principal.


# Atualização: cadastros editáveis

A etapa seguinte substitui os campos fixos por dados pessoais e de entrega editáveis, somente para personagens inventados. Até cinco cadastros ficam no armazenamento local do navegador, sem envio ao servidor. Nome e CPF fictícios preenchidos aparecem no perfil escolhido. É possível editar, trocar cadastro e excluir com confirmação. E-mail duplicado e sexto cadastro são recusados sem apagar os existentes. Exemplos legados de nome/e-mail são preservados; os demais campos podem ser completados em Editar.

O login é uma escolha de cadastro pelo e-mail ou pela lista, sem senha real. Os campos de cartão/validade/CVV continuam mascarados e não editáveis. No checkout, o perfil selecionado preenche os campos; alterações ali só valem para aquele pedido. O recibo guarda uma cópia dos dados da simulação e não muda quando o cadastro é editado. Excluir um cadastro não apaga recibos, que podem ser removidos em Meus Pedidos.

Teste: crie dois personagens fictícios, entre em Meu Perfil, edite um, troque para o outro, recarregue e confira a persistência. Adicione até cinco e tente o sexto. Exclua um e crie outro. No checkout, escolha um cadastro, ajuste o nome inventado e confira o recibo. Não use CPF, endereço, e-mail ou telefone reais.


## Publicação do código revisado

Em 28/10/2026, a versão revisada com cinco cadastros editáveis foi autorizada para atualização no GitHub. O site de revisão é https://digital-store-revisao-sprints.vercel.app/ . O domínio anterior permanece separado, sem substituição nesta etapa.
