import React, { useState } from 'react';
import { StyleSheet, TextInput, Platform, ScrollView } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Pressable } from 'react-native';

// Risk factors for the Gail Model
interface RiskFactors {
  age: string;
  ageAtFirstPeriod: string;
  ageAtFirstBirth: string;
  numberOfFirstDegreeRelatives: string;
  numberOfBiopsies: string;
  hasAtypicalHyperplasia: boolean;
  race: 'white' | 'black' | 'hispanic' | 'asian' | 'other';
}

// Example disclaimers/notes:
// - This tool is for educational purposes only. 
// - Results are not a substitute for professional medical advice.

export default function RiskScreen() {
  const [riskFactors, setRiskFactors] = useState<RiskFactors>({
    age: '',
    ageAtFirstPeriod: '',
    ageAtFirstBirth: '',
    numberOfFirstDegreeRelatives: '',
    numberOfBiopsies: '',
    hasAtypicalHyperplasia: false,
    race: 'white'
  });
  const [result, setResult] = useState<{
    fiveYearRisk: number;
    lifetimeRisk: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Simplified version of the Gail Model calculation
  // Note: This is a simplified version and should not be used for actual medical assessment
  const calculateGailRisk = (factors: RiskFactors) => {
    const age = parseInt(factors.age);
    if (age < 35 || age > 85) {
      throw new Error('Age must be between 35 and 85 years');
    }

    // Base risk calculation (simplified)
    let baseRisk = 0.01; // 1% base risk
    const ageFactor = (age - 35) * 0.001; // 0.1% increase per year
    const familyHistoryFactor = parseInt(factors.numberOfFirstDegreeRelatives) * 0.02; // 2% per relative
    const biopsyFactor = parseInt(factors.numberOfBiopsies) * 0.01; // 1% per biopsy
    const atypicalHyperplasiaFactor = factors.hasAtypicalHyperplasia ? 0.04 : 0; // 4% if present

    const fiveYearRisk = Math.min(baseRisk + ageFactor + familyHistoryFactor + biopsyFactor + atypicalHyperplasiaFactor, 0.15);
    const lifetimeRisk = Math.min(fiveYearRisk * 8, 0.85); // Simplified lifetime risk calculation

    return {
      fiveYearRisk: fiveYearRisk * 100, // Convert to percentage
      lifetimeRisk: lifetimeRisk * 100
    };
  };

  const handleCalculateRisk = () => {
    try {
      setError(null);
      const risk = calculateGailRisk(riskFactors);
      setResult(risk);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while calculating risk');
    }
  };

  const updateRiskFactor = (field: keyof RiskFactors, value: string | boolean) => {
    setRiskFactors(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFC0CB', dark: '#FF69B4' }}
      headerImage={
        <IconSymbol
          size={260}
          color="#FF69B4"
          name="cross.case.fill"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">NCI Breast Cancer Risk Assessment Tool</ThemedText>
      </ThemedView>

      <ThemedText>
        This tool is based on the NCI's Breast Cancer Risk Assessment Tool (Gail Model). It is for educational purposes only and is not a substitute for professional medical advice.
      </ThemedText>

      <Collapsible title="Enter Your Information">
        <ScrollView>
          <ThemedText>Age (35-85 years):</ThemedText>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., 45"
            keyboardType="numeric"
            value={riskFactors.age}
            onChangeText={(value) => updateRiskFactor('age', value)}
          />

          <ThemedText>Age at first period:</ThemedText>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., 13"
            keyboardType="numeric"
            value={riskFactors.ageAtFirstPeriod}
            onChangeText={(value) => updateRiskFactor('ageAtFirstPeriod', value)}
          />

          <ThemedText>Age at first birth (if applicable):</ThemedText>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., 25"
            keyboardType="numeric"
            value={riskFactors.ageAtFirstBirth}
            onChangeText={(value) => updateRiskFactor('ageAtFirstBirth', value)}
          />

          <ThemedText>Number of first-degree relatives with breast cancer:</ThemedText>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., 1"
            keyboardType="numeric"
            value={riskFactors.numberOfFirstDegreeRelatives}
            onChangeText={(value) => updateRiskFactor('numberOfFirstDegreeRelatives', value)}
          />

          <ThemedText>Number of breast biopsies:</ThemedText>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., 1"
            keyboardType="numeric"
            value={riskFactors.numberOfBiopsies}
            onChangeText={(value) => updateRiskFactor('numberOfBiopsies', value)}
          />

          <ThemedText>Race/Ethnicity:</ThemedText>
          <ScrollView horizontal style={styles.raceContainer}>
            {['white', 'black', 'hispanic', 'asian', 'other'].map((race) => (
              <Pressable
                key={race}
                style={[
                  styles.raceButton,
                  riskFactors.race === race && styles.raceButtonSelected
                ]}
                onPress={() => updateRiskFactor('race', race)}
              >
                <ThemedText style={riskFactors.race === race ? styles.raceButtonTextSelected : styles.raceButtonText}>
                  {race.charAt(0).toUpperCase() + race.slice(1)}
                </ThemedText>
              </Pressable>
            ))}
          </ScrollView>

          <Pressable
            style={[
              styles.checkbox,
              riskFactors.hasAtypicalHyperplasia && styles.checkboxSelected
            ]}
            onPress={() => updateRiskFactor('hasAtypicalHyperplasia', !riskFactors.hasAtypicalHyperplasia)}
          >
            <ThemedText>Has atypical hyperplasia</ThemedText>
          </Pressable>

          <Pressable style={styles.button} onPress={handleCalculateRisk}>
            <ThemedText style={styles.buttonText}>Calculate Risk</ThemedText>
          </Pressable>
        </ScrollView>
      </Collapsible>

      <Collapsible title="Your Assessment">
        {error ? (
          <ThemedText style={styles.errorText}>{error}</ThemedText>
        ) : result ? (
          <ThemedView>
            <ThemedText type="subtitle" style={styles.resultText}>
              Your 5-year risk: {result.fiveYearRisk.toFixed(1)}%
            </ThemedText>
            <ThemedText type="subtitle" style={styles.resultText}>
              Your lifetime risk: {result.lifetimeRisk.toFixed(1)}%
            </ThemedText>
          </ThemedView>
        ) : (
          <ThemedText>Please fill out the information and tap "Calculate Risk".</ThemedText>
        )}
      </Collapsible>

      <Collapsible title="Learn More">
        <ThemedText>
          This tool is based on the Gail Model, which is used by the National Cancer Institute to estimate breast cancer risk. The actual risk calculation is more complex and takes into account additional factors.
        </ThemedText>
        <ExternalLink href="https://bcrisktool.cancer.gov/">
          <ThemedText type="link">NCI Breast Cancer Risk Assessment Tool</ThemedText>
        </ExternalLink>
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
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  titleText: {
    color: '#FF1493',
    fontSize: 28,
  },
  cardContainer: {
    backgroundColor: 'rgba(255, 192, 203, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 105, 180, 0.2)',
    marginBottom: 16,
  },
  textInput: {
    borderColor: '#FF69B4',
    borderWidth: 1,
    borderRadius: 12,
    padding: 8,
    marginVertical: 8,
    backgroundColor: 'rgba(255, 192, 203, 0.1)',
  },
  button: {
    alignSelf: 'flex-start',
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#FF69B4',
  },
  buttonText: {
    fontWeight: '600',
    color: '#FFFFFF',
  },
  resultText: {
    marginTop: 8,
    color: '#FF69B4',
    fontSize: 20,
  },
  errorText: {
    color: '#FF1493',
    marginTop: 8,
  },
  raceContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  raceButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderColor: '#FF69B4',
    borderWidth: 1,
    marginRight: 8,
  },
  raceButtonSelected: {
    backgroundColor: '#FF69B4',
  },
  raceButtonText: {
    color: '#FF69B4',
  },
  raceButtonTextSelected: {
    color: '#FFFFFF',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    padding: 8,
    borderRadius: 12,
    borderColor: '#FF69B4',
    borderWidth: 1,
  },
  checkboxSelected: {
    backgroundColor: '#FF69B4',
  },
});
