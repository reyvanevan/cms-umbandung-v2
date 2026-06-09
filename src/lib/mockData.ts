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
    title: 'Pameran Kriya Nusantara 2026 Menampilkan Karya Mahasiswa UMB',
    title_en: 'Archipelago Craft Exhibition 2026 Showcases UMB Student Artworks',
    category: 'Pameran',
    category_en: 'Exhibition',
    snippet: 'Mahasiswa Kriya Tekstil dan Fashion UMB Bandung memukau pengunjung dengan instalasi batik kontemporer.',
    snippet_en: 'UMB Bandung Craft Textile and Fashion students wowed visitors with contemporary batik installations.',
    date: '12 Mei 2026',
    img_src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    title: 'Kolaborasi Eksklusif Prodi KTF dengan Industri Tekstil Jawa Barat',
    title_en: 'Exclusive Collaboration between KTF Department and West Java Textile Industry',
    category: 'Kerjasama',
    category_en: 'Collaboration',
    snippet: 'Program magang industri baru yang menghubungkan mahasiswa langsung dengan pabrik tenun tradisional.',
    snippet_en: 'New industrial internship program linking students directly with traditional weaving mills.',
    date: '28 Apr 2026',
    img_src: 'https://images.unsplash.com/photo-1558278224-5db3792d47d5?q=80&w=600&auto=format&fit=crop',
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const initialEvents: DbEvent[] = [
  {
    id: '1',
    date_day: '18',
    date_month: 'JUN',
    title: 'Workshop Desain Tekstil Digital',
    title_en: 'Digital Textile Design Workshop',
    location: 'Lab Komputer Kampus UMB',
    location_en: 'UMB Campus Computer Lab',
    created_at: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    date_day: '05',
    date_month: 'JUL',
    title: 'Fashion Show Tahunan "Eco-Future"',
    title_en: 'Annual Fashion Show "Eco-Future"',
    location: 'Aula Utama Universitas Muhammadiyah Bandung',
    location_en: 'Main Hall of Universitas Muhammadiyah Bandung',
    created_at: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const initialTestimonials: DbTestimonial[] = [
  {
    id: '1',
    testimonial: 'Kuliah di KTF UMB Bandung memberikan saya kebebasan mengeksplorasi teknik tenun tradisional dengan sentuhan teknologi modern.',
    testimonial_en: 'Studying at KTF UMB Bandung gave me the freedom to explore traditional weaving techniques with a modern tech touch.',
    by: 'Sarah Amalia, Alumni 2024',
    by_en: 'Sarah Amalia, Alumni 2024',
    img_src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    created_at: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const initialPartners: DbPartner[] = [
  { id: '1', name: 'PT Gistex', created_at: new Date().toISOString() },
  { id: '2', name: 'Badan Ekonomi Kreatif (Bekraf)', created_at: new Date().toISOString() },
  { id: '3', name: 'Dewan Kerajinan Nasional Daerah (Dekranasda) Jabar', created_at: new Date().toISOString() }
];

const initialLandingStats: DbLandingStat[] = [
  { id: '1', number: '95%', label: 'Tingkat Keterserapan Lulusan', sort_order: 1 },
  { id: '2', number: '15+', label: 'Mitra Industri Aktif', sort_order: 2 },
  { id: '3', number: '250+', label: 'Karya Mahasiswa Terpublikasi', sort_order: 3 },
  { id: '4', number: '5', label: 'Laboratorium & Studio Kriya', sort_order: 4 }
];

const initialLandingPartners: DbLandingPartner[] = [
  { id: '1', name: 'Gistex Textile', sort_order: 1 },
  { id: '2', name: 'Hijab Chic', sort_order: 2 },
  { id: '3', name: 'Rabbani', sort_order: 3 },
  { id: '4', name: 'C59 Sablon', sort_order: 4 }
];

const initialLandingPortfolioItems: DbLandingPortfolioItem[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
    title: 'Tenun Ikat Indigo Modern',
    medium: 'Serat Alam & Pewarna Alami',
    technique: 'Tenun Gedogan',
    year: '2025',
    gridClass: 'col-span-2 row-span-2',
    sort_order: 1
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1524295988556-47a82da2fe04?q=80&w=600&auto=format&fit=crop',
    title: 'Ecoprint Kanvas Flora',
    medium: 'Katun Kanvas',
    technique: 'Steaming Ecoprint',
    year: '2025',
    gridClass: 'col-span-1 row-span-1',
    sort_order: 2
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop',
    title: 'Busana Avant-Garde "Rekonstruksi"',
    medium: 'Linen & Benang Katun',
    technique: 'Macrame & Tailoring',
    year: '2026',
    gridClass: 'col-span-1 row-span-2',
    sort_order: 3
  }
];

const initialSiteContent: DbSiteContent[] = [
  {
    key: 'hero_title',
    value: 'Kriya Tekstil dan Fashion UMB Bandung',
    value_en: 'Craft Textile and Fashion UMB Bandung',
    updated_at: new Date().toISOString()
  },
  {
    key: 'hero_subtitle',
    value: 'Pusat Keunggulan Pendidikan Seni Kriya dan Fashion Berbasis Nilai Islam & Kearifan Lokal.',
    value_en: 'Center of Excellence for Craft & Fashion Education based on Islamic Values & Local Wisdom.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kaprodi_welcome',
    value: 'Selamat datang di Program Studi Kriya Tekstil dan Fashion Universitas Muhammadiyah Bandung. Kami berkomitmen mencetak desainer kreatif dan akademisi tangguh yang siap menjawab tantangan industri kreatif global.',
    value_en: 'Welcome to the Craft Textile and Fashion Program at Universitas Muhammadiyah Bandung. We are committed to producing creative designers and resilient academics ready to meet global creative industry challenges.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kaprodi_name',
    value: 'Dra. Hajah Hindun, M.Sn.',
    value_en: 'Dra. Hajah Hindun, M.Sn.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kaprodi_title',
    value: 'Ketua Program Studi KTF',
    value_en: 'Head of KTF Department',
    updated_at: new Date().toISOString()
  },
  {
    key: 'philosophy_title',
    value: 'Filosofi Desain Kami',
    value_en: 'Our Design Philosophy',
    updated_at: new Date().toISOString()
  },
  {
    key: 'philosophy_body',
    value: 'Kami percaya bahwa kriya bukan sekadar kerajinan tangan, melainkan jembatan antara identitas budaya dan estetika masa depan. Kurikulum kami menyatukan kelestarian ekologi dengan eksperimen material baru.',
    value_en: 'We believe that craft is not just handicraft, but a bridge between cultural identity and future aesthetics. Our curriculum integrates ecological sustainability with new material experimentation.',
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
