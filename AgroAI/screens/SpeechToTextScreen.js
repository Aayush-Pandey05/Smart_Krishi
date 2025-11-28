import React, { useState, useEffect } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";
import Voice from "@react-native-voice/voice";

export default function SpeechToTextScreen() {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const [isListening, setIsListening] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  // Initialize voice recognition handlers
  useEffect(() => {
    Voice.onSpeechStart = () => {
      setIsListening(true);
      setSnackbarMessage("Listening started...");
      setSnackbarType("success");
      setSnackbarVisible(true);
    };

    Voice.onSpeechEnd = () => {
      setIsListening(false);
      setSnackbarMessage("Listening stopped.");
      setSnackbarType("success");
      setSnackbarVisible(true);
    };

    Voice.onSpeechResults = (e) => {
      if (e.value && e.value.length > 0) {
        setTranscribedText(e.value[0]);
        setSnackbarMessage("Text transcribed successfully!");
        setSnackbarType("success");
        setSnackbarVisible(true);
      }
    };

    Voice.onSpeechError = (e) => {
      setIsListening(false);
      setSnackbarMessage("Error: Could not recognize speech.");
      setSnackbarType("error");
      setSnackbarVisible(true);
      console.error(e);
    };

    // Cleanup on unmount
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const toggleListening = async () => {
    if (isListening) {
      try {
        await Voice.stop();
      } catch (e) {
        console.error(e);
        setSnackbarMessage("Error stopping speech recognition.");
        setSnackbarType("error");
        setSnackbarVisible(true);
      }
    } else {
      try {
        const permissionResult = await Voice.isAvailable();
        if (!permissionResult) {
          setSnackbarMessage("Speech recognition is not available on this device.");
          setSnackbarType("error");
          setSnackbarVisible(true);
          return;
        }
        await Voice.start("en-US");
      } catch (e) {
        console.error(e);
        setSnackbarMessage("Error starting speech recognition.");
        setSnackbarType("error");
        setSnackbarVisible(true);
      }
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
        <Text style={styles.header}>Speech to Text</Text>
        <View style={styles.back} />
      </View>

      <View style={styles.innerContainer}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.title}>Voice Input</Text>
            <Text style={styles.subTitle}>
              Speak clearly to input data or get farming advice hands-free.
            </Text>
            <View style={styles.textContainer}>
              {transcribedText ? (
                <Text style={styles.transcribedText}>{transcribedText}</Text>
              ) : (
                <View style={styles.placeholder}>
                  <MaterialIcons name="mic" size={50} color="#A9C4B0" />
                  <Text style={styles.placeholderText}>
                    Press the button to start speaking
                  </Text>
                </View>
              )}
            </View>
            <TouchableOpacity
              style={[styles.listenButton, isListening && styles.disable]}
              onPress={toggleListening}
              disabled={false}
            >
              <MaterialIcons
                name={isListening ? "stop" : "mic"}
                size={20}
                color="#FFFFFF"
              />
              <Text style={styles.buttonText}>
                {isListening ? "Stop Listening" : "Start Listening"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.title}>Speech Tips</Text>
            <View style={styles.tipsContainer}>
              {[
                "Speak clearly and at a normal pace",
                "Use a quiet environment for best results",
                "State commands like 'Check crop health' or 'Add note'",
                "Pause briefly after speaking to end recording",
                "Ensure microphone permissions are enabled",
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
  textContainer: {
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#378d3d",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    padding: 16,
  },
  transcribedText: {
    fontSize: 16,
    color: "#E5E7EB",
    textAlign: "center",
    flexWrap: "wrap",
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  placeholderText: {
    fontSize: 14,
    color: "#A9C4B0",
    textAlign: "center",
    marginTop: 8,
  },
  listenButton: {
    flexDirection: "row",
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
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    marginLeft: 8,
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