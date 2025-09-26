    import React, { useLayoutEffect, useRef } from 'react';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';

    gsap.registerPlugin(ScrollTrigger);

    const toolsData = [
    { icon: '📷', bgColor: 'bg-green-100', iconColor: 'text-green-600', title: 'Crop Disease Detection', description: 'Upload leaf images and get instant AI-powered disease diagnosis with treatment recommendations.' },
    { icon: '🌾', bgColor: 'bg-orange-100', iconColor: 'text-orange-600', title: 'Soil Health Analyzer', description: 'Analyze soil conditions through images or manual input to optimize crop selection and fertility.' },
    { icon: '💧', bgColor: 'bg-blue-100', iconColor: 'text-blue-600', title: 'Smart Irrigation Advisor', description: 'Get personalized irrigation recommendations based on soil moisture and weather conditions.' },
    { icon: '📈', bgColor: 'bg-purple-100', iconColor: 'text-purple-600', title: 'Market Price Dashboard', description: 'Track crop prices, analyze trends, and get AI-powered market forecasts for better selling decisions.' },
    { icon: '📗', bgColor: 'bg-teal-100', iconColor: 'text-teal-600', title: 'Fertilizer & Pesticide Guide', description: 'Find the right fertilizers and pesticides for your crops with dosage and safety instructions.' },
    { icon: '🧾', bgColor: 'bg-red-100', iconColor: 'text-red-600', title: 'Cost & Profit Calculator', description: 'Calculate farming costs, expected revenue, and profit margins to optimize your farming business.' },
    ];


    const FarmingTools = () => {
    const componentRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
        gsap.from('.section-header', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',

            immediateRender: false, 
            scrollTrigger: {
            trigger: '.section-header',
            start: 'top 85%',
            },
        });

        // Animation for the grid of cards
        gsap.from('.tool-card', {
            opacity: 0,
            y: 50,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.15,
            immediateRender: false, 
            scrollTrigger: {
            trigger: '.tools-grid',
            start: 'top 80%',
            },
        });
        }, componentRef); 

        return () => ctx.revert();
    }, []);

    return (
        <section ref={componentRef} className="bg-white py-16 font-sans">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16 section-header">
            <h2 className="text-4xl font-bold text-gray-800 tracking-tight">
                Powerful Farming Tools
            </h2>
            <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-600">
                Discover our comprehensive suite of AI-powered tools designed to 
                revolutionize your farming experience.
            </p>
            </div>

            {/* Grid of Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 tools-grid">
            {toolsData.map((tool) => (
                <div 
                key={tool.title} 
                className="bg-gray-50 p-8 rounded-xl border border-green-900 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group tool-card"
                >
                <div className={`w-14 h-14 flex items-center justify-center rounded-lg mb-6 ${tool.bgColor}`}>
                    <span className={`text-2xl ${tool.iconColor}`}>{tool.icon}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {tool.title}
                </h3>
                <p className="text-gray-600 mb-6">
                    {tool.description}
                </p>
                
                <a href="#" className="font-semibold text-green-600 flex items-center">
                    Try Now
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </a>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
    };

    export default FarmingTools;