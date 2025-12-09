import React from "react";
import Layout from "./components/Layout";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import About from "./components/About";

/**
 * App Component (Acts as Next.js Page)
 *
 * In a real Next.js app, the <Layout> would be in `app/layout.tsx`
 * and the content below would be in `app/page.tsx`.
 *
 * I have structured it this way so you can easily migrate:
 * 1. Copy the contents of Layout.tsx to your Next.js layout.
 * 2. Copy the contents of this component's return to your Next.js page.
 */

const App: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </Layout>
  );
};

export default App;
