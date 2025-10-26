// app/(tabs)/index.tsx
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function IntroScreen() {
  const router = useRouter();

  const goToForm = () => {
    router.push("/(tabs)/two");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Formulário de Cadastro</Text>
        <Text style={styles.subtitle}>
          Esta é uma tela de apresentação do formulário que você irá preencher.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>O que você vai preencher?</Text>
          <Text style={styles.item}>• Nome</Text>
          <Text style={styles.item}>• Data de nascimento</Text>
          <Text style={styles.item}>• Senha (oculta com secureTextEntry)</Text>
          <Text style={styles.item}>• Número do calçado (teclado numérico)</Text>
          <Text style={styles.item}>• Estado (UF) e Cidade</Text>
        </View>

        <Pressable onPress={goToForm} style={styles.button}>
          <Text style={styles.buttonText}>Começar</Text>
        </Pressable>

        <Text style={styles.note}>
          Toque em “Começar” para ir ao formulário na aba do <Text style={{fontWeight:"700"}}>formulário</Text>.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 16, justifyContent: "center" },
  title: { textAlign: "center", fontSize: 24, fontWeight: "800", color: "#0a0a0a" },
  subtitle: { fontSize: 14, color: "#444" },
  card: {
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#fafafa",
  },
  cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: 8 },
  item: { fontSize: 14, color: "#333", marginVertical: 2 },
  button: {
    backgroundColor: "#0a84ff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  note: { fontSize: 12, color: "#666", textAlign: "center" },
});
