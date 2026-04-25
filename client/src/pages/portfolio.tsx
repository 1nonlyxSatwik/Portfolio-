import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  type Transition,
  type Variants,
  motion,
  useReducedMotion,
  useSpring,
  useMotionValue,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Spline from '@splinetool/react-spline';
import {
  ArrowUpRight,
  Github,
  Link as LinkIcon,
  Mail,
  MapPin,
  Sparkles,
  Instagram,
  Linkedin,
  ChevronLeft,
} from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  architecture: string[];
  metrics: string[];
  tags: string[];
  liveUrl: string;
  repo?: string;
};

const projectsData: Project[] = [
  {
    id: "satkart",
    title: "SatKart — Modern E-commerce",
    description: "Full-stack commerce system focused on clean architecture and smooth user interactions.",
    longDescription: "SatKart is an e-commerce platform built to explore modern full-stack patterns. It features a structured architecture leveraging Prisma ORM for type-safe database operations, authentication for secure user sessions, and a responsive frontend. The platform manages product listings, protected carts, and a streamlined checkout flow with real-time loading states.",
    architecture: ["Prisma ORM", "Node.js", "JWT Auth", "React", "Tailwind CSS"],
    metrics: ["Full CRUD Operations", "Secure Authentication", "Responsive UI Design"],
    tags: ["Full-stack", "E-commerce", "Web Development"],
    liveUrl: "https://sat-kart-frontend-5ver-iwdeuo3tn-satwiks-projects-8102ca2d.vercel.app/?_vercel_share=Q6KL0B3A6roGyVszSXcjvsLYtdgEfrDf",
  },
  {
    id: "edusity",
    title: "Edusity — University Portal",
    description: "Higher education platform helping students find the ideal degree and navigate university resources.",
    longDescription: "Edusity is a specialized university interface designed to guide students through academic decision-making. It features a comprehensive directory of degrees, campus resources, and interactive modules to help prospective students check which path is best for them. The project focuses on clear information hierarchy and accessible educational design.",
    architecture: ["React", "Framer Motion", "Tailwind CSS", "JavaScript", "HTML/CSS"],
    metrics: ["Degree Discovery System", "University Resource Hub", "Responsive Educational UI"],
    tags: ["Higher Education", "EdTech", "UX Research"],
    liveUrl: "https://edusity-learning-mrxe.vercel.app/",
  },
];

type JourneyItem = {
  id: string;
  title: string;
  org: string;
  period: string;
  description: string;
};

const fadeEase: Transition["ease"] = [0.16, 1, 0.3, 1];

const fadeSlide: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      delay: i * 0.1,
      ease: fadeEase,
    },
  }),
};

function ProjectDetail({ id, onClose }: { id: string; onClose: () => void }) {
  const project = projectsData.find((p) => p.id === id);
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 backdrop-blur-md bg-black/40"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card w-full max-w-5xl max-h-[90vh] overflow-y-auto p-8 sm:p-16 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 p-4 rounded-full glass hover:text-accent transition-colors z-10"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="text-accent text-[10px] font-mono font-black uppercase tracking-[0.3em] mb-4">
              System Analysis — {project.id}
            </div>
            <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tighter mb-8 leading-none">
              {project.title}
            </h1>
            <p className="text-xl text-white/60 font-light leading-relaxed mb-12">
              {project.longDescription}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h3 className="text-[10px] font-mono font-black uppercase tracking-widest text-white/30 border-b border-white/5 pb-2">Core Architecture</h3>
              <div className="flex flex-wrap gap-3">
                {project.architecture.map((tech) => (
                  <span key={tech} className="glass px-4 py-2 rounded-full text-xs font-bold text-white/80">{tech}</span>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-[10px] font-mono font-black uppercase tracking-widest text-white/30 border-b border-white/5 pb-2">Engineering Metrics</h3>
              <div className="space-y-4">
                {project.metrics.map((metric) => (
                  <div key={metric} className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(255,68,0,0.6)]" />
                    <span className="text-sm font-medium text-white/70">{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 border-t border-white/5 pt-12">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass bg-accent/20 px-10 py-5 rounded-full text-sm font-black uppercase tracking-widest text-white ring-1 ring-accent/50 hover:bg-accent/30 hover:shadow-[0_0_30px_rgba(255,68,0,0.3)] transition-all text-center"
            >
              Visit Live Site
            </a>
            <button
              onClick={onClose}
              className="px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all text-center"
            >
              Close Detail
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CursorTrail() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <motion.div
        className="absolute w-8 h-8 border border-accent/50 rounded-full mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="absolute w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_15px_rgba(255,68,0,0.8)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
}

function SplineBackground() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 400], [0, 50]);

  return (
    <motion.div 
      style={{ opacity, y }}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
    >
      {/* Center Darkness Mask */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#050505_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-10" />
      
      <div className="w-full h-full scale-[1.1] origin-center opacity-70">
        <Spline scene="/assets/land.splinecode" />
      </div>
    </motion.div>
  );
}

function RotatingCube() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
      <motion.div
        className="relative w-96 h-96"
        animate={{
          rotateY: [0, 360],
          rotateZ: [0, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {[
          "translateZ(192px)",
          "rotateY(180deg) translateZ(192px)",
          "rotateY(90deg) translateZ(192px)",
          "rotateY(-90deg) translateZ(192px)",
          "rotateX(90deg) translateZ(192px)",
          "rotateX(-90deg) translateZ(192px)",
        ].map((transform, i) => (
          <div
            key={i}
            className="absolute inset-0 border-[1px] border-white/20 bg-white/[0.04]"
            style={{ 
              transform, 
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1.5px, transparent 1.5px)", 
              backgroundSize: "32px 32px" 
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

function AmbientGrid() {
  const { scrollYProgress } = useScroll();
  const opacityRange = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.7, 0.4]);
  
  return (
    <motion.div 
      className="fixed inset-0 -z-20 pointer-events-none overflow-hidden bg-[#050505]"
      style={{ opacity: opacityRange }}
    >
      <motion.div 
        className="absolute inset-0 w-full h-full opacity-20"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(189, 59, 27, 0.04) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [-20, 20, -20],
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  );
}

function CursorHighlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50 mix-blend-soft-light"
      style={{
        maskImage: `radial-gradient(300px circle at var(--x) var(--y), black, transparent)`,
        WebkitMaskImage: `radial-gradient(300px circle at var(--x) var(--y), black, transparent)`,
      } as any}
      animate={{
        "--x": `${springX.get()}px`,
        "--y": `${springY.get()}px`,
      } as any}
    >
      <motion.div 
        className="absolute inset-0 bg-accent/20 opacity-40"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          filter: "blur(80px)",
        }}
      />
    </motion.div>
  );
}

function AnimatedRevealText({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <div className="overflow-hidden flex flex-wrap justify-center">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1,
            delay: i * 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block mr-4 last:mr-0 text-accent text-glow-orange font-bold italic"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
  index,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  index: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);

  return (
    <motion.section
      id={id}
      ref={ref}
      data-testid={`section-${id}`}
      style={{ opacity, y, scale }}
      className="glass-card group relative mx-auto w-full max-w-5xl px-8 py-16 sm:px-14 sm:py-24 mb-32 border border-white/10 ring-1 ring-white/5"
      transition={{
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="relative z-10">
        <div
          data-testid={`text-eyebrow-${id}`}
          className="mb-8 flex items-center gap-4 text-[10px] font-mono font-bold uppercase tracking-[0.5em] text-accent"
        >
          <motion.span 
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(255,68,0,0.8)]" 
          />
          <span>{eyebrow}</span>
        </div>
        <h2
          data-testid={`text-title-${id}`}
          className="text-balance text-5xl font-black tracking-tighter text-white sm:text-6xl leading-[0.95]"
        >
          {title}
        </h2>
        <div className="mt-12 text-[18px] leading-relaxed text-white/80 font-light tracking-wide max-w-3xl">
          {children}
        </div>
      </div>
    </motion.section>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12"
      >
        <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center ring-1 ring-accent/50 shadow-[0_0_20px_rgba(255,68,0,0.2)]">
          <Sparkles className="h-8 w-8 text-accent" />
        </div>
        <h3 className="text-xl font-bold text-white">Message Sent Successfully</h3>
        <p className="text-white/50 text-sm max-w-xs">
          Thank you for reaching out. I'll get back to you shortly.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-xs font-black uppercase tracking-widest text-accent hover:text-white transition-colors pt-4"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Name</label>
        <input 
          required
          placeholder="Your name" 
          className="w-full glass bg-white/5 px-6 py-5 rounded-2xl text-sm text-white placeholder:text-white/10 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all ring-1 ring-white/5"
        />
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Email</label>
        <input 
          required
          type="email"
          placeholder="Your email" 
          className="w-full glass bg-white/5 px-6 py-5 rounded-2xl text-sm text-white placeholder:text-white/10 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all ring-1 ring-white/5"
        />
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Brief</label>
        <textarea 
          required
          placeholder="What are we building?" 
          rows={4}
          className="w-full glass bg-white/5 px-6 py-5 rounded-2xl text-sm text-white placeholder:text-white/10 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all ring-1 ring-white/5 resize-none"
        />
      </div>
      <button type="submit" className="w-full glass bg-accent/20 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.3em] text-white hover:bg-accent/30 hover:shadow-[0_0_30px_rgba(255,68,0,0.2)] transition-all ring-1 ring-accent/50">
        Initiate Connection
      </button>
    </form>
  );
}

function InteractiveCoordinates() {
  const [coords, setCoords] = useState({ n: 28.6139, e: 77.2090 });
  
  return (
    <div className="relative group cursor-grab active:cursor-grabbing z-30">
      <div className="absolute -inset-10 bg-accent/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="w-40 h-40 rounded-full glass-card flex items-center justify-center border-white/5 !overflow-visible pointer-events-auto bg-black/20">
        <motion.div
          drag
          dragConstraints={{ left: -60, right: 60, top: -60, bottom: 60 }}
          dragElastic={0.1}
          dragSnapToOrigin
          onDrag={(_, info) => {
            setCoords({
              n: 28.6139 + (info.offset.y / 1000),
              e: 77.2090 + (info.offset.x / 1000)
            });
          }}
          onDragEnd={() => setCoords({ n: 28.6139, e: 77.2090 })}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="h-4 w-4 rounded-full bg-accent shadow-[0_0_20px_rgba(189,59,27,0.4)] z-50 relative cursor-pointer"
        />
      </div>
      <div className="absolute top-0 -right-12 flex flex-col gap-1 text-[9px] font-mono text-white/20 uppercase tracking-[0.2em] text-right pointer-events-none select-none">
        <span>{coords.n.toFixed(4)}° N</span>
        <span>{coords.e.toFixed(4)}° E</span>
        <div className="h-px w-8 bg-white/10 mt-2 self-end" />
      </div>
    </div>
  );
}

function SpotlightSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });
  const yParallax = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  function handleMouseMove(e: React.MouseEvent) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const spotlightStyle = {
    maskImage: useTransform(
      [springX, springY],
      ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, black 0%, transparent 100%)`
    ),
    WebkitMaskImage: useTransform(
      [springX, springY],
      ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, black 0%, transparent 100%)`
    ),
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-48 relative flex flex-col items-center justify-center text-center overflow-hidden cursor-none"
    >
      <motion.div style={{ y: yParallax }} className="pointer-events-none select-none">
        <h2 className="text-[12vw] font-black leading-[0.85] tracking-tighter text-white/15 uppercase">
          SELECTED WORK
        </h2>
        <h2 className="text-[10vw] font-black leading-[0.85] tracking-tighter text-white/15 uppercase">
          SYSTEMS BUILT TO SCALE
        </h2>
      </motion.div>

      <motion.div
        style={{ ...spotlightStyle, y: yParallax }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10"
      >
        <h2 className="text-[12vw] font-black leading-[0.85] tracking-tighter text-white uppercase">
          SELECTED WORK
        </h2>
        <h2 className="text-[10vw] font-black leading-[0.85] tracking-tighter text-accent uppercase">
          SYSTEMS BUILT TO SCALE
        </h2>
      </motion.div>
    </section>
  );
}

function Navbar() {
  const { scrollY } = useScroll();
  const isScrolled = useMotionValue(0);
  
  // Create a spring for smooth morphing
  const springConfig = { damping: 20, stiffness: 100 };
  const width = useSpring(useTransform(scrollY, [0, 100], ["100%", "auto"]), springConfig);
  const opacityIntro = useTransform(scrollY, [0, 50], [1, 0]);
  const scale = useTransform(scrollY, [0, 100], [1, 0.9]);
  
  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-6 pointer-events-none">
      <motion.div 
        style={{ scale }}
        className="mx-auto max-w-5xl flex justify-center"
      >
        <motion.div 
          className="glass-nav-container pointer-events-auto flex items-center gap-2 overflow-hidden"
          layout
        >
          {/* State 1 Left: Name (Fades on scroll) */}
          <motion.div 
            style={{ opacity: opacityIntro }}
            className="flex items-center gap-4 pl-4 pr-6 border-r border-white/10"
          >
            <div className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(189,59,27,1)]" />
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-white whitespace-nowrap">
              Satwik
            </span>
          </motion.div>

          {/* Links: Transitions from full list to compressed dots */}
          <div className="flex items-center gap-1 px-2">
            <AnimatePresence mode="wait">
              {["Intro", "Work", "About", "Journey", "Contact"].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase() === "work" ? "projects" : item.toLowerCase()}`}
                  initial={{ opacity: 1 }}
                  style={{ 
                    display: (item === "Intro" || item === "Journey") ? (useTransform(scrollY, [0, 50], ["block", "none"]) as any) : "block"
                  }}
                  className="px-4 py-2 text-[10px] font-mono font-black uppercase tracking-[0.2em] text-white/50 hover:text-white transition-all whitespace-nowrap"
                >
                  {item}
                </motion.a>
              ))}
            </AnimatePresence>
          </div>

          {/* Right: Action (Shrinks on scroll) */}
          <Link href="/profile">
            <motion.div 
              style={{ opacity: opacityIntro }}
              className="glass-pill bg-white/5 hover:bg-white/10 border-white/10 group h-8 px-4"
            >
              <ArrowUpRight className="h-3.5 w-3.5 text-white/40 group-hover:text-white transition-all" />
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </nav>
  );
}

export default function Portfolio() {
  const reduceMotion = useReducedMotion();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedProjectId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProjectId]);

  const journey: JourneyItem[] = [
    {
      id: "nst",
      title: "Computer Science Student",
      org: "Newton School of Technology",
      period: "2-year Student",
      description:
        "Focused on full-stack development, data structures, and the engineering of intentional user experiences.",
    },
    {
      id: "projects",
      title: "Independent Developer",
      org: "Freelance / Open Source",
      period: "Present",
      description:
        "Developing real-world applications with a priority on quality over quantity and designs that age well.",
    },
  ];

  return (
    <div className="dark min-h-screen bg-transparent selection:bg-accent/40 selection:text-white">
      <AmbientGrid />
      <SplineBackground />
      <CursorTrail />
      {!reduceMotion && <CursorHighlight />}

      <AnimatePresence>
        {selectedProjectId && (
          <ProjectDetail 
            id={selectedProjectId} 
            onClose={() => setSelectedProjectId(null)} 
          />
        )}
      </AnimatePresence>

      <header className="fixed top-0 left-0 right-0 z-50 px-10 py-10 pointer-events-none">
        <nav className="mx-auto max-w-7xl flex justify-between items-center pointer-events-auto">
          <div className="liquid-glass px-8 py-4 rounded-full flex items-center gap-5 ring-1 ring-white/30 shadow-2xl backdrop-blur-xl">
            <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-accent to-orange-700 flex items-center justify-center shadow-lg shadow-accent/20">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <Link href="/profile">
              <span className="text-base font-mono font-black tracking-tighter text-white uppercase cursor-pointer hover:text-accent transition-colors">Satwik Mani Tripathi</span>
            </Link>
          </div>
          <div className="hidden sm:flex liquid-glass px-4 py-2.5 rounded-full items-center gap-3 ring-1 ring-white/10 shadow-xl backdrop-blur-xl">
            {["Intro", "Artifacts", "Journey", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase() === "artifacts" ? "projects" : item.toLowerCase()}`}
                className="px-6 py-2.5 text-[10px] font-mono font-black uppercase tracking-[0.2em] text-white/40 hover:text-accent transition-all rounded-full hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(255,68,0,0.3)]"
              >
                {item}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="glass px-10 py-4.5 rounded-full text-xs font-black uppercase tracking-[0.4em] text-white hover:text-accent hover:ring-accent/50 transition-all ring-1 ring-white/30 shadow-2xl backdrop-blur-xl hover:shadow-[0_0_30px_rgba(255,68,0,0.4)]"
          >
            Connect
          </a>
        </nav>
      </header>

      <main className="relative pt-32">
        <section
          data-testid="section-hero"
          className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-8 pt-20"
        >
          <div className="flex flex-col items-start gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: fadeEase }}
              className="relative z-10"
            >
              <h1 className="hero-title text-[clamp(4rem,10vw,9rem)] text-white mb-4">
                I DESIGN & <br />
                ENGINEER <br />
                <span className="text-accent italic font-medium tracking-tight">EXPERIENCES</span>
              </h1>

              <div className="mt-12 flex items-center gap-10">
                <motion.a
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href="#projects"
                  className="glass-pill px-10 py-6 bg-white/5 border-white/10 flex flex-col items-start gap-1 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-accent/20 group-hover:bg-accent transition-colors">
                      <ArrowUpRight className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-white">View Work</span>
                  </div>
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest pl-11">Selected Projects</span>
                </motion.a>

                <div className="hidden md:block h-px w-20 bg-white/10" />

                <div className="max-w-[280px]">
                  <p className="text-sm text-white/50 leading-relaxed font-light">
                    Where <span className="text-white">design meets code</span> and ideas turn into <span className="text-accent font-medium">impactful products</span>.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className="absolute bottom-12 left-8 right-8 flex justify-between items-center z-10">
            <div className="flex items-center gap-4">
              <div className="h-1.5 w-1.5 rounded-full bg-accent pulse-glow" />
              <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-white/40">
                Available for New Opportunities
              </span>
            </div>
            <div className="flex items-center gap-8">
               <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.4em]">Follow Me</span>
               <div className="flex gap-4">
                 <Github className="h-4 w-4 text-white/40 hover:text-accent transition-colors" />
                 <Linkedin className="h-4 w-4 text-white/40 hover:text-accent transition-colors" />
                 <Instagram className="h-4 w-4 text-white/40 hover:text-accent transition-colors" />
               </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-6 pb-40">
          <Section id="about" eyebrow="The Identity" title="Clean. Structured. Intentional." index={0}>
            <p className="mb-8 text-lg">
              I’m <span className="text-white font-medium">Satwik Mani Tripathi</span>, a second-year Computer Science student 
              at Newton School of Technology. <span className="text-white">Focused on full-stack development, data structures, and the engineering of intentional user experiences.</span>
            </p>
            <p className="text-white/70 mb-6 font-light">
              I prefer clarity over complexity and quality over quantity. I spend my time obsessing over typography, spacing, and the quiet precision of 
              motion-driven UI systems to build products that command respect.
            </p>
            <p className="text-white/50 border-l border-accent/30 pl-6 py-2">
              <span className="text-accent font-bold">Independent Developer</span> — building real-world applications with a priority on quality over quantity and designs that age well.
            </p>
          </Section>

          <SpotlightSection />

          <Section id="projects" eyebrow="The Output" title="Selected Artifacts" index={1}>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-2">
              {projectsData.map((p) => (
                <motion.article
                  key={p.id}
                  data-testid={`card-project-${p.id}`}
                  className="glass-card group relative flex flex-col p-12 h-full border border-white/5 cursor-pointer shadow-2xl overflow-visible"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
                    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedProjectId(p.id);
                  }}
                  whileHover={{ 
                    y: -15,
                    scale: 1.01,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                >
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-10">
                      <h3 className="text-2xl font-black tracking-tighter text-white uppercase">{p.title}</h3>
                      <div className="glass p-3 rounded-full ring-1 ring-white/10 group-hover:ring-accent/50 group-hover:text-accent transition-all shadow-lg">
                        <ArrowUpRight className="h-6 w-6" />
                      </div>
                    </div>
                    <p className="text-[17px] text-white/60 mb-12 leading-relaxed font-light">
                      {p.description}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-4">
                      {p.tags.map((t) => (
                        <span key={t} className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-accent/80 glass px-4 py-2 rounded-full border border-accent/20">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />
                </motion.article>
              ))}
            </div>
          </Section>

          <Section id="journey" eyebrow="The Path" title="Trajectory" index={2}>
            <div className="space-y-6">
              {journey.map((j) => (
                <div key={j.id} className="glass-card p-10 flex flex-col sm:flex-row gap-8 items-start ring-1 ring-white/5 hover:ring-accent/20 transition-all">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{j.title}</h3>
                    <div className="text-accent text-[10px] font-mono font-black uppercase tracking-[0.3em] mt-2">
                      {j.org}
                    </div>
                    <p className="mt-6 text-[15px] text-white/60 leading-relaxed max-w-3xl">
                      {j.description}
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-white/30 font-bold uppercase pt-1 tracking-widest">
                    {j.period}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="contact" eyebrow="The Nexus" title="Collaborate" index={3}>
            <div className="grid gap-16 lg:grid-cols-2">
              <div>
                <p className="text-2xl text-white/80 mb-10 font-light leading-snug">
                  Seeking <span className="text-accent italic font-medium">meaningful partnerships</span> to build thoughtful, high-impact digital products.
                </p>
                <div className="space-y-6">
                  <a href="mailto:satwikmani@example.com" className="group flex items-center gap-5 text-white/80 hover:text-accent transition-all">
                    <div className="glass p-4 rounded-full ring-1 ring-white/10 group-hover:ring-accent/40 shadow-xl"><Mail className="h-5 w-5" /></div>
                    <span className="text-base font-bold tracking-wide">satwikmani@example.com</span>
                  </a>
                  <div className="flex gap-4 mt-8">
                     <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className="glass p-4 rounded-full hover:text-accent hover:-translate-y-1 transition-all shadow-[0_0_15px_rgba(255,68,0,0)] hover:shadow-[0_0_20px_rgba(255,68,0,0.3)]"><Instagram className="h-5 w-5" /></a>
                     <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="glass p-4 rounded-full hover:text-accent hover:-translate-y-1 transition-all shadow-[0_0_15px_rgba(255,68,0,0)] hover:shadow-[0_0_20px_rgba(255,68,0,0.3)]"><Linkedin className="h-5 w-5" /></a>
                     <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="glass p-4 rounded-full hover:text-accent hover:-translate-y-1 transition-all shadow-[0_0_15px_rgba(255,68,0,0)] hover:shadow-[0_0_20px_rgba(255,68,0,0.3)]"><Github className="h-5 w-5" /></a>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-10 ring-1 ring-accent/20 shadow-2xl">
                <ContactForm />
              </div>
            </div>
          </Section>
        </div>
      </main>

      <footer className="px-6 py-48 border-t border-accent/10 bg-black/40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <RotatingCube />
        </div>
        <div className="mx-auto max-w-6xl flex flex-col items-center gap-16 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: fadeEase }}
            className="space-y-6"
          >
             <h2 className="text-5xl sm:text-7xl font-black text-white tracking-tighter leading-none">
               Let’s build something <br />
               <span className="text-accent italic">that matters.</span>
             </h2>
             <p className="text-white/40 font-mono font-light tracking-[0.4em] uppercase text-[10px]">Based in NST • Available Globally</p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-x-16 gap-y-8">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-xs font-black uppercase tracking-[0.3em] text-white/30 hover:text-accent transition-all hover:tracking-[0.4em]">GitHub</a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-xs font-black uppercase tracking-[0.3em] text-white/30 hover:text-accent transition-all hover:tracking-[0.4em]">LinkedIn</a>
            <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-xs font-black uppercase tracking-[0.3em] text-white/30 hover:text-accent transition-all hover:tracking-[0.4em]">Instagram</a>
          </div>
          
          <div className="pt-12 border-t border-white/5 w-full flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10">
              © 2026 forged by Satwik Mani Tripathi
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
              Crafted with Apple-level restraint
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent blur-sm" />
      </footer>
    </div>
  );
}
