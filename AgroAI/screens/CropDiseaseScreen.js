import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Snackbar } from "react-native-paper";

export default function CropDiseaseScreen() {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const analyzeImage = async () => {
    if (!selectedImage) {
      Alert.alert("No Image", "Please upload an image to analyze.");
      return;
    }
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setSnackbarMessage(
        "Analysis complete: Possible powdery mildew detected. Apply sulfur-based fungicide."
      );
      setSnackbarType("success");
      setSnackbarVisible(true);
    }, 2000);
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "Camera roll access is required to upload images."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setSnackbarMessage("Image uploaded successfully!");
      setSnackbarType("success");
      setSnackbarVisible(true);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "Camera access is required to take photos."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setSnackbarMessage("Photo taken successfully!");
      setSnackbarType("success");
      setSnackbarVisible(true);
    }
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
        <Text style={styles.header}>Crop Disease Detection</Text>
        <View style={styles.back} />
      </View>

      <View style={styles.innerContainer}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.title}>Upload Leaf Image</Text>
            <Text style={styles.subTitle}>
              Take a clear photo of the affected leaf for best results.
            </Text>
            <View style={styles.imageContainer}>
              {selectedImage ? (
                <Image
                  source={{ uri: selectedImage }}
                  style={{
                    width: windowWidth - 64, 
                    height: windowWidth - 64,
                    borderRadius: 8,
                  }}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.placeholder}>
                  <MaterialIcons name="image" size={50} color="#A9C4B0" />
                </View>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={pickImage}>
                <MaterialIcons name="upload" size={20} color="#FFFFFF" />
                <Text style={styles.buttonText}>Choose File</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={takePhoto}>
                <MaterialIcons name="camera-alt" size={20} color="#FFFFFF" />
                <Text style={styles.buttonText}>Take Photo</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[
                styles.analyze,
                isAnalyzing && styles.disable,
              ]}
              onPress={analyzeImage}
              disabled={isAnalyzing}
            >
              <Text style={styles.analyzeText}>
                {isAnalyzing ? "Analyzing..." : "Analyze Image"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.title}>Photography Tips</Text>
            <View style={styles.tipsContainer}>
              {[
                "Take photos in good natural lighting",
                "Focus on a single leaf with clear symptoms",
                "Ensure the leaf fills most of the frame",
                "Avoid blurry or overexposed images",
                "Include both healthy and affected areas",
              ].map((tip, index) => (
                <View key={index} style={styles.tipRow}>
                  <MaterialIcons
                    name="check-circle"
                    size={18}
                    color="#6EE7B7"
                  />
                  <Text style={styles.tipText}>{tip}</Text>
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
    backgroundColor: '#1A1A1A',
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
    borderColor: "#378d3d",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 14,
    color: "#E5E7EB",
    marginBottom: 10,
    lineHeight: 20,
  },
  imageContainer: {
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#378d3d",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#378d3d",
    borderRadius: 8,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    marginLeft: 8,
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
  tipsContainer: {
    marginBottom: 10,
  },
  tipRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: "#E5E7EB",
    marginLeft: 8,
    flex: 1,
  },
};
