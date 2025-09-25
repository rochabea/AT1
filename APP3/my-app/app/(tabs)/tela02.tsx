import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function PromoScreen() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://via.placeholder.com/200" }} style={styles.img} />
      <Text style={styles.title}>Peça seu Cartão de Crédito Mercado Pago</Text>
      <Text style={styles.subtitle}>
        - Parcelas suas compras em até 18x sem juros no Mercado Livre{"\n"}
        - Anuidade Grátis{"\n"}
        - Segurança e controle garantido pelo app
      </Text>
      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTxt}>Peça já</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  img: { width: 200, height: 200, marginBottom: 20, resizeMode: "contain" },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: "center", marginVertical: 10, color: "#555" },
  botao: { backgroundColor: "#2767B1", padding: 15, borderRadius: 10, marginTop: 20, width: "80%", alignItems: "center" },
  botaoTxt: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
