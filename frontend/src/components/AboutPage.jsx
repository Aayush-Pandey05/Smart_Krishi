import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import banner from '../assets/Crops-Header2.png';
import SmartFarming from '../assets/SmartFarming.png';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
const componentRef = useRef(null);

useLayoutEffect(() => {
let ctx = gsap.context(() => {
    gsap.from(".animate-banner > *", { opacity: 0, y: 30, duration: 0.8, stagger: 0.2, ease: 'power3.out' });
    gsap.from(".animate-mission", { opacity: 0, x: -50, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: ".animate-mission", start: "top 80%" }, immediateRender: false });
    gsap.from(".animate-card", { opacity: 0, scale: 0.9, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: ".animate-card", start: "top 80%" }, immediateRender: false });
}, componentRef);

return () => ctx.revert();
}, []);

return (
<main ref={componentRef} className="font-sans">
    <section id="hero"
    className="relative h-[50vh] flex items-center justify-center text-white"
    style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
    <div className="absolute inset-0 bg-black/80"></div>
    <div className="container mx-auto px-4 text-center relative z-10 animate-banner">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
        About KrishiAI Assistant
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
        Empowering farmers with AI tools for better yield, profit, and sustainability.
        </p>
    </div>
    </section>

    <section className="bg-gray-100 py-10 md:py-20 pl-5">
    <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="lg:w-3/5 animate-mission">
        <h2 className="font-bold text-4xl text-gray-800 mb-6">
            Our Mission
        </h2>
        <div className="space-y-4 text-gray-700 leading-relaxed font-medium">
            <p>
            At KrishiAI Assistant, we believe that technology should serve humanity's most
            fundamental need: food production. Our mission is to democratize access to
            advanced agricultural technology, making it available to farmers of all scales
            worldwide.
            </p>
            <p>
            We understand the challenges farmers face daily – from crop diseases and soil
            health to market volatility and resource management. That's why we've developed
            a comprehensive platform that brings the power of artificial intelligence directly to
            your fields.
            </p>
        </div>
        <button className="mt-8 bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg">
            Try Our Tools
        </button>
        </div>

        <div className="lg:w-2/5 w-full animate-card">
        <div className="bg-gradient-to-br from-green-800 via-green-900 to-green-950 rounded-lg shadow-xl text-white overflow-hidden ">
            <div className='border-green-950'>
            <img 
                src={SmartFarming} 
                alt=""
                className='w-full h-56 object-cover p-3 rounded-4xl '
            />
            </div>
            <div className="p-8 text-center">
            <h3 className="text-2xl font-semibold text-white mb-3">
                Growing Together
            </h3>
            <p className="text-gray-300">
                Every day, we work alongside farmers to understand their needs and develop
                solutions that make a real difference in their operations.
            </p>
            </div>
        </div>
        </div>
    </div>
    </section>
</main>
);
};

export default AboutPage;