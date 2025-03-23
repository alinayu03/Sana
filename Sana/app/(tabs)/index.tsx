import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFC0CB', dark: '#FF69B4' }}
      // Temporarily remove the headerImage until you have a logo
      // headerImage={
      //   <Image
      //     source={require('@/assets/images/sana-logo.png')}
      //     style={styles.logo}
      //   />
      // }
      >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titleText}>Welcome to Sana</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={[styles.stepContainer, styles.cardContainer]}>
        <ThemedText type="subtitle" style={styles.subtitleText}>Risk Assessment</ThemedText>
        <ThemedText style={styles.contentText}>
          Use our breast cancer risk assessment tool to understand your personal risk factors and receive personalized recommendations.
        </ThemedText>
      </ThemedView>
      <ThemedView style={[styles.stepContainer, styles.cardContainer]}>
        <ThemedText type="subtitle" style={styles.subtitleText}>Education Hub</ThemedText>
        <ThemedText style={styles.contentText}>
          Visit our Education tab to learn more about breast health, early detection, and prevention strategies.
        </ThemedText>
      </ThemedView>
      <ThemedView style={[styles.stepContainer, styles.cardContainer]}>
        <ThemedText type="subtitle" style={styles.subtitleText}>Your Health Journey</ThemedText>
        <ThemedText style={styles.contentText}>
          Sana is here to support you on your health journey. Navigate through the tabs below to access our tools and resources.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  stepContainer: {
    gap: 12,
    marginBottom: 16,
  },
  cardContainer: {
    backgroundColor: 'rgba(255, 192, 203, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 105, 180, 0.2)',
  },
  logo: {
    height: 200,
    width: 200,
    bottom: 20,
    alignSelf: 'center',
    position: 'absolute',
    resizeMode: 'contain',
  },
  titleText: {
    color: '#FF1493',
    fontSize: 28,
  },
  subtitleText: {
    color: '#FF69B4',
    fontSize: 20,
  },
  contentText: {
    lineHeight: 24,
  },
});
