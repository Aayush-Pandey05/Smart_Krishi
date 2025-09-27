import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";
import logo from '../assets/Logo.png'; // Make sure this path is correct

// Import icons from lucide-react
import {
  LayoutGrid,
  ScanLine,
  Sprout,
  Calculator,
  Droplets,
  FlaskConical,
  LogOut
} from "lucide-react";

const navLinks = [
  { name: "Dashboard", path: "/marketdashboard", icon: LayoutGrid },
  { name: "Disease Detection", path: "/disease", icon: ScanLine },
  { name: "Soil Health", path: "/soilhealth", icon: Sprout },
  { name: "Cost Calculator", path: "/costcal", icon: Calculator },
  { name: "Irrigation Advisor", path: "/irrigation", icon: Droplets },
  { name: "Fertilizer Guide", path: "/fertilizer", icon: FlaskConical },
];

const Header2 = () => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    // Animate the sidebar sliding in from the left
    gsap.from(sidebarRef.current, {
      x: -256, // This should match the width of the sidebar (w-64)
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  return (
    <aside
      ref={sidebarRef}
      className="w-64 h-screen bg-black text-gray-300 flex flex-col p-4 fixed left-0 top-0 z-50 border-r border-gray-800"
    >
      {/* Logo and Brand Name */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <img
          src={logo}
          alt="AgroAI Logo"
          className="h-9 w-9 rounded-full"
        />
        <span className="text-2xl font-bold text-white">AgroAI</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow">
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? "bg-gray-800 text-white"
                      : "hover:bg-gray-800"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <link.icon
                      className={`w-5 h-5 ${
                        isActive ? "text-green-400" : "text-gray-400"
                      }`}
                    />
                    {link.name}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto">
        <button className="flex w-full items-center gap-3 px-3 py-2.5 rounded-md text-base font-medium hover:bg-gray-800 transition-colors">
          <LogOut className="w-5 h-5 text-gray-400" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Header2;
