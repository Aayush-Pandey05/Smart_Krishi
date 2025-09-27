// src/components/WhyChooseUs.jsx

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
  const componentRef = useRef(null);

  // A simple checkmark SVG component
  const CheckmarkIcon = () => (
    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  );

  // A placeholder logo SVG
  const AgriAILogo = () => (
    <svg className="w-16 h-16 mx-auto mb-4 text-green-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10 C 27.9 10 10 27.9 10 50 C 10 72.1 27.9 90 50 90 C 72.1 90 90 72.1 90 50" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M40 70 Q 50 50 60 70" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M50 45 V 20" stroke="orange" strokeWidth="8" strokeLinecap="round" />
      <path d="M60 40 V 25" stroke="orange" strokeWidth="8" strokeLinecap="round" />
      <path d="M70 35 V 30" stroke="orange" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );

  const features = [
    "AI-powered crop disease detection",
    "Real-time market price analysis",
    "Personalized farming recommendations",
    "Cost optimization tools",
    "Sustainable farming practices",
    "Mobile-friendly interface",
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Animate the left column
      gsap.from(".animate-left > *", {
        opacity: 0,
        x: -50,
        duration: 0.8,
        stagger: 0.15,
        immediateRender: false,
        scrollTrigger: {
          trigger: componentRef.current,
          start: "top 70%",
        }
      });

      // Animate the right column (the card)
      gsap.from(".animate-right", {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        immediateRender: false,
        scrollTrigger: {
          trigger: componentRef.current,
          start: "top 70%",
        }
      });
    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={componentRef} className="bg-white px-5 py-5 font-sans">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Text Content */}
        <div className="lg:w-1/2 animate-left">
          <h2 className="text-4xl font-bold text-gray-800 tracking-tight mb-4">
            Why Choose <span className='text-green-900'>AgriAI Assistant ?</span> 
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Our platform combines cutting-edge artificial intelligence with practical farming knowledge to help you make better decisions, increase yields, and maximize profits.
          </p>
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start text-gray-700">
                <CheckmarkIcon />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Right Column: Stats Card */}
         <div className="lg:w-1/2 w-full py-5 h-[50vh] animate-right">
          <div className="
            bg-gradient-to-br from-green-800 via-green-900 to-green-950 
            p-8 rounded-lg shadow-xl border border-green-600 text-center text-white h-[45vh]
          ">
           
            <AgriAILogo className="text-green-300" /> {/* Added text-green-300 */}
            
            <h3 className="text-2xl font-semibold mb-2"> {/* Removed text-gray-800 */}
              Join Thousands of Farmers
            </h3>
            <p className="text-green-100 mb-8"> {/* Changed text-gray-600 to text-green-100 */}
              Already using AgriAI to improve their farming practices and increase profitability.
            </p>
            <div className="flex justify-around">
              <div className="stat-item">
                <span className="block text-3xl font-bold text-white">10K+</span> {/* Changed text-green-600 to text-white */}
                <span className="text-green-200">Active Users</span> {/* Changed text-gray-500 to text-green-200 */}
              </div>
              <div className="stat-item">
                <span className="block text-3xl font-bold text-white">95%</span> {/* Changed text-green-600 to text-white */}
                <span className="text-green-200">Accuracy Rate</span> {/* Changed text-gray-500 to text-green-200 */}
              </div>
              <div className="stat-item">
                <span className="block text-3xl font-bold text-white">24/7</span> {/* Changed text-green-600 to text-white */}
                <span className="text-green-200">Support</span> {/* Changed text-gray-500 to text-green-200 */}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;