import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowUpRight, ArrowDownRight, Calculator, Bell, Wheat, Sprout, ExternalLink } from 'lucide-react';
import Header2 from '../components/Header2';

// --- MspDisplay Component ---
const MspDisplay = () => {
  const [mspData, setMspData] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockMspApiData = [
    { id: 1, crop: 'Paddy', variety: 'Common', price: '2183', icon: Wheat },
    { id: 2, crop: 'Jowar', variety: 'Hybrid', price: '3180', icon: Sprout },
    { id: 3, crop: 'Bajra', variety: 'Maldandi', price: '2500', icon: Wheat },
    { id: 4, crop: 'Maize', variety: 'N/A', price: '2090', icon: Sprout },
    { id: 5, crop: 'Cotton', variety: 'Long Staple', price: '7020', icon: Wheat },
  ];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setMspData(mockMspApiData);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#1C1C1E] rounded-lg p-6 border border-gray-800 shadow-lg shadow-black/20">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold text-white">Minimum Support Price (MSP) 2023-24</h2>
          <p className="text-gray-400 mt-1">Latest Kharif crop prices to help estimate revenue.</p>
        </div>
        <a 
          href="https://pib.gov.in/PressReleaseIframePage.aspx?PRID=1930262" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-green-400 hover:text-green-300 transition-colors shrink-0"
        >
          View Official MSP Data
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
      
      <div className="mt-6 flow-root">
        <div className="-mx-6 -my-2 overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle px-6">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">Crop</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Variety</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">MSP Price (per Quintal)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {loading ? (
                  <tr>
                    <td colSpan="3" className="text-center py-8 text-gray-500">Loading MSP Data...</td>
                  </tr>
                ) : (
                  mspData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-800/50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5 text-green-400" />
                          {item.crop}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">{item.variety}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-semibold text-green-300">₹{item.price}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};


const CostCalculator = () => {
  const [costs, setCosts] = useState([
    { id: 1, name: 'Seeds', value: '500' },
    { id: 2, name: 'Fertilizer', value: '750' },
  ]);

  const [revenue, setRevenue] = useState({
    yield: '2000',
    price: '2.5',
  });
  
  const [results, setResults] = useState({
    totalCost: 0,
    totalRevenue: 0,
    profit: 0,
  });

  const handleCostChange = (id, field, value) => {
    setCosts(costs.map(cost => cost.id === id ? { ...cost, [field]: value } : cost));
  };

  const addCost = () => {
    setCosts([...costs, { id: Date.now(), name: '', value: '' }]);
  };

  const removeCost = (id) => {
    setCosts(costs.filter(cost => cost.id !== id));
  };
  
  const handleRevenueChange = (e) => {
    const { name, value } = e.target;
    setRevenue(prev => ({...prev, [name]: value}));
  };

  useEffect(() => {
    const totalCost = costs.reduce((sum, cost) => sum + (parseFloat(cost.value) || 0), 0);
    const totalRevenue = (parseFloat(revenue.yield) || 0) * (parseFloat(revenue.price) || 0);
    const profit = totalRevenue - totalCost;
    setResults({ totalCost, totalRevenue, profit });
  }, [costs, revenue]);

  return (
    <div className="bg-black">
      <Header2 />
      <main className="ml-64 flex-1 bg-[#121212] min-h-screen p-8">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Cost & Profit Calculator</h1>
            <p className="mt-2 text-gray-400">Estimate farming costs, revenue, and potential profit.</p>
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

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          {/* Left Column: Inputs */}
          <div className="xl:col-span-2 space-y-8">
            {/* Costs Card */}
            <div className="bg-[#1C1C1E] p-6 rounded-lg border border-gray-800 shadow-lg shadow-black/20">
              <h2 className="text-2xl font-semibold text-white mb-6">Estimated Costs</h2>
              <div className="space-y-4">
                {costs.map((cost, index) => (
                  <div key={cost.id} className="flex items-center gap-4">
                    <input
                      type="text"
                      placeholder={`Cost Item ${index + 1}`}
                      value={cost.name}
                      onChange={(e) => handleCostChange(cost.id, 'name', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="number"
                      placeholder="0.00"
                      value={cost.value}
                      onChange={(e) => handleCostChange(cost.id, 'value', e.target.value)}
                      className="w-1/2 px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button onClick={() => removeCost(cost.id)} className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={addCost} className="mt-4 flex items-center gap-2 text-sm font-semibold text-green-400 hover:text-green-300 transition-colors">
                <Plus className="w-4 h-4" /> Add Cost Item
              </button>
            </div>
            
            {/* Revenue Card */}
            <div className="bg-[#1C1C1E] p-6 rounded-lg border border-gray-800 shadow-lg shadow-black/20">
              <h2 className="text-2xl font-semibold text-white mb-6">Estimated Revenue</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="yield" className="block text-sm font-medium text-gray-300 mb-1">Expected Yield (e.g., in kg)</label>
                  <input type="number" name="yield" id="yield" value={revenue.yield} onChange={handleRevenueChange} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">Market Price (per unit)</label>
                  <input type="number" name="price" id="price" value={revenue.price} onChange={handleRevenueChange} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="xl:col-span-1">
            <div className="sticky top-8 bg-[#1C1C1E] p-6 rounded-lg border border-gray-800 shadow-lg shadow-black/20">
              <h2 className="text-xl font-semibold text-white text-center">Financial Summary</h2>
              
              <div className={`mt-4 p-6 rounded-lg text-white text-center transition-colors duration-300 ${results.profit >= 0 ? 'bg-green-600/10' : 'bg-red-600/10'}`}>
                <p className={`text-sm font-semibold uppercase tracking-widest ${results.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  Estimated Profit
                </p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  {results.profit >= 0 
                    ? <ArrowUpRight className="w-8 h-8 text-green-400" /> 
                    : <ArrowDownRight className="w-8 h-8 text-red-400" />
                  }
                  <p className="text-4xl font-bold">₹{results.profit.toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 text-center">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-green-400">Total Revenue</p>
                  <p className="text-lg font-semibold text-white mt-1">₹{results.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-red-400">Total Costs</p>
                  <p className="text-lg font-semibold text-white mt-1">₹{results.totalCost.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <MspDisplay />
        </div>
      </main>
    </div>
  );
};

export default CostCalculator;
