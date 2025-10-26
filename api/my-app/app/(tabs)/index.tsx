// app/(tabs)/index.tsx
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { searchDrugByActive } from "../../services/openfda.api";

type DrugLabel = {
  id?: string;
  openfda?: {
    brand_name?: string[];
    generic_name?: string[];
    manufacturer_name?: string[];
  };
  indications_and_usage?: string[];
  warnings?: string[];
};

export default function FarmaciaInfoHome() {
  const router = useRouter();
  const [query, setQuery] = useState("ibuprofen"); // sugestão inicial
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DrugLabel[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchDrugByActive(query, 8);
      setData(results);
    } catch (e: any) {
      setError(e?.message ?? "Erro ao consultar a OpenFDA");
      Alert.alert("Erro (Axios)", e?.message ?? "Falha desconhecida");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // carrega uma vez

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Farmácia Info — OpenFDA (Axios)</Text>
        <Text style={styles.subtitle}>
          Pesquise rótulos por <Text style={{ fontWeight: "700" }}>ingrediente ativo</Text> (ex.: ibuprofen, paracetamol, amoxicillin).
        </Text>

        <View style={{ gap: 8 }}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Ex.: ibuprofen"
            autoCapitalize="none"
            style={styles.input}
            returnKeyType="search"
          />
          <Pressable onPress={fetchData} style={styles.button}>
            <Text style={styles.buttonText}>Buscar</Text>
          </Pressable>
        </View>

        {loading && (
          <View style={styles.center}>
            <ActivityIndicator />
            <Text>Carregando…</Text>
          </View>
        )}

        {error && <Text style={styles.error}>{error}</Text>}

        {!loading && !error && data.length === 0 && (
          <Text style={{ color: "#666" }}>Nenhum resultado para “{query}”.</Text>
        )}

        {!loading &&
          !error &&
          data.map((item, idx) => {
            const brand = item.openfda?.brand_name?.[0] ?? "—";
            const generic = item.openfda?.generic_name?.[0] ?? "—";
            const manuf = item.openfda?.manufacturer_name?.[0] ?? "—";
            const ind = item.indications_and_usage?.[0]?.slice(0, 160) ?? "Sem resumo de indicações.";
            return (
              <View key={`${item.id ?? idx}`} style={styles.card}>
                <Text style={styles.cardTitle}>{brand}</Text>
                <Text style={styles.meta}>Genérico: {generic}</Text>
                <Text style={styles.meta}>Fabricante: {manuf}</Text>
                <Text style={styles.desc}>{ind} {ind.length >= 160 ? "…" : ""}</Text>
              </View>
            );
          })}

        <Pressable onPress={() => router.push("/(tabs)/two")} style={[styles.button, { marginTop: 12 }]}>
          <Text style={styles.buttonText}>Ir para Notícias (Fetch)</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 16 },
  title: { fontSize: 22, fontWeight: "800", textAlign: "center" },
  subtitle: { fontSize: 14, color: "#444", textAlign: "center" },
  input: {
    borderWidth: 1, borderColor: "#e5e5e5", borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 16, backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#0a84ff", paddingVertical: 12, borderRadius: 12, alignItems: "center",
    shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 6, elevation: 2,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  center: { alignItems: "center", gap: 6 },
  error: { color: "#e53935" },
  card: {
    borderWidth: 1, borderColor: "#eee", borderRadius: 14, padding: 12, backgroundColor: "#fafafa",
  },
  cardTitle: { fontWeight: "800", fontSize: 16, marginBottom: 2 },
  meta: { color: "#555", fontSize: 12 },
  desc: { marginTop: 6, color: "#222" },
});
