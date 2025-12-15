import React, { useState, useEffect } from "react";
import { motion as motionOriginal, useAnimation } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { smoothScrollTo } from "../utils/smoothScroll";
import { GithubIcon, LinkedinIcon, XIcon } from "./Icons";

// Cast motion to any to avoid type errors with motion props
const motion = motionOriginal as any;

/**
 * Hero Component
 *
 * This component is the first section the user sees. It features:
 * 1. A dynamic typewriter effect for the "Welcome" badge.
 * 2. A typewriter effect for the subheadline text.
 * 3. A "bending" animation for the profile/hero image that triggers immediately and loops.
 * 4. Responsive design (stacks on mobile, side-by-side on desktop).
 */
const Hero: React.FC = () => {
  // Text content definitions
  const subheadlineText =
    "I build accessible, pixel-perfect, and performant web experiences. Specialized in the React ecosystem with deep expertise in Next.js architecture.";
  const welcomeText = "Welcome to my portfolio";

  // State to trigger re-animation of the subheadline text (Counter increments to force re-render)
  const [subheadlineKey, setSubheadlineKey] = useState(0);

  // State to trigger re-animation of the "Welcome" badge
  const [badgeKey, setBadgeKey] = useState(0);

  // Animation controls for the image bending effect.
  // allows us to imperatively start the animation via JavaScript.
  const imageControls = useAnimation();

  // ----------------------------------------------------------------
  // ANIMATION TIMERS
  // ----------------------------------------------------------------

  // 1. Subheadline Typewriter Loop
  // Re-runs the text animation every 2 minutes (120,000ms)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSubheadlineKey((prev) => prev + 1);
    }, 120000);

    return () => clearInterval(intervalId);
  }, []);

  // 2. Welcome Badge Loop
  // Re-runs the badge typing animation every 30 seconds (30,000ms)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setBadgeKey((prev) => prev + 1);
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  // 3. Image Bending/Tilt Animation Loop
  // Triggers immediately on load, then repeats every 25 seconds.
  useEffect(() => {
    // STEP 1: Trigger animation immediately when component mounts/page refreshes
    imageControls.start("bend");

    // STEP 2: Set up the interval to repeat the animation
    const intervalId = setInterval(() => {
      imageControls.start("bend");
    }, 25000); // 25 seconds interval

    // STEP 3: Cleanup interval on unmount to prevent memory leaks
    return () => clearInterval(intervalId);
  }, [imageControls]);

  // ----------------------------------------------------------------
  // ANIMATION VARIANTS (Framer Motion Config)
  // ----------------------------------------------------------------

  // Controls the staggered entrance of the left column content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each child element appearing
        delayChildren: 0.3, // Initial delay before sequence starts
      },
    },
  };

  // Controls the slide-up and fade-in of individual items (Headers, Buttons)
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Custom bezier for a premium "pop" feel
      },
    },
  };

  // Controls the typewriter effect for text containers
  const typewriterVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Speed of typing (time between letters)
      },
    },
  };

  // Controls individual letters in the typewriter effect
  const letterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.01 },
    },
  };

  // Controls the "Bending" image animation
  const bendVariants = {
    initial: { rotate: 0 },
    bend: {
      rotate: [0, 6, -6, 4, -4, 0], // Keyframes: Center -> Right -> Left -> Right -> Left -> Center
      transition: {
        duration: 2.5,
        ease: "easeInOut",
      },
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
      {/* Static Background Glows (Visual candy) */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* ------------------------------------------------------- */}
        {/* LEFT COLUMN: Text Content                               */}
        {/* ------------------------------------------------------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center md:text-left"
        >
          {/* Badge: "Welcome to my portfolio" */}
          <div className="inline-block px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700 mb-6 backdrop-blur-sm min-w-[200px] text-center md:text-left">
            <motion.span
              key={badgeKey} // Changing key triggers complete re-render of component
              variants={typewriterVariants}
              initial="hidden"
              animate="visible"
              className="text-primary font-mono text-sm"
            >
              {welcomeText.split("").map((char, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </div>

          {/* Intro Name */}
          <motion.div variants={itemVariants} className="mb-2">
            <span className="text-2xl md:text-3xl font-medium text-slate-300">
              Hello I'm
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Patrick (Paddy) Nnodu
            </h2>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-white"
          >
            A Next.js Expert & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              React Developer
            </span>
          </motion.h1>

          {/* Subheadline with Typewriter Effect */}
          <motion.p
            key={subheadlineKey} // Forces re-animation every 2 minutes
            variants={typewriterVariants}
            initial="hidden"
            animate="visible"
            aria-label={subheadlineText}
            className="text-slate-400 text-lg md:text-xl mb-8 max-w-lg leading-relaxed mx-auto md:mx-0 min-h-[5rem]"
          >
            {subheadlineText.split("").map((char: string, index: number) => (
              <motion.span
                key={`${char}-${index}`}
                variants={letterVariants}
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
              download="Patrick_Nnodu_CV.pdf"
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

        {/* ------------------------------------------------------- */}
        {/* RIGHT COLUMN: Visual Element (Image + Decor)            */}
        {/* ------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative block mt-12 md:mt-0"
        >
          {/* 
             Inner Wrapper for Bending Animation 
             This is where 'imageControls' applies the rotation.
          */}
          <motion.div
            variants={bendVariants}
            animate={imageControls}
            initial="initial"
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
                animate={{ y: [0, -10, 0] }} // Independent bobbing animation
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="absolute top-8 right-8 bg-dark/90 backdrop-blur border border-slate-700 p-4 rounded-xl shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="font-mono text-sm font-bold">
                    Next.js 14 Ready
                  </span>
                </div>
              </motion.div>

              {/* Floating Badge 2 (Bottom Left) */}
              <motion.div
                animate={{ y: [0, 10, 0] }} // Independent bobbing animation (counter-phase)
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-8 left-8 bg-dark/90 backdrop-blur border border-slate-700 p-4 rounded-xl shadow-xl"
              >
                <div className="text-center">
                  <span className="block text-2xl font-bold text-white">
                    5+
                  </span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">
                    Years Exp
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Geometric Decoration Borders (Scales/Rotates with parent) */}
            <div className="absolute -top-10 -right-10 w-full h-full border border-primary/20 rounded-2xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-full h-full border border-secondary/20 rounded-2xl -z-10" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
