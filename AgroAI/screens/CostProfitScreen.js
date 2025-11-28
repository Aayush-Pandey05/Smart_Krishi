import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";

export default function CostProfitScreen() {
  const navigation = useNavigation();
  const [costItems, setCostItems] = useState([
    { name: "Seeds", amount: "500" },
    { name: "Fertilizer", amount: "750" },
  ]);
  const [yieldAmount, setYieldAmount] = useState("2000");
  const [marketPrice, setMarketPrice] = useState("2.5");
  const [newCostName, setNewCostName] = useState("");
  const [newCostAmount, setNewCostAmount] = useState("");

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const totalCosts = costItems.reduce(
    (sum, item) => sum + (parseFloat(item.amount) || 0),
    0
  );
  const totalRevenue =
    (parseFloat(yieldAmount) || 0) * (parseFloat(marketPrice) || 0);
  const estimatedProfit = totalRevenue - totalCosts;

  const addCostItem = () => {
    if (!newCostName.trim() && !newCostAmount.trim()) {
      Alert.alert("Missing Input", "Please fill in both fields.");
      return;
    }
    if (!newCostName.trim()) {
      Alert.alert("Missing Input", "Please enter a cost name.");
      return;
    }
    if (!newCostAmount.trim()) {
      Alert.alert("Missing Input", "Please enter an amount.");
      return;
    }
    if (isNaN(parseFloat(newCostAmount))) {
      Alert.alert("Invalid Input", "Amount must be a valid number.");
      return;
    }

    setCostItems([
      ...costItems,
      { name: newCostName.trim(), amount: newCostAmount.trim() },
    ]);
    setNewCostName("");
    setNewCostAmount("");
    setSnackbarMessage("Cost item added successfully!");
    setSnackbarType("success");
    setSnackbarVisible(true);
  };

  const removeCostItem = (indexToRemove) => {
    setCostItems(costItems.filter((_, index) => index !== indexToRemove));
    setSnackbarMessage("Cost item removed!");
    setSnackbarType("error");
    setSnackbarVisible(true);
  };

  const mspData = [
    { crop: "Paddy (Common)", price: "₹2,300", icon: "🌾" },
    { crop: "Wheat", price: "₹2,275", icon: "🌾" },
    { crop: "Jowar (Hybrid)", price: "₹3,371", icon: "🌽" },
    { crop: "Bajra", price: "₹2,625", icon: "🌱" },
    { crop: "Tur (Arhar)", price: "₹7,550", icon: "🌰" },
    { crop: "Moong", price: "₹8,682", icon: "🟢" },
    { crop: "Gram", price: "₹5,650", icon: "🧆" },
    { crop: "Masur", price: "₹6,425", icon: "🟤" },
  ];

  const openMSPData = () => {
    Linking.openURL(
      "https://desagri.gov.in/wp-content/uploads/2025/08/MSP-Statement_English.pdf"
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#000000" />
      <View style={styles.navbar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.header}>Cost & Profit Calculator</Text>
        <View style={styles.back} />
      </View>

      <View style={styles.innerContainer}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.title}>Farming Costs</Text>
            {costItems.map((item, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.label}>{item.name}</Text>
                <TextInput
                  style={styles.input}
                  value={item.amount}
                  onChangeText={(text) => {
                    const updatedItems = [...costItems];
                    updatedItems[index].amount = text.replace(/[^0-9.]/g, "");
                    setCostItems(updatedItems);
                  }}
                  keyboardType="numeric"
                  placeholder="Amount (₹)"
                  placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity
                  onPress={() => removeCostItem(index)}
                  style={styles.delete}
                >
                  <MaterialIcons name="delete" size={20} color="#FF4C4C" />
                </TouchableOpacity>
              </View>
            ))}
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.addInput, { flex: 0.6 }]}
                value={newCostName}
                onChangeText={setNewCostName}
                placeholder="New Cost Item"
                placeholderTextColor="#9CA3AF"
              />
              <TextInput
                style={[styles.input, styles.addInput, { flex: 0.4 }]}
                value={newCostAmount}
                onChangeText={setNewCostAmount}
                keyboardType="numeric"
                placeholder="Amount (₹)"
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity style={styles.add} onPress={addCostItem}>
                <MaterialIcons name="add" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Estimated Revenue</Text>
            <View style={styles.group}>
              <Text style={styles.label}>Expected Yield</Text>
              <TextInput
                style={styles.textInput}
                value={yieldAmount}
                onChangeText={(text) =>
                  setYieldAmount(text.replace(/[^0-9.]/g, ""))
                }
                keyboardType="numeric"
                placeholder="Enter yield amount"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>Market Price (₹ per unit)</Text>
              <TextInput
                style={styles.textInput}
                value={marketPrice}
                onChangeText={(text) =>
                  setMarketPrice(text.replace(/[^0-9.]/g, ""))
                }
                keyboardType="numeric"
                placeholder="Enter price per unit"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Overall Profitability</Text>
            <View style={styles.profitRow}>
              <View style={styles.profitItem}>
                <Text style={styles.profitLabel}>Total Cost</Text>
                <Text style={styles.profitValue}>
                  ₹{totalCosts.toLocaleString()}
                </Text>
              </View>
              <View style={styles.profitItem}>
                <Text style={styles.profitLabel}>Total Revenue</Text>
                <Text style={styles.profitValue}>
                  ₹{totalRevenue.toLocaleString()}
                </Text>
              </View>
              <View style={styles.horizontal} />
              <View style={styles.profitItem}>
                <Text style={styles.profitLabel}>Estimated Profit</Text>
                <Text
                  style={[
                    styles.profitValue,
                    estimatedProfit >= 0
                      ? styles.profitPositive
                      : styles.profitNegative,
                  ]}
                >
                  ₹{estimatedProfit.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Minimum Support Prices (MSP) 🇮🇳</Text>
            <Text style={styles.subTitle}>
              Benchmark prices (per quintal) to ensure fair returns for certain
              crops.
            </Text>
            <View style={styles.mspContainer}>
              {mspData.map((item, index) => (
                <View key={index} style={styles.mspRow}>
                  <Text style={styles.icon}>{item.icon}</Text>
                  <Text style={styles.crop}>{item.crop}</Text>
                  <Text style={styles.price}>{item.price}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.msp} onPress={openMSPData}>
              <Text style={styles.mspText}>View Official MSP Data</Text>
              <MaterialIcons
                name="launch"
                size={16}
                color="#FFFFFF"
                style={{ marginLeft: 6 }}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <Snackbar
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },
  group: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: "#D4EDDA",
    marginBottom: 4,
    flex: 1,
  },
  input: {
    backgroundColor: "#1F4A2E",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#378d3d",
    flex: 0.8,
    marginRight: 8,
  },
  textInput: {
    backgroundColor: "#1F4A2E",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#378d3d",
    marginTop: 4,
  },
  addInput: {
    marginRight: 8,
    flex: 1,
    fontSize: 14,
  },
  add: {
    backgroundColor: "#378d3d",
    borderRadius: 6,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36,
  },
  delete: {
    padding: 8,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3A3A3A",
    borderRadius: 6,
  },
  profitRow: {
    marginTop: 8,
  },
  horizontal: {
    height: 1,
    backgroundColor: "#1F4A2E",
    marginVertical: 10,
  },
  profitItem: {
    marginBottom: 10,
  },
  profitLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#A9C4B0",
  },
  profitValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#D4EDDA",
  },
  profitPositive: {
    color: "#6EE7B7",
  },
  profitNegative: {
    color: "#F87171",
  },
  mspContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
    borderRadius: 8,
    padding: 10,
  },
  mspRow: {
    flexDirection: "column",
    alignItems: "center",
    width: "48%",
    marginBottom: 12,
    padding: 10,
    backgroundColor: "#2A5A38",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#3A7A48",
  },
  icon: {
    fontSize: 24,
    marginBottom: 8,
    color: "#D4EDDA",
  },
  crop: {
    fontSize: 14,
    color: "#D4EDDA",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6EE7B7",
    textAlign: "center",
  },
  msp: {
    flexDirection: "row",
    backgroundColor: "#378d3d",
    borderRadius: 8,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  mspText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
};
