import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";

export default function FertilizerGuideScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const quickCrops = [
    { id: "1", name: "Wheat", icon: "grain" },
    { id: "2", name: "Rice", icon: "restaurant" },
    { id: "3", name: "Maize", icon: "local-florist" },
    { id: "4", name: "Pulses", icon: "shopping-basket" },
    { id: "5", name: "Potato", icon: "local-grocery-store" },
    { id: "6", name: "Tomato", icon: "local-dining" },
  ];

  const governmentSchemes = [
    {
      id: "1",
      title: "Soil Health Card Scheme",
      description:
        "Provides farmers with soil health cards which contain crop-wise recommendations of nutrients and fertilizers.",
      icon: "assessment",
      action: "Visit Now",
      link: "https://soilhealth.dac.gov.in/home",
    },
    {
      id: "2",
      title: "Paramparagat Krishi Vikas Yojana (PKVY)",
      description:
        "Promotes organic farming through the adoption of organic village by cluster approach and PGS certification.",
      icon: "eco",
      action: "Visit Now",
      link: "https://pgsindia-ncof.gov.in/pkvy/index.aspx",
    },
    {
      id: "3",
      title: "National Food Security Mission (NFSM)",
      description:
        "Aims to increase production of rice, wheat, pulses, and coarse cereals through area expansion and productivity enhancement.",
      icon: "restaurant-menu",
      action: "Visit Now",
      link: "https://www.nfsm.gov.in/",
    },
    {
      id: "4",
      title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      description:
        "Provides insurance coverage and financial support to farmers against crop failure due to natural calamities, pests, or diseases.",
      icon: "shield",
      action: "Visit Now",
      link: "https://pmfby.gov.in/",
    },
    {
      id: "5",
      title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
      description:
        "Provides income support of ₹6,000 per year in three equal installments to all landholding farmer families.",
      icon: "account-balance-wallet",
      action: "Visit Now",
      link: "https://pmkisan.gov.in/",
    },
    {
      id: "6",
      title: "Kisan Credit Card (KCC) Scheme",
      description:
        "Aims to provide adequate and timely credit support from the banking system to farmers for their cultivation and other needs.",
      icon: "credit-card",
      action: "Visit Now",
      link: "https://www.rbi.org.in/commonman/english/scripts/Notification.aspx?Id=2311",
    },
  ];

  const cropData = {
    wheat: {
      fertilizers: [
        {
          name: "Urea (Nitrogen)",
          dosage: "120-150 kg/ha",
          timing: "Basal (1/3), tillering (1/3), boot leaf (1/3)",
          notes: "Apply in split doses for better utilization",
        },
        {
          name: "DAP (Phosphorus)",
          dosage: "60 kg/ha",
          timing: "Basal application",
          notes: "Provides both P and N",
        },
        {
          name: "MOP (Potash)",
          dosage: "40-60 kg/ha",
          timing: "Basal application",
          notes: "For saline soils",
        },
      ],
      pesticides: [
        {
          name: "Imidacloprid",
          dosage: "0.3 ml/liter water",
          timing: "Seed treatment or early tillering",
          target: "Aphids, termites",
          safety: "Wear protective gear, avoid spraying during flowering",
        },
        {
          name: "Carbendazim",
          dosage: "2 g/kg seed",
          timing: "Seed treatment",
          target: "Seed-borne diseases",
          safety: "Do not use on food crops within 30 days of harvest",
        },
        {
          name: "Mancozeb",
          dosage: "2 g/liter water",
          timing: "At first sign of disease",
          target: "Rust, powdery mildew",
          safety: "Maximum 3 applications per season",
        },
      ],
    },
    rice: {
      fertilizers: [
        {
          name: "Urea (Nitrogen)",
          dosage: "100-120 kg/ha",
          timing: "Basal (1/2), tillering (1/4), panicle initiation (1/4)",
          notes: "Use green manure for organic N",
        },
        {
          name: "SSP (Phosphorus)",
          dosage: "60 kg/ha",
          timing: "Basal application",
          notes: "Single Super Phosphate",
        },
        {
          name: "MOP (Potash)",
          dosage: "40 kg/ha",
          timing: "Basal application",
          notes: "Essential for grain filling",
        },
      ],
      pesticides: [
        {
          name: "Chlorpyrifos",
          dosage: "2 ml/liter water",
          timing: "Early vegetative stage",
          target: "Stem borers, leaf folders",
          safety: "Apply in evening hours, avoid bee activity",
        },
        {
          name: "Tricyclazole",
          dosage: "1 g/liter water",
          timing: "At tillering stage",
          target: "Blast disease",
          safety: "Use protective clothing, wash hands after application",
        },
        {
          name: "Cartap Hydrochloride",
          dosage: "1 g/liter water",
          timing: "At first appearance of pests",
          target: "Brown plant hopper",
          safety: "Do not graze animals on treated areas",
        },
      ],
    },
    maize: {
      fertilizers: [
        {
          name: "Urea (Nitrogen)",
          dosage: "120 kg/ha",
          timing: "Basal (1/3), knee height (1/3), tasseling (1/3)",
          notes: "Side dress application recommended",
        },
        {
          name: "DAP (Phosphorus)",
          dosage: "60 kg/ha",
          timing: "Basal application",
          notes: "Apply near root zone",
        },
        {
          name: "MOP (Potash)",
          dosage: "40 kg/ha",
          timing: "Basal application",
          notes: "Improves stalk strength",
        },
      ],
      pesticides: [
        {
          name: "Lambda-cyhalothrin",
          dosage: "0.5 ml/liter water",
          timing: "Early whorl stage",
          target: "Fall armyworm, stem borer",
          safety: "Avoid application during high wind conditions",
        },
        {
          name: "Metalaxyl",
          dosage: "2 g/kg seed",
          timing: "Seed treatment",
          target: "Downy mildew",
          safety: "Store away from food items",
        },
        {
          name: "Imazalil",
          dosage: "1 ml/liter water",
          timing: "Foliar spray at early infection",
          target: "Fusarium stalk rot",
          safety: "Pre-harvest interval: 14 days",
        },
      ],
    },
    pulses: {
      fertilizers: [
        {
          name: "DAP (Phosphorus)",
          dosage: "40-50 kg/ha",
          timing: "Basal application",
          notes: "Nitrogen fixation by rhizobia reduces N requirement",
        },
        {
          name: "Gypsum (Sulfur)",
          dosage: "200 kg/ha",
          timing: "Basal application",
          notes: "For sulfur-deficient soils",
        },
        {
          name: "MOP (Potash)",
          dosage: "20-30 kg/ha",
          timing: "Basal application",
          notes: "For high-yielding varieties",
        },
      ],
      pesticides: [
        {
          name: "Dimethoate",
          dosage: "1.5 ml/liter water",
          timing: "Pod formation stage",
          target: "Aphids, pod borers",
          safety: "Do not apply during flowering to protect pollinators",
        },
        {
          name: "Thiram",
          dosage: "3 g/kg seed",
          timing: "Seed treatment",
          target: "Seed and seedling diseases",
          safety: "Handle with care, avoid inhalation",
        },
        {
          name: "Tebuconazole",
          dosage: "1 ml/liter water",
          timing: "At first sign of wilt",
          target: "Wilt and root rot",
          safety: "Maximum 2 applications per season",
        },
      ],
    },
    potato: {
      fertilizers: [
        {
          name: "Urea (Nitrogen)",
          dosage: "100-120 kg/ha",
          timing: "Basal (1/2), 30-40 DAT (1/2)",
          notes: "Avoid excess N to prevent hollow heart",
        },
        {
          name: "SSP (Phosphorus)",
          dosage: "100 kg/ha",
          timing: "Basal application",
          notes: "Apply in furrows",
        },
        {
          name: "MOP (Potash)",
          dosage: "120-150 kg/ha",
          timing: "Basal application",
          notes: "Essential for tuber quality",
        },
      ],
      pesticides: [
        {
          name: "Monocrotophos",
          dosage: "1 ml/liter water",
          timing: "Early vegetative stage",
          target: "Aphids, whiteflies",
          safety: "Highly toxic - use with extreme caution",
        },
        {
          name: "Mancozeb",
          dosage: "2 g/liter water",
          timing: "Weekly from emergence",
          target: "Early and late blight",
          safety: "Alternate with systemic fungicides",
        },
        {
          name: "Phorate",
          dosage: "10 kg/ha",
          timing: "At planting",
          target: "Nematodes, cutworms",
          safety: "Soil application only, wear protective gear",
        },
      ],
    },
    tomato: {
      fertilizers: [
        {
          name: "Urea (Nitrogen)",
          dosage: "100 kg/ha",
          timing: "Basal (1/2), flowering (1/4), fruit set (1/4)",
          notes: "Reduce N during fruiting stage",
        },
        {
          name: "SSP (Phosphorus)",
          dosage: "80 kg/ha",
          timing: "Basal application",
          notes: "Promotes root development",
        },
        {
          name: "MOP (Potash)",
          dosage: "80 kg/ha",
          timing: "Basal (1/2), fruit development (1/2)",
          notes: "Improves fruit quality and size",
        },
      ],
      pesticides: [
        {
          name: "Imidacloprid",
          dosage: "0.5 ml/liter water",
          timing: "Transplanting and repeat after 15 days",
          target: "Whiteflies, thrips",
          safety: "Do not exceed 3 applications per season",
        },
        {
          name: "Mancozeb + Metalaxyl",
          dosage: "2 g/liter water",
          timing: "Preventive spray every 10-14 days",
          target: "Early blight, late blight",
          safety: "Start spraying from 25 days after transplanting",
        },
        {
          name: "Spinosad",
          dosage: "1 ml/liter water",
          timing: "At fruiting stage",
          target: "Fruit borer, leaf miner",
          safety: "Safe for beneficial insects, low toxicity to mammals",
        },
      ],
    },
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setSnackbarMessage("Please enter a crop name to search.");
      setSnackbarVisible(true);
      return;
    }

    const cropKey = Object.keys(cropData).find((key) =>
      key.toLowerCase().includes(query)
    );

    if (cropKey) {
      setSelectedCrop(cropKey);
      setSnackbarMessage(`Found recommendations for ${cropKey}!`);
      setSnackbarVisible(true);
    } else {
      setSnackbarMessage(
        "No crop information found. Try wheat, rice, maize, pulses, potato, or tomato."
      );
      setSnackbarVisible(true);
    }
  };

  const handleQuickSearch = (cropName) => {
    setSearchQuery(cropName);
    setSelectedCrop(cropName.toLowerCase());
    setSnackbarMessage(`Showing recommendations for ${cropName}!`);
    setSnackbarVisible(true);
  };

  const renderFertilizerItem = ({ item }) => (
    <View style={styles.recommendationCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <MaterialIcons name="local-pharmacy" size={20} color="#6EE7B7" />
      </View>
      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Dosage:</Text>
          <Text style={styles.detailValue}>{item.dosage}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Timing:</Text>
          <Text style={styles.detailValue}>{item.timing}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Notes:</Text>
          <Text style={styles.detailValue}>{item.notes}</Text>
        </View>
      </View>
    </View>
  );

  const renderPesticideItem = ({ item }) => (
    <View style={styles.recommendationCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <MaterialIcons name="warning" size={20} color="#FF6B6B" />
      </View>
      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Target:</Text>
          <Text style={styles.detailValue}>{item.target}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Dosage:</Text>
          <Text style={styles.detailValue}>{item.dosage}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Timing:</Text>
          <Text style={styles.detailValue}>{item.timing}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Safety:</Text>
          <Text style={styles.detailValue}>{item.safety}</Text>
        </View>
      </View>
    </View>
  );

  const renderSchemeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.schemeCard}
      onPress={() => Linking.openURL(item.link)}
    >
      <View style={styles.schemeContent}>
        <MaterialIcons
          name={item.icon}
          size={28}
          color="#378d3d"
          style={styles.schemeIcon}
        />
        <View style={styles.schemeText}>
          <Text style={styles.schemeTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.schemeDescription} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
        <View style={styles.schemeAction}>
          <Text style={styles.schemeActionText}>{item.action}</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#378d3d" />
        </View>
      </View>
    </TouchableOpacity>
  );

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
        <Text style={styles.header}>Fertilizer & Pesticide Guide</Text>
        <View style={styles.back} />
      </View>

      <View style={styles.innerContainer}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.title}>Search by Crop Name</Text>
            <Text style={styles.subTitle}>
              Enter your crop name to get specific fertilizer and pesticide
              recommendations with dosage and timing.
            </Text>

            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search for crops (e.g wheat, rice, maize)"
                placeholderTextColor="#A9C4B0"
                numberOfLines={1}
                ellipsizeMode="tail"
              />
            </View>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}
            >
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
            <Text style={styles.subtitle}>Quick search:</Text>
            <FlatList
              data={quickCrops}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.quickSearchButton}
                  onPress={() => handleQuickSearch(item.name)}
                >
                  <Text style={styles.quickSearchText}>{item.name}</Text>
                  <MaterialIcons
                    name="arrow-forward"
                    size={16}
                    color="#378d3d"
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quickSearchList}
            />
          </View>

          {selectedCrop && cropData[selectedCrop] && (
            <View style={styles.section}>
              <View style={styles.resultHeader}>
                <Text style={styles.resultTitle}>
                  Recommendations for{" "}
                  {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)}
                </Text>
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => {
                    setSelectedCrop(null);
                    setSearchQuery("");
                  }}
                >
                  <Text style={styles.clearButtonText}>Clear</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.categoryTitle}>
                Fertilizer Recommendations
              </Text>
              <FlatList
                data={cropData[selectedCrop].fertilizers}
                renderItem={renderFertilizerItem}
                keyExtractor={(item, index) => `${selectedCrop}-fert-${index}`}
                scrollEnabled={false}
              />

              <Text style={styles.categoryTitle}>
                Pesticide Recommendations
              </Text>
              <FlatList
                data={cropData[selectedCrop].pesticides}
                renderItem={renderPesticideItem}
                keyExtractor={(item, index) => `${selectedCrop}-pest-${index}`}
                scrollEnabled={false}
              />
            </View>
          )}
          <View style={styles.section}>
            <Text style={styles.title}>Related Government Schemes</Text>
            <Text style={styles.subTitle}>
              Explore government initiatives that support farmers with resources
              and information for better agricultural practices.
            </Text>
            <FlatList
              data={governmentSchemes}
              renderItem={renderSchemeItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={{
          backgroundColor: "#4CAF50",
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
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 14,
    color: "#A9C4B0",
    marginBottom: 16,
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#D4EDDA",
    marginBottom: 2,
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#1F4A2E",
    borderRadius: 8,
    paddingHorizontal: 12,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#378d3d",
    marginRight: 8,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#378d3d",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 80,
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  quickSearchList: {
    paddingVertical: 8,
  },
  quickSearchButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F4A2E",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#378d3d",
  },
  quickSearchText: {
    fontSize: 14,
    color: "#D4EDDA",
    marginRight: 8,
    fontWeight: "600",
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    flex: 1,
  },
  clearButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  clearButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#6EE7B7",
    marginTop: 0,
    marginBottom: 12,
  },
  recommendationCard: {
    backgroundColor: "#1F4A2E",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#378d3d",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    flex: 1,
  },
  cardDetails: {
    flex: 1,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 14,
    color: "#A9C4B0",
    minWidth: 60,
    fontWeight: "600",
  },
  detailValue: {
    fontSize: 14,
    color: "#D4EDDA",
    flex: 1,
  },
  schemeCard: {
    backgroundColor: "#1F4A2E",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#378d3d",
  },
  schemeContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  schemeIcon: {
    marginRight: 12,
  },
  schemeText: {
    flex: 1,
    marginRight: 12,
  },
  schemeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  schemeDescription: {
    fontSize: 13,
    color: "#A9C4B0",
    lineHeight: 18,
  },
  schemeAction: {
    flexDirection: "row",
    alignItems: "center",
  },
  schemeActionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#378d3d",
    marginRight: 4,
  },
};
