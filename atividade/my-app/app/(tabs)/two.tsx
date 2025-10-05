import React, { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useEating, formatDuration } from "../context/_EatingContext";


export default function HistoryTab() {
  const { entries } = useEating();

  const rows = useMemo(() => {
    const sorted = [...entries].sort((a, b) => b.at - a.at); // recente -> antigo
    return sorted.map((e, i) => {
      const prev = sorted[i + 1];
      const diff = prev ? e.at - prev.at : null;
      return { ...e, diff };
    });
  }, [entries]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={rows}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>+{item.qty} pedaço(s)</Text>
            <Text style={styles.textMuted}>{new Date(item.at).toLocaleString()}</Text>
            <Text style={styles.textMuted}>
              Intervalo desde a anterior: {item.diff == null ? "—" : formatDuration(item.diff)}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={[styles.textMuted, { textAlign: "center", marginTop: 32 }]}>Ainda não há registros.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  item: { borderWidth: 1, borderColor: "#e5e5e5", borderRadius: 12, padding: 14, backgroundColor: "#fafafa" },
  title: { fontWeight: "700", marginBottom: 6, color: "#111" },
  textMuted: { color: "#333", opacity: 0.9 },
});
