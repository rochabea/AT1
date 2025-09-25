import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";

// Imagens placeholders
const FotoPerfil = require("../../assets/images/perfilbola.png"); 
const IconTelefone = require("../../assets/images/telefone.png"); 
const IconEntrega = require("../../assets/images/entrega.png"); 
const IconConversas = require("../../assets/images/comente.png");
const IconNotificacoes = require("../../assets/images/notificacao.png");
const IconDados = require("../../assets/images/dados.png");
const IconPagamentos = require("../../assets/images/credito.png");
const IconClube = require("../../assets/images/diamanteP.png");
const IconCupons = require("../../assets/images/cupons.png");
const IconComunidade = require("../../assets/images/grupo.png");
const IconCodigo = require("../../assets/images/codigo-qr.png");
const IconSeta = require("../../assets/images/seta-direitaC.png"); 

export default function Tela03Screen() {
  return (
    <ScrollView style={styles.container}>
      
      {/* QR Code superior */}
      <View style={styles.qrContainer}>
        <Image source={IconCodigo} style={styles.iconCodigo} />
      </View>

      {/* Header perfil */}
      <View style={styles.headerPerfil}>
        <Image source={FotoPerfil} style={styles.fotoPerfil} />
        <View style={styles.nomeTelefone}>
          <Text style={styles.nome}>Ana Beatriz</Text>
          <View style={styles.telefoneContainer}>
            <Image source={IconTelefone} style={styles.iconTelefone} />
            <Text style={styles.addTel}> Adicionar telefone de acesso</Text>
          </View>
        </View>
      </View>

      {/* Box Entrega mais segura */}
      <TouchableOpacity style={styles.boxEntrega}>
        <View style={styles.boxLeft}>
          <Image source={IconEntrega} style={styles.boxIcon} />
          <View>
            <Text style={styles.boxText}>Entrega mais segura</Text>
            <Text style={styles.itemSubText}>Agora dá pra alterar o código de</Text>
            <Text style={styles.itemSubText}>entrega. Vem ver!</Text> 
          </View>
        </View>
        <View style={styles.boxRight}>
          <View style={styles.avisoNovo}>
            <Text style={styles.badgeNovoText}>NOVO!</Text>
          </View>
          <Image source={IconSeta} style={[styles.seta, { tintColor: "#cc1946ff" }]} />
        </View>
      </TouchableOpacity>

      {/* Conversas */}
      <TouchableOpacity style={styles.item}>
        <View style={styles.itemLeft}>
          <Image source={IconConversas} style={styles.itemIcon} />
          <View>
            <Text style={styles.itemText}>Conversas</Text>
            <Text style={styles.itemSubText}>Meu histórico de conversas</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.aviso}>
            <Text style={styles.avisoText}>2</Text>
          </View>
          <Image source={IconSeta} style={styles.seta} />
        </View>
      </TouchableOpacity>

      {/* Notificações */}
      <TouchableOpacity style={styles.item}>
        <View style={styles.itemLeft}>
          <Image source={IconNotificacoes} style={styles.itemIcon} />
          <View>
            <Text style={styles.itemText}>Notificações</Text>
            <Text style={styles.itemSubText}>Minha central de notificações</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.aviso}>
            <Text style={styles.avisoText}>3</Text>
          </View>
          <Image source={IconSeta} style={styles.seta} />
        </View>
      </TouchableOpacity>

      {/* Dados da conta */}
      <TouchableOpacity style={styles.item}>
        <View style={styles.itemLeft}>
          <Image source={IconDados} style={styles.itemIcon} />
          <View>
            <Text style={styles.itemText}>Dados da conta</Text>
            <Text style={styles.itemSubText}>Minhas informações da conta</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.avisoA}>
            <Text style={styles.avisoTextA}>!</Text>
          </View>
          <Image source={IconSeta} style={styles.seta} />
        </View>
      </TouchableOpacity>

      {/* Pagamentos */}
      <TouchableOpacity style={styles.item}>
        <View style={styles.itemLeft}>
          <Image source={IconPagamentos} style={styles.itemIcon} />
          <View>
            <Text style={styles.itemText}>Pagamentos</Text>
            <Text style={styles.itemSubText}>Meus saldos e cartões</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.avisoNovo}>
            <Text style={styles.badgeNovoText}>NOVO!</Text>
          </View>
          <Image source={IconSeta} style={styles.seta} />
        </View>
      </TouchableOpacity>

      {/* Clube iFood */}
      <TouchableOpacity style={styles.item}>
        <View style={styles.itemLeft}>
          <Image source={IconClube} style={styles.itemIcon} />
          <View>
            <Text style={styles.itemText}>Clube Ifood</Text>
            <Text style={styles.itemSubText}>Meus benefícios exclusivos</Text>
          </View>
        </View>
        <Image source={IconSeta} style={styles.seta} />
      </TouchableOpacity>

      {/* Cupons */}
      <TouchableOpacity style={styles.item}>
        <View style={styles.itemLeft}>
          <Image source={IconCupons} style={styles.itemIcon} />
          <View>
            <Text style={styles.itemText}>Cupons</Text>
            <Text style={styles.itemSubText}>Meus cupons de desconto</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.avisoNovo}>
            <Text style={styles.badgeNovoText}>NOVO!</Text>
          </View>
          <Image source={IconSeta} style={styles.seta} />
        </View>
      </TouchableOpacity>

      {/* Comunidade */}
      <TouchableOpacity style={styles.item}>
        <View style={styles.itemLeft}>
          <Image source={IconComunidade} style={styles.itemIcon} />
          <View>
            <Text style={styles.itemText}>Comunidade iFood</Text>
            <Text style={styles.itemSubText}>Juste-se à nós</Text>
          </View>
        </View>
        <Image source={IconSeta} style={styles.seta} />
      </TouchableOpacity>

      {/* Código de entrega */}
      <TouchableOpacity style={styles.item}>
        <View style={styles.itemLeft}>
          <Image source={IconCodigo} style={styles.itemIcon} />
          <View>
            <Text style={styles.itemText}>Código de entrega</Text>
            <Text style={styles.itemSubText}>Mostre o código para o entregador</Text>
          </View>
        </View>
        <Image source={IconSeta} style={styles.seta} />
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  qrContainer: {
    alignItems: "flex-end",
    padding: 15,
  },
  iconCodigo: { width: 30, height: 30, tintColor: "#cc1946ff" },

  headerPerfil: { 
    flexDirection: "row", 
    alignItems: "center", 
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  fotoPerfil: { width: 60, height: 60, borderRadius: 30 },
  nomeTelefone: { marginLeft: 10 },
  nome: { fontSize: 20, fontWeight: "bold" },
  telefoneContainer: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  iconTelefone: { width: 18, height: 18, marginRight: 5, tintColor: "#cc1946ff" },
  addTel: { fontWeight: "bold", color: "#cc1946ff" },

  boxEntrega: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    margin: 15,
    borderRadius: 10,
    backgroundColor: "#ecececd7",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    position: "relative",
  },
  boxLeft: { flexDirection: "row", alignItems: "center" },
  boxIcon: { width: 70, height: 70, marginRight: 10 },
  boxText: { fontSize: 16, fontWeight: "bold" },
  boxRight: { flexDirection: "row", alignItems: "center", position: "relative" },
  seta: { width: 15, height: 15 },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
    position: "relative",
  },
  itemLeft: { flexDirection: "row", alignItems: "center" },
  itemIcon: { width: 25, height: 25, marginRight: 10 },
  itemText: { fontSize: 16 },
  itemSubText: { fontSize: 12, color: "#9e9e9eff" },

  rightContainer: { flexDirection: "row", alignItems: "center", position: "relative" },

  aviso: {
    marginRight: 5,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#cc1946ff",
    justifyContent: "center",
    alignItems: "center",
  },
  avisoText: { color: "#fff", fontSize: 10, fontWeight: "bold" },

    avisoA: {
    marginRight: 5,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#ffae00ff",
    justifyContent: "center",
    alignItems: "center",
  },
  avisoTextA: { color: "#000000ff", fontSize: 10, fontWeight: "bold" },
  
  avisoNovo: {
    marginRight: 5,
    paddingHorizontal: 6,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#cc1946ff",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeNovoText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
});
