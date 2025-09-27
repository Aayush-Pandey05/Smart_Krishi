import React from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardScreen() {
  const navigation = useNavigation();

  const features = [
    {
      title: 'Crop Disease Detection',
      description: 'Upload leaf images to identify diseases and get AI-powered treatment recommendations instantly.',
      icon: 'local-florist',
      screen: 'CropDisease',
    },
    {
      title: 'Soil Health Analyzer',
      description: 'Analyze soil conditions and get personalized recommendations for optimal crop growth.',
      icon: 'terrain',
      screen: 'SoilHealth',
    },
    {
      title: 'Smart Irrigation Advisor',
      description: 'Get precise irrigation timing and water amount recommendations based on soil moisture.',
      icon: 'water',
      screen: 'IrrigationAdvisor',
    },
    {
      title: 'Fertilizer & Pesticide Guide',
      description: 'Find the right fertilizers and pesticides for your crops with dosage recommendations.',
      icon: 'science',
      screen: 'FertilizerGuide',
    },
    {
      title: 'Cost & Profit Calculator',
      description: 'Calculate farming costs, expected profits, and break-even points for better planning.',
      icon: 'calculate',
      screen: 'CostProfit',
    },
    {
      title: 'Speech to Text',
      description: 'Use voice commands to input data or get farming advice hands-free.',
      icon: 'mic',
      screen: 'SpeechToText',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#000000" />
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Dashboard</Text>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.column}>
            {features.map((feature, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => navigation.navigate(feature.screen)}
                activeOpacity={0.9}
              >
                <View style={styles.cardContent}>
                  <MaterialIcons
                    name={feature.icon}
                    size={32}
                    color="#378d3d"
                    style={styles.icon}
                  />
                  <Text style={styles.title}>{feature.title}</Text>
                  <Text style={styles.description}>{feature.description}</Text>
                  <View style={styles.features}>
                    <Text style={styles.text}>Try Now</Text>
                    <MaterialIcons name="arrow-forward" size={20} color="#378d3d" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    color: '#378d3d',
    textAlign: 'center',
    marginBottom: 10,
  },
  content: {
    paddingBottom: 10,
  },
  column: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#2C2C2C',
    borderRadius: 12,
    width: (Dimensions.get('window').width - 60) / 2,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#378d3d',
    minHeight: 220,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  icon: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#E5E7EB',
    marginBottom: 12,
    flexGrow: 1,
  },
  features: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#378d3d',
    marginRight: 8,
  },
};