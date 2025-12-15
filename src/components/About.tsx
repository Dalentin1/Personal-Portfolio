import React, { useState, useEffect } from "react";
import { motion as motionOriginal, AnimatePresence } from "framer-motion";
import { Code, Cpu, Globe, Zap, Database } from "lucide-react";

// Cast motion to any to avoid type errors with motion props
const motion = motionOriginal as any;

/**
 * TypewriterText Component
 *
 * Handles the specific logic for:
 * 1. Typing text character by character.
 * 2. Looping the animation periodically.
 *
 * Update: Cursor animation has been removed.
 */
const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [key, setKey] = useState(0); // Used to force re-render/restart animation

  useEffect(() => {
    // Total Cycle Duration: 20 seconds
    const CYCLE_DURATION = 20000;

    const loop = setInterval(() => {
      // Reset the text animation
      setKey((prev) => prev + 1);
    }, CYCLE_DURATION);

    return () => {
      clearInterval(loop);
    };
  }, []);

  // Split text for individual character animation
  const characters = text.split("");

  return (
    <div className="min-h-[3.5rem] relative">
      {" "}
      {/* min-h prevents layout shift */}
      <motion.p
        key={key}
        className="text-slate-400 max-w-2xl mx-auto text-lg inline"
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.05, delay: index * 0.03 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
};

/**
 * GradientBorderCard Component
 *
 * Wraps content in a container with a moving gradient border.
 *
 * Props:
 * - duration: How long one full rotation takes (seconds).
 * - reverse: If true, spins counter-clockwise.
 */
interface GradientCardProps {
  children: React.ReactNode;
  duration?: number;
  reverse?: boolean;
}

const GradientBorderCard: React.FC<GradientCardProps> = ({
  children,
  duration = 20,
  reverse = false,
}) => {
  return (
    <div className="relative group rounded-xl overflow-hidden p-[2px]">
      {/* 
        The Spinning Gradient Layer 
        - inset-[-100%] makes it large enough to cover corners during rotation
        - conic-gradient creates the "beam" effect
      */}
      <motion.div
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{
          repeat: Infinity,
          duration: duration,
          ease: "linear",
        }}
        className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,#0f172a_0%,#3b82f6_50%,#0f172a_100%)] opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity duration-500"
      />

      {/* Content Mask (The "Inside" of the box) */}
      <div className="relative bg-dark h-full w-full rounded-xl p-6 flex flex-col justify-center items-center text-center">
        {children}
      </div>
    </div>
  );
};

/**
 * About Section Component
 */
const About: React.FC = () => {
  // Animation Variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Text content for the typewriter effect
  const introText =
    "Passionate about bridging the gap between engineering and design. I build software that is not only functional but also intuitive and beautiful.";

  return (
    <section id="about" className="py-24 bg-dark relative z-10">
      <div className="container mx-auto px-6">
        {/* Main Container */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header with Typewriter Effect */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              About Me
            </h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-6" />

            {/* Replaced static paragraph with Typewriter Component */}
            <TypewriterText text={introText} />
          </motion.div>

          {/* Two-Column Content Layout */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Column 1: Narrative Biography */}
            <motion.div variants={listVariants} className="space-y-8">
              <motion.h3
                variants={itemVariants}
                className="text-2xl font-bold text-white"
              >
                Who I am
              </motion.h3>

              <div className="space-y-4">
                <motion.p
                  variants={itemVariants}
                  className="text-slate-400 leading-relaxed"
                >
                  I am a versatile{" "}
                  <span className="text-white font-semibold">
                    Full Stack Developer
                  </span>{" "}
                  capable of architecting and building complete web applications
                  from start to finish. With over{" "}
                  <span className="text-primary font-semibold">
                    5 years of experience
                  </span>
                  , I specialize in the Next.js ecosystem, handling everything
                  from responsive UIs to secure backend APIs.
                </motion.p>

                <motion.p
                  variants={itemVariants}
                  className="text-slate-400 leading-relaxed"
                >
                  My journey began with frontend design, but I quickly evolved
                  to master the server-side. I now leverage tools like{" "}
                  <span className="text-white">
                    Node.js, Postgres, and Prisma
                  </span>{" "}
                  to build robust data layers, while maintaining a pixel-perfect
                  standard on the client side using
                  <span className="text-white">
                    {" "}
                    Tailwind CSS and TypeScript
                  </span>
                  .
                </motion.p>
              </div>

              {/* Key Stats / Highlights - SEPARATED & ANIMATED */}
              {/* Added grid to separate the two stats */}
              <motion.div
                variants={itemVariants}
                className="pt-4 grid grid-cols-2 gap-6"
              >
                {/* Stat 1: Projects - Standard Speed, Clockwise */}
                <GradientBorderCard duration={4} reverse={false}>
                  <span className="block text-4xl font-bold text-white mb-1">
                    50+
                  </span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                    Projects Completed
                  </span>
                </GradientBorderCard>

                {/* Stat 2: Clients - Slower Speed, Counter-Clockwise */}
                <GradientBorderCard duration={5} reverse={true}>
                  <span className="block text-4xl font-bold text-white mb-1">
                    20+
                  </span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                    Happy Clients
                  </span>
                </GradientBorderCard>
              </motion.div>
            </motion.div>

            {/* Column 2: Feature/Highlight Cards Grid */}
            <motion.div
              variants={listVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {/* Card 1: Full Stack */}
              <motion.div
                variants={itemVariants}
                className="p-6 bg-card border border-slate-800 rounded-xl hover:border-primary/50 transition-colors group cursor-default"
              >
                {/* Added Bouncing Animation to Icon Container */}
                <motion.div
                  animate={{ y: [0, -8, 0] }} // Bounce Up and Down
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors"
                >
                  <Database className="w-6 h-6 text-primary group-hover:text-white" />
                </motion.div>
                <h4 className="text-white font-bold mb-2">Full Stack</h4>
                <p className="text-slate-400 text-sm">
                  Seamless integration between frontend UIs and backend
                  databases.
                </p>
              </motion.div>

              {/* Card 2: Clean Code */}
              <motion.div
                variants={itemVariants}
                className="p-6 bg-card border border-slate-800 rounded-xl hover:border-primary/50 transition-colors group cursor-default"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5, // Staggered bounce
                  }}
                  className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors"
                >
                  <Code className="w-6 h-6 text-primary group-hover:text-white" />
                </motion.div>
                <h4 className="text-white font-bold mb-2">Clean Code</h4>
                <p className="text-slate-400 text-sm">
                  I write maintainable, scalable, and self-documenting code.
                </p>
              </motion.div>

              {/* Card 3: Responsive */}
              <motion.div
                variants={itemVariants}
                className="p-6 bg-card border border-slate-800 rounded-xl hover:border-primary/50 transition-colors group cursor-default"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.0,
                  }}
                  className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors"
                >
                  <Globe className="w-6 h-6 text-primary group-hover:text-white" />
                </motion.div>
                <h4 className="text-white font-bold mb-2">Responsive</h4>
                <p className="text-slate-400 text-sm">
                  Mobile-first approach ensures your site looks perfect
                  anywhere.
                </p>
              </motion.div>

              {/* Card 4: Modern Tech */}
              <motion.div
                variants={itemVariants}
                className="p-6 bg-card border border-slate-800 rounded-xl hover:border-primary/50 transition-colors group cursor-default"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5,
                  }}
                  className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors"
                >
                  <Cpu className="w-6 h-6 text-primary group-hover:text-white" />
                </motion.div>
                <h4 className="text-white font-bold mb-2">Modern Tech</h4>
                <p className="text-slate-400 text-sm">
                  Leveraging Server Actions, SSR, and Edge Computing.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
