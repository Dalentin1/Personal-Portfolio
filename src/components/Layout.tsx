import React from 'react';
import Header from './Header';
import AnimatedBackground from './AnimatedBackground';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Layout Component
 * 
 * In a Next.js application, this would correspond to `app/layout.tsx`.
 * It wraps the entire application with the persistent elements:
 * - Animated Background
 * - Header (Navbar)
 * - Footer
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-dark min-h-screen text-slate-200 selection:bg-primary selection:text-white relative">
      {/* 
        Background Layer
        Placed here so it persists across all pages
      */}
      <AnimatedBackground />
      
      {/* Navigation */}
      <Header />
      
      {/* 
        Main Page Content 
        This is where the children (like app/page.tsx) are rendered.
        z-10 ensures it floats above the canvas background.
      */}
      <main className="relative z-10 flex flex-col">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 bg-dark/50 border-t border-slate-800 py-8 text-center text-slate-500 text-sm backdrop-blur-sm">
        <p>&copy; {new Date().getFullYear()} DevPortfolio. Built with React, Next.js patterns & Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default Layout;