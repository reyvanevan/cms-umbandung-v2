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
  type DbTaStep,
  type DbLaboratorium,
  type DbKknDocument
} from './lib/mockData';

export function getSubSectionName(key: string): string {
  if (key.startsWith('hero_')) return 'Spanduk & Jumbotron';
  if (key.startsWith('kaprodi_')) return 'Sambutan Kepala Program Studi';
  if (key.startsWith('info_')) return 'Informasi Singkat Landing Page';
  if (key.startsWith('visi_') || key.startsWith('misi_') || key.startsWith('tujuan_') || key.startsWith('sasaran_')) return 'Visi & Misi Akademik';
  if (key.startsWith('gov_sec_') || key.startsWith('gov_upm_')) return 'Sekretaris & UPM (Tata Kelola)';
  if (key.startsWith('kurikulum_guideline_')) return 'Panduan Kurikulum & MBKM';
  if (key.startsWith('kkn_')) return 'Praktik Kerja & KKN';
  if (key.startsWith('kerjasama_')) return 'Kerjasama & Kemitraan';
  if (key.startsWith('footer_')) return 'Informasi Kontak & Sosial Media (Footer)';
  return 'Spanduk & Jumbotron';
}

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
import PrestasiTab from './components/Tabs/PrestasiTab';
import PublikasiDosenTab from './components/Tabs/PublikasiDosenTab';
import KegiatanDosenTab from './components/Tabs/KegiatanDosenTab';
import KegiatanMahasiswaTab from './components/Tabs/KegiatanMahasiswaTab';
import AlumniTab from './components/Tabs/AlumniTab';
import StatistikMabaTab from './components/Tabs/StatistikMabaTab';
import LaboratoriumTab from './components/Tabs/LaboratoriumTab';
import KknDocumentsTab from './components/Tabs/KknDocumentsTab';


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
  | 'tugas_akhir_steps'
  | 'prestasi'
  | 'publikasi_dosen'
  | 'kegiatan_dosen'
  | 'kegiatan_mahasiswa'
  | 'alumni'
  | 'statistik_maba'
  | 'laboratorium'
  | 'visi_misi'
  | 'tata_kelola'
  | 'global_content'
  | 'kkn_content'
  | 'kkn_documents';

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
  const [activeSubSection, setActiveSubSection] = useState<string | null>(null);
  const [focusedKey, setFocusedKey] = useState<string | null>(null);

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
  const [prestasiList, setPrestasiList] = useState<any[]>([]);
  const [publikasiList, setPublikasiList] = useState<any[]>([]);
  const [kegiatanDosenList, setKegiatanDosenList] = useState<any[]>([]);
  const [kegiatanMahasiswaList, setKegiatanMahasiswaList] = useState<any[]>([]);
  const [alumniList, setAlumniList] = useState<any[]>([]);
  const [statistikMabaList, setStatistikMabaList] = useState<any[]>([]);
  const [laboratoriumList, setLaboratoriumList] = useState<DbLaboratorium[]>([]);
  const [kknDocuments, setKknDocuments] = useState<DbKknDocument[]>([]);

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
    name: '',
    category: 'industri',
    category_en: 'industri',
    logo_url: ''
  });

  const [statForm, setStatForm] = useState<Omit<DbLandingStat, 'id'>>({
    number: '', label: '', label_en: '', sort_order: 0
  });

  const [portfolioForm, setPortfolioForm] = useState<Omit<DbLandingPortfolioItem, 'id'>>({
    image: '', title: '', medium: '', technique: '', year: '', gridClass: 'col-span-1', sort_order: 0
  });

  const [dosenForm, setDosenForm] = useState<Omit<DbDosen, 'id' | 'created_at'>>({
    name: '', img_src: '', scopus: '', sinta: '', scholar: '', facebook: '', twitter: '', tiktok: '', instagram: '', category: 'dosen', role: '', role_en: '', expertise: '', expertise_en: '', sort_order: 0
  });

  const [courseForm, setCourseForm] = useState<Omit<DbKurikulumCourse, 'id' | 'created_at'>>({
    semester: 'I', name: '', name_en: '', credits: 2, sort_order: 0, rps_url: ''
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

  const [prestasiForm, setPrestasiForm] = useState<any>({
    type: 'prodi', title: '', title_en: '', year: '', desc: '', desc_en: '', host: '', host_en: '', competitor: '', image_url: '', sort_order: 0
  });
  const [publikasiForm, setPublikasiForm] = useState<any>({
    title: '', title_en: '', author: '', journal: '', journal_en: '', year: '', category: '', category_en: '', link: '', sort_order: 0
  });
  const [kegiatanDosenForm, setKegiatanDosenForm] = useState<any>({
    title: '', title_en: '', date_text: '', date_text_en: '', location: '', desc: '', desc_en: '', image_url: '', sort_order: 0
  });
  const [kegiatanMahasiswaForm, setKegiatanMahasiswaForm] = useState<any>({
    title: '', title_en: '', date_text: '', date_text_en: '', location: '', desc: '', desc_en: '', image_url: '', sort_order: 0
  });
  const [alumniForm, setAlumniForm] = useState<any>({
    name: '', class_of: '', class_of_en: '', role: '', company: '', quote: '', quote_en: '', image_url: '', sort_order: 0
  });
  const [statistikMabaForm, setStatistikMabaForm] = useState<any>({
    year: '', count: 0, sort_order: 0
  });
  const [laboratoriumForm, setLaboratoriumForm] = useState<Omit<DbLaboratorium, 'id' | 'created_at'>>({
    name: '', name_en: '', desc: '', desc_en: '', image_url: '', sort_order: 0
  });
  const [kknDocumentForm, setKknDocumentForm] = useState<Omit<DbKknDocument, 'id' | 'created_at'>>({
    name: '', name_en: '', file_url: '', sort_order: 0
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

  // Set default activeSubSection when tab changes
  useEffect(() => {
    const homeSubSections = [
      'Ringkasan Landing Page',
      'Spanduk & Jumbotron',
      'Sambutan Kepala Program Studi',
      'Informasi Singkat Landing Page',
      'Video Profil',
      'Editorial Slider'
    ];

    if (activeTab === 'site_content' && (!activeSubSection || !homeSubSections.includes(activeSubSection))) {
      setActiveSubSection('Ringkasan Landing Page');
    } else if (activeTab === 'visi_misi' && activeSubSection !== 'Visi & Misi Akademik') {
      setActiveSubSection('Visi & Misi Akademik');
    } else if (activeTab === 'tata_kelola' && activeSubSection !== 'Sekretaris & UPM (Tata Kelola)') {
      setActiveSubSection('Sekretaris & UPM (Tata Kelola)');
    } else if (activeTab === 'global_content' && activeSubSection !== 'Informasi Kontak & Sosial Media (Footer)') {
      setActiveSubSection('Informasi Kontak & Sosial Media (Footer)');
    } else if (activeTab === 'kkn_content' && activeSubSection !== 'Praktik Kerja & KKN') {
      setActiveSubSection('Praktik Kerja & KKN');
    }
  }, [activeTab, activeSubSection]);

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
        const [partList, contentList] = await Promise.all([
          dataService.getPartners(),
          dataService.getSiteContent()
        ]);
        setPartners(partList);
        setSiteContents(contentList);
      } else if (activeTab === 'site_content' || activeTab === 'visi_misi' || activeTab === 'tata_kelola' || activeTab === 'global_content' || activeTab === 'kkn_content') {
        const [contentList, dList] = await Promise.all([
          dataService.getSiteContent(),
          dataService.getDosen()
        ]);
        setSiteContents(contentList);
        setDosenList(dList);
      } else if (activeTab === 'kkn_documents') {
        setKknDocuments(await dataService.getKknDocuments());
      } else if (activeTab === 'landing_stats') {
        setLandingStats(await dataService.getLandingStats());
      } else if (activeTab === 'landing_portfolio') {
        setLandingPortfolioItems(await dataService.getLandingPortfolioItems());
      } else if (activeTab === 'dosen') {
        setDosenList(await dataService.getDosen());
      } else if (activeTab === 'kurikulum_courses') {
        const [courseList, contentList] = await Promise.all([
          dataService.getKurikulumCourses(),
          dataService.getSiteContent()
        ]);
        setCourses(courseList);
        setSiteContents(contentList);
      } else if (activeTab === 'kurikulum_plos') {
        setPlos(await dataService.getKurikulumPlos());
      } else if (activeTab === 'kurikulum_profiles') {
        setProfiles(await dataService.getKurikulumProfiles());
      } else if (activeTab === 'tugas_akhir_steps') {
        const [stepList, contentList] = await Promise.all([
          dataService.getTaSteps(),
          dataService.getSiteContent()
        ]);
        setSteps(stepList);
        setSiteContents(contentList);
      } else if (activeTab === 'prestasi') {
        setPrestasiList(await dataService.getPrestasi());
      } else if (activeTab === 'publikasi_dosen') {
        setPublikasiList(await dataService.getPublikasiDosen());
      } else if (activeTab === 'kegiatan_dosen') {
        setKegiatanDosenList(await dataService.getKegiatanDosen());
      } else if (activeTab === 'kegiatan_mahasiswa') {
        setKegiatanMahasiswaList(await dataService.getKegiatanMahasiswa());
      } else if (activeTab === 'alumni') {
        setAlumniList(await dataService.getAlumni());
      } else if (activeTab === 'statistik_maba') {
        setStatistikMabaList(await dataService.getStatistikMaba());
      } else if (activeTab === 'laboratorium') {
        setLaboratoriumList(await dataService.getLaboratorium());
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
    localStorage.removeItem('mock_prestasi');
    localStorage.removeItem('mock_publikasi_dosen');
    localStorage.removeItem('mock_kegiatan_dosen');
    localStorage.removeItem('mock_kegiatan_mahasiswa');
    localStorage.removeItem('mock_alumni');
    localStorage.removeItem('mock_statistik_maba');
    localStorage.removeItem('mock_laboratorium');
    localStorage.removeItem('mock_kkn_documents');
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
        if (activeModal === 'create') { await dataService.createTaStep(stepForm); triggerToast('Tahapan Tugas Akhir berhasil ditambahkan!'); }
        else if (activeModal === 'edit' && editingId) { await dataService.updateTaStep(editingId, stepForm); triggerToast('Tahapan Tugas Akhir berhasil diperbarui!'); }
      } else if (activeTab === 'prestasi') {
        if (activeModal === 'create') { await dataService.createPrestasi(prestasiForm); triggerToast('Prestasi berhasil ditambahkan!'); }
        else if (activeModal === 'edit' && editingId) { await dataService.updatePrestasi(editingId, prestasiForm); triggerToast('Prestasi berhasil diperbarui!'); }
      } else if (activeTab === 'publikasi_dosen') {
        if (activeModal === 'create') { await dataService.createPublikasiDosen(publikasiForm); triggerToast('Publikasi berhasil ditambahkan!'); }
        else if (activeModal === 'edit' && editingId) { await dataService.updatePublikasiDosen(editingId, publikasiForm); triggerToast('Publikasi berhasil diperbarui!'); }
      } else if (activeTab === 'kegiatan_dosen') {
        if (activeModal === 'create') { await dataService.createKegiatanDosen(kegiatanDosenForm); triggerToast('Kegiatan dosen berhasil ditambahkan!'); }
        else if (activeModal === 'edit' && editingId) { await dataService.updateKegiatanDosen(editingId, kegiatanDosenForm); triggerToast('Kegiatan dosen berhasil diperbarui!'); }
      } else if (activeTab === 'kegiatan_mahasiswa') {
        if (activeModal === 'create') { await dataService.createKegiatanMahasiswa(kegiatanMahasiswaForm); triggerToast('Kegiatan mahasiswa berhasil ditambahkan!'); }
        else if (activeModal === 'edit' && editingId) { await dataService.updateKegiatanMahasiswa(editingId, kegiatanMahasiswaForm); triggerToast('Kegiatan mahasiswa berhasil diperbarui!'); }
      } else if (activeTab === 'alumni') {
        if (activeModal === 'create') { await dataService.createAlumni(alumniForm); triggerToast('Alumni berhasil ditambahkan!'); }
        else if (activeModal === 'edit' && editingId) { await dataService.updateAlumni(editingId, alumniForm); triggerToast('Alumni berhasil diperbarui!'); }
      } else if (activeTab === 'statistik_maba') {
        if (activeModal === 'create') { await dataService.createStatistikMaba(statistikMabaForm); triggerToast('Data statistik berhasil ditambahkan!'); }
        else if (activeModal === 'edit' && editingId) { await dataService.updateStatistikMaba(editingId, statistikMabaForm); triggerToast('Data statistik berhasil diperbarui!'); }
      } else if (activeTab === 'laboratorium') {
        if (activeModal === 'create') { await dataService.createLaboratorium(laboratoriumForm); triggerToast('Laboratorium berhasil ditambahkan!'); }
        else if (activeModal === 'edit' && editingId) { await dataService.updateLaboratorium(editingId, laboratoriumForm); triggerToast('Laboratorium berhasil diperbarui!'); }
      } else if (activeTab === 'kkn_documents') {
        if (activeModal === 'create') { await dataService.createKknDocument(kknDocumentForm); triggerToast('Dokumen KKN berhasil ditambahkan!'); }
        else if (activeModal === 'edit' && editingId) { await dataService.updateKknDocument(editingId, kknDocumentForm); triggerToast('Dokumen KKN berhasil diperbarui!'); }
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
      } else if (activeTab === 'prestasi') {
        await dataService.deletePrestasi(deletingId);
      } else if (activeTab === 'publikasi_dosen') {
        await dataService.deletePublikasiDosen(deletingId);
      } else if (activeTab === 'kegiatan_dosen') {
        await dataService.deleteKegiatanDosen(deletingId);
      } else if (activeTab === 'kegiatan_mahasiswa') {
        await dataService.deleteKegiatanMahasiswa(deletingId);
      } else if (activeTab === 'alumni') {
        await dataService.deleteAlumni(deletingId);
      } else if (activeTab === 'statistik_maba') {
        await dataService.deleteStatistikMaba(deletingId);
      } else if (activeTab === 'laboratorium') {
        await dataService.deleteLaboratorium(deletingId);
      } else if (activeTab === 'kkn_documents') {
        await dataService.deleteKknDocument(deletingId);
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
    setPartnerForm({ name: '', category: 'industri', category_en: 'industri', logo_url: '' });
    setStatForm({ number: '', label: '', label_en: '', sort_order: landingStats.length + 1 });
    setPortfolioForm({ image: '', title: '', medium: '', technique: '', year: '', gridClass: 'col-span-1', sort_order: landingPortfolioItems.length + 1 });
    setDosenForm({ name: '', img_src: '', scopus: '', sinta: '', scholar: '', facebook: '', twitter: '', tiktok: '', instagram: '', category: 'dosen', role: '', role_en: '', expertise: '', expertise_en: '', sort_order: dosenList.length + 1 });
    setCourseForm({ semester: 'I', name: '', name_en: '', credits: 2, sort_order: courses.length + 1, rps_url: '' });
    setPloForm({ code: '', type: '', type_en: '', text: '', text_en: '', sort_order: plos.length + 1 });
    setProfileForm({ title: '', title_en: '', desc: '', desc_en: '', sort_order: profiles.length + 1 });
    setStepForm({ num: '', title: '', title_en: '', desc: '', desc_en: '', sort_order: steps.length + 1 });
    setPrestasiForm({ type: 'prodi', title: '', title_en: '', year: '', desc: '', desc_en: '', host: '', host_en: '', competitor: '', image_url: '', sort_order: prestasiList.length + 1 });
    setPublikasiForm({ title: '', title_en: '', author: '', journal: '', journal_en: '', year: '', category: '', category_en: '', link: '', sort_order: publikasiList.length + 1 });
    setKegiatanDosenForm({ title: '', title_en: '', date_text: '', date_text_en: '', location: '', desc: '', desc_en: '', image_url: '', sort_order: kegiatanDosenList.length + 1 });
    setKegiatanMahasiswaForm({ title: '', title_en: '', date_text: '', date_text_en: '', location: '', desc: '', desc_en: '', image_url: '', sort_order: kegiatanMahasiswaList.length + 1 });
    setAlumniForm({ name: '', class_of: '', class_of_en: '', role: '', company: '', quote: '', quote_en: '', image_url: '', sort_order: alumniList.length + 1 });
    setStatistikMabaForm({ year: '', count: 0, sort_order: statistikMabaList.length + 1 });
    setLaboratoriumForm({ name: '', name_en: '', desc: '', desc_en: '', image_url: '', sort_order: laboratoriumList.length + 1 });
    setKknDocumentForm({ name: '', name_en: '', file_url: '', sort_order: kknDocuments.length + 1 });
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
        name: item.name,
        category: item.category || 'industri',
        category_en: item.category_en || 'industri',
        logo_url: item.logo_url || ''
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
        category: item.category || 'dosen',
        role: item.role || '',
        role_en: item.role_en || '',
        expertise: item.expertise || '',
        expertise_en: item.expertise_en || '',
        sort_order: item.sort_order || 0
      });
    } else if (activeTab === 'kurikulum_courses') {
      setCourseForm({
        semester: item.semester,
        name: item.name,
        name_en: item.name_en || '',
        credits: item.credits,
        sort_order: item.sort_order,
        rps_url: item.rps_url || ''
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
      setStepForm({ num: item.num, title: item.title, title_en: item.title_en || '', desc: item.desc, desc_en: item.desc_en || '', sort_order: item.sort_order });
    } else if (activeTab === 'prestasi') {
      setPrestasiForm({ type: item.type, title: item.title, title_en: item.title_en || '', year: item.year, desc: item.desc, desc_en: item.desc_en || '', host: item.host || '', host_en: item.host_en || '', competitor: item.competitor || '', image_url: item.image_url || '', sort_order: item.sort_order });
    } else if (activeTab === 'publikasi_dosen') {
      setPublikasiForm({ title: item.title, title_en: item.title_en || '', author: item.author, journal: item.journal, journal_en: item.journal_en || '', year: item.year, category: item.category, category_en: item.category_en || '', link: item.link || '', sort_order: item.sort_order });
    } else if (activeTab === 'kegiatan_dosen') {
      setKegiatanDosenForm({ title: item.title, title_en: item.title_en || '', date_text: item.date_text, date_text_en: item.date_text_en || '', location: item.location, desc: item.desc, desc_en: item.desc_en || '', image_url: item.image_url || '', sort_order: item.sort_order });
    } else if (activeTab === 'kegiatan_mahasiswa') {
      setKegiatanMahasiswaForm({ title: item.title, title_en: item.title_en || '', date_text: item.date_text, date_text_en: item.date_text_en || '', location: item.location, desc: item.desc, desc_en: item.desc_en || '', image_url: item.image_url || '', sort_order: item.sort_order });
    } else if (activeTab === 'alumni') {
      setAlumniForm({ name: item.name, class_of: item.class_of, class_of_en: item.class_of_en || '', role: item.role, company: item.company, quote: item.quote, quote_en: item.quote_en || '', image_url: item.image_url || '', sort_order: item.sort_order });
    } else if (activeTab === 'statistik_maba') {
      setStatistikMabaForm({ year: item.year, count: item.count, sort_order: item.sort_order });
    } else if (activeTab === 'laboratorium') {
      setLaboratoriumForm({
        name: item.name,
        name_en: item.name_en || '',
        desc: item.desc,
        desc_en: item.desc_en || '',
        image_url: item.image_url || '',
        sort_order: item.sort_order || 0
      });
    } else if (activeTab === 'kkn_documents') {
      setKknDocumentForm({
        name: item.name,
        name_en: item.name_en || '',
        file_url: item.file_url || '',
        sort_order: item.sort_order || 0
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
        activeSubSection={activeSubSection}
        setActiveSubSection={setActiveSubSection}
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
              category="beranda"
              dosenList={dosenList}
              activeSubSection={activeSubSection}
              setActiveSubSection={setActiveSubSection}
              focusedKey={focusedKey}
              setFocusedKey={setFocusedKey}
              hideHeader={true}
            />
          )}

          {/* VISI & MISI VIEW */}
          {activeTab === 'visi_misi' && (
            <SiteContentTab
              siteContent={siteContents}
              isLoadingData={isLoadingData}
              connectionMode={connectionMode}
              onUpdateContent={handleUpdateSiteContent}
              category="visi_misi"
              dosenList={dosenList}
              activeSubSection={activeSubSection}
              setActiveSubSection={setActiveSubSection}
              focusedKey={focusedKey}
              setFocusedKey={setFocusedKey}
              hideHeader={true}
            />
          )}

          {/* TATA KELOLA VIEW */}
          {activeTab === 'tata_kelola' && (
            <SiteContentTab
              siteContent={siteContents}
              isLoadingData={isLoadingData}
              connectionMode={connectionMode}
              onUpdateContent={handleUpdateSiteContent}
              category="tata_kelola"
              dosenList={dosenList}
              activeSubSection={activeSubSection}
              setActiveSubSection={setActiveSubSection}
              focusedKey={focusedKey}
              setFocusedKey={setFocusedKey}
              hideHeader={true}
            />
          )}

          {/* GLOBAL CONTENT VIEW */}
          {activeTab === 'global_content' && (
            <SiteContentTab
              siteContent={siteContents}
              isLoadingData={isLoadingData}
              connectionMode={connectionMode}
              onUpdateContent={handleUpdateSiteContent}
              category="global"
              dosenList={dosenList}
              activeSubSection={activeSubSection}
              setActiveSubSection={setActiveSubSection}
              focusedKey={focusedKey}
              setFocusedKey={setFocusedKey}
              hideHeader={true}
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
              siteContent={siteContents}
              connectionMode={connectionMode}
              onUpdateContent={handleUpdateSiteContent}
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
              siteContent={siteContents}
              connectionMode={connectionMode}
              onUpdateContent={handleUpdateSiteContent}
            />
          )}

          {/* PRESTASI VIEW */}
          {activeTab === 'prestasi' && (
            <PrestasiTab
              prestasiList={prestasiList}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isLoadingData={isLoadingData}
              openCreateModal={openCreateModal}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
            />
          )}

          {/* PUBLIKASI DOSEN VIEW */}
          {activeTab === 'publikasi_dosen' && (
            <PublikasiDosenTab
              publikasiList={publikasiList}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isLoadingData={isLoadingData}
              openCreateModal={openCreateModal}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
            />
          )}

          {/* KEGIATAN DOSEN VIEW */}
          {activeTab === 'kegiatan_dosen' && (
            <KegiatanDosenTab
              kegiatanList={kegiatanDosenList}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isLoadingData={isLoadingData}
              openCreateModal={openCreateModal}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
            />
          )}

          {/* KEGIATAN MAHASISWA VIEW */}
          {activeTab === 'kegiatan_mahasiswa' && (
            <KegiatanMahasiswaTab
              kegiatanList={kegiatanMahasiswaList}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isLoadingData={isLoadingData}
              openCreateModal={openCreateModal}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
            />
          )}

          {/* ALUMNI VIEW */}
          {activeTab === 'alumni' && (
            <AlumniTab
              alumniList={alumniList}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isLoadingData={isLoadingData}
              openCreateModal={openCreateModal}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
            />
          )}

          {/* STATISTIK MABA VIEW */}
          {activeTab === 'statistik_maba' && (
            <StatistikMabaTab
              statistikList={statistikMabaList}
              isLoadingData={isLoadingData}
              openCreateModal={openCreateModal}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
            />
          )}

          {/* LABORATORIUM VIEW */}
          {activeTab === 'laboratorium' && (
            <LaboratoriumTab
              laboratoriumList={laboratoriumList}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isLoadingData={isLoadingData}
              openCreateModal={openCreateModal}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
            />
          )}

          {/* KKN CONTENT VIEW */}
          {activeTab === 'kkn_content' && (
            <SiteContentTab
              siteContent={siteContents}
              isLoadingData={isLoadingData}
              connectionMode={connectionMode}
              onUpdateContent={handleUpdateSiteContent}
              category="kkn"
              dosenList={dosenList}
              activeSubSection={activeSubSection}
              setActiveSubSection={setActiveSubSection}
              focusedKey={focusedKey}
              setFocusedKey={setFocusedKey}
              hideHeader={true}
            />
          )}

          {/* KKN DOCUMENTS VIEW */}
          {activeTab === 'kkn_documents' && (
            <KknDocumentsTab
              documents={kknDocuments}
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
          prestasiForm={prestasiForm}
          setPrestasiForm={setPrestasiForm}
          publikasiForm={publikasiForm}
          setPublikasiForm={setPublikasiForm}
          kegiatanDosenForm={kegiatanDosenForm}
          setKegiatanDosenForm={setKegiatanDosenForm}
          kegiatanMahasiswaForm={kegiatanMahasiswaForm}
          setKegiatanMahasiswaForm={setKegiatanMahasiswaForm}
          alumniForm={alumniForm}
          setAlumniForm={setAlumniForm}
          statistikMabaForm={statistikMabaForm}
          setStatistikMabaForm={setStatistikMabaForm}
          laboratoriumForm={laboratoriumForm}
          setLaboratoriumForm={setLaboratoriumForm}
          kknDocumentForm={kknDocumentForm}
          setKknDocumentForm={setKknDocumentForm}
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
