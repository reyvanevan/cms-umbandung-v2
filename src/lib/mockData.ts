export interface DbNews {
  id: string;
  title: string;
  title_en: string | null;
  category: string;
  category_en: string | null;
  snippet: string;
  snippet_en: string | null;
  date: string;
  img_src: string;
  created_at: string;
}

export interface DbEvent {
  id: string;
  date_day: string;
  date_month: string;
  title: string;
  title_en: string | null;
  location: string;
  location_en: string | null;
  created_at: string;
}

export interface DbTestimonial {
  id: string;
  testimonial: string;
  testimonial_en: string | null;
  by: string;
  by_en: string | null;
  img_src: string;
  created_at: string;
}

export interface DbPartner {
  id: string;
  name: string;
  created_at: string;
}

export interface DbSiteContent {
  key: string;
  value: string;
  value_en: string | null;
  updated_at: string;
}

export interface DbLandingStat {
  id: string;
  number: string;
  label: string;
  sort_order: number;
}

export interface DbLandingPartner {
  id: string;
  name: string;
  sort_order: number;
}

export interface DbLandingPortfolioItem {
  id: string;
  image: string;
  title: string;
  medium: string;
  technique: string;
  year: string;
  gridClass: string;
  sort_order: number;
}

// Initial mock datasets
const initialNews: DbNews[] = [
  {
    id: '1',
    title: 'Workshop Cloud Computing & DevOps untuk Komunitas Lokal',
    title_en: 'Cloud Computing & DevOps Workshop for Local Community',
    category: 'Pengabdian Masyarakat',
    category_en: 'Community Service',
    snippet: 'Dosen dan mahasiswa Teknik Informatika UMB menyelenggarakan workshop pemanfaatan layanan cloud open-source untuk digitalisasi UMKM lokal.',
    snippet_en: 'UMB IT lecturers and students host a workshop on open-source cloud services utilization for local MSMEs digitization.',
    date: '02 Jun 2026',
    img_src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    title: 'Tim Mahasiswa Informatika UMB Raih Juara I Hackathon Nasional',
    title_en: 'UMB IT Student Team Wins 1st Place in National Hackathon',
    category: 'Prestasi Mahasiswa',
    category_en: 'Student Achievement',
    snippet: 'Mengusung arsitektur serverless modern dengan sistem antrian pintar, karya mahasiswa angkatan 2024 berhasil memukau dewan juri.',
    snippet_en: 'Using modern serverless architecture with a smart queuing system, the project by class of 2024 students wowed the jury.',
    date: '28 Mei 2026',
    img_src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop',
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    title: 'Kolaborasi Riset Cybersecurity Bersama Asosiasi IT Indonesia',
    title_en: 'Cybersecurity Research Collaboration with Indonesian IT Association',
    category: 'Kolaborasi Riset',
    category_en: 'Research Collaboration',
    snippet: 'Program studi resmi menandatangani kerjasama pengembangan standardisasi keamanan informasi dan sertifikasi kompetensi jaringan.',
    snippet_en: 'The study program officially signed a partnership for information security standardization development and network competency certification.',
    date: '15 Mei 2026',
    img_src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop',
    created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const initialEvents: DbEvent[] = [
  {
    id: '1',
    date_day: '18',
    date_month: 'JUN',
    title: 'INFOTEC 2026: Capstone Project Showcase & IT Career Expo',
    title_en: 'INFOTEC 2026: Capstone Project Showcase & IT Career Expo',
    location: 'Aula Utama KH. Ahmad Dahlan, UMB Bandung',
    location_en: 'KH. Ahmad Dahlan Main Hall, UMB Bandung',
    created_at: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    date_day: '25',
    date_month: 'JUN',
    title: 'Coding Workshop: Building Web Apps with React & Supabase',
    title_en: 'Coding Workshop: Building Web Apps with React & Supabase',
    location: 'Lab Komputasi Gedung UMB',
    location_en: 'UMB Building Computing Lab',
    created_at: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    date_day: '05',
    date_month: 'JUL',
    title: 'Kuliah Umum: Tren Kecerdasan Buatan di Era Komputasi Awan',
    title_en: 'Public Lecture: Artificial Intelligence Trends in the Cloud Computing Era',
    location: 'Auditorium Utama UMB Bandung',
    location_en: 'UMB Bandung Main Auditorium',
    created_at: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const initialTestimonials: DbTestimonial[] = [
  {
    id: '1',
    testimonial: 'Materi kurikulum yang berfokus pada software engineering dan arsitektur modern sangat relevan dengan kebutuhan industri teknologi saat ini.',
    testimonial_en: 'Curriculum material focusing on software engineering and modern architecture is highly relevant to current tech industry needs.',
    by: 'Andini Kusuma, S.Kom (Software Engineer at Tokopedia)',
    by_en: 'Andini Kusuma, S.Kom (Software Engineer at Tokopedia)',
    img_src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    created_at: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    testimonial: 'Program magang laboratorium memberikan saya kesempatan berjejaring langsung dengan praktisi cloud dan devops nasional sejak awal perkuliahan.',
    testimonial_en: 'The lab internship program gave me the opportunity to network directly with national cloud and devops practitioners since the beginning of college.',
    by: 'Rian Hidayat, S.Kom (DevOps Engineer at GoTo)',
    by_en: 'Rian Hidayat, S.Kom (DevOps Engineer at GoTo)',
    img_src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    created_at: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    testimonial: 'Pembekalan portofolio proyek berkala selama perkuliahan sangat mempermudah saya ketika melamar kerja di perusahaan multinasional.',
    testimonial_en: 'Regular project portfolio preparation during college made it very easy for me when applying for jobs at multinational companies.',
    by: 'Sarah Amalia, S.Kom (Technical Product Manager at Shopee)',
    by_en: 'Sarah Amalia, S.Kom (Technical Product Manager at Shopee)',
    img_src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const initialPartners: DbPartner[] = [
  { id: '1', name: 'Asosiasi Telekomunikasi Indonesia', created_at: new Date().toISOString() },
  { id: '2', name: 'Google Developer Groups Bandung', created_at: new Date().toISOString() },
  { id: '3', name: 'PT GoTo Gojek Tokopedia Tbk', created_at: new Date().toISOString() }
];

const initialLandingStats: DbLandingStat[] = [
  { id: '1', number: '98%', label: 'Keterserapan Lulusan di Industri', sort_order: 1 },
  { id: '2', number: '20+', label: 'Mitra Industri & Tech Company', sort_order: 2 },
  { id: '3', number: '150+', label: 'Project Apps Mahasiswa Terpublikasi', sort_order: 3 },
  { id: '4', number: '8', label: 'Laboratorium Komputasi & Riset', sort_order: 4 }
];

const initialLandingPartners: DbLandingPartner[] = [
  { id: '1', name: 'PT GoTo Gojek Tokopedia Tbk', sort_order: 1 },
  { id: '2', name: 'Google Developer Groups Bandung', sort_order: 2 },
  { id: '3', name: 'Asosiasi Telekomunikasi Indonesia', sort_order: 3 }
];

const initialLandingPortfolioItems: DbLandingPortfolioItem[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop',
    title: 'Smart Campus Mobile & Analytics App',
    medium: 'React Native & Node.js',
    technique: 'Developer: Naila Putri',
    year: 'Juara I // Hackathon Nasional',
    gridClass: 'col-span-2 row-span-2',
    sort_order: 1
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop',
    title: 'IoT Automated Greenhouse Controller',
    medium: 'Raspberry Pi & Python',
    technique: 'Developer: Daniel Wijaya',
    year: 'Karya Terbaik // Exhibition ITB',
    gridClass: 'col-span-1 row-span-1',
    sort_order: 2
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop',
    title: 'Decentralized Academic Credentials',
    medium: 'Solidity & Ethereum',
    technique: 'Developer: Arya Dinata',
    year: 'Proyek Riset // Kementerian Dikti',
    gridClass: 'col-span-1 row-span-2',
    sort_order: 3
  }
];

const initialSiteContent: DbSiteContent[] = [
  {
    key: 'hero_title',
    value: 'Teknik Informatika UMB Bandung',
    value_en: 'Informatics Engineering UMB Bandung',
    updated_at: new Date().toISOString()
  },
  {
    key: 'hero_subtitle',
    value: 'Membentuk Software Engineer dan Praktisi Cloud Modern Berbasis Nilai Islam & Inovasi Teknologi.',
    value_en: 'Forming Modern Software Engineers and Cloud Practitioners based on Islamic Values & Tech Innovation.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kaprodi_welcome',
    value: 'Selamat datang di Program Studi Teknik Informatika Universitas Muhammadiyah Bandung. Kami berfokus pada kurikulum modern berbasis proyek nyata, cloud computing, cybersecurity, dan kecerdasan buatan.',
    value_en: 'Welcome to the Informatics Engineering Department of Universitas Muhammadiyah Bandung. We focus on modern curricula based on real projects, cloud computing, cybersecurity, and artificial intelligence.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kaprodi_name',
    value: 'Ir. H. Muhammad Adi, M.T.',
    value_en: 'Ir. H. Muhammad Adi, M.T.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kaprodi_title',
    value: 'Ketua Program Studi Teknik Informatika',
    value_en: 'Head of Informatics Department',
    updated_at: new Date().toISOString()
  },
  {
    key: 'philosophy_title',
    value: 'Filosofi Pembelajaran Kami',
    value_en: 'Our Learning Philosophy',
    updated_at: new Date().toISOString()
  },
  {
    key: 'philosophy_body',
    value: 'Kami percaya bahwa pemrograman bukan hanya tentang mengetik baris kode, melainkan tentang membangun solusi komputasi yang efisien, etis, dan memberikan dampak nyata bagi masyarakat.',
    value_en: 'We believe programming is not just about writing lines of code, but about building efficient, ethical computing solutions that deliver real impact to society.',
    updated_at: new Date().toISOString()
  }
];

// Initialize localStorage if empty
function initStorage() {
  if (!localStorage.getItem('mock_news')) {
    localStorage.setItem('mock_news', JSON.stringify(initialNews));
  }
  if (!localStorage.getItem('mock_events')) {
    localStorage.setItem('mock_events', JSON.stringify(initialEvents));
  }
  if (!localStorage.getItem('mock_testimonials')) {
    localStorage.setItem('mock_testimonials', JSON.stringify(initialTestimonials));
  }
  if (!localStorage.getItem('mock_partners')) {
    localStorage.setItem('mock_partners', JSON.stringify(initialPartners));
  }
  if (!localStorage.getItem('mock_landing_stats')) {
    localStorage.setItem('mock_landing_stats', JSON.stringify(initialLandingStats));
  }
  if (!localStorage.getItem('mock_landing_partners')) {
    localStorage.setItem('mock_landing_partners', JSON.stringify(initialLandingPartners));
  }
  if (!localStorage.getItem('mock_landing_portfolio_items')) {
    localStorage.setItem('mock_landing_portfolio_items', JSON.stringify(initialLandingPortfolioItems));
  }
  if (!localStorage.getItem('mock_site_content')) {
    localStorage.setItem('mock_site_content', JSON.stringify(initialSiteContent));
  }
}

// Run immediately
initStorage();

export const mockDb = {
  // Generic Read
  getAll: <T>(table: string): T[] => {
    initStorage();
    const data = localStorage.getItem(`mock_${table}`);
    return data ? JSON.parse(data) : [];
  },

  // Generic Write
  saveAll: <T>(table: string, items: T[]): void => {
    localStorage.setItem(`mock_${table}`, JSON.stringify(items));
  },

  // Insert Row
  insert: <T>(table: string, row: any): T => {
    initStorage();
    const items = mockDb.getAll<any>(table);
    const newRow = {
      id: row.id || Math.random().toString(36).substring(2, 9),
      created_at: new Date().toISOString(),
      ...row
    };
    items.push(newRow);
    mockDb.saveAll(table, items);
    return newRow as T;
  },

  // Update Row
  update: <T>(table: string, id: string, updates: any, idField: string = 'id'): T | null => {
    initStorage();
    const items = mockDb.getAll<any>(table);
    const index = items.findIndex(item => item[idField] === id);
    if (index === -1) return null;

    items[index] = {
      ...items[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    mockDb.saveAll(table, items);
    return items[index] as T;
  },

  // Delete Row
  delete: (table: string, id: string, idField: string = 'id'): boolean => {
    initStorage();
    const items = mockDb.getAll<any>(table);
    const filtered = items.filter(item => item[idField] !== id);
    if (filtered.length === items.length) return false;
    mockDb.saveAll(table, filtered);
    return true;
  }
};
