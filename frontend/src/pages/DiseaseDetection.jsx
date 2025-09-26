import React, { useState, useLayoutEffect, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { gsap } from 'gsap';
import { Camera, UploadCloud, AlertTriangle } from 'lucide-react';
import Header2 from '../components/Header2';


const DiseaseDetectionPage = () => {
  const [file, setFile] = useState(null);
  const componentRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".animate-in", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, componentRef);
    return () => ctx.revert();
  }, []);
  
  // React Dropzone setup
  const onDrop = useCallback(acceptedFiles => {
    // Take the first file and create a preview URL
    const acceptedFile = acceptedFiles[0];
    if (acceptedFile) {
      setFile(Object.assign(acceptedFile, {
        preview: URL.createObjectURL(acceptedFile)
      }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    multiple: false,
  });

  // Cleanup the object URL to prevent memory leaks
  React.useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  return (
    <main ref={componentRef} className="bg-green-50/50 font-sans min-h-screen py-20 mt-10">
      <div className="container mx-auto px-4">
        
       <Header2/>
        <div className="text-center mb-12 animate-in">
          <div className="inline-block bg-green-600 text-white p-4 rounded-full mb-4">
            <Camera className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight flex items-center justify-center gap-3">
            <span className='h-[7vh] '> 📸 </span>
           Crop Disease Detection
          </h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-600">
            Upload a leaf image to get instant AI-powered disease diagnosis and treatment recommendations.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Uploader */}
          <div className="space-y-8 animate-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800">Upload Leaf Image</h2>
              <p className="text-gray-500 mt-1">Take a clear photo of the affected leaf for best results</p>
              
              <div {...getRootProps()} className={`mt-6 p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isDragActive ? 'border-green-600 bg-green-50' : 'border-gray-300 hover:border-green-500'}`}>
                <input {...getInputProps()} />
                <UploadCloud className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                {isDragActive ? (
                  <p className="text-lg font-semibold text-green-700">Drop the image here ...</p>
                ) : (
                  <div>
                    <p className="text-lg font-semibold text-gray-700">Drag & drop your image here</p>
                    <p className="text-gray-500 my-2">or click to browse your files</p>
                    <button type="button" className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-200">
                      Choose File
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Photography Tips */}
            <div className=" p-8 rounded-xl border border-yellow-300 bg-yellow-50/50 animate-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Photography Tips</h3>
                  <ul className="mt-3 list-disc list-inside text-gray-600 space-y-1">
                    <li>Take photos in good natural lighting</li>
                    <li>Focus on a single leaf with clear symptoms</li>
                    <li>Ensure the leaf fills most of the frame</li>
                    <li>Avoid blurry or overexposed images</li>
                    <li>Include both healthy and affected areas</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Preview / Placeholder */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm sticky top-28 animate-in" style={{ animationDelay: '0.3s' }}>
            {file ? (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Image Preview & Diagnosis</h2>
                <div className="mb-4 rounded-lg overflow-hidden border">
                  <img src={file.preview} alt="Uploaded leaf preview" className="w-full h-auto object-cover" />
                </div>
                <p className="text-sm text-gray-500 mb-4">Filename: {file.name}</p>
                <button className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors">
                  Start Diagnosis
                </button>
              </div>
            ) : (
              <div className="text-center py-16">
                <Camera className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">Upload an Image to Start</h3>
                <p className="text-gray-500 mt-2 max-w-xs mx-auto">Select a clear image of the affected leaf to get AI-powered disease diagnosis.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DiseaseDetectionPage;