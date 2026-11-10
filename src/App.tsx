import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Process } from './components/Process';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { BackgroundEffects } from './components/BackgroundEffects';

const AdminPage = lazy(() => import('./pages/AdminPage').then((m) => ({ default: m.AdminPage })));
const ChatbotWidget = lazy(() => import('./components/ChatbotWidget').then((m) => ({ default: m.ChatbotWidget })));

function ScrollHandler() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Always start at top of page (0,0) on initial load or path change
    window.scrollTo(0, 0);
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [pathname]);

  return null;
}

function PortfolioHome() {
  return (
    <div className="relative z-10">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Process />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollHandler />
      <div className="min-h-screen bg-mesh relative selection:bg-blue-500/20 selection:text-blue-900 dark:selection:text-white">
        <BackgroundEffects />
        <CustomCursor />
        <Suspense fallback={null}>
          <ChatbotWidget />
        </Suspense>
        
        <Helmet>
          <title>Kaveen Sandeepa | Web Developer, Designer & Digital Creator</title>
          <meta
            name="description"
            content="Portfolio of Kaveen Sandeepa. Web development, UI design, custom web applications, and mobile apps."
          />
          <link rel="canonical" href="https://kaveensandeepa.lk" />
          <meta property="og:title" content="Kaveen Sandeepa | Web Developer & Designer" />
          <meta property="og:description" content="Portfolio of Kaveen Sandeepa, specializing in designing and developing premium websites that help businesses grow." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://kaveensandeepa.lk" />
          <meta property="og:image" content="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200" />
        </Helmet>

        <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-sm font-semibold">Loading...</div>}>
          <Routes>
            <Route path="/" element={<PortfolioHome />} />
            <Route path="/kajja" element={<AdminPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}
