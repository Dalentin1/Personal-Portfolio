import React from "react";
import { motion as motionOriginal } from "framer-motion";
import { Skill } from "@/types";
import {
  Layers,
  FileCode,
  Smartphone,
  Palette,
  Globe,
  Box,
  Database,
  Server,
  GitBranch,
  Terminal,
  Zap,
} from "lucide-react";
import { TypewriterText } from "./TypewriterText";

// Cast motion to any to avoid type errors with motion props
const motion = motionOriginal as any;

// Skills Data Definition
const skills: Skill[] = [
  // Frontend & Mobile
  {
    name: "Next.js",
    level: 95,
    category: "frontend",
    icon: <Globe className="w-5 h-5" />,
  },
  {
    name: "React",
    level: 85,
    category: "frontend",
    icon: <Box className="w-5 h-5" />,
  },
  {
    name: "TypeScript",
    level: 88,
    category: "frontend",
    icon: <FileCode className="w-5 h-5" />,
  },
  {
    name: "React Native",
    level: 65,
    category: "mobile",
    icon: <Smartphone className="w-5 h-5" />,
  },

  // Styles
  {
    name: "Tailwind CSS",
    level: 92,
    category: "styles",
    icon: <Palette className="w-5 h-5" />,
  },
  {
    name: "CSS",
    level: 90,
    category: "styles",
    icon: <Palette className="w-5 h-5" />,
  },
  {
    name: "SASS",
    level: 70,
    category: "styles",
    icon: <Layers className="w-5 h-5" />,
  },
  {
    name: "Chakra UI",
    level: 78,
    category: "styles",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    name: "HTML",
    level: 80,
    category: "frontend",
    icon: <FileCode className="w-5 h-5" />,
  },

  // Backend & APIs
  {
    name: "Next API",
    level: 95,
    category: "backend",
    icon: <Server className="w-5 h-5" />,
  },
  {
    name: "Node.js",
    level: 90,
    category: "backend",
    icon: <Server className="w-5 h-5" />,
  },
  {
    name: "REST API",
    level: 88,
    category: "backend",
    icon: <Globe className="w-5 h-5" />,
  },
  {
    name: "Postgres SQL",
    level: 84,
    category: "backend",
    icon: <Database className="w-5 h-5" />,
  },
  {
    name: "Prisma",
    level: 85,
    category: "backend",
    icon: <Database className="w-5 h-5" />,
  },

  // Tools
  {
    name: "Git/Github",
    level: 90,
    category: "tools",
    icon: <GitBranch className="w-5 h-5" />,
  },
  {
    name: "Vercel",
    level: 89,
    category: "tools",
    icon: <Terminal className="w-5 h-5" />,
  },
];

/**
 * SkillBar Sub-component
 *
 * Update: Added Bouncing Animation with variable duration based on index.
 * Update 2: Added Animated Gradient on the bar itself.
 */
const SkillBar: React.FC<{ skill: Skill; index: number }> = ({
  skill,
  index,
}) => {
  return (
    <div className="mb-6">
      {/* Header: Icon, Name, and Percentage */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 text-white font-medium">
          {/* Animated Icon Container */}
          <motion.span
            animate={{ y: [0, -4, 0] }} // Bounce effect
            transition={{
              repeat: Infinity,
              // Vary duration between 1.5s and 2.5s based on index to avoid robotic synchronization
              duration: 1.5 + (index % 4) * 0.25,
              ease: "easeInOut",
              // Initial stagger
              delay: (index % 3) * 0.2,
            }}
            className="text-primary inline-flex"
          >
            {skill.icon}
          </motion.span>
          {skill.name}
        </div>
        <span className="text-slate-400 font-mono text-sm">{skill.level}%</span>
      </div>

      {/* Progress Bar Container */}
      <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
          viewport={{ once: true }} // Fix: Set once: true to stop glitching
          className="h-full relative overflow-hidden rounded-full"
        >
          {/* 
               ANIMATED GRADIENT ON BAR 
               We use an absolute positioned div that is 100% size of the parent motion.div.
               The parent expands its width, and this child handles the gradient animation.
             */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              background:
                "linear-gradient(90deg, #3b82f6, #06b6d4, #6366f1, #3b82f6)",
              backgroundSize: "200% 100%",
            }}
            animate={{
              backgroundPosition: ["0% center", "200% center"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* The white glow tip at the end of the bar */}
          <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-white/50 shadow-[0_0_10px_white] z-10"></div>
        </motion.div>
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const skillDescription =
    "My development stack focuses on performance, scalability, and clean code. Here is a breakdown of my expertise in key technologies.";

  return (
    /**
     * UPDATE: Transparent Background
     * Removed 'bg-dark' class. The section is now transparent, allowing the
     * animated particles from the main Layout to be visible underneath this content.
     */
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.1 }} // Fix: Set once: true to stop glitching
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Technical Proficiency
          </h2>

          {/* 
             ANIMATED GRADIENT SEPARATOR
             1. We define a linear gradient that includes Blue, Cyan, Indigo, and loops back to Blue.
             2. backgroundSize is set to 200% so we have room to slide the gradient.
             3. We animate backgroundPosition from "0%" to "200%" to create a continuous flow effect.
          */}
          <motion.div
            className="w-24 h-1.5 mx-auto rounded-full mb-4"
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

          {/* Typewriter Effect Description - Repeats every 9s if in view */}
          <div className="text-slate-400 max-w-2xl mx-auto min-h-[3rem]">
            <TypewriterText
              text={skillDescription}
              speed={0.015}
              repeatInterval={9000}
            />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Column 1 */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-2 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" /> Frontend Ecosystem
            </h3>
            {skills
              .filter((s) =>
                ["frontend", "mobile", "styles"].includes(s.category)
              )
              .map((skill, idx) => (
                <SkillBar key={skill.name} skill={skill} index={idx} />
              ))}
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-2 flex items-center gap-2">
              <Server className="w-5 h-5 text-primary" /> Backend &
              Infrastructure
            </h3>
            {skills
              .filter((s) => ["backend", "tools"].includes(s.category))
              .map((skill, idx) => (
                <SkillBar key={skill.name} skill={skill} index={idx + 6} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
