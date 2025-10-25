import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Platform, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// NO APP FUNCIONA TRANQUILAMENTE ENTÃO PODE RODAR O QRCODE NO SEU CELULAR
// Inicialização do banco
// Obs: SQLite (expo-sqlite) funciona apenas no mobile (iOS/Android).
// NO WEB O SQLITE NÃO FUNCIONA, então usamos AsyncStorage para armazenar os dados.
let db = null;
if (Platform.OS !== 'web') {
  import('expo-sqlite').then(module => {
    db = module.openDatabase('usuarios.db');
  }).catch(err => console.error('Erro ao importar expo-sqlite:', err));
}

export default function AppUsuarios() {
  const [nome, setNome] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      const intervalo = setInterval(() => {
        if (db) {
          clearInterval(intervalo);
          db.transaction(tx => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT);',
              [],
              () => carregarUsuariosMobile(),
              (t, error) => { console.log('Erro ao criar tabela:', error); return true; }
            );
          });
        }
      }, 100);
    } else {
      carregarUsuariosWeb();
    }
  }, []);

  // Adicionar usuário
  const salvarUsuario = async () => {
    if (!nome.trim()) return;

    if (Platform.OS !== 'web' && db) {
      db.transaction(
        tx => tx.executeSql('INSERT INTO usuarios (nome) VALUES (?);', [nome]),
        erro => console.error('Erro ao inserir usuário:', erro),
        carregarUsuariosMobile
      );
    } else {
      try {
        const dadosExistentes = await AsyncStorage.getItem('usuarios');
        const arrayUsuarios = dadosExistentes ? JSON.parse(dadosExistentes) : [];
        arrayUsuarios.push({ id: Date.now(), nome });
        await AsyncStorage.setItem('usuarios', JSON.stringify(arrayUsuarios));
        carregarUsuariosWeb();
      } catch (erro) {
        console.error('Erro AsyncStorage:', erro);
      }
    }

    setNome('');
  };

  // Apagar todos os usuários
  const apagarUsuarios = async () => {
    if (Platform.OS !== 'web' && db) {
      db.transaction(
        tx => {
          tx.executeSql('DELETE FROM usuarios;');
          tx.executeSql('DELETE FROM sqlite_sequence WHERE name="usuarios";'); // reset ID
        },
        erro => console.error('Erro ao apagar usuários:', erro),
        () => setUsuarios([])
      );
    } else {
      try {
        await AsyncStorage.removeItem('usuarios');
        setUsuarios([]);
      } catch (erro) {
        console.error('Erro ao apagar usuários web:', erro);
      }
    }
  };

  // Carregar usuários
  const carregarUsuariosMobile = () => {
    if (!db) return;
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM usuarios;',
        [],
        (_, { rows }) => setUsuarios(rows._array),
        (t, error) => { console.log('Erro ao carregar usuários:', error); return true; }
      );
    });
  };

  const carregarUsuariosWeb = async () => {
    try {
      const dadosExistentes = await AsyncStorage.getItem('usuarios');
      setUsuarios(dadosExistentes ? JSON.parse(dadosExistentes) : []);
    } catch (erro) {
      console.error('Erro ao carregar usuários web:', erro);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuários</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o nome"
        placeholderTextColor="#AAA"
        value={nome}
        onChangeText={setNome}
      />

      <TouchableOpacity style={styles.buttonAdd} onPress={salvarUsuario}>
        <Text style={styles.buttonText}>Adicionar Usuário</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonDelete} onPress={apagarUsuarios}>
        <Text style={styles.buttonText}>Apagar Usuários</Text>
      </TouchableOpacity>

      {usuarios.length > 0 ? (
        <FlatList
          data={usuarios}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.usuarioBox}>
              <Text style={styles.usuarioNome}>{item.nome}</Text>
            </View>
          )}
          style={{ marginTop: 20 }}
        />
      ) : (
        <Text style={styles.noUsers}>Nenhum usuário salvo ainda</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5',
    padding: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#3A3A3A',
    textAlign: 'center',
    marginBottom: 25,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#F5A5B5',
    borderRadius: 14,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFF',
    marginBottom: 15,
  },
  buttonAdd: {
    backgroundColor: '#C2185B',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    marginBottom: 10,
  },
  buttonDelete: {
    backgroundColor: '#FF6F91',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  usuarioBox: {
    backgroundColor: '#FFD6E0',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  usuarioNome: {
    fontSize: 18,
    fontWeight: '600',
    color: '#C2185B',
  },
  noUsers: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});
