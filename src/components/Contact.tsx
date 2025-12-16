import React from "react";
import { motion as motionOriginal } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { TypewriterText } from "./TypewriterText";

// Cast motion to any to avoid type errors with motion props
const motion = motionOriginal as any;

/**
 * Contact Section Component
 */
const Contact: React.FC = () => {
  const introText =
    "I'm currently available for freelance work and full-time positions. If you have a project that needs some React magic or a Next.js overhaul, get in touch.";

  return (
    <section
      id="contact"
      className="py-24 bg-dark relative border-t border-slate-800"
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left Column: Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Let's Work Together
            </h2>

            {/* Typewriter Effect for Description */}
            <div className="mb-8 min-h-[5rem]">
              <TypewriterText
                text={introText}
                className="text-slate-400 leading-relaxed block"
                speed={0.015}
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                {/* Bouncing Email Icon Container - 2s duration */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                  className="p-3 bg-slate-800 rounded-lg text-primary"
                >
                  <Mail className="w-6 h-6" />
                </motion.div>
                <div>
                  <h4 className="text-white font-semibold">Email</h4>
                  <p className="text-slate-400">hello@developer.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                {/* Bouncing Phone Icon Container - 2.4s duration, delayed start */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.4,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                  className="p-3 bg-slate-800 rounded-lg text-primary"
                >
                  <Phone className="w-6 h-6" />
                </motion.div>
                <div>
                  <h4 className="text-white font-semibold">Phone</h4>
                  <p className="text-slate-400">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                {/* Bouncing Location Icon Container - 1.8s duration, delayed start */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    ease: "easeInOut",
                    delay: 0.6,
                  }}
                  className="p-3 bg-slate-800 rounded-lg text-primary"
                >
                  <MapPin className="w-6 h-6" />
                </motion.div>
                <div>
                  <h4 className="text-white font-semibold">Location</h4>
                  <p className="text-slate-400">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
            className="bg-card p-8 rounded-2xl border border-slate-800 shadow-xl"
          >
            <form
              className="space-y-6"
              onSubmit={(e: React.FormEvent) => e.preventDefault()}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-dark border border-slate-700 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-dark border border-slate-700 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-dark border border-slate-700 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white transition-colors resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg transition-all shadow-lg shadow-primary/25"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
