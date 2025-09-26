import React from 'react';
import { IndianRupee, ExternalLink } from 'lucide-react';

// Expanded MSP data now lives inside the component for this example.
// In a real application, this would likely be passed in as a prop.
const mspData = [
  { crop: 'Paddy (Common)', msp: '2,300', icon: '🌾' },
  { crop: 'Wheat', msp: '2,275', icon: '🌾' },
  { crop: 'Jowar (Hybrid)', msp: '3,371', icon: '🌽' },
  { crop: 'Bajra', msp: '2,625', icon: '🌱' },
  { crop: 'Tur (Arhar)', msp: '7,550', icon: '🌰' },
  { crop: 'Moong', msp: '8,682', icon: '🟢' },
  { crop: 'Gram', msp: '5,650', icon: '🧆' },
  { crop: 'Masur', msp: '6,425', icon: '🟤' },
];


const MspDisplay = () => {
  return (
    <div className="mt-20 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
          <IndianRupee className="w-8 h-8 text-green-600" />
          Minimum Support Prices (MSP)
        </h2>
        <p className="mt-3 text-gray-600">Latest MSP for Kharif & Rabi Crops (per quintal) to ensure fair prices for farmers.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 text-center">
        {mspData.map((item) => (
          <div key={item.crop} className="bg-gray-50 p-6 rounded-lg border border-gray-200 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
            <div className="text-3xl mb-3">{item.icon}</div>
            <h3 className="font-semibold text-gray-700 text-sm">{item.crop}</h3>
            <p className="text-xl font-bold text-green-700 mt-1">₹{item.msp}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <a
          href="http://desagri.gov.in/wp-content/uploads/2025/08/MSP-Statement_English.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-100 text-green-800 font-semibold py-3 px-6 rounded-lg hover:bg-green-200 transition-colors duration-300"
        >
          View Official MSP Data
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default MspDisplay;

