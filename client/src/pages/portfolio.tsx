import { useEffect, useMemo, useRef, useState } from "react";
import {
  type Transition,
  type Variants,
  motion,
  useReducedMotion,
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
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: i * 0.08,
      ease: fadeEase,
    },
  }),
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function usePointerParallax(disabled: boolean) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (disabled) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;

    const onMove = (e: PointerEvent) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        setPos({ x: clamp(dx, -1, 1), y: clamp(dy, -1, 1) });
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [disabled]);

  return { ref, pos };
}

function GlassShape({
  index,
  pos,
}: {
  index: number;
  pos: { x: number; y: number };
}) {
  const base = useMemo(() => {
    const configs = [
      {
        w: 520,
        h: 380,
        top: "-10%",
        left: "-8%",
        blur: 26,
        opacity: 0.22,
        driftX: 22,
        driftY: -14,
      },
      {
        w: 640,
        h: 480,
        top: "18%",
        right: "-14%",
        blur: 28,
        opacity: 0.18,
        driftX: -18,
        driftY: 12,
      },
      {
        w: 520,
        h: 520,
        bottom: "-18%",
        left: "12%",
        blur: 30,
        opacity: 0.16,
        driftX: 16,
        driftY: 16,
      },
    ];
    return configs[index % configs.length];
  }, [index]);

  const px = (pos.x * 10) / (index + 1);
  const py = (pos.y * 8) / (index + 1);

  return (
    <motion.div
      aria-hidden
      className="absolute rounded-[999px]"
      style={{
        width: base.w,
        height: base.h,
        top: base.top,
        left: (base as any).left,
        right: (base as any).right,
        bottom: (base as any).bottom,
        filter: `blur(${base.blur}px)`,
        opacity: base.opacity,
        background:
          "radial-gradient(60% 60% at 30% 35%, rgba(255,255,255,0.55), rgba(255,255,255,0.10) 55%, rgba(255,255,255,0.06) 72%, transparent)",
        transform: `translate3d(${px}px, ${py}px, 0)`,
        willChange: "transform",
      }}
      animate={{
        x: [0, base.driftX, 0],
        y: [0, base.driftY, 0],
      }}
      transition={{
        duration: 18 + index * 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
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
      className="glass-card grain glass-refraction relative mx-auto w-full max-w-5xl px-6 py-10 sm:px-8 sm:py-12"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeSlide}
      custom={index}
    >
      <div className="absolute inset-0 rounded-[1.5rem]" aria-hidden />
      <div className="relative">
        <div
          data-testid={`text-eyebrow-${id}`}
          className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/60"
        >
          <span className="h-[1px] w-5 bg-white/20" />
          <span>{eyebrow}</span>
        </div>
        <h2
          data-testid={`text-title-${id}`}
          className="text-balance text-2xl font-semibold tracking-[-0.02em] text-white/95 sm:text-3xl"
        >
          {title}
        </h2>
        <div className="mt-6 text-[15px] leading-relaxed text-white/72">
          {children}
        </div>
      </div>
    </motion.section>
  );
}

export default function Portfolio() {
  const reduceMotion = useReducedMotion();
  const { ref, pos } = usePointerParallax(!!reduceMotion);

  const projects: Project[] = [
    {
      id: "aurora",
      title: "Aurora Notes",
      description:
        "A calm writing space with fast search, keyboard-first flow, and a subtly animated glass UI.",
      tags: ["React", "TypeScript", "Design Systems"],
      href: "#",
      repo: "#",
    },
    {
      id: "atlas",
      title: "Atlas Dashboard",
      description:
        "A modular analytics surface with purposeful hierarchy, reduced chrome, and premium micro-interactions.",
      tags: ["UI Engineering", "Motion", "Data Viz"],
      href: "#",
      repo: "#",
    },
    {
      id: "flux",
      title: "Flux Commerce",
      description:
        "A product gallery concept focused on material depth, refined hover states, and accessibility.",
      tags: ["UX", "Components", "Performance"],
      href: "#",
      repo: "#",
    },
  ];

  const journey: JourneyItem[] = [
    {
      id: "now",
      title: "Senior Frontend Engineer",
      org: "Independent",
      period: "Now",
      description:
        "Building premium interfaces for product teams, with an emphasis on systems thinking and material realism.",
    },
    {
      id: "prev",
      title: "Design Engineer",
      org: "Studio Work",
      period: "2023–2025",
      description:
        "Led UI architecture and motion polish across multiple launches—shipping calm, reliable experiences.",
    },
    {
      id: "start",
      title: "Full‑Stack Developer",
      org: "Early Career",
      period: "2019–2023",
      description:
        "Learned to balance speed with craft, building end‑to‑end features and obsessing over the last 10%.",
    },
  ];

  return (
    <div ref={ref} className="dark min-h-screen bg-background text-foreground">
      <div className="grain relative isolate overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1200px 800px at 30% -10%, rgba(255,255,255,0.10), transparent 50%), radial-gradient(900px 700px at 90% 10%, rgba(255,255,255,0.07), transparent 55%), radial-gradient(700px 500px at 60% 110%, rgba(255,102,51,0.10), transparent 55%)",
          }}
        />

        {!reduceMotion && (
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <GlassShape index={0} pos={pos} />
            <GlassShape index={1} pos={pos} />
            <GlassShape index={2} pos={pos} />
          </div>
        )}

        <header className="sticky top-0 z-40">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="glass grain relative mt-4 flex items-center justify-between rounded-2xl px-4 py-3">
              <div className="flex items-center gap-3">
                <div
                  data-testid="img-mark"
                  className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10"
                >
                  <Sparkles className="h-4 w-4 text-white/70" />
                </div>
                <div className="leading-tight">
                  <div
                    data-testid="text-name"
                    className="text-sm font-medium tracking-[-0.01em] text-white/90"
                  >
                    Your Name
                  </div>
                  <div
                    data-testid="text-role"
                    className="text-[12px] text-white/55"
                  >
                    Design Engineer
                  </div>
                </div>
              </div>

              <nav className="hidden items-center gap-2 sm:flex">
                {[
                  { id: "about", label: "About" },
                  { id: "projects", label: "Projects" },
                  { id: "journey", label: "Journey" },
                  { id: "contact", label: "Contact" },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    data-testid={`link-nav-${item.id}`}
                    className="rounded-full px-3 py-2 text-[13px] text-white/65 transition-colors hover:text-white/90 focus:outline-none focus-visible:focus-ring"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                <a
                  href="#contact"
                  data-testid="button-nav-contact"
                  className="hidden rounded-full bg-white/8 px-3 py-2 text-[13px] text-white/85 ring-1 ring-white/10 transition hover:bg-white/10 focus:outline-none focus-visible:focus-ring sm:inline-flex"
                >
                  Get in touch
                </a>
                <div
                  aria-hidden
                  className="h-8 w-[1px] bg-white/10 hidden sm:block"
                />
                <a
                  href="#"
                  data-testid="link-nav-github"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/0 text-white/70 ring-1 ring-white/10 transition hover:bg-white/6 hover:text-white/90 focus:outline-none focus-visible:focus-ring"
                >
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </header>

        <main>
          <section
            data-testid="section-hero"
            className="relative mx-auto flex min-h-[calc(100vh-120px)] max-w-6xl flex-col items-center justify-center px-6 pb-20 pt-16 text-center sm:pt-24"
          >
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.05, ease: fadeEase }}
              className="glass-card grain glass-refraction relative w-full max-w-3xl px-6 py-10 sm:px-10 sm:py-12"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[1.5rem]"
              />
              <div className="relative">
                <div
                  data-testid="text-hero-meta"
                  className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1.5 text-[12px] text-white/70 ring-1 ring-white/10"
                >
                  <span className="h-1 w-1 rounded-full bg-[hsl(var(--accent))]" />
                  Available for thoughtful work
                </div>

                <h1
                  data-testid="text-hero-title"
                  className="text-balance text-4xl font-semibold tracking-[-0.04em] text-white/95 sm:text-6xl"
                >
                  I Build Digital Experiences
                </h1>

                <p
                  data-testid="text-hero-subtitle"
                  className="mx-auto mt-5 max-w-2xl text-balance text-[15px] leading-relaxed text-white/70 sm:text-base"
                >
                  I design and engineer calm, premium interfaces—where typography,
                  spacing, and motion feel material and intentional.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href="#projects"
                    data-testid="button-hero-projects"
                    className="inline-flex items-center justify-center rounded-full bg-white/10 px-5 py-3 text-sm font-medium text-white/92 ring-1 ring-white/12 transition hover:bg-white/12 focus:outline-none focus-visible:focus-ring"
                  >
                    View projects
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                  <a
                    href="#contact"
                    data-testid="button-hero-contact"
                    className="inline-flex items-center justify-center rounded-full bg-transparent px-5 py-3 text-sm font-medium text-white/70 ring-1 ring-white/10 transition hover:text-white/90 hover:bg-white/6 focus:outline-none focus-visible:focus-ring"
                  >
                    Contact
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-white/55">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/0 px-2 py-1 ring-1 ring-white/10">
                    <MapPin className="h-3.5 w-3.5" />
                    <span data-testid="text-location">Remote</span>
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/0 px-2 py-1 ring-1 ring-white/10">
                    <span className="font-mono" data-testid="text-stack">
                      React · Motion · Systems
                    </span>
                  </span>
                </div>
              </div>
            </motion.div>
          </section>

          <div className="mx-auto max-w-6xl px-6 pb-24">
            <div className="grid gap-8">
              <Section
                id="about"
                eyebrow="About"
                title="Quiet confidence, shipped."
                index={0}
              >
                <p data-testid="text-about-paragraph-1">
                  I care about the details that make software feel expensive: deliberate
                  hierarchy, tactile hover states, and motion that behaves like it has
                  mass.
                </p>
                <p className="mt-4" data-testid="text-about-paragraph-2">
                  My work sits at the intersection of design and engineering—building
                  component systems that are consistent, fast, and easy to evolve.
                </p>
              </Section>

              <Section
                id="projects"
                eyebrow="Selected work"
                title="Projects"
                index={1}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  {projects.map((p, idx) => (
                    <motion.article
                      key={p.id}
                      data-testid={`card-project-${p.id}`}
                      className="glass-refraction grain group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition will-change-transform"
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{
                        duration: 0.9,
                        delay: 0.08 + idx * 0.06,
                        ease: fadeEase,
                      }}
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              y: -6,
                              transition: {
                                type: "spring",
                                stiffness: 220,
                                damping: 24,
                                mass: 0.8,
                              },
                            }
                      }
                      style={{
                        boxShadow:
                          "0 0 0 1px rgba(255,255,255,0.06) inset, 0 18px 50px rgba(0,0,0,0.55)",
                      }}
                    >
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                        style={{
                          background:
                            "radial-gradient(700px 220px at 40% 0%, rgba(255,255,255,0.10), transparent 55%), radial-gradient(460px 220px at 80% 120%, rgba(255,102,51,0.09), transparent 55%)",
                        }}
                      />
                      <div className="relative">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3
                              data-testid={`text-project-title-${p.id}`}
                              className="text-[15px] font-medium tracking-[-0.02em] text-white/92"
                            >
                              {p.title}
                            </h3>
                            <p
                              data-testid={`text-project-desc-${p.id}`}
                              className="mt-2 text-[13px] leading-relaxed text-white/65"
                            >
                              {p.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <a
                              href={p.repo}
                              data-testid={`link-project-repo-${p.id}`}
                              className="grid h-9 w-9 place-items-center rounded-full bg-white/0 text-white/65 ring-1 ring-white/10 transition hover:bg-white/6 hover:text-white/90 focus:outline-none focus-visible:focus-ring"
                            >
                              <Github className="h-4 w-4" />
                            </a>
                            <a
                              href={p.href}
                              data-testid={`link-project-live-${p.id}`}
                              className="grid h-9 w-9 place-items-center rounded-full bg-white/0 text-white/65 ring-1 ring-white/10 transition hover:bg-white/6 hover:text-white/90 focus:outline-none focus-visible:focus-ring"
                            >
                              <LinkIcon className="h-4 w-4" />
                            </a>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              data-testid={`badge-project-${p.id}-${t
                                .replace(/\s+/g, "-")
                                .toLowerCase()}`}
                              className="rounded-full bg-white/0 px-2.5 py-1 text-[11px] text-white/55 ring-1 ring-white/10"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
                <div className="mt-6 text-sm text-white/55">
                  <span className="text-white/70">Note:</span> links are placeholders
                  in this prototype.
                </div>
              </Section>

              <Section
                id="journey"
                eyebrow="Journey"
                title="Experience"
                index={2}
              >
                <div className="grid gap-3">
                  {journey.map((j, idx) => (
                    <motion.div
                      key={j.id}
                      data-testid={`row-journey-${j.id}`}
                      className="glass-refraction relative overflow-hidden rounded-2xl border border-white/10 bg-white/4 px-5 py-4"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{
                        duration: 0.85,
                        delay: 0.06 + idx * 0.05,
                        ease: fadeEase,
                      }}
                    >
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <div>
                          <div
                            data-testid={`text-journey-title-${j.id}`}
                            className="text-sm font-medium text-white/90"
                          >
                            {j.title}
                          </div>
                          <div
                            data-testid={`text-journey-org-${j.id}`}
                            className="text-[13px] text-white/55"
                          >
                            {j.org}
                          </div>
                        </div>
                        <div
                          data-testid={`text-journey-period-${j.id}`}
                          className="mt-1 font-mono text-[12px] text-white/45 sm:mt-0"
                        >
                          {j.period}
                        </div>
                      </div>
                      <div
                        data-testid={`text-journey-desc-${j.id}`}
                        className="mt-2 text-[13px] leading-relaxed text-white/65"
                      >
                        {j.description}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Section>

              <Section
                id="contact"
                eyebrow="Contact"
                title="Let’s build something calm."
                index={3}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p data-testid="text-contact-body">
                      If you’re building a product that values clarity and craft, I’d
                      love to help. Tell me what you’re making and what “done” feels
                      like.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <a
                        href="mailto:hello@example.com"
                        data-testid="button-contact-email"
                        className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-2.5 text-sm font-medium text-white/90 ring-1 ring-white/12 transition hover:bg-white/12 focus:outline-none focus-visible:focus-ring"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Email me
                      </a>
                      <a
                        href="#"
                        data-testid="button-contact-resume"
                        className="inline-flex items-center justify-center rounded-full bg-transparent px-4 py-2.5 text-sm font-medium text-white/70 ring-1 ring-white/10 transition hover:text-white/90 hover:bg-white/6 focus:outline-none focus-visible:focus-ring"
                      >
                        Resume
                      </a>
                    </div>
                  </div>

                  <div className="glass-refraction grain relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="text-[13px] text-white/60">Quick details</div>
                    <div className="mt-3 grid gap-2 text-sm">
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-white/70">Location</div>
                        <div
                          data-testid="text-contact-location"
                          className="font-mono text-[12px] text-white/60"
                        >
                          Remote
                        </div>
                      </div>
                      <div className="h-px bg-white/10" />
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-white/70">Focus</div>
                        <div
                          data-testid="text-contact-focus"
                          className="font-mono text-[12px] text-white/60"
                        >
                          UI systems · Motion · DX
                        </div>
                      </div>
                      <div className="h-px bg-white/10" />
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-white/70">Availability</div>
                        <div
                          data-testid="status-availability"
                          className="font-mono text-[12px] text-[hsl(var(--accent))]"
                        >
                          Limited
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 rounded-xl bg-white/4 p-4 ring-1 ring-white/10">
                      <div className="text-[12px] font-medium text-white/75">
                        Send a note
                      </div>
                      <div className="mt-3 grid gap-2">
                        <input
                          data-testid="input-contact-name"
                          placeholder="Name"
                          className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white/85 placeholder:text-white/35 outline-none transition focus-visible:focus-ring"
                        />
                        <input
                          data-testid="input-contact-email"
                          placeholder="Email"
                          className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white/85 placeholder:text-white/35 outline-none transition focus-visible:focus-ring"
                        />
                        <textarea
                          data-testid="input-contact-message"
                          placeholder="A short message"
                          rows={3}
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 placeholder:text-white/35 outline-none transition focus-visible:focus-ring"
                        />
                        <Button
                          data-testid="button-contact-send"
                          type="button"
                          className="mt-1 w-full rounded-lg bg-white/10 text-white/90 hover:bg-white/12 ring-1 ring-white/12"
                        >
                          Send
                        </Button>
                        <div
                          data-testid="text-contact-note"
                          className="text-[12px] text-white/45"
                        >
                          Prototype only — this form doesn’t send yet.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Section>

              <footer className="mx-auto max-w-5xl px-2 pt-2">
                <div className="flex flex-col items-center justify-between gap-3 py-8 text-xs text-white/45 sm:flex-row">
                  <div data-testid="text-footer-left">
                    © {new Date().getFullYear()} Your Name
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href="#"
                      data-testid="link-footer-github"
                      className="rounded-full px-2 py-1 text-white/55 transition hover:text-white/80 focus:outline-none focus-visible:focus-ring"
                    >
                      GitHub
                    </a>
                    <a
                      href="#"
                      data-testid="link-footer-linkedin"
                      className="rounded-full px-2 py-1 text-white/55 transition hover:text-white/80 focus:outline-none focus-visible:focus-ring"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="#contact"
                      data-testid="link-footer-contact"
                      className="rounded-full px-2 py-1 text-white/55 transition hover:text-white/80 focus:outline-none focus-visible:focus-ring"
                    >
                      Contact
                    </a>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
