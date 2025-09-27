import React, { useState, useMemo } from 'react';
import { BookOpenCheck, Pill, Search, Info, AlertTriangle, ShieldCheck, Bell, ExternalLink, HelpCircle } from 'lucide-react';
import Header2 from '../components/Header2';

// --- Comprehensive Crop Data ---
const cropData = {
  wheat: {
    fertilizers: [
      {
        name: 'DAP (Di-Ammonium Phosphate)',
        stage: 'Sowing',
        dosage: '50-60 kg/acre',
        notes: 'Good source of phosphorus for root development. Apply at sowing time.',
        link: 'https://www.iffcobazar.in/en/page/dap-fertilizer'
      },
      {
        name: 'Urea',
        stage: 'Tillering (30-35 days)',
        dosage: '25-30 kg/acre',
        notes: 'Provides essential nitrogen for leaf growth. Split application recommended.',
        link: 'https://www.iffcobazar.in/en/page/urea-fertilizer'
      },
      {
        name: 'Potassium Chloride (MOP)',
        stage: 'Crown Root Initiation',
        dosage: '15-20 kg/acre',
        notes: 'Essential for grain filling and disease resistance.',
        link: 'https://www.iffcobazar.in/en/page/mop-fertilizer'
      },
      {
        name: 'NPK 12-32-16',
        stage: 'Basal Application',
        dosage: '40-50 kg/acre',
        notes: 'Complete balanced fertilizer for overall plant nutrition.',
        link: 'https://www.coromandel.biz/product-category/fertilizers/complex-fertilizers/'
      }
    ],
    pesticides: [
      {
        name: 'Clodinafop-propargyl',
        target: 'Grassy Weeds (Phalaris minor)',
        dosage: '60g/acre',
        notes: 'Post-emergent herbicide. Apply 30-35 days after sowing.',
        link: 'https://www.bayer.com/en/agriculture/products-and-services/crop-protection'
      },
      {
        name: 'Propiconazole',
        target: 'Rust, Powdery Mildew',
        dosage: '100-125ml/acre',
        notes: 'Systemic fungicide. Apply at flag leaf stage.',
        link: 'https://www.syngenta.co.in/fungicides'
      },
      {
        name: 'Chlorpyriphos',
        target: 'Aphids, Termites',
        dosage: '500ml/acre',
        notes: 'Soil application for termite control. Foliar spray for aphids.',
        link: 'https://www.tatachemicals.com/plant-protection'
      }
    ]
  },
  rice: {
    fertilizers: [
      {
        name: 'Urea',
        stage: 'Basal + Top dressing',
        dosage: '45-50 kg/acre',
        notes: 'Split application: 50% basal, 25% at tillering, 25% at panicle initiation.',
        link: 'https://www.iffcobazar.in/en/page/urea-fertilizer'
      },
      {
        name: 'Single Super Phosphate (SSP)',
        stage: 'Basal Application',
        dosage: '60-80 kg/acre',
        notes: 'Apply before transplanting. Rich in phosphorus and sulfur.',
        link: 'https://www.iffcobazar.in/en/page/ssp-fertilizer'
      },
      {
        name: 'Muriate of Potash (MOP)',
        stage: 'Basal + Panicle Initiation',
        dosage: '25-30 kg/acre',
        notes: 'Split application: 50% basal, 50% at panicle initiation.',
        link: 'https://www.iffcobazar.in/en/page/mop-fertilizer'
      },
      {
        name: 'NPK 20-20-0-13 (with Sulfur)',
        stage: 'Basal Application',
        dosage: '50 kg/acre',
        notes: 'Complete fertilizer with sulfur for better grain quality.',
        link: 'https://www.coromandel.biz/product-category/fertilizers/complex-fertilizers/'
      }
    ],
    pesticides: [
      {
        name: 'Butachlor',
        target: 'Grassy and Broadleaf Weeds',
        dosage: '1000-1250ml/acre',
        notes: 'Pre-emergence herbicide. Apply 3-5 days after transplanting.',
        link: 'https://www.syngenta.co.in/herbicides'
      },
      {
        name: 'Tricyclazole',
        target: 'Blast Disease',
        dosage: '150-200g/acre',
        notes: 'Preventive fungicide. Apply at tillering and booting stage.',
        link: 'https://www.bayer.com/en/agriculture/products-and-services/crop-protection'
      },
      {
        name: 'Fipronil',
        target: 'Brown Plant Hopper, Stem Borer',
        dosage: '40-50g/acre',
        notes: 'Systemic insecticide. Single application provides long protection.',
        link: 'https://www.tatachemicals.com/plant-protection'
      }
    ]
  },
  maize: {
    fertilizers: [
        { name: 'DAP', stage: 'Basal Application', dosage: '50-60 kg/acre', notes: 'Apply at planting for strong root development.', link: 'https://www.iffcobazar.in/en/page/dap-fertilizer' },
        { name: 'Urea', stage: '6-leaf stage + Tasseling', dosage: '60-70 kg/acre', notes: 'Split application: 50% at 6-leaf stage, 50% at tasseling.', link: 'https://www.iffcobazar.in/en/page/urea-fertilizer' },
    ],
    pesticides: [
        { name: 'Atrazine', target: 'Broadleaf Weeds', dosage: '500-750g/acre', notes: 'Pre-emergence herbicide. Apply within 2 days of sowing.', link: 'https://www.syngenta.co.in/herbicides' },
    ]
  },
  pulses: {
      fertilizers: [
          { name: 'DAP', stage: 'Sowing', dosage: '40-50 kg/acre', notes: 'Provides phosphorus for nodulation and root development.', link: 'https://www.iffcobazar.in/en/page/dap-fertilizer' },
      ],
      pesticides: [
          { name: 'Pendimethalin', target: 'Grassy and Broadleaf Weeds', dosage: '750ml/acre', notes: 'Pre-emergence herbicide. Apply within 2 days of sowing.', link: 'https://www.syngenta.co.in/herbicides' },
      ]
  },
  potato: {
      fertilizers: [
          { name: 'NPK 12-32-16', stage: 'Planting', dosage: '80-100 kg/acre', notes: 'Complete fertilizer for initial growth and tuber development.', link: 'https://www.coromandel.biz/product-category/fertilizers/complex-fertilizers/' },
      ],
      pesticides: [
          { name: 'Metalaxyl + Mancozeb', target: 'Late Blight', dosage: '600-800g/acre', notes: 'Systemic + contact fungicide. Apply preventively during cool weather.', link: 'https://www.syngenta.co.in/fungicides' },
      ]
  },
  tomato: {
      fertilizers: [
          { name: 'NPK 19-19-19', stage: 'Vegetative Growth', dosage: '10-15g/plant/week', notes: 'Balanced nutrition during early growth phase.', link: 'https://www.coromandel.biz/product-category/fertilizers/complex-fertilizers/' },
      ],
      pesticides: [
          { name: 'Azoxystrobin', target: 'Early Blight, Late Blight', dosage: '100-150ml/acre', notes: 'Systemic fungicide. Apply at first sign of disease.', link: 'https://www.syngenta.co.in/fungicides' },
      ]
  }
};

// Comprehensive Government Schemes Data
const govSchemesData = [
    { title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)", description: "Provides insurance coverage and financial support to farmers against crop failure due to natural calamities, pests, or diseases.", link: "https://pmfby.gov.in/" },
    { title: "Soil Health Card Scheme", description: "Provides farmers with soil health cards, carrying crop-wise recommendations of nutrients and fertilizers required for individual farms.", link: "https://soilhealth.dac.gov.in/" },
    { title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)", description: "A central scheme providing income support of ₹6,000 per year in three equal installments to all landholding farmer families.", link: "https://pmkisan.gov.in/" },
    { title: "Kisan Credit Card (KCC) Scheme", description: "Aims at providing adequate and timely credit support from the banking system to farmers for their cultivation and other needs.", link: "https://www.sbi.co.in/web/agri-rural/agriculture-banking/crop-finance/kisan-credit-card" },
];


// --- UI Sub-components ---
const SearchBar = ({ query, setQuery, onSearch, onTagClick }) => {
    const availableCrops = Object.keys(cropData);
    return (
        <div className="max-w-4xl mx-auto px-4">
            <div className="relative">
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && onSearch()} placeholder="Search for a crop (e.g., Wheat, Rice...)" className="w-full pl-5 pr-32 py-4 bg-gray-800 border-2 border-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" />
                <button onClick={onSearch} className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors">Search</button>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
                {availableCrops.map(crop => (<button key={crop} onClick={() => onTagClick(crop)} className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 transition-colors">{crop.charAt(0).toUpperCase() + crop.slice(1)}</button>))}
            </div>
        </div>
    );
};

const EmptyState = () => (<div className="bg-[#1C1C1E] rounded-lg p-8 text-center border border-gray-800"><Info className="w-12 h-12 mx-auto text-gray-600 mb-4" /><h3 className="text-xl font-semibold text-white">Search for a Crop</h3><p className="text-gray-400 mt-2">Use the search bar above or select a crop to get started.</p></div>);
const NotFoundState = ({ searchTerm }) => (<div className="bg-[#1C1C1E] rounded-lg p-8 text-center border border-gray-800"><AlertTriangle className="w-12 h-12 mx-auto text-yellow-500 mb-4" /><h3 className="text-xl font-semibold text-white">No Results Found for "{searchTerm}"</h3><p className="text-gray-400 mt-2">Please check the spelling or try searching for another crop.</p></div>);
const CropHeader = ({ cropName }) => (<h2 className="text-3xl font-bold text-white capitalize">Recommendations for {cropName}</h2>);

const ProductResults = ({ searchResults }) => {
    const ProductCard = ({ product, type }) => (<div className="bg-[#1C1C1E] p-6 rounded-lg border border-gray-800 space-y-3"><h4 className="font-bold text-lg text-white">{product.name}</h4><p className="text-sm text-gray-400"><span className="font-semibold text-gray-300">{type === 'fertilizer' ? 'Stage' : 'Target'}:</span> {product.stage || product.target}</p><p className="text-sm text-gray-400"><span className="font-semibold text-gray-300">Dosage:</span> {product.dosage}</p><p className="text-sm text-gray-400 italic">"{product.notes}"</p><a href={product.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-green-400 hover:text-green-300 transition-colors pt-2">Learn More <ExternalLink className="w-4 h-4" /></a></div>);
    return (<div className="grid md:grid-cols-2 gap-8"><div><h3 className="text-2xl font-semibold text-white mb-4">Fertilizers</h3><div className="space-y-4">{searchResults.data.fertilizers.map(f => <ProductCard key={f.name} product={f} type="fertilizer" />)}</div></div><div><h3 className="text-2xl font-semibold text-white mb-4">Pesticides</h3><div className="space-y-4">{searchResults.data.pesticides.map(p => <ProductCard key={p.name} product={p} type="pesticide" />)}</div></div></div>);
};

const SafetyNotes = () => (<div className="bg-yellow-900/30 p-6 rounded-lg border border-yellow-500/50 flex items-start gap-4"><ShieldCheck className="w-8 h-8 text-yellow-400 shrink-0 mt-1" /><div><h3 className="text-xl font-semibold text-white">Safety First</h3><p className="text-yellow-200 mt-1">Always wear protective gear when handling chemicals. Follow the manufacturer's instructions carefully and store products in a secure location.</p></div></div>);

const GovernmentSchemes = ({ schemes }) => (
    <div className="mt-12 max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-4">Related Government Schemes</h2>
        <div className="space-y-4">
            {schemes.map(scheme => (
                <div key={scheme.title} className="bg-[#1C1C1E] p-6 rounded-lg border border-gray-800">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-semibold text-green-400">{scheme.title}</h3>
                            <p className="text-gray-400 text-sm mt-1 pr-4">{scheme.description}</p>
                        </div>
                        <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors shrink-0">
                            Learn More <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ApplicationHelp = () => (
    <div className="mt-8 max-w-4xl mx-auto px-4">
        <div className="bg-blue-900/30 p-6 rounded-lg border border-blue-500/50 flex items-start gap-4">
            <HelpCircle className="w-8 h-8 text-blue-400 shrink-0 mt-1" />
            <div>
                <h3 className="text-xl font-semibold text-white">Help with Application</h3>
                <p className="text-blue-200 mt-1 mb-3">For assistance with scheme applications, visit the official government portals or contact your local agriculture office.</p>
                <a href="https://www.india.gov.in/topics/agriculture" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-blue-200 transition-colors">
                    Visit National Farmers' Portal <ExternalLink className="w-4 h-4" />
                </a>
            </div>
        </div>
    </div>
);

const FertilizerData = () => {
    const [query, setQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => setSearchTerm(query.toLowerCase().trim());
    const handleTagClick = (cropName) => {
        setQuery(cropName);
        setSearchTerm(cropName.toLowerCase());
    };

    const searchResults = useMemo(() => {
        if (!searchTerm) return null;
        const searchKey = searchTerm.toLowerCase();
        const exactMatch = cropData[searchKey];
        if (exactMatch) return { crop: searchKey, data: exactMatch };
        const partialMatch = Object.keys(cropData).find(key => key.includes(searchKey));
        if (partialMatch) return { crop: partialMatch, data: cropData[partialMatch] };
        return 'notFound';
    }, [searchTerm]);

    return (
        <div className="bg-black">
            <Header2 />
            <main className="ml-64 flex-1 bg-[#121212] min-h-screen">
                <header className="flex items-center justify-between p-8 border-b border-gray-800">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Fertilizer & Pesticide Guide</h1>
                        <p className="mt-2 text-gray-400">Find the right products for your crops.</p>
                    </div>
                    <div className="flex items-center">
                        <button className="p-2 rounded-full hover:bg-gray-800 transition-colors"><Bell className="w-5 h-5 text-gray-400" /></button>
                        <div className="ml-4 w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-sm">JD</div>
                    </div>
                </header>
                
                <div className="py-8">
                    <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} onTagClick={handleTagClick} />
                    <div className="mt-8 max-w-4xl mx-auto px-4">
                        {searchResults === null && <EmptyState />}
                        {searchResults === 'notFound' && <NotFoundState searchTerm={searchTerm} />}
                        {searchResults && searchResults !== 'notFound' && (
                            <div className="space-y-8">
                                <CropHeader cropName={searchResults.crop} />
                                <ProductResults searchResults={searchResults} />
                                <SafetyNotes />
                            </div>
                        )}
                    </div>
                    <GovernmentSchemes schemes={govSchemesData} />
                    <ApplicationHelp />
                </div>
            </main>
        </div>
    );
};

export default FertilizerData;

