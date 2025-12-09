import React, { useState, useEffect } from "react";
import { motion as motionOriginal, AnimatePresence } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";
import { NavItem } from "@/types";
import { smoothScrollTo } from "../utils/smoothScroll";

// Cast motion to any to avoid type errors with motion props
const motion = motionOriginal as any;

// Navigation data configuration
const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" }, // Added About section
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

/**
 * Header Component (Formerly Navbar)
 *
 * Features:
 * - Responsive design (Desktop vs Mobile)
 * - Scroll-aware background
 * - Animated mobile drawer
 * - Smooth scrolling integration
 */
const Header: React.FC = () => {
  // State to track if the mobile menu is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // State to track if the user has scrolled down
  const [scrolled, setScrolled] = useState(false);

  // Effect to handle scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Handles clicks on navigation links.
   */
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isMobile: boolean = false
  ) => {
    e.preventDefault();

    // 1. Perform the scroll action immediately
    smoothScrollTo(href);

    // 2. If we are on mobile, close the menu
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? "bg-dark/80 backdrop-blur-md border-b border-slate-800 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo Section */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2 group relative z-50"
          >
            <div className="p-2 bg-primary rounded-lg group-hover:bg-blue-600 transition-colors">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Dev<span className="text-primary">Portfolio</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium text-slate-300 hover:text-white hover:text-primary transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="px-5 py-2.5 bg-primary hover:bg-blue-600 text-white text-sm font-bold rounded-full transition-all shadow-lg shadow-primary/25 transform hover:scale-105"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden text-white p-2 relative z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-dark md:hidden flex items-center justify-center"
          >
            {/* Background Pattern for Menu */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800/50 to-dark -z-10" />

            <div className="flex flex-col items-center gap-8 text-center">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, true)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="text-3xl font-bold text-slate-300 hover:text-white hover:text-primary transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact", true)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 px-8 py-4 bg-primary text-white text-lg font-bold rounded-full shadow-xl shadow-primary/30"
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
