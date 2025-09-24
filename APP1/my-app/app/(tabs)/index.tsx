import { StyleSheet, Image, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('@/assets/images/smile.jpg')}
        style={styles.cover}
      />

      <Text style={styles.title}>SMILE</Text>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <Text style={styles.text}>
        Sorria! A vida é bela e há tanto para sorrir. Mesmo nos momentos
        difíceis, um sorriso pode iluminar o caminho e trazer esperança.
        Compartilhe seu sorriso com o mundo e veja como ele pode fazer a
        diferença na vida das pessoas ao seu redor. Lembre-se, um sorriso é
        contagiante e pode transformar o dia de alguém. Então, sorria sempre
        que puder!
      </Text>
      <Text style={styles.text}>
        Sorria! A vida é bela e há tanto para sorrir. Mesmo nos momentos
        difíceis, um sorriso pode iluminar o caminho e trazer esperança.
        Compartilhe seu sorriso com o mundo e veja como ele pode fazer a
        diferença na vida das pessoas ao seu redor. Lembre-se, um sorriso é
        contagiante e pode transformar o dia de alguém. Então, sorria sempre
        que puder!
      </Text>
      <Text style={styles.text}>
        Sorria! A vida é bela e há tanto para sorrir. Mesmo nos momentos
        difíceis, um sorriso pode iluminar o caminho e trazer esperança.
        Compartilhe seu sorriso com o mundo e veja como ele pode fazer a
        diferença na vida das pessoas ao seu redor. Lembre-se, um sorriso é
        contagiante e pode transformar o dia de alguém. Então, sorria sempre
        que puder!
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f9f9f9',
  },
  cover: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: { 
    marginVertical: 30,
    height: 1,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#a84040ff',
  },
  text: {
    margin: 20,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
});
