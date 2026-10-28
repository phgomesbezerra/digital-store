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

A pedido de Pedro, a etapa seguinte substitui os campos fixos por dados pessoais e de entrega editáveis, somente para personagens inventados. Até cinco cadastros ficam no armazenamento local do navegador, sem envio ao servidor. Nome e CPF fictícios preenchidos aparecem no perfil escolhido. É possível editar, trocar cadastro e excluir com confirmação. E-mail duplicado e sexto cadastro são recusados sem apagar os existentes. Exemplos legados de nome/e-mail são preservados; os demais campos podem ser completados em Editar.

O login é uma escolha de cadastro pelo e-mail ou pela lista, sem senha real. Os campos de cartão/validade/CVV continuam mascarados e não editáveis. No checkout, o perfil selecionado preenche os campos; alterações ali só valem para aquele pedido. O recibo guarda uma cópia dos dados da simulação e não muda quando o cadastro é editado. Excluir um cadastro não apaga recibos, que podem ser removidos em Meus Pedidos.

Teste: crie dois personagens fictícios, entre em Meu Perfil, edite um, troque para o outro, recarregue e confira a persistência. Adicione até cinco e tente o sexto. Exclua um e crie outro. No checkout, escolha um cadastro, ajuste o nome inventado e confira o recibo. Não use CPF, endereço, e-mail ou telefone reais.


## Publicação do código revisado

Em 28/10/2026, a versão revisada com cinco cadastros editáveis foi autorizada para atualização no GitHub. O site de revisão é https://digital-store-revisao-sprints.vercel.app/ . O domínio anterior permanece separado, sem substituição nesta etapa.
