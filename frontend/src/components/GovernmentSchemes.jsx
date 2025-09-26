import React from 'react';
import { FlaskConical, Landmark, Leaf, Shield, IndianRupee, CreditCard, ExternalLink, Info } from 'lucide-react';

const GovernmentSchemes = ({ schemes }) => {
  const iconMap = { 
    Landmark, 
    Leaf, 
    FlaskConical, 
    Shield, 
    IndianRupee, 
    CreditCard 
  };

  return (
    <section className="mt-20 max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <div className="inline-block bg-green-100 text-green-600 p-4 rounded-full mb-4">
          <Landmark className="w-8 h-8" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Related Government Schemes
        </h2>
        <p className="mt-3 text-gray-600 max-w-3xl mx-auto text-lg">
          Explore government initiatives that support farmers with resources and information for better agricultural practices.
        </p>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schemes.map((scheme) => {
          const Icon = iconMap[scheme.icon];
          return (
            <div 
              key={scheme.title} 
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group relative overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-5 group-hover:bg-green-600 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                  {Icon && <Icon className="w-7 h-7" />}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-green-700 transition-colors duration-200">
                  {scheme.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
                  {scheme.description}
                </p>

                {/* Action Button */}
                <a 
                  href={scheme.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-auto inline-flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-2.5 px-5 rounded-lg hover:bg-green-700 group-hover:shadow-lg transition-all duration-200 text-center transform group-hover:scale-105"
                >
                  Visit Now 
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>

              {/* Decorative element */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-green-100 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
          );
        })}
      </div>

      {/* Additional Help Section */}
      <div className="mt-16 bg-gradient-to-r from-green-50 via-blue-50 to-green-50 rounded-2xl p-8 border border-green-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
              <Info className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Need Help with Applications?
            </h3>
          </div>
          
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Contact your local agricultural extension officer or visit the nearest Common Service Center (CSC) 
            for assistance with scheme applications and documentation.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://locator.csccloud.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-blue-600 font-medium py-3 px-6 rounded-lg border border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Find Nearest CSC <ExternalLink className="w-4 h-4" />
            </a>
            <a 
              href="https://www.mkisan.gov.in/Home/FarmerRegistration" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Farmer Portal <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
        <div className="text-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="text-3xl font-bold text-green-600 mb-2">₹2.8L Cr</div>
          <p className="text-gray-600 text-sm">Annual Agriculture Budget</p>
        </div>
        <div className="text-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="text-3xl font-bold text-blue-600 mb-2">12 Cr+</div>
          <p className="text-gray-600 text-sm">Farmers Benefited</p>
        </div>
        <div className="text-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
          <p className="text-gray-600 text-sm">Active Schemes</p>
        </div>
      </div>
    </section>
  );
};

export default GovernmentSchemes;