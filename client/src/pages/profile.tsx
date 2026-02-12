import { motion } from "framer-motion";
import { ChevronLeft, Github, Instagram, Linkedin, Mail, Heart, Code, Coffee, Trophy } from "lucide-react";
import { Link } from "wouter";
import profileImg from "/attached_assets/PHOTO-2026-02-11-14-42-25_1770801297717.jpg";

export default function Profile() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.4, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  return (
    <div className="dark min-h-screen bg-[#050505] text-white selection:bg-accent/40 selection:text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,68,0,0.05),transparent_70%)] pointer-events-none" />
      
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

      <main className="relative max-w-6xl mx-auto px-6 py-32 sm:py-48">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative group">
              {/* Background Breathing Light */}
              <motion.div 
                animate={{ 
                  opacity: [0.02, 0.05, 0.02],
                  scale: [1, 1.1, 1] 
                }}
                transition={{ 
                  duration: 12, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute -inset-20 bg-accent/40 blur-[120px] rounded-full pointer-events-none" 
              />
              
              <div className="relative glass-card aspect-square w-full max-w-[450px] rounded-[3rem] overflow-hidden border border-white/10 ring-1 ring-white/5 shadow-2xl">
                <img 
                  src={profileImg} 
                  alt="Satwik Mani Tripathi" 
                  className="w-full h-full object-cover transition-all duration-700"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            <header>
              <div className="text-accent text-xs font-black uppercase tracking-[0.4em] mb-6 flex items-center gap-4">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(255,68,0,1)]" />
                The Architect
              </div>
              <h1 className="text-6xl sm:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
                Satwik Mani <br />
                <span className="text-accent italic font-medium">Tripathi</span>
              </h1>
              <p className="text-xl text-white/60 font-light leading-relaxed max-w-xl">
                A second-year Computer Science student at <span className="text-white font-medium">Newton School of Technology</span>. 
                Engineering intentional digital products through rigorous technical discipline.
              </p>
            </header>

            <div className="grid sm:grid-cols-2 gap-10">
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 border-b border-white/5 pb-2 flex items-center gap-2">
                  <Code className="h-3 w-3" /> Interests
                </h3>
                <ul className="space-y-4 text-sm font-medium text-white/70">
                  {["Full-Stack Architecture", "Data Structures", "Game Development", "Distributed Systems"].map((interest) => (
                    <motion.li key={interest} variants={itemVariants} className="flex items-center gap-3">
                      <div className="h-1 w-1 rounded-full bg-accent" /> {interest}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 border-b border-white/5 pb-2 flex items-center gap-2">
                  <Heart className="h-3 w-3" /> Hobbies
                </h3>
                <ul className="space-y-4 text-sm font-medium text-white/70">
                  {["Badminton", "Cricket", "Lawn Tennis", "E-sports"].map((hobby) => (
                    <motion.li key={hobby} variants={itemVariants} className="flex items-center gap-3">
                      <div className="h-1 w-1 rounded-full bg-accent" /> {hobby}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="glass-card p-8 border-accent/20 bg-accent/5 ring-1 ring-accent/10"
            >
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-4 flex items-center gap-2">
                <Trophy className="h-3 w-3" /> Key Achievement
              </h3>
              <p className="text-sm font-medium text-white/80 leading-relaxed">
                Achieved <span className="text-accent font-black">1st Position</span> in Lucknow University LAN Event. 
                Played T2 in BGMI Tournament, securing a total prize pool of <span className="text-white font-black">₹2 Lakhs</span>.
              </p>
            </motion.div>

            <div className="pt-12 border-t border-white/5 flex items-center gap-6">
              {[
                { icon: Github, href: "https://github.com/yourusername" },
                { icon: Linkedin, href: "https://linkedin.com/in/yourusername" },
                { icon: Instagram, href: "https://instagram.com/yourusername" },
                { icon: Mail, href: "mailto:satwikmani@example.com" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="glass p-5 rounded-full hover:text-accent transition-all"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
              <div className="h-px flex-1 bg-white/5 mx-4" />
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20">
                <Coffee className="h-3 w-3" /> Built with Focus
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}