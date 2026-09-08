export function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Use a hardcoded 2026 as per user request if preferred, but dynamic is usually better.
  // Prompt requested: © 2026 Kaveen Sandeepa.
  
  return (
    <footer className="glass border-x-0 border-b-0 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          
          <div className="text-center md:text-left">
            <a href="#home" className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white block mb-2">
              Kaveen.
            </a>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Building modern digital experiences.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a href="#home" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">Home</a>
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">About</a>
            <a href="#projects" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">Projects</a>
            <a href="#services" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">Services</a>
            <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">Contact</a>
          </nav>
          
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-left">
            © 2026 Kaveen Sandeepa. All rights reserved.
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500 text-center md:text-right">
            Designed & Built with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
