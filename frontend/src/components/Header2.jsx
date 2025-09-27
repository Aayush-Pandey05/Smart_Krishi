import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
// 1. Import useNavigate from react-router-dom
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { MenuIcon, XIcon, ArrowRightIcon } from "../components/Icon"; // Assuming these are in your project
import logo from '../assets/Logo.png'
import { UserIcon, LogOutIcon } from "../components/Icon"; // Assuming you have UserIcon and LogOutIcon

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
    // **NEW STATES FOR USER PROFILE DROPDOWN**
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    // **MOCK AUTHENTICATION STATE**
    const [user, setUser] = useState({
        isLoggedIn: true,
        email: "aayush@gmail.com",
        initials: "A"
    });

    const location = useLocation();
    // 2. Initialize useNavigate
    const navigate = useNavigate();

    const headerRef = useRef(null);
    const logoRef = useRef(null);
    const navRef = useRef(null);
    const profileButtonRef = useRef(null); // Updated ref name
    const dropdownRef = useRef(null); // Ref for the dropdown menu


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

    // GSAP intro animation (Updated to use profileButtonRef)
    useEffect(() => {
        const headerEl = headerRef.current;
        const logoEl = logoRef.current;
        const navItems = navRef.current?.children || [];
        const buttonEl = profileButtonRef.current;

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

    // **NEW: Handler to close dropdown when clicking outside**
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                profileButtonRef.current &&
                !profileButtonRef.current.contains(event.target)
            ) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef, profileButtonRef]);


    // 2. Simplified helper function to check if a link is active
    const isLinkActive = (linkPath) => {
        return location.pathname === linkPath;
    };

    const getDesktopLinkClassName = (linkPath) => {
        const isActive = isLinkActive(linkPath);
        return `text-lg font-medium transition-colors duration-700 hover:text-gray-400 ${
            isActive
                ? isScrolled
                    ? "text-gray-800" : "text-green-600 font-bold" // Active link color when scrolled
                : isScrolled
                    ? "text-white"                      // Inactive link color when scrolled
                    : "text-green-400"                    // Inactive link color on hero
            }`;
    };

    const getMobileLinkClassName = (linkPath) => {
        const isActive = isLinkActive(linkPath);
        return `text-white hover:text-gray-300 transition-colors duration-300 ${
            isActive ? "text-green-400 font-bold" : ""
            }`;
    };

    // **UPDATED: Logout function to include navigation**
    const handleLogout = () => {
        console.log("User logged out! Redirecting to /features.");
        setUser({ isLoggedIn: false, email: null, initials: null }); // Mock logout
        setIsProfileOpen(false); // Close dropdown after action
        // 3. Navigate to the desired route
        navigate('/features'); 
    };

    // **NEW: Login/Signup function placeholder**
    const handleLoginRedirect = () => {
        console.log("Redirecting to login/signup page.");
        // Redirect the user to the login page
        navigate('/login'); 
    };

    // **Profile Button/Avatar Component**
    const ProfileButton = ({ user, isScrolled, onClick }) => (
        <button
            ref={profileButtonRef}
            onClick={onClick}
            className={`flex items-center space-x-2 pl-2 pr-1 py-1 rounded-full transition-colors duration-700 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isScrolled
                    ? "bg-white text-black focus:ring-green-700"
                    : "bg-green-600 text-white focus:ring-white"
                }`}
        >
            {user.isLoggedIn ? (
                <>
                    {/* User Initials/Avatar */}
                    <div
                        className={`p-5 rounded-full transition-colors duration-700 font-bold ${
                            isScrolled ? "bg-green-400 text-white" : "bg-white text-black"
                            }`}
                    >
                        {user.initials}
                    </div>
                </>
            ) : (
                <>
                    <span className="font-semibold hidden sm:inline">Login/Signup</span>
                    <div
                        className={`p-2 rounded-full transition-colors duration-700 ${
                            isScrolled ? "bg-green-400 text-white" : "bg-white text-black"
                            }`}
                    >
                        <UserIcon />
                    </div>
                </>
            )}
        </button>
    );

    return (
        <>
            <header
                ref={headerRef}
                className={`fixed z-50 top-5 left-4 right-4 p-2 rounded-3xl transition-all duration-700 ${
                    isScrolled ? "bg-green-700/90 shadow-lg" : "bg-black/80"
                    }`}
            >
                <div className="px-4 sm:px-6 flex items-center justify-between h-16">
                    {/* Logo */}
                    <div
                        ref={logoRef}
                        className="flex items-center cursor-pointer group space-x-3"
                    // You might want to wrap this in a NavLink to "/"
                    >
                        <img
                            src={logo}
                            alt="KrishiAI Logo"
                            className="h-8 w-8 rounded-full"
                        />
                        <span
                            className={`text-xl lg:text-2xl font-bold group-hover:text-green-400 transition-colors duration-700 ${
                                isScrolled ? "text-white" : "text-green-500"
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

                    <div className="flex items-center space-x-4 relative">
                        {/* 🌟 Profile Button */}
                        <ProfileButton
                            user={user}
                            isScrolled={isScrolled}
                            onClick={() => {
                                if (user.isLoggedIn) {
                                    setIsProfileOpen(!isProfileOpen);
                                } else {
                                    handleLoginRedirect(); // Redirect to login page if not logged in
                                }
                            }}
                        />

                        {/* 🌟 User Profile Dropdown Window */}
                        {user.isLoggedIn && (
                            <div
                                ref={dropdownRef}
                                className={`absolute top-full mt-3 right-0 w-64 bg-white rounded-lg shadow-xl transition-opacity duration-300 transform ${
                                    isProfileOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-2 invisible"
                                    }`}
                            >
                                <div className="p-4">
                                    <div className="flex items-center space-x-3 border-b pb-3 mb-3">
                                        <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                            {user.initials}
                                        </div>
                                        <div>
                                            <p className="text-gray-800 font-semibold text-sm">Logged In</p>
                                            <p className="text-gray-600 text-xs truncate" title={user.email}>
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center justify-center py-2 px-4 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                                    >
                                        <LogOutIcon className="h-4 w-4 mr-2" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}


                        {/* Mobile Toggle */}
                        <div
                            className={`rounded-full block md:hidden transition-colors duration-700 ${
                                isScrolled ? "bg-black" : "bg-white"
                                }`}
                        >
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`p-2 rounded-full transition-colors duration-700 ${
                                    isScrolled
                                        ? "text-white hover:bg-gray-800" : "text-black hover:bg-gray-200"
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
                    {/* Updated Mobile Button */}
                    {user.isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="mt-6 px-6 py-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center text-lg"
                        >
                            <LogOutIcon className="h-5 w-5 mr-2" />
                            Logout {user.initials}
                        </button>
                    ) : (
                        <NavLink
                            to="/login" // Use your actual login path
                            onClick={() => setIsMenuOpen(false)}
                            className="mt-6 px-6 py-3 rounded-full bg-white text-black hover:bg-gray-200 transition-colors flex items-center text-lg"
                        >
                            <UserIcon className="h-5 w-5 mr-2" />
                            Login / Sign Up
                        </NavLink>
                    )}
                </div>
            </div>
        </>
    );
};

export default Header2;