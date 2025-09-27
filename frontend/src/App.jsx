import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import SoilHealth from "./pages/SoilHealth";
import CostCalculator from "./pages/CostCalculator";
import IrrigationAdvisor from "./pages/IrrigationAdvisor";
import FertilizerGuide from "./pages/FertilizerGuide";
import DiseaseDetection from "./pages/DiseaseDetection";
import Feature from "./pages/Feature";
import MarketDashboard from "./pages/Dashboard";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { Loader } from "lucide-react";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/soilhealth" element={<SoilHealth />} />
        <Route path="/costcal" element={<CostCalculator />} />
        <Route path="/irrigation" element={<IrrigationAdvisor />} />
        <Route path="/fertilizer" element={<FertilizerGuide />} />
        <Route path="/disease" element={<DiseaseDetection />} />
        <Route path="/features" element={<Feature />} />
        <Route path="/marketdashboard" element={<MarketDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
