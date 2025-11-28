import {
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Fontisto, Entypo, MaterialIcons } from "@expo/vector-icons";

export default function SignUpScreen() {
  const width = Dimensions.get("window").width;
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#000000" />
      <View style={styles.innerContainer}>
        <Text style={styles.header}>🌱 Sign Up</Text>
        <Text style={styles.subHeader}>Join Krishi AI today</Text>

        <View style={styles.inputContainer}>
          <View style={styles.wrapper}>
            <Fontisto name="person" size={24} color="#9CA3AF" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="words"
            />
          </View>

          <View style={styles.wrapper}>
            <Fontisto name="email" size={24} color="#9CA3AF" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.wrapper}>
            <Entypo name="lock" size={24} color="#9CA3AF" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={24}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.wrapper}>
            <Entypo name="lock" size={24} color="#9CA3AF" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <MaterialIcons
                name={showConfirmPassword ? "visibility" : "visibility-off"}
                size={24}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.signup}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.bottom}>
            <Text style={styles.text}>Already have an account? </Text>
            <TouchableOpacity
              style={styles.link}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.signupText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    justifyContent: "center",
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: "#E5E7EB",
    textAlign: "center",
    marginBottom: 32,
  },
  inputContainer: {
    width: Dimensions.get("window").width - 48,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F4A2E",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    paddingVertical: 16,
  },
  icon: {
    marginRight: 12,
  },
  signup: {
    backgroundColor: "#378d3d",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    marginBottom: 16,
    marginTop:20,
    width: "100%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "800",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#E5E7EB",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  link: {
    alignItems: "center",
  },
  signupText: {
    color: "#378d3d",
    fontWeight: "700",
  },
});
