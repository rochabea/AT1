import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// NO APP FUNCIONA TRANQUILAMENTE ENTÃO PODE RODAR O QRCODE NO SEU CELULAR

export default function NomeLocal() {
  const [nome, setNome] = useState('');
  const [nomeSalvo, setNomeSalvo] = useState('');

  useEffect(() => {
    carregarNome();
  }, []);

  const salvarNome = async () => {
    try {
      await AsyncStorage.setItem('usuarioNome', nome);
      setNome('');
      carregarNome();
      alert('Nome salvo com sucesso!');
    } catch (erro) {
      console.error(erro);
    }
  };

  const carregarNome = async () => {
    try {
      const valor = await AsyncStorage.getItem('usuarioNome');
      if (valor) setNomeSalvo(valor);
    } catch (erro) {
      console.error(erro);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AsyncStorage</Text>

      {nomeSalvo ? (
        <View style={styles.savedBox}>
          <Text style={styles.label}>Nome salvo:</Text>
          <Text style={styles.savedName}>{nomeSalvo}</Text>
        </View>
      ) : (
        <Text style={styles.noName}>Nenhum nome salvo ainda</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        placeholderTextColor="#AAA"
        value={nome}
        onChangeText={setNome}
      />

      <TouchableOpacity style={styles.button} onPress={salvarNome}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#3A3A3A',
    marginBottom: 30,
  },
  savedBox: {
    backgroundColor: '#FFD6E0',
    borderRadius: 14,
    padding: 18,
    marginBottom: 25,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 15,
    color: '#666',
  },
  savedName: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#C2185B',
    marginTop: 8,
  },
  noName: {
    fontSize: 16,
    color: '#888',
    marginBottom: 25,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#F5A5B5',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFF',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#F48FB1',
    borderRadius: 12,
    paddingVertical: 13,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
