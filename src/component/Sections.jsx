import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

// --- Shared Components & Animations ---

const mergeTransition = { type: "spring", stiffness: 50, damping: 15, duration: 0.8 };

const mergeLeft = {
  initial: { opacity: 0, x: -300 },
  whileInView: { opacity: 1, x: 0, transition: mergeTransition }
};

const mergeRight = {
  initial: { opacity: 0, x: 300 },
  whileInView: { opacity: 1, x: 0, transition: mergeTransition }
};

const mergeUp = {
  initial: { opacity: 0, y: 100 },
  whileInView: { opacity: 1, y: 0, transition: mergeTransition }
};

function MagneticSubmitButton({ children, className, disabled }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e) => {
    if (!ref.current || disabled) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.25);
    y.set(middleY * 0.25);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      type="submit"
      disabled={disabled}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.9, z: -20 } : {}}
      style={{ x: springX, y: springY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

function TiltAboutCard({ children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`[perspective:1000px] ${className}`}
    >
      <div className="w-full h-full relative" style={{ transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}

function Section({ id, children }) {
  return (
    <section id={id} className="w-full py-20 sm:py-24 flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center">
        {children}
      </div>
    </section>
  );
}

function SectionHead({ pill, title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center text-center mx-auto mb-12 lg:mb-16 w-full">
      <span className="inline-flex items-center justify-center text-center px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 mb-6 mx-auto whitespace-nowrap">
        {pill}
      </span>
      <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 text-center">{title}</h2>
      {subtitle && <p className="text-lg text-slate-400 max-w-2xl mx-auto text-center leading-relaxed">{subtitle}</p>}
    </div>
  );
}

// --- About Section ---
export function AboutSection() {
  const stats = [
    { value: '2+', label: 'Projects Shipped' },
    { value: 'BCA', label: 'Degree (2024–27)' },
    { value: 'MERN', label: 'Core Stack' },
    { value: '100%', label: 'ACID Compliance' },
  ];

  return (
    <Section id="about">
      <SectionHead pill="Who I Am" title="About Me" subtitle="A passionate builder turning ideas into production-ready products." />

      <div className="w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center justify-center mx-auto">
        {/* LEFT COLUMN — Split/Merge reveal */}
        <motion.div
          initial={mergeLeft.initial}
          whileInView={mergeLeft.whileInView}
          viewport={{ once: false, amount: 0.2 }}
          className="flex flex-col gap-8 items-center lg:items-start text-center lg:text-left w-full mx-auto"
        >
          {/* Bio Text */}
          <div className="space-y-6 text-lg text-slate-300 leading-relaxed w-full">
            <p>
              I'm <span className="text-white font-semibold">Manoj Singh</span>, a BCA student at <span className="text-indigo-400 font-medium">Amrapali Group of Institutes</span>, Haldwani, Uttarakhand (2024–2027), specialising in Computer Science &amp; Engineering.
            </p>
            <p>
              I thrive on building full-stack applications with the MERN stack — from architecting secure Node.js backends with Mongoose schemas to crafting fluid React UIs. I love turning complex problems into elegant, user-centric solutions.
            </p>
          </div>

          {/* Trait Pills — spring hover with glow */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 w-full">
            {['Problem Solver', 'Fast Learner', 'Team Player', 'Detail-Oriented'].map(t => (
              <motion.span
                key={t}
                whileHover={{
                  scale: 1.1,
                  y: -4,
                  boxShadow: '0px 8px 24px rgba(99,102,241,0.45)',
                  borderColor: 'rgba(99,102,241,0.6)',
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                className="inline-flex items-center justify-center text-center px-4 py-2 rounded-full text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 whitespace-nowrap cursor-default"
              >
                {t}
              </motion.span>
            ))}
          </div>

          {/* Education Card — floating */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-sm w-full flex flex-col gap-5 sm:gap-6"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left w-full">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 shrink-0 mx-auto sm:mx-0">
                <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <div className="flex-1 flex flex-col gap-2 w-full">
                <p className="text-xs font-bold uppercase tracking-widest text-indigo-400">Education</p>
                <p className="text-white font-bold text-lg">Bachelor of Computer Applications (BCA)</p>
                <p className="text-slate-400 text-sm">Computer Science &amp; Engineering</p>
                <p className="text-slate-500 text-sm">Amrapali Group of Institutes · Haldwani</p>
                <div className="inline-flex items-center justify-center text-center mt-2 px-4 py-2 rounded-full text-xs font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 self-center sm:self-start whitespace-nowrap">
                  📅 2024 – 2027
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN — 3D tilt stat cards */}
        <motion.div
          initial={mergeRight.initial}
          whileInView={mergeRight.whileInView}
          viewport={{ once: false, amount: 0.2 }}
          className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center mx-auto"
        >
          {stats.map((s, i) => (
            <TiltAboutCard key={s.label} className="w-full mx-auto">
              <div
                className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 text-center backdrop-blur-sm flex flex-col items-center justify-center mx-auto w-full h-full gap-3 relative overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }} className="flex flex-col items-center justify-center gap-3">
                  <p className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">{s.value}</p>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{s.label}</p>
                </div>
              </div>
            </TiltAboutCard>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

// --- Skills Section ---
export function SkillsSection() {
  const categories = [
    { label: 'Languages', icon: '{ }', skills: ['JavaScript', 'Python'], color: 'text-amber-400' },
    { label: 'Frameworks', icon: '⚛', skills: ['React', 'Node.js', 'Express.js', 'Tailwind CSS'], color: 'text-indigo-400' },
    { label: 'Database', icon: '🗄', skills: ['MongoDB'], color: 'text-emerald-400' },
    { label: 'Tools', icon: '🛠', skills: ['MERN Stack', 'Git', 'GitHub', 'Vite'], color: 'text-pink-400' },
  ];

  const allSkills = ['React', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'Python', 'Tailwind CSS', 'Git', 'GitHub', 'Vite', 'MERN Stack', 'REST APIs', 'bcrypt', 'Mongoose'];

  return (
    <Section id="skills">
      <SectionHead pill="Expertise" title="Skills & Technologies" subtitle="A curated toolkit built through hands-on project development." />

      <div className="w-full grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 lg:mb-16 justify-center mx-auto">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={i < 2 ? mergeLeft.initial : mergeRight.initial}
            whileInView={i < 2 ? mergeLeft.whileInView : mergeRight.whileInView}
            viewport={{ once: false, amount: 0.2 }}
            className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md flex flex-col items-center text-center w-full mx-auto gap-5 sm:gap-6"
          >
            <div className={`text-3xl ${cat.color}`}>{cat.icon}</div>
            <h3 className="text-white font-extrabold text-lg">{cat.label}</h3>
            <div className="flex flex-wrap justify-center gap-3 w-full [perspective:1000px]">
              {cat.skills.map((skill, index) => (
                <motion.span 
                  key={skill}
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ repeat: Infinity, duration: 4 + (index % 3), ease: "easeInOut", delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.15, 
                    rotateZ: (index % 2 === 0 ? 3 : -3),
                    boxShadow: "0px 0px 20px rgba(99,102,241,0.6)",
                    z: 30
                  }}
                  className="inline-flex items-center justify-center text-center px-4 py-2 rounded-full text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-300 whitespace-nowrap"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={mergeUp.initial}
        whileInView={mergeUp.whileInView}
        viewport={{ once: false, amount: 0.2 }}
        className="flex flex-wrap justify-center items-center gap-3 w-full mx-auto"
      >
        {allSkills.map(s => (
          <span key={s} className="inline-flex items-center justify-center text-center px-5 py-2.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-colors cursor-default whitespace-nowrap">
            {s}
          </span>
        ))}
      </motion.div>
    </Section>
  );
}

// --- Projects Section ---
function TiltProjectCard({ proj, i }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const bg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.1) 0%, transparent 60%)`;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={i === 0 ? mergeLeft.initial : mergeRight.initial}
      whileInView={i === 0 ? mergeLeft.whileInView : mergeRight.whileInView}
      viewport={{ once: false, amount: 0.2 }}
      className="relative w-full mx-auto [perspective:1000px]"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full"
      >
        <div 
          className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md flex flex-col items-center text-center lg:items-start lg:text-left gap-5 sm:gap-6 w-full h-full relative overflow-hidden"
        >
          <motion.div 
            className="absolute inset-0 pointer-events-none z-0 rounded-3xl"
            style={{ background: bg, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
          
          <div className="z-10 flex flex-col items-center text-center lg:items-start lg:text-left gap-5 sm:gap-6 w-full h-full" style={{ transformStyle: "preserve-3d" }}>
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5 w-full text-center sm:text-left" style={{ transformStyle: "preserve-3d" }}>
              <div className="flex flex-col sm:flex-row items-center gap-5 min-w-0 flex-1 w-full justify-center sm:justify-start" style={{ transformStyle: "preserve-3d" }}>
                <div className={`inline-flex items-center justify-center p-4 rounded-2xl text-2xl bg-${proj.accent}-500/20 border border-${proj.accent}-500/30 mx-auto sm:mx-0`} style={{ transform: "translateZ(80px)" }}>
                  {proj.icon}
                </div>
                <div className="min-w-0 flex flex-col items-center sm:items-start w-full gap-2" style={{ transform: "translateZ(60px)" }}>
                  <h3 className="text-white font-extrabold text-xl truncate w-full">{proj.title}</h3>
                  <p className="text-xs font-medium text-slate-400">🗓 {proj.period}</p>
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-center sm:items-end gap-3 w-full sm:w-auto mt-2 sm:mt-0" style={{ transform: "translateZ(50px)" }}>
                <span className={`inline-flex items-center justify-center text-center px-4 py-2 rounded-full text-xs font-bold bg-${proj.accent}-500/10 border border-${proj.accent}-500/30 text-${proj.accent}-400 whitespace-nowrap`}>
                  {proj.tag}
                </span>
                <span className="inline-flex items-center justify-center text-center gap-2 text-xs text-emerald-400 font-bold whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed text-base w-full" style={{ transform: "translateZ(40px)" }}>{proj.description}</p>

            <ul className="flex flex-col gap-3 w-full" style={{ transform: "translateZ(30px)" }}>
              {proj.bullets.map((b, bi) => (
                <li key={bi} className="flex items-start justify-center lg:justify-start gap-3 text-sm text-slate-400 text-center lg:text-left w-full">
                  <svg className={`w-5 h-5 shrink-0 text-${proj.accent}-400 mt-0.5`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-auto pt-3 w-full" style={{ transform: "translateZ(50px)" }}>
              {proj.tech.map(t => (
                <span key={t} className="inline-flex items-center justify-center text-center px-4 py-2 rounded-full text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-300 whitespace-nowrap">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const projects = [
    {
      title: 'Bank Transaction System',
      period: 'Feb 2026 – Present',
      tag: 'Full-Stack',
      icon: '🏦',
      accent: 'indigo',
      description: 'A robust banking backend with ACID-compliant transactions, secure PIN authentication, and optimised data retrieval.',
      bullets: [
        'Architected Node.js backend with 4 core Mongoose schemas ensuring 100% ACID compliance',
        'Engineered secure UPI PIN authentication using bcrypt hashing',
        'Optimised data retrieval using MongoDB deep population queries',
      ],
      tech: ['MERN Stack', 'React', 'Vite', 'Tailwind CSS', 'bcrypt', 'Mongoose'],
    },
    {
      title: 'Full-Stack Social Feed App',
      period: 'Jun 2026 – Present',
      tag: 'Social Platform',
      icon: '📱',
      accent: 'cyan',
      description: 'A dynamic social media platform with real-time CRUD operations, media uploads, and a fully responsive React UI.',
      bullets: [
        'Dynamic MERN platform executing 100% core CRUD via RESTful APIs',
        'Secured media uploads through ImgBB API proxied via Node.js backend',
        'Built responsive React UI with modular, reusable component architecture',
      ],
      tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'ImgBB API', 'REST APIs'],
    },
  ];

  return (
    <Section id="projects">
      <SectionHead pill="My Work" title="Featured Projects" subtitle="Production-grade applications built from the ground up." />

      <div className="w-full grid lg:grid-cols-2 gap-8 justify-center mx-auto">
        {projects.map((proj, i) => (
          <TiltProjectCard key={proj.title} proj={proj} i={i} />
        ))}
      </div>
    </Section>
  );
}

// --- Contact Section ---
export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: "1ca50b58-2f14-4995-bfe1-82f66575ee05",
          ...formData
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const contactItems = [
    { label: 'Email', value: 'manojsingh76543212@gmail.com', href: 'mailto:manojsingh76543212@gmail.com' },
    { label: 'Phone', value: '+91 87913 77594', href: 'tel:+918791377594' },
    { label: 'Location', value: 'Haldwani, Uttarakhand, India', href: null },
  ];

  return (
    <Section id="contact">
      <SectionHead pill="Get In Touch" title="Contact Me" subtitle="Ready to collaborate on something great? Let's connect." />

      <div className="w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center justify-center mx-auto">
        <motion.div
          initial={mergeLeft.initial}
          whileInView={mergeLeft.whileInView}
          viewport={{ once: false, amount: 0.2 }}
          className="flex flex-col gap-8 items-center lg:items-start text-center lg:text-left w-full mx-auto"
        >
          <p className="text-lg text-slate-400 leading-relaxed w-full">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team. Whether you have a question or just want to say hi, my inbox is always open!
          </p>

          <div className="flex flex-col gap-6 w-full items-center lg:items-start">
            {contactItems.map((item) => (
              <div key={item.label} className="flex flex-col sm:flex-row items-center gap-5 w-full justify-center lg:justify-start">
                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0 mx-auto sm:mx-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0 flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-white font-extrabold hover:text-indigo-400 transition-colors break-all text-base sm:text-lg">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white font-extrabold text-base sm:text-lg">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.form
          initial={mergeRight.initial}
          whileInView={mergeRight.whileInView}
          viewport={{ once: false, amount: 0.2 }}
          className="w-full bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col items-center gap-6 backdrop-blur-md text-center mx-auto"
          onSubmit={handleSubmit}
        >
          <h3 className="text-white font-extrabold text-2xl mb-2 w-full text-center">Send a Message</h3>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="name" className="text-xs font-bold tracking-wider text-slate-400 text-left uppercase">Your Name</label>
            <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="w-full bg-slate-950/50 border border-slate-700 rounded-2xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all text-left text-base" required />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email" className="text-xs font-bold tracking-wider text-slate-400 text-left uppercase">Your Email</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="w-full bg-slate-950/50 border border-slate-700 rounded-2xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all text-left text-base" required />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="message" className="text-xs font-bold tracking-wider text-slate-400 text-left uppercase">Message</label>
            <textarea id="message" rows="5" value={formData.message} onChange={handleChange} placeholder="Tell me about your project..." className="w-full bg-slate-950/50 border border-slate-700 rounded-2xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none text-left text-base" required />
          </div>

          <MagneticSubmitButton disabled={status === 'submitting' || status === 'success'} className="w-full py-4 mt-2 inline-flex items-center justify-center text-center rounded-2xl bg-indigo-600 disabled:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-base transition-colors shadow-lg shadow-indigo-500/25 whitespace-nowrap [perspective:1000px]">
            {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Message Sent! ✅' : status === 'error' ? 'Error. Try Again.' : 'Send Message 🚀'}
          </MagneticSubmitButton>
        </motion.form>
      </div>
    </Section>
  );
}
