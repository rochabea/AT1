import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  Text,
  View,
  Alert,
  ActivityIndicator,
  FlatList,
  StatusBar,
  Switch,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

// imagens 
const imgDark = require('@/assets/images/logo_cinza.png');
const imgLight = require('@/assets/images/introduction_context.png');

//  Tipo da árvore 
type TreeNode = {
  id: string;
  title: string;
  children?: TreeNode[];
};

// árvore 
const TREE_DATA: TreeNode[] = [
  {
    id: '1',
    title: 'View',
    children: [
      { id: '1.1', title: 'Bloco genérico para estruturar a tela (como div no HTML).' },
      {
        id: '1.2',
        title: 'teste, exemplo de um subtópico',
        children: [
          { id: '1.2.1', title: 'teste, exemplo de um conteúdo de um subtópico' },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'SafeAreaView',
    children: [{ id: '2.1', title: 'Garante que o conteúdo não fique por baixo de áreas “perigosas” (notch, barra de status, etc.).' }],
  },
  {
    id: '3',
    title: 'ScrollView ',
    children: [{ id: '3.1', title: 'Permite rolagem de conteúdo (quando há muitos elementos).' }],
  },
  {
    id: '4',
    title: 'Text ',
    children: [{ id: '4.1', title: 'Usado para exibir texto na tela.' }],
  },
  {
    id: '5',
    title: 'TextInput ',
    children: [{ id: '5.1', title: 'Campo de entrada para digitar texto.' }],
  },
  {
    id: '6',
    title: 'Button ',
    children: [{ id: '6.1', title: 'Botão simples com título e ação onPress.' }],
  },
  {
    id: '7',
    title: 'TouchableOpacity',
    children: [{ id: '7.1', title: 'Área clicável que reduz opacidade ao toque (mais flexível que Button).' }],
  },
  {
    id: '8',
    title: 'Switch',
    children: [{ id: '8.1', title: 'Componente de alternância (toggle), tipo liga/desliga.' }],
  },
  {
    id: '9',
    title: 'Alert',
    children: [{ id: '9.1', title: 'Alerta nativo do sistema (caixa de diálogo simples).' }],
  },
  {
    id: '10',
    title: 'ActivityIndicato',
    children: [{ id: '10.1', title: 'Spinner de carregamento que exibe conteúdo sobreposto, como pop-up (ex.: formulário, confirmação).' }],
  },
  {
    id: '11',
    title: 'Image',
    children: [{ id: '11.1', title: 'Exibe imagens locais ou remotas.' }],
  },
  {
    id: '12',
    title: 'Modal',
    children: [{ id: '12.1', title: 'Exibe conteúdo sobreposto, como pop-up (ex.: formulário, confirmação).' }],
  },
  {
    id: '13',
    title: 'FlatList',
    children: [{ id: '13.1', title: 'Lista performática para muitos itens (renderiza sob demanda).' }],
  },
  {
    id: '14',
    title: 'SectionList',
    children: [{ id: '14.1', title: 'Lista com seções (títulos + itens), como menu de contatos.' }],
  },
  {
    id: '15',
    title: 'StatusBar',
    children: [{ id: '15.1', title: 'Controla estilo e cor da barra de status (ícones claros/escuros, fundo).' }],
  },
];

//  Flatten utilitário 
type FlatRow = { node: TreeNode; depth: number; hasChildren: boolean; expanded: boolean };

function flattenVisible(nodes: TreeNode[], expanded: Set<string>, depth = 0): FlatRow[] {
  const rows: FlatRow[] = [];
  for (const n of nodes) {
    const hasChildren = !!(n.children && n.children.length);
    const isExpanded = hasChildren && expanded.has(n.id);
    rows.push({ node: n, depth, hasChildren, expanded: !!isExpanded });

    if (hasChildren && isExpanded) {
      rows.push(...flattenVisible(n.children!, expanded, depth + 1));
    }
  }
  return rows;
}

export default function TwoScreen(): React.ReactElement {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((p) => !p);

  const [visible, setVisible] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);

  // controle dos nós expandidos
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const visibleData = useMemo(() => flattenVisible(TREE_DATA, expanded), [expanded]);

  const toggleNode = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const abrir = () => setVisible(true);
  const cancelar = () => {
    if (loading) return;
    setMensagem('');
    setVisible(false);
  };
  const enviar = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      Alert.alert('Alerta!', mensagem ? `Mensagem enviada: ${mensagem}` : 'Digite uma mensagem :)');
      if (mensagem) {
        setMensagem('');
        setVisible(false);
      }
    } catch {
      Alert.alert('Erro', 'Não foi possível enviar a mensagem.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={[styles.container, isDark ? styles.dark : styles.light]}>
        {/* Header fixo */}
        <View style={styles.headerRow}>
          <Text style={[styles.headerTitle, isDark ? styles.textDark : styles.textLight]}>
            {isDark ? 'Modo Escuro' : 'Modo Claro'}
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDark ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleTheme}
            value={isDark}
          />
        </View>

        <View style={{ flex: 1, position: 'relative' }}>
          <FlatList
            ListHeaderComponent={
              <>
                {/* Card imagem */}
                <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
                  <Image
                    source={isDark ? imgDark : imgLight}
                    style={styles.cardImage}
                    resizeMode="contain"
                  />
                </View>

                <Text style={[styles.heading, isDark ? styles.textDark : styles.textLight]}>
                  BUTTON
                </Text>
                

                {/* Card de mensagem */}
                <View style={styles.centerBox}>
                  {!visible ? (
                    <Pressable
                      style={styles.openBtn}
                      onPress={abrir}
                      disabled={loading}
                      android_ripple={{ color: '#ffffff33' }}
                    >
                      <Text style={styles.openBtnText}>Escrever mensagem</Text>
                    </Pressable>
                  ) : (
                    <View style={[styles.msgCard, isDark ? styles.msgCardDark : styles.msgCardLight]}>
                      <Text style={[styles.msgTitle, isDark ? styles.textDark : styles.textLight]}>
                        Deixe uma mensagem feliz:
                      </Text>

                      <TextInput
                        placeholder="Digite sua mensagem"
                        placeholderTextColor={isDark ? '#bbb' : '#666'}
                        value={mensagem}
                        onChangeText={setMensagem}
                        style={[
                          styles.input,
                          isDark ? styles.inputDark : styles.inputLight,
                          loading && { opacity: 0.8 },
                        ]}
                        multiline
                        editable={!loading}
                      />

                      <View style={styles.row}>
                        <Pressable
                          style={[styles.btn, styles.cancel, loading && styles.btnDisabled]}
                          onPress={cancelar}
                          disabled={loading}
                        >
                          <Text style={styles.btnText}>Cancelar</Text>
                        </Pressable>

                        <Pressable
                          style={[styles.btn, styles.save, loading && styles.btnDisabled]}
                          onPress={enviar}
                          disabled={loading}
                        >
                          {loading ? (
                            <ActivityIndicator size="small" color="#ffffff" />
                          ) : (
                            <Text style={styles.btnText}>Enviar</Text>
                          )}
                        </Pressable>
                      </View>
                    </View>
                  )}
                </View>
                
                <View style={[styles.separator, isDark ? styles.sepDark : styles.sepLight]} />

                <Text
                  style={[
                    styles.heading,
                    { marginTop: 20 },
                    isDark ? styles.textDark : styles.textLight,
                  ]}
                >
                  Principais componentes React Native.{'\n'}
                  Saiba mais sobre cada um tocando no item.
                </Text>
              </>
            }
            data={visibleData}
            keyExtractor={(row) => row.node.id}
            renderItem={({ item }) => {
              const { node, depth, hasChildren, expanded } = item;
              return (
                <Pressable
                  onPress={() =>
                    hasChildren ? toggleNode(node.id) : Alert.alert('Item', node.title)
                  }
                  style={[
                    styles.item,
                    isDark ? styles.itemDark : styles.itemLight,
                    { paddingLeft: 16 + depth * 14 },
                  ]}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    {hasChildren ? (
                      <Text style={[isDark ? styles.textDark : styles.textLight, { width: 18 }]}>
                        {expanded ? '▾' : '▸'}
                      </Text>
                    ) : (
                      <Text style={{ width: 18 }} />
                    )}

                    <Text style={[styles.itemTitle, isDark ? styles.textDark : styles.textLight]}>
                      {node.title}
                    </Text>
                  </View>
                </Pressable>
              );
            }}
            contentContainerStyle={{ paddingTop: 8, paddingBottom: 40 }}
          />

          {loading && (
            <View
              style={[
                styles.loadingOverlay,
                { backgroundColor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.35)' },
              ]}
            >
              <ActivityIndicator size="large" color="#ffffff" />
              <Text style={{ marginTop: 8, color: '#ffffff' }}>Enviando...</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  light: { backgroundColor: '#ffffff' },
  dark: { backgroundColor: '#222222' },
  textLight: { color: '#111' },
  textDark: { color: '#ffffff' },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingBottom: 8,
    paddingHorizontal: 20,
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },

  card: {
    marginTop: 12,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cardLight: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 4,
  },
  cardImage: { width: '100%', height: 180 },

  heading: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  separator: {
    height: 1,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 1,
  },
  sepLight: { backgroundColor: '#1e1b1bff' },
  sepDark: { backgroundColor: 'rgba(255,255,255,0.2)' },

  centerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  openBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#2563EB',
    elevation: 2,
  },
  openBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  msgCard: {
    width: '100%',
    borderRadius: 12,
    padding: 14,
  },
  msgCardLight: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  msgCardDark: {
    backgroundColor: '#2B2B2B',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 4,
  },
  msgTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    minHeight: 80,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    marginBottom: 12,
    borderWidth: 1,
  },
  inputLight: {
    backgroundColor: '#FAFAFA',
    borderColor: '#E5E7EB',
    color: '#111',
  },
  inputDark: {
    backgroundColor: '#1F1F1F',
    borderColor: '#3A3A3A',
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  cancel: {
    backgroundColor: '#6B7280',
  },
  save: {
    backgroundColor: '#16A34A',
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
  },

  item: {
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 12,
    paddingVertical: 14,
    paddingRight: 16,
  },
  itemLight: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  itemDark: {
    backgroundColor: '#2D2D2D',
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
  },

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
