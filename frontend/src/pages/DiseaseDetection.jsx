import React, {
  useState,
  useLayoutEffect,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { useDropzone } from "react-dropzone";
import { gsap } from "gsap";
import {
  Camera,
  UploadCloud,
  AlertTriangle,
  Loader2,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import Header2 from "../components/Header2";
import { useFormStore } from "../store/useFormStore";

const DiseaseDetectionPage = () => {
  const [file, setFile] = useState(null);
  const componentRef = useRef(null);

  // Get store data and actions
  const {
    userDiseaseData,
    isUploading,
    isLoadingData,
    currentPrediction,
    currentRecommendation,
    uploadImage,
    getUserDiseaseData,
    clearCurrentData,
  } = useFormStore();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".animate-in", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, componentRef);
    return () => ctx.revert();
  }, []);

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = async () => {
      await getUserDiseaseData();
    };

    loadUserData();

    // Cleanup function
    return () => {
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, []);

  // React Dropzone setup
  const onDrop = useCallback((acceptedFiles) => {
    const acceptedFile = acceptedFiles[0];
    if (acceptedFile) {
      setFile(
        Object.assign(acceptedFile, {
          preview: URL.createObjectURL(acceptedFile),
        })
      );
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    multiple: false,
  });

  // Handle diagnosis
  const handleStartDiagnosis = async () => {
    if (file) {
      const result = await uploadImage(file);
      if (result.success) {
        // Keep the file for preview but the data will be loaded from store
      }
    }
  };

  // Cleanup the object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  const renderRecommendationCard = () => {
    if (isLoadingData) {
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-green-600 mr-2" />
          <span className="text-gray-600">Loading your data...</span>
        </div>
      );
    }

    if (!currentPrediction || !currentRecommendation) {
      return (
        <div className="text-center py-16">
          <Camera className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">
            Upload an Image to Start
          </h3>
          <p className="text-gray-500 mt-2 max-w-xs mx-auto">
            Select a clear image of the affected leaf to get AI-powered disease
            diagnosis.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Disease Detection Result */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center mb-3">
            <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">
              Detection Result
            </h3>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Disease:</p>
            <p className="text-lg font-medium text-gray-800">
              {currentPrediction?.disease || "N/A"}
            </p>
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 text-blue-600 mr-1" />
              <span className="text-sm text-gray-600">
                Confidence:{" "}
                {currentPrediction?.confidence
                  ? `${currentPrediction.confidence}%`
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
            AI Recommendations
          </h3>

          <div className="space-y-4">
            {/* Treatment */}
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">
                Immediate Treatment
              </h4>
              <p className="text-sm text-gray-700">
                {currentRecommendation?.treatment || "N/A"}
              </p>
            </div>

            {/* Prevention */}
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">Prevention</h4>
              <p className="text-sm text-gray-700">
                {currentRecommendation?.prevention || "N/A"}
              </p>
            </div>

            {/* Fertilizers */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">
                Recommended Fertilizers
              </h4>
              <div className="text-sm text-gray-700">
                {currentRecommendation?.fertilizers &&
                currentRecommendation.fertilizers.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1">
                    {currentRecommendation.fertilizers.map(
                      (fertilizer, index) => (
                        <li key={index}>{fertilizer}</li>
                      )
                    )}
                  </ul>
                ) : (
                  <span>N/A</span>
                )}
              </div>
            </div>

            {/* Watering Schedule */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">
                Watering Schedule
              </h4>
              <p className="text-sm text-gray-700">
                {currentRecommendation?.watering_schedule || "N/A"}
              </p>
            </div>

            {/* General Care */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">
                General Care
              </h4>
              <p className="text-sm text-gray-700">
                {currentRecommendation?.general_care || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main
      ref={componentRef}
      className="bg-green-50/50 font-sans min-h-screen py-20 mt-10"
    >
      <div className="container mx-auto px-4">
        <Header2 />
        <div className="text-center mb-12 animate-in">
          <div className="inline-block bg-green-600 text-white p-4 rounded-full mb-4">
            <Camera className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight flex items-center justify-center gap-3">
            <span className="h-[7vh] "> 📸 </span>
            Crop Disease Detection
          </h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-600">
            Upload a leaf image to get instant AI-powered disease diagnosis and
            treatment recommendations.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Uploader */}
          <div
            className="space-y-8 animate-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800">
                Upload Leaf Image
              </h2>
              <p className="text-gray-500 mt-1">
                Take a clear photo of the affected leaf for best results
              </p>

              <div
                {...getRootProps()}
                className={`mt-6 p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? "border-green-600 bg-green-50"
                    : "border-gray-300 hover:border-green-500"
                }`}
              >
                <input {...getInputProps()} />
                <UploadCloud className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                {isDragActive ? (
                  <p className="text-lg font-semibold text-green-700">
                    Drop the image here ...
                  </p>
                ) : (
                  <div>
                    <p className="text-lg font-semibold text-gray-700">
                      Drag & drop your image here
                    </p>
                    <p className="text-gray-500 my-2">
                      or click to browse your files
                    </p>
                    <button
                      type="button"
                      className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-200"
                    >
                      Choose File
                    </button>
                  </div>
                )}
              </div>

              {/* Image Preview */}
              {file && (
                <div className="mt-6">
                  <div className="mb-4 rounded-lg overflow-hidden border">
                    <img
                      src={file.preview}
                      alt="Uploaded leaf preview"
                      className="w-full h-auto object-cover max-h-64"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Filename: {file.name}
                  </p>
                  <button
                    onClick={handleStartDiagnosis}
                    disabled={isUploading}
                    className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      "Start Diagnosis"
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Photography Tips */}
            <div
              className="p-8 rounded-xl border border-yellow-300 bg-yellow-50/50 animate-in"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Photography Tips
                  </h3>
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

          {/* Right Column: Results */}
          <div
            className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm sticky top-28 animate-in max-h-screen overflow-y-auto"
            style={{ animationDelay: "0.3s" }}
          >
            {renderRecommendationCard()}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DiseaseDetectionPage;
