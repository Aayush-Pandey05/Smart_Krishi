import React from 'react';
import { ExternalLink, Calendar, Droplets, AlertTriangle, Beaker, FlaskConical } from 'lucide-react';

// Individual Product Item Component
const ProductItem = ({ item, index }) => (
  <div key={index} className="p-4 bg-gray-50 rounded-md border-l-4 border-green-500">
    <div className="flex justify-between items-start mb-2">
      <p className="font-semibold text-gray-700 text-lg">{item.name}</p>
      {item.link && (
        <a 
          href={item.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 transition-colors"
          title="View product details"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
      <div className="flex items-center text-sm text-gray-600">
        <Calendar className="w-4 h-4 mr-2 text-blue-500" />
        <span><strong>Stage:</strong> {item.stage || item.target}</span>
      </div>
      {item.dosage && (
        <div className="flex items-center text-sm text-gray-600">
          <Droplets className="w-4 h-4 mr-2 text-orange-500" />
          <span><strong>Dosage:</strong> {item.dosage}</span>
        </div>
      )}
    </div>
    
    <div className="flex items-start text-sm text-gray-600">
      <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500 flex-shrink-0 mt-0.5" />
      <span><strong>Notes:</strong> {item.notes}</span>
    </div>
  </div>
);

// Result Card Component (Fertilizer/Pesticide Cards)
const ResultCard = ({ title, data, icon: Icon }) => (
  <div className="bg-white p-6 rounded-lg border shadow-sm">
    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
      <Icon className="w-6 h-6 mr-3 text-green-600" />
      {title} Recommendations
    </h3>
    <div className="space-y-4">
      {data.map((item, index) => (
        <ProductItem key={index} item={item} index={index} />
      ))}
    </div>
  </div>
);

// Product Results Display Component
const ProductResults = ({ searchResults }) => (
  <div className="space-y-8">
    <ResultCard 
      title="Fertilizer" 
      data={searchResults.data.fertilizers} 
      icon={Beaker} 
    />
    
    <ResultCard 
      title="Pesticide" 
      data={searchResults.data.pesticides} 
      icon={FlaskConical} 
    />
  </div>
);

export { ProductItem, ResultCard, ProductResults };