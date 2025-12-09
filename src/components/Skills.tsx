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
} from "lucide-react";

// Cast motion to any to avoid type errors with motion props
const motion = motionOriginal as any;

// Skills Data Definition
// This maps specific percentages to skill names for the visual bars
const skills: Skill[] = [
  {
    name: "Next.js",
    level: 95,
    category: "frontend",
    icon: <Globe className="w-5 h-5" />,
  },
  {
    name: "CSS",
    level: 90,
    category: "styles",
    icon: <Palette className="w-5 h-5" />,
  },
  {
    name: "React",
    level: 85,
    category: "frontend",
    icon: <Box className="w-5 h-5" />,
  },
  {
    name: "HTML",
    level: 80,
    category: "frontend",
    icon: <FileCode className="w-5 h-5" />,
  },
  {
    name: "SASS",
    level: 70,
    category: "styles",
    icon: <Layers className="w-5 h-5" />,
  },
  {
    name: "React Native",
    level: 65,
    category: "mobile",
    icon: <Smartphone className="w-5 h-5" />,
  },
];

/**
 * SkillBar Sub-component
 *
 * Renders a single progress bar for a skill.
 *
 * @param skill - The skill object containing name, level, and icon.
 * @param index - The index in the list, used for staggered animation delays.
 */
const SkillBar: React.FC<{ skill: Skill; index: number }> = ({
  skill,
  index,
}) => {
  return (
    <div className="mb-8">
      {/* Header: Icon, Name, and Percentage */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 text-white font-medium">
          <span className="text-primary">{skill.icon}</span>
          {skill.name}
        </div>
        <span className="text-slate-400 font-mono text-sm">{skill.level}%</span>
      </div>

      {/* Progress Bar Container (Gray Background) */}
      <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
        {/* Animated Progress Bar (Gradient) */}
        <motion.div
          initial={{ width: 0 }} // Start at 0 width
          whileInView={{ width: `${skill.level}%` }} // Animate to actual percentage
          transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }} // Re-animate every time it comes into view
          className="h-full bg-gradient-to-r from-primary to-secondary relative"
        >
          {/* Glossy shine effect on the right edge of the bar */}
          <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-white/50 shadow-[0_0_10px_white]"></div>
        </motion.div>
      </div>
    </div>
  );
};

/**
 * Skills Section Component
 *
 * Displays technical proficiency split into two columns.
 */
const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-dark relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Technical Proficiency
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-4" />
          <p className="text-slate-400 max-w-2xl mx-auto">
            My development stack focuses on performance, scalability, and clean
            code. Here is a breakdown of my expertise in key technologies.
          </p>
        </motion.div>

        {/* Skills Grid - Split into 2 columns for better readability */}
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Column 1: JS Frameworks */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-2">
              Core Frameworks
            </h3>
            {skills
              .filter((s) =>
                ["Next.js", "React", "React Native"].includes(s.name)
              )
              .map((skill, idx) => (
                <SkillBar key={skill.name} skill={skill} index={idx} />
              ))}
          </div>

          {/* Column 2: Styling Languages */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-2">
              Styling & Markup
            </h3>
            {skills
              .filter((s) => ["CSS", "HTML", "SASS"].includes(s.name))
              .map((skill, idx) => (
                <SkillBar key={skill.name} skill={skill} index={idx + 3} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
