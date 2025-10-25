import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import notifee from '@notifee/react-native';
import { Text, View } from '@/components/Themed';

// IMPORTANTE: No Expo Go, essa biblioteca não funciona.
// Ela depende de módulos nativos que não estão incluídos no Expo Go.

export default function NotifeeDemo() {
  // Função para enviar notificação
  const enviarNotificacao = async () => {
    try {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Canal Padrão',
      });

      // Exibe a notificação
      await notifee.displayNotification({
        title: 'Olá! ',
        body: 'Esta é uma notificação de demonstração com Notifee.',
        android: {
          channelId,
          smallIcon: 'ic_launcher', 
        },
      });
    } catch (erro) {
      console.error('Erro ao enviar notificação:', erro);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Demonstração Notifee </Text>

      <TouchableOpacity style={styles.button} onPress={enviarNotificacao}>
        <Text style={styles.buttonText}>Enviar Notificação</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#FFF0F5', 
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#C2185B', 
    marginBottom: 25,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#F48FB1',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
