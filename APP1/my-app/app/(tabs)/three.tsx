import React, {useState} from 'react';
import {
  Switch, StyleSheet, Text, View, Image, StatusBar,
  TextInput, TouchableOpacity, Alert, ScrollView
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';


const imgDark = require('@/assets/images/logo_cinza.png');
const imgLight = require('@/assets/images/logo_azul_claro.png');

const App = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(p => !p);

  const [visible, setVisible] = useState<boolean>(false);
  const [mensagem, setMensagem] = useState<string>('');

  const abrir = () => setVisible(true);
  const cancelar = () => { setMensagem(''); setVisible(false); };
  const enviar = () => {
    Alert.alert('Alerta!', mensagem ? `Mensagem enviada: ${mensagem}` : 'Digite uma mensagem :)');
    if (mensagem) { setMensagem(''); setVisible(false); }
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isEnabled ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={[styles.container, isEnabled ? styles.dark : styles.light]}>

        {/* Header */}
        <View style={styles.row}>
          <Text style={[styles.title, isEnabled ? styles.textDark : styles.textLight]}>
            {isEnabled ? ' Modo Escuro' : ' Modo Claro'}
          </Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        {/* Conteúdo com Scroll */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Card de imagem */}
          <View style={[styles.card, isEnabled ? styles.cardDark : styles.cardLight]}>
            <Image
              source={isEnabled ? imgDark : imgLight}
              style={styles.cardImage}
              resizeMode="contain"
              accessible
              accessibilityLabel={isEnabled ? 'Imagem do modo escuro' : 'Imagem do modo claro'}
            />
          </View>
          <Text style={[styles.heading, isEnabled ? styles.textDark : styles.textLight]}>
                            Notas de Depreciação e boas práticas
                          </Text>
          
          <View style={styles.textWrapper}>
            <Text style={[styles.body, isEnabled ? styles.bodyDark : styles.bodyLight]}>
              <Text style={{ fontWeight: 'bold' }}>Button:</Text> funcional, mas limitado em estilo. Para botões customizados use <Text style={{ fontStyle: 'italic'}}>'Pressable'</Text> ou <Text style={{ fontStyle: 'italic' }}>'TouchableOpacity' + 'Text'.</Text>
            </Text>
            <Text style={[styles.body, isEnabled ? styles.bodyDark : styles.bodyLight]}>
              <Text style={{ fontWeight: 'bold' }}>TouchableOpacity vs Pressable:</Text> <Text style={{ fontStyle: 'italic'}}>'Pressable'</Text> é mais novo e flexível (eventos como <Text style={{ fontStyle: 'italic'}}>'onPressIn/Out'</Text>, <Text style={{ fontStyle: 'italic'}}>'hover'</Text>, etc.). 
              {'\n'}<Text style={{ fontStyle: 'italic'}}>'TouchableOpacity'</Text> continua popular e não está deprecado.
            </Text>
            <Text style={[styles.body, isEnabled ? styles.bodyDark : styles.bodyLight]}>
              <Text style={{ fontWeight: 'bold' }}>SafeAreaView: {'\n'}</Text>
              - <Text style={{ fontStyle: 'italic'}}>'react-native-safe-area-context'</Text> é recomendado por dar suporte amplo e hooks úteis. {'\n'}
              - O <Text style={{ fontStyle: 'italic'}}>'SafeAreaView'</Text> do RN puro existe, mas o da lib é mais confiável em diferentes aparelhos.
            </Text>
            <Text style={[styles.body, isEnabled ? styles.bodyDark : styles.bodyLight]}>
              <Text style={{ fontWeight: 'bold' }}>StatusBar:</Text> Em projetos Expo, pode-se usar também {'\n'}<Text style={{ fontStyle: 'italic'}}>'expo-status-bar' 'StatusBar style="light"</Text> que simplifica em alguns casos.
            </Text>
            <Text style={[styles.body, isEnabled ? styles.bodyDark : styles.bodyLight]}>
              <Text style={{ fontWeight: 'bold' }}>ScrollView:</Text> Evite para listas longas (performance). Prefira <Text style={{ fontStyle: 'italic'}}>'FlatList' ou  'SectionList'</Text> (renderização sob demanda).
            </Text>
            <Text style={[styles.body, isEnabled ? styles.bodyDark : styles.bodyLight]}>
              <Text style={{ fontWeight: 'bold' }}>Image:</Text> Para imagens remotas, prefira URIs com HTTPS. Para cache/otimização avançada, avalie libs (ex.: 'expo-image' em projetos Expo).
            </Text>
            <Text style={[styles.body, isEnabled ? styles.bodyDark : styles.bodyLight]}>
              <Text style={{ fontWeight: 'bold' }}>Modal(RN nativo):</Text> Bom para pop-ups simples. Para Bottom Sheets ou animações avançadas: <Text style={{ fontStyle: 'italic'}}>'react-native-modal' ou '@gorhom/bottom-sheet'.</Text>
            </Text>
            <Text style={[styles.body, isEnabled ? styles.bodyDark : styles.bodyLight]}>
              <Text style={{ fontWeight: 'bold' }}>ActivityIndicator:</Text> Ok para <Text style={{ fontStyle: 'italic' }}>spinners</Text> simples. Para <Text style={{ fontStyle: 'italic'}}>skeletons/shimmers</Text>, use libs específicas.
            </Text>
            <Text style={[styles.body, isEnabled ? styles.bodyDark : styles.bodyLight]}>
            <Text style={{ fontWeight: 'bold' }}>Alert:</Text> nativo, simples. Para diálogos customizados, construa modal próprio.</Text>

          </View>

          {/* Card de mensagem (abre/fecha) */}
          {visible && (
            <View style={[styles.msgCard, isEnabled ? styles.msgCardDark : styles.msgCardLight]}>
              <Text style={[styles.msgTitle, isEnabled ? styles.textDark : styles.textLight]}>
                Deixe uma mensagem sobre o aprendizado:
              </Text>

              <TextInput
                placeholder="Digite sua mensagem"
                placeholderTextColor={isEnabled ? '#bbb' : '#888'}
                value={mensagem}
                onChangeText={setMensagem}
                style={[styles.input, isEnabled ? styles.inputDark : styles.inputLight]}
                multiline
              />

              <View style={styles.msgRow}>
                <TouchableOpacity style={[styles.btn, styles.cancel]} onPress={cancelar} activeOpacity={0.7}>
                  <Text style={styles.btnText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.save]} onPress={enviar} activeOpacity={0.7}>
                  <Text style={styles.btnText}>Enviar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Rodapé fixo */}
        <View style={[styles.footer, isEnabled ? styles.footerDark : styles.footerLight]}>
          {!visible ? (
            <TouchableOpacity  style={styles.openBtn} onPress={abrir} activeOpacity={0.7}>
              <Text style={styles.openBtnText}>Escrever mensagem</Text>
            </TouchableOpacity >
          ) : (
            <TouchableOpacity style={[styles.openBtn, styles.closeBtn]} onPress={cancelar} activeOpacity={0.7}>
              <Text style={styles.openBtnText}>Fechar</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Header
  row: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 40, paddingHorizontal: 20,
  },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', flex: 1 },

  // Tema base
  light: { backgroundColor: '#fff' },
  dark: { backgroundColor: '#222' },
  textLight: { color: '#000' },
  textDark: { color: '#fff' },

  // Scroll área
  scroll: { flex: 1 },
  scrollContent: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flexGrow: 1,            
  },
 heading: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 4,
  },

  // Card imagem
  card: { marginTop: 20, padding: 16, borderRadius: 12, alignItems: 'center' },
  cardLight: { backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  cardDark: { backgroundColor: '#333', shadowColor: '#000', shadowOpacity: 0.4, shadowRadius: 4, elevation: 5 },
  cardImage: { width: '100%', height: 180 },

  // Texto principal — centrado no espaço restante
  textWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: { fontSize: 16, lineHeight: 22, textAlign: 'center' },
  bodyLight: { color: '#111' },
  bodyDark: { color: '#EEE' },

  // Card de mensagem
  msgCard: {
    marginTop: 20, width: '100%', maxWidth: 480, borderRadius: 14, padding: 16, alignSelf: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 4,
  },
  msgCardLight: { backgroundColor: '#fff' },
  msgCardDark: { backgroundColor: '#2b2b2b' },
  msgTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },

  input: {
    borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10,
    minHeight: 44, marginBottom: 16, textAlignVertical: 'top',
  },
  inputLight: { backgroundColor: '#fff', borderColor: '#ddd', color: '#111' },
  inputDark: { backgroundColor: '#1f1f1f', borderColor: '#444', color: '#eee' },

  msgRow: { flexDirection: 'row', gap: 10, justifyContent: 'flex-end' },
  btn: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
  cancel: { backgroundColor: '#999' },
  save: { backgroundColor: '#007AFF' },
  btnText: { color: '#fff', fontWeight: '600' },

  // Rodapé
  footer: {
    paddingHorizontal: 20, paddingBottom: 16, paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  footerLight: { backgroundColor: '#fff', borderTopColor: '#e5e5e5' },
  footerDark: { backgroundColor: '#1d1d1d', borderTopColor: '#333' },

  openBtn: {
    alignSelf: 'stretch', backgroundColor: '#007AFF', paddingVertical: 14,
    borderRadius: 10, alignItems: 'center',
  },
  closeBtn: { backgroundColor: '#ff3b30' },
  openBtnText: { color: '#fff', fontWeight: '700' },
});

export default App;
