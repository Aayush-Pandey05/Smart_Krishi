import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from '../assets/Logo.png';
import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Animate columns
      gsap.from('.footer-col', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
      });
      // Animate bottom bar
      gsap.from('.footer-bottom', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.4,
        scrollTrigger: { trigger: footerRef.current, start: 'top 95%' },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-black text-gray-400 font-sans border-t border-gray-800">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand Info */}
          <div className="footer-col md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <img src={logo} alt="AgroAI Logo" className="h-10 w-10 rounded-full mr-3" />
              <h3 className="text-2xl font-bold text-white">AgroAI</h3>
            </div>
            <p className="text-sm pr-4">
              Empowering farmers with AI-powered tools for better yield, profit, and sustainable farming.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h3 className="text-lg font-semibold text-white mb-4 tracking-wide">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-green-400 transition-colors">About Us</a></li>
              <li><a href="/features" className="hover:text-green-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Contact</a></li>
              <li><a href="/marketdashboard" className="hover:text-green-400 transition-colors">Dashboard</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="footer-col">
            <h3 className="text-lg font-semibold text-white mb-4 tracking-wide">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start"><Mail className="w-5 h-5 mr-3 mt-1 text-green-400 shrink-0" /> support@agroai.com</li>
              <li className="flex items-start"><Phone className="w-5 h-5 mr-3 mt-1 text-green-400 shrink-0" /> +91 (555) 123-4567</li>
              <li className="flex items-start"><MapPin className="w-5 h-5 mr-3 mt-1 text-green-400 shrink-0" /> Bengaluru, Karnataka</li>
            </ul>
          </div>
          
          {/* Column 4: Newsletter Subscription */}
          <div className="footer-col">
            <h3 className="text-lg font-semibold text-white mb-4 tracking-wide">Stay Updated</h3>
            <p className="text-sm mb-4">Subscribe to our newsletter for the latest updates and tips.</p>
            <form>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button type="submit" className="px-4 py-2 bg-green-600 text-white font-semibold rounded-r-md hover:bg-green-700 transition-colors">
                  Go
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom bg-gray-900/50 py-4 border-t border-gray-800">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="mb-4 sm:mb-0">&copy; {new Date().getFullYear()} AgroAI. All Rights Reserved.</p>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-white transition-colors" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Facebook"><Facebook className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

