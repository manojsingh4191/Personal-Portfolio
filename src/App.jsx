import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from './component/navbar';
import Hero   from './component/Hero';
import { AboutSection, SkillsSection, ProjectsSection, ContactSection } from './component/Sections';
import Footer  from './component/footer';

function Divider({ color = 'via-indigo-500/20' }) {
  return (
    <div className={`w-full h-px bg-gradient-to-r from-transparent ${color} to-transparent`} />
  );
}

function ScrollReveal3D({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0.8 1"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        rotateX,
        opacity,
        transformStyle: "preserve-3d",
        perspective: 1500,
      }}
      className="w-full origin-top"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30 font-sans overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          
          <ScrollReveal3D>
            <Divider color="via-indigo-500/20" />
            <AboutSection />
          </ScrollReveal3D>
          
          <ScrollReveal3D>
            <Divider color="via-purple-500/20" />
            <SkillsSection />
          </ScrollReveal3D>
          
          <ScrollReveal3D>
            <Divider color="via-cyan-500/20" />
            <ProjectsSection />
          </ScrollReveal3D>
          
          <ScrollReveal3D>
            <Divider color="via-indigo-500/20" />
            <ContactSection />
          </ScrollReveal3D>
        </main>
        <Footer />
      </div>
    </div>
  );
}
