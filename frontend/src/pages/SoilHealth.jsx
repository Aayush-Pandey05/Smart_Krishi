import React, { useState, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { TestTube2, FlaskConical, BarChart, ImageUp } from 'lucide-react';
import Header2 from '../components/Header2';

const SoilHealthAnalyzerPage = () => {
  const [activeTab, setActiveTab] = useState('image'); // Default to 'image' tab
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    phLevel: '6.5',
    moisture: '60',
    nitrogen: 'Medium',
    phosphorus: 'High',
    potassium: 'Low',
  });

  // React Dropzone setup
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    if (file) {
      setImageFile(Object.assign(file, {
        preview: URL.createObjectURL(file)
      }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    multiple: false,
  });

  // Cleanup the image preview URL to prevent memory leaks
  React.useEffect(() => {
    return () => {
      if (imageFile) {
        URL.revokeObjectURL(imageFile.preview);
      }
    };
  }, [imageFile]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Manual Soil Data:", formData);
    alert("Manual soil data submitted! Check the console.");
  };

  const handleImageSubmit = () => {
    if (!imageFile) return;
    console.log("Submitting Image for Analysis:", imageFile);
    alert("Image submitted for analysis! Check the console.");
  };

  const tabButtonStyles = "px-6 py-3 text-sm font-semibold rounded-md transition-colors duration-300";
  const activeTabStyles = "bg-white text-gray-800 shadow-sm";
  const inactiveTabStyles = "bg-transparent text-gray-500 hover:bg-white/50";

  return (
    <main className="bg-gray-50 font-sans min-h-screen py-20 mt-10">
      <div className="container mx-auto px-4">
      <Header2/>
        <div className="text-center mb-12">
          <div className="inline-block bg-orange-500 text-white p-4 rounded-full mb-4">
            <FlaskConical className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight flex items-center justify-center gap-3">
            <TestTube2 className="w-12 h-12 text-green-700" />
            Soil Health Analyzer
          </h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-600">
            Analyze your soil through image upload or manual data entry to optimize crop selection and fertility.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-gray-200 p-1 rounded-lg flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('image')}
              className={`${tabButtonStyles} ${activeTab === 'image' ? activeTabStyles : inactiveTabStyles}`}
            >
              Image Upload
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`${tabButtonStyles} ${activeTab === 'manual' ? activeTabStyles : inactiveTabStyles}`}
            >
              Manual Entry
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            {activeTab === 'image' ? (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Upload Soil Image</h2>
                <p className="text-gray-500 mt-1 mb-8">Take a clear photo of your soil sample for AI analysis</p>
                <div {...getRootProps()} className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isDragActive ? 'border-green-600 bg-green-50' : 'border-gray-300 hover:border-green-500'}`}>
                  <input {...getInputProps()} />
                  <ImageUp className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  {isDragActive ? (
                    <p className="text-lg font-semibold text-green-700">Drop the image here ...</p>
                  ) : (
                    <div>
                      <p className="text-lg font-semibold text-gray-700">Upload Soil Image</p>
                      <p className="text-gray-500 my-2">Take a photo of your soil sample</p>
                      <button type="button" className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-200">
                        Choose File
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Manual Soil Data</h2>
                <p className="text-gray-500 mt-1 mb-8">Enter your soil test results manually</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phLevel" className="block text-sm font-medium text-gray-700 mb-1">pH Level *</label>
                      <input type="number" name="phLevel" id="phLevel" value={formData.phLevel} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                    <div>
                      <label htmlFor="moisture" className="block text-sm font-medium text-gray-700 mb-1">Moisture % *</label>
                      <input type="number" name="moisture" id="moisture" value={formData.moisture} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                    <div>
                      <label htmlFor="nitrogen" className="block text-sm font-medium text-gray-700 mb-1">Nitrogen Level</label>
                      <input type="text" name="nitrogen" id="nitrogen" value={formData.nitrogen} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                    <div>
                      <label htmlFor="phosphorus" className="block text-sm font-medium text-gray-700 mb-1">Phosphorus Level</label>
                      <input type="text" name="phosphorus" id="phosphorus" value={formData.phosphorus} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="potassium" className="block text-sm font-medium text-gray-700 mb-1">Potassium Level</label>
                      <input type="text" name="potassium" id="potassium" value={formData.potassium} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                  </div>
                  <button type="submit" className="w-full mt-4 bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                    <BarChart className="w-5 h-5" />
                    Analyze Soil Data
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm sticky top-28 text-center">
            {activeTab === 'image' && imageFile ? (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Image Preview</h3>
                <div className="mb-4 rounded-lg overflow-hidden border">
                  <img src={imageFile.preview} alt="Uploaded soil preview" className="w-full h-auto object-cover" />
                </div>
                <p className="text-sm text-gray-500 mb-4 truncate">File: {imageFile.name}</p>
                <button onClick={handleImageSubmit} className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors">
                  Analyze Image
                </button>
              </div>
            ) : (
              <div>
                <TestTube2 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">Analyze Your Soil</h3>
                <p className="text-gray-500 mt-2 max-w-xs mx-auto">Upload a soil image or enter manual data to get detailed soil health analysis.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SoilHealthAnalyzerPage;

