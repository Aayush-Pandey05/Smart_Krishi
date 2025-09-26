import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { NavLink, useLocation } from "react-router-dom";
import { MenuIcon, XIcon, ArrowRightIcon } from "./Icon"; // Assuming these are in your project
import logo from '../assets/Logo.png'

// 1. Updated navLinks for the AgriAI website with simplified paths
const navLinks = [
{ name: "Dashboard", path: "/marketdashboard" },
{ name: "Disease Detection", path: "/disease" },
{ name: "Soil Health", path: "/soilhealth" },
{ name: "Cost Calculator", path: "/costcal" },
{ name: "Irrigation Advisor", path: "/irrigation" },
{ name: "Fertilizer Guide", path: "/fertilizer" },


];

const Header2 = () => {
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isScrolled, setIsScrolled] = useState(false);
const location = useLocation();

const headerRef = useRef(null);
const logoRef = useRef(null);
const navRef = useRef(null);
const buttonRef = useRef(null);


useEffect(() => {
const hero = document.getElementById("hero");
if (!hero) return;

const observer = new IntersectionObserver(
    ([entry]) => {
    setIsScrolled(!entry.isIntersecting);
    },
    { threshold: 0 }
);

observer.observe(hero);
return () => observer.disconnect();
}, []);

// GSAP intro animation (no changes needed)
useEffect(() => {
const headerEl = headerRef.current;
const logoEl = logoRef.current;
const navItems = navRef.current?.children || [];
const buttonEl = buttonRef.current;

const tl = gsap.timeline();
tl.from(headerEl, {
    y: -50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
})
    .from([logoEl, buttonEl], {
    opacity: 0,
    y: -20,
    duration: 0.5,
    ease: "power3.out",
    }, "-=0.3")
    .from(navItems, {
    opacity: 0,
    y: -20,
    duration: 0.4,
    ease: "power3.out",
    stagger: 0.1,
    }, "-=0.3");
}, []);

// 2. Simplified helper function to check if a link is active
const isLinkActive = (linkPath) => {
return location.pathname === linkPath;
};

const getDesktopLinkClassName = (linkPath) => {
const isActive = isLinkActive(linkPath);
return `text-lg font-medium transition-colors duration-700 hover:text-gray-400 ${
    isActive
    ? isScrolled
        ? "text-gray-800" :"text-green-600 font-bold" // Active link color when scrolled
                // Active link color on hero
    : isScrolled
    ? "text-white"                // Inactive link color when scrolled
    : "text-green-400"                // Inactive link color on hero
}`;
};

const getMobileLinkClassName = (linkPath) => {
const isActive = isLinkActive(linkPath);
return `text-white hover:text-gray-300 transition-colors duration-300 ${
    isActive ? "text-green-400 font-bold" : ""
}`;
};

return (
<>
    <header
    ref={headerRef}
    className={`fixed z-50 top-5 left-4 right-4 p-2 rounded-3xl transition-all duration-700 ${
        isScrolled ? "bg-green-700 opacity-10 shadow-lg":"bg-black/80" 
    }`}
    >
    <div className="px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <div
        ref={logoRef}
        className="flex items-center cursor-pointer group space-x-3"
        >
        <img
            src={logo} 
            alt=" "
            className="h-8 w-8 rounded-full"
        />
        <span
            className={`text-xl lg:text-2xl font-bold group-hover:text-green-400 transition-colors duration-700 ${
            isScrolled ? "text-white":"text-green-500"
            }`}
        >
            KrishiAI 
        </span>
        </div>
        
        <nav ref={navRef} className="hidden md:flex items-center gap-3 space-x-6">
        {navLinks.map((link) => (
            <NavLink
            key={link.name}
            to={link.path}
            className={getDesktopLinkClassName(link.path)}
            >
            {link.name}
            </NavLink>
        ))}
        </nav>


        <div ref={buttonRef} className="flex items-center space-x-4">
        {/* Get Started Button */}
        <NavLink
            to="/features" // Or your desired link
            className={`group flex items-center space-x-3 pl-4 pr-1 py-1 rounded-full transition-colors duration-700 ${
            isScrolled ? "bg-white text-black": "bg-green-600 text-white"
            }`}
        >
            <span className="font-semibold hidden sm:inline">Go to Home</span> 
            <div
            className={`p-2 rounded-full transition-colors duration-700 ${
                isScrolled ? "bg-green-400 text-white":"bg-white text-black" 
            }`}
            >
            <ArrowRightIcon />
            </div>
        </NavLink>

        {/* Mobile Toggle */}
        <div
            className={`rounded-full block md:hidden transition-colors duration-700 ${
            isScrolled ? "bg-black":"bg-white" 
            }`}
        >
            <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 rounded-full transition-colors duration-700 ${
                isScrolled
                ? "text-white hover:bg-gray-800":"text-black hover:bg-gray-200"
            }`}
            >
            {isMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
        </div>
        </div>
    </div>
    </header>

    {/* Mobile Menu Overlay - Simplified */}
    <div
    className={`fixed inset-0 z-40 bg-black/90 text-white transform transition-transform duration-700 ease-in-out ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
    } md:hidden`}
    >
    <div className="flex flex-col items-center justify-center h-full space-y-8 text-2xl font-bold">
        {navLinks.map((link) => (
        <NavLink
            key={link.name}
            to={link.path}
            className={getMobileLinkClassName(link.path)}
            onClick={() => setIsMenuOpen(false)}
        >
            {link.name}
        </NavLink>
        ))}
        <NavLink
        to="/features"
        onClick={() => setIsMenuOpen(false)}
        className="mt-6 px-6 py-3 rounded-full bg-white text-black hover:bg-gray-200 transition-colors"
        >
        Back to Home
        </NavLink>
    </div>
    </div>
</>
);
};

export default Header2;