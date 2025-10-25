import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { Text, View } from '@/components/Themed';

// No Expo Go, o Notifee não funciona.
// Isso acontece porque o Expo Go não inclui os módulos nativos que o Notifee precisa para operar.

export default function PushNotificationDemo() {
  const enviarNotificacao = () => {
    PushNotification.localNotification({
      title: 'Olá! ',
      message: 'Notificação simples com React Native Push Notification',
      playSound: true,
      soundName: 'default',
      color: 'pink',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Demonstração Push Notification</Text>
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
    backgroundColor: '#FFF0F5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#C2185B',
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#F48FB1',
    padding: 14,
    borderRadius: 14,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

