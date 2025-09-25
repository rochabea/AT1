import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from "react-native";

// Imagens de bolos
const BoloCenoura = require("../../assets/images/bolo1.jpg");
const BoloFormigueiro = require("../../assets/images/bolo2.webp");
const BoloMilho = require("../../assets/images/bolo3.webp");
const BoloMandioca = require("../../assets/images/bolo4.webp");
const BoloChocolateMorango = require("../../assets/images/bolo5.webp");
const BoloCoco = require("../../assets/images/bolo6.jpeg");

const LogoBola = require("../../assets/images/logo2.png"); 
const FundoBolo = require("../../assets/images/logo.png");
const IconFavoritar = require("../../assets/images/coracao.png");
const IconPesquisar = require("../../assets/images/lupa.png");
const IconSeta = require("../../assets/images/seta-esquerda.png"); 
const IconSetaC = require("../../assets/images/seta-direitaC.png"); 
const IconSetaD = require("../../assets/images/seta-direita.png"); 
const IconCupom = require("../../assets/images/diamante.png"); 
const IconEstrela = require("../../assets/images/estrela.png"); 
const IconEstrelaC = require("../../assets/images/estrela-circulo.png"); 


 
type Produto = {
  id: string;
  nome: string;
  preco: string;
  img: any;
};

const produtos: Produto[] = [
  { id: "1", nome: "Metade Cenoura com Cobertura", preco: "R$ 30,00", img: BoloCenoura },
  { id: "2", nome: "Bolo Cenoura com cobertura", preco: "R$ 34,00", img: BoloFormigueiro },
  { id: "3", nome: "Bolo de Formigueiro", preco: "R$ 23,00", img: BoloMilho },
  { id: "4", nome: "Metade Milho", preco: "R$ 58,00", img: BoloMandioca },
  { id: "5", nome: "Bolo Milho", preco: "R$ 40,00", img: BoloChocolateMorango },
  { id: "6", nome: "Bolo Mandioca Romeu e Julieta", preco: "R$ 28,00", img: BoloCoco },
];

const screenWidth = Dimensions.get("window").width;
const produtoWidth = (screenWidth - 40) / 3;

export default function LojaScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerBackground}>
        <Image source={FundoBolo} style={styles.fundoBolo} />

        {/* Ícones topo */}
        <View style={styles.topIcons}>
          <TouchableOpacity style={styles.iconCircle}>
            <Image source={IconSeta} style={styles.iconImg} />
          </TouchableOpacity>
          <View style={styles.rightIcons}>
            <TouchableOpacity style={styles.iconCircle}>
              <Image source={IconFavoritar} style={styles.iconImg} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCircle}>
              <Image source={IconPesquisar} style={styles.iconImg} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.topBox}>
        <View style={styles.logoCircle}>
          <Image source={LogoBola} style={styles.logoIcon} resizeMode="cover" />
        </View>

        {/*linha 01*/}
        <TouchableOpacity style={styles.boxLine}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.tituloGrande}>Bolos da Ana Beatriz - Águas Claras</Text>
            <Text style={styles.subtitulo}>Entrega rastreável • 1,1 km • Mín R$ 20,00</Text>
          </View>
          <Image source={IconSetaC} style={styles.setaIcon} />
        </TouchableOpacity>
        <View style={styles.divider} />

        {/*linha 02*/}
        <TouchableOpacity style={styles.boxLine}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={IconEstrela} style={[styles.iconeAvaliacao, { marginRight: 4 }]} />
            <Text style={styles.avaliacaoNegrito}>4,9</Text>
            <Text style={styles.avaliacaoCinza}> • (1,1 mil avaliações) • </Text>
            <Image source={IconEstrelaC} style={[styles.iconeAvaliacao, { marginRight: 4 }]} />
            <Text style={styles.nivelNegrito}>Nível 4</Text>
            <Text style={styles.avaliacaoCinza}> de 5</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />

        {/*linha 03*/}
        <TouchableOpacity style={styles.boxLine}>
          <Text>
            <Text style={styles.negrito}>Entrega </Text>
            <Image source={IconSetaC} style={[styles.setaIcon, { marginHorizontal: 10 }]} />
            <Text style={styles.negrito}>Hoje, 35-45 min </Text>
            <Text style={styles.gratis}>• Grátis</Text>
          </Text>
          <Image source={IconSetaC} style={styles.setaIcon} />
        </TouchableOpacity>
      </View>

      {/* Destaques */}
      <Text style={styles.sectionTitle}>Destaques</Text>
      <View style={styles.grid}>
        {produtos.map((item) => (
          <View key={item.id} style={[styles.produto, { width: produtoWidth }]}>
            <Image source={item.img} style={styles.produtoImg} resizeMode="cover" />
            <Text style={styles.produtoPreco}>{item.preco}</Text>
            <Text style={styles.produtoNome}>{item.nome}</Text>
          </View>
        ))}
      </View>

      {/* cupom */}
      <TouchableOpacity style={styles.cupomBox}>
        <View style={styles.cupomContent}>
          <Image source={IconCupom} style={styles.cupomIcon} />
          <Text>
            <Text style={styles.cupomValor}>R$ 50 </Text>
            <Text style={styles.cupomTexto}>cupons aqui</Text>
          </Text>
        </View>
        <Image source={IconSetaC} style={styles.setaIcon} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  headerBackground: { width: "100%", height: 200 },
  fundoBolo: { width: "100%", height: "100%", resizeMode: "cover" },

  topIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    width: "100%",
    top: 15,
    paddingHorizontal: 15,
  },
  iconCircle: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  rightIcons: { flexDirection: "row", gap: 10 },
  iconImg: { width: 20, height: 20 },

  topBox: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginTop: -60,
    borderRadius: 15,
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },

  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -40,
    left: '50%',
    marginLeft: -40,
    zIndex: 2,
  },
  logoIcon: { width: "100%", height: "100%" },

  boxLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  linhaHorizontal: { flexDirection: 'row', alignItems: 'center' },
  lineText: { fontSize: 14, color: "#333" },
  setaIcon: { width: 15, height: 15 },

  divider: { height: 1, backgroundColor: "#eee" },

  tituloGrande: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitulo: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 2,
  },
  avaliacaoNegrito: {
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 2,
  },
  nivelNegrito: {
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 2,
  },
  avaliacaoCinza: {
    color: '#aaa',
    marginHorizontal: 2,
  },
  iconeAvaliacao: {
    width: 15,
    height: 15,
  },
  negrito: { fontWeight: 'bold', color: '#333' },
  gratis: { color: 'green', marginLeft: 4 },

  sectionTitle: { fontSize: 18, fontWeight: "bold", margin: 15 },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  produto: {
    marginBottom: 15,
    backgroundColor: "#fafafa",
    borderRadius: 10,
    padding: 5,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  produtoImg: { width: "100%", height: 80, borderRadius: 8, marginBottom: 4 },
  produtoPreco: { 
    fontWeight: "bold", 
    fontSize: 12, 
    marginBottom: 2, 
    textAlign: "left", 
    alignSelf: "flex-start" 
  },
  produtoNome: { 
    fontSize: 11, 
    textAlign: "left", 
    alignSelf: "flex-start",
    color: "#333" 
  },

  cupomBox: {
    marginTop: 15,
    marginHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",        
    borderWidth: 1,                 
    borderColor: "#00000033",       
    borderRadius: 12,
    padding: 12,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cupomContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cupomIcon: { width: 20, height: 20 },
  cupomValor: { color: "#6b2d88ff", fontWeight: "bold" },
  cupomTexto: { color: "#000", fontWeight: "bold" },
});
