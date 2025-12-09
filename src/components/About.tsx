import React from "react";
import { motion as motionOriginal } from "framer-motion";
import { Code, Cpu, Globe, Zap } from "lucide-react";

// Cast motion to any to avoid type errors with motion props
const motion = motionOriginal as any;

/**
 * About Section Component
 *
 * Updates:
 * - Added granular animations to h3, p, and stats blocks.
 * - Added stagger effects to the feature card grid.
 * - Added hover effects to feature cards.
 */
const About: React.FC = () => {
  // Animation Variants

  // Controls the main section entrance
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger the header, then the grid columns
      },
    },
  };

  // Controls the stagger for lists (like the text paragraphs or the cards)
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Speed of the cascade inside the columns
        delayChildren: 0.1,
      },
    },
  };

  // The individual item animation (Slide Up + Fade In)
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

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
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              About Me
            </h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-6" />
            <motion.p
              variants={itemVariants}
              className="text-slate-400 max-w-2xl mx-auto text-lg"
            >
              Passionate about bridging the gap between engineering and design.
              I build software that is not only functional but also intuitive
              and beautiful.
            </motion.p>
          </motion.div>

          {/* Two-Column Content Layout */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Column 1: Narrative Biography */}
            {/* We apply 'listVariants' here so the children (h3, p, div) animate one by one */}
            <motion.div variants={listVariants} className="space-y-6">
              <motion.h3
                variants={itemVariants}
                className="text-2xl font-bold text-white"
              >
                Who I am
              </motion.h3>

              <motion.p
                variants={itemVariants}
                className="text-slate-400 leading-relaxed"
              >
                I am a specialized Frontend Engineer with a strong foundation in
                the React ecosystem. With over{" "}
                <span className="text-primary font-semibold">
                  5 years of experience
                </span>
                , I have honed my skills in building scalable web applications
                using Next.js, React, and modern CSS frameworks.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-slate-400 leading-relaxed"
              >
                My journey began with raw HTML & CSS, giving me a deep
                appreciation for semantic markup and the cascade. Today, I
                leverage powerful tools like TypeScript and Framer Motion to
                create immersive user experiences that perform flawlessly across
                all devices.
              </motion.p>

              {/* Key Stats / Highlights */}
              <motion.div
                variants={itemVariants}
                className="pt-4 flex gap-8 border-t border-slate-800"
              >
                <div>
                  <span className="block text-3xl font-bold text-white">
                    50+
                  </span>
                  <span className="text-sm text-slate-500 uppercase tracking-wider">
                    Projects
                  </span>
                </div>
                <div>
                  <span className="block text-3xl font-bold text-white">
                    20+
                  </span>
                  <span className="text-sm text-slate-500 uppercase tracking-wider">
                    Happy Clients
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Column 2: Feature/Highlight Cards Grid */}
            {/* We also apply 'listVariants' here so the cards pop in sequence */}
            <motion.div
              variants={listVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {/* Card 1: Performance */}
              <motion.div
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(59, 130, 246, 0.5)",
                }}
                className="p-6 bg-card border border-slate-800 rounded-xl transition-colors group cursor-default"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <Zap className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <h4 className="text-white font-bold mb-2">Fast Performance</h4>
                <p className="text-slate-400 text-sm">
                  Optimized for Core Web Vitals, ensuring lightning-fast load
                  times.
                </p>
              </motion.div>

              {/* Card 2: Clean Code */}
              <motion.div
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(59, 130, 246, 0.5)",
                }}
                className="p-6 bg-card border border-slate-800 rounded-xl transition-colors group cursor-default"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <Code className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <h4 className="text-white font-bold mb-2">Clean Code</h4>
                <p className="text-slate-400 text-sm">
                  I write maintainable, scalable, and self-documenting code.
                </p>
              </motion.div>

              {/* Card 3: Responsive */}
              <motion.div
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(59, 130, 246, 0.5)",
                }}
                className="p-6 bg-card border border-slate-800 rounded-xl transition-colors group cursor-default"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <Globe className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <h4 className="text-white font-bold mb-2">Responsive</h4>
                <p className="text-slate-400 text-sm">
                  Mobile-first approach ensures your site looks perfect
                  anywhere.
                </p>
              </motion.div>

              {/* Card 4: Modern Tech */}
              <motion.div
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(59, 130, 246, 0.5)",
                }}
                className="p-6 bg-card border border-slate-800 rounded-xl transition-colors group cursor-default"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <Cpu className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <h4 className="text-white font-bold mb-2">Modern Tech</h4>
                <p className="text-slate-400 text-sm">
                  Leveraging the latest features of Next.js 14 and React 18.
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
