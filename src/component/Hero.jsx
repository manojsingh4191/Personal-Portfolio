import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import manojImage from '../assets/IMG_20251010_203207912_HDR.png';

function MagneticButton({ children, href, className }) {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.25);
    y.set(middleY * 0.25);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9, z: -20 }}
      style={{
        x: springX,
        y: springY,
        transformStyle: "preserve-3d"
      }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

function useTyping(phrases, speed = 78) {
  const [display, setDisplay]   = useState('');
  const [pIdx, setPIdx]         = useState(0);
  const [cIdx, setCIdx]         = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const cur   = phrases[pIdx];
    const delay = deleting ? speed / 2 : speed;
    const timer = setTimeout(() => {
      if (!deleting && cIdx < cur.length) {
        setDisplay(cur.slice(0, cIdx + 1));
        setCIdx(n => n + 1);
      } else if (!deleting && cIdx === cur.length) {
        setTimeout(() => setDeleting(true), 1900);
      } else if (deleting && cIdx > 0) {
        setDisplay(cur.slice(0, cIdx - 1));
        setCIdx(n => n - 1);
      } else {
        setDeleting(false);
        setPIdx(p => (p + 1) % phrases.length);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [cIdx, deleting, pIdx, phrases, speed]);

  return display;
}

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function Hero() {
  const typed = useTyping([
    'Frontend Developer',
    'MERN Stack Engineer',
    'React Enthusiast',
    'Full-Stack Builder',
  ]);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col items-center justify-center pt-28 pb-20 overflow-hidden"
    >
      {/* Grid background using pure tailwind utilities */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e515_1px,transparent_1px),linear-gradient(to_bottom,#4f46e515_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Global Container Centering applied here */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center">
        
        {/* Centered Flexbox layout for content */}
        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-16 lg:gap-12 mx-auto">

          {/* Left Text Content */}
          <div className="flex-1 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start max-w-2xl mx-auto lg:mx-0">
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={0}
              className="inline-flex items-center justify-center text-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mx-auto lg:mx-0 whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-semibold text-slate-300">Available for work</span>
            </motion.div>

            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="text-lg font-light text-slate-400 w-full"
            >
              Hello, I'm
            </motion.p>

            <motion.h1
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
              className="text-5xl sm:text-7xl font-extrabold tracking-tight w-full"
            >
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Manoj</span>
              <br />
              <span className="text-white">Singh</span>
            </motion.h1>

            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={3}
              className="text-2xl sm:text-3xl font-semibold text-indigo-300 min-h-[40px] w-full"
            >
              {typed}<span className="animate-pulse ml-1 text-indigo-400">|</span>
            </motion.div>

            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={4}
              className="text-base sm:text-lg text-slate-400 leading-relaxed w-full"
            >
              Driven BCA student with practical MERN stack & React experience
              seeking to build{' '}
              <span className="text-indigo-300 font-semibold">
                impactful, full-stack web applications
              </span>.
            </motion.p>

            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={5}
              className="flex flex-wrap gap-4 justify-center lg:justify-start w-full pt-4 [perspective:1000px]"
            >
              <MagneticButton
                href="mailto:manojsingh76543212@gmail.com"
                className="inline-flex items-center justify-center text-center px-8 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold shadow-lg shadow-indigo-500/25 whitespace-nowrap"
              >
                Hire Me 🚀
              </MagneticButton>
              <MagneticButton
                href="#projects"
                className="inline-flex items-center justify-center text-center px-8 py-3.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors backdrop-blur-sm whitespace-nowrap"
              >
                View Projects
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Image Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex items-center justify-center w-full mx-auto relative [perspective:1000px]"
          >
            <motion.div
              animate={{ 
                y: [-15, 15, -15],
                rotateX: [-5, 5, -5],
                rotateY: [5, -5, 5]
              }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="relative mx-auto"
            >
              <motion.div
                whileHover={{ rotateX: 8, rotateY: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative group mx-auto"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Image container anchored for badges */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2 bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 mx-auto shadow-2xl" style={{ transform: "translateZ(30px)" }}>
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-4 border-slate-950 relative">
                    <img
                      src={manojImage}
                      alt="Manoj Singh"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                {/* Floating Badge - Role (Bottom Left) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -bottom-4 -left-6 sm:-left-10 bg-slate-900/80 backdrop-blur-md border border-white/10 px-6 py-3.5 rounded-2xl shadow-xl shadow-black/50 z-20 flex flex-col items-center justify-center text-center"
                  style={{ transform: "translateZ(60px)" }}
                >
                  <p className="text-xs text-slate-400 mb-1 whitespace-nowrap font-medium">Role</p>
                  <p className="text-sm font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent whitespace-nowrap">MERN Stack Dev</p>
                </motion.div>

                {/* Floating Badge - Projects (Top Right) */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="absolute -top-4 -right-6 sm:-right-8 bg-slate-900/80 backdrop-blur-md border border-white/10 px-6 py-3.5 rounded-2xl shadow-xl shadow-black/50 z-20 flex flex-col items-center justify-center text-center"
                  style={{ transform: "translateZ(50px)" }}
                >
                  <p className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent whitespace-nowrap">2+</p>
                  <p className="text-xs font-medium text-slate-400 mt-1 whitespace-nowrap">Projects</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
