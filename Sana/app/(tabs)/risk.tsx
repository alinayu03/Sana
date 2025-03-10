import React, { useState } from 'react';
import { StyleSheet, TextInput, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Pressable } from 'react-native';

// Example disclaimers/notes:
// - This tool is for educational purposes only. 
// - Results are not a substitute for professional medical advice.

export default function RiskScreen() {
  // State variables to track user input
  const [age, setAge] = useState('');
  const [familyHistory, setFamilyHistory] = useState('');
  const [result, setResult] = useState<string | null>(null);

  // Simple example: If age > 50 or there is a positive family history, 
  // we show a "moderate" or "high" risk indication. This is not a real risk algorithm!
  const handleCalculateRisk = () => {
    const numericAge = parseInt(age, 10);
    const hasFamilyHistory = familyHistory.toLowerCase() === 'yes';

    let assessment = 'Low risk';

    if (numericAge > 50 && hasFamilyHistory) {
      assessment = 'High risk';
    } else if (numericAge > 50 || hasFamilyHistory) {
      assessment = 'Moderate risk';
    }

    setResult(assessment);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={260}
          color="#808080"
          name="cross.case.fill"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Breast Cancer Risk Assessment</ThemedText>
      </ThemedView>

      <ThemedText>
        This tool is a simple educational example. It is not a substitute for professional medical
        advice, diagnosis, or treatment.
      </ThemedText>

      <Collapsible title="Enter Your Information">
        <ThemedText>Enter your age:</ThemedText>
        <TextInput
          style={styles.textInput}
          placeholder="e.g., 45"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
        <ThemedText>Family history of breast cancer? (Yes/No)</ThemedText>
        <TextInput
          style={styles.textInput}
          placeholder="e.g., Yes"
          value={familyHistory}
          onChangeText={setFamilyHistory}
        />

        <Pressable style={styles.button} onPress={handleCalculateRisk}>
            <ThemedText style={styles.buttonText}>Calculate Risk</ThemedText>
        </Pressable>
      </Collapsible>

      <Collapsible title="Your Assessment">
        {result ? (
          <ThemedText type="subtitle" style={styles.resultText}>
            Your estimated risk is: {result}
          </ThemedText>
        ) : (
          <ThemedText>Please fill out the information and tap "Calculate Risk".</ThemedText>
        )}
      </Collapsible>

      <Collapsible title="Learn More">
        <ThemedText>
          While this simplified example demonstrates collecting data and producing a result, you
          should always seek official guidance for real health risk assessments.
        </ThemedText>
        <ExternalLink href="https://www.cancer.gov/basics">
          <ThemedText type="link">Cancer.gov: Cancer Information</ThemedText>
        </ExternalLink>
        {Platform.select({
          ios: (
            <ThemedText>
              This Parallax ScrollView uses{' '}
              <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText> for animation 
              on iOS.
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    bottom: -50,
    left: -20,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  textInput: {
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginVertical: 8,
  },
  button: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    borderColor: '#808080',
    borderWidth: 1,
  },
  buttonText: {
    fontWeight: '600',
  },
  resultText: {
    marginTop: 8,
  },
});
