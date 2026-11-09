import { Linkedin, Facebook, Instagram, ArrowUpRight } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'WhatsApp',
      href: 'https://wa.me/94710947871',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      )
    },
    {
      name: 'Facebook',
      href: '#',
      icon: <Facebook className="w-4 h-4" />
    },
    {
      name: 'X',
      href: '#',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: <Linkedin className="w-4 h-4" />
    },
    {
      name: 'TikTok',
      href: '#',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: '#',
      icon: <Instagram className="w-4 h-4" />
    }
  ];
  
  return (
    <footer className="mt-24 border-t border-slate-300/40 dark:border-white/10 neu-card rounded-t-3xl sm:rounded-t-[40px]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div>
            <a href="#home" className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white block mb-4">
              Kaveen.
            </a>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 max-w-sm font-light">
              I specialize in designing and developing premium websites that help businesses grow, convert, and succeed online.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={link.name}
                  className="w-10 h-10 rounded-full neu-circle-btn flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/#home" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors">Home</a></li>
              <li><a href="/#about" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors">About</a></li>
              <li><a href="/#skills" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors">Skills</a></li>
              <li><a href="/#projects" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors">Projects</a></li>
              <li><a href="/#contact" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-wider">Let's Work Together</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 font-light leading-relaxed">
              Ready to start your next project? Let's discuss your requirements and build something extraordinary.
            </p>
            <div className="flex flex-col gap-3">
              <a href="mailto:mail.kaveensandeepa@gmail.com" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group">
                mail.kaveensandeepa@gmail.com
                <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a 
                href="https://www.fiverr.com/fr_kaveen" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 mt-2 text-sm font-semibold rounded-full neu-btn-fiverr w-fit"
              >
                Hire me on Fiverr
              </a>
            </div>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-300/40 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center font-light">
            © {currentYear} Kaveen Sandeepa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
