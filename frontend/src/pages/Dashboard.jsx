// src/pages/Dashboard.jsx

import React, { useState, useEffect, useCallback } from "react";
import DashboardContent from "./DashboardContent";
// import HeaderAL from "../components/HeaderAL";
import { Loader } from "lucide-react";
import { useDataStore } from "../store/useDataStore";

export default function Dashboard() {
  const { fetchUserData, userData, isLoadingData } = useDataStore();

  const [chartData, setChartData] = useState([]);
  const [alertsData, setAlertsData] = useState([]);
  const [totalWaterVolume, setTotalWaterVolume] = useState("0");
  const [soilMoisture, setSoilMoisture] = useState("N/A");

  const [locationName, setLocationName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (locationName.trim() !== "") setSearchQuery(locationName);
  };

  const fetchAgriculturalData = useCallback(
    async (location, currentUserData) => {
      if (!location) return;
      setIsWeatherLoading(true);
      try {
        let lat, lon;
        if (
          currentUserData?.[0]?.latitude &&
          location === currentUserData?.[0]?.district
        ) {
          lat = currentUserData[0].latitude;
          lon = currentUserData[0].longitude;
        } else {
          const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            location
          )}&count=1`;
          const geoResponse = await fetch(geoUrl);
          const geoData = await geoResponse.json();
          if (!geoData.results?.length)
            throw new Error(`Location "${location}" not found.`);
          lat = geoData.results[0].latitude;
          lon = geoData.results[0].longitude;
        }

        const endDate = new Date();
        const startDate = new Date();
        startDate.setFullYear(endDate.getFullYear() - 1);
        const historicalUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${
          startDate.toISOString().split("T")[0]
        }&end_date=${
          endDate.toISOString().split("T")[0]
        }&daily=precipitation_sum`;
        const historicalResponse = await fetch(historicalUrl);
        const historicalData = await historicalResponse.json();

        const landArea = currentUserData?.[0]?.area || 10000;
        const monthlyRainfall = {};
        let annualWaterVolume = 0;
        if (historicalData.daily?.time) {
          historicalData.daily.time.forEach((dateString, index) => {
            const date = new Date(dateString);
            const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
            const precipitation =
              historicalData.daily.precipitation_sum[index] || 0;
            if (!monthlyRainfall[monthKey])
              monthlyRainfall[monthKey] = { totalVolume: 0, date: date };
            monthlyRainfall[monthKey].totalVolume += precipitation * landArea;
          });
        }
        setChartData(
          Object.values(monthlyRainfall)
            .map((data) => {
              annualWaterVolume += data.totalVolume;
              return {
                name: data.date.toLocaleDateString("en-US", { month: "short" }),
                value: Math.round(data.totalVolume),
                date: data.date,
              };
            })
            .sort((a, b) => a.date - b.date)
        );
        setTotalWaterVolume(Math.round(annualWaterVolume).toLocaleString());

        const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=precipitation_sum,soil_moisture_0_to_7cm&timezone=auto`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        const tomorrowPrecipitation =
          forecastData.daily?.precipitation_sum[1] || 0;
        const currentSoilMoisture =
          forecastData.daily?.soil_moisture_0_to_7cm[0];
        if (currentSoilMoisture !== undefined)
          setSoilMoisture((currentSoilMoisture * 100).toFixed(1));

        const newAlertsData = [];
        if (tomorrowPrecipitation > 20)
          newAlertsData.push({
            color: "red",
            title: "Heavy Rainfall Expected",
            subtitle: `Prepare for ${tomorrowPrecipitation}mm of rain. Risk of waterlogging.`,
          });
        else if (annualWaterVolume > 2000000 && tomorrowPrecipitation > 5)
          newAlertsData.push({
            color: "blue",
            title: "Monsoon Season Active",
            subtitle: "Ensure proper drainage for crops.",
          });
        else if (tomorrowPrecipitation < 1 && currentSoilMoisture < 0.25)
          newAlertsData.push({
            color: "yellow",
            title: "Irrigation May Be Required",
            subtitle:
              "Soil is dry and no rain is forecast. Check crop water needs.",
          });
        else
          newAlertsData.push({
            color: "green",
            title: "Systems Normal",
            subtitle: "Weather conditions are stable. Monitor your crops.",
          });
        setAlertsData(newAlertsData);
      } catch (error) {
        console.error("❌ Data fetch error:", error.message);
        setAlertsData([
          { color: "red", title: "Data Fetch Error", subtitle: error.message },
        ]);
      } finally {
        setIsWeatherLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (
      !isLoadingData &&
      userData?.[0]?.district &&
      userData[0].district !== "Loading..."
    ) {
      const userDistrict = userData[0].district;
      setLocationName(userDistrict);
      setSearchQuery(userDistrict);
    }
  }, [userData, isLoadingData]);

  useEffect(() => {
    if (searchQuery) fetchAgriculturalData(searchQuery, userData);
  }, [searchQuery, userData, fetchAgriculturalData]);

  if (isLoadingData && userData[0].district === "Loading...") {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-950">
        <Loader className="size-10 animate-spin text-white" />
      </div>
    );
  }

  const userRecommendation = userData?.[0] || {};
  const statCardsData = [
    {
      title: "Land Area (m²)",
      value: userRecommendation.area?.toLocaleString(),
    },
    { title: "Est. Annual Rainfall (Liters)", value: totalWaterVolume },
    {
      title: "Soil Moisture (%)",
      value: soilMoisture !== "N/A" ? soilMoisture : "---",
    },
    {
      title: "Water Required (Liters/day)",
      value: userRecommendation.water_requirement?.toLocaleString(),
    },
  ];

  return (
    <div>
      {/* <HeaderAL /> */}
      <div className="min-h-screen font-sans text-slate-50 bg-gradient-to-b from-slate-800 via-blue-950 to-black">
        <main className="p-12 sm:p-6 lg:p-8 pt-28">
          <form onSubmit={handleSearchSubmit} className="mb-6 flex space-x-2">
            <input
              type="text"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className="flex-1 rounded-md border p-2 text-gray-900 bg-slate-50"
              placeholder="Enter location..."
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 px-4 rounded-md disabled:bg-blue-400"
              disabled={isWeatherLoading}
            >
              {isWeatherLoading ? "Loading..." : "Search"}
            </button>
          </form>
          <DashboardContent
            statCardsData={statCardsData}
            chartData={chartData}
            totalWaterVolume={totalWaterVolume}
            alertsData={alertsData}
          />
        </main>
      </div>
    </div>
  );
}
