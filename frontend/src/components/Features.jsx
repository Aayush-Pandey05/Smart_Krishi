import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, TestTube2, Droplets, AreaChart, BookOpen, Calculator, BrainCircuit } from 'lucide-react';


gsap.registerPlugin(ScrollTrigger);

const featuresData = [
{
icon: Camera,
title: 'Crop Disease Detection',
description: 'Upload leaf images to identify diseases and get AI-powered treatment recommendations instantly.',
theme: { bg: 'bg-red-100', text: 'text-red-600' },
linkId: 'disease', 
},
{
icon: TestTube2,
title: 'Soil Health Analyzer',
description: 'Analyze soil conditions and get personalized recommendations for optimal crop growth.',
theme: { bg: 'bg-green-100', text: 'text-green-600' },
linkId: 'soilhealth',
},
{
icon: Droplets,
title: 'Smart Irrigation Advisor',
description: 'Get precise irrigation timing and water amount recommendations based on soil moisture.',
theme: { bg: 'bg-blue-100', text: 'text-blue-600' },
linkId: 'irrigation',
},
{
icon: AreaChart,
title: 'Market Price Dashboard',
description: 'Track real-time market prices, trends, and AI-powered price forecasts for your crops.',
theme: { bg: 'bg-purple-100', text: 'text-purple-600' },
linkId: 'marketdashboard',
},
{
icon: BookOpen,
title: 'Fertilizer & Pesticide Guide',
description: 'Find the right fertilizers and pesticides for your crops with dosage recommendations.',
theme: { bg: 'bg-orange-100', text: 'text-orange-600' },
linkId: 'fertilizer',
},
{
icon: Calculator,
title: 'Cost & Profit Calculator',
description: 'Calculate farming costs, expected profits, and break-even points for better planning.',
theme: { bg: 'bg-teal-100', text: 'text-teal-600' },
linkId: 'costcal',
},
];

const FeaturesPage = () => {
const componentRef = useRef(null);

useLayoutEffect(() => {
let ctx = gsap.context(() => {
    gsap.from(".animate-header > *", { opacity: 0, y: 30, stagger: 0.2, duration: 0.8, ease: 'power3.out' });
    gsap.from(".feature-card", {
    opacity: 0, y: 50, stagger: 0.15, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: ".features-grid", start: "top 80%" },
    immediateRender: false,
    });
}, componentRef);

return () => ctx.revert();
}, []);

return (
<div ref={componentRef} className="bg-gray-50 font-sans">
   
    <section className="container mx-auto px-4 py-20 md:py-24 mt-10">
   
    <div className="text-center mb-16  animate-header">
        <BrainCircuit className="h-12 w-12 mx-auto text-green-600 mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
        Explore AI-Powered Farming Tools
        </h1>
        <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-600">
        Discover comprehensive digital solutions designed to help farmers make smarter decisions, increase yields, and maximize profits through cutting-edge artificial intelligence.
        </p>
    </div>


    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 features-grid">
        {featuresData.map((feature) => {
        const Icon = feature.icon;
        return (
            <div key={feature.title} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group feature-card">
            <div className={`w-14 h-14 flex items-center justify-center rounded-lg mb-6 ${feature.theme.bg}`}>
                <Icon className={`w-7 h-7 ${feature.theme.text}`} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
            </h3>
            <p className="text-gray-600 mb-6">
                {feature.description}
            </p>
            
            <a href={`/${feature.linkId}`} className={`font-semibold ${feature.theme.text} flex items-center`}>
                Try Now
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </a>
            </div>
        );
        })}
    </div>
    </section>

    
   
</div>
);
};

export default FeaturesPage;