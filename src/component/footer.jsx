import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const socials = [
    { 
      label: 'GitHub', 
      href: 'https://github.com/manojsingh', // Assuming a placeholder/actual link
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      label: 'LinkedIn', 
      href: 'https://linkedin.com/in/manojsingh', // Assuming a placeholder/actual link
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      label: 'Email', 
      href: 'mailto:manojsingh76543212@gmail.com', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const handleNav = (href) => {
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="w-full relative bg-slate-950 overflow-hidden border-t border-white/10 pt-20 pb-8">
      {/* Radial Gradient Glow at Top Center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-gradient-to-b from-indigo-500/20 via-cyan-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />
      
      {/* Cinematic Reveal Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
        className="relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center gap-16"
      >
        {/* Top Section: CTA */}
        <div className="text-center w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 mb-4 leading-tight">
            Let's build something amazing together. 🚀
          </h2>
        </div>

        {/* Middle Section: Grid (Brand, Links, Socials) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-center md:items-start text-center md:text-left">
          
          {/* Brand/Subtitle */}
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-bold text-white">Manoj Singh</h3>
            <p className="text-slate-400 text-sm font-medium">Driven BCA Student &amp; MERN Stack Developer</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <h4 className="text-white font-bold text-lg mb-2">Quick Links</h4>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3">
              {quickLinks.map(link => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="text-slate-400 hover:text-indigo-400 text-sm font-medium transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex flex-col gap-4 items-center md:items-end text-center md:text-right">
            <h4 className="text-white font-bold text-lg mb-2">Connect</h4>
            <div className="flex items-center gap-4">
              {socials.map(social => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1, boxShadow: "0px 0px 15px rgba(99,102,241,0.5)", borderColor: "rgba(99,102,241,0.8)" }}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright */}
        <div className="w-full pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-sm text-slate-500 font-medium">
            &copy; 2026 Manoj Singh. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 font-medium">
            Built with <span className="text-red-500 px-1">❤️</span> &amp; React.
          </p>
        </div>

      </motion.div>
    </footer>
  );
}
