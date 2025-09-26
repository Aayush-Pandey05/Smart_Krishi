import React, { useState } from 'react';
import { Droplets, MapPin, Compass, Droplet } from 'lucide-react';
import Header2 from '../components/Header2';

const SmartIrrigationAdvisorPage = () => {
  const [formData, setFormData] = useState({
    soilMoisture: '45',
    location: '',
    cropType: '',
    plantingDate: '',
    lastIrrigation: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Irrigation Data:", formData);
    alert("Irrigation assessment submitted! Check the console for the data.");
  };

  const cropOptions = ['Wheat', 'Rice', 'Corn', 'Soybean', 'Cotton'];

  const Guideline = ({ color, range, text }) => (
    <div className="flex items-center">
      <span className={`w-3 h-3 rounded-full mr-3 ${color}`}></span>
      <span className="text-gray-600"><span className="font-semibold">{range}:</span> {text}</span>
    </div>
  );

  return (
    <main className="bg-gray-50 font-sans min-h-screen py-20 mt-10">
      <div className="container mx-auto px-4">

       <Header2/>
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-500 text-white p-4 rounded-full mb-4">
            <Droplets className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight flex items-center justify-center gap-3">
            <Droplet className="w-12 h-12 text-blue-600" />
            Smart Irrigation Advisor
          </h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-600">
            Get personalized irrigation recommendations based on soil moisture, weather, and crop requirements.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800">Irrigation Assessment</h2>
            <p className="text-gray-500 mt-1 mb-8">Enter your current conditions to get personalized irrigation advice</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="soilMoisture" className="block text-sm font-medium text-gray-700 mb-1">Soil Moisture % *</label>
                  <div className="relative">
                    <input type="number" name="soilMoisture" id="soilMoisture" value={formData.soilMoisture} onChange={handleInputChange} className="w-full pl-4 pr-10 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required />
                    <Compass className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <div className="relative">
                    <input type="text" name="location" id="location" placeholder="City, State" value={formData.location} onChange={handleInputChange} className="w-full pl-4 pr-10 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required />
                    <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="cropType" className="block text-sm font-medium text-gray-700 mb-1">Crop Type *</label>
                <select name="cropType" id="cropType" value={formData.cropType} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required>
                  <option value="" disabled>Select your crop</option>
                  {cropOptions.map(crop => <option key={crop} value={crop}>{crop}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="plantingDate" className="block text-sm font-medium text-gray-700 mb-1">Planting Date</label>
                  <div className="relative">
                     <input type="date" name="plantingDate" id="plantingDate" value={formData.plantingDate} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastIrrigation" className="block text-sm font-medium text-gray-700 mb-1">Last Irrigation</label>
                   <div className="relative">
                     <input type="date" name="lastIrrigation" id="lastIrrigation" value={formData.lastIrrigation} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full mt-4 bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                Get Irrigation Advice
              </button>
            </form>
          </div>

          {/* Right Column: Info Panels */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center">
              <Droplet className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Get Irrigation Advice</h3>
              <p className="text-gray-500 mt-2 max-w-xs mx-auto">Enter your soil conditions and location to receive personalized irrigation recommendations.</p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">General Guidelines</h3>
              <div className="space-y-3">
                <Guideline color="bg-red-500" range="Below 30%" text="Immediate irrigation needed" />
                <Guideline color="bg-yellow-400" range="30-50%" text="Irrigation recommended" />
                <Guideline color="bg-green-500" range="50-70%" text="Monitor closely" />
                <Guideline color="bg-gray-400" range="Above 70%" text="No irrigation needed" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default SmartIrrigationAdvisorPage;
