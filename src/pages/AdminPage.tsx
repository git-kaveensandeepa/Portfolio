import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  ShieldCheck, 
  ShoppingBag, 
  Mail, 
  LogOut, 
  ExternalLink, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  RefreshCw,
  Plus,
  BookOpen,
  Search,
  Edit2,
  X,
  Database,
  Check,
  FolderGit2,
  Globe,
  Sparkles,
  Layers,
  MessageSquare,
  TrendingUp,
  SlidersHorizontal,
  ChevronRight,
  Menu,
  Phone,
  User as UserIcon,
  Zap,
  Activity,
  Tag,
  DollarSign
} from 'lucide-react';
import { 
  collection, 
  onSnapshot, 
  doc, 
  deleteDoc, 
  getDocs,
  query 
} from 'firebase/firestore';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInAnonymously, 
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { db, auth } from '../lib/firebase';
import { StoreProduct, storeProducts } from '../lib/storeData';
import { Project, projects as initialProjects } from '../lib/data';
import { 
  addProductToFirestore, 
  updateProductInFirestore, 
  deleteProductFromFirestore, 
  seedInitialProducts 
} from '../lib/productsService';
import { 
  addPortfolioProjectToFirestore, 
  updatePortfolioProjectInFirestore, 
  deletePortfolioProjectFromFirestore, 
  seedInitialPortfolioProjects 
} from '../lib/projectsService';

interface ContactRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'replied' | 'archived';
}

export function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Navigation Tabs: projects | products | messages
  const [activeTab, setActiveTab] = useState<'projects' | 'products' | 'messages'>('projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [productCategoryFilter, setProductCategoryFilter] = useState<'all' | 'ebook' | 'template' | 'ui'>('all');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<'all' | 'new'>('all');

  // Live Firestore State
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [messages, setMessages] = useState<ContactRecord[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(true);

  // Form State for Products
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    title: '',
    category: 'ebook' as 'ebook' | 'template' | 'ui',
    categoryLabel: 'E-Book (PDF)',
    badge: 'Popular',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800&h=800',
    priceLKR: 1500,
    priceUSD: 5,
    originalPriceLKR: 2500,
    shortDescription: '',
    fullDescription: '',
    format: 'PDF Document (E-Book)',
    pages: 120,
    fileSize: '15 MB',
    language: 'English with Sinhala Explanations',
    author: 'Kaveen Sandeepa',
    highlights: 'Complete practical handbook\nCode snippets & cheat sheets\nPrintable reference pages',
    deliveryMethod: 'Instant PDF sent directly to your WhatsApp after payment',
    inStock: true
  });

  // Form State for Projects
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    fullDescription: '',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    url: 'https://kaveensandeepa.lk',
    tech: 'React, Tailwind CSS, TypeScript',
    features: 'High Performance & Speed\nResponsive Mobile-First Architecture\nModern UI Aesthetics'
  });

  const [notification, setNotification] = useState<string | null>(null);
  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Automatic cleanup of test/sample messages, mock templates, and sample orders
  const purgeSampleData = async () => {
    try {
      // 1. Clean sample messages
      const msgSnap = await getDocs(collection(db, 'contact_messages'));
      for (const docSnap of msgSnap.docs) {
        const data = docSnap.data();
        if (
          !data.email ||
          data.email.includes('example.com') ||
          data.name?.includes('Sarah Perera') ||
          data.name?.includes('Kamal Jayawardena') ||
          data.name?.includes('John Doe') ||
          data.message?.toLowerCase().includes('sample') ||
          data.message?.toLowerCase().includes('test message')
        ) {
          await deleteDoc(doc(db, 'contact_messages', docSnap.id));
        }
      }

      // 2. Clean sample/mock products
      const prodSnap = await getDocs(collection(db, 'products'));
      for (const docSnap of prodSnap.docs) {
        const data = docSnap.data();
        if (
          data.category === 'template' ||
          data.category === 'ui' ||
          data.title?.toLowerCase().includes('saas launchpad') ||
          data.title?.toLowerCase().includes('tactile ui') ||
          data.title?.toLowerCase().includes('mock') ||
          data.title?.toLowerCase().includes('sample')
        ) {
          await deleteDoc(doc(db, 'products', docSnap.id));
        }
      }

      // 3. Clean test orders collection
      const orderSnap = await getDocs(collection(db, 'orders'));
      for (const docSnap of orderSnap.docs) {
        await deleteDoc(doc(db, 'orders', docSnap.id));
      }

      showNotice("All sample data successfully cleaned!");
    } catch (err) {
      console.warn("Cleanup sample note:", err);
    }
  };

  useEffect(() => {
    if (!user) return;
    purgeSampleData();
  }, [user]);

  // Listen to Firestore Portfolio Projects
  useEffect(() => {
    if (!user) return;
    try {
      const unsubscribe = onSnapshot(collection(db, 'portfolio_projects'), (snapshot) => {
        if (snapshot.empty) {
          setProjectsList(initialProjects);
        } else {
          const list = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...(docSnap.data() as Omit<Project, 'id'>)
          }));
          setProjectsList(list);
        }
        setProjectsLoading(false);
      }, (err) => {
        console.warn("Portfolio projects listener note:", err);
        setProjectsList(initialProjects);
        setProjectsLoading(false);
      });
      return () => unsubscribe();
    } catch (e) {
      setProjectsList(initialProjects);
      setProjectsLoading(false);
    }
  }, [user]);

  // Listen to Firestore Products
  useEffect(() => {
    if (!user) return;
    try {
      const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
        if (snapshot.empty) {
          setProducts(storeProducts);
        } else {
          const list = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...(docSnap.data() as Omit<StoreProduct, 'id'>)
          }));
          setProducts(list);
        }
        setProductsLoading(false);
      }, (err) => {
        console.warn("Products listener note:", err);
        setProducts(storeProducts);
        setProductsLoading(false);
      });
      return () => unsubscribe();
    } catch (e) {
      setProducts(storeProducts);
      setProductsLoading(false);
    }
  }, [user]);

  // Listen to Firestore Inquiries
  useEffect(() => {
    if (!user) return;
    try {
      const q = query(collection(db, 'contact_messages'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const items: ContactRecord[] = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<ContactRecord, 'id'>)
        }));
        items.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        setMessages(items);
        setMessagesLoading(false);
      }, (err) => {
        console.warn("Messages error:", err);
        setMessagesLoading(false);
      });
      return () => unsubscribe();
    } catch (e) {
      setMessagesLoading(false);
    }
  }, [user]);

  // Handle Login Actions
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          return;
        } catch (signupErr: any) {
          setAuthError(signupErr.message || "Login failed.");
          return;
        }
      }
      setAuthError(err.message || "Login failed.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (e: any) {
      await signInAnonymously(auth);
    }
  };

  const handleDevLogin = async () => {
    try {
      await signInAnonymously(auth);
    } catch (e: any) {
      setAuthError("Dev login failed.");
    }
  };

  // --- PROJECT MANAGEMENT HANDLERS ---
  const handleOpenAddProjectModal = () => {
    setEditingProjectId(null);
    setProjectForm({
      title: '',
      description: '',
      fullDescription: '',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      url: 'https://kaveensandeepa.lk',
      tech: 'React, Tailwind CSS, TypeScript',
      features: 'High Performance & Speed\nResponsive Mobile-First Architecture\nModern UI Aesthetics'
    });
    setIsProjectModalOpen(true);
  };

  const handleOpenEditProjectModal = (proj: Project) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      title: proj.title,
      description: proj.description,
      fullDescription: proj.fullDescription || proj.description,
      image: proj.image,
      url: proj.url,
      tech: proj.tech?.join(', ') || 'React, Tailwind CSS',
      features: proj.features?.join('\n') || ''
    });
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = projectForm.tech
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const featuresArray = projectForm.features
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const payload: Omit<Project, 'id'> = {
      title: projectForm.title,
      description: projectForm.description,
      fullDescription: projectForm.fullDescription || projectForm.description,
      image: projectForm.image,
      url: projectForm.url,
      tech: techArray,
      features: featuresArray
    };

    try {
      if (editingProjectId) {
        await updatePortfolioProjectInFirestore(editingProjectId, payload);
        showNotice("Portfolio project updated!");
      } else {
        await addPortfolioProjectToFirestore(payload);
        showNotice("New project added to portfolio!");
      }
      setIsProjectModalOpen(false);
    } catch (err: any) {
      console.error(err);
      alert("Failed to save project: " + err.message);
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete project "${title}"?`)) {
      try {
        await deletePortfolioProjectFromFirestore(id);
        showNotice("Project deleted.");
      } catch (err: any) {
        alert("Failed to delete project.");
      }
    }
  };

  const handleSeedProjects = async () => {
    try {
      const count = await seedInitialPortfolioProjects();
      showNotice(`${count} Portfolio Projects synced to database!`);
    } catch (err: any) {
      alert("Failed to sync projects: " + err.message);
    }
  };

  // --- PRODUCT MANAGEMENT HANDLERS ---
  const handleOpenAddProductModal = () => {
    setEditingProductId(null);
    setProductForm({
      title: '',
      category: 'ebook',
      categoryLabel: 'E-Book (PDF)',
      badge: 'New',
      coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800&h=800',
      priceLKR: 1500,
      priceUSD: 5,
      originalPriceLKR: 2500,
      shortDescription: '',
      fullDescription: '',
      format: 'PDF Document (E-Book)',
      pages: 100,
      fileSize: '12 MB',
      language: 'English with Sinhala Explanations',
      author: 'Kaveen Sandeepa',
      highlights: 'Complete practical roadmap\nClean code examples\nInstant WhatsApp PDF',
      deliveryMethod: 'Instant PDF sent directly to your WhatsApp after payment',
      inStock: true
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProductModal = (prod: StoreProduct) => {
    setEditingProductId(prod.id);
    setProductForm({
      title: prod.title,
      category: prod.category,
      categoryLabel: prod.categoryLabel,
      badge: prod.badge || '',
      coverImage: prod.coverImage,
      priceLKR: prod.priceLKR,
      priceUSD: prod.priceUSD,
      originalPriceLKR: prod.originalPriceLKR || prod.priceLKR + 1000,
      shortDescription: prod.shortDescription,
      fullDescription: prod.fullDescription,
      format: prod.format,
      pages: prod.pages || 80,
      fileSize: prod.fileSize || '10 MB',
      language: prod.language || 'English',
      author: prod.author || 'Kaveen Sandeepa',
      highlights: prod.highlights?.join('\n') || '',
      deliveryMethod: prod.deliveryMethod,
      inStock: prod.inStock
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const highlightsArray = productForm.highlights
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const dataPayload: Omit<StoreProduct, 'id'> = {
      title: productForm.title,
      category: productForm.category,
      categoryLabel: 
        productForm.category === 'ebook' ? 'E-Book (PDF)' :
        productForm.category === 'template' ? 'Website Template' : 'UI Design Kit',
      badge: productForm.badge || undefined,
      coverImage: productForm.coverImage,
      priceLKR: Number(productForm.priceLKR),
      priceUSD: Number(productForm.priceUSD),
      originalPriceLKR: Number(productForm.originalPriceLKR) || undefined,
      shortDescription: productForm.shortDescription,
      fullDescription: productForm.fullDescription,
      format: productForm.format,
      pages: Number(productForm.pages) || undefined,
      fileSize: productForm.fileSize,
      language: productForm.language,
      author: productForm.author,
      highlights: highlightsArray,
      deliveryMethod: productForm.deliveryMethod,
      inStock: productForm.inStock
    };

    try {
      if (editingProductId) {
        await updateProductInFirestore(editingProductId, dataPayload);
        showNotice("Product updated successfully!");
      } else {
        await addProductToFirestore(dataPayload);
        showNotice("New product added to store!");
      }
      setIsProductModalOpen(false);
    } catch (err: any) {
      console.error(err);
      alert("Failed to save product: " + err.message);
    }
  };

  const handleDeleteProduct = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteProductFromFirestore(id);
        showNotice("Product deleted from store.");
      } catch (err: any) {
        alert("Failed to delete product.");
      }
    }
  };

  const handleSeedProducts = async () => {
    try {
      const count = await seedInitialProducts();
      showNotice(`${count} Products synchronized to Firestore!`);
    } catch (err: any) {
      alert("Seed failed: " + err.message);
    }
  };

  const newMessagesCount = messages.filter((m) => m.status === 'new').length;

  const filteredProjects = useMemo(() => {
    return projectsList.filter((p) =>
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [projectsList, searchQuery]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = !searchQuery || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = productCategoryFilter === 'all' || p.category === productCategoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, productCategoryFilter]);

  const filteredMessages = useMemo(() => {
    return messages.filter((m) => {
      const matchesSearch = !searchQuery ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.message.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = inquiryStatusFilter === 'all' || (inquiryStatusFilter === 'new' && m.status === 'new');
      return matchesSearch && matchesStatus;
    });
  }, [messages, searchQuery, inquiryStatusFilter]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#080b12] text-white flex items-center justify-center p-6">
        <div className="saas-card p-8 rounded-3xl flex items-center gap-3 font-semibold text-slate-200">
          <RefreshCw className="w-5 h-5 animate-spin text-indigo-400" />
          <span>Loading SaaS Admin Studio...</span>
        </div>
      </div>
    );
  }

  // Not Signed In -> Glassmorphic Modern Premium SaaS Login Screen
  if (!user) {
    return (
      <div className="min-h-screen bg-[#080b12] text-slate-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden selection:bg-indigo-500/30">
        <Helmet>
          <title>SaaS Studio Admin Portal | Kaveen Sandeepa</title>
        </Helmet>

        {/* Subtle Ambient Background Mesh Lights */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-600/20 rounded-full blur-[128px] pointer-events-none" />

        <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl saas-card relative z-10 border border-white/10 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-indigo-500/25">
            <ShieldCheck className="w-7 h-7" />
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-bold tracking-widest uppercase mb-3">
              <Sparkles className="w-3 h-3" />
              <span>Studio Console v2.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
              Kaveen Studio Admin
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-light">
              Secure dashboard to manage portfolio showcases, digital store assets, and live client leads.
            </p>
          </div>

          {authError && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mail.kaveensandeepa@gmail.com"
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-900/80 border border-white/10 outline-none text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-900/80 border border-white/10 outline-none text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm cursor-pointer shadow-lg shadow-indigo-600/30 transition-all mt-2"
            >
              Sign In to Studio Portal
            </button>
          </form>

          <div className="my-6 text-center border-t border-white/10 relative">
            <span className="relative -top-2.5 px-3 bg-[#0d121f] text-slate-500 text-[10px] font-bold uppercase tracking-wider">
              Quick Authorization
            </span>
          </div>

          <div className="space-y-2.5">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 font-semibold text-xs flex items-center justify-center gap-2 text-slate-200 cursor-pointer transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Sign In with Google</span>
            </button>

            <button
              type="button"
              onClick={handleDevLogin}
              className="w-full py-3 rounded-2xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 font-bold text-xs text-indigo-400 cursor-pointer transition-all"
            >
              Instant Dev Access (Owner Verification)
            </button>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Glassmorphic Modern Premium SaaS Studio Dashboard
  return (
    <div className="min-h-screen bg-[#080b12] text-slate-100 flex flex-col md:flex-row relative overflow-x-hidden selection:bg-indigo-500/30">
      <Helmet>
        <title>SaaS Studio Admin | Kaveen Sandeepa</title>
      </Helmet>

      {/* Floating Success Notice */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-[200] px-5 py-3 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* MOBILE HEADER BAR */}
      <div className="md:hidden sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-xs">
            KS
          </div>
          <span className="font-extrabold text-sm tracking-tight text-white">
            Kaveen Studio Admin
          </span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-xl bg-slate-800 border border-white/10 text-slate-300"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* SIDEBAR NAVIGATION (Desktop 260px Fixed + Mobile Drawer) */}
      <aside className={`
        fixed md:sticky top-0 left-0 bottom-0 z-40 w-64 bg-slate-950/90 backdrop-blur-xl border-r border-white/10 p-5 flex flex-col justify-between transition-transform duration-300
        ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="space-y-6">
          {/* Brand Wordmark */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-black text-sm tracking-tight text-white block">
                  KAVEEN STUDIO
                </span>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  SaaS Console v2.4
                </span>
              </div>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 font-extrabold flex items-center justify-center text-xs shrink-0">
              KS
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">Kaveen Sandeepa</div>
              <div className="text-[10px] text-slate-400 truncate">mail.kaveensandeepa@gmail.com</div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-2">
              Studio Management
            </div>

            {/* Projects Tab Link */}
            <button
              onClick={() => {
                setActiveTab('projects');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-xs transition-all cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <FolderGit2 className="w-4 h-4 shrink-0" />
                <span>Portfolio Projects</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                activeTab === 'projects' ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
              }`}>
                {projectsList.length}
              </span>
            </button>

            {/* Store Products Tab Link */}
            <button
              onClick={() => {
                setActiveTab('products');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-xs transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 shrink-0" />
                <span>Digital Store Assets</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                activeTab === 'products' ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
              }`}>
                {products.length}
              </span>
            </button>

            {/* Inquiries Tab Link */}
            <button
              onClick={() => {
                setActiveTab('messages');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-xs transition-all cursor-pointer ${
                activeTab === 'messages'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0" />
                <span>Client Inquiries</span>
              </div>
              {newMessagesCount > 0 ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 animate-pulse">
                  {newMessagesCount} NEW
                </span>
              ) : (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  activeTab === 'messages' ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
                }`}>
                  {messages.length}
                </span>
              )}
            </button>
          </div>

          {/* Quick Maintenance Actions */}
          <div className="pt-2 space-y-2 border-t border-white/10">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-1">
              Maintenance & Links
            </div>

            <button
              onClick={() => {
                if (confirm("Purge all test/sample inquiries, mock templates, and sample orders?")) {
                  purgeSampleData();
                }
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4 shrink-0" />
              <span>Purge Sample Data</span>
            </button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900/60 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 shrink-0 text-indigo-400" />
                <span>View Live Site</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>

        {/* Sidebar Footer Sign Out */}
        <div className="pt-4 border-t border-white/10">
          <button
            onClick={() => signOut(auth)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold border border-rose-500/20 cursor-pointer transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>

      {/* MAIN VIEWPORT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP WORKSPACE HEADER BAR */}
        <header className="sticky top-0 z-30 bg-[#080b12]/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Breadcrumb Title */}
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1">
              <span>Studio Console</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-white font-bold capitalize">{activeTab} Management</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white capitalize flex items-center gap-2">
              {activeTab === 'projects' && 'Portfolio Projects Showcase'}
              {activeTab === 'products' && 'Digital Store Assets & E-Books'}
              {activeTab === 'messages' && 'Client Inquiries & Consultation Leads'}
            </h1>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter or search..."
                className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-900/80 border border-white/10 outline-none text-xs text-white placeholder:text-slate-500 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Dynamic Primary Modal Action Button */}
            {activeTab === 'projects' && (
              <button
                onClick={handleOpenAddProjectModal}
                className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/25 cursor-pointer whitespace-nowrap shrink-0 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            )}

            {activeTab === 'products' && (
              <button
                onClick={handleOpenAddProductModal}
                className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/25 cursor-pointer whitespace-nowrap shrink-0 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            )}
          </div>
        </header>

        {/* MAIN DASHBOARD CONTENT CONTAINER */}
        <main className="flex-1 p-4 sm:p-8 space-y-8 max-w-7xl w-full mx-auto">
          
          {/* KPI METRIC CARDS (Modern Glassmorphic Metric Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Metric 1: Projects */}
            <div 
              onClick={() => setActiveTab('projects')}
              className={`p-5 rounded-3xl saas-card saas-card-hover cursor-pointer ${
                activeTab === 'projects' ? 'border-indigo-500/50 bg-indigo-950/20' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  Portfolio Projects
                </span>
                <div className="w-9 h-9 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <FolderGit2 className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-white tabular-nums">{projectsList.length}</span>
                <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                  Showcase Active
                </span>
              </div>
            </div>

            {/* Metric 2: Digital Products */}
            <div 
              onClick={() => setActiveTab('products')}
              className={`p-5 rounded-3xl saas-card saas-card-hover cursor-pointer ${
                activeTab === 'products' ? 'border-emerald-500/50 bg-emerald-950/20' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  Digital Store
                </span>
                <div className="w-9 h-9 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ShoppingBag className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-white tabular-nums">{products.length}</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  PDF & Templates
                </span>
              </div>
            </div>

            {/* Metric 3: Client Leads */}
            <div 
              onClick={() => setActiveTab('messages')}
              className={`p-5 rounded-3xl saas-card saas-card-hover cursor-pointer ${
                activeTab === 'messages' ? 'border-amber-500/50 bg-amber-950/20' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  Client Inquiries
                </span>
                <div className="w-9 h-9 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Mail className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-white tabular-nums">{messages.length}</span>
                {newMessagesCount > 0 ? (
                  <span className="text-[10px] font-black text-slate-950 bg-amber-400 px-2.5 py-0.5 rounded-full animate-pulse">
                    {newMessagesCount} New Leads
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                    Up to Date
                  </span>
                )}
              </div>
            </div>

            {/* Metric 4: System Operational Health */}
            <div className="p-5 rounded-3xl saas-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  Cloud Security
                </span>
                <div className="w-9 h-9 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                  <Activity className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-bold text-white flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  100%
                </span>
                <span className="text-[10px] font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full border border-violet-500/20">
                  Firestore Guarded
                </span>
              </div>
            </div>

          </div>

          {/* TAB CONTENT 1: PORTFOLIO PROJECTS SHOWCASE */}
          {activeTab === 'projects' && (
            <div className="saas-card rounded-3xl p-6 sm:p-8 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-lg font-extrabold text-white">Portfolio Showcase Projects</h2>
                  <p className="text-xs text-slate-400 font-light mt-0.5">
                    Projects displayed under Selected Works on the homepage. Updated in real time.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSeedProjects}
                    className="px-3.5 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-bold text-indigo-400 flex items-center gap-2 cursor-pointer transition-colors"
                    title="Re-sync initial default showcase projects to Firestore"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Sync Showcase Defaults</span>
                  </button>

                  <button
                    onClick={handleOpenAddProjectModal}
                    className="px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Project</span>
                  </button>
                </div>
              </div>

              {projectsLoading ? (
                <div className="py-16 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
                  <span>Loading projects from Firestore...</span>
                </div>
              ) : filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((proj) => (
                    <div key={proj.id} className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col justify-between space-y-4 hover:border-indigo-500/30 transition-all group">
                      
                      <div className="space-y-3">
                        {/* Image Preview */}
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-white/10">
                          <img
                            src={proj.image}
                            alt={proj.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2 right-2">
                            <a
                              href={proj.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-xl bg-slate-950/80 backdrop-blur-md text-white hover:text-indigo-400 transition-colors inline-block"
                              title="Open Live Preview"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-base font-extrabold text-white group-hover:text-indigo-400 transition-colors">
                            {proj.title}
                          </h3>
                          <p className="text-xs text-slate-400 font-light line-clamp-2 mt-1">
                            {proj.description}
                          </p>
                        </div>

                        {/* Tech Stack Pills */}
                        {proj.tech && proj.tech.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {proj.tech.map((t, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-400 text-[10px] font-semibold border border-indigo-500/20">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Card Actions */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <span className="text-[11px] text-slate-500 font-mono truncate max-w-[150px]">
                          {proj.url.replace(/^https?:\/\//, '')}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenEditProjectModal(proj)}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title="Edit Project"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeleteProject(proj.id, proj.title)}
                            className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer border border-rose-500/20"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-slate-500 text-xs">
                  No projects found. Click "Add New Project" to create one.
                </div>
              )}

            </div>
          )}

          {/* TAB CONTENT 2: DIGITAL STORE ASSETS & E-BOOKS */}
          {activeTab === 'products' && (
            <div className="saas-card rounded-3xl p-6 sm:p-8 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-lg font-extrabold text-white">Digital Store Products & Handbooks</h2>
                  <p className="text-xs text-slate-400 font-light mt-0.5">
                    Manage developer PDF e-books and templates available on the Store page (/store).
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSeedProducts}
                    className="px-3.5 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-bold text-emerald-400 flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Sync Store Defaults</span>
                  </button>

                  <button
                    onClick={handleOpenAddProductModal}
                    className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Product</span>
                  </button>
                </div>
              </div>

              {/* Category Segmented Filter */}
              <div className="flex items-center gap-2 p-1 bg-slate-900/80 rounded-2xl border border-white/10 w-fit text-xs font-bold">
                <button
                  onClick={() => setProductCategoryFilter('all')}
                  className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                    productCategoryFilter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All Items ({products.length})
                </button>
                <button
                  onClick={() => setProductCategoryFilter('ebook')}
                  className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                    productCategoryFilter === 'ebook' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  E-Books (PDF)
                </button>
                <button
                  onClick={() => setProductCategoryFilter('template')}
                  className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                    productCategoryFilter === 'template' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Templates
                </button>
              </div>

              {productsLoading ? (
                <div className="py-16 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                  <span>Loading store products...</span>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((prod) => (
                    <div key={prod.id} className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col justify-between space-y-4 hover:border-emerald-500/30 transition-all group">
                      
                      <div className="space-y-3">
                        <div className="flex gap-4">
                          <img
                            src={prod.coverImage}
                            alt={prod.title}
                            className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10 bg-slate-950"
                            referrerPolicy="no-referrer"
                          />
                          <div className="overflow-hidden">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-extrabold border border-emerald-500/20">
                                {prod.categoryLabel}
                              </span>
                              {prod.badge && (
                                <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 text-[10px] font-extrabold border border-amber-500/20">
                                  {prod.badge}
                                </span>
                              )}
                            </div>
                            <h3 className="text-sm font-extrabold text-white group-hover:text-emerald-400 transition-colors truncate">
                              {prod.title}
                            </h3>
                            <div className="text-xs font-black text-emerald-400 mt-1 tabular-nums">
                              රු. {prod.priceLKR.toLocaleString()} <span className="text-[11px] font-normal text-slate-400">($ {prod.priceUSD})</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-slate-400 font-light line-clamp-2">
                          {prod.shortDescription}
                        </p>

                        <div className="text-[11px] text-slate-500 font-medium flex items-center gap-3">
                          <span>{prod.format}</span>
                          <span>•</span>
                          <span>{prod.fileSize}</span>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400 font-semibold">
                          {prod.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenEditProductModal(prod)}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeleteProduct(prod.id, prod.title)}
                            className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer border border-rose-500/20"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-slate-500 text-xs">
                  No products found. Click "Add New Product" to create one.
                </div>
              )}

            </div>
          )}

          {/* TAB CONTENT 3: CLIENT INQUIRIES & LEADS */}
          {activeTab === 'messages' && (
            <div className="saas-card rounded-3xl p-6 sm:p-8 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-lg font-extrabold text-white">Client Inquiries & Consultation Requests</h2>
                  <p className="text-xs text-slate-400 font-light mt-0.5">
                    Direct client leads submitted through the website inquiry form and WhatsApp requests.
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-2 p-1 bg-slate-900/80 rounded-2xl border border-white/10 text-xs font-bold">
                  <button
                    onClick={() => setInquiryStatusFilter('all')}
                    className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                      inquiryStatusFilter === 'all' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All Leads ({messages.length})
                  </button>
                  <button
                    onClick={() => setInquiryStatusFilter('new')}
                    className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                      inquiryStatusFilter === 'new' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    New Unread ({newMessagesCount})
                  </button>
                </div>
              </div>

              {messagesLoading ? (
                <div className="py-16 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Loading inquiries...</span>
                </div>
              ) : filteredMessages.length > 0 ? (
                <div className="space-y-4">
                  {filteredMessages.map((msg) => (
                    <div key={msg.id} className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 space-y-4 hover:border-amber-500/30 transition-all">
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <span className="font-extrabold text-white text-base">
                            {msg.name}
                          </span>
                          {msg.service && (
                            <span className="px-2.5 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20">
                              {msg.service}
                            </span>
                          )}
                          {msg.budget && (
                            <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                              {msg.budget}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400 font-mono">
                          {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : 'Recent'}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed bg-slate-950/80 p-4 rounded-xl border border-white/5 whitespace-pre-wrap">
                        {msg.message}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium">
                          <span>
                            Email: <strong className="text-white">{msg.email}</strong>
                          </span>
                          {msg.phone && msg.phone !== 'Not provided' && (
                            <span>
                              Phone: <strong className="text-white">{msg.phone}</strong>
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {msg.phone && msg.phone !== 'Not provided' && (
                            <a
                              href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${msg.name}! Thank you for your inquiry on my portfolio regarding ${msg.service || 'your project'}.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                            >
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                              </svg>
                              <span>WhatsApp</span>
                            </a>
                          )}

                          <a
                            href={`mailto:${msg.email}?subject=Regarding your inquiry on Kaveen Sandeepa Portfolio`}
                            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Reply Email</span>
                          </a>

                          <button
                            onClick={() => {
                              if (confirm("Delete this inquiry?")) {
                                deleteDoc(doc(db, 'contact_messages', msg.id));
                                showNotice("Inquiry deleted");
                              }
                            }}
                            className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-slate-500 text-xs">
                  No inquiries matching the selected filter.
                </div>
              )}

            </div>
          )}

        </main>
      </div>

      {/* MODAL: ADD / EDIT PORTFOLIO PROJECT */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl saas-card my-auto border border-white/10">
            <button
              onClick={() => setIsProjectModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-white mb-1">
              {editingProjectId ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
            </h3>
            <p className="text-xs text-slate-400 font-light mb-6">
              Details will be saved to Firestore and instantly reflected under Selected Projects.
            </p>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="e.g. MyFeed.lk Tech & Digital Platform"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 outline-none text-xs text-white placeholder:text-slate-500 focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Short Summary
                </label>
                <input
                  type="text"
                  required
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="e.g. An AI-powered tech news and digital education platform"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 outline-none text-xs text-white placeholder:text-slate-500 focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Full Project Details (shown in popup modal)
                </label>
                <textarea
                  rows={3}
                  required
                  value={projectForm.fullDescription}
                  onChange={(e) => setProjectForm({ ...projectForm, fullDescription: e.target.value })}
                  placeholder="Comprehensive description of architecture, features, and business impact..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 outline-none text-xs text-white placeholder:text-slate-500 focus:border-indigo-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Preview Image URL
                  </label>
                  <input
                    type="url"
                    required
                    value={projectForm.image}
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 outline-none text-xs text-white placeholder:text-slate-500 focus:border-indigo-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    required
                    value={projectForm.url}
                    onChange={(e) => setProjectForm({ ...projectForm, url: e.target.value })}
                    placeholder="https://myfeedlk.com"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 outline-none text-xs text-white placeholder:text-slate-500 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Technologies Used (comma separated)
                </label>
                <input
                  type="text"
                  required
                  value={projectForm.tech}
                  onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value })}
                  placeholder="React, Tailwind CSS, TypeScript, Firebase, Node.js"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 outline-none text-xs text-white placeholder:text-slate-500 focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Key Features (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={projectForm.features}
                  onChange={(e) => setProjectForm({ ...projectForm, features: e.target.value })}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 outline-none text-xs text-white placeholder:text-slate-500 focus:border-indigo-500 transition-all"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-5 py-3 rounded-2xl bg-slate-800 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 cursor-pointer"
                >
                  Save Portfolio Project
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT DIGITAL PRODUCT */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl saas-card my-auto border border-white/10">
            <button
              onClick={() => setIsProductModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-white mb-1">
              {editingProductId ? 'Edit Store Asset' : 'Add New Digital Asset'}
            </h3>
            <p className="text-xs text-slate-400 font-light mb-6">
              Configure product details available on the Digital Store page (/store).
            </p>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Product Title
                </label>
                <input
                  type="text"
                  required
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  placeholder="e.g. Modern Web Development Handbook"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 outline-none text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Category
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 outline-none text-xs text-white cursor-pointer"
                  >
                    <option value="ebook">E-Book (PDF)</option>
                    <option value="template">Website Template</option>
                    <option value="ui">UI Design Kit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Badge Tag (Optional)
                  </label>
                  <input
                    type="text"
                    value={productForm.badge}
                    onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                    placeholder="e.g. Popular, Bestseller, New"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 outline-none text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Price in LKR (රු.)
                  </label>
                  <input
                    type="number"
                    required
                    value={productForm.priceLKR}
                    onChange={(e) => setProductForm({ ...productForm, priceLKR: Number(e.target.value) })}
                    placeholder="1500"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 outline-none text-xs font-bold text-emerald-400 focus:border-emerald-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Price in USD ($)
                  </label>
                  <input
                    type="number"
                    required
                    value={productForm.priceUSD}
                    onChange={(e) => setProductForm({ ...productForm, priceUSD: Number(e.target.value) })}
                    placeholder="5"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 outline-none text-xs font-bold text-emerald-400 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Square Cover Image URL
                </label>
                <input
                  type="url"
                  required
                  value={productForm.coverImage}
                  onChange={(e) => setProductForm({ ...productForm, coverImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 outline-none text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Short Summary
                </label>
                <input
                  type="text"
                  required
                  value={productForm.shortDescription}
                  onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                  placeholder="Quick 1-sentence summary on product card"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 outline-none text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Full Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={productForm.fullDescription}
                  onChange={(e) => setProductForm({ ...productForm, fullDescription: e.target.value })}
                  placeholder="Detailed product overview shown in modal..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 outline-none text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Page Count / Specs
                  </label>
                  <input
                    type="number"
                    value={productForm.pages}
                    onChange={(e) => setProductForm({ ...productForm, pages: Number(e.target.value) })}
                    placeholder="120"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 outline-none text-xs text-white focus:border-emerald-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    File Size
                  </label>
                  <input
                    type="text"
                    value={productForm.fileSize}
                    onChange={(e) => setProductForm({ ...productForm, fileSize: e.target.value })}
                    placeholder="15 MB"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 outline-none text-xs text-white focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Key Highlights (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={productForm.highlights}
                  onChange={(e) => setProductForm({ ...productForm, highlights: e.target.value })}
                  placeholder="Highlight 1&#10;Highlight 2&#10;Highlight 3"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 outline-none text-xs text-white focus:border-emerald-500 transition-all"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-3 rounded-2xl bg-slate-800 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 cursor-pointer"
                >
                  Save Digital Product
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
