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

## **useState**
O **useState** permite adicionar **estado local** a um componente funcional.  
Retorna um par `[valor, função de atualização]`, que atualiza o estado e **re-renderiza** o componente quando alterado.  

**Exemplo:**
```javascript
const [count, setCount] = useState(0);
// Atualizando o estado
setCount(count + 1);

```

## **useEffect**

O **useEffect** é um Hook do React usado para **executar efeitos colaterais** em componentes funcionais.  
Ele substitui os métodos de ciclo de vida de componentes de classe, como `componentDidMount`, `componentDidUpdate` e `componentWillUnmount`.

### Estrutura Básica
```javascript
useEffect(() => {
  console.log('O componente foi renderizado!');

  return () => {
    console.log('Cleanup antes de desmontar ou atualizar o efeito');
  };
}, [dependencias]);
```

## **useMemo**

O useMemo memoriza valores calculados para **evitar recalculações desnecessárias** em renderizações futuras.
Ideal para cálculos pesados que dependem de variáveis específicas.

### Estrutura Básica
```javascript
const resultadoPesado = useMemo(() => {
  return calculoComplexo(valor);
}, [valor]);
```
## **useCallback**

O useCallback memoriza funções para evitar recriações em cada render.
Muito útil quando funções são passadas como props para componentes filhos.

### Estrutura Básica
```javascript
const handleClick = useCallback(() => {
  console.log('Botão clicado!');
}, []);

```
## **Cleanup**
É a função retornada pelo `useEffect` que é executada antes do componente ser desmontado ou antes de executar novamente o efeito.  
Ela é usada para **liberar recursos**, como timers, listeners ou assinaturas, evitando problemas de memória ou efeitos indesejados.

## **Rerenderização**
A ocorre quando o **estado (`useState`) ou props** de um componente mudam.  
Sempre que isso acontece, o componente é renderizado novamente, e todos os Hooks dentro dele são reavaliados.

## **Contexto**
Permite compartilhar **dados globais** entre componentes sem precisar passar props manualmente por cada nível da árvore.  
Usa-se `React.createContext()` para criar o contexto e `useContext()` para acessar os valores dentro dos componentes.

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

# Questão 4


# Questão 5
Decisões de Usabilidade para o App Farmácia ABE

- Interface intuitiva e autoexplicativa

	- Decisão: Design de telas simples e diretas, onde clientes e entregadores encontram facilmente o que precisam (produtos, pedidos, status de entrega).
	- Impacto na usabilidade: Reduz o tempo de aprendizado, aumenta a eficácia na realização das tarefas e diminui erros de navegação.

- Autoatendimento via aplicativo

	- Decisão: Clientes conseguem buscar produtos, adicionar à cesta, finalizar pedidos e acompanhar entregas sem depender de atendimento humano.
	- Impacto na usabilidade: Garante eficiência, pois o usuário consegue concluir tarefas rapidamente, e satisfação, pois tem autonomia no uso do app.


- Otimização de rotas para entregadores

	- Decisão: O app sugere rotas mais rápidas e eficientes para entregas.
	- Impacto na usabilidade: Facilita o trabalho do entregador (eficiência), melhora o tempo de entrega ao cliente (satisfação) e diminui frustrações.

- Feedback constante ao usuário

	- Decisão: Notificações sobre status do pedido, confirmações de pagamento e alertas de promoções ou problemas.
	- Impacto na usabilidade: Aumenta a confiança do usuário na plataforma (satisfação) e reduz erros ou incertezas (eficácia).


-  Multi-canal de acesso

	- Decisão: Disponibilidade do app mobile para clientes e entregadores, e website para empresas/farmácias.
	- Impacto na usabilidade: Oferece flexibilidade e conveniência, aumentando a satisfação e acessibilidade para diferentes tipos de usuários.

- Layout responsivo e consistente

	- Decisão: Uso de padrões de cores, ícones e posicionamento consistentes em todas as telas.
	- Impacto na usabilidade: Facilita a navegação e memorização do fluxo de ações (eficácia e eficiência).

- Processos simplificados de pagamento

	- Decisão: Integração com sistemas de pagamento confiáveis e rápidos, evitando etapas desnecessárias.
	- Impacto na usabilidade: Aumenta a eficiência, reduz erros e evita frustrações no momento crítico da compra.

# Questão 6
UI Thread é a thread principal da splicação, reponsável por controlar tudo que o usuário vê e interage na interface gráfica (UI). Por meio dela é executado as tarefas de renderização dos componentes visuais, atualização de layout, animações, toques na tela, scrolls e outras interações de interface.
Funcionamento: com React Native, o aplicativo funciona em múltiplas threads que trabalham em conjunto:
	- Thread: Onde o código é executado, com seus componentes, hooks, lógica de estado e entre outros, é nesse ambiente em que o React calcula o que deve mudar na interface;
	- UI Thread (main): Responsável por applicar as mudanças visuais e desenhar a interface com base nas intruções enviadas pela Thread, responsável por toda a parte visual gráfica que o usuário vê;
	- Bridge: um canal de comunicação entre o código Raect e o código nativo. É feito o envio das atualizações da UI e eventos de interação entre as threads.
Sequência ordem de carregamento
	1. Inicialização: quando a aplicativo é inicializado, a UI Thread é a primeira a iniciar que fica responsável por exibir a tela de carregamento (splash screen)
	2. Execução: a Thread é carregada em seguida, fazendo o processamento do código React, montando os componentes e calculando o que precisa ser exibido;
	3. Renderização: as instruções visuais são enviadas pela Bridge para a UI Thread, onde é feito o renderizamento na tela;
	4. Interação do usuário: quando o usuário faz alguma ação coma interface, os eventos são processados primeiro pela UI Thread e, em caso de necessidade, repassados novamente para a Thread;
	5. Atualização contínua: esse ciclo ocorre constantemente, garantindo que qualquer mudança no estado da aplicação seja refletida visualmente

# Questão 7

# Questão 8

## **AsyncStorage**
**Descrição:**  
API de armazenamento chave-valor assíncrona, usada para dados simples no React Native/Web.

**Vantagens:**
- Fácil de usar e integrar.
- Funciona em **iOS, Android e Web**.
- Assíncrono, não bloqueia a interface.

**Desvantagens:**
- Apenas chave-valor, sem relações complexas.
- Armazenamento limitado (~6MB).
- Pode ficar lento com muitos dados ou objetos grandes.

**Aplicações comuns:**
- Tokens de autenticação.
- Preferências do usuário.
- Dados pequenos que não exigem relacionamento.

---

## **expo-sqlite**
**Descrição:**  
Banco SQLite embutido, acessível via API do Expo, suporta SQL.

**Vantagens:**
- Permite **tabelas, consultas e joins**.
- Persistente entre sessões.
- Mais eficiente que AsyncStorage para grandes volumes de dados.

**Desvantagens:**
- **Não funciona no Web**.
- Requer conhecimento básico de SQL.

**Aplicações comuns:**
- Listas de usuários, 
- Produtos,
- Mensagens.

---

## **SQLite (nativo ou via `react-native-sqlite-storage`)**
**Descrição:**  
Banco de dados relacional completo, usado diretamente no dispositivo.

**Vantagens:**
- Suporta **transações, índices e consultas complexas**.
- Escalável para grandes volumes de dados.
- Persistência entre sessões.

**Desvantagens:**
- Configuração nativa necessária no React Native puro.
- Mais complexo que AsyncStorage.
- **Não funciona no Web**.

**Aplicações comuns:**
- Apps que precisam de banco local completo.
- Histórico de dados, 
- Inventários, 
- Listas complexas offline.

---

## **react-native-keychain**
**Descrição:**  
Armazenamento seguro de dados sensíveis, usando **Keychain (iOS)** ou **Keystore (Android)**.

**Vantagens:**
- Extremamente seguro para senhas e tokens.
- Suporta autenticação biométrica.
- Integrado ao sistema do dispositivo.

**Desvantagens:**
- Apenas para dados pequenos e sensíveis.
- Não é um banco de dados relacional.
- Não funciona no Web.

**Aplicações comuns:**
- Guardar tokens de autenticação e senhas.
- Autenticação offline com biometria.

# Questão 9

## **Notifee**

Notifee é uma biblioteca avançada de notificações para aplicativos React Native. Ela permite criar notificações locais, agendadas e push (remotas) com recursos avançados, como canais de notificação no Android, personalização de ícones e ações interativas. É importante destacar que **Notifee não funciona no Expo Go**, para utilizá-la, é necessário gerar builds nativos usando EAS Build no Android ou iOS.

## **Notificações local vs notificações remotas**

As notificações podem ser locais ou remotas, ou seja, locais são geradas e exibidas diretamente pelo aplicativo no dispositivo, como lembretes ou alertas internos. Já as notificações remotas, também chamadas de push, são enviadas de um servidor externo, como o Firebase Cloud Messaging (FCM), permitindo que o usuário receba mensagens mesmo quando o app está fechado ou em segundo plano.

## **Notificações rodando em background**

É possível configurar notificações para serem recebidas enquanto o aplicativo está em background. No Android, isso é feito utilizando canais de notificação e serviços do sistema. No iOS, é necessário habilitar Background Modes e permitir Remote Notifications no Xcode, garantindo que as mensagens push cheguem ao dispositivo mesmo sem o app aberto.

## **Firebase Cloud Messaging (FCM)**

É um serviço do Firebase que permite enviar notificações push para dispositivos Android e iOS. Ele é utilizado para enviar mensagens mesmo quando o aplicativo está fechado ou em segundo plano, mantendo o usuário informado sobre eventos importantes. O FCM funciona em conjunto com Notifee ou outras bibliotecas de notificação, garantindo entrega confiável das mensagens.

## **Permissões necessárias para cada plataforma**

As notificações exigem permissões específicas em cada sistema operacional. No Android, é necessário configurar permissões no arquivo AndroidManifest.xml, como RECEIVE e INTERNET. No iOS, as permissões devem ser solicitadas em tempo de execução via UNUserNotificationCenter, além de habilitar as permissões correspondentes no Xcode para notificações remotas.

## **React Native Push Notification**

É outra biblioteca que permite criar notificações locais e push em React Native. Assim como Notifee, **não funciona no Expo Go**, sendo necessário um build nativo ou utilizar o Bare Workflow. Ela oferece funcionalidades similares, mas é mais antiga e menos flexível em comparação ao Notifee.