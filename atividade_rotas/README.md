# Atividade 1

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
