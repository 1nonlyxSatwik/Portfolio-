import { useEffect, useMemo, useRef, useState } from "react";
import {
  type Transition,
  type Variants,
  motion,
  useReducedMotion,
  useSpring,
  useMotionValue,
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

function GridSquare() {
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
        opacity: visible ? [0.03, 0.12, 0.03] : 0,
        scale: visible ? [1, 1.05, 1] : 1
      }}
      transition={{ 
        duration: 8 + Math.random() * 10, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className="h-full w-full rounded-lg bg-accent/20 ring-1 ring-accent/10"
    />
  );
}

function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden mask-radial">
      <div className="absolute inset-0 grid grid-cols-6 sm:grid-cols-12 grid-rows-12 gap-4 p-4 opacity-40">
        {Array.from({ length: 72 }).map((_, i) => (
          <GridSquare key={i} />
        ))}
      </div>
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 0%, #020202 90%)"
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
        maskImage: `radial-gradient(300px circle at var(--x) var(--y), black, transparent)`,
        WebkitMaskImage: `radial-gradient(300px circle at var(--x) var(--y), black, transparent)`,
      } as any}
      animate={{
        "--x": `${springX.get()}px`,
        "--y": `${springY.get()}px`,
      } as any}
    >
      <motion.div 
        className="absolute inset-0 bg-accent/10 opacity-30"
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
          className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-accent"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(255,68,0,0.6)]" />
          <span>{eyebrow}</span>
        </div>
        <h2
          data-testid={`text-title-${id}`}
          className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        >
          {title}
        </h2>
        <div className="mt-8 text-[16px] leading-relaxed text-white/70 font-light tracking-wide">
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
    <div className="dark min-h-screen bg-transparent selection:bg-accent/40 selection:text-white">
      <AmbientBackground />
      {!reduceMotion && <CursorHighlight />}

      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 pointer-events-none">
        <nav className="mx-auto max-w-6xl flex justify-between items-center pointer-events-auto">
          <div className="glass px-4 py-2 rounded-full flex items-center gap-3 grain ring-1 ring-accent/20">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-bold tracking-tight text-white">Your Portfolio</span>
          </div>
          <div className="hidden sm:flex glass px-2 py-1.5 rounded-full items-center gap-1 grain ring-1 ring-accent/10">
            {["About", "Projects", "Journey", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider text-white/50 hover:text-accent transition-colors rounded-full hover:bg-accent/5"
              >
                {item}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="glass px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-white hover:text-accent hover:ring-accent/40 transition-all ring-1 ring-white/10"
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: fadeEase }}
            className="relative"
          >
            <div className="mb-10 inline-flex items-center gap-3 rounded-full glass grain px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-accent ring-1 ring-accent/30 shadow-[0_0_20px_rgba(255,68,0,0.1)]">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(255,68,0,1)]" />
              Available for high-impact work
            </div>

            <h1 className="text-balance text-6xl font-black tracking-tighter text-white sm:text-8xl lg:text-9xl mb-6">
              I Build Digital <br />
              <AnimatedRevealText text="Experiences" />
            </h1>

            <p className="mx-auto mt-12 max-w-2xl text-balance text-xl font-light leading-relaxed text-white/60 sm:text-2xl tracking-wide">
              Forging the future of <span className="text-white font-medium">spatial interfaces</span> with 
              material depth and visceral motion.
            </p>

            <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
              <motion.a
                whileHover={{ scale: 1.05, y: -4, boxShadow: "0 20px 40px rgba(255, 68, 0, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="glass grain px-10 py-5 rounded-full text-sm font-black uppercase tracking-widest text-white ring-2 ring-accent/50 bg-accent/10 shadow-[0_0_30px_rgba(255,68,0,0.1)] hover:bg-accent/20 transition-all"
              >
                View Artifacts
              </motion.a>
              <a
                href="#contact"
                className="px-10 py-5 text-sm font-bold uppercase tracking-widest text-white/40 hover:text-accent transition-all"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </section>

        <div className="mx-auto max-w-6xl px-6 pb-40">
          <Section id="about" eyebrow="The Core" title="Visceral Engineering" index={0}>
            <p className="mb-8 text-lg">
              I don't just build UI; I craft digital materials. By pushing the boundaries 
              of <span className="text-accent font-medium italic">refraction, lighting, and mass</span>, I create 
              experiences that feel like they exist in physical space.
            </p>
            <p className="text-white/50">
              Every pixel is intentional. Every motion is physics-driven. The result is 
              software that commands attention through its sheer quality and craft.
            </p>
          </Section>

          <Section id="projects" eyebrow="The Output" title="Selected Artifacts" index={1}>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <motion.article
                  key={p.id}
                  data-testid={`card-project-${p.id}`}
                  className="glass-card grain group relative flex flex-col p-8 h-full ring-1 ring-white/5 hover:ring-accent/40 transition-all"
                  whileHover={{ 
                    y: -12,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                >
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-xl font-bold tracking-tight text-white">{p.title}</h3>
                      <ArrowUpRight className="h-5 w-5 text-white/20 group-hover:text-accent transition-colors" />
                    </div>
                    <p className="text-[15px] text-white/50 mb-8 leading-relaxed">
                      {p.description}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-3">
                      {p.tags.map((t) => (
                        <span key={t} className="text-[10px] font-black uppercase tracking-[0.2em] text-accent/60">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                </motion.article>
              ))}
            </div>
          </Section>

          <Section id="journey" eyebrow="The Path" title="Trajectory" index={2}>
            <div className="space-y-6">
              {journey.map((j) => (
                <div key={j.id} className="glass-card grain p-10 flex flex-col sm:flex-row gap-8 items-start ring-1 ring-white/5 hover:ring-accent/20 transition-all">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{j.title}</h3>
                    <div className="text-accent text-xs font-black uppercase tracking-[0.3em] mt-2">
                      {j.org}
                    </div>
                    <p className="mt-6 text-[15px] text-white/60 leading-relaxed max-w-3xl">
                      {j.description}
                    </p>
                  </div>
                  <div className="text-[11px] font-mono text-white/30 font-bold uppercase pt-1 tracking-widest">
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
                  Seeking <span className="text-accent italic font-medium">elite partnerships</span> for 
                  visionary digital products.
                </p>
                <div className="space-y-6">
                  <a href="mailto:hello@example.com" className="group flex items-center gap-5 text-white/80 hover:text-accent transition-all">
                    <div className="glass p-4 rounded-full ring-1 ring-white/10 group-hover:ring-accent/40 shadow-xl"><Mail className="h-5 w-5" /></div>
                    <span className="text-base font-bold tracking-wide">hello@example.com</span>
                  </a>
                  <div className="flex items-center gap-5 text-white/30">
                    <div className="glass p-4 rounded-full opacity-50 ring-1 ring-white/5"><MapPin className="h-5 w-5" /></div>
                    <span className="text-base font-medium">Global / Remote</span>
                  </div>
                </div>
              </div>
              
              <div className="glass-card grain p-10 ring-1 ring-accent/20 shadow-2xl">
                <form className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Name</label>
                    <input 
                      placeholder="Your name" 
                      className="w-full glass bg-white/5 px-6 py-5 rounded-2xl text-sm text-white placeholder:text-white/10 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all ring-1 ring-white/5"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Email</label>
                    <input 
                      placeholder="Your email" 
                      className="w-full glass bg-white/5 px-6 py-5 rounded-2xl text-sm text-white placeholder:text-white/10 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all ring-1 ring-white/5"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Brief</label>
                    <textarea 
                      placeholder="What are we building?" 
                      rows={4}
                      className="w-full glass bg-white/5 px-6 py-5 rounded-2xl text-sm text-white placeholder:text-white/10 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all ring-1 ring-white/5 resize-none"
                    />
                  </div>
                  <button className="w-full glass bg-accent/20 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.3em] text-white hover:bg-accent/30 hover:shadow-[0_0_30px_rgba(255,68,0,0.2)] transition-all ring-1 ring-accent/50">
                    Initiate Connection
                  </button>
                </form>
              </div>
            </div>
          </Section>
        </div>
      </main>

      <footer className="px-6 py-16 border-t border-accent/10 bg-black/40">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-10">
          <div className="text-[11px] font-black uppercase tracking-[0.5em] text-white/10">
            © 2026 forged by your name
          </div>
          <div className="flex gap-12">
            <a href="#" className="text-[11px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-accent transition-all">GitHub</a>
            <a href="#" className="text-[11px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-accent transition-all">LinkedIn</a>
            <a href="#" className="text-[11px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-accent transition-all">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
