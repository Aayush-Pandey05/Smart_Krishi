import React, { useState, useEffect } from "react";
import {
  Droplets,
  MapPin,
  Compass,
  Droplet,
  BrainCircuit,
  Loader2,
  Leaf,
  History,
  BarChart3,
  Calendar,
} from "lucide-react";
import Header2 from "../components/Header2";
import { useIrrigationStore } from "../store/useIrrigationStore";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
// import WeatherWidget from '../components/Weather';

const SmartIrrigationAdvisorPage = () => {
  // --- ZUSTAND STORES ---
  const { authUser } = useAuthStore();
  const {
    irrigationHistory,
    currentAdvice,
    userStats,
    isGeneratingAdvice,
    isLoadingHistory,
    generateIrrigationAdvice,
    getUserIrrigationHistory,
    getUserStats,
    getLatestRecommendation,
    clearCurrentAdvice,
  } = useIrrigationStore();

  // --- LOCAL STATE MANAGEMENT ---
  const [formData, setFormData] = useState({
    location: "",
    cropType: "",
    soilType: "Loam",
    plantingDate: "",
    lastIrrigation: "",
  });

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);

  // --- API KEYS (Replace with your own) ---
  const WEATHER_API_KEY = "49d172dc817c4ac19a8154811252609"; // Replace with your WeatherAPI.com key

  // --- EFFECTS ---
  useEffect(() => {
    // Fetch user's irrigation data when component mounts
    if (authUser) {
      getUserIrrigationHistory(1, 5); // Get last 5 records
      getUserStats();
      setShowRecommendations(true);
    } else {
      setShowRecommendations(false);
    }
  }, [authUser, getUserIrrigationHistory, getUserStats]);

  // Get latest recommendation for display
  const latestRecommendation = getLatestRecommendation();

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authUser) {
      toast.error("Please login to get irrigation advice");
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);
    clearCurrentAdvice();

    if (!WEATHER_API_KEY || WEATHER_API_KEY === "YOUR_WEATHER_API_KEY") {
      setError("Weather API key is missing. Please add it to the component.");
      setLoading(false);
      return;
    }

    let fetchedWeatherData;
    try {
      const weatherResponse = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${formData.location}&days=3&aqi=no&alerts=no`
      );
      if (!weatherResponse.ok) {
        const errData = await weatherResponse.json();
        throw new Error(
          errData.error.message ||
            "Could not fetch weather data for the specified location."
        );
      }
      const data = await weatherResponse.json();
      fetchedWeatherData = {
        temp: data.current.temp_c,
        humidity: data.current.humidity,
        wind: data.current.wind_kph,
        precip: data.current.precip_mm,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
        city: data.location.name,
        forecast: data.forecast.forecastday,
      };
      setWeatherData(fetchedWeatherData);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error("Weather fetch error:", err);
      return;
    }

    try {
      const payload = {
        location: formData.location,
        cropType: formData.cropType,
        soilType: formData.soilType,
        plantingDate: formData.plantingDate,
        lastIrrigation: formData.lastIrrigation,
        weatherData: fetchedWeatherData,
      };

      const result = await generateIrrigationAdvice(payload);

      if (result.success) {
        // Data is now stored in the store and MongoDB
        console.log("Irrigation advice generated and saved successfully");
      } else {
        setError(result.error || "Failed to generate irrigation advice");
      }
    } catch (err) {
      console.error("Failed to get AI advice:", err);
      setError(err.message || "Failed to generate irrigation advice");
    } finally {
      setLoading(false);
    }
  };

  const cropOptions = [
    "Tomato",
    "Rice",
    "Wheat",
    "Sugarcane",
    "Cotton",
    "Corn",
    "Soybean",
  ];
  const soilOptions = ["Loam", "Clay", "Sandy", "Silt"];

  const Guideline = ({ color, range, text }) => (
    <div className="flex items-center">
      <span className={`w-3 h-3 rounded-full mr-3 ${color}`}></span>
      <span className="text-gray-600">
        <span className="font-semibold">{range}:</span> {text}
      </span>
    </div>
  );

  return (
    <main className="bg-gray-50 font-sans min-h-screen py-20 mt-10">
      <div className="container mx-auto px-4">
        <Header2 />
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-500 text-white p-4 rounded-full mb-4">
            <Droplets className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight flex items-center justify-center gap-3">
            <Droplet className="w-12 h-12 text-blue-600" />
            Smart Irrigation Advisor
          </h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-600">
            Get personalized irrigation recommendations based on soil type,
            weather, and crop requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800">
              Irrigation Assessment
            </h2>
            <p className="text-gray-500 mt-1 mb-8">
              Enter your current conditions to get personalized irrigation
              advice
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form inputs remain the same */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="location"
                      id="location"
                      placeholder="City, State"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full pl-4 pr-10 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                    <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="cropType"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Crop Type *
                  </label>
                  <select
                    name="cropType"
                    id="cropType"
                    value={formData.cropType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="" disabled>
                      Select your crop
                    </option>
                    {cropOptions.map((crop) => (
                      <option key={crop} value={crop}>
                        {crop}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="soilType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Soil Type *
                </label>
                <select
                  name="soilType"
                  id="soilType"
                  value={formData.soilType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  {soilOptions.map((soil) => (
                    <option key={soil} value={soil}>
                      {soil}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="plantingDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Planting Date
                  </label>
                  <input
                    type="date"
                    name="plantingDate"
                    id="plantingDate"
                    value={formData.plantingDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastIrrigation"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Irrigation
                  </label>
                  <input
                    type="date"
                    name="lastIrrigation"
                    id="lastIrrigation"
                    value={formData.lastIrrigation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <BrainCircuit />
                )}
                {loading ? "Analyzing Data..." : "Get Irrigation Advice"}
              </button>
            </form>
          </div>
          <div className="space-y-8">
            {/* Static content remains the same */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center">
              <Droplet className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">
                Your AI-Powered Advice
              </h3>
              <p className="text-gray-500 mt-2 max-w-xs mx-auto">
                Results from your assessment will appear here.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                General Guidelines
              </h3>
              <div className="space-y-3">
                <Guideline
                  color="bg-red-500"
                  range="Below 30%"
                  text="Immediate irrigation needed"
                />
                <Guideline
                  color="bg-yellow-400"
                  range="30-50%"
                  text="Irrigation recommended"
                />
                <Guideline
                  color="bg-green-500"
                  range="50-70%"
                  text="Monitor closely"
                />
                <Guideline
                  color="bg-gray-400"
                  range="Above 70%"
                  text="No irrigation needed"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          {(loading || isGeneratingAdvice) && (
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <Loader2 className="w-8 h-8 mx-auto text-blue-500 animate-spin mb-4" />
              <p className="text-gray-600">
                {isGeneratingAdvice
                  ? "Generating AI irrigation advice..."
                  : "Fetching weather data..."}
              </p>
            </div>
          )}
          {error && (
            <div className="text-center p-6 bg-red-50 text-red-700 rounded-xl border border-red-200 shadow-sm">
              <h3 className="font-semibold">An Error Occurred</h3>
              <p>{error}</p>
            </div>
          )}
          {/* AI Recommendations Section */}
          {showRecommendations && latestRecommendation && (
            <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl border border-green-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <BrainCircuit className="text-green-600" size={28} />
                Your Latest AI Irrigation Recommendations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-lg text-green-800 flex items-center gap-2 mb-3">
                    <Droplets size={20} />
                    Irrigation Advice
                  </h4>
                  <p className="text-gray-700">
                    {latestRecommendation.advice?.irrigation}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-lg text-green-800 flex items-center gap-2 mb-3">
                    <Leaf size={20} />
                    Fertilization Advice
                  </h4>
                  <p className="text-gray-700">
                    {latestRecommendation.advice?.fertilization}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-lg text-green-800 flex items-center gap-2 mb-3">
                    <Compass size={20} />
                    Pest & Disease Control
                  </h4>
                  <p className="text-gray-700">
                    {latestRecommendation.advice?.pest_control}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-lg text-green-800 flex items-center gap-2 mb-3">
                    <Droplet size={20} />
                    Additional Tips
                  </h4>
                  <p className="text-gray-700">
                    {latestRecommendation.advice?.additional_tips}
                  </p>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600 flex items-center gap-2">
                <Calendar size={16} />
                Last updated:{" "}
                {new Date(latestRecommendation.createdAt).toLocaleDateString()}
              </div>
            </div>
          )}

          {/* Current Advice Results (After Form Submission) */}
          {currentAdvice && weatherData && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
              <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <BrainCircuit className="text-green-600" size={28} />
                  New AI Farming Advisor Results
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="font-semibold text-lg text-green-800 flex items-center gap-2">
                      <Droplets size={20} />
                      Irrigation Advice
                    </h4>
                    <p>{currentAdvice.advice?.irrigation}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-green-800 flex items-center gap-2">
                      <Leaf size={20} />
                      Fertilization Advice
                    </h4>
                    <p>{currentAdvice.advice?.fertilization}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-green-800 flex items-center gap-2">
                      <Compass size={20} />
                      Pest & Disease Control
                    </h4>
                    <p>{currentAdvice.advice?.pest_control}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-green-800 flex items-center gap-2">
                      <Droplet size={20} />
                      Additional Tips
                    </h4>
                    <p>{currentAdvice.advice?.additional_tips}</p>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  Processing time: {currentAdvice.processingTime}ms
                </div>
              </div>
              <div className="lg:col-span-1 space-y-6">
                {weatherData && (
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Weather Conditions
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>Temperature: {weatherData.temp}°C</p>
                      <p>Humidity: {weatherData.humidity}%</p>
                      <p>Wind: {weatherData.wind} km/h</p>
                      <p>Precipitation: {weatherData.precip}mm</p>
                      <p>Condition: {weatherData.condition}</p>
                    </div>
                  </div>
                )}

                {userStats && (
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <BarChart3 size={20} />
                      Your Stats
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>Total Requests: {userStats.totalRequests}</p>
                      <p>Avg Processing: {userStats.avgProcessingTime}ms</p>
                      <p>
                        Most Common Crop: {userStats.mostCommonCrop || "N/A"}
                      </p>
                      <p>
                        Most Common Soil: {userStats.mostCommonSoil || "N/A"}
                      </p>
                    </div>
                  </div>
                )}

                {irrigationHistory.length > 0 && (
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <History size={20} />
                      Recent History
                    </h3>
                    <div className="space-y-3">
                      {irrigationHistory.slice(0, 3).map((record, index) => (
                        <div key={index} className="text-sm">
                          <p className="font-medium text-gray-800">
                            {record.cropType}
                          </p>
                          <p className="text-gray-600">{record.location}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(record.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* No Recommendations Message for New Users */}
          {showRecommendations &&
            !latestRecommendation &&
            !isLoadingHistory &&
            authUser && (
              <div className="mt-12 bg-gray-50 p-8 rounded-xl border border-gray-200 text-center">
                <BrainCircuit
                  className="mx-auto text-gray-400 mb-4"
                  size={48}
                />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Welcome to Smart Irrigation!
                </h3>
                <p className="text-gray-500">
                  You haven't requested any irrigation advice yet. Fill out the
                  form above to get your first AI-powered recommendation!
                </p>
              </div>
            )}
        </div>
      </div>
    </main>
  );
};

export default SmartIrrigationAdvisorPage;
