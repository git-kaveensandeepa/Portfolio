import React from 'react';
import { ArrowRight, Code2, PenTool } from 'lucide-react';
import { TextReveal } from './TextReveal';

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Subtle Ambient Background Lighting (fixed, never moves or fades out on scroll) */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/50 dark:bg-white/5 rounded-full blur-3xl -z-10 pointer-events-none" 
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-slate-300/30 dark:bg-black/30 rounded-full blur-3xl -z-10 pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Left Content - Permanent 100% Solid Visibility, NEVER hides on scroll */}
        <div className="flex-1 text-center lg:text-left mt-6 lg:mt-0">
          
          {/* Status pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-badge text-xs font-bold text-slate-800 dark:text-slate-200 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for New Projects</span>
          </div>

          <TextReveal 
            text="I build modern websites that feel as good as they look." 
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.15] mb-6 justify-center lg:justify-start"
          />
          
          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-200 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed font-normal">
            I'm <strong className="font-bold text-slate-950 dark:text-white">Kaveen Sandeepa</strong>, a web developer focused on creating modern, responsive and high-quality digital experiences with smooth tactile interfaces.
          </p>
          
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
            <button
              onClick={() => scrollToSection('#projects')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm font-bold rounded-full neu-btn-primary group shadow-md cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection('#contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm font-bold rounded-full neu-btn text-slate-800 dark:text-white cursor-pointer"
            >
              Send Inquiry
            </button>

            <a
              href="https://www.fiverr.com/fr_kaveen"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm font-bold rounded-full neu-btn-fiverr"
            >
              Hire me on Fiverr
            </a>
          </div>

        </div>

        {/* Right Visual Element (Profile Image with Neumorphic Extrusion) */}
        <div className="flex-1 flex justify-center lg:justify-end w-full relative">
          <div className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[380px] aspect-square flex items-center justify-center">
            
            {/* Outer embossed ring */}
            <div className="absolute inset-0 rounded-full neu-card" />

            {/* Inner recessed bezel */}
            <div className="absolute inset-4 rounded-full neu-inset p-3 overflow-hidden">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <img 
                  src="https://i.postimg.cc/D0Sr0P4r/FB-IMG-1788866980888.jpg" 
                  alt="Kaveen Sandeepa" 
                  width={380}
                  height={380}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Floating tactile decorative badges */}
            <div className="absolute -top-3 -right-3 w-14 h-14 neu-circle-btn rounded-full flex items-center justify-center z-20 text-blue-600 dark:text-blue-400 shadow-md">
              <Code2 size={24} />
            </div>
            
            <div className="absolute -bottom-2 -left-2 w-16 h-16 neu-circle-btn rounded-full flex items-center justify-center z-20 text-emerald-600 dark:text-emerald-400 shadow-md">
              <PenTool size={26} />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
