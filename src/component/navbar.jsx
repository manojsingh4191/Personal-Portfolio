import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import manojImage from '../assets/manojsingh 123.png';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isScrolling = useRef(false);
  const scrollTimeout = useRef(null);

  /* ── track scroll position ── */
  useEffect(() => {
    // 1. Scroll-spy with IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Section is considered active when 50% visible
      }
    );

    navLinks.forEach((link) => {
      const el = document.getElementById(link.href.slice(1));
      if (el) observer.observe(el);
    });

    // 2. Track general scroll for navbar background
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);

    if (el) {
      // Instantly set active and pause observer
      setActiveSection(id);
      isScrolling.current = true;

      // Clear any existing timeout
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      // Delay scroll slightly so the mobile menu close render cycle doesn't interrupt it
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth' });
      }, 50);

      // Re-enable observer after smooth scroll completes
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
      }, 850);
    }
  };

  return (
    <div className="fixed top-6 left-0 w-full z-50 flex flex-col items-center px-4">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`w-full max-w-5xl flex items-center justify-between px-6 py-4 rounded-full transition-all duration-500 ${scrolled
            ? 'bg-slate-900/80 backdrop-blur-lg border border-white/10 shadow-lg'
            : 'bg-slate-900/40 backdrop-blur-sm border border-white/5'
          }`}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => handleNav('#home')}
        >
          <img
            src={manojImage}
            alt="Manoj Singh"
            className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500/40 shadow-md"
          />
          {/* Desktop Name */}
          <span className="font-bold text-lg bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent hidden sm:block whitespace-nowrap">
            Manoj Singh
          </span>
          {/* Mobile Name/Label */}
          <span className="text-sm font-bold text-indigo-400 sm:hidden whitespace-nowrap">
            Portfolio
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.button
              key={link.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNav(link.href)}
              className={`relative inline-flex items-center justify-center text-center px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${activeSection === link.href.slice(1)
                  ? 'text-white'
                  : 'text-white/60 hover:text-white/90'
                }`}
            >
              {activeSection === link.href.slice(1) && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.14)' }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </motion.button>
          ))}
        </div>

        {/* CTA Button */}
        <motion.a
          href="mailto:manojsingh76543212@gmail.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:inline-flex items-center justify-center text-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition-opacity text-white text-sm font-bold shadow-lg cursor-pointer whitespace-nowrap"
        >
          <span>Hire Me</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.a>

        {/* Hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center text-center p-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-5xl bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="px-8 py-6 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNav(link.href)}
                  className={`inline-flex items-center justify-center text-center px-5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${activeSection === link.href.slice(1)
                      ? 'text-indigo-300 bg-indigo-500/10 border border-indigo-500/30'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {link.label}
                </motion.button>
              ))}
              <a
                href="mailto:manojsingh76543212@gmail.com"
                className="mt-4 inline-flex items-center justify-center text-center px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold shadow-lg whitespace-nowrap"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
