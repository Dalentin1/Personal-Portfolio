import React from "react";
import { motion as motionOriginal } from "framer-motion";
import { Project } from "@/types";
import { ExternalLink, Github } from "lucide-react";

// Cast motion to any to avoid type errors with motion props
const motion = motionOriginal as any;

// Sample Project Data
// In a real app, this might come from a CMS or API
const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description:
      "A high-performance analytics dashboard built with Next.js 14 and Server Actions. Features real-time data visualization and complex state management.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Recharts"],
    imageUrl: "https://picsum.photos/600/400?random=1",
    link: "#",
  },
  {
    id: 2,
    title: "SaaS Landing Page",
    description:
      "Modern landing page with heavy use of Framer Motion for scroll animations and interactive UI components. Fully responsive and accessible.",
    tags: ["React", "Framer Motion", "SASS"],
    imageUrl: "https://picsum.photos/600/400?random=2",
    link: "#",
  },
  {
    id: 3,
    title: "Mobile Fitness App",
    description:
      "Cross-platform mobile application for tracking workouts and nutrition. Built with React Native and integrated with device health APIs.",
    tags: ["React Native", "Expo", "Redux"],
    imageUrl: "https://picsum.photos/600/400?random=3",
    link: "#",
  },
];

/**
 * Projects Section Component
 *
 * Displays a grid of project cards with hover effects.
 */
const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-card/30 relative">
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
            Featured Projects
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-4" />
          <p className="text-slate-400 max-w-2xl mx-auto">
            A selection of projects that demonstrate my ability to solve complex
            problems and deliver high-quality digital products.
          </p>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              // Card Entrance Animation
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered delay based on index
              viewport={{ once: false, amount: 0.1 }}
              className="bg-card rounded-xl overflow-hidden border border-slate-800 hover:border-primary/50 transition-colors group"
            >
              {/* Image Container with Overlay */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />

                {/* Hover Overlay: Shows Github and Link buttons */}
                <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a
                    href={project.link}
                    className="p-3 bg-white text-dark rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={project.link}
                    className="p-3 bg-white text-dark rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-800 text-xs font-medium text-primary rounded-full border border-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
