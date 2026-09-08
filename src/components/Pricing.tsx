import { motion } from 'motion/react';
import { Check, Info, ArrowRight } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const pricingPlans = [
  {
    name: "Starter Website",
    price: "15,000",
    monthly: "1,500",
    description: "Best for small businesses, personal brands, salons, shops & services.",
    popular: false,
    features: [
      "1–3 pages",
      "Modern custom UI design",
      "Mobile & tablet responsive",
      "WhatsApp button",
      "Contact section",
      "Google Maps",
      "Basic animations",
      "Basic SEO setup",
      "Website deployment"
    ],
    monthlyFeatures: [
      "Website hosting",
      "SSL/security",
      "Basic maintenance",
      "Minor content updates",
      "Technical support"
    ]
  },
  {
    name: "Business Website",
    price: "25,000",
    monthly: "2,500",
    description: "Best for growing businesses that need a professional online presence.",
    popular: true,
    features: [
      "4–6 pages",
      "Fully custom modern UI",
      "Mobile, tablet & desktop responsive",
      "Home, About, Services/Products, Contact",
      "WhatsApp integration",
      "Google Maps",
      "Contact form",
      "Social media links",
      "Smooth animations",
      "Basic SEO",
      "Performance optimization",
      "Website deployment"
    ],
    monthlyFeatures: [
      "Hosting",
      "SSL/security",
      "Website maintenance",
      "Minor content updates",
      "Bug fixes",
      "Technical support",
      "Regular website checks"
    ]
  },
  {
    name: "Premium Website",
    price: "40,000",
    pricePrefix: "Starting from ",
    monthly: "4,000",
    description: "Best for companies, premium brands, online stores & businesses that need advanced functionality.",
    popular: false,
    features: [
      "Fully custom website",
      "Advanced UI/UX",
      "Multiple pages",
      "Product/service catalogue",
      "Advanced animations & interactions",
      "WhatsApp integration",
      "Contact forms",
      "Google Maps",
      "SEO setup",
      "Performance optimization",
      "Analytics integration",
      "Custom features depending on requirements"
    ],
    monthlyFeatures: [
      "Hosting",
      "SSL/security",
      "Maintenance",
      "Bug fixes",
      "Minor content updates",
      "Technical support",
      "Performance monitoring"
    ]
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading 
          title="Pricing Plans" 
          subtitle="Transparent pricing packages designed to fit your business needs and budget."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col p-8 rounded-3xl backdrop-blur-md transition-all duration-300 ${
                plan.popular 
                  ? 'bg-slate-900 text-white shadow-2xl scale-100 lg:scale-105 z-10 border border-slate-700' 
                  : 'bg-white/40 dark:bg-white/5 text-slate-900 dark:text-white border border-white/40 dark:border-white/10 hover:shadow-xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-blue-500 text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm min-h-[40px] ${plan.popular ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-8 pb-8 border-b border-opacity-20 border-current">
                <div className="flex items-baseline mb-2">
                  <span className="text-sm font-medium mr-1">{plan.pricePrefix || ''}</span>
                  <span className="text-sm font-semibold mr-1">LKR</span>
                  <span className="text-4xl lg:text-5xl font-bold tracking-tight">{plan.price}</span>
                </div>
                <div className="flex items-center text-sm font-medium opacity-80 mt-1">
                  <span className="mr-1">+ LKR {plan.monthly} / month</span>
                </div>
              </div>

              <div className="flex-grow space-y-6">
                {/* One-time features */}
                <div>
                  <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider opacity-80">Includes</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <Check className={`w-4 h-4 mr-3 shrink-0 mt-0.5 ${plan.popular ? 'text-blue-400' : 'text-green-500'}`} />
                        <span className="opacity-90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Monthly features */}
                <div className="pt-6 border-t border-opacity-10 border-current">
                  <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider opacity-80">Monthly Plan Covers</h4>
                  <ul className="space-y-3">
                    {plan.monthlyFeatures.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <Check className={`w-4 h-4 mr-3 shrink-0 mt-0.5 ${plan.popular ? 'text-blue-400' : 'text-green-500'}`} />
                        <span className="opacity-90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-8">
                <a 
                  href="#contact"
                  className={`w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-sm font-semibold transition-all ${
                    plan.popular
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100'
                  }`}
                >
                  Choose {plan.name.split(' ')[0]}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Cards / FAQs */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-6 rounded-2xl glass-card flex items-start"
          >
            <Info className="w-6 h-6 text-blue-500 mr-4 shrink-0" />
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">How Payments Work</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                The <strong className="text-slate-900 dark:text-white">one-time payment</strong> covers the design, development, and initial setup of the website.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                The <strong className="text-slate-900 dark:text-white">monthly payment</strong> covers ongoing costs such as hosting, maintenance, security, updates, and technical support. Major changes or new pages outside the selected package may incur an additional charge.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-6 rounded-2xl glass-card flex items-start"
          >
            <Info className="w-6 h-6 text-blue-500 mr-4 shrink-0" />
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Domain Name</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                Domain registration (e.g., yourbusiness.com or yourbusiness.lk) is billed separately. Domain renewal is paid yearly by the client.
              </p>
              <h4 className="font-semibold text-slate-900 dark:text-white mt-4 mb-2">Custom Requirements?</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                If you already have a specific budget or unique requirements not covered here, I can create a custom package tailored specifically for your business.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
