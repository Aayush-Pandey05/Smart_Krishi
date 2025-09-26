import React from 'react';
import { BookOpen, Search, ExternalLink, Calendar, Droplets, AlertTriangle } from 'lucide-react';

// Search Bar Component
const SearchBar = ({ query, setQuery, onSearch, availableCrops, onTagClick }) => (
  <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm max-w-4xl mx-auto">
    <h2 className="text-xl font-semibold text-gray-800">Search by Crop Name</h2>
    <p className="text-gray-500 mt-1 mb-6">
      Enter your crop name to get specific fertilizer and pesticide recommendations with dosage and timing
    </p>
    
    <div className="flex items-center gap-4 mb-4">
      <div className="relative flex-grow">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
          placeholder="Search for crops (e.g., wheat, rice, maize, pulses, potato, tomato)"
          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <button 
        onClick={onSearch} 
        className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
      >
        <Search className="w-5 h-5" />
        Search
      </button>
    </div>

    <div className="flex flex-wrap gap-2">
      <span className="text-sm text-gray-500 mr-2">Quick search:</span>
      {availableCrops.map(crop => (
        <button
          key={crop}
          onClick={() => onTagClick(crop)}
          className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full border hover:bg-gray-200 transition-colors capitalize"
        >
          {crop}
        </button>
      ))}
    </div>
  </div>
);

// Empty State Component
const EmptyState = ({ availableCrops, onTagClick }) => (
  <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center">
    <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
    <h3 className="text-xl font-semibold text-gray-800">Search for Crop Information</h3>
    <p className="text-gray-500 mt-2">
      Enter a crop name in the search box above to get detailed fertilizer and pesticide recommendations with proper dosage and timing.
    </p>
    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-2">
      {availableCrops.map(crop => (
        <button
          key={crop}
          onClick={() => onTagClick(crop)}
          className="px-4 py-2 bg-green-50 text-green-700 text-sm rounded-lg border border-green-200 hover:bg-green-100 transition-colors capitalize font-medium"
        >
          {crop}
        </button>
      ))}
    </div>
  </div>
);

// Not Found State Component
const NotFoundState = ({ searchTerm, availableCrops, onTagClick }) => (
  <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center">
    <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
      <Search className="w-8 h-8 text-red-500" />
    </div>
    <h3 className="text-xl font-semibold text-red-600">No Information Found</h3>
    <p className="text-gray-500 mt-2">
      Sorry, we don't have information for "{searchTerm}". Please try one of the available crops:
    </p>
    <div className="mt-4 flex flex-wrap justify-center gap-2">
      {availableCrops.map(crop => (
        <button
          key={crop}
          onClick={() => onTagClick(crop)}
          className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full border hover:bg-gray-200 transition-colors capitalize"
        >
          {crop}
        </button>
      ))}
    </div>
  </div>
);

// Crop Header Component
const CropHeader = ({ cropName }) => (
  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border">
    <h2 className="text-2xl font-bold text-gray-800 capitalize flex items-center gap-3">
      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
        <BookOpen className="w-5 h-5 text-white" />
      </div>
      {cropName} - Complete Guide
    </h2>
    <p className="text-gray-600 mt-2">
      Comprehensive fertilizer and pesticide recommendations with proper dosage and application timing
    </p>
  </div>
);

// Safety Notes Component
const SafetyNotes = () => (
  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
    <div className="flex items-start">
      <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
      <div>
        <h4 className="font-semibold text-yellow-800">Important Safety Notes</h4>
        <ul className="text-yellow-700 text-sm mt-1 space-y-1">
          <li>• Always read and follow label instructions before use</li>
          <li>• Wear appropriate protective equipment during application</li>
          <li>• Observe pre-harvest intervals for pesticides</li>
          <li>• Store chemicals safely away from children and animals</li>
          <li>• Consult local agricultural extension officers for region-specific advice</li>
        </ul>
      </div>
    </div>
  </div>
);

export { SearchBar, EmptyState, NotFoundState, CropHeader, SafetyNotes };