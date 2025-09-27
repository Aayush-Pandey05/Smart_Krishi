import React, { useState } from 'react';
import { FlaskConical, BarChart, Bell, BrainCircuit } from 'lucide-react';
import Header2 from '../components/Header2';

const SoilHealthAnalyzerPage = () => {
  const [formData, setFormData] = useState({
    phLevel: '6.5',
    moisture: '60',
    nitrogen: 'Medium',
    phosphorus: 'High',
    potassium: 'Low',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Manual soil data submitted!");
  };

  return (
    <div className="bg-black">
      <Header2 />
      <main className="ml-64 flex-1 bg-[#121212] min-h-screen p-8">
        <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Soil Health Analyzer</h1>
              <p className="mt-2 text-gray-400">Enter your soil test results for analysis.</p>
            </div>
            <div className="flex items-center">
                <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                    <Bell className="w-5 h-5 text-gray-400" />
                </button>
                <div className="ml-4 w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-sm">
                    JD
                </div>
            </div>
        </header>

        {/* Restored Two-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-2 bg-[#1C1C1E] p-8 rounded-lg border border-gray-800 shadow-lg shadow-black/20">
            <h2 className="text-2xl font-semibold text-white mb-6">Manual Soil Data Entry</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phLevel" className="block text-sm font-medium text-gray-300 mb-1">pH Level *</label>
                  <input type="number" name="phLevel" value={formData.phLevel} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div>
                  <label htmlFor="moisture" className="block text-sm font-medium text-gray-300 mb-1">Moisture % *</label>
                  <input type="number" name="moisture" value={formData.moisture} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div>
                  <label htmlFor="nitrogen" className="block text-sm font-medium text-gray-300 mb-1">Nitrogen Level</label>
                  <input type="text" name="nitrogen" value={formData.nitrogen} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div>
                  <label htmlFor="phosphorus" className="block text-sm font-medium text-gray-300 mb-1">Phosphorus Level</label>
                  <input type="text" name="phosphorus" value={formData.phosphorus} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="potassium" className="block text-sm font-medium text-gray-300 mb-1">Potassium Level</label>
                  <input type="text" name="potassium" value={formData.potassium} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              </div>
              <button type="submit" className="w-full mt-4 bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                <BarChart className="w-5 h-5" />
                Analyze Soil Data
              </button>
            </form>
          </div>

          {/* Right Column: Restored "Analyze Your Soil" Div */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-[#1C1C1E] p-8 rounded-lg text-center border border-gray-800 shadow-lg shadow-black/20">
                <div className="py-23">
                    <BrainCircuit className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                    <h3 className="text-xl font-semibold text-white">Analysis & Recommendations</h3>
                    <p className="text-gray-400 mt-2 max-w-xs mx-auto">
                        Your personalized soil health report and crop recommendations will appear here after analysis.
                    </p>
                </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default SoilHealthAnalyzerPage;

