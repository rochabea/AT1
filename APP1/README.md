# APP1
**Componentes utilizados**
- View 
- Text 
- TextInput 
- Button 
- Alert 
- Image 
- Modal 
- ActivityIndicator 
- FlatList 
- SafeAreaView 
- ScrollView 
- SectionList 
- StatusBar 
- Switch 
- TouchableOpacity 


**Onde foram utilizados**
- View: modal.tsx, index.tsx, two.tsx, three.tsx
- Text: modal.tsx, index.tsx, two.tsx, three.tsx
- TextInput: index.tsx, three.tsx
- Button: index.tsx
- Alert: modal.tsx, index.tsx, two.tsx, three.tsx
- Image: index.tsx, two.tsx, three.tsx
- Modal: modal.tsx
- ActivityIndicator: index.tsx
- FlatList: index.tsx
- SafeAreaView: modal.tsx, index.tsx, two.tsx, three.tsx
- ScrollView: three.tsx 
- SectionList: two.tsx
- StatusBar: index.tsx, two.tsx,three.tsx
- Switch: index.tsx, two.tsx, three.tsx
- TouchableOpacity: three.tsx

**Depreciação e boas práticas**
- **Button**: funcional, mas limitado em estilo. Para botões customizados use **`Pressable`** ou **`TouchableOpacity`** + `<Text/>`.
- **TouchableOpacity vs Pressable**: `Pressable` é mais novo e flexível (eventos como `onPressIn/Out`, `hover`, etc.). `TouchableOpacity` continua popular e não está deprecado.
- **SafeAreaView**:
  - `react-native-safe-area-context` é recomendado por dar suporte amplo e hooks úteis.
  - O `SafeAreaView` do RN puro existe, mas o da lib é mais confiável em diferentes aparelhos.
- **StatusBar**:
  - Em projetos Expo, pode-se usar também `expo-status-bar` (`<StatusBar style="light" />`) que simplifica em alguns casos.
- **ScrollView**:
  - Evite para listas longas (performance). Prefira **FlatList** / **SectionList** (renderização sob demanda).
- **Image**:
  - Para imagens remotas, prefira URIs com HTTPS. Para cache/otimização avançada, avalie libs (ex.: `expo-image` em projetos Expo).
- **Modal** (RN nativo):
  - Bom para pop-ups simples. Para Bottom Sheets ou animações avançadas: `react-native-modal` ou `@gorhom/bottom-sheet`.
- **ActivityIndicator**:
  - Ok para spinners simples. Para skeletons/shimmers, use libs específicas.
- **Alert**:
  - Nativo, simples. Para diálogos customizados, construa modal próprio.
