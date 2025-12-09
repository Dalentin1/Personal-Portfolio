import React, { useState, useEffect } from "react";
import { motion as motionOriginal } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { smoothScrollTo } from "../utils/smoothScroll";

// Cast motion to any to avoid type errors with motion props
const motion = motionOriginal as any;

// Custom SVG Icons to replace deprecated Lucide brand icons
const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 4-2.64-3.5-5.36-4.5-8-4-1 0-3 .5-3 3.5-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 4l11.733 16h4.667L8.667 4H4z" />
    <path d="M4 20l6.768-6.768m2.46-2.46L20 4" />
  </svg>
);

/**
 * Hero Component
 *
 * Features:
 * - Robust entrance animations.
 * - Interactive buttons with hover states.
 * - Typewriter text effect for subheadline (Loops every 2 mins).
 */
const Hero: React.FC = () => {
  const subheadlineText =
    "I build accessible, pixel-perfect, and performant web experiences. Specialized in the React ecosystem with deep expertise in Next.js architecture.";

  // State to trigger re-animation of the text
  const [subheadlineKey, setSubheadlineKey] = useState(0);

  // Loop to re-run the animation every 2 minutes
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Incrementing key forces React to unmount and remount the component,
      // restarting the entrance animation.
      setSubheadlineKey((prev) => prev + 1);
    }, 120000); // 2 minutes in milliseconds

    return () => clearInterval(intervalId);
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Typewriter effect variants
  const typewriterVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.6, // Wait for H1 to finish roughly
        staggerChildren: 0.05, // Speed of typing
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.1 },
    },
  };

  const handleButtonClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    smoothScrollTo(href);
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
    >
      {/* Static Background Glows */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Column: Text Content */}
        {/* Changed 'whileInView' to 'animate' to guarantee animation on page load */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center md:text-left"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-block px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700 mb-6 backdrop-blur-sm"
          >
            <span className="text-primary font-mono text-sm">
              Welcome to my portfolio
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-white"
          >
            Next.js Expert & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              React Developer
            </span>
          </motion.h1>

          {/* Subheadline with Typewriter Effect */}
          <motion.p
            key={subheadlineKey} // Key change triggers re-render/re-animation
            variants={typewriterVariants}
            initial="hidden" // Ensure it starts hidden on re-render
            animate="visible" // Ensure it animates to visible
            aria-label={subheadlineText}
            className="text-slate-400 text-lg md:text-xl mb-8 max-w-lg leading-relaxed mx-auto md:mx-0 min-h-[5rem]"
          >
            {subheadlineText.split("").map((char: string, index: number) => (
              <motion.span
                key={`${char}-${index}`}
                variants={letterVariants}
                // Using aria-hidden="true" because the parent <p> has the full text label
                aria-hidden="true"
              >
                {char}
              </motion.span>
            ))}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 mb-10 justify-center md:justify-start"
          >
            <motion.a
              href="#projects"
              onClick={(e: React.MouseEvent) =>
                handleButtonClick(e, "#projects")
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary text-white font-bold rounded-lg flex items-center gap-2 shadow-lg shadow-primary/25 hover:bg-blue-600 transition-colors cursor-pointer"
            >
              View Projects <ArrowRight className="w-5 h-5" />
            </motion.a>

            <motion.a
              href="#contact"
              onClick={(e: React.MouseEvent) =>
                handleButtonClick(e, "#contact")
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-slate-800 text-white font-bold rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Contact Me
            </motion.a>

            {/* Download CV Button */}
            <motion.a
              href="/resume.pdf"
              download="Developer_CV.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent text-slate-200 font-bold rounded-lg border border-slate-700 hover:bg-slate-800/50 hover:text-white hover:border-slate-500 transition-colors cursor-pointer flex items-center gap-2 group"
            >
              Download CV{" "}
              <Download className="w-5 h-5 group-hover:animate-bounce" />
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 text-slate-400 justify-center md:justify-start"
          >
            <a
              href="#"
              aria-label="Github Profile"
              className="hover:text-white transition-colors transform hover:scale-110"
            >
              <GithubIcon className="w-6 h-6" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn Profile"
              className="hover:text-white transition-colors transform hover:scale-110"
            >
              <LinkedinIcon className="w-6 h-6" />
            </a>
            <a
              href="#"
              aria-label="X (Twitter) Profile"
              className="hover:text-white transition-colors transform hover:scale-110"
            >
              <XIcon className="w-6 h-6" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Visual Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden md:block"
        >
          {/* Main Image Card */}
          <div className="relative z-10 w-full aspect-square rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl bg-card">
            <img
              src="https://picsum.photos/800/800"
              alt="Developer Workspace"
              className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
            />

            {/* Floating Badge 1 (Top Right) */}
            <motion.div
              animate={{ y: [0, -10, 0] }} // Floating bobbing animation
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-8 right-8 bg-dark/90 backdrop-blur border border-slate-700 p-4 rounded-xl shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="font-mono text-sm font-bold">
                  Next.js Ready
                </span>
              </div>
            </motion.div>

            {/* Floating Badge 2 (Bottom Left) */}
            <motion.div
              animate={{ y: [0, 10, 0] }} // Counter-phase bobbing
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-8 left-8 bg-dark/90 backdrop-blur border border-slate-700 p-4 rounded-xl shadow-xl"
            >
              <div className="text-center">
                <span className="block text-2xl font-bold text-white">5+</span>
                <span className="text-xs text-slate-400 uppercase tracking-wider">
                  Years Exp
                </span>
              </div>
            </motion.div>
          </div>

          {/* Geometric Decoration Borders */}
          <div className="absolute -top-10 -right-10 w-full h-full border border-primary/20 rounded-2xl -z-10" />
          <div className="absolute -bottom-10 -left-10 w-full h-full border border-secondary/20 rounded-2xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
