import { useState, useEffect } from 'react';
import { getSupabaseClient, getCredentials, saveCredentials, testConnection, clearCredentials } from './lib/supabase';
import { dataService, getConnectionMode, type ConnectionMode } from './lib/dataService';
import {
  type DbNews,
  type DbEvent,
  type DbTestimonial,
  type DbPartner,
  type DbSiteContent,
  type DbLandingStat,
  type DbLandingPortfolioItem,
  type DbDosen,
  type DbKurikulumCourse,
  type DbKurikulumPlo,
  type DbKurikulumProfile,
  type DbTaStep
} from './lib/mockData';

// Import modular layouts
import Auth from './components/Auth';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CrudModal from './components/Modals/CrudModal';
import DeleteConfirmModal from './components/Modals/DeleteConfirmModal';

// Import tab views
import DashboardTab from './components/Tabs/DashboardTab';
import NewsTab from './components/Tabs/NewsTab';
import EventsTab from './components/Tabs/EventsTab';
import TestimonialsTab from './components/Tabs/TestimonialsTab';
import PartnersTab from './components/Tabs/PartnersTab';
import StatsTab from './components/Tabs/StatsTab';
import PortfolioTab from './components/Tabs/PortfolioTab';
import SiteContentTab from './components/Tabs/SiteContentTab';
import SettingsTab from './components/Tabs/SettingsTab';
import DosenTab from './components/Tabs/DosenTab';
import CoursesTab from './components/Tabs/CoursesTab';
import PlosTab from './components/Tabs/PlosTab';
import ProfilesTab from './components/Tabs/ProfilesTab';
import TaStepsTab from './components/Tabs/TaStepsTab';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning';
}

export type TabType =
  | 'dashboard'
  | 'news'
  | 'events'
  | 'testimonials'
  | 'partners'
  | 'landing_stats'
  | 'landing_portfolio'
  | 'site_content'
  | 'settings'
  | 'dosen'
  | 'kurikulum_courses'
  | 'kurikulum_plos'
  | 'kurikulum_profiles'
  | 'tugas_akhir_steps';

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
  const [landingPortfolioItems, setLandingPortfolioItems] = useState<DbLandingPortfolioItem[]>([]);
  const [dosenList, setDosenList] = useState<DbDosen[]>([]);
  const [courses, setCourses] = useState<DbKurikulumCourse[]>([]);
  const [plos, setPlos] = useState<DbKurikulumPlo[]>([]);
  const [profiles, setProfiles] = useState<DbKurikulumProfile[]>([]);
  const [steps, setSteps] = useState<DbTaStep[]>([]);

  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

  // --- CRUD Modals & Form State ---
  const [activeModal, setActiveModal] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Search query state (shared across tab filters)
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
    number: '', label: '', label_en: '', sort_order: 0
  });

  const [portfolioForm, setPortfolioForm] = useState<Omit<DbLandingPortfolioItem, 'id'>>({
    image: '', title: '', medium: '', technique: '', year: '', gridClass: 'col-span-1', sort_order: 0
  });

  const [dosenForm, setDosenForm] = useState<Omit<DbDosen, 'id' | 'created_at'>>({
    name: '', img_src: '', scopus: '', sinta: '', scholar: '', facebook: '', twitter: '', tiktok: '', instagram: '', sort_order: 0
  });

  const [courseForm, setCourseForm] = useState<Omit<DbKurikulumCourse, 'id' | 'created_at'>>({
    semester: 'I', name: '', name_en: '', credits: 2, sort_order: 0
  });

  const [ploForm, setPloForm] = useState<Omit<DbKurikulumPlo, 'id' | 'created_at'>>({
    code: '', type: '', type_en: '', text: '', text_en: '', sort_order: 0
  });

  const [profileForm, setProfileForm] = useState<Omit<DbKurikulumProfile, 'id' | 'created_at'>>({
    title: '', title_en: '', desc: '', desc_en: '', sort_order: 0
  });

  const [stepForm, setStepForm] = useState<Omit<DbTaStep, 'id' | 'created_at'>>({
    num: '', title: '', title_en: '', desc: '', desc_en: '', sort_order: 0
  });

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
        triggerToast('Supabase offline/invalid credentials. Fell back to Local Mock.', 'warning');
      }
    } else {
      setDbStatusMessage('Running in Local Mock Mode (Supabase not configured)');
    }
    setIsStatusChecking(false);
  };

  // --- Session & Credential Loading ---
  useEffect(() => {
    const mockSession = localStorage.getItem('cms_mock_session');

    if (mockSession) {
      setIsAuthenticated(true);
      setCurrentUserEmail(JSON.parse(mockSession).email);
      checkDatabaseConnection();
    } else {
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
      setSearchQuery(''); // reset search query on tab change
      fetchCollectionData();
    }
  }, [isAuthenticated, activeTab]);

  const fetchCollectionData = async () => {
    setIsLoadingData(true);
    try {
      if (activeTab === 'dashboard') {
        const [newsList, eventsList, portList, partList] = await Promise.all([
          dataService.getNews(),
          dataService.getEvents(),
          dataService.getLandingPortfolioItems(),
          dataService.getPartners()
        ]);
        setNews(newsList);
        setEvents(eventsList);
        setLandingPortfolioItems(portList);
        setPartners(partList);
      } else if (activeTab === 'news') {
        setNews(await dataService.getNews());
      } else if (activeTab === 'events') {
        setEvents(await dataService.getEvents());
      } else if (activeTab === 'testimonials') {
        setTestimonials(await dataService.getTestimonials());
      } else if (activeTab === 'partners') {
        setPartners(await dataService.getPartners());
      } else if (activeTab === 'site_content') {
        setSiteContents(await dataService.getSiteContent());
      } else if (activeTab === 'landing_stats') {
        setLandingStats(await dataService.getLandingStats());
      } else if (activeTab === 'landing_portfolio') {
        setLandingPortfolioItems(await dataService.getLandingPortfolioItems());
      } else if (activeTab === 'dosen') {
        setDosenList(await dataService.getDosen());
      } else if (activeTab === 'kurikulum_courses') {
        setCourses(await dataService.getKurikulumCourses());
      } else if (activeTab === 'kurikulum_plos') {
        setPlos(await dataService.getKurikulumPlos());
      } else if (activeTab === 'kurikulum_profiles') {
        setProfiles(await dataService.getKurikulumProfiles());
      } else if (activeTab === 'tugas_akhir_steps') {
        setSteps(await dataService.getTaSteps());
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
        triggerToast(`Supabase Auth failed: ${error.message}. Checking keys or use mock mode.`, 'error');
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
        triggerToast('Invalid credentials (Use any email & password >= 4 chars)', 'error');
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

  // --- Credentials Saving via Settings ---
  const handleSaveCredentials = (url: string, anonKey: string) => {
    try {
      saveCredentials(url, anonKey);
      checkDatabaseConnection();
    } catch (err: any) {
      triggerToast(`Failed to save configuration: ${err.message}`, 'error');
    }
  };

  const handleClearCredentials = () => {
    clearCredentials();
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
    localStorage.removeItem('mock_dosen');
    localStorage.removeItem('mock_kurikulum_courses');
    localStorage.removeItem('mock_kurikulum_plos');
    localStorage.removeItem('mock_kurikulum_profiles');
    localStorage.removeItem('mock_tugas_akhir_steps');
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
          triggerToast('Berita berhasil dibuat!');
        } else if (activeModal === 'edit' && editingId) {
          await dataService.updateNews(editingId, newsForm);
          triggerToast('Berita berhasil diperbarui!');
        }
      } else if (activeTab === 'events') {
        if (activeModal === 'create') {
          await dataService.createEvent(eventForm);
          triggerToast('Agenda berhasil dibuat!');
        } else if (activeModal === 'edit' && editingId) {
          await dataService.updateEvent(editingId, eventForm);
          triggerToast('Agenda berhasil diperbarui!');
        }
      } else if (activeTab === 'testimonials') {
        if (activeModal === 'create') {
          await dataService.createTestimonial(testimonialForm);
          triggerToast('Testimoni berhasil dibuat!');
        } else if (activeModal === 'edit' && editingId) {
          await dataService.updateTestimonial(editingId, testimonialForm);
          triggerToast('Testimoni berhasil diperbarui!');
        }
      } else if (activeTab === 'partners') {
        if (activeModal === 'create') {
          await dataService.createPartner(partnerForm);
          triggerToast('Mitra berhasil ditambahkan!');
        } else if (activeModal === 'edit' && editingId) {
          await dataService.updatePartner(editingId, partnerForm);
          triggerToast('Mitra berhasil diperbarui!');
        }
      } else if (activeTab === 'landing_stats') {
        if (activeModal === 'create') {
          await dataService.createLandingStat(statForm);
          triggerToast('Statistik berhasil dibuat!');
        } else if (activeModal === 'edit' && editingId) {
          await dataService.updateLandingStat(editingId, statForm);
          triggerToast('Statistik berhasil diperbarui!');
        }
      } else if (activeTab === 'landing_portfolio') {
        if (activeModal === 'create') {
          await dataService.createLandingPortfolioItem(portfolioForm);
          triggerToast('Karya berhasil ditambahkan!');
        } else if (activeModal === 'edit' && editingId) {
          await dataService.updateLandingPortfolioItem(editingId, portfolioForm);
          triggerToast('Karya berhasil diperbarui!');
        }
      } else if (activeTab === 'dosen') {
        if (activeModal === 'create') {
          await dataService.createDosen(dosenForm);
          triggerToast('Dosen berhasil ditambahkan!');
        } else if (activeModal === 'edit' && editingId) {
          await dataService.updateDosen(editingId, dosenForm);
          triggerToast('Dosen berhasil diperbarui!');
        }
      } else if (activeTab === 'kurikulum_courses') {
        if (activeModal === 'create') {
          await dataService.createKurikulumCourse(courseForm);
          triggerToast('Mata kuliah berhasil ditambahkan!');
        } else if (activeModal === 'edit' && editingId) {
          await dataService.updateKurikulumCourse(editingId, courseForm);
          triggerToast('Mata kuliah berhasil diperbarui!');
        }
      } else if (activeTab === 'kurikulum_plos') {
        if (activeModal === 'create') {
          await dataService.createKurikulumPlo(ploForm);
          triggerToast('CPL berhasil ditambahkan!');
        } else if (activeModal === 'edit' && editingId) {
          await dataService.updateKurikulumPlo(editingId, ploForm);
          triggerToast('CPL berhasil diperbarui!');
        }
      } else if (activeTab === 'kurikulum_profiles') {
        if (activeModal === 'create') {
          await dataService.createKurikulumProfile(profileForm);
          triggerToast('Profil lulusan berhasil ditambahkan!');
        } else if (activeModal === 'edit' && editingId) {
          await dataService.updateKurikulumProfile(editingId, profileForm);
          triggerToast('Profil lulusan berhasil diperbarui!');
        }
      } else if (activeTab === 'tugas_akhir_steps') {
        if (activeModal === 'create') {
          await dataService.createTaStep(stepForm);
          triggerToast('Tahapan Tugas Akhir berhasil ditambahkan!');
        } else if (activeModal === 'edit' && editingId) {
          await dataService.updateTaStep(editingId, stepForm);
          triggerToast('Tahapan Tugas Akhir berhasil diperbarui!');
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
      } else if (activeTab === 'dosen') {
        await dataService.deleteDosen(deletingId);
      } else if (activeTab === 'kurikulum_courses') {
        await dataService.deleteKurikulumCourse(deletingId);
      } else if (activeTab === 'kurikulum_plos') {
        await dataService.deleteKurikulumPlo(deletingId);
      } else if (activeTab === 'kurikulum_profiles') {
        await dataService.deleteKurikulumProfile(deletingId);
      } else if (activeTab === 'tugas_akhir_steps') {
        await dataService.deleteTaStep(deletingId);
      }

      triggerToast('Item berhasil dihapus!', 'success');
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
      triggerToast(`Konten teks "${key}" berhasil diperbarui!`);
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
    setStatForm({ number: '', label: '', label_en: '', sort_order: landingStats.length + 1 });
    setPortfolioForm({ image: '', title: '', medium: '', technique: '', year: '', gridClass: 'col-span-1', sort_order: landingPortfolioItems.length + 1 });
    setDosenForm({ name: '', img_src: '', scopus: '', sinta: '', scholar: '', facebook: '', twitter: '', tiktok: '', instagram: '', sort_order: dosenList.length + 1 });
    setCourseForm({ semester: 'I', name: '', name_en: '', credits: 2, sort_order: courses.length + 1 });
    setPloForm({ code: '', type: '', type_en: '', text: '', text_en: '', sort_order: plos.length + 1 });
    setProfileForm({ title: '', title_en: '', desc: '', desc_en: '', sort_order: profiles.length + 1 });
    setStepForm({ num: '', title: '', title_en: '', desc: '', desc_en: '', sort_order: steps.length + 1 });
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
        label_en: item.label_en || '',
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
    } else if (activeTab === 'dosen') {
      setDosenForm({
        name: item.name,
        img_src: item.img_src || '',
        scopus: item.scopus || '',
        sinta: item.sinta || '',
        scholar: item.scholar || '',
        facebook: item.facebook || '',
        twitter: item.twitter || '',
        tiktok: item.tiktok || '',
        instagram: item.instagram || '',
        sort_order: item.sort_order || 0
      });
    } else if (activeTab === 'kurikulum_courses') {
      setCourseForm({
        semester: item.semester,
        name: item.name,
        name_en: item.name_en || '',
        credits: item.credits,
        sort_order: item.sort_order
      });
    } else if (activeTab === 'kurikulum_plos') {
      setPloForm({
        code: item.code,
        type: item.type,
        type_en: item.type_en || '',
        text: item.text,
        text_en: item.text_en || '',
        sort_order: item.sort_order
      });
    } else if (activeTab === 'kurikulum_profiles') {
      setProfileForm({
        title: item.title,
        title_en: item.title_en || '',
        desc: item.desc,
        desc_en: item.desc_en || '',
        sort_order: item.sort_order
      });
    } else if (activeTab === 'tugas_akhir_steps') {
      setStepForm({
        num: item.num,
        title: item.title,
        title_en: item.title_en || '',
        desc: item.desc,
        desc_en: item.desc_en || '',
        sort_order: item.sort_order
      });
    }
    setActiveModal('edit');
  };

  const openDeleteModal = (id: string) => {
    setDeletingId(id);
    setActiveModal('delete');
  };

  // --- Auth Screen Render ---
  if (!isAuthenticated) {
    return (
      <>
        {/* Toast overlay in Auth Screen */}
        <div className="fixed top-4 right-4 z-50 space-y-3 pointer-events-none">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`px-4 py-3 rounded-2xl text-xs font-semibold shadow-lg text-white pointer-events-auto transition-all ${
                toast.type === 'success' ? 'bg-green-600' : toast.type === 'error' ? 'bg-red-600' : 'bg-amber-600'
              }`}
            >
              {toast.message}
            </div>
          ))}
        </div>

        <Auth
          authEmail={authEmail}
          setAuthEmail={setAuthEmail}
          authPassword={authPassword}
          setAuthPassword={setAuthPassword}
          isAuthLoading={isAuthLoading}
          connectionMode={connectionMode}
          handleSignIn={handleSignIn}
          triggerToast={triggerToast}
          setIsAuthenticated={setIsAuthenticated}
          setCurrentUserEmail={setCurrentUserEmail}
          setActiveTab={setActiveTab}
        />
      </>
    );
  }

  // --- Logged In Dashboard Layout Render ---
  return (
    <div className="flex h-screen overflow-hidden text-gray-800 bg-gray-50">
      {/* Toast Notifications System */}
      <div className="fixed top-4 right-4 z-50 space-y-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-2xl text-xs font-semibold shadow-lg text-white pointer-events-auto transition-all ${
              toast.type === 'success' ? 'bg-green-600' : toast.type === 'error' ? 'bg-red-600' : 'bg-amber-600'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>

      {/* Sidebar Panel */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUserEmail={currentUserEmail}
        handleSignOut={handleSignOut}
      />

      {/* Main Panel Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden h-full">
        {/* Top Header Bar */}
        <Header
          activeTab={activeTab}
          connectionMode={connectionMode}
          dbStatusMessage={dbStatusMessage}
          isStatusChecking={isStatusChecking}
          checkDatabaseConnection={checkDatabaseConnection}
        />

        {/* Content Section scrollable viewport */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50/50">
          {/* DASHBOARD VIEW */}
          {activeTab === 'dashboard' && (
            <DashboardTab
              news={news}
              events={events}
              landingPortfolioItems={landingPortfolioItems}
              partners={partners}
              setActiveTab={setActiveTab}
            />
          )}

          {/* NEWS VIEW */}
          {activeTab === 'news' && (
            <NewsTab
              news={news}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isLoadingData={isLoadingData}
              openCreateModal={openCreateModal}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
            />
          )}

          {/* EVENTS VIEW */}
          {activeTab === 'events' && (
            <EventsTab
              events={events}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isLoadingData={isLoadingData}
              openCreateModal={openCreateModal}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
            />
          )}

          {/* TESTIMONIALS VIEW */}
          {activeTab === 'testimonials' && (
            <TestimonialsTab
              testimonials={testimonials}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isLoadingData={isLoadingData}
              openCreateModal={openCreateModal}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
            />
          )}

          {/* MITRA VIEW */}
          {activeTab === 'partners' && (
            <PartnersTab
              partners={partners}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isLoadingData={isLoadingData}
              openCreateModal={openCreateModal}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
            />
          )}

          {/* DOSEN VIEW */}
          {activeTab === 'dosen' && (
            <DosenTab
              dosenList={dosenList}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isLoadingData={isLoadingData}
              openCreateModal={openCreateModal}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
            />
          )}

          {/* LANDING STATS VIEW */}
          {activeTab === 'landing_stats' && (
            <StatsTab
              stats={landingStats}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isLoadingData={isLoadingData}
              openCreateModal={openCreateModal}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
            />
          )}

          {/* PORTFOLIO VIEW */}
          {activeTab === 'landing_portfolio' && (
            <PortfolioTab
              portfolioItems={landingPortfolioItems}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isLoadingData={isLoadingData}
              openCreateModal={openCreateModal}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
            />
          )}

          {/* SITE CONTENT TEXT EDITOR VIEW */}
          {activeTab === 'site_content' && (
            <SiteContentTab
              siteContent={siteContents}
              isLoadingData={isLoadingData}
              connectionMode={connectionMode}
              onUpdateContent={handleUpdateSiteContent}
            />
          )}

          {/* COURSES VIEW */}
          {activeTab === 'kurikulum_courses' && (
            <CoursesTab
              courses={courses}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isLoadingData={isLoadingData}
              openCreateModal={openCreateModal}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
            />
          )}

          {/* PLOS VIEW */}
          {activeTab === 'kurikulum_plos' && (
            <PlosTab
              plos={plos}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isLoadingData={isLoadingData}
              openCreateModal={openCreateModal}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
            />
          )}

          {/* PROFILES VIEW */}
          {activeTab === 'kurikulum_profiles' && (
            <ProfilesTab
              profiles={profiles}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isLoadingData={isLoadingData}
              openCreateModal={openCreateModal}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
            />
          )}

          {/* TA STEPS VIEW */}
          {activeTab === 'tugas_akhir_steps' && (
            <TaStepsTab
              steps={steps}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isLoadingData={isLoadingData}
              openCreateModal={openCreateModal}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
            />
          )}

          {/* SETTINGS VIEW */}
          {activeTab === 'settings' && (
            <SettingsTab
              connectionMode={connectionMode}
              supabaseConfig={getCredentials()}
              dbStatusMessage={dbStatusMessage}
              isStatusChecking={isStatusChecking}
              onSaveCredentials={handleSaveCredentials}
              onClearCredentials={handleClearCredentials}
              onCheckConnection={checkDatabaseConnection}
              onResetMockData={handleResetMockData}
              triggerToast={triggerToast}
            />
          )}
        </main>
      </div>

      {/* Global CRUD Modals Layer */}
      {(activeModal === 'create' || activeModal === 'edit') && (
        <CrudModal
          activeModal={activeModal}
          activeTab={activeTab}
          connectionMode={connectionMode}
          onClose={() => {
            setActiveModal(null);
            setEditingId(null);
          }}
          onSubmit={handleCreateOrUpdate}
          newsForm={newsForm}
          setNewsForm={setNewsForm}
          eventForm={eventForm}
          setEventForm={setEventForm}
          testimonialForm={testimonialForm}
          setTestimonialForm={setTestimonialForm}
          partnerForm={partnerForm}
          setPartnerForm={setPartnerForm}
          statForm={statForm}
          setStatForm={setStatForm}
          portfolioForm={portfolioForm}
          setPortfolioForm={setPortfolioForm}
          dosenForm={dosenForm}
          setDosenForm={setDosenForm}
          courseForm={courseForm}
          setCourseForm={setCourseForm}
          ploForm={ploForm}
          setPloForm={setPloForm}
          profileForm={profileForm}
          setProfileForm={setProfileForm}
          stepForm={stepForm}
          setStepForm={setStepForm}
        />
      )}

      {/* Global Delete Confirm Modal Layer */}
      {activeModal === 'delete' && (
        <DeleteConfirmModal
          isOpen={true}
          onClose={() => {
            setActiveModal(null);
            setDeletingId(null);
          }}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
