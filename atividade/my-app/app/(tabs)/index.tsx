import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, Pressable, StyleSheet, StatusBar } from "react-native";
import { useEating, formatDuration } from "../context/_EatingContext";




export default function HomeTab() {
  const { addEntry, totalPieces, lastEntryAt } = useEating();

  const [qty, setQty] = useState<string>("1");        // useState
  const [now, setNow] = useState<number>(Date.now()); // useState para “relógio”
  const inputRef = useRef<TextInput>(null);           // useRef

  // useEffect: ticker 1s para atualizar o “tempo desde a última vez”
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const onAdd = () => {
    const n = parseInt(qty, 10);
    if (!Number.isFinite(n) || n <= 0) return;
    addEntry(n);
    setQty("1");
    inputRef.current?.focus();
  };

  const sinceMs = lastEntryAt ? now - lastEntryAt : 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.card}>
        <Text style={styles.title}>Contador de Pedaços</Text>

        <View style={styles.row}>
          <TextInput
            ref={inputRef}
            keyboardType="numeric"
            value={qty}
            onChangeText={setQty}
            style={styles.input}
            returnKeyType="done"
            onSubmitEditing={onAdd}
          />
          <Pressable onPress={onAdd} style={styles.btn}>
            <Text style={styles.btnTxt}>Adicionar</Text>
          </Pressable>
        </View>

        <View style={styles.metrics}>
          <Metric label="Total de pedaços" value={String(totalPieces)} />
          <Metric label="Tempo desde a última vez" value={lastEntryAt ? formatDuration(sinceMs) : "—"} />
        </View>
      </View>
    </SafeAreaView>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center", backgroundColor: "#fff" },
  card: { borderWidth: 1, borderColor: "#e5e5e5", borderRadius: 16, padding: 16, gap: 16, backgroundColor: "#fafafa" },
  title: { fontSize: 22, fontWeight: "700", color: "#111" },
  row: { flexDirection: "row", gap: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: "#e5e5e5", borderRadius: 12, paddingHorizontal: 12, height: 48, fontSize: 18, color: "#111" },
  btn: { paddingHorizontal: 16, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: "#2563eb" },
  btnTxt: { color: "#FFF", fontWeight: "600", fontSize: 16 },
  metrics: { flexDirection: "row", gap: 16, justifyContent: "space-between" },
  metric: { flex: 1 },
  metricLabel: { opacity: 0.8, marginBottom: 4, color: "#111" },
  metricValue: { fontSize: 20, fontWeight: "700", color: "#111" },
});
