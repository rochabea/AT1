import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  StatusBar,
  Switch,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const DATA = [
  { title: 'Estrutura de layout e Container', data: ['View', 'SafeAreaView', 'ScrollView'] },
  { title: 'Exibição e Entrada de Texto', data: ['Text', 'TextInput'] },
  { title: 'Interatividade', data: ['Button', 'TouchableOpacity', 'Switch'] },
  { title: 'Feedback e Notificações', data: ['Alert', 'ActivityIndicator'] },
  { title: 'Mídia e Exibição', data: ['Image'] },
  { title: 'JListas e Renderização', data: ['Modal'] },
  { title: 'Feedback e notificações', data: ['FlatList', 'SectionList'] },
  { title: 'Sistema/UI Nativa', data: ['StatusBar'] },
];

const SP = 8;

const App = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(p => !p);

  const [selected, setSelected] = useState<Set<string>>(new Set());

  const keyFor = (sectionTitle: string, item: string) => `${sectionTitle}|${item}`;

  const toggleItem = (sectionTitle: string, item: string) => {
    const k = keyFor(sectionTitle, item);
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  };

  const selectedList = useMemo(() => {
    return Array.from(selected).map(k => {
      const [section, item] = k.split('|');
      return { section, item };
    });
  }, [selected]);

  const saveSelection = () => {
    if (selectedList.length === 0) {
      Alert.alert('Aviso', 'Nenhum item selecionado!');
    } else {
      const items = selectedList.map(x => `${x.section}: ${x.item}`).join('\n');
      Alert.alert('Itens salvos ✅', items);
      setSelected(new Set());
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isEnabled ? 'light-content' : 'dark-content'}
        backgroundColor={isEnabled ? '#222' : '#fff'}
      />
      <SafeAreaView
        style={[styles.container, isEnabled ? styles.dark : styles.light]}
        edges={['top']}
      >
        {/* Header fixo */}
        <View style={styles.row}>
          <Text style={[styles.headerTitle, isEnabled ? styles.textDark : styles.textLight]}>
            {isEnabled ? 'Modo Escuro' : 'Modo Claro'}
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        {/* Lista */}
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          contentContainerStyle={styles.listContent}
          stickySectionHeadersEnabled={false}
          renderItem={({ item, section }) => {
            const k = keyFor(section.title, item);
            const checked = selected.has(k);
            return (
              <Pressable
                onPress={() => toggleItem(section.title, item)}
                style={[styles.item, isEnabled ? styles.itemDark : styles.itemLight]}
              >
                <View style={styles.itemRow}>
                  <Text style={[styles.checkboxText, isEnabled ? styles.textDark : styles.textLight]}>
                    {checked ? '✅' : '⬜'}
                  </Text>
                  <Text style={[styles.itemText, isEnabled ? styles.textDark : styles.textLight]}>
                    {item}
                  </Text>
                </View>
              </Pressable>
            );
          }}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={[styles.sectionHeader, isEnabled ? styles.textDark : styles.textLight]}>
              {title}
            </Text>
          )}
          ListFooterComponent={
            <View style={styles.footer}>
              <Pressable style={styles.saveBtn} onPress={saveSelection}>
                <Text style={styles.saveBtnText}>Salvar Seleção</Text>
              </Pressable>
            </View>
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  light: { backgroundColor: '#fff' },
  dark: { backgroundColor: '#222' },
  textLight: { color: '#000' },
  textDark: { color: '#fff' },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SP * 2,
    paddingTop: SP * 2,
    paddingBottom: SP * 1.5,
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },

  listContent: { alignItems: 'stretch', paddingBottom: SP * 4 },

  sectionHeader: {
    fontSize: 20,
    fontWeight: '700',
    paddingLeft: SP * 5,
    paddingTop: SP * 2,
    paddingBottom: SP * 1,
    textAlign: 'left',
  },

  item: {
    width: '100%',
    paddingLeft: SP * 3,
    paddingRight: SP * 2,
    paddingVertical: SP * 1.5,
    borderRadius: 10,
    marginBottom: SP,
  },
  itemLight: { backgroundColor: '#f2f2f2' },
  itemDark: { backgroundColor: '#333' },
  itemText: { fontSize: 16, textAlign: 'left' },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: SP * 1.5 },

  checkboxText: { fontSize: 18 },

  footer: { padding: SP * 3, alignItems: 'center' },
  saveBtn: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: SP * 3,
    paddingVertical: SP * 1.5,
    borderRadius: 8,
  },
  saveBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

export default App;
