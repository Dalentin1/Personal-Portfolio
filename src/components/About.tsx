import React from "react";
import { motion as motionOriginal } from "framer-motion";
import { Code, Cpu, Globe, Zap, Database } from "lucide-react";
import { TypewriterText } from "./TypewriterText"; // Importing the new reusable component

// Cast motion to any to avoid type errors with motion props
const motion = motionOriginal as any;

/**
 * GradientBorderCard Component
 * Used for the Stats (Projects, Clients)
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
      <motion.div
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{
          repeat: Infinity,
          duration: duration,
          ease: "linear",
        }}
        className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,#0f172a_0%,#3b82f6_50%,#0f172a_100%)] opacity-100 transition-opacity duration-500"
      />

      <div className="relative bg-dark h-full w-full rounded-xl p-6 flex flex-col justify-center items-center text-center">
        {children}
      </div>
    </div>
  );
};

/**
 * FeatureCard Component
 *
 * Logic:
 * - Shows an animated gradient border (via p-[2px] and a spinning background layer) on ALL screens.
 *
 * Update: Removed desktop-specific hiding (lg:hidden) and static borders so animation plays on desktop too.
 */
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
  variants: any;
  reverse?: boolean; // New prop for controlling rotation direction
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  delay,
  variants,
  reverse = false,
}) => {
  return (
    <motion.div
      variants={variants}
      className="relative group rounded-xl overflow-hidden p-[2px]"
    >
      {/* 
        Animated Gradient Layer 
        - Visible on all screens
        - Direction controlled by `reverse` prop
      */}
      <motion.div
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,#0f172a_0%,#3b82f6_50%,#0f172a_100%)]"
      />

      {/* Content Container */}
      <div className="relative bg-card h-full p-6 rounded-xl transition-colors">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay,
          }}
          className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors"
        >
          <Icon className="w-6 h-6 text-primary group-hover:text-white" />
        </motion.div>
        <h4 className="text-white font-bold mb-2">{title}</h4>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>
    </motion.div>
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

  // Content Strings
  const introText =
    "Passionate about bridging the gap between engineering and design. I build software that is not only functional but also intuitive and beautiful.";
  const bioPara1 =
    "I am a versatile Full Stack Developer capable of architecting and building complete web applications from start to finish. With over 5 years of experience, I specialize in the Next.js ecosystem, handling everything from responsive UIs to secure backend APIs.";
  const bioPara2 =
    "My journey began with frontend design, but I quickly evolved to master the server-side. I now leverage tools like Node.js, Postgres, and Prisma to build robust data layers, while maintaining a pixel-perfect standard on the client side using Tailwind CSS and TypeScript.";

  return (
    <section id="about" className="py-24 bg-dark relative z-10">
      <div className="container mx-auto px-6">
        {/* Main Container */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} // FIX: Changed 'once' to true to stop glitching
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              About Me
            </h2>

            {/* 
               ANIMATED GRADIENT SEPARATOR
            */}
            <motion.div
              className="w-24 h-1.5 mx-auto rounded-full mb-6"
              style={{
                background:
                  "linear-gradient(90deg, #3b82f6, #06b6d4, #6366f1, #3b82f6)",
                backgroundSize: "200% 100%",
              }}
              animate={{
                backgroundPosition: ["0% center", "200% center"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Header Typewriter Effect - Uses new component */}
            <div className="min-h-[3rem] text-lg text-slate-400 max-w-2xl mx-auto">
              <TypewriterText text={introText} speed={0.02} />
            </div>
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

              {/* Bio Paragraph 1 - Typewriter */}
              <div className="min-h-[6rem]">
                <TypewriterText
                  text={bioPara1}
                  className="text-slate-400 leading-relaxed block"
                  delay={0.5} // Wait for header to finish
                  speed={0.01}
                />
              </div>

              {/* Bio Paragraph 2 - Typewriter */}
              <div className="min-h-[6rem]">
                <TypewriterText
                  text={bioPara2}
                  className="text-slate-400 leading-relaxed block"
                  delay={2.5} // Wait for first para to finish approx
                  speed={0.01}
                />
              </div>

              {/* Key Stats / Highlights */}
              <motion.div
                variants={itemVariants}
                className="pt-4 grid grid-cols-2 gap-6"
              >
                {/* Stat 1: Projects */}
                <GradientBorderCard duration={4} reverse={false}>
                  <span className="block text-4xl font-bold text-white mb-1">
                    50+
                  </span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                    Projects Completed
                  </span>
                </GradientBorderCard>

                {/* Stat 2: Clients */}
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
              <FeatureCard
                icon={Database}
                title="Full Stack"
                description="Seamless integration between frontend UIs and backend databases."
                delay={0}
                variants={itemVariants}
                reverse={false} // Clockwise
              />

              <FeatureCard
                icon={Code}
                title="Clean Code"
                description="I write maintainable, scalable, and self-documenting code."
                delay={0.5}
                variants={itemVariants}
                reverse={true} // Counter-Clockwise
              />

              <FeatureCard
                icon={Globe}
                title="Responsive"
                description="Mobile-first approach ensures your site looks perfect anywhere."
                delay={1.0}
                variants={itemVariants}
                reverse={false} // Clockwise
              />

              <FeatureCard
                icon={Cpu}
                title="Modern Tech"
                description="Leveraging Server Actions, SSR, and Edge Computing."
                delay={1.5}
                variants={itemVariants}
                reverse={true} // Counter-Clockwise
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
