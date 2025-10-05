import React, { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import { useEating, formatDuration } from "../context/_EatingContext";

export default function StatsTab() {
  const { entries, totalPieces, avgIntervalMs } = useEating();

  const piecesPerHour = useMemo(() => {
    if (entries.length < 2) return null;
    const sorted = [...entries].sort((a, b) => a.at - b.at);
    const ms = sorted[sorted.length - 1].at - sorted[0].at;
    if (ms <= 0) return null;
    return (totalPieces / (ms / (1000 * 60 * 60))).toFixed(2);
  }, [entries, totalPieces]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Row label="Total de pedaços" value={String(totalPieces)} />
        <Row label="Intervalo médio" value={avgIntervalMs ? formatDuration(avgIntervalMs) : "—"} />
        <Row label="Ritmo (pedaços/hora)" value={piecesPerHour ?? "—"} />
      </View>
    </SafeAreaView>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  card: { borderWidth: 1, borderColor: "#e5e5e5", borderRadius: 16, padding: 16, gap: 12, backgroundColor: "#fafafa" },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  label: { opacity: 0.9, color: "#111" },
  value: { fontWeight: "700", fontSize: 18, color: "#111" },
});
