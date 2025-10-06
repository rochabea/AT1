pesquisa sobre: 
- Hooks
O que são: São funções do React que permitem usar recursos que antes só existiam em componentes de classe (como estado e ciclo de vida), mas agora em componentes funcionais.
Exemplo de hooks principais: useState, useEffect, useRef, useContext, useMemo, etc.
Por que usar: Deixam o código mais simples, reutilizável e organizado.

- useState
O que faz: Permite criar variáveis de estado dentro de um componente funcional.
Estado é qualquer informação que pode mudar na interface (ex: contador, texto de input, tema claro/escuro).

- useEffect
O que faz: Permite executar efeitos colaterais no componente, como chamadas a APIs, timers, animações, ou quando uma variável de estado mudar.
Pensa como o “ciclo de vida” do componente.

- useRef
O que faz: Cria uma referência mutável que não dispara re-renderizações quando muda.
Muito usado para acessar elementos da UI (ex: TextInput), guardar valores entre renderizações ou armazenar IDs de intervalos/timers.

- useContext
O que faz: Permite compartilhar dados globais entre vários componentes sem precisar passar props manualmente em cada nível.
Muito usado para tema, autenticação, idioma, configs globais.


**contexto do app para aplicação**:  app funciona como um contador de quantos pedaços eu comi e quanto tempo demorei para comer algo (seria o tempo desde da ultima vez que inseri o valor ate o proximo valor inserido pleo usuario).
                  
                  ┌──────────────────────────────────────────────────────────────┐
                  │                     App / _layout.tsx                        │
                  │  ──────────────────────────────────────────────────────────  │
                  │  ✅ Envolve tudo com <EatingProvider>                        │
                  │  └── fornece contexto global EatingContext                   │
                  └──────────────────────────────────────────────────────────────┘
                                              │
                                              ▼
                            ┌─────────────────────────────────────────┐
                            │        app/context/_EatingContext.tsx   │
                            │─────────────────────────────────────────│
                            │  🧩 define: createContext()              │
                            │  🧠 usa: useState → lista de entradas    │
                            │        useMemo → cálculos derivados     │
                            │        useContext → cria hook useEating │
                            │  📤 exporta: { useEating, EatingProvider } │
                            └─────────────────────────────────────────┘
                                              │
                          ┌────────────────────┼──────────────────────┐
                          ▼                    ▼                      ▼
                  ┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐
                  │ app/(tabs)/index.tsx│ │ app/(tabs)/two.tsx  │ │ app/(tabs)/three.tsx│
                  │─────────────────────│ │─────────────────────│ │─────────────────────│
                  │ 🪝 useContext(useEating)│ useContext(useEating)│ useContext(useEating)│
                  │ 🪝 useState(qty, now)   │ useMemo(calcula diffs)│ useMemo(médias, ritmo)│
                  │ 🪝 useEffect(timer)     │                     │                     │
                  │ 🪝 useRef(TextInput)    │                     │                     │
                  │ ➕ adiciona pedaços     │ 📜 mostra histórico  │ 📊 mostra estatísticas│
                  └─────────────────────┘ └─────────────────────┘ └─────────────────────┘
                  
                  
                  useState ──┐
                  useMemo ───┼──► usados no EatingContext → alimentam o estado global
                  useContext ─┘
                  
                  useEffect ─► roda a cada segundo na Home para atualizar o cronômetro
useRef ─────► mantém o foco no input
