import { useEffect } from 'react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    // Lock scrolling while splash screen is active
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      onComplete();
    }, 4000); // 4 seconds total duration
    
    return () => {
      document.body.style.overflow = 'unset';
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        filter: "blur(20px)",
        scale: 1.05,
        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-2xl border-none shadow-none"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Brand */}
        <div className="overflow-hidden pb-4">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight flex items-center"
          >
            Kaveen
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2, type: "spring", stiffness: 200 }}
              className="text-slate-500 ml-1"
            >
              .
            </motion.span>
          </motion.div>
        </div>

        {/* Progress Line */}
        <motion.div 
          className="w-48 h-[2px] bg-slate-300/50 rounded-full overflow-hidden mt-4"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="h-full bg-slate-800 rounded-full w-full origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
