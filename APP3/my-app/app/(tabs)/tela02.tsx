import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const Cartao = require("../../assets/images/cartao.png");

export default function PromoScreen() {
  return (
    <View style={styles.container}>
      {/* Conteúdo*/}
      <View style={styles.content}>
        <Image source={Cartao} style={styles.img} />

        <Text style={styles.title}>
          Peça seu Cartão de Crédito Mercado Pago aproveite essas vantagens exclusivas:
        </Text>

        <Text style={styles.subtitle}>
          - Parcelas suas compras em <Text style={styles.bold}>18x sem juros no Mercado Livre</Text>
        </Text>

        <Text style={styles.subtitle}>
          - Anuidade Grátis
        </Text>

        <Text style={styles.subtitle}>
          - <Text style={styles.bold}>Segurança e controle:</Text> acompanha seus gastos pelo App, garantindo controle de todas as suas transações
        </Text>
      </View>

      {/* Botão */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.botao}>
          <Text style={styles.botaoTxt}>Peça já</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", 
    paddingHorizontal: 20,
  },
  img: { 
    width: 200, 
    height: 200, 
    marginBottom: 20, 
    resizeMode: "contain" 
  },
  title: { 
    fontSize: 20, 
    fontWeight: "bold", 
    textAlign: "center", 
    marginBottom: 20 
  },
  subtitle: { 
    fontSize: 16, 
    textAlign: "center", 
    marginBottom: 12, 
    color: "#555" 
  },
  bold: { 
    fontWeight: "bold" 
  },
  footer: {
    padding: 20,
    alignItems: "center",
  },
  botao: { 
    backgroundColor: "#2767B1", 
    padding: 15, 
    borderRadius: 10, 
    width: "80%", 
    alignItems: "center" 
  },
  botaoTxt: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16 
  },
});
