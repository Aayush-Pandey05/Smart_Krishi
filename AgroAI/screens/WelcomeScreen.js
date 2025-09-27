import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function WelcomeScreen() {
  const width = Dimensions.get("window").width;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#000000" />
      <View style={styles.innerContainer}>
        <Text style={styles.header}>🌱 Krishi AI</Text>
        <Image
          source={require("../assets/i.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.p}>Your Digital Farming Assistant</Text>

        <Text style={styles.description}>
          Get AI-powered crop disease detection, soil health analysis,
          irrigation advice, and market trends—all in one platform.
        </Text>
        <View style={{ width: width - 48 }}>
          <TouchableOpacity
            style={styles.signin}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.text1}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signup}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.text2}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A', 
  },
  innerContainer: {
    flex: 1, 
    alignItems: "center",
    paddingHorizontal: 24, 
    paddingVertical: 30, 
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },
  image: {
    width: 280,
    height: 280,
    marginVertical: 20,
  },
  p: {
    fontSize: 20,
    fontWeight: "700",
    color: "#378d3dff", 
    marginTop: 16,
    textAlign: "center",
    letterSpacing: 1,
  },
  description: {
    fontSize: 15,
    color: "#E5E7EB",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
    marginTop:24
  },
  signin: {
    backgroundColor: "#378d3dff", 
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    marginBottom: 16,
    marginTop:32
  },
  text1: {
    color: "#ffffffff",
    fontSize: 19,
    fontWeight: "800",
  },
  signup: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  text2: {
    color: "#E5E7EB",
    fontSize: 18,
    fontWeight: "600",
  },
});
