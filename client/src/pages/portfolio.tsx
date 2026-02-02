import { useEffect, useMemo, useRef, useState } from "react";
import {
  type Transition,
  type Variants,
  motion,
  useReducedMotion,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Link as LinkIcon,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href?: string;
  repo?: string;
};

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

function GridSquare({ index }: { index: number }) {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, Math.random() * 2000);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: visible ? [0.03, 0.08, 0.03] : 0,
        scale: visible ? [1, 1.05, 1] : 1
      }}
      transition={{ 
        duration: 8 + Math.random() * 10, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className="h-full w-full rounded-lg bg-white/10 ring-1 ring-white/5"
    />
  );
}

function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden mask-radial">
      <div className="absolute inset-0 grid grid-cols-6 sm:grid-cols-12 grid-rows-12 gap-4 p-4 opacity-40">
        {Array.from({ length: 72 }).map((_, i) => (
          <GridSquare key={i} index={i} />
        ))}
      </div>
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 0%, hsl(240 10% 3.9%) 90%)"
        }}
      />
    </div>
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
        background: useMemo(() => `radial-gradient(600px circle at var(--x) var(--y), rgba(255, 255, 255, 0.06), transparent 80%)`, []),
      }}
      animate={{
        WebkitMaskImage: `radial-gradient(300px circle at ${springX}px ${springY}px, black, transparent)`,
      }}
    >
      <motion.div 
        className="absolute inset-0 bg-white/5 opacity-20"
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
  return (
    <motion.section
      id={id}
      data-testid={`section-${id}`}
      className="glass-card grain group relative mx-auto w-full max-w-5xl px-8 py-12 sm:px-12 sm:py-16 mb-12"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeSlide}
      custom={index}
    >
      <div className="relative z-10">
        <div
          data-testid={`text-eyebrow-${id}`}
          className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40"
        >
          <span className="h-1 w-1 rounded-full bg-accent" />
          <span>{eyebrow}</span>
        </div>
        <h2
          data-testid={`text-title-${id}`}
          className="text-balance text-3xl font-medium tracking-tight text-white/90 sm:text-4xl"
        >
          {title}
        </h2>
        <div className="mt-8 text-[16px] leading-relaxed text-white/60 font-light tracking-wide">
          {children}
        </div>
      </div>
    </motion.section>
  );
}

export default function Portfolio() {
  const reduceMotion = useReducedMotion();

  const projects: Project[] = [
    {
      id: "aurora",
      title: "Aurora Notes",
      description:
        "A spatial writing environment focusing on material depth and typography-led hierarchy.",
      tags: ["Design Engineering", "React", "Motion"],
      href: "#",
      repo: "#",
    },
    {
      id: "atlas",
      title: "Atlas Dashboard",
      description:
        "Premium data surface with micro-refractions and intent-based navigation.",
      tags: ["UI Systems", "Data Viz", "Motion"],
      href: "#",
      repo: "#",
    },
    {
      id: "flux",
      title: "Flux Gallery",
      description:
        "Experimental commerce surface exploring glass-on-glass material interactions.",
      tags: ["Experimental", "GLSL", "UX"],
      href: "#",
      repo: "#",
    },
  ];

  const journey: JourneyItem[] = [
    {
      id: "now",
      title: "Senior Design Engineer",
      org: "Independent",
      period: "2025–Present",
      description:
        "Crafting high-fidelity interfaces that prioritize spatial awareness and material realism.",
    },
    {
      id: "prev",
      title: "Product Engineer",
      org: "Stellar Systems",
      period: "2023–2025",
      description:
        "Architected core design systems with a focus on motion-driven feedback and glass surfaces.",
    },
  ];

  return (
    <div className="dark min-h-screen bg-transparent selection:bg-accent/30">
      <AmbientBackground />
      {!reduceMotion && <CursorHighlight />}

      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 pointer-events-none">
        <nav className="mx-auto max-w-6xl flex justify-between items-center pointer-events-auto">
          <div className="glass px-4 py-2 rounded-full flex items-center gap-3 grain">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium tracking-tight text-white/90">Your Portfolio</span>
          </div>
          <div className="hidden sm:flex glass px-2 py-1.5 rounded-full items-center gap-1 grain">
            {["About", "Projects", "Journey", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-4 py-1.5 text-[12px] font-medium text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/5"
              >
                {item}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="glass px-5 py-2 rounded-full text-xs font-semibold text-white/90 grain hover:bg-white/10 transition-colors"
          >
            Hire Me
          </a>
        </nav>
      </header>

      <main className="relative pt-32">
        <section
          data-testid="section-hero"
          className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: fadeEase }}
            className="relative"
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full glass grain px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-white/50">
              <span className="h-1 w-1 rounded-full bg-accent animate-pulse" />
              Building for the spatial web
            </div>

            <h1 className="text-balance text-5xl font-medium tracking-tight text-white sm:text-7xl lg:text-8xl">
              I Build Digital <br />
              <span className="text-white/40">Experiences</span>
            </h1>

            <p className="mx-auto mt-10 max-w-2xl text-balance text-lg font-light leading-relaxed text-white/50 sm:text-xl">
              Focusing on material depth, intentional motion, and the quiet 
              confidence of premium interface design.
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.a
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#projects"
                className="glass grain px-8 py-4 rounded-full text-sm font-semibold text-white shadow-2xl hover:bg-white/10 transition-colors"
              >
                Explore Selected Work
              </motion.a>
              <a
                href="#contact"
                className="px-8 py-4 text-sm font-medium text-white/50 hover:text-white transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </section>

        <div className="mx-auto max-w-6xl px-6 pb-32">
          <Section id="about" eyebrow="The Philosophy" title="Material Realism" index={0}>
            <p className="mb-6">
              I believe software should feel tactile. By leveraging physical properties 
              like refraction, depth, and mass, we can create interfaces that are not 
              just functional, but deeply resonant.
            </p>
            <p>
              My process balances technical precision with aesthetic intuition, 
              resulting in systems that feel "crafted" rather than simply assembled.
            </p>
          </Section>

          <Section id="projects" eyebrow="The Artifacts" title="Selected Projects" index={1}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, idx) => (
                <motion.article
                  key={p.id}
                  data-testid={`card-project-${p.id}`}
                  className="glass-card grain group relative flex flex-col p-6 h-full"
                  whileHover={{ 
                    y: -8,
                    scale: 1.01,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                >
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-medium text-white/90">{p.title}</h3>
                      <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-accent transition-colors" />
                    </div>
                    <p className="text-sm text-white/50 mb-6 leading-relaxed">
                      {p.description}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span key={t} className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                </motion.article>
              ))}
            </div>
          </Section>

          <Section id="journey" eyebrow="The Path" title="Experience" index={2}>
            <div className="space-y-4">
              {journey.map((j) => (
                <div key={j.id} className="glass-card grain p-8 flex flex-col sm:flex-row gap-6 items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white/90">{j.title}</h3>
                    <div className="text-accent text-xs font-bold uppercase tracking-widest mt-1">
                      {j.org}
                    </div>
                    <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-2xl">
                      {j.description}
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-white/30 uppercase pt-1">
                    {j.period}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="contact" eyebrow="The Connection" title="Start a Conversation" index={3}>
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="text-lg text-white/60 mb-8 font-light">
                  Currently available for select partnerships and 
                  high-impact design engineering roles.
                </p>
                <div className="space-y-4">
                  <a href="mailto:hello@example.com" className="flex items-center gap-4 text-white/80 hover:text-white transition-colors">
                    <div className="glass p-3 rounded-full"><Mail className="h-4 w-4" /></div>
                    <span className="text-sm font-medium">hello@example.com</span>
                  </a>
                  <div className="flex items-center gap-4 text-white/40">
                    <div className="glass p-3 rounded-full opacity-50"><MapPin className="h-4 w-4" /></div>
                    <span className="text-sm font-medium">Remote / Global</span>
                  </div>
                </div>
              </div>
              
              <div className="glass-card grain p-8">
                <form className="space-y-4">
                  <input 
                    placeholder="Name" 
                    className="w-full glass bg-white/5 px-6 py-4 rounded-2xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all"
                  />
                  <input 
                    placeholder="Email" 
                    className="w-full glass bg-white/5 px-6 py-4 rounded-2xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all"
                  />
                  <textarea 
                    placeholder="Project Details" 
                    rows={4}
                    className="w-full glass bg-white/5 px-6 py-4 rounded-2xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all resize-none"
                  />
                  <button className="w-full glass bg-white/10 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest text-white hover:bg-white/20 transition-all">
                    Send Inquiry
                  </button>
                </form>
              </div>
            </div>
          </Section>
        </div>
      </main>

      <footer className="px-6 py-12 border-t border-white/5 bg-black/20">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">
            © 2026 Crafted by Your Name
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors">GitHub</a>
            <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
