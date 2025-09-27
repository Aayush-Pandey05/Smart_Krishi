import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";

export default function SoilHealthScreen() {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const [ph, setPh] = useState("");
  const [moisture, setMoisture] = useState("");
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");
  const [analysisResult, setAnalysisResult] = useState(null);

  const analyze = async () => {
    if (!ph || !moisture || !nitrogen || !phosphorus || !potassium) {
      setSnackbarMessage("Please fill in all fields for analysis.");
      setSnackbarType("error");
      setSnackbarVisible(true);
      return;
    }
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      let message = "Analysis complete: ";
      const phNum = parseFloat(ph);
      message +=
        phNum < 6.0
          ? "Acidic soil detected. Add lime to neutralize."
          : phNum > 7.5
          ? "Alkaline soil detected. Consider sulfur to adjust."
          : "Balanced soil. Optimal for most crops.";
      if (moisture && parseFloat(moisture) > 70) {
        message += " High moisture detected. Improve drainage.";
      }
      setAnalysisResult({
        ph: phNum,
        moisture: parseFloat(moisture),
        nitrogen,
        phosphorus,
        potassium,
        message,
      });
      setSnackbarMessage("Analysis completed successfully!");
      setSnackbarType("success");
      setSnackbarVisible(true);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light" backgroundColor="#000000" />
      <View style={styles.navbar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.header}>Soil Health Analyzer</Text>
        <View style={styles.back} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={50}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.section}>
            <Text style={styles.title}>Manual Soil Data</Text>
            <Text style={styles.subTitle}>
              Enter your soil test results manually.
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>pH Level *</Text>
              <TextInput
                style={styles.input}
                value={ph}
                onChangeText={setPh}
                keyboardType="numeric"
                placeholder="e.g., 6.5"
                placeholderTextColor="#A9C4B0"
              />
              <Text style={styles.inputLabel}>Moisture % *</Text>
              <TextInput
                style={styles.input}
                value={moisture}
                onChangeText={setMoisture}
                keyboardType="numeric"
                placeholder="e.g., 60"
                placeholderTextColor="#A9C4B0"
              />
              <Text style={styles.inputLabel}>Nitrogen Level *</Text>
              <TextInput
                style={styles.input}
                value={nitrogen}
                onChangeText={setNitrogen}
                placeholder="e.g., Medium"
                placeholderTextColor="#A9C4B0"
              />
              <Text style={styles.inputLabel}>Phosphorus Level *</Text>
              <TextInput
                style={styles.input}
                value={phosphorus}
                onChangeText={setPhosphorus}
                placeholder="e.g., High"
                placeholderTextColor="#A9C4B0"
              />
              <Text style={styles.inputLabel}>Potassium Level *</Text>
              <TextInput
                style={styles.input}
                value={potassium}
                onChangeText={setPotassium}
                placeholder="e.g., Low"
                placeholderTextColor="#A9C4B0"
              />
            </View>
            <TouchableOpacity
              style={[styles.analyze, isAnalyzing && styles.disable]}
              onPress={analyze}
              disabled={isAnalyzing}
            >
              <Text style={styles.analyzeText}>
                {isAnalyzing ? "Analyzing..." : "Analyze Data"}
              </Text>
            </TouchableOpacity>
          </View>

          {analysisResult && (
            <View style={styles.section}>
              <Text style={styles.title}>Analysis Results</Text>
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>
                  pH Level:{" "}
                  <Text style={styles.resultValue}>{analysisResult.ph}</Text>
                </Text>
                <Text style={styles.resultLabel}>
                  Moisture:{" "}
                  <Text style={styles.resultValue}>
                    {analysisResult.moisture}%
                  </Text>
                </Text>
                <Text style={styles.resultLabel}>
                  Nitrogen:{" "}
                  <Text style={styles.resultValue}>
                    {analysisResult.nitrogen}
                  </Text>
                </Text>
                <Text style={styles.resultLabel}>
                  Phosphorus:{" "}
                  <Text style={styles.resultValue}>
                    {analysisResult.phosphorus}
                  </Text>
                </Text>
                <Text style={styles.resultLabel}>
                  Potassium:{" "}
                  <Text style={styles.resultValue}>
                    {analysisResult.potassium}
                  </Text>
                </Text>
                <Text style={styles.resultLabel}>Recommendations:</Text>
                <Text style={styles.resultMessage}>
                  {analysisResult.message}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

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
};
