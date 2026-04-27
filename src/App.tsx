import { type FormEvent, useEffect, useRef, useState } from 'react';
import { 
  Terminal, 
  Database, 
  Zap, 
  ArrowRight, 
  Mail, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter,
  LayoutDashboard,
  CreditCard,
  BrainCircuit,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from './lib/utils';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero Animations
    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });

      // Section Reveals
      const sections = [aboutRef, experienceRef, projectsRef, skillsRef, contactRef];
      sections.forEach((section) => {
        if (section.current) {
          gsap.from(section.current.querySelectorAll('.reveal'), {
            scrollTrigger: {
              trigger: section.current,
              start: 'top 80%',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out'
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setFormError(null);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json().catch(() => null);
      if (res.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
        setFormError(json?.error || (json && JSON.stringify(json)) || 'Failed to send');
      }
    } catch (err: any) {
      setFormStatus('error');
      setFormError((err && err.message) || String(err));
    }
  };

  const navItems = [
    { name: 'ABOUT', href: '#about' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-surface-dark/90 backdrop-blur-sm border-b border-border-muted px-6 md:px-12 py-4 flex justify-between items-center">
        <a
          href="/home"
          onClick={(e) => {
            e.preventDefault();
            setIsMenuOpen(false);
            // Navigate to /home (works from any section)
            if (typeof window !== 'undefined') {
              window.location.href = '/home';
            }
          }}
          className="text-2xl font-bebas text-primary-gold tracking-tight"
          aria-label="Go to home"
        >
          SATWIK
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="nav-link">
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="https://drive.google.com/file/d/1WQqmztFzorqT0VzGSs6W7kMOhyShL6iC/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block px-6 py-2 border border-primary-gold text-primary-gold font-bebas tracking-widest hover:bg-primary-gold hover:text-bg-dark transition-all duration-300 active:scale-95"
          >
            RESUME
          </a>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-primary-gold p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-bg-dark pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 items-center">
              {navItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="text-4xl font-bebas text-primary-gold tracking-widest"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a 
                href="https://drive.google.com/file/d/1WQqmztFzorqT0VzGSs6W7kMOhyShL6iC/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-4 border border-primary-gold text-primary-gold font-bebas text-2xl tracking-widest"
                onClick={() => setIsMenuOpen(false)}
              >
                RESUME
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24">
        {/* Hero Section */}
        <section ref={heroRef} id="hero" className="min-h-[90vh] flex flex-col justify-center items-start px-6 md:px-24 relative overflow-hidden text-left md:mt-10">
          <div className="hero-content z-10 max-w-5xl flex flex-col items-start">
            <p className="text-primary-gold font-mono uppercase tracking-[0.2em] mb-4 text-xs md:text-sm md:ml-3">
              ARCHITECTING THE FUTURE
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-none mb-8 tracking-tight uppercase">
              ARCHITECTING DIGITAL<br />
              <span className="text-primary-gold">SYSTEMS</span> WITH PRECISION.
            </h1>

            <div className="mb-14 max-w-3xl w-full">
              <div className="relative p-8 md:p-10 bg-surface-dark/40 backdrop-blur-sm border border-border-muted/30 group hover:border-primary-gold/40 transition-all duration-500">
                <div className="absolute -top-px -left-px w-8 h-8 border-t border-l border-primary-gold"></div>
                <div className="absolute -bottom-px -right-px w-8 h-8 border-b border-r border-primary-gold"></div>
                <div className="flex flex-col items-start gap-4">
                  
                  <p className="text-lg md:text-2xl text-text-muted font-light leading-relaxed">
                    <span className="text-white font-semibold">Satwik Chandra</span> — A Full Stack Architect at <span className="text-primary-gold">KIIT'28</span>. 
                    Currently engineering high-performance systems and open to opportunities that push technical boundaries.
                  </p>
                  <div className="w-16 h-px bg-border-muted mt-2"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-start gap-6 font-bebas text-xl tracking-widest">
              <a href="#projects" className="bg-primary-gold text-bg-dark px-10 py-4 hover:brightness-110 transition-all border border-primary-gold">
                EXPLORE MY PROJECTS
              </a>
              <a href="https://drive.google.com/file/d/1S_4ymmqbmJXH4ch9Kyq2vFpzHlLn84ov/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="border border-primary-gold text-primary-gold px-10 py-4 hover:bg-primary-gold/10 transition-all">
                VIEW RESUME
              </a>
            </div>

            <div className="mt-20 flex flex-wrap justify-start gap-8 md:gap-12 font-mono text-primary-gold/60 text-xs md:text-sm border-t border-border-muted pt-8 w-full">
              
             
              <div className="flex items-center gap-2">
              
              </div>
            </div>
          </div>
          
          
        </section>

        {/* About Section */}
        <section ref={aboutRef} id="about" className="py-32 px-6 md:px-24 bg-[#080808] border-y border-border-muted">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="gold-thread reveal">
              <h2 className="text-5xl mb-8 tracking-wider uppercase">THE ENGINEER</h2>
              <p className="text-text-muted text-lg leading-relaxed mb-6">
                A 2nd year B.Tech CSE student at KIIT with a <span className="text-primary-gold font-bold">9.56 CGPA</span>. I don't just write code; I design systems. Passionate about building production-grade full-stack applications that solve real-world problems.
              </p>
              <p className="text-text-muted text-lg leading-relaxed">
                With experience spanning across <span className="text-white font-semibold">4+ companies</span>, I've mastered the lifecycle of software—from conceptualizing features to deploying containerized microservices.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 reveal">
              {[
                { label: 'Academic Excellence', value: '9.56' },
                { label: 'Global Companies', value: '4+' },
                { label: 'Shipped Projects', value: '6+' },
              ].map((stat) => (
                <div key={stat.label} className="precision-border p-8 flex flex-col items-center justify-center text-center hover:border-primary-gold transition-colors group">
                  <span className="text-5xl font-bebas text-primary-gold mb-2 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-text-muted uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section ref={experienceRef} id="experience" className="py-32 px-6 md:px-24">
          <div className="mb-20 reveal">
            <h2 className="text-6xl tracking-wider inline-block border-b-2 border-primary-gold pb-2 uppercase">EXPERIENCE</h2>
        
          </div>
          
          <div className="relative">
            <div className="absolute left-0 top-0 w-[1px] h-full bg-border-muted"></div>
            <div className="absolute left-0 top-0 w-[1px] h-12 bg-primary-gold"></div>
            
            <div className="space-y-24">
              {[
                {
                  role: 'Backend Developer',
                  company: 'ASVIX',
                  period: 'FEB 2026 – PRESENT',
                  desc: 'Implementing high-performance Node.js features and Dockerizing microservices architecture. Achieved 40%+ faster developer setup times through precision environment orchestration.'
                },
                {
                  role: 'Frontend Developer',
                  company: 'SPLIXON AI',
                  period: 'JAN 2026 – FEB 2026',
                  desc: 'Architected complex React dashboards for an AI-driven job portal. Integrated LLM response handling with real-time UI feedback systems.'
                },
                {
                  role: 'Frontend Developer',
                  company: 'ZINQ SOFTWARE LABS',
                  period: 'DEC 2025 – MAR 2026',
                  desc: 'Led Next.js SSR implementations with a focus on SEO optimization and LCP reduction. Scaled the core platform UI for enterprise-level accessibility.'
                },
                {
                  role: 'SDE Intern',
                  company: 'GENIUSES FACTORY',
                  period: 'OCT 2025 – NOV 2025',
                  desc: 'Developed core modules for a real-time restaurant management platform. Streamlined order-to-kitchen data flow using persistent web socket connections.'
                }
              ].map((exp, idx) => (
                <div key={idx} className="relative pl-12 group reveal">
                  <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-border-muted group-hover:bg-primary-gold transition-colors"></div>
                  <div className="flex flex-col md:flex-row md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{exp.role}</h3>
                      <p className="text-primary-gold font-bebas tracking-widest text-xl">{exp.company}</p>
                    </div>
                    <div className="text-text-muted font-mono text-sm md:text-right mt-2 md:mt-0">
                      {exp.period}
                    </div>
                  </div>
                  <div className="max-w-3xl text-text-muted leading-relaxed">
                    {exp.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section ref={projectsRef} id="projects" className="py-32 px-6 md:px-24 bg-[#0e0e0e]">
          <div className="mb-20">
            <h2 className="text-6xl tracking-wider uppercase">SELECTED WORKS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Project 1 — VS INTEGRATE */}
            <div className="border border-border-muted bg-surface-dark p-8 flex flex-col h-full hover:border-primary-gold hover:shadow-[0_0_12px_rgba(255,215,0,0.15)] transition-all duration-300">
              <div className="mb-10">
                <LayoutDashboard className="text-primary-gold" size={36} />
              </div>
              <a
                href="https://vs-integrate.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bebas text-3xl mb-4 text-white uppercase hover:text-primary-gold transition-colors duration-200 leading-none block"
              >
                VS INTEGRATE
              </a>
              <p className="text-text-muted text-sm leading-relaxed mb-10 grow">
                A comprehensive developer dashboard that integrates directly with VS Code. Features interactive heatmaps, productivity goals, and developer health scoring.
              </p>
              <div className="pt-6 border-t border-border-muted flex justify-between items-center">
                <span className="text-xs font-mono text-border-muted uppercase tracking-widest">01 / DASHBOARD</span>
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/SATWIKKKKK/ide-grate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-primary-gold transition-colors duration-200"
                    aria-label="GitHub"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href="https://vs-integrate.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-gold hover:translate-x-1 transition-transform duration-200"
                    aria-label="Visit project"
                  >
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* Project 2 — AASPASS */}
            <div className="border border-border-muted bg-surface-dark p-8 flex flex-col h-full hover:border-primary-gold hover:shadow-[0_0_12px_rgba(255,215,0,0.15)] transition-all duration-300">
              <div className="mb-10">
                <CreditCard className="text-primary-gold" size={36} />
              </div>
              <a
                href="https://aaspass-gamma.vercel.app/home"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bebas text-3xl mb-4 text-white uppercase hover:text-primary-gold transition-colors duration-200 leading-none block"
              >
                AASPASS
              </a>
              <p className="text-text-muted text-sm leading-relaxed mb-10 grow">
                A sophisticated multi-role student services platform. Integrated secure Google OAuth and Razorpay gateway for seamless academic transactions.
              </p>
              <div className="pt-6 border-t border-border-muted flex justify-between items-center">
                <span className="text-xs font-mono text-border-muted uppercase tracking-widest">02 / ED-TECH</span>
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/SATWIKKKKK/aaspass"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-primary-gold transition-colors duration-200"
                    aria-label="GitHub"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href="https://aaspass-gamma.vercel.app/home"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-gold hover:translate-x-1 transition-transform duration-200"
                    aria-label="Visit project"
                  >
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* Project 3 — VFOUND */}
            <div className="border border-border-muted bg-surface-dark p-8 flex flex-col h-full hover:border-primary-gold hover:shadow-[0_0_12px_rgba(255,215,0,0.15)] transition-all duration-300">
              <div className="mb-10">
                <BrainCircuit className="text-primary-gold" size={36} />
              </div>
              <a
                href="https://vfound.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bebas text-3xl mb-4 text-white uppercase hover:text-primary-gold transition-colors duration-200 leading-none block"
              >
                VFOUND
              </a>
              <p className="text-text-muted text-sm leading-relaxed mb-10 grow">
                Advanced AI resume scanner trained on a massive dataset of 60,000+ profiles. Provides deep skill-gap analysis and automated candidate ranking.
              </p>
              <div className="pt-6 border-t border-border-muted flex justify-between items-center">
                <span className="text-xs font-mono text-border-muted uppercase tracking-widest">03 / ARTIFICIAL INTEL</span>
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/SATWIKKKKK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-primary-gold transition-colors duration-200"
                    aria-label="GitHub"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href="https://vfound.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-gold hover:translate-x-1 transition-transform duration-200"
                    aria-label="Visit project"
                  >
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* Project 4 — HEAT PLAN */}
            <div className="border border-border-muted bg-surface-dark p-8 flex flex-col h-full hover:border-primary-gold hover:shadow-[0_0_12px_rgba(255,215,0,0.15)] transition-all duration-300">
              <div className="mb-10">
                <Zap className="text-primary-gold" size={36} />
              </div>
              <a
                href="https://heat-plan.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bebas text-3xl mb-4 text-white uppercase hover:text-primary-gold transition-colors duration-200 leading-none block"
              >
                HEAT PLAN
              </a>
              <p className="text-text-muted text-sm leading-relaxed mb-10 grow">
                AI platform analyzing neighborhoods using climate and demographic data to generate vulnerability scores, cooling interventions, cost estimates, and ready-to-submit PDF reports at zero cost.
              </p>
              <div className="pt-6 border-t border-border-muted flex justify-between items-center">
                <span className="text-xs font-mono text-border-muted uppercase tracking-widest">04 / CLIMATE TECH</span>
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/SATWIKKKKK/urban-heat-classifier"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-primary-gold transition-colors duration-200"
                    aria-label="GitHub"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href="https://heat-plan.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-gold hover:translate-x-1 transition-transform duration-200"
                    aria-label="Visit project"
                  >
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Skills Section */}
        <section ref={skillsRef} id="skills" className="py-32 px-6 md:px-24">
          <div className="mb-20 text-left reveal">
            <h2 className="text-6xl tracking-wider uppercase inline-block border-b-2 border-primary-gold pb-2">TECHNICAL STACK</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-border-muted precision-border reveal">
            {[
              {
                title: 'LANGUAGES',
                skills: ['C / C++', 'JAVASCRIPT', 'TYPESCRIPT', 'SQL']
              },
              {
                title: 'FRAMEWORKS',
                skills: ['REACT.JS', 'NEXT.JS', 'NODE.JS', 'EXPRESS']
              },
              {
                title: 'DATABASES',
                skills: ['POSTGRESQL', 'MONGODB', 'PRISMA', 'REDIS']
              },
              {
                title: 'ECOSYSTEM',
                skills: ['GIT / GITHUB', 'DOCKER', 'HUGGING FACE', 'AWS DEPLOY']
              }
            ].map((group) => (
              <div key={group.title} className="bg-bg-dark p-10">
                <h4 className="text-xl text-primary-gold mb-6 tracking-widest uppercase">{group.title}</h4>
                <ul className="space-y-4 font-mono text-sm text-text-muted">
                  {group.skills.map(skill => (
                    <li key={skill} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-primary-gold"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section ref={contactRef} id="contact" className="py-32 px-6 md:px-24 bg-[#080808]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24">
            <div className="reveal">
              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-none text-white mb-8 uppercase">
                LET'S BUILD<br />SOMETHING <span className="text-primary-gold underline decoration-1 underline-offset-8">GREAT</span>.
              </h2>
              <p className="text-text-muted text-xl mb-12 font-light">
                Always open to internships, freelance opportunities, or technical discussions. Let's engineer the next standard together.
              </p>
              
              <div className="space-y-6">
                <a href="mailto:satwikchandra65@gmail.com" className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 precision-border flex items-center justify-center group-hover:border-primary-gold transition-colors">
                    <Mail className="text-primary-gold" size={20} />
                  </div>
                  <span className="text-lg font-mono text-text-muted group-hover:text-white transition-colors">
                    satwikchandra65@gmail.com
                  </span>
                </a>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 precision-border flex items-center justify-center group-hover:border-primary-gold transition-colors">
                    <MapPin className="text-primary-gold" size={20} />
                  </div>
                  <span className="text-lg font-mono text-text-muted group-hover:text-white transition-colors">
                    KIIT, Bhubaneswar, India
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 p-8 md:p-12 bg-bg-dark precision-border relative reveal">
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-primary-gold"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-primary-gold"></div>
              
              <div className="space-y-1">
                <label className="font-mono text-[10px] tracking-widest text-primary-gold uppercase">Name</label>
                <input 
                  type="text" 
                  placeholder="JOHN DOE"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-[#080808] precision-border border-border-muted focus:border-primary-gold focus:ring-0 outline-none text-white p-4 transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="font-mono text-[10px] tracking-widest text-primary-gold uppercase">Email</label>
                <input 
                  type="email" 
                  placeholder="CONTACT@EXAMPLE.COM"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-[#080808] precision-border border-border-muted focus:border-primary-gold focus:ring-0 outline-none text-white p-4 transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="font-mono text-[10px] tracking-widest text-primary-gold uppercase">Message</label>
                <textarea 
                  rows={4} 
                  placeholder="HOW CAN WE COLLABORATE?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full bg-[#080808] precision-border border-border-muted focus:border-primary-gold focus:ring-0 outline-none text-white p-4 transition-colors resize-none"
                />
              </div>
              {formStatus === 'success' && (
                <p className="text-green-400 font-mono text-xs tracking-widest text-center">TRANSMISSION SENT SUCCESSFULLY.</p>
              )}
              {formStatus === 'error' && (
                <p className="text-red-400 font-mono text-xs tracking-widest text-center">{formError ?? 'FAILED TO SEND. PLEASE TRY AGAIN.'}</p>
              )}
              <button 
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full bg-primary-gold text-bg-dark font-bebas text-2xl py-4 tracking-widest hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formStatus === 'sending' ? 'SENDING...' : 'SEND TRANSMISSION'}
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0E0E0E] border-t border-border-muted py-12 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted text-center md:text-left">
          © 2026 SATWIK CHANDRA. ENGINEERED FOR PRECISION.
        </div>
        
        <div className="flex gap-8 font-mono text-[10px] uppercase tracking-[0.2em]">
          <a href="https://github.com/SATWIKKKKK" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary-gold underline decoration-primary-gold transition-colors">
            GITHUB
          </a>
          <a href="https://linkedin.com/in/satwikchandra45" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary-gold underline decoration-primary-gold transition-colors">
            LINKEDIN
          </a>
          
        </div>

        <div className="text-text-muted font-mono text-[10px] uppercase tracking-[0.2em]">
          +91-9064226986
        </div>
      </footer>
    </div>
  );
}
