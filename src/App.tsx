import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Newspaper,
  Calendar,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  LogIn,
  Plus,
  Edit2,
  Trash2,
  Database,
  FileText,
  Image,
  Save,
  RefreshCw,
  AlertTriangle,
  X,
  TrendingUp
} from 'lucide-react';
import { getSupabaseClient, getCredentials, saveCredentials, testConnection, clearCredentials } from './lib/supabase';
import { dataService, getConnectionMode, type ConnectionMode } from './lib/dataService';
import {
  type DbNews,
  type DbEvent,
  type DbTestimonial,
  type DbPartner,
  type DbSiteContent,
  type DbLandingStat,
  type DbLandingPartner,
  type DbLandingPortfolioItem
} from './lib/mockData';

// Types for Toast notifications
interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning';
}

type TabType = 'dashboard' | 'news' | 'events' | 'testimonials' | 'partners' | 'site_content' | 'landing_stats' | 'landing_portfolio' | 'settings';

export default function App() {
  // --- Auth State ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authEmail, setAuthEmail] = useState<string>('');
  const [authPassword, setAuthPassword] = useState<string>('');
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  // --- App Global State ---
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [connectionMode, setConnectionMode] = useState<ConnectionMode>('mock');
  const [dbStatusMessage, setDbStatusMessage] = useState<string>('Checking database...');
  const [isStatusChecking, setIsStatusChecking] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // --- Database Collections ---
  const [news, setNews] = useState<DbNews[]>([]);
  const [events, setEvents] = useState<DbEvent[]>([]);
  const [testimonials, setTestimonials] = useState<DbTestimonial[]>([]);
  const [partners, setPartners] = useState<DbPartner[]>([]);
  const [siteContents, setSiteContents] = useState<DbSiteContent[]>([]);
  const [landingStats, setLandingStats] = useState<DbLandingStat[]>([]);
  const [landingPartners, setLandingPartners] = useState<DbLandingPartner[]>([]);
  const [landingPortfolioItems, setLandingPortfolioItems] = useState<DbLandingPortfolioItem[]>([]);
  
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

  // --- CRUD Modals & Form State ---
  const [activeModal, setActiveModal] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Form Fields State
  const [newsForm, setNewsForm] = useState<Omit<DbNews, 'id' | 'created_at'>>({
    title: '', title_en: '', category: '', category_en: '', snippet: '', snippet_en: '', date: '', img_src: ''
  });
  
  const [eventForm, setEventForm] = useState<Omit<DbEvent, 'id' | 'created_at'>>({
    date_day: '', date_month: '', title: '', title_en: '', location: '', location_en: ''
  });

  const [testimonialForm, setTestimonialForm] = useState<Omit<DbTestimonial, 'id' | 'created_at'>>({
    testimonial: '', testimonial_en: '', by: '', by_en: '', img_src: ''
  });

  const [partnerForm, setPartnerForm] = useState<Omit<DbPartner, 'id' | 'created_at'>>({
    name: ''
  });

  const [statForm, setStatForm] = useState<Omit<DbLandingStat, 'id'>>({
    number: '', label: '', sort_order: 0
  });

  const [portfolioForm, setPortfolioForm] = useState<Omit<DbLandingPortfolioItem, 'id'>>({
    image: '', title: '', medium: '', technique: '', year: '', gridClass: 'col-span-1 row-span-1', sort_order: 0
  });

  // Settings Credentials state
  const [settingsUrl, setSettingsUrl] = useState<string>('');
  const [settingsKey, setSettingsKey] = useState<string>('');

  // --- Toast Trigger Helper ---
  const triggerToast = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    const newToast = { id: Math.random().toString(), message, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  // --- Check Database Status on Load ---
  const checkDatabaseConnection = async () => {
    setIsStatusChecking(true);
    const mode = getConnectionMode();
    setConnectionMode(mode);

    if (mode === 'supabase') {
      const res = await testConnection();
      if (res.success) {
        setDbStatusMessage('Connected to Supabase');
        triggerToast('Connected to Supabase instance!', 'success');
      } else {
        setDbStatusMessage(`Supabase error: ${res.message}`);
        triggerToast('Supabase configured but offline/invalid credentials. Fell back to Local Storage.', 'warning');
      }
    } else {
      setDbStatusMessage('Running in Local Mock Mode (Supabase not configured)');
    }
    setIsStatusChecking(false);
  };

  // --- Session & Credential Loading ---
  useEffect(() => {
    // Check local storage mock session
    const mockSession = localStorage.getItem('cms_mock_session');
    const creds = getCredentials();
    setSettingsUrl(creds.url);
    setSettingsKey(creds.anonKey);

    if (mockSession) {
      setIsAuthenticated(true);
      setCurrentUserEmail(JSON.parse(mockSession).email);
      checkDatabaseConnection();
    } else {
      // If supabase is configured, check active Supabase Auth session
      const supabase = getSupabaseClient();
      if (supabase) {
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session) {
            setIsAuthenticated(true);
            setCurrentUserEmail(session.user.email || 'Admin');
            checkDatabaseConnection();
          }
        });
      }
    }
  }, []);

  // --- Fetch Data on Auth and Tab Changes ---
  useEffect(() => {
    if (isAuthenticated) {
      fetchCollectionData();
    }
  }, [isAuthenticated, activeTab]);

  const fetchCollectionData = async () => {
    setIsLoadingData(true);
    try {
      if (activeTab === 'dashboard') {
        const [newsList, eventsList, testList, partList, portList] = await Promise.all([
          dataService.getNews(),
          dataService.getEvents(),
          dataService.getTestimonials(),
          dataService.getPartners(),
          dataService.getLandingPortfolioItems()
        ]);
        setNews(newsList);
        setEvents(eventsList);
        setTestimonials(testList);
        setPartners(partList);
        setLandingPortfolioItems(portList);
      } else if (activeTab === 'news') {
        setNews(await dataService.getNews());
      } else if (activeTab === 'events') {
        setEvents(await dataService.getEvents());
      } else if (activeTab === 'testimonials') {
        setTestimonials(await dataService.getTestimonials());
      } else if (activeTab === 'partners') {
        const [p, lp] = await Promise.all([
          dataService.getPartners(),
          dataService.getLandingPartners()
        ]);
        setPartners(p);
        setLandingPartners(lp);
      } else if (activeTab === 'site_content') {
        setSiteContents(await dataService.getSiteContent());
      } else if (activeTab === 'landing_stats') {
        setLandingStats(await dataService.getLandingStats());
      } else if (activeTab === 'landing_portfolio') {
        setLandingPortfolioItems(await dataService.getLandingPortfolioItems());
      }
    } catch (err: any) {
      console.error(err);
      triggerToast(`Failed to load data: ${err.message || err}`, 'error');
    } finally {
      setIsLoadingData(false);
    }
  };

  // --- Sign In Logic ---
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      triggerToast('Email and password are required.', 'error');
      return;
    }

    setIsAuthLoading(true);
    const mode = getConnectionMode();

    if (mode === 'supabase') {
      const supabase = getSupabaseClient()!;
      const { data, error } = await supabase.auth.signInWithPassword({
        email: authEmail,
        password: authPassword
      });

      if (error) {
        // Fallback option in case credentials fail but they want to enter mock mode
        triggerToast(`Supabase Auth failed: ${error.message}. Try checking credentials or use mock login.`, 'error');
        setIsAuthLoading(false);
        return;
      }

      if (data.user) {
        setIsAuthenticated(true);
        setCurrentUserEmail(data.user.email || 'Admin User');
        triggerToast(`Welcome back, ${data.user.email}!`, 'success');
        checkDatabaseConnection();
      }
    } else {
      // Local Mock Auth (accept admin credentials)
      if (authEmail.includes('@') && authPassword.length >= 4) {
        const sessionData = { email: authEmail, role: 'admin', time: new Date() };
        localStorage.setItem('cms_mock_session', JSON.stringify(sessionData));
        setIsAuthenticated(true);
        setCurrentUserEmail(authEmail);
        triggerToast('Logged in successfully (Mock Mode)!', 'success');
        checkDatabaseConnection();
      } else {
        triggerToast('Invalid mock credentials. (Use any email & password >= 4 chars)', 'error');
      }
    }
    setIsAuthLoading(false);
  };

  // --- Sign Out Logic ---
  const handleSignOut = async () => {
    const mode = getConnectionMode();
    if (mode === 'supabase') {
      const supabase = getSupabaseClient();
      if (supabase) await supabase.auth.signOut();
    }
    localStorage.removeItem('cms_mock_session');
    setIsAuthenticated(false);
    setCurrentUserEmail(null);
    triggerToast('Logged out successfully.', 'success');
  };

  // --- Settings Saving ---
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      saveCredentials(settingsUrl, settingsKey);
      triggerToast('Settings updated. Re-evaluating connection...', 'success');
      checkDatabaseConnection();
    } catch (err: any) {
      triggerToast(`Failed to update settings: ${err.message}`, 'error');
    }
  };

  const handleClearSettings = () => {
    clearCredentials();
    setSettingsUrl('');
    setSettingsKey('');
    triggerToast('Settings cleared. Switched to Local Mock mode.', 'warning');
    checkDatabaseConnection();
  };

  // --- Reset/Populate Mock Data ---
  const handleResetMockData = () => {
    localStorage.removeItem('mock_news');
    localStorage.removeItem('mock_events');
    localStorage.removeItem('mock_testimonials');
    localStorage.removeItem('mock_partners');
    localStorage.removeItem('mock_landing_stats');
    localStorage.removeItem('mock_landing_partners');
    localStorage.removeItem('mock_landing_portfolio_items');
    localStorage.removeItem('mock_site_content');
    triggerToast('Mock database reset to defaults!', 'success');
    fetchCollectionData();
  };

  // --- CRUD Submission Handlers ---
  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (activeTab === 'news') {
        if (activeModal === 'create') {
          await dataService.createNews(newsForm);
          triggerToast('News article created successfully!');
        } else if (activeModal === 'edit' && editingId) {
          await dataService.updateNews(editingId, newsForm);
          triggerToast('News article updated successfully!');
        }
      } else if (activeTab === 'events') {
        if (activeModal === 'create') {
          await dataService.createEvent(eventForm);
          triggerToast('Event added successfully!');
        } else if (activeModal === 'edit' && editingId) {
          await dataService.updateEvent(editingId, eventForm);
          triggerToast('Event updated successfully!');
        }
      } else if (activeTab === 'testimonials') {
        if (activeModal === 'create') {
          await dataService.createTestimonial(testimonialForm);
          triggerToast('Testimonial added successfully!');
        } else if (activeModal === 'edit' && editingId) {
          await dataService.updateTestimonial(editingId, testimonialForm);
          triggerToast('Testimonial updated successfully!');
        }
      } else if (activeTab === 'partners') {
        if (activeModal === 'create') {
          await dataService.createPartner(partnerForm);
          triggerToast('Partner added successfully!');
        } else if (activeModal === 'edit' && editingId) {
          await dataService.updatePartner(editingId, partnerForm);
          triggerToast('Partner updated successfully!');
        }
      } else if (activeTab === 'landing_stats') {
        if (activeModal === 'create') {
          await dataService.createLandingStat(statForm);
          triggerToast('Landing Stat added successfully!');
        } else if (activeModal === 'edit' && editingId) {
          await dataService.updateLandingStat(editingId, statForm);
          triggerToast('Landing Stat updated successfully!');
        }
      } else if (activeTab === 'landing_portfolio') {
        if (activeModal === 'create') {
          await dataService.createLandingPortfolioItem(portfolioForm);
          triggerToast('Portfolio item added successfully!');
        } else if (activeModal === 'edit' && editingId) {
          await dataService.updateLandingPortfolioItem(editingId, portfolioForm);
          triggerToast('Portfolio item updated successfully!');
        }
      }

      setActiveModal(null);
      setEditingId(null);
      fetchCollectionData();
    } catch (err: any) {
      triggerToast(`Operation failed: ${err.message || err}`, 'error');
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      if (activeTab === 'news') {
        await dataService.deleteNews(deletingId);
      } else if (activeTab === 'events') {
        await dataService.deleteEvent(deletingId);
      } else if (activeTab === 'testimonials') {
        await dataService.deleteTestimonial(deletingId);
      } else if (activeTab === 'partners') {
        await dataService.deletePartner(deletingId);
      } else if (activeTab === 'landing_stats') {
        await dataService.deleteLandingStat(deletingId);
      } else if (activeTab === 'landing_portfolio') {
        await dataService.deleteLandingPortfolioItem(deletingId);
      }

      triggerToast('Item deleted successfully!', 'success');
      setActiveModal(null);
      setDeletingId(null);
      fetchCollectionData();
    } catch (err: any) {
      triggerToast(`Deletion failed: ${err.message || err}`, 'error');
    }
  };

  // --- Site Content update single key ---
  const handleUpdateSiteContent = async (key: string, value: string, valueEn: string | null) => {
    try {
      await dataService.updateSiteContent(key, value, valueEn);
      triggerToast(`Updated key "${key}" successfully!`);
      fetchCollectionData();
    } catch (err: any) {
      triggerToast(`Update failed: ${err.message}`, 'error');
    }
  };

  // --- Prep Modals Form Filling ---
  const openCreateModal = () => {
    setEditingId(null);
    setNewsForm({ title: '', title_en: '', category: '', category_en: '', snippet: '', snippet_en: '', date: '', img_src: '' });
    setEventForm({ date_day: '', date_month: '', title: '', title_en: '', location: '', location_en: '' });
    setTestimonialForm({ testimonial: '', testimonial_en: '', by: '', by_en: '', img_src: '' });
    setPartnerForm({ name: '' });
    setStatForm({ number: '', label: '', sort_order: landingStats.length + 1 });
    setPortfolioForm({ image: '', title: '', medium: '', technique: '', year: '', gridClass: 'col-span-1 row-span-1', sort_order: landingPortfolioItems.length + 1 });
    setActiveModal('create');
  };

  const openEditModal = (item: any) => {
    setEditingId(item.id);
    if (activeTab === 'news') {
      setNewsForm({
        title: item.title,
        title_en: item.title_en || '',
        category: item.category,
        category_en: item.category_en || '',
        snippet: item.snippet,
        snippet_en: item.snippet_en || '',
        date: item.date,
        img_src: item.img_src
      });
    } else if (activeTab === 'events') {
      setEventForm({
        date_day: item.date_day,
        date_month: item.date_month,
        title: item.title,
        title_en: item.title_en || '',
        location: item.location,
        location_en: item.location_en || ''
      });
    } else if (activeTab === 'testimonials') {
      setTestimonialForm({
        testimonial: item.testimonial,
        testimonial_en: item.testimonial_en || '',
        by: item.by,
        by_en: item.by_en || '',
        img_src: item.img_src
      });
    } else if (activeTab === 'partners') {
      setPartnerForm({
        name: item.name
      });
    } else if (activeTab === 'landing_stats') {
      setStatForm({
        number: item.number,
        label: item.label,
        sort_order: item.sort_order
      });
    } else if (activeTab === 'landing_portfolio') {
      setPortfolioForm({
        image: item.image,
        title: item.title,
        medium: item.medium,
        technique: item.technique,
        year: item.year,
        gridClass: item.gridClass,
        sort_order: item.sort_order
      });
    }
    setActiveModal('edit');
  };

  const openDeleteModal = (id: string) => {
    setDeletingId(id);
    setActiveModal('delete');
  };

  // Filter lists based on search query
  const getFilteredList = <T extends any>(list: T[], keys: (keyof T)[]): T[] => {
    if (!searchQuery) return list;
    const query = searchQuery.toLowerCase();
    return list.filter((item) =>
      keys.some((key) => {
        const val = item[key];
        return val && String(val).toLowerCase().includes(query);
      })
    );
  };

  // --- Auth Screen Render ---
  if (!isAuthenticated) {
    return (
      <div className="auth-container">
        <div className="auth-bg-shapes">
          <div className="auth-shape-1" />
          <div className="auth-shape-2" />
        </div>

        {/* Toast System inside Auth */}
        <div className="toast-container">
          {toasts.map((toast) => (
            <div key={toast.id} className={`brutal-toast ${toast.type}`}>
              <span>{toast.message}</span>
            </div>
          ))}
        </div>

        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">CMS <span>PRODI</span></h1>
            <div className="auth-subtitle">Panel Manajemen Program Studi KTF UMB</div>
          </div>

          <div className="brutal-card cyan" style={{ padding: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <Database size={16} className="text-yellow" />
              <span>
                Backend Mode: <strong>{connectionMode === 'supabase' ? 'Supabase Database' : 'LocalStorage Mock DB'}</strong>
              </span>
            </div>
          </div>

          <form onSubmit={handleSignIn}>
            <div className="form-group">
              <label className="form-label">Email Administrator</label>
              <input
                type="email"
                placeholder="admin@umb.ac.id"
                className="form-input"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="form-input"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="brutal-btn cyan"
              style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
              disabled={isAuthLoading}
            >
              {isAuthLoading ? (
                <>
                  <RefreshCw size={16} className="status-pulse" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {connectionMode === 'mock' && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                * Running locally without configuration. Login using any email & password (min 4 chars) to test CRUD.
              </div>
              <button
                type="button"
                className="brutal-btn secondary brutal-btn-sm"
                onClick={() => {
                  setAuthEmail('admin@umb.ac.id');
                  setAuthPassword('admin123');
                  triggerToast('Pre-filled. Click Sign In.', 'warning');
                }}
              >
                Auto-fill Admin Credentials
              </button>
            </div>
          )}

          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '2px dashed var(--border-color)', textAlign: 'center' }}>
            <button
              type="button"
              className="menu-item active"
              style={{ display: 'inline-flex', gap: '8px', border: '1px solid var(--text-primary)', width: 'auto', margin: '0 auto' }}
              onClick={() => {
                triggerToast('Configure Supabase URL and Key inside settings once logged in!', 'warning');
                // Allow bypass to settings
                setIsAuthenticated(true);
                setCurrentUserEmail('Guest Developer');
                setActiveTab('settings');
              }}
            >
              <Settings size={14} />
              <span>Bypass to Supabase Settings</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Logged In Dashboard Layout Render ---
  return (
    <div className="cms-layout">
      {/* Toast Notifications container */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`brutal-toast ${toast.type}`}>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Sidebar Section */}
      <aside className="cms-sidebar">
        <div className="sidebar-logo">
          <span>CMS</span> PRODI KTF
        </div>

        <nav className="sidebar-menu">
          <button
            className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </button>

          <button
            className={`menu-item ${activeTab === 'news' ? 'active' : ''}`}
            onClick={() => setActiveTab('news')}
          >
            <Newspaper size={16} />
            <span>Berita & Artikel</span>
          </button>

          <button
            className={`menu-item ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <Calendar size={16} />
            <span>Agenda & Kegiatan</span>
          </button>

          <button
            className={`menu-item ${activeTab === 'testimonials' ? 'active' : ''}`}
            onClick={() => setActiveTab('testimonials')}
          >
            <MessageSquare size={16} />
            <span>Testimoni</span>
          </button>

          <button
            className={`menu-item ${activeTab === 'partners' ? 'active' : ''}`}
            onClick={() => setActiveTab('partners')}
          >
            <Users size={16} />
            <span>Mitra Industri</span>
          </button>

          <button
            className={`menu-item ${activeTab === 'landing_stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('landing_stats')}
          >
            <TrendingUp size={16} />
            <span>Statistik Prodi</span>
          </button>

          <button
            className={`menu-item ${activeTab === 'landing_portfolio' ? 'active' : ''}`}
            onClick={() => setActiveTab('landing_portfolio')}
          >
            <Image size={16} />
            <span>Portfolio Kriya</span>
          </button>

          <button
            className={`menu-item ${activeTab === 'site_content' ? 'active' : ''}`}
            onClick={() => setActiveTab('site_content')}
          >
            <FileText size={16} />
            <span>Konten Halaman</span>
          </button>

          <button
            className={`menu-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={16} />
            <span>Settings & Database</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            User: {currentUserEmail}
          </div>
          <button className="brutal-btn danger brutal-btn-sm" style={{ width: '100%' }} onClick={handleSignOut}>
            <LogOut size={14} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <main className="cms-main">
        {/* Top Header Bar */}
        <header className="cms-topbar">
          <div className="topbar-title-section">
            <div className="topbar-subtitle">
              {activeTab === 'dashboard' && 'Beranda Utama'}
              {activeTab === 'news' && 'Manajemen Berita'}
              {activeTab === 'events' && 'Manajemen Agenda'}
              {activeTab === 'testimonials' && 'Kutipan & Testimoni Alumni'}
              {activeTab === 'partners' && 'Logo & Daftar Kerjasama'}
              {activeTab === 'landing_stats' && 'Statistik Ribbon Utama'}
              {activeTab === 'landing_portfolio' && 'Galeri Arsip Karya Mahasiswa'}
              {activeTab === 'site_content' && 'Pengaturan Teks & Deskripsi Landing'}
              {activeTab === 'settings' && 'Pengaturan Koneksi Backend'}
            </div>
            <h2 style={{ margin: 0, textTransform: 'uppercase' }}>
              {activeTab === 'dashboard' && 'Sistem Kontrol Akademik'}
              {activeTab === 'news' && 'Berita & Publikasi'}
              {activeTab === 'events' && 'Kegiatan & Acara'}
              {activeTab === 'testimonials' && 'Testimoni Alumni'}
              {activeTab === 'partners' && 'Kemitraan Industri'}
              {activeTab === 'landing_stats' && 'Angka & Informasi Kunci'}
              {activeTab === 'landing_portfolio' && 'Katalog Portofolio'}
              {activeTab === 'site_content' && 'Bilingual Text Editor'}
              {activeTab === 'settings' && 'Koneksi Supabase'}
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div className="connection-status">
              <span className={`status-dot ${connectionMode === 'supabase' ? 'online' : 'mock'}`} />
              <span>{connectionMode === 'supabase' ? 'DATABASE ONLINE' : 'LOCAL MOCK MODE'}</span>
              <button
                onClick={checkDatabaseConnection}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '0 2px' }}
                title="Refresh Database Connection"
                disabled={isStatusChecking}
              >
                <RefreshCw size={12} className={isStatusChecking ? 'status-pulse' : ''} />
              </button>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <section className="cms-content">
          {/* Warn about local storage mock data */}
          {connectionMode === 'mock' && activeTab !== 'settings' && (
            <div className="brutal-card yellow" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <AlertTriangle className="status-pulse text-primary" size={24} />
                <div>
                  <strong style={{ textTransform: 'uppercase' }}>Menjalankan Mode Offline (Mock Data)</strong>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    Koneksi database Supabase tidak dikonfigurasi. Semua perubahan disimpan sementara di Browser (LocalStorage).
                  </div>
                </div>
              </div>
              <button className="brutal-btn brutal-btn-sm secondary" onClick={() => setActiveTab('settings')}>
                Setup Database
              </button>
            </div>
          )}

          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div>
              <div className="summary-grid">
                <div className="summary-card">
                  <span className="summary-label">Total Berita</span>
                  <div className="summary-val">{news.length}</div>
                  <div className="summary-footer">
                    <Newspaper size={12} />
                    <span>Terbit di halaman prodi</span>
                  </div>
                </div>
                <div className="summary-card">
                  <span className="summary-label">Agenda Akademik</span>
                  <div className="summary-val">{events.length}</div>
                  <div className="summary-footer">
                    <Calendar size={12} />
                    <span>Kegiatan & Workshop</span>
                  </div>
                </div>
                <div className="summary-card">
                  <span className="summary-label">Galeri Portofolio</span>
                  <div className="summary-val">{landingPortfolioItems.length}</div>
                  <div className="summary-footer">
                    <Image size={12} />
                    <span>Karya Kriya Mahasiswa</span>
                  </div>
                </div>
                <div className="summary-card">
                  <span className="summary-label">Mitra Industri</span>
                  <div className="summary-val">{partners.length}</div>
                  <div className="summary-footer">
                    <Users size={12} />
                    <span>Kolaborasi & Magang</span>
                  </div>
                </div>
              </div>

              <div className="grid-2">
                <div className="brutal-card">
                  <div className="card-header-flex">
                    <h3 style={{ margin: 0, textTransform: 'uppercase' }}>Berita Terbaru</h3>
                    <button className="brutal-btn brutal-btn-sm" onClick={() => setActiveTab('news')}>
                      Kelola
                    </button>
                  </div>
                  {news.slice(0, 3).map((item) => (
                    <div key={item.id} style={{ display: 'flex', gap: '12px', padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}>
                      <img src={item.img_src} className="img-preview" alt="" />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '14px' }}>{item.title}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{item.date} | {item.category}</div>
                      </div>
                    </div>
                  ))}
                  {news.length === 0 && <div className="empty-state">Belum ada berita terbit.</div>}
                </div>

                <div className="brutal-card">
                  <div className="card-header-flex">
                    <h3 style={{ margin: 0, textTransform: 'uppercase' }}>Agenda Terdekat</h3>
                    <button className="brutal-btn brutal-btn-sm" onClick={() => setActiveTab('events')}>
                      Kelola
                    </button>
                  </div>
                  {events.slice(0, 3).map((item) => (
                    <div key={item.id} style={{ display: 'flex', gap: '12px', padding: '12px 0', borderBottom: '1px solid var(--border-color)', alignItems: 'center' }}>
                      <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--text-primary)', width: '50px', height: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '16px', fontWeight: 'bold', lineHeight: 1 }}>{item.date_day}</span>
                        <span style={{ fontSize: '10px', color: 'var(--accent-yellow)' }}>{item.date_month}</span>
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '14px' }}>{item.title}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>📍 {item.location}</div>
                      </div>
                    </div>
                  ))}
                  {events.length === 0 && <div className="empty-state">Belum ada agenda terdekat.</div>}
                </div>
              </div>

              <div className="brutal-card cyan">
                <h3 style={{ textTransform: 'uppercase', marginBottom: '12px' }}>Panduan Integrasi Front-End</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  Aplikasi landing page utama Anda (`prodi-umbandung`) telah dirancang untuk membaca data dari Supabase secara dinamis. Pastikan skema tabel di Supabase Anda sesuai dengan spesifikasi. Jika Anda mengubah teks landing, data di halaman beranda akan otomatis diperbarui.
                </p>
                <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                  <button className="brutal-btn brutal-btn-sm cyan" onClick={() => setActiveTab('site_content')}>
                    <FileText size={12} />
                    <span>Ubah Konten Teks Halaman</span>
                  </button>
                  <button className="brutal-btn brutal-btn-sm secondary" onClick={() => setActiveTab('settings')}>
                    <Database size={12} />
                    <span>Lihat Struktur Tabel SQL</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* NEWS TAB */}
          {activeTab === 'news' && (
            <div>
              <div className="card-header-flex">
                <div className="search-bar" style={{ flexGrow: 1, maxWidth: '400px', margin: 0 }}>
                  <input
                    type="text"
                    placeholder="Cari berita berdasarkan judul/kategori..."
                    className="form-input search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="brutal-btn" onClick={openCreateModal}>
                  <Plus size={16} />
                  <span>Tambah Berita</span>
                </button>
              </div>

              {isLoadingData ? (
                <div className="empty-state">
                  <RefreshCw size={24} className="status-pulse" />
                  <p>Memuat data berita...</p>
                </div>
              ) : (
                <div className="brutal-table-container">
                  <table className="brutal-table">
                    <thead>
                      <tr>
                        <th style={{ width: '80px' }}>Foto</th>
                        <th>Kategori</th>
                        <th>Judul Berita (Bilingual)</th>
                        <th>Ringkasan / Snippet</th>
                        <th>Tanggal</th>
                        <th style={{ width: '120px' }}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredList(news, ['title', 'title_en', 'category', 'category_en', 'snippet']).map((item) => (
                        <tr key={item.id}>
                          <td>
                            <img src={item.img_src} className="img-preview" alt="" />
                          </td>
                          <td>
                            <div className="badge yellow">{item.category}</div>
                            {item.category_en && <div className="badge muted" style={{ display: 'block', marginTop: '4px' }}>{item.category_en}</div>}
                          </td>
                          <td>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.title}</div>
                            {item.title_en && <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '4px' }}>{item.title_en}</div>}
                          </td>
                          <td>
                            <div style={{ fontSize: '13px', maxHeight: '50px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.snippet}</div>
                          </td>
                          <td style={{ whiteSpace: 'nowrap' }}>{item.date}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button className="brutal-btn brutal-btn-sm secondary" onClick={() => openEditModal(item)}>
                                <Edit2 size={12} />
                              </button>
                              <button className="brutal-btn brutal-btn-sm danger" onClick={() => openDeleteModal(item.id)}>
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {getFilteredList(news, ['title', 'category']).length === 0 && (
                        <tr>
                          <td colSpan={6} className="empty-state">Tidak ada berita ditemukan.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* EVENTS TAB */}
          {activeTab === 'events' && (
            <div>
              <div className="card-header-flex">
                <div className="search-bar" style={{ flexGrow: 1, maxWidth: '400px', margin: 0 }}>
                  <input
                    type="text"
                    placeholder="Cari agenda berdasarkan judul/lokasi..."
                    className="form-input search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="brutal-btn" onClick={openCreateModal}>
                  <Plus size={16} />
                  <span>Tambah Agenda</span>
                </button>
              </div>

              {isLoadingData ? (
                <div className="empty-state">
                  <RefreshCw size={24} className="status-pulse" />
                  <p>Memuat agenda...</p>
                </div>
              ) : (
                <div className="brutal-table-container">
                  <table className="brutal-table">
                    <thead>
                      <tr>
                        <th style={{ width: '80px' }}>Tanggal</th>
                        <th>Agenda Kegiatan (Bilingual)</th>
                        <th>Lokasi</th>
                        <th style={{ width: '120px' }}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredList(events, ['title', 'title_en', 'location', 'location_en']).map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--text-primary)', width: '60px', height: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                              <span style={{ fontSize: '20px', fontWeight: 'bold', lineHeight: 1 }}>{item.date_day}</span>
                              <span style={{ fontSize: '12px', color: 'var(--accent-yellow)', fontWeight: 600 }}>{item.date_month}</span>
                            </div>
                          </td>
                          <td>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.title}</div>
                            {item.title_en && <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '4px' }}>{item.title_en}</div>}
                          </td>
                          <td>
                            <div>{item.location}</div>
                            {item.location_en && <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.location_en}</div>}
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button className="brutal-btn brutal-btn-sm secondary" onClick={() => openEditModal(item)}>
                                <Edit2 size={12} />
                              </button>
                              <button className="brutal-btn brutal-btn-sm danger" onClick={() => openDeleteModal(item.id)}>
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {getFilteredList(events, ['title']).length === 0 && (
                        <tr>
                          <td colSpan={4} className="empty-state">Tidak ada agenda ditemukan.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TESTIMONIALS TAB */}
          {activeTab === 'testimonials' && (
            <div>
              <div className="card-header-flex">
                <div className="search-bar" style={{ flexGrow: 1, maxWidth: '400px', margin: 0 }}>
                  <input
                    type="text"
                    placeholder="Cari nama alumni..."
                    className="form-input search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="brutal-btn" onClick={openCreateModal}>
                  <Plus size={16} />
                  <span>Tambah Testimoni</span>
                </button>
              </div>

              {isLoadingData ? (
                <div className="empty-state">
                  <RefreshCw size={24} className="status-pulse" />
                  <p>Memuat testimoni...</p>
                </div>
              ) : (
                <div className="brutal-table-container">
                  <table className="brutal-table">
                    <thead>
                      <tr>
                        <th style={{ width: '80px' }}>Foto</th>
                        <th style={{ width: '200px' }}>Nama Alumni / Sumber</th>
                        <th>Isi Testimoni (Bilingual)</th>
                        <th style={{ width: '120px' }}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredList(testimonials, ['by', 'by_en', 'testimonial', 'testimonial_en']).map((item) => (
                        <tr key={item.id}>
                          <td>
                            <img src={item.img_src} className="img-preview" style={{ borderRadius: '50% !important' }} alt="" />
                          </td>
                          <td>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.by}</div>
                            {item.by_en && item.by_en !== item.by && <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.by_en}</div>}
                          </td>
                          <td>
                            <div style={{ fontSize: '13px', lineHeight: 1.5 }}>"{item.testimonial}"</div>
                            {item.testimonial_en && <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '6px' }}>"{item.testimonial_en}"</div>}
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button className="brutal-btn brutal-btn-sm secondary" onClick={() => openEditModal(item)}>
                                <Edit2 size={12} />
                              </button>
                              <button className="brutal-btn brutal-btn-sm danger" onClick={() => openDeleteModal(item.id)}>
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {getFilteredList(testimonials, ['by']).length === 0 && (
                        <tr>
                          <td colSpan={4} className="empty-state">Tidak ada testimoni ditemukan.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* PARTNERS TAB */}
          {activeTab === 'partners' && (
            <div>
              <div className="grid-2">
                <div>
                  <div className="card-header-flex">
                    <h3 style={{ textTransform: 'uppercase', margin: 0 }}>Daftar Mitra KTF</h3>
                    <button className="brutal-btn brutal-btn-sm" onClick={openCreateModal}>
                      <Plus size={12} />
                      <span>Mitra</span>
                    </button>
                  </div>

                  {isLoadingData ? (
                    <div className="empty-state">Memuat...</div>
                  ) : (
                    <div className="brutal-table-container">
                      <table className="brutal-table">
                        <thead>
                          <tr>
                            <th>Nama Kemitraan</th>
                            <th style={{ width: '100px' }}>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {partners.map((p) => (
                            <tr key={p.id}>
                              <td style={{ fontWeight: 600 }}>{p.name}</td>
                              <td>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                  <button className="brutal-btn brutal-btn-sm secondary" onClick={() => openEditModal(p)}>
                                    <Edit2 size={10} />
                                  </button>
                                  <button className="brutal-btn brutal-btn-sm danger" onClick={() => openDeleteModal(p.id)}>
                                    <Trash2 size={10} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {partners.length === 0 && (
                            <tr>
                              <td colSpan={2} className="empty-state">Belum ada mitra global.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div>
                  <div className="brutal-card cyan">
                    <h3 style={{ textTransform: 'uppercase' }}>Logo Partner Marquee</h3>
                    <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--text-secondary)', marginBottom: '16px' }}>
                      Kemitraan landing page menggunakan teks bergulir (marquee) untuk visualisasi cepat. Daftar partner di bawah adalah data yang di-render di halaman beranda.
                    </p>
                    <div className="brutal-table-container" style={{ boxShadow: 'none' }}>
                      <table className="brutal-table">
                        <thead>
                          <tr>
                            <th>Nama Brand</th>
                            <th>Urutan</th>
                          </tr>
                        </thead>
                        <tbody>
                          {landingPartners.map((lp) => (
                            <tr key={lp.id}>
                              <td style={{ fontFamily: 'var(--font-mono)' }}>{lp.name}</td>
                              <td style={{ fontFamily: 'var(--font-mono)' }}>{lp.sort_order}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div style={{ marginTop: '12px', fontSize: '11px', color: 'var(--text-muted)' }}>
                      * Untuk memodifikasi landing marquee, ubah langsung data di tabel `landing_partners` via Supabase SQL.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LANDING STATS TAB */}
          {activeTab === 'landing_stats' && (
            <div>
              <div className="card-header-flex">
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                  Mengatur 4 pilar statistik (Stats Ribbon) yang terletak langsung di bawah banner Hero utama.
                </p>
                <button className="brutal-btn" onClick={openCreateModal}>
                  <Plus size={16} />
                  <span>Tambah Stat</span>
                </button>
              </div>

              {isLoadingData ? (
                <div className="empty-state">Memuat data statistik...</div>
              ) : (
                <div className="brutal-table-container">
                  <table className="brutal-table">
                    <thead>
                      <tr>
                        <th style={{ width: '80px' }}>Urutan</th>
                        <th>Nilai / Angka</th>
                        <th>Deskripsi Informasi</th>
                        <th style={{ width: '120px' }}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {landingStats.map((item) => (
                        <tr key={item.id}>
                          <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{item.sort_order}</td>
                          <td style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--accent-yellow)', fontFamily: 'var(--font-mono)' }}>{item.number}</td>
                          <td style={{ fontWeight: 600 }}>{item.label}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button className="brutal-btn brutal-btn-sm secondary" onClick={() => openEditModal(item)}>
                                <Edit2 size={12} />
                              </button>
                              <button className="brutal-btn brutal-btn-sm danger" onClick={() => openDeleteModal(item.id)}>
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {landingStats.length === 0 && (
                        <tr>
                          <td colSpan={4} className="empty-state">Tidak ada stats. Silakan tambah data baru.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* PORTFOLIO TAB */}
          {activeTab === 'landing_portfolio' && (
            <div>
              <div className="card-header-flex">
                <div className="search-bar" style={{ flexGrow: 1, maxWidth: '400px', margin: 0 }}>
                  <input
                    type="text"
                    placeholder="Cari karya mahasiswa..."
                    className="form-input search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="brutal-btn" onClick={openCreateModal}>
                  <Plus size={16} />
                  <span>Tambah Portofolio</span>
                </button>
              </div>

              {isLoadingData ? (
                <div className="empty-state">Memuat katalog portofolio...</div>
              ) : (
                <div className="brutal-table-container">
                  <table className="brutal-table">
                    <thead>
                      <tr>
                        <th style={{ width: '80px' }}>Foto</th>
                        <th>Karya Seni (Bilingual)</th>
                        <th>Medium & Teknik</th>
                        <th>Tahun</th>
                        <th>Grid Class</th>
                        <th style={{ width: '80px' }}>Urut</th>
                        <th style={{ width: '120px' }}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredList(landingPortfolioItems, ['title', 'medium', 'technique', 'year']).map((item) => (
                        <tr key={item.id}>
                          <td>
                            <img src={item.image} className="img-preview" alt="" />
                          </td>
                          <td>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.title}</div>
                          </td>
                          <td>
                            <div style={{ fontSize: '13px' }}><strong>Medium:</strong> {item.medium}</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}><strong>Teknik:</strong> {item.technique}</div>
                          </td>
                          <td style={{ fontFamily: 'var(--font-mono)' }}>{item.year}</td>
                          <td>
                            <span className="badge muted" style={{ fontFamily: 'var(--font-mono)' }}>{item.gridClass}</span>
                          </td>
                          <td style={{ fontFamily: 'var(--font-mono)' }}>{item.sort_order}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button className="brutal-btn brutal-btn-sm secondary" onClick={() => openEditModal(item)}>
                                <Edit2 size={12} />
                              </button>
                              <button className="brutal-btn brutal-btn-sm danger" onClick={() => openDeleteModal(item.id)}>
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {getFilteredList(landingPortfolioItems, ['title']).length === 0 && (
                        <tr>
                          <td colSpan={7} className="empty-state">Tidak ada karya ditemukan.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* SITE CONTENT TAB */}
          {activeTab === 'site_content' && (
            <div>
              <div className="brutal-card cyan" style={{ marginBottom: '24px' }}>
                <h3 style={{ textTransform: 'uppercase' }}>Manajer Konten Halaman Landing (Bilingual)</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
                  Perbarui tulisan statis di web utama secara real-time. Teks dikelompokkan ke dalam 2 bahasa (Bahasa Indonesia & Bahasa Inggris) untuk mendukung globalisasi situs prodi. Masukkan perubahan lalu klik tombol <strong>Simpan Perubahan</strong> pada kolom sebelah kanan.
                </p>
              </div>

              {isLoadingData ? (
                <div className="empty-state">Memuat kunci konten...</div>
              ) : (
                <div className="brutal-card">
                  <div className="site-content-row" style={{ borderBottom: '3px solid var(--text-primary)', fontWeight: 'bold', color: 'var(--accent-yellow)', textTransform: 'uppercase' }}>
                    <div>Kunci Konten (Key)</div>
                    <div>Bahasa Indonesia (ID)</div>
                    <div>English Translation (EN)</div>
                  </div>

                  {siteContents.map((content) => (
                    <div key={content.key} className="site-content-row">
                      <div className="site-content-key">
                        {content.key}
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
                          Updated: {new Date(content.updated_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <textarea
                          className="form-textarea"
                          value={content.value}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSiteContents(prev => prev.map(c => c.key === content.key ? { ...c, value: val } : c));
                          }}
                          style={{ minHeight: '80px', fontSize: '13px' }}
                        />
                      </div>
                      <div>
                        <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                          <textarea
                            className="form-textarea"
                            value={content.value_en || ''}
                            placeholder="Terjemahan bahasa Inggris..."
                            onChange={(e) => {
                              const val = e.target.value;
                              setSiteContents(prev => prev.map(c => c.key === content.key ? { ...c, value_en: val } : c));
                            }}
                            style={{ minHeight: '80px', fontSize: '13px' }}
                          />
                          <button
                            className="brutal-btn brutal-btn-sm cyan"
                            style={{ alignSelf: 'flex-end' }}
                            onClick={() => handleUpdateSiteContent(content.key, content.value, content.value_en)}
                          >
                            <Save size={12} />
                            <span>Simpan</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {siteContents.length === 0 && <div className="empty-state">Tidak ada konten halaman terdaftar di database.</div>}
                </div>
              )}
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div>
              <div className="grid-2">
                <div className="brutal-card">
                  <h3 style={{ textTransform: 'uppercase' }}>Koneksi Backend Supabase</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
                    Gunakan kredensial API dari dashboard Supabase Anda. Pengaturan ini disimpan di komputer lokal Anda sehingga aman.
                  </p>

                  <form onSubmit={handleSaveSettings}>
                    <div className="form-group">
                      <label className="form-label">Supabase URL</label>
                      <input
                        type="url"
                        placeholder="https://your-project-ref.supabase.co"
                        className="form-input font-mono"
                        value={settingsUrl}
                        onChange={(e) => setSettingsUrl(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Supabase API Key (Anon Key)</label>
                      <input
                        type="password"
                        placeholder="ey..."
                        className="form-input font-mono"
                        value={settingsKey}
                        onChange={(e) => setSettingsKey(e.target.value)}
                        required
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                      <button type="submit" className="brutal-btn cyan">
                        <Save size={16} />
                        <span>Hubungkan</span>
                      </button>
                      <button type="button" className="brutal-btn secondary" onClick={handleClearSettings}>
                        Putuskan
                      </button>
                    </div>
                  </form>
                </div>

                <div className="brutal-card">
                  <h3 style={{ textTransform: 'uppercase' }}>Status Sistem & Debugging</h3>
                  <div className="brutal-card" style={{ padding: '16px', background: 'var(--bg-primary)', borderStyle: 'dashed', boxShadow: 'none' }}>
                    <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
                      <tbody>
                        <tr style={{ borderBottom: '1px solid var(--border-muted)' }}>
                          <td style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Active Mode:</td>
                          <td style={{ padding: '8px 0', fontWeight: 'bold' }}>
                            {connectionMode === 'supabase' ? '🟢 REAL DATABASE (Supabase)' : '🟡 OFFLINE MOCK'}
                          </td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--border-muted)' }}>
                          <td style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Connection Diagnostics:</td>
                          <td style={{ padding: '8px 0', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-yellow)' }}>
                            {dbStatusMessage}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Mock Database:</td>
                          <td style={{ padding: '8px 0' }}>
                            <button className="brutal-btn brutal-btn-sm danger" onClick={handleResetMockData}>
                              Reset Mock Data
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 style={{ textTransform: 'uppercase', marginTop: '24px', marginBottom: '8px' }}>Skema Database SQL</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    Gunakan skema tabel berikut di editor SQL Supabase Anda untuk mencocokkan struktur tabel:
                  </p>
                  <pre style={{ background: 'var(--bg-primary)', border: '1px solid var(--text-primary)', padding: '12px', fontSize: '10px', overflowX: 'auto', maxHeight: '180px', margin: 0, fontFamily: 'var(--font-mono)' }}>
{`-- SQL TABLES SETUP
create table public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_en text,
  category text not null,
  category_en text,
  snippet text not null,
  snippet_en text,
  date text not null,
  img_src text not null,
  created_at timestamptz default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  date_day text not null,
  date_month text not null,
  title text not null,
  title_en text,
  location text not null,
  location_en text,
  created_at timestamptz default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  testimonial text not null,
  testimonial_en text,
  "by" text not null,
  by_en text,
  img_src text not null,
  created_at timestamptz default now()
);

create table public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz default now()
);

create table public.site_content (
  key text primary key,
  value text not null,
  value_en text,
  updated_at timestamptz default now()
);

create table public.landing_stats (
  id uuid primary key default gen_random_uuid(),
  number text not null,
  label text not null,
  sort_order int not null,
  created_at timestamptz default now()
);

create table public.landing_partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sort_order int not null,
  created_at timestamptz default now()
);

create table public.landing_portfolio_items (
  id uuid primary key default gen_random_uuid(),
  image text not null,
  title text not null,
  medium text not null,
  technique text not null,
  year text not null,
  "gridClass" text not null,
  sort_order int not null,
  created_at timestamptz default now()
);`}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* --- CRUD MODALS --- */}
      {activeModal && activeModal !== 'delete' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title">
                {activeModal === 'create' ? 'Tambah Data Baru' : 'Edit Data'} — {activeTab.toUpperCase()}
              </span>
              <button className="modal-close-btn" onClick={() => setActiveModal(null)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateOrUpdate}>
              <div className="modal-body">
                {/* News Form Fields */}
                {activeTab === 'news' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Judul Berita (Bahasa Indonesia)</label>
                      <input
                        type="text"
                        className="form-input"
                        value={newsForm.title}
                        onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Judul Berita (English Translation)</label>
                      <input
                        type="text"
                        className="form-input"
                        value={newsForm.title_en || ''}
                        onChange={(e) => setNewsForm({ ...newsForm, title_en: e.target.value })}
                      />
                    </div>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Kategori (ID)</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Pameran, Akademik, Prestasi"
                          value={newsForm.category}
                          onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Kategori (EN)</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Exhibition, Academic, Achievement"
                          value={newsForm.category_en || ''}
                          onChange={(e) => setNewsForm({ ...newsForm, category_en: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Ringkasan / Snippet (ID)</label>
                      <textarea
                        className="form-textarea"
                        value={newsForm.snippet}
                        onChange={(e) => setNewsForm({ ...newsForm, snippet: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Ringkasan / Snippet (EN)</label>
                      <textarea
                        className="form-textarea"
                        value={newsForm.snippet_en || ''}
                        onChange={(e) => setNewsForm({ ...newsForm, snippet_en: e.target.value })}
                      />
                    </div>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Tanggal Terbit Teks</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="12 Mei 2026"
                          value={newsForm.date}
                          onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Image URL</label>
                        <input
                          type="url"
                          className="form-input"
                          placeholder="https://images.unsplash.com/..."
                          value={newsForm.img_src}
                          onChange={(e) => setNewsForm({ ...newsForm, img_src: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    {newsForm.img_src && (
                      <div className="form-group">
                        <label className="form-label">Preview Gambar</label>
                        <img src={newsForm.img_src} className="img-preview-large" alt="" />
                      </div>
                    )}
                  </>
                )}

                {/* Events Form Fields */}
                {activeTab === 'events' && (
                  <>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Hari (Angka)</label>
                        <input
                          type="text"
                          placeholder="e.g. 18"
                          className="form-input"
                          value={eventForm.date_day}
                          onChange={(e) => setEventForm({ ...eventForm, date_day: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Bulan (Teks Pendek)</label>
                        <input
                          type="text"
                          placeholder="e.g. JUN"
                          className="form-input"
                          value={eventForm.date_month}
                          onChange={(e) => setEventForm({ ...eventForm, date_month: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Judul Agenda (ID)</label>
                      <input
                        type="text"
                        className="form-input"
                        value={eventForm.title}
                        onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Judul Agenda (EN)</label>
                      <input
                        type="text"
                        className="form-input"
                        value={eventForm.title_en || ''}
                        onChange={(e) => setEventForm({ ...eventForm, title_en: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Lokasi Kegiatan (ID)</label>
                      <input
                        type="text"
                        className="form-input"
                        value={eventForm.location}
                        onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Lokasi Kegiatan (EN)</label>
                      <input
                        type="text"
                        className="form-input"
                        value={eventForm.location_en || ''}
                        onChange={(e) => setEventForm({ ...eventForm, location_en: e.target.value })}
                      />
                    </div>
                  </>
                )}

                {/* Testimonials Form Fields */}
                {activeTab === 'testimonials' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Isi Kutipan / Testimoni (ID)</label>
                      <textarea
                        className="form-textarea"
                        value={testimonialForm.testimonial}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, testimonial: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Isi Kutipan / Testimoni (EN)</label>
                      <textarea
                        className="form-textarea"
                        value={testimonialForm.testimonial_en || ''}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, testimonial_en: e.target.value })}
                      />
                    </div>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Nama Alumni & Tahun Lulus (ID)</label>
                        <input
                          type="text"
                          placeholder="Sarah, Alumni 2024"
                          className="form-input"
                          value={testimonialForm.by}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, by: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Nama Alumni & Tahun Lulus (EN)</label>
                        <input
                          type="text"
                          placeholder="Sarah, Alumni 2024"
                          className="form-input"
                          value={testimonialForm.by_en || ''}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, by_en: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Foto URL (Alumni)</label>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        className="form-input"
                        value={testimonialForm.img_src}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, img_src: e.target.value })}
                        required
                      />
                    </div>
                    {testimonialForm.img_src && (
                      <div style={{ textAlign: 'center' }}>
                        <img src={testimonialForm.img_src} className="img-preview" style={{ width: '80px', height: '80px', borderRadius: '50% !important' }} alt="" />
                      </div>
                    )}
                  </>
                )}

                {/* Partners Form Fields */}
                {activeTab === 'partners' && (
                  <div className="form-group">
                    <label className="form-label">Nama Mitra Kemitraan</label>
                    <input
                      type="text"
                      placeholder="e.g. PT Gistex Indonesia"
                      className="form-input"
                      value={partnerForm.name}
                      onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                      required
                    />
                  </div>
                )}

                {/* Landing Stats Form Fields */}
                {activeTab === 'landing_stats' && (
                  <>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Nilai / Angka Utama</label>
                        <input
                          type="text"
                          placeholder="e.g. 98% atau 15+"
                          className="form-input"
                          value={statForm.number}
                          onChange={(e) => setStatForm({ ...statForm, number: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Nomor Urutan Tampil (Sort Order)</label>
                        <input
                          type="number"
                          className="form-input"
                          value={statForm.sort_order}
                          onChange={(e) => setStatForm({ ...statForm, sort_order: parseInt(e.target.value) })}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Deskripsi Informasi</label>
                      <input
                        type="text"
                        placeholder="e.g. Keterserapan Kerja Lulusan"
                        className="form-input"
                        value={statForm.label}
                        onChange={(e) => setStatForm({ ...statForm, label: e.target.value })}
                        required
                      />
                    </div>
                  </>
                )}

                {/* Landing Portfolio Items Form Fields */}
                {activeTab === 'landing_portfolio' && (
                  <>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Judul Karya Seni</label>
                        <input
                          type="text"
                          placeholder="e.g. Tenun Ikat Modern"
                          className="form-input"
                          value={portfolioForm.title}
                          onChange={(e) => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Tahun Pembuatan</label>
                        <input
                          type="text"
                          placeholder="e.g. 2025"
                          className="form-input"
                          value={portfolioForm.year}
                          onChange={(e) => setPortfolioForm({ ...portfolioForm, year: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Bahan / Medium</label>
                        <input
                          type="text"
                          placeholder="e.g. Serat Linen Alami"
                          className="form-input"
                          value={portfolioForm.medium}
                          onChange={(e) => setPortfolioForm({ ...portfolioForm, medium: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Teknik Kriya</label>
                        <input
                          type="text"
                          placeholder="e.g. Shibori & Tenun Gedogan"
                          className="form-input"
                          value={portfolioForm.technique}
                          onChange={(e) => setPortfolioForm({ ...portfolioForm, technique: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Grid Layout Class (CSS)</label>
                        <select
                          className="form-select"
                          value={portfolioForm.gridClass}
                          onChange={(e) => setPortfolioForm({ ...portfolioForm, gridClass: e.target.value })}
                        >
                          <option value="col-span-1 row-span-1">Kecil (1x1)</option>
                          <option value="col-span-2 row-span-1">Lebar (2x1)</option>
                          <option value="col-span-1 row-span-2">Tinggi (1x2)</option>
                          <option value="col-span-2 row-span-2">Besar (2x2)</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Urutan Tampil</label>
                        <input
                          type="number"
                          className="form-input"
                          value={portfolioForm.sort_order}
                          onChange={(e) => setPortfolioForm({ ...portfolioForm, sort_order: parseInt(e.target.value) })}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Foto Karya (Image URL)</label>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        className="form-input"
                        value={portfolioForm.image}
                        onChange={(e) => setPortfolioForm({ ...portfolioForm, image: e.target.value })}
                        required
                      />
                    </div>
                    {portfolioForm.image && (
                      <div className="form-group">
                        <label className="form-label">Preview Karya</label>
                        <img src={portfolioForm.image} className="img-preview-large" alt="" />
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="brutal-btn secondary" onClick={() => setActiveModal(null)}>
                  Batal
                </button>
                <button type="submit" className="brutal-btn cyan">
                  <Save size={16} />
                  <span>Simpan Data</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {activeModal === 'delete' && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '400px' }}>
            <div className="modal-header" style={{ backgroundColor: 'var(--accent-red)' }}>
              <span className="modal-title" style={{ color: 'white' }}>Konfirmasi Hapus</span>
              <button className="modal-close-btn" style={{ color: 'white' }} onClick={() => setActiveModal(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body" style={{ textAlign: 'center', padding: '32px 24px' }}>
              <AlertTriangle size={48} className="text-red status-pulse" style={{ margin: '0 auto 16px auto', display: 'block' }} />
              <p style={{ fontWeight: 600, fontSize: '16px' }}>Apakah Anda yakin ingin menghapus data ini?</p>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                Tindakan ini permanen dan tidak dapat dibatalkan.
              </p>
            </div>
            <div className="modal-footer" style={{ justifyContent: 'center', gap: '16px' }}>
              <button className="brutal-btn secondary" onClick={() => setActiveModal(null)}>
                Batal
              </button>
              <button className="brutal-btn danger" onClick={handleDelete}>
                <Trash2 size={16} />
                <span>Hapus Permanen</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
