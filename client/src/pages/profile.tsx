import { motion, type Variants } from "framer-motion";
import { ChevronLeft, Github, Instagram, Linkedin, Mail, Heart, Code, Coffee, Trophy } from "lucide-react";
import { Link } from "wouter";
import profileImg from "@/assets/images/satwik-profile.png";

function AchievementCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card p-10 border-accent/10 bg-accent/[0.02] ring-1 ring-accent/5"
    >
      <h3 className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-accent mb-8 flex items-center gap-2">
        <Trophy className="h-3.5 w-3.5" /> Key Achievement
      </h3>
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/30">Championship</span>
          <span className="text-lg font-bold text-white tracking-tight">LAN Champion — Lucknow University</span>
        </div>
        <div className="flex flex-col gap-1 border-t border-white/5 pt-4">
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/30">Competitive Level</span>
          <span className="text-lg font-bold text-white tracking-tight">BGMI Tournament — Top 2 Finish</span>
        </div>
        <div className="flex flex-col gap-1 border-t border-white/5 pt-4">
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/30">Financial Impact</span>
          <span className="text-lg font-bold text-accent tracking-tight">Total Prize Pool Won — ₹2,00,000</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Profile() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.6,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  return (
    <div className="dark min-h-screen bg-[#050505] text-white selection:bg-accent/40 selection:text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,68,0,0.03),transparent_70%)] pointer-events-none" />
      
      <nav className="fixed top-8 left-8 z-50">
        <Link href="/">
          <motion.button
            whileHover={{ x: -4 }}
            className="glass p-4 rounded-full flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white/60 hover:text-accent transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Artifacts
          </motion.button>
        </Link>
      </nav>

      <main className="relative max-w-6xl mx-auto px-6 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center lg:justify-start lg:sticky lg:top-32"
          >
            <div className="relative group">
              {/* Background Breathing Light */}
              <motion.div 
                animate={{ 
                  opacity: [0.08, 0.15, 0.08],
                  scale: [1, 1.15, 1] 
                }}
                transition={{ 
                  duration: 12, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute -inset-24 bg-accent/20 blur-[140px] rounded-full pointer-events-none" 
              />
              
              <div className="relative glass-card aspect-square w-full max-w-[480px] rounded-[3.5rem] overflow-hidden border border-white/10 ring-1 ring-white/5 shadow-2xl">
                <motion.div 
                  className="w-full h-full relative"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img 
                    src={profileImg} 
                    alt="Satwik Mani Tripathi" 
                    className="w-full h-full object-cover transition-all duration-700 grayscale hover:grayscale-0 contrast-[1.1] brightness-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/25 pointer-events-none" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-16 order-1 lg:order-2">
            <header className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-accent text-[10px] font-mono font-black uppercase tracking-[0.5em] flex items-center gap-4 mb-4"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(255,68,0,1)]" />
                The Architect
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-7xl sm:text-8xl font-black tracking-tighter leading-[0.85]"
              >
                Satwik Mani <br />
                <span className="text-accent italic font-medium">Tripathi</span>
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4"
              >
                <p className="text-lg text-white/75 font-normal leading-[1.6] max-w-[520px] tracking-tight">
                  Computer Science student focused on building <span className="text-white font-medium">scalable, production-ready digital systems</span>. 
                  I obsess over engineering discipline and intentional design to create software that commands respect.
                </p>
              </motion.div>
            </header>

            <div className="grid sm:grid-cols-2 gap-12">
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h3 className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-white/20 border-b border-white/5 pb-3 flex items-center gap-2">
                  <Code className="h-3 w-3" /> Technical Interests
                </h3>
                <ul className="space-y-5 text-[14px] font-medium text-white/60">
                  {["Full-Stack Architecture", "Data Structures & Algorithms", "Game Development Engine", "Distributed Systems"].map((interest) => (
                    <motion.li key={interest} variants={itemVariants} className="flex items-center gap-3">
                      <div className="h-1 w-1 rounded-full bg-accent/40" /> {interest}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h3 className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-white/20 border-b border-white/5 pb-3 flex items-center gap-2">
                  <Heart className="h-3 w-3" /> Personal Pursuits
                </h3>
                <ul className="space-y-5 text-[14px] font-medium text-white/60">
                  {["Competitive Badminton", "Lawn Tennis", "Strategic Chess", "Esports Engineering"].map((hobby) => (
                    <motion.li key={hobby} variants={itemVariants} className="flex items-center gap-3">
                      <div className="h-1 w-1 rounded-full bg-accent/40" /> {hobby}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <AchievementCard />

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              className="pt-16 border-t border-white/5 flex items-center gap-8"
            >
              {[
                { icon: Github, href: "https://github.com/yourusername" },
                { icon: Linkedin, href: "https://linkedin.com/in/yourusername" },
                { icon: Instagram, href: "https://instagram.com/yourusername" },
                { icon: Mail, href: "mailto:satwikmani@example.com" }
              ].map((social, i) => (
                <a 
                  key={social.href}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="glass p-5 rounded-full hover:text-accent transition-all duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
              <div className="h-px flex-1 bg-white/5" />
              <div className="flex items-center gap-3 text-[10px] font-mono font-black uppercase tracking-widest text-white/10">
                <Coffee className="h-3 w-3" /> Precision Artifact
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}