import React, { useState, useMemo } from 'react';
import { cropData } from '../components/CropData';
import { SearchBar, EmptyState, NotFoundState, CropHeader, SafetyNotes } from '../components/SearchUI';
import { ProductResults } from '../components/ProductDisplay';
import GovernmentSchemes from '../components/GovernmentSchemes'
import govSchemesData from '../components/govSchemesData'
import { BookOpenCheck, Pill } from 'lucide-react'; 
import Header2 from '../components/Header2'

const FertilizerData = () => {
const [query, setQuery] = useState('');
const [searchTerm, setSearchTerm] = useState(''); 
const handleSearch = () => {
setSearchTerm(query.toLowerCase().trim()); }; 
const handleTagClick = (cropName) => {
setQuery(cropName);
 setSearchTerm(cropName.toLowerCase());
};

 const searchResults = useMemo(() => {
 if (!searchTerm) return null;

 const exactMatch = cropData[searchTerm];
 if (exactMatch) return { crop: searchTerm, data: exactMatch };
 
 const partialMatch = Object.keys(cropData).find(key => 
 key.includes(searchTerm) || searchTerm.includes(key)
 );
 
 if (partialMatch) return { crop: partialMatch, data: cropData[partialMatch] };
 
 return 'notFound';
 }, [searchTerm]);

 const availableCrops = Object.keys(cropData);

 return (
 <>
   <div>
  <Header2/>
  <div className="text-center py-12 px-4 bg-green-50/50 border-b border-green-100 mt-18">
    <div className="inline-block bg-green-100 text-green-600 p-4 rounded-full mb-4">
      <BookOpenCheck className="w-8 h-8" />
    </div>
    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
      <Pill className="w-8 h-8 text-rose-500 -rotate-45" />
      Fertilizer & Pesticide Guide
    </h1>
    <p className="mt-2 text-gray-600 max-w-2xl mx-auto text-lg">
      Find the right fertilizers and pesticides for your crops with dosage recommendations and safety instructions.
    </p>
  </div>
  

  <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} availableCrops={availableCrops}
 onTagClick={handleTagClick} />
<div className="mt-8 max-w-4xl mx-auto px-4">
 {searchResults === null && (
 <EmptyState availableCrops={availableCrops} onTagClick={handleTagClick}/>)}
 
 {searchResults === 'notFound' && (
<NotFoundState searchTerm={searchTerm} availableCrops={availableCrops} onTagClick={handleTagClick}/>)}

 {searchResults && searchResults !== 'notFound' && (
<div className="space-y-8">
 <CropHeader cropName={searchResults.crop} />
<ProductResults searchResults={searchResults} />
<SafetyNotes /> </div> )}
</div>
<GovernmentSchemes schemes={govSchemesData} />
  </div>
</>
);
};

export default FertilizerData;