import React, { useState, useLayoutEffect, useRef, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { gsap } from 'gsap';
import { UploadCloud, Check, Bell } from 'lucide-react';
import Header2 from '../components/Header2';

const DiseaseDetectionPage = () => {
  const [file, setFile] = useState(null); // Corrected syntax: = useState
  const componentRef = useRef(null);

  // GSAP animation setup
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".animate-in", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, componentRef);
    return () => ctx.revert();
  }, []);

  // React Dropzone setup
  const onDrop = useCallback(acceptedFiles => {
    const acceptedFile = acceptedFiles[0];
    if (acceptedFile) {
      setFile(Object.assign(acceptedFile, {
        preview: URL.createObjectURL(acceptedFile)
      }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
    multiple: false,
  });

  // Cleanup the object URL
  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  const photographyTips = [
    { text: "Clear Focus: Ensure the leaf is in sharp focus." },
    { text: "Good Lighting: Use natural, even lighting. Avoid shadows." },
    { text: "Plain Background: Place the leaf on a neutral, contrasting background." },
    { text: "Fill the Frame: The leaf should take up most of the image area." },
    { text: "Show Symptoms: Capture the part of the leaf showing disease symptoms clearly." },
  ];

  const handleAnalyze = () => {
      if (!file) return;
      alert(`Analyzing image: ${file.name}`);
      // Add your image analysis API call here
  };

  return (
    <div className="bg-black">
      <Header2 />
      <main ref={componentRef} className="ml-64 flex-1 bg-[#121212] min-h-screen p-8">
        <header className="flex items-center justify-between mb-8">
          <div className="animate-in">
            <h1 className="text-3xl font-bold text-white">Crop Disease Detection</h1>
            <p className="mt-2 text-gray-400">Upload an image of a plant leaf to detect diseases.</p>
          </div>
          <div className='flex flex-row justify-center animate-in'>
            <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
              <Bell className="w-5 h-5 text-gray-400" />
            </button>
            <div className="ml-4 w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-sm">
              JD
            </div>
          </div>
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          {/* Left Column (Main Content) */}
          <div className="xl:col-span-2 space-y-8">
            {/* Uploader Card */}
            <div className="bg-[#1C1C1E] rounded-lg p-6 animate-in border border-gray-800 shadow-lg shadow-black/20" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-xl font-semibold text-white">Upload Image</h2>
              <p className="text-sm text-gray-400 mt-1">Drag and drop your image or click to browse.</p>
              <div {...getRootProps()} className={`mt-6 p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isDragActive ? 'border-green-500 bg-green-900/20 ring-2 ring-green-500' : 'border-gray-600 hover:border-gray-500'}`}>
                <input {...getInputProps()} />
                <UploadCloud className="w-10 h-10 mx-auto text-gray-500 mb-3" />
                {isDragActive ? (
                  <p className="text-lg font-semibold text-green-400">Drop files here...</p>
                ) : (
                  <div>
                    <p className="font-semibold text-white">Drag & drop files here</p>
                    <p className="text-sm text-gray-500 my-2">or</p>
                    <button type="button" className="px-5 py-2 bg-green-600 text-white text-sm font-semibold rounded-md hover:bg-green-700 transition-colors">
                      Browse Files
                    </button>
                    <p className="text-xs text-gray-500 mt-4">Supported formats: PNG, JPG, JPEG up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Uploaded Image Preview Card OR Placeholder */}
            {file ? (
                <div className="bg-[#1C1C1E] rounded-lg p-6 animate-in border border-gray-800 shadow-lg shadow-black/20" style={{ animationDelay: '0.2s' }}>
                  <h2 className="text-xl font-semibold text-white">Uploaded Image Preview</h2>
                  <p className="text-sm text-gray-400 mt-1">This is a preview of the image you've uploaded.</p>
                  <div className="mt-4 w-full h-80 bg-gray-900/50 rounded-md flex items-center justify-center border border-gray-700">
                      <img src={file.preview} alt="Preview" className="max-h-full max-w-full object-contain rounded-md" />
                  </div>
                </div>
            ) : (
                // --- This is the restored placeholder div ---
                <div className="bg-[#1C1C1E] rounded-lg p-6 animate-in border border-gray-800 shadow-lg shadow-black/20 text-center flex flex-col justify-center h-[26.5rem]" style={{ animationDelay: '0.2s' }}>
                   <UploadCloud className="w-12 h-12 mx-auto text-gray-600 mb-4" />
                   <h3 className="text-xl font-semibold text-white">Upload an Image to Start</h3>
                   <p className="text-gray-500 mt-2 max-w-xs mx-auto">Your uploaded image preview will appear here once you select a file.</p>
                </div>
            )}
          </div>

          {/* Right Column (Sidebar) */}
          <div className="xl:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Photography Tips Card */}
              <div className="bg-[#1C1C1E] rounded-lg p-6 animate-in border border-gray-800 shadow-lg shadow-black/20" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-xl font-semibold text-white">Photography Tips</h3>
                <p className="text-sm text-gray-400 mt-1">For the best detection results.</p>
                <ul className="mt-5 space-y-4">
                  {photographyTips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-green-500/30 text-green-400 rounded-full flex items-center justify-center mr-3 mt-1 ring-1 ring-green-500/50">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">{tip.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Analyze Image Button */}
              <div className="animate-in" style={{ animationDelay: '0.4s' }}>
                <button
                  onClick={handleAnalyze}
                  disabled={!file}
                  className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-100"
                >
                  Analyze Image
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DiseaseDetectionPage;

