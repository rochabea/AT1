# Questão 1

- Expo Router
é um sistema de roteamento baseado em arquivos criado pelo Expo, por meio dele é possível criar pastas e arquivos dentro da pasta "app/" e o Expo Router gera as rotas corretamente
Com o uso dele é possível diminuir a manualidade de criação das rotas gerando de forma automatica e possibilitando a integração direta com o sistema de navegação do React Navigation

- React Navigation
é a principal biblioteca de navegação usada em apps React Native. Por meio dessa biblioteca, é possível criar e controlar fluxos de telas, empilhamento de rotas e animações entre as páginas.
Possui alguns tipos de navegação, entre elas:
    - stack (pilha de telas)
    - bottom tabs (abas inferiores)
    - drawer (menu lateral) 
    - material top tabs
obs: o expo Router usa React Navigation internamente, por isso é possível personalizar o comportamento de navegação mesmo com o Expo Router

- Drawer Navigation
é um menu lateral deslizantes, localizado geralmente a esquerda da tela, em que ao realizar a ação necessária (deslizar ou clicar no ícone específico) um painel lateral aparece com opções de navegação. Geralmente utilizado em apps com muitas seções ou configurações

- Bottom Tab
é uma navegação com abas na parte inferior do app em cada aba possui sua própria pilha de navegação. Possui uso quando o app tem sessões principais em comum.

- Stack Navigator
funciona sendo um navegação em pilha. Com a navegação entre as telas, quando é acessado uma nova tela é feito um empilhamento sobre a anterior e, ao voltar, a tela de cima é removida. Sendo um exemplo ideal para formulários ou fluxos com etapas.

## Tipos de Navegação no React Native / Expo

| Tipo de Navegação     | Exemplo de Uso                | Posição na Tela | Característica               |
| --------------------- | ----------------------------- | --------------- | ---------------------------- |
| **Expo Router**       | Estrutura automática de rotas | —               | Baseado em pastas e arquivos |
| **React Navigation**  | Infraestrutura de navegação   | —               | Biblioteca principal         |
| **Stack Navigator**   | Login → Cadastro → Home       | Centro          | Fluxo em pilha               |
| **Bottom Tab**        | Home, Busca, Perfil           | Inferior        | Abas fixas                   |
| **Drawer Navigation** | Menu lateral                  | Lateral         | Abre via swipe ou botão      |

# Questão 2

# Questão 3
O layout do nosso aplicativo foi construído utilizando o flexbox, facilitando a organização visual possibilitando o melhor posicionamento e alinhamento dos componentes na tela.

- justifyContent
	- Foi por meio dele que define como os elementos filhos são distribuídos ao longo do eixo principal (horizontal ou vertical)
	- No nosso projeto, utilizamos para alinhas os botões, cards de produtos e seções de conteúdo dentro das telas principais.

- space-between
	- Com ele é possível fazer a distribuição dos elementos com espaço igual entre eles, deixando sem espaço nas extremidades.
	- comportamento: o primeiro item fica próxima a margem da esquerda e o último próximo a borda da direito, enquanto os outros ficam distribuídos igualmente no meio.
	- exemplo: usado em seções onde há um título à esquerda e um botão de ação

- space-around
	- A partir dele, é possível distribuir os elementos com espaço igual ao redor de cada um, incluindo as bordas externas.
	- comportamento: cria um espaçamento simétrico entre todos os componentes
	- exemplo: menus horizontais, grupos de botões ou ícones de navegação

- space-evenly
	- Com ele é feito a distribuição dos elementos com espaçamento igual entre todos, incluindo as bordas externas.
	- comportamento: todos os espaços são idênticos
	- No nosso projeto é utilizado quando desejamos um equilíbrio total (exemplo dos atalhos na BottomTab)

- flexDirection
	- Utilizado para defini a direção do eixo principal (row ou column)
	- No nosso projeto, é usado para definir o fluxo dos cards de produtos (com a row)e também nas telas de detalhes de produtos (column)

- flex-start
	- Utilizado para alinhar os itens no início do eixo principal
	- comportamento: todos os elementos ficam agrupados no começo da linha ou da coluna
	- Utilizado no projeto com cabeçalhos e seções de texto alinhados à esquerda

- flex-end
	- Alinha os itens no final do eixo principal
	- comportamento: empurra todos os itens para o fim
	- no nosso projeto utilizamos nos rodapés e em botões de ação posicionados à direita da tela

- center
	- Centraliza os elementos no eixo principal (horizontal ou vertical)
	- comportamento: todos os itens são agrupados no centro
	- no nosso projeto usamos para centralizar textos, imagens de produtos ou ícones no meio da tela


| Propriedade        | Função principal                       | Exemplo de uso no app                       |
| ------------------ | -------------------------------------- | ------------------------------------------- |
| **justifyContent** | Alinha os itens no eixo principal      | Centralização e espaçamento dos componentes |
| **space-between**  | Espaços iguais entre itens, sem bordas | Cabeçalhos com título e botão               |
| **space-around**   | Espaço igual ao redor dos itens        | Menus horizontais                           |
| **space-evenly**   | Espaço igual entre e nas bordas        | Ícones da Bottom Tab                        |
| **flexDirection**  | Define a direção dos elementos         | Colunas de produtos ou listas               |
| **flex-start**     | Alinha ao início                       | Textos e títulos à esquerda                 |
| **flex-end**       | Alinha ao fim                          | Botões no rodapé                            |
| **center**         | Centraliza no eixo principal           | Ícones e imagens centrais                   |
