import React, { useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet, Alert } from "react-native";

export default function TwoScreen(): React.ReactElement {
  const [visible, setVisible] = useState<boolean>(false);
  const [mensagem, setMensagem] = useState<string>("");

  const abrir = (): void => setVisible(true);
  const cancelar = (): void => {
    setMensagem("");
    setVisible(false);
  };
  const enviar = (): void => {
    Alert.alert("Alerta!", mensagem ? `Mensagem enviada: ${mensagem}` : "Digite uma mensagem hj :)");
    if (mensagem) {
      setMensagem("");
      setVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      {!visible ? (
        <Pressable style={styles.openBtn} onPress={abrir}>
          <Text style={styles.openBtnText}>Escrever mensagem</Text>
        </Pressable>
      ) : (
        <View style={styles.card}>
          <Text style={styles.title}>Deixe uma mensagem feliz:</Text>

          <TextInput
            placeholder="Digite sua mensagem"
            value={mensagem}
            onChangeText={setMensagem}
            style={styles.input}
            multiline
          />

          <View style={styles.row}>
            <Pressable style={[styles.btn, styles.cancel]} onPress={cancelar}>
              <Text style={styles.btnText}>Cancelar</Text>
            </Pressable>
            <Pressable style={[styles.btn, styles.save]} onPress={enviar}>
              <Text style={styles.btnText}>Enviar</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, backgroundColor: "#f5f5f5" },

  openBtn: { backgroundColor: "#007AFF", paddingVertical: 12, paddingHorizontal: 24, borderRadius: 10 },
  openBtnText: { color: "#fff", fontWeight: "600" },

  card: {
    width: "100%", maxWidth: 360, backgroundColor: "#fff", borderRadius: 14, padding: 16,
    elevation: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8,
  },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 12 },

  input: {
    borderWidth: 1, borderColor: "#ddd", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10,
    minHeight: 44, backgroundColor: "#fff", marginBottom: 16, textAlignVertical: "top",
  },

  row: { flexDirection: "row", gap: 10, justifyContent: "flex-end" },

  btn: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
  cancel: { backgroundColor: "#999" },
  save: { backgroundColor: "#007AFF" },
  btnText: { color: "#fff", fontWeight: "600" },
});
