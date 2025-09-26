import React, { useState, useEffect } from 'react';
import { Plus, Trash2, TrendingUp, TrendingDown, Calculator } from 'lucide-react';
import MspDisplay from '../components/MspDisplay';
import Header2 from '../components/Header2';

const CostCalculator = () => {
  // State for dynamic cost inputs
  const [costs, setCosts] = useState([
    { id: 1, name: 'Seeds', value: '500' },
    { id: 2, name: 'Fertilizer', value: '750' },
  ]);

  // State for revenue inputs
  const [revenue, setRevenue] = useState({
    yield: '2000',
    price: '2.5',
  });
  
  // State for calculated results
  const [results, setResults] = useState({
    totalCost: 0,
    totalRevenue: 0,
    profit: 0,
  });

  // Handle changes in cost inputs
  const handleCostChange = (id, field, value) => {
    setCosts(costs.map(cost => cost.id === id ? { ...cost, [field]: value } : cost));
  };

  // Add a new cost item
  const addCost = () => {
    setCosts([...costs, { id: Date.now(), name: '', value: '' }]);
  };

  // Remove a cost item
  const removeCost = (id) => {
    setCosts(costs.filter(cost => cost.id !== id));
  };
  
  // Handle changes in revenue inputs
  const handleRevenueChange = (e) => {
    const { name, value } = e.target;
    setRevenue(prev => ({...prev, [name]: value}));
  };

  // Recalculate results whenever costs or revenue inputs change
  useEffect(() => {
    const totalCost = costs.reduce((sum, cost) => sum + (parseFloat(cost.value) || 0), 0);
    const totalRevenue = (parseFloat(revenue.yield) || 0) * (parseFloat(revenue.price) || 0);
    const profit = totalRevenue - totalCost;

    setResults({ totalCost, totalRevenue, profit });
  }, [costs, revenue]);

  return (
    <section>
     <Header2/>
      <div className="text-center mb-12 mt-30">
        <div className="inline-block bg-teal-500 text-white p-4 rounded-full mb-4">
          <Calculator className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
          Cost & Profit Calculator
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-600">
          Estimate your farming costs, expected revenue, and potential profit for better financial planning.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          {/* Costs Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Estimated Costs</h2>
            <div className="space-y-4">
              {costs.map((cost, index) => (
                <div key={cost.id} className="flex items-center gap-4">
                  <input
                    type="text"
                    placeholder={`Cost Item ${index + 1}`}
                    value={cost.name}
                    onChange={(e) => handleCostChange(cost.id, 'name', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="number"
                    placeholder="0.00"
                    value={cost.value}
                    onChange={(e) => handleCostChange(cost.id, 'value', e.target.value)}
                    className="w-1/2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button onClick={() => removeCost(cost.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={addCost} className="mt-4 flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700">
              <Plus className="w-4 h-4" /> Add Cost Item
            </button>
          </div>

          <hr className="my-8" />

          {/* Revenue Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Estimated Revenue</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="yield" className="block text-sm font-medium text-gray-700 mb-1">Expected Yield (e.g., in kg)</label>
                <input type="number" name="yield" id="yield" value={revenue.yield} onChange={handleRevenueChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Market Price (per unit)</label>
                <input type="number" name="price" id="price" value={revenue.price} onChange={handleRevenueChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm sticky top-28">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Financial Summary</h2>
          <div className="space-y-5">
            <div className="flex justify-between items-center p-4 bg-red-50 border-l-4 border-red-500 rounded-r-md">
              <span className="font-medium text-red-800">Total Costs</span>
              <span className="font-bold text-lg text-red-900">₹{results.totalCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-green-50 border-l-4 border-green-500 rounded-r-md">
              <span className="font-medium text-green-800">Total Revenue</span>
              <span className="font-bold text-lg text-green-900">₹{results.totalRevenue.toLocaleString()}</span>
            </div>
            <div className={`flex justify-between items-center p-4 rounded-r-md text-white ${results.profit >= 0 ? 'bg-green-600 border-l-4 border-green-800' : 'bg-red-600 border-l-4 border-red-800'}`}>
              <span className="font-semibold">Estimated Profit</span>
              <div className="flex items-center gap-1">
                {results.profit >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                <span className="font-bold text-xl">₹{results.profit.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MspDisplay/>
    </section>
  );
};

export default CostCalculator;

