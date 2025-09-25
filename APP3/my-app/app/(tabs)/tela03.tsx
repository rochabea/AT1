import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function PerfilScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header com nome */}
      <View style={styles.header}>
        <Text style={styles.nome}>Diego Rodrigues</Text>
        <TouchableOpacity>
          <Text style={styles.addTel}>+ Adicionar telefone de acesso</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de opções */}
      <TouchableOpacity style={styles.item}><Text>📦 Entrega mais segura</Text></TouchableOpacity>
      <TouchableOpacity style={styles.item}><Text>💬 Conversas</Text></TouchableOpacity>
      <TouchableOpacity style={styles.item}><Text>🔔 Notificações</Text></TouchableOpacity>
      <TouchableOpacity style={styles.item}><Text>👤 Dados da conta</Text></TouchableOpacity>
      <TouchableOpacity style={styles.item}><Text>💳 Pagamentos</Text></TouchableOpacity>
      <TouchableOpacity style={styles.item}><Text>🏷️ Cupons</Text></TouchableOpacity>
      <TouchableOpacity style={styles.item}><Text>👥 Comunidade iFood</Text></TouchableOpacity>
      <TouchableOpacity style={styles.item}><Text>📌 Código de entrega</Text></TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 20, borderBottomWidth: 1, borderColor: "#eee" },
  nome: { fontSize: 18, fontWeight: "bold" },
  addTel: { color: "red", marginTop: 5 },
  item: { padding: 15, borderBottomWidth: 1, borderColor: "#eee" },
});
