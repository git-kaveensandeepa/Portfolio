import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Subtle Background Glow */}
      <motion.div 
        animate={{ 
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-400/20 dark:bg-white/5 rounded-full blur-3xl -z-10 mix-blend-multiply dark:mix-blend-lighten" 
      />
      <motion.div 
        animate={{ 
          x: [0, -50, 50, 0],
          y: [0, 50, -50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-slate-300/20 dark:bg-white/5 rounded-full blur-3xl -z-10 mix-blend-multiply dark:mix-blend-lighten" 
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col-reverse lg:flex-row items-center gap-16">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 text-center lg:text-left mt-8 lg:mt-0"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
            I build modern <br className="hidden sm:block" />
            websites <span className="text-slate-500 dark:text-slate-400">that feel as</span> <br className="hidden sm:block" />
            <span className="text-slate-500 dark:text-slate-400">good as they look.</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light">
            I'm <strong className="font-semibold text-slate-900 dark:text-white">Kaveen Sandeepa</strong>, a web developer focused on creating modern, responsive and high-quality digital experiences for businesses and brands.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-medium rounded-full glass-btn-primary"
            >
              View Projects
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-medium rounded-full glass-btn"
            >
              Let's Talk
            </a>
          </div>
        </motion.div>

        {/* Right Visual Element (Profile Image) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 flex justify-center lg:justify-end w-full"
        >
          <div className="relative w-full max-w-[280px] lg:max-w-[400px] aspect-square">
            {/* Main Image Panel */}
            <div className="absolute inset-0 rounded-full glass p-2 overflow-hidden flex flex-col group">
               <div className="relative w-full h-full rounded-full overflow-hidden bg-white/20">
                 <img 
                    src="https://i.postimg.cc/D0Sr0P4r/FB-IMG-1788866980888.jpg" 
                    alt="Kaveen Sandeepa" 
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
               </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
