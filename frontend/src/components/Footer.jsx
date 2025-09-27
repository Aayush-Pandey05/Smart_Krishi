import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from '../assets/Logo.png'

gsap.registerPlugin(ScrollTrigger);

const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const LeafIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


const Footer = () => {
  const footerRef = useRef(null);

  
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".footer-col", {
        opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', stagger: 0.15, immediateRender: false,
        scrollTrigger: { trigger: footerRef.current, start: 'top 95%' },
      });
      gsap.from(".footer-bottom", {
        opacity: 0, duration: 1, delay: 0.5, immediateRender: false,
        scrollTrigger: { trigger: footerRef.current, start: 'top 95%' },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="font-sans">
      
      <div className="bg-green-950 text-gray-300">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="mb-4 md:mb-0 footer-col">
              <a href="#" className="flex items-center mb-4 mr-5">
                <img src={logo} alt=" " className="h-8 w-8 rounded-full "/>
                <span className="text-xl  ml-4 font-bold text-green-400">KrishiAI </span>
              </a>
              <p className="text-sm">Empowering farmers with AI-powered tools for better yield, profit, and sustainable farming practices.</p>
            </div>

            <div className="footer-col">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3 className="text-lg font-semibold text-white mb-4">Features</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Disease Detection</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Soil Health</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Irrigation Advisor</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Market Dashboard</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center"><MailIcon /> support@agriai.com</li>
                <li className="flex items-center"><PhoneIcon /> +1 (555) 123-4567</li>
                <li className="flex items-center"><LocationIcon /> 123 Farm Tech Ave, Agriculture City</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-green-700 text-gray-100 footer-bottom">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="mb-2 sm:mb-0">&copy; {new Date().getFullYear()} AgriAI Assistant – Empowering Farmers with Technology</p>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <LeafIcon />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;