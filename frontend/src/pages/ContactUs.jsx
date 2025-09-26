import React, {  useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import Support from '../assets/Support.png'; 
import Header from '../components/Header';

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
const componentRef = useRef(null);

useLayoutEffect(() => {
  let ctx = gsap.context(() => {
    gsap.from(".animate-hero > *", {
      opacity: 0, y: 30, duration: 0.8, stagger: 0.2, ease: 'power3.out',
    });
    gsap.from(".animate-info > *", {
      opacity: 0, x: -40, stagger: 0.15, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: ".animate-info", start: "top 80%" },
      immediateRender: false,
    });
    gsap.from(".animate-form", {
      opacity: 0, scale: 0.95, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: ".animate-form", start: "top 80%" },
      immediateRender: false,
    });
  }, componentRef);
  return () => ctx.revert();
}, []);







return (
  <div>
    <Header/>
  <div ref={componentRef} className="font-sans">
    <section
      id="hero"
      className="relative h-[60vh] flex items-center justify-center text-center px-4"
      style={{
        backgroundImage: `url(${Support})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/80"></div>
      <div className="relative z-10 text-white animate-hero">
        <h1 className="text-4xl md:text-6xl font-bold text-green-600">Contact Us</h1>
        <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-200">
          We’d love to hear from you! Reach out with questions, feedback, or
          collaboration ideas.
        </p>
      </div>
    </section>

    <div className="bg-gray-50">
      <div className="container mx-auto py-10 px-4 pl-5 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="space-y-8 animate-info">
          <h2 className="text-3xl font-bold text-gray-800">Get In Touch</h2>
          <p className="text-gray-600">
            Our team is here to help and answer any questions you might have.
            We look forward to hearing from you.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
              <Mail className="w-6 h-6 text-green-600" />
              <p className="text-gray-700">support@krishiai.com</p>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
              <Phone className="w-6 h-6 text-green-600" />
              <p className="text-gray-700">+91 98765 43210</p>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
              <MapPin className="w-6 h-6 text-green-600" />
              <p className="text-gray-700">Bengaluru, Karnataka, India</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-lg animate-form">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                
                id="name"
                className="w-full px-4 py-3 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
    
                id="email"
                className="w-full px-4 py-3 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full px-4 py-3 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your feedback or question..."
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg shadow-md text-base font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none transition disabled:bg-green-400"
                
              >
                    <span>Send Message</span>
                  
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
);
};

export default ContactPage;