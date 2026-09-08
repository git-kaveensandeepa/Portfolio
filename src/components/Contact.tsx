import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaEnvelope, FaLinkedinIn, FaInstagram, FaWhatsapp, FaTimes } from 'react-icons/fa';
import { SectionHeading } from './SectionHeading';

const contactLinks = [
  { name: 'Email', icon: FaEnvelope, href: 'mailto:mail.kaveensandeepa@gmail.com' },
  { name: 'LinkedIn', icon: FaLinkedinIn, href: '#' },
  { name: 'Instagram', icon: FaInstagram, href: '#' },
  { name: 'WhatsApp', icon: FaWhatsapp, href: '#' },
];

export function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Business Website',
    details: ''
  });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Kaveen's WhatsApp number in international format (94 + number)
    const phoneNumber = "94710947871"; 
    
    const message = `Hello Kaveen! I'd like to start a project.
    
*Name:* ${formData.name}
*Email:* ${formData.email}
*Project Type:* ${formData.type}

*Details:* 
${formData.details}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsModalOpen(false);
    
    // Reset form
    setFormData({ name: '', email: '', type: 'Business Website', details: '' });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <motion.div 
        animate={{ 
          x: ["-50%", "-40%", "-60%", "-50%"],
          y: ["-50%", "-60%", "-40%", "-50%"],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 w-full max-w-2xl h-96 bg-slate-300/20 dark:bg-white/5 rounded-full blur-3xl -z-10 mix-blend-multiply dark:mix-blend-lighten" 
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Have a project in mind?
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 font-light">
            Let's build something modern, useful and memorable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full glass-btn-primary cursor-pointer"
            >
              Start a Project
            </button>
            <a
              href="mailto:mail.kaveensandeepa@gmail.com"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full glass-btn"
            >
              Email Me
            </a>
          </div>

          <div className="flex items-center justify-center gap-6">
            {contactLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="p-3 rounded-full glass hover:-translate-y-1 transition-all duration-500 ease-out text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                aria-label={link.name}
              >
                <link.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* WhatsApp Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/50 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full glass hover:bg-white/60 transition-colors text-slate-700 hover:text-slate-900 cursor-pointer"
              >
                <FaTimes />
              </button>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Tell me about your project</h3>
              <p className="text-slate-600 font-light mb-6">Fill out the details and I'll receive them directly on WhatsApp.</p>
              
              <form onSubmit={handleWhatsAppSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white/40 border border-white/60 focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20 outline-none transition-all placeholder:text-slate-400"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white/40 border border-white/60 focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20 outline-none transition-all placeholder:text-slate-400"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Project Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white/40 border border-white/60 focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20 outline-none transition-all text-slate-700"
                  >
                    <option value="Business Website">Business Website</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="SaaS Interface">SaaS Interface</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Project Details</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white/40 border border-white/60 focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20 outline-none transition-all placeholder:text-slate-400 resize-none"
                    placeholder="Tell me a bit about what you want to build..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl glass-btn-primary mt-2 cursor-pointer"
                >
                  <FaWhatsapp className="w-5 h-5 mr-2" />
                  Send via WhatsApp
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
