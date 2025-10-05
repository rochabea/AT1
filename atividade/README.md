pesquisa sobre: 
- Hooks
- useState
- useEffect
- useRef
- useContext

contexto do app para aplicação:  app funciona como um contador de quantos pedaços eu comi e quanto tempo demorei para comer algo (seria o tempo desde da ultima vez que inseri o valor ate o proximo valor inserido pleo usuario).

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
