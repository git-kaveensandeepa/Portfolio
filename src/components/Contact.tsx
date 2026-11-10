import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  AlertCircle, 
  Phone, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';


const SERVICES = [
  'Business Website',
  'Full-Stack Web App',
  'Mobile / Android App',
  'UI/UX & Redesign',
  'E-Commerce Platform',
  'Consultation / Other'
];

const BUDGET_OPTIONS = [
  'Under Rs. 50,000 (~$150)',
  'Rs. 50,000 – 150,000 (~$150–$500)',
  'Rs. 150,000 – 300,000 (~$500–$1,000)',
  'Rs. 300,000+ (~$1,000+)',
  'Flexible / Discussion'
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Business Website',
    budget: 'Rs. 50,000 – 150,000 (~$150–$500)',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.name.trim().length < 2) {
      setError("Please enter your name (minimum 2 characters).");
      return;
    }
    if (!formData.email.includes('@') || formData.email.trim().length < 5) {
      setError("Please enter a valid email address.");
      return;
    }
    if (formData.message.trim().length < 5) {
      setError("Please write a brief description of your project (minimum 5 characters).");
      return;
    }

    setLoading(true);

    try {
      const { collection, addDoc } = await import('firebase/firestore');
      const { db } = await import('../lib/firebase');
      await addDoc(collection(db, 'contact_messages'), {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || 'Not provided',
        service: formData.service,
        budget: formData.budget,
        message: formData.message.trim(),
        status: 'new',
        createdAt: new Date().toISOString()
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error("Inquiry submission error:", err);
      setError("Couldn't save the inquiry right now. You can also send it directly via WhatsApp below.");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppDirect = async () => {
    // If user filled in some details, save them to Firestore as well
    if (formData.name.trim() || formData.message.trim()) {
      try {
        const { collection, addDoc } = await import('firebase/firestore');
        const { db } = await import('../lib/firebase');
        addDoc(collection(db, 'contact_messages'), {
          name: formData.name.trim() || 'WhatsApp Visitor',
          email: formData.email.trim() || 'via-whatsapp@client.com',
          phone: formData.phone.trim() || 'WhatsApp Direct',
          service: formData.service,
          budget: formData.budget,
          message: formData.message.trim() || 'Direct WhatsApp contact initiated.',
          status: 'new',
          createdAt: new Date().toISOString()
        });
      } catch (e) {
        // Non-blocking
      }
    }

    const text = `Hello Kaveen! I'd like to discuss a project.
    
*Name:* ${formData.name.trim() || 'Not specified'}
*Email:* ${formData.email.trim() || 'Not specified'}
*Phone:* ${formData.phone.trim() || 'Not specified'}
*Service:* ${formData.service}
*Budget:* ${formData.budget}

*Project Details:*
${formData.message.trim() || 'I would like to start a project consultation.'}`;

    const url = `https://wa.me/94710947871?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setError(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Business Website',
      budget: 'Rs. 50,000 – 150,000 (~$150–$500)',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-inset text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Inquiries & Consultation</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4"
          >
            Let's Discuss Your Project
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed"
          >
            Whether you need a high-performance business website, custom web application, Android app, or modern UI/UX design, share your requirements below for a prompt response.
          </motion.p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact & Availability (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Status Card */}
            <div className="neu-card p-6 sm:p-8 rounded-3xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Availability Status
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Open for Projects
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">
                Fast Turnaround & Direct Communication
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-6">
                I work directly with clients without intermediaries, ensuring your exact vision is realized with clean code and modern design.
              </p>

              {/* Response SLA */}
              <div className="flex items-center gap-3 p-4 rounded-2xl neu-inset mb-6">
                <Clock className="w-5 h-5 text-blue-500 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Quick Response Time</div>
                  <div className="text-xs text-slate-500 font-light">Typically replies within 2–4 hours</div>
                </div>
              </div>

              {/* Direct Channels */}
              <div className="space-y-3">
                {/* WhatsApp Direct */}
                <a
                  href="https://wa.me/94710947871"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-4 rounded-2xl neu-btn group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl neu-inset flex items-center justify-center text-emerald-500">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-slate-500 font-medium">WhatsApp Direct</div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">+94 71 094 7871</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Email Direct */}
                <a
                  href="mailto:mail.kaveensandeepa@gmail.com"
                  className="w-full flex items-center justify-between p-4 rounded-2xl neu-btn group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl neu-inset flex items-center justify-center text-blue-500">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-slate-500 font-medium">Email Address</div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white break-all">
                        mail.kaveensandeepa@gmail.com
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Location */}
                <div className="flex items-center gap-3 p-4 rounded-2xl neu-card">
                  <div className="w-10 h-10 rounded-xl neu-inset flex items-center justify-center text-amber-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Location</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">Sri Lanka • Serving Worldwide</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Simple Process */}
            <div className="neu-card p-6 sm:p-8 rounded-3xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                How We'll Work Together
              </h4>
              <ol className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full neu-inset text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                  <span><strong>Submit Inquiry:</strong> Share your project idea, preferred stack, or goals.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full neu-inset text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                  <span><strong>Consultation & Scope:</strong> Review requirements and agree on deliverables & price.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full neu-inset text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                  <span><strong>Development & Delivery:</strong> Agile sprints, live preview demos, and source delivery.</span>
                </li>
              </ol>
            </div>
          </motion.div>

          {/* Right Column: Client Inquiry Form (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="neu-card p-6 sm:p-10 rounded-3xl relative">
              
              <AnimatePresence mode="wait">
                {submitted ? (
                  /* Success Confirmation Screen */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="text-center py-12 px-4"
                  >
                    <div className="w-16 h-16 rounded-full neu-inset flex items-center justify-center mx-auto mb-6 text-emerald-500">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                      Inquiry Sent Successfully!
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light max-w-md mx-auto mb-6 leading-relaxed">
                      Thank you, <strong className="text-slate-900 dark:text-white">{formData.name}</strong>! Your inquiry for <span className="text-blue-600 dark:text-blue-400 font-medium">{formData.service}</span> has been securely stored. I will review your requirements and reach out to you shortly.
                    </p>

                    <div className="p-4 rounded-2xl neu-inset max-w-md mx-auto mb-8 text-left text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
                      <div><strong>Email:</strong> {formData.email}</div>
                      {formData.phone && <div><strong>Phone / WhatsApp:</strong> {formData.phone}</div>}
                      <div><strong>Estimated Budget:</strong> {formData.budget}</div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        onClick={handleWhatsAppDirect}
                        className="w-full sm:w-auto px-6 py-3.5 rounded-full neu-btn font-bold text-xs flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 cursor-pointer"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                        </svg>
                        <span>Chat on WhatsApp Too</span>
                      </button>

                      <button
                        onClick={handleResetForm}
                        className="w-full sm:w-auto px-6 py-3.5 rounded-full neu-btn-primary font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Send Another Inquiry</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Active Form */
                  <form onSubmit={handleSubmitInquiry} className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-300/40 dark:border-white/10">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                          Client Inquiry Form
                        </h3>
                        <p className="text-xs text-slate-500 font-light mt-0.5">
                          Direct inquiry delivered straight to Kaveen's verified dashboard.
                        </p>
                      </div>
                      <div className="w-9 h-9 rounded-full neu-inset flex items-center justify-center text-blue-500">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                    </div>

                    {error && (
                      <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    {/* Personal Info Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                          Your Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Kasun Perera"
                          className="w-full px-4 py-3 rounded-2xl neu-inset outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/30 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="kasun@example.com"
                          className="w-full px-4 py-3 rounded-2xl neu-inset outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/30 transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone / WhatsApp */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center justify-between">
                        <span>Phone / WhatsApp Number</span>
                        <span className="text-[10px] text-slate-400 font-normal">Optional but recommended</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+94 7X XXX XXXX"
                          className="w-full pl-11 pr-4 py-3 rounded-2xl neu-inset outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/30 transition-all"
                        />
                      </div>
                    </div>

                    {/* Service Selection */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Project / Service Category
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {SERVICES.map((srv) => {
                          const isSelected = formData.service === srv;
                          return (
                            <button
                              key={srv}
                              type="button"
                              onClick={() => setFormData({ ...formData, service: srv })}
                              className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left truncate ${
                                isSelected
                                  ? 'neu-btn-primary !text-white'
                                  : 'neu-btn text-slate-600 dark:text-slate-300'
                              }`}
                            >
                              {srv}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Budget Selection */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl neu-inset outline-none text-sm text-slate-900 dark:text-white cursor-pointer"
                      >
                        {BUDGET_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Project Details */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Project Requirements & Goals <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Briefly describe what you're planning to build (e.g. required features, reference sites, timeline, or design style)..."
                        className="w-full px-4 py-3 rounded-2xl neu-inset outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400 resize-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                      />
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:flex-1 py-4 px-6 rounded-2xl neu-btn-primary font-bold text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit Inquiry Online</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleWhatsAppDirect}
                        className="w-full sm:w-auto py-4 px-6 rounded-2xl neu-btn font-bold text-sm flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 cursor-pointer"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                        </svg>
                        <span>Send via WhatsApp</span>
                      </button>
                    </div>

                    <p className="text-[11px] text-center text-slate-400 font-light">
                      🔒 Your details are stored securely and never shared with third parties.
                    </p>
                  </form>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
