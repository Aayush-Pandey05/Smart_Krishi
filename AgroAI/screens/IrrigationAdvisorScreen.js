import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";

export default function IrrigationAdvisorScreen() {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const [soilMoisture, setSoilMoisture] = useState("");
  const [location, setLocation] = useState("");
  const [cropType, setCropType] = useState("");
  const [plantingDate, setPlantingDate] = useState("");
  const [lastIrrigation, setLastIrrigation] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");
  const [analysisResult, setAnalysisResult] = useState(null);

  const analyzeIrrigation = async () => {
    if (!soilMoisture || !location || !cropType || !plantingDate || !lastIrrigation) {
      setSnackbarMessage("Please fill in all fields to get irrigation advice.");
      setSnackbarType("error");
      setSnackbarVisible(true);
      return;
    }

    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!dateRegex.test(plantingDate) || !dateRegex.test(lastIrrigation)) {
      setSnackbarMessage("Please enter dates in dd-mm-yyyy format.");
      setSnackbarType("error");
      setSnackbarVisible(true);
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      const moistureLevel = parseFloat(soilMoisture);
      let recommendation = "";
      if (moistureLevel < 30) {
        recommendation = "Immediate irrigation needed. Apply 20-30 mm of water.";
      } else if (moistureLevel >= 30 && moistureLevel <= 50) {
        recommendation = "Irrigation recommended. Apply 10-20 mm of water.";
      } else if (moistureLevel > 50 && moistureLevel <= 70) {
        recommendation = "Monitor closely. Irrigation may be needed soon.";
      } else {
        recommendation = "No irrigation needed at this time.";
      }

      const weatherAdjustment = location.toLowerCase().includes("dry") || location.toLowerCase().includes("arid")
        ? "Increase water by 10% due to dry climate."
        : "Standard irrigation suitable for current location.";

      const cropAdjustment = cropType.toLowerCase().includes("corn") || cropType.toLowerCase().includes("maize")
        ? "Crop requires consistent moisture; ensure regular checks."
        : "Adjust irrigation based on crop growth stage.";

      setAnalysisResult({
        soilMoisture,
        location,
        cropType,
        plantingDate,
        lastIrrigation,
        recommendation: `${recommendation} ${weatherAdjustment} ${cropAdjustment}`,
      });
      setSnackbarMessage("Irrigation advice generated successfully!");
      setSnackbarType("success");
      setSnackbarVisible(true);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light" backgroundColor="#000000" />
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.header}>Smart Irrigation Advisor</Text>
        <View style={styles.back} />
      </View>

      <View style={styles.innerContainer}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.title}>Irrigation Assessment</Text>
            <Text style={styles.subTitle}>
              Enter your current conditions to get personalized irrigation advice.
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Soil Moisture % *</Text>
              <TextInput
                style={styles.input}
                value={soilMoisture}
                onChangeText={setSoilMoisture}
                keyboardType="numeric"
                placeholder="e.g., 45"
                placeholderTextColor="#A9C4B0"
              />
              <Text style={styles.inputLabel}>Location *</Text>
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="e.g., City, State"
                placeholderTextColor="#A9C4B0"
              />
              <Text style={styles.inputLabel}>Crop Type *</Text>
              <TextInput
                style={styles.input}
                value={cropType}
                onChangeText={setCropType}
                placeholder="e.g., Corn"
                placeholderTextColor="#A9C4B0"
              />
              <Text style={styles.inputLabel}>Planting Date *</Text>
              <TextInput
                style={styles.input}
                value={plantingDate}
                onChangeText={setPlantingDate}
                placeholder="dd-mm-yyyy"
                placeholderTextColor="#A9C4B0"
              />
              <Text style={styles.inputLabel}>Last Irrigation *</Text>
              <TextInput
                style={styles.input}
                value={lastIrrigation}
                onChangeText={setLastIrrigation}
                placeholder="dd-mm-yyyy"
                placeholderTextColor="#A9C4B0"
              />
            </View>
            <TouchableOpacity
              style={[styles.analyze, isAnalyzing && styles.disable]}
              onPress={analyzeIrrigation}
              disabled={isAnalyzing}
            >
              <Text style={styles.analyzeText}>
                {isAnalyzing ? "Analyzing..." : "Get Irrigation Advice"}
              </Text>
            </TouchableOpacity>
          </View>

          {analysisResult && (
            <View style={styles.section}>
              <Text style={styles.title}>Irrigation Recommendations</Text>
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>
                  Soil Moisture: <Text style={styles.resultValue}>{analysisResult.soilMoisture}%</Text>
                </Text>
                <Text style={styles.resultLabel}>
                  Location: <Text style={styles.resultValue}>{analysisResult.location}</Text>
                </Text>
                <Text style={styles.resultLabel}>
                  Crop Type: <Text style={styles.resultValue}>{analysisResult.cropType}</Text>
                </Text>
                <Text style={styles.resultLabel}>
                  Planting Date: <Text style={styles.resultValue}>{analysisResult.plantingDate}</Text>
                </Text>
                <Text style={styles.resultLabel}>
                  Last Irrigation: <Text style={styles.resultValue}>{analysisResult.lastIrrigation}</Text>
                </Text>
                <Text style={styles.resultLabel}>Recommendation:</Text>
                <Text style={styles.resultMessage}>{analysisResult.recommendation}</Text>
              </View>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.title}>General Guidelines</Text>
            <View style={styles.guidelinesContainer}>
              {[
                "Below 30%: Immediate irrigation needed",
                "30-50%: Irrigation recommended",
                "50-70%: Monitor closely",
                "Above 70%: No irrigation needed",
              ].map((guideline, index) => (
                <View key={index} style={styles.guidelineRow}>
                  <MaterialIcons name="check-circle" size={18} color="#6EE7B7" />
                  <Text style={styles.guidelineText}>{guideline}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>

      <Snackbar
        key={snackbarMessage}
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        style={{
          backgroundColor: snackbarType === "success" ? "#4CAF50" : "#F44336",
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#2C2C2C",
    borderBottomWidth: 1,
    borderBottomColor: "#378d3d",
  },
  back: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  header: {
    fontSize: 18,
    fontWeight: "700",
    color: "#378d3d",
    flex: 1,
    textAlign: "center",
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  content: {
    paddingVertical: 16,
  },
  section: {
    backgroundColor: "#2C2C2C",
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#1F4A2E",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#D4EDDA",
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 14,
    color: "#A9C4B0",
    marginBottom: 10,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    color: "#D4EDDA",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#1F4A2E",
    borderRadius: 8,
    padding: 12,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#378d3d",
    marginBottom: 12,
  },
  analyze: {
    backgroundColor: "#378d3d",
    borderRadius: 8,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  disable: {
    backgroundColor: "#2a6b2d",
    opacity: 0.7,
  },
  analyzeText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  resultContainer: {
    marginTop: 10,
  },
  resultLabel: {
    fontSize: 14,
    color: "#D4EDDA",
    marginBottom: 8,
  },
  resultValue: {
    fontWeight: "600",
    color: "#6EE7B7",
  },
  resultMessage: {
    fontSize: 14,
    color: "#A9C4B0",
    lineHeight: 20,
    marginTop: 4,
  },
  guidelinesContainer: {
    marginBottom: 10,
  },
  guidelineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  guidelineText: {
    fontSize: 14,
    color: "#D4EDDA",
    marginLeft: 8,
    flex: 1,
  },
};