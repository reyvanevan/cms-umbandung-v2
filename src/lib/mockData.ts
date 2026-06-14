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
  label_en?: string;
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

export interface DbDosen {
  id: string;
  name: string;
  img_src: string | null;
  scopus: string | null;
  sinta: string | null;
  scholar: string | null;
  facebook: string | null;
  twitter: string | null;
  tiktok: string | null;
  instagram: string | null;
  category: 'dosen' | 'karyawan_laboran';
  role: string | null;
  role_en: string | null;
  expertise: string | null;
  expertise_en: string | null;
  sort_order: number;
  created_at: string;
}

export interface DbKurikulumCourse {
  id: string;
  semester: string;
  name: string;
  name_en: string | null;
  credits: number;
  sort_order: number;
  rps_url?: string | null;
  created_at: string;
}

export interface DbKurikulumPlo {
  id: string;
  code: string;
  type: string;
  type_en: string | null;
  text: string;
  text_en: string | null;
  sort_order: number;
  created_at: string;
}

export interface DbKurikulumProfile {
  id: string;
  title: string;
  title_en: string | null;
  desc: string;
  desc_en: string | null;
  sort_order: number;
  created_at: string;
}

export interface DbTaStep {
  id: string;
  num: string;
  title: string;
  title_en: string | null;
  desc: string;
  desc_en: string | null;
  sort_order: number;
  created_at: string;
}

export interface DbPrestasi {
  id: string;
  type: 'prodi' | 'mahasiswa';
  title: string;
  title_en: string | null;
  year: string;
  desc: string;
  desc_en: string | null;
  host: string | null;
  host_en: string | null;
  competitor: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface DbPublikasiDosen {
  id: string;
  title: string;
  title_en: string | null;
  author: string;
  journal: string;
  journal_en: string | null;
  year: string;
  category: string;
  category_en: string | null;
  link: string | null;
  sort_order: number;
  created_at: string;
}

export interface DbKegiatanDosen {
  id: string;
  title: string;
  title_en: string | null;
  date_text: string;
  date_text_en: string | null;
  location: string;
  desc: string;
  desc_en: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface DbKegiatanMahasiswa {
  id: string;
  title: string;
  title_en: string | null;
  date_text: string;
  date_text_en: string | null;
  location: string;
  desc: string;
  desc_en: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface DbAlumni {
  id: string;
  name: string;
  class_of: string;
  class_of_en: string | null;
  role: string;
  company: string;
  quote: string;
  quote_en: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface DbStatistikMaba {
  id: string;
  year: string;
  count: number;
  sort_order: number;
  created_at: string;
}


const initialDosen: DbDosen[] = [
  {
    id: 'dosen-1',
    name: 'Dra. Saftiyaningsih Ken Atik, M.Ds.',
    img_src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
    scopus: '-',
    sinta: '6704890',
    scholar: '#',
    facebook: '#',
    twitter: '#',
    tiktok: '#',
    instagram: '#',
    category: 'dosen',
    role: 'Dosen Utama',
    role_en: 'Senior Lecturer',
    expertise: 'Analisis Sensori & Pengolahan Pangan',
    expertise_en: 'Sensory Analysis & Food Processing',
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'dosen-2',
    name: 'Dr. Komarudin Kudiya, S.IP., M.Ds.',
    img_src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop',
    scopus: '-',
    sinta: '6640055',
    scholar: '#',
    facebook: '#',
    twitter: '#',
    tiktok: '#',
    instagram: '#',
    category: 'dosen',
    role: 'Dosen Utama',
    role_en: 'Senior Lecturer',
    expertise: 'Mikrobiologi Pangan & Bioteknologi',
    expertise_en: 'Food Microbiology & Biotechnology',
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 'dosen-3',
    name: 'Ghaida Nasya Putri, S.Ds., M.Ds.',
    img_src: 'https://images.unsplash.com/photo-1580894732444-8fecef2271ff?q=80&w=300&auto=format&fit=crop',
    scopus: '-',
    sinta: '6042313',
    scholar: '#',
    facebook: '#',
    twitter: '#',
    tiktok: '#',
    instagram: '#',
    category: 'dosen',
    role: 'Dosen Lektor',
    role_en: 'Lecturer',
    expertise: 'Keamanan Pangan & Sanitasi Industri',
    expertise_en: 'Food Safety & Industrial Sanitation',
    sort_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: 'staff-1',
    name: 'Asep Setiawan, A.Md.',
    img_src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop',
    scopus: '-',
    sinta: '-',
    scholar: '-',
    facebook: '#',
    twitter: '#',
    tiktok: '#',
    instagram: '#',
    category: 'karyawan_laboran',
    role: 'Laboran Teknologi Pangan',
    role_en: 'Food Technology Lab Assistant',
    expertise: null,
    expertise_en: null,
    sort_order: 4,
    created_at: new Date().toISOString()
  }
];

// Initial mock datasets
const initialNews: DbNews[] = [
  {
    id: '1',
    title: 'Workshop Pengolahan Pangan Higienis untuk Pengrajin Tempe Lokal',
    title_en: 'Hygienic Food Processing Workshop for Local Tempeh Artisans',
    category: 'Pengabdian Masyarakat',
    category_en: 'Community Service',
    snippet: 'Dosen dan mahasiswa Teknologi Pangan UMB menyelenggarakan workshop pemanfaatan bioteknologi tempe lokal untuk meningkatkan nilai jual produk UMKM.',
    snippet_en: 'UMB Food Technology lecturers and students host a workshop on local food biotechnology utilization to increase local MSME product value.',
    date: '02 Jun 2026',
    img_src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    title: 'Tim Mahasiswa Teknologi Pangan UMB Raih Juara I Inovasi Pangan Nasional',
    title_en: 'UMB Food Technology Student Team Wins 1st Place in National Food Innovation Competition',
    category: 'Prestasi Mahasiswa',
    category_en: 'Student Achievement',
    snippet: 'Mengusung tema Zero Waste Food Processing dengan teknik fermentasi modern, karya mahasiswa angkatan 2024 berhasil memukau dewan juri.',
    snippet_en: 'With a Zero Waste Food Processing theme using modern fermentation, the project by class of 2024 students wowed the jury.',
    date: '28 Mei 2026',
    img_src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop',
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    title: 'Kolaborasi Riset Pangan Halal Bersama Asosiasi Teknologi Pangan',
    title_en: 'Halal Food Research Collaboration with Food Technology Association',
    category: 'Kolaborasi Riset',
    category_en: 'Research Collaboration',
    snippet: 'Program studi resmi menandatangani kerjasama riset pengembangan bahan pengemas biodegradable dari pati umbi lokal.',
    snippet_en: 'The study program officially signed a research partnership for biodegradable packaging development from local tuber starch.',
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
    title: 'EXPO PANGAN 2026: Capstone Exhibition & Food Innovation Show UMB',
    title_en: 'EXPO PANGAN 2026: Capstone Exhibition & Food Innovation Show UMB',
    location: 'Aula Utama KH. Ahmad Dahlan, UMB Bandung',
    location_en: 'KH. Ahmad Dahlan Main Hall, UMB Bandung',
    created_at: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    date_day: '25',
    date_month: 'JUN',
    title: 'Workshop Sertifikasi Halal: Sistem Jaminan Produk Halal',
    title_en: 'Halal Certification Workshop: Halal Product Assurance System',
    location: 'Laboratorium Pangan Gedung UMB',
    location_en: 'UMB Building Food Laboratory',
    created_at: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    date_day: '05',
    date_month: 'JUL',
    title: 'Kuliah Umum: Tren Ketahanan Pangan & Biorefinery Sirkular Global',
    title_en: 'Public Lecture: Food Security & Circular Biorefinery Trends in Global Era',
    location: 'Auditorium Utama UMB Bandung',
    location_en: 'UMB Bandung Main Auditorium',
    created_at: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const initialTestimonials: DbTestimonial[] = [
  {
    id: '1',
    testimonial: 'Materi kurikulum yang berfokus pada processing & food safety serta entrepreneurship sangat relevan dengan industri pangan saat ini.',
    testimonial_en: 'Curriculum material focusing on processing & food safety and entrepreneurship is highly relevant to current food industry needs.',
    by: 'Andini Kusuma, S.T.P. (Quality Assurance at Indofood)',
    by_en: 'Andini Kusuma, S.T.P. (Quality Assurance at Indofood)',
    img_src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    testimonial: 'Magang di pabrik pangan terkemuka memberikan saya kesempatan berjejaring langsung dengan praktisi industri nasional sejak kuliah.',
    testimonial_en: 'Interning at leading food factories gave me the opportunity to network directly with national industry practitioners since college.',
    by: 'Rian Hidayat, S.T.P. (Production Manager at Garudafood)',
    by_en: 'Rian Hidayat, S.T.P. (Production Manager at Garudafood)',
    img_src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    created_at: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    testimonial: 'Teknologi Pangan UMB benar-benar mengasah kemampuan berpikir kreatif dan kepekaan ilmiah terhadap produk-produk pangan Nusantara.',
    testimonial_en: 'Food Technology UMB really sharpens creative thinking skills and scientific sensitivity towards Nusantara food products.',
    by: 'Melati Indah, S.T.P. (Food Innovator & Founder of HealthyFood)',
    by_en: 'Melati Indah, S.T.P. (Food Innovator & Founder of HealthyFood)',
    img_src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    created_at: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const initialPartners: DbPartner[] = [
  { id: '1', name: 'Perhimpunan Ahli Teknologi Pangan Indonesia (PATPI)', created_at: new Date().toISOString() },
  { id: '2', name: 'PT Indofood CBP Sukses Makmur', created_at: new Date().toISOString() },
  { id: '3', name: 'PT Garudafood Putra Putri Jaya', created_at: new Date().toISOString() },
  { id: '4', name: 'Asosiasi Industri Pangan Halal (AIPH)', created_at: new Date().toISOString() },
  { id: '5', name: 'Masyarakat Standardisasi Pangan (MSP)', created_at: new Date().toISOString() },
  { id: '6', name: 'Ikatan Alumni Teknologi Pangan (IKA-TP)', created_at: new Date().toISOString() }
];

const initialLandingStats: DbLandingStat[] = [
  { id: '1', number: '95%', label: 'Keterserapan Lulusan di Industri Pangan', label_en: 'Graduate Employment Rate in Food Industry', sort_order: 1 },
  { id: '2', number: '30+', label: 'Mitra Industri Pangan & Instansi', label_en: 'Food Industry & Agency Partners', sort_order: 2 },
  { id: '3', number: '200+', label: 'Riset & Produk Pangan Mahasiswa Terpublikasi', label_en: 'Published Student Food Products & Research', sort_order: 3 },
  { id: '4', number: '6', label: 'Laboratorium Teknologi, Mikrobiologi, & Sensori Pangan', label_en: 'Food Tech, Microbiology, & Sensory Labs', sort_order: 4 }
];

const initialLandingPartners: DbLandingPartner[] = [
  { id: '1', name: 'PT Garudafood Putra Putri Jaya', sort_order: 1 },
  { id: '2', name: 'PT Indofood CBP Sukses Makmur', sort_order: 2 },
  { id: '3', name: 'Perhimpunan Ahli Teknologi Pangan Indonesia (PATPI)', sort_order: 3 },
  { id: '4', name: 'Asosiasi Industri Pangan Halal (AIPH)', sort_order: 4 },
  { id: '5', name: 'Masyarakat Standardisasi Pangan (MSP)', sort_order: 5 },
  { id: '6', name: 'Ikatan Alumni Teknologi Pangan (IKA-TP)', sort_order: 6 }
];

const initialLandingPortfolioItems: DbLandingPortfolioItem[] = [
  {
    id: '1',
    image: '/assets/portfolio-organic-gown.jpg',
    title: 'Analog Rice from Local Tubers',
    medium: 'Cassava & Sweet Potato',
    technique: 'Developer: Naila Putri',
    year: 'Juara I // Inovasi Pangan Nasional',
    gridClass: 'col-span-2 row-span-2',
    sort_order: 1
  },
  {
    id: '2',
    image: '/assets/portfolio-songket.jpg',
    title: 'Probiotic Beverage from Local Fruits',
    medium: 'Fermented Mango & Pineapple',
    technique: 'Developer: Daniel Wijaya',
    year: 'Karya Terbaik // Exhibition ITB',
    gridClass: 'col-span-1 row-span-1',
    sort_order: 2
  },
  {
    id: '3',
    image: '/assets/portfolio-ikat-jacket.jpg',
    title: 'Biodegradable Edible Film Packaging',
    medium: 'Starch-Based Eco Packaging',
    technique: 'Developer: Arya Dinata',
    year: 'Proyek Riset // Kementerian Dikti',
    gridClass: 'col-span-1 row-span-2',
    sort_order: 3
  },
  {
    id: '4',
    image: '/assets/portfolio-batik.jpg',
    title: 'High-Protein Tempeh Snack Bar',
    medium: 'Tempeh & Oats Blend',
    technique: 'Developer: Ryu Hansen',
    year: 'Karya Inovatif // Global Health',
    gridClass: 'col-span-1 row-span-1',
    sort_order: 4
  },
  {
    id: '5',
    image: '/assets/portfolio-ready-to-wear.jpg',
    title: 'Instant Halal Bone Broth Powder',
    medium: 'Halal Organic Beef Bone',
    technique: 'Developer: Farah Amalia',
    year: 'Finalis // Indonesian Young Inventor',
    gridClass: 'col-span-2 row-span-1',
    sort_order: 5
  }
];

export const initialSiteContent: DbSiteContent[] = [
  {
    key: 'footer_email',
    value: 'tpangan@umbandung.ac.id',
    value_en: 'tpangan@umbandung.ac.id',
    updated_at: new Date().toISOString()
  },
  {
    key: 'footer_phone',
    value: '+62 812-3456-7890',
    value_en: '+62 812-3456-7890',
    updated_at: new Date().toISOString()
  },
  {
    key: 'footer_address',
    value: 'Gedung K.H. Ahmad Dahlan, Lantai 4, Jl. Soekarno-Hatta No. 752, Bandung 40286',
    value_en: 'K.H. Ahmad Dahlan Building, 4th Floor, Jl. Soekarno-Hatta No. 752, Bandung 40286',
    updated_at: new Date().toISOString()
  },
  {
    key: 'footer_work_hours',
    value: 'Senin - Jumat | 08:00 - 16:00 WIB',
    value_en: 'Monday - Friday | 08:00 - 16:00 WIB',
    updated_at: new Date().toISOString()
  },
  {
    key: 'footer_social_instagram',
    value: 'https://instagram.com/tpangan.umbandung',
    value_en: 'https://instagram.com/tpangan.umbandung',
    updated_at: new Date().toISOString()
  },
  {
    key: 'footer_social_youtube',
    value: 'https://youtube.com/@tpangan.umbandung',
    value_en: 'https://youtube.com/@tpangan.umbandung',
    updated_at: new Date().toISOString()
  },
  {
    key: 'footer_social_whatsapp',
    value: '',
    value_en: '',
    updated_at: new Date().toISOString()
  },
  {
    key: 'footer_social_linkedin',
    value: '',
    value_en: '',
    updated_at: new Date().toISOString()
  },
  {
    key: 'footer_social_univ',
    value: 'https://umbandung.ac.id',
    value_en: 'https://umbandung.ac.id',
    updated_at: new Date().toISOString()
  },
  {
    key: 'hero_title',
    value: 'Teknologi Pangan UMB',
    value_en: 'Food Technology UMB',
    updated_at: new Date().toISOString()
  },
  {
    key: 'hero_subtitle',
    value: 'Mengembangkan Inovasi Pangan Halal, Aman, dan Bergizi Berbasis Nilai Islam & Kearifan Lokal.',
    value_en: 'Developing Halal, Safe, and Nutritious Food Innovations based on Islamic Values & Local Wisdom.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'hero_video_url',
    value: 'https://www.youtube.com/watch?v=12ER7lJyZOc&feature=youtu.be',
    value_en: 'https://www.youtube.com/watch?v=12ER7lJyZOc&feature=youtu.be',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kaprodi_welcome',
    value: 'Selamat datang di portal resmi Program Studi S1 Teknologi Pangan Universitas Muhammadiyah Bandung. Kami berkomitmen untuk menghasilkan lulusan yang unggul, profesional, dan berjiwa wirausaha di bidang teknologi pengolahan pangan, keamanan pangan, serta jaminan produk halal.',
    value_en: 'Welcome to the official portal of the S1 Program in Food Technology at Universitas Muhammadiyah Bandung. We are committed to shaping graduates who are excellent, professional, and entrepreneurial in food processing technology, food safety, and halal product assurance.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kaprodi_welcome_p2',
    value: 'Fokus pengembangan kami terletak pada integrasi sains pangan modern dengan pemanfaatan sumber daya pangan lokal Nusantara sebagai fondasi inovasi produk pangan berkelanjutan.',
    value_en: 'Our development focus lies in integrating modern food science with Nusantara local food resources as the foundation of sustainable food product innovations.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kaprodi_photo_url',
    value: '/assets/kaprodi.png',
    value_en: '/assets/kaprodi.png',
    updated_at: new Date().toISOString()
  },
  {
    key: 'logo_prodi_url',
    value: '',
    value_en: '',
    updated_at: new Date().toISOString()
  },
  {
    key: 'hero_bg_url',
    value: '/assets/hero-mono-stigma.png',
    value_en: '/assets/hero-mono-stigma.png',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kaprodi_name',
    value: 'Dr. Khairiah, S.P., M.T.',
    value_en: 'Dr. Khairiah, S.P., M.T.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kaprodi_title',
    value: 'Ketua Program Studi Teknologi Pangan',
    value_en: 'Head of Food Technology Department',
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
    value: 'Kami percaya bahwa teknologi pangan bukan hanya tentang proses pengolahan, melainkan tentang menjamin keamanan pangan, ketersediaan gizi, keberlanjutan sumber daya, serta kehalalan bagi masyarakat.',
    value_en: 'We believe that food technology is not just about processing, but about ensuring food safety, nutritional availability, resource sustainability, and halal compliance for society.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'visi_misi_vision',
    value: 'Menjadi program studi unggul dan inovatif dalam mengembangkan keilmuan sains dan teknologi pangan halal berbasis keanekaragaman pangan Nusantara melalui sistem biorefinery sirkular berkelanjutan guna menghasilkan lulusan profesional dan teknopreneur berkarakter islami yang berdaya saing global dan berdampak luas bagi masyarakat.',
    value_en: 'To become a leading and innovative study program in developing halal food science and technology based on Nusantara food biodiversity through sustainable circular biorefinery systems to produce professional graduates and technopreneurs with Islamic character who are globally competitive and have a broad impact on society.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'visi_misi_missions',
    value: 'Menyelenggarakan pendidikan dan pengajaran berkualitas di bidang sains dan teknologi pangan lokal, kehalalan pangan, sistem biorefinery sirkular berkelanjutan, dan teknopreneur dalam menghasilkan lulusan yang berkarakter islami.\nMenyelenggarakan penelitian di bidang sains dan teknologi pangan yang inovatif, berfokus pada eksplorasi berbasis keanekaragaman pangan Nusantara melalui sistem biorefinery sirkular berkelanjutan untuk menghasilkan produk pangan yang aman, bermutu, dan halal, serta berdampak pada masyarakat.\nMelaksanakan pengabdian kepada masyarakat melalui hilirisasi hasil riset, penyampaian pengetahuan ilmiah, dan penerapan sistem biorefinery sirkular berkelanjutan untuk menyelesaikan permasalahan pangan dan meningkatkan kesejahteraan masyarakat.\nMengintegrasikan nilai-nilai Al-Islam dan Kemuhammadiyahan secara menyeluruh dalam setiap kegiatan pendidikan, penelitian, dan pengabdian kepada masyarakat.',
    value_en: 'Deliver high-quality education and teaching in the field of local food science and technology, food halality, sustainable circular biorefinery systems, and technopreneurship to produce graduates with Islamic character.\nConduct research in innovative food science and technology, focusing on exploration based on Nusantara food biodiversity through sustainable circular biorefinery systems to produce safe, high-quality, and halal food products that impact society.\nImplement community service through downstreaming of research results, delivery of scientific knowledge, and application of sustainable circular biorefinery systems to solve food problems and improve community welfare.\nIntegrate Al-Islam and Kemuhammadiyahan values thoroughly in all education, research, and community service activities.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'visi_misi_goals',
    value: 'Kompetensi & Profesionalisme Pangan // Menghasilkan lulusan sarjana Teknologi Pangan yang kompeten, profesional, berdaya saing, dan berkarakter Islami yang mampu mengintegrasikan sains dan teknologi pangan lokal melalui sistem biorefinery sirkular berkelanjutan.\nRiset & Inovasi Pangan Lokal // Menghasilkan penelitian inovatif di bidang sains dan rekayasa teknologi pangan yang berorientasi pada eksplorasi berbasis keanekaragaman pangan Nusantara melalui sistem biorefinery sirkular berkelanjutan dalam pengembangan inovasi pangan lokal yang aman, bermutu, dan halal.\nSolusi Kemasyarakatan & Kesejahteraan // Memberikan solusi nyata atas permasalahan di bidang pangan, keamanan pangan, dan gizi yang berdampak pada peningkatan taraf hidup dan kesejahteraan masyarakat melalui penerapan sistem biorefinery sirkular berkelanjutan.\nKarakter Islami & Teknopreneur // Menghasilkan lulusan yang berkarakter Islami, berakhlak karimah, dan berjiwa teknopreneur.',
    value_en: 'Food Competency & Professionalism // Produce competent, professional, competitive Food Technology graduates with Islamic character who are able to integrate local food science and technology through sustainable circular biorefinery systems.\nLocal Food Research & Innovation // Produce innovative research in food science and technology engineering oriented towards exploration based on Nusantara food biodiversity through sustainable circular biorefinery systems in developing safe, high-quality, and halal local food innovations.\nCommunity Solutions & Welfare // Provide real solutions to problems in the fields of food, food safety, and nutrition that impact improving living standards and community welfare through the application of sustainable circular biorefinery systems.\nIslamic Character & Technopreneurship // Produce graduates who have Islamic character, noble morals, and a technopreneurial spirit.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'visi_misi_strategies',
    value: 'Penguatan kelembagaan Program Studi Teknologi Pangan Universitas Muhammadiyah Bandung yang berkarakter Islami.\nPeningkatan kualitas dan kuantitas penelitian serta pengabdian kepada masyarakat yang berfokus pada rekayasa teknologi pangan lokal dan halal.\nMeningkatnya kompetensi lulusan Program Studi Teknologi Pangan sebagai teknopreneur, praktisi, auditor, dan regulator pangan.\nPemantapan sarana dan prasarana laboratorium yang mendukung pembelajaran dan inovasi teknologi pangan.\nPembukaan jaringan kerja sama strategis dengan berbagai pihak.',
    value_en: 'Institutional strengthening of the Food Technology Study Program at Universitas Muhammadiyah Bandung with Islamic character.\nEnhancing the quality and quantity of research and community services focusing on local and halal food technology engineering.\nImproving graduates\' competencies as food technopreneurs, practitioners, auditors, and regulators.\nConsolidation of laboratory infrastructure and facilities supporting food technology learning and innovation.\nLaunching strategic collaboration networks with various stakeholders.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'gov_sec_name',
    value: 'Dewi Werdayani, S.Pd., M.Pd.',
    value_en: 'Dewi Werdayani, S.Pd., M.Pd.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'gov_sec_role',
    value: 'Sekretaris Program Studi',
    value_en: 'Secretary of Department',
    updated_at: new Date().toISOString()
  },
  {
    key: 'gov_sec_email',
    value: 'dewi.w@umbandung.ac.id',
    value_en: 'dewi.w@umbandung.ac.id',
    updated_at: new Date().toISOString()
  },
  {
    key: 'gov_sec_photo',
    value: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
    value_en: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
    updated_at: new Date().toISOString()
  },
  {
    key: 'gov_upm_name',
    value: 'Indra Hidayat, S.Ds., M.Sn.',
    value_en: 'Indra Hidayat, S.Ds., M.Sn.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'gov_upm_role',
    value: 'Unit Penjaminan Mutu',
    value_en: 'Quality Assurance Unit',
    updated_at: new Date().toISOString()
  },
  {
    key: 'gov_upm_email',
    value: 'indra.h@umbandung.ac.id',
    value_en: 'indra.h@umbandung.ac.id',
    updated_at: new Date().toISOString()
  },
  {
    key: 'gov_upm_photo',
    value: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
    value_en: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kurikulum_description',
    value: 'Pelajari kurikulum adaptif kami yang dirancang untuk membekali mahasiswa dengan keahlian sains pangan (kimia, mikrobiologi, gizi), teknik pengolahan pangan, sistem jaminan halal, dan kewirausahaan pangan.',
    value_en: 'Explore our adaptive curriculum designed to equip students with expertise in food science (chemistry, microbiology, nutrition), food processing engineering, halal assurance systems, and food entrepreneurship.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kurikulum_internship_desc',
    value: 'Mahasiswa difasilitasi untuk magang industri di berbagai pabrik pangan terkemuka atau lembaga penelitian di bawah skema MBKM hingga 20 SKS.',
    value_en: 'Students are facilitated to intern in leading food industries or research institutions under the MBKM scheme for up to 20 credits.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kurikulum_peo_title',
    value: 'Program Educational Objectives (PEO)',
    value_en: 'Program Educational Objectives (PEO)',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kurikulum_peo_desc',
    value: 'Menghasilkan sarjana Teknologi Pangan yang memiliki kompetensi unggul dalam pengolahan, pengawasan mutu, dan pengembangan produk pangan berbasis sumber daya lokal dengan semangat kewirausahaan.',
    value_en: 'To produce graduates of Food Technology program who possess high competency in food processing, quality control, and food product development based on local resources with entrepreneurial spirit.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kurikulum_plo_title',
    value: 'Program Learning Outcomes (PLO)',
    value_en: 'Program Learning Outcomes (PLO)',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kurikulum_plo_desc',
    value: 'Lulusan mampu menerapkan prinsip sains dan teknologi pangan untuk memecahkan masalah dalam sistem pangan secara berkelanjutan serta mengelola proses produksi pangan yang aman dan halal.',
    value_en: 'Graduates are capable of applying food science and technology principles to solve problems in food systems sustainably and managing safe and halal food production processes.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kurikulum_facility_1_name',
    value: 'Lab Kimia & Biokimia Pangan',
    value_en: 'Food Chemistry & Biochemistry Lab',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kurikulum_facility_1_desc',
    value: 'Fasilitas pengujian kandungan kimia, analisis gizi, dan karakteristik biokimia bahan pangan.',
    value_en: 'Facilities for chemical content testing, nutritional analysis, and biochemical characterization of food ingredients.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kurikulum_facility_2_name',
    value: 'Lab Mikrobiologi & Keamanan Pangan',
    value_en: 'Food Microbiology & Safety Lab',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kurikulum_facility_2_desc',
    value: 'Laboratorium untuk analisis cemaran mikroba, fermentasi makanan, serta pengujian keamanan pangan.',
    value_en: 'Laboratory for microbial contamination analysis, food fermentation, and food safety testing.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kurikulum_facility_3_name',
    value: 'Lab Sensoris & Pengembangan Produk',
    value_en: 'Sensory & Product Development Lab',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kurikulum_facility_3_desc',
    value: 'Ruang uji organoleptik dengan bilik sensoris terstandar untuk pengujian rasa, aroma, warna, dan tekstur.',
    value_en: 'Organoleptic test room with standardized sensory booths for testing taste, aroma, color, and texture.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kurikulum_facility_4_name',
    value: 'Pilot Plant Pengolahan Pangan',
    value_en: 'Food Processing Pilot Plant',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kurikulum_facility_4_desc',
    value: 'Fasilitas pengolahan pangan semi-industri dilengkapi dengan alat pasteurisasi, pengeringan, dan pengemasan.',
    value_en: 'Semi-industrial food processing facility equipped with pasteurization, drying, and packaging tools.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kurikulum_semester_1_2_title',
    value: 'Semester 1-2: Sains Dasar Pangan',
    value_en: 'Semesters 1-2: Basic Food Science',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kurikulum_semester_1_2_desc',
    value: 'Pengantar Teknologi Pangan, Kimia Dasar, Biologi Sel, Fisika Dasar, Matematika, dan Mikrobiologi Dasar.',
    value_en: 'Introduction to Food Technology, General Chemistry, Cell Biology, General Physics, and Basic Microbiology.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kurikulum_semester_3_4_title',
    value: 'Semester 3-4: Kimia & Analisis Pangan',
    value_en: 'Semesters 3-4: Chemistry & Analysis',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kurikulum_semester_3_4_desc',
    value: 'Kimia Pangan, Mikrobiologi Pangan, Analisis Pangan, Satuan Operasi Industri Pangan, dan Biokimia Pangan.',
    value_en: 'Food Chemistry, Food Microbiology, Food Analysis, Unit Operations, and Food Biochemistry.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kurikulum_semester_5_6_title',
    value: 'Semester 5-6: Pengolahan & Pengemasan',
    value_en: 'Semesters 5-6: Processing & Packaging',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kurikulum_semester_5_6_desc',
    value: 'Teknologi Pengolahan Pangan, Keamanan & Sanitasi Pangan, Evaluasi Sensoris, Pengemasan Pangan, dan Magang Industri.',
    value_en: 'Food Processing Technology, Food Safety & Sanitation, Sensory Evaluation, and Industrial Internship Programs.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kurikulum_semester_7_8_title',
    value: 'Semester 7-8: Penjaminan Mutu & Capstone',
    value_en: 'Semesters 7-8: Quality & Capstone',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kurikulum_semester_7_8_desc',
    value: 'Jaminan Mutu Pangan, Perancangan Pabrik Pangan, Kewirausahaan Pangan, Seminar, dan Sidang Tugas Akhir.',
    value_en: 'Food Quality Assurance, Food Plant Design, Food Entrepreneurship, Seminar, and Thesis Defense.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'tugas_akhir_description',
    value: 'Akses panduan akademik, persyaratan kelayakan, alur pengajuan proposal penelitian pangan, serta template Tugas Akhir (Skripsi/Karya Mandiri).',
    value_en: 'Access academic guidelines, prerequisites, research proposals, and templates required to complete your final project (Thesis/Research).',
    updated_at: new Date().toISOString()
  },
  {
    key: 'tugas_akhir_prereq_desc',
    value: 'Telah menempuh minimal 110 SKS, tidak memiliki nilai D/E untuk mata kuliah inti sains pangan, IPK Kumulatif minimal 2.00, serta mengajukan outline proposal penelitian.',
    value_en: 'Successfully completed a minimum of 110 academic credits (SKS), no D/E grades for core food science courses, minimum GPA of 2.00, and submitted a research outline.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kerjasama_description',
    value: 'Membuka peluang kolaborasi industri pangan guna mendukung magang mahasiswa, riset bersama, serta penyerapan karir lulusan.',
    value_en: 'Exploring collaborations with food industries to support student internships, joint research, and professional career transitions.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'info_singkat_degree_title',
    value: 'S.T.P.',
    value_en: 'S.T.P.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'info_singkat_degree_name',
    value: 'Sarjana Teknologi Pangan (S1)',
    value_en: 'Sarjana Teknologi Pangan (S1)',
    updated_at: new Date().toISOString()
  },
  {
    key: 'info_singkat_sks_title',
    value: '144 SKS',
    value_en: '144 SKS',
    updated_at: new Date().toISOString()
  },
  {
    key: 'info_singkat_sks_desc',
    value: 'SKS Perkuliahan dan Praktikum',
    value_en: 'SKS Perkuliahan dan Praktikum',
    updated_at: new Date().toISOString()
  },
  {
    key: 'info_singkat_duration_title',
    value: '4 Tahun',
    value_en: '4 Years',
    updated_at: new Date().toISOString()
  },
  {
    key: 'info_singkat_duration_desc',
    value: '8 Semester Perkuliahan Akademik',
    value_en: '8 Academic Semesters (Fast track available)',
    updated_at: new Date().toISOString()
  }
];

const initialKurikulumCourses: DbKurikulumCourse[] = [
  { id: 'course-1', semester: 'I', name: 'Kimia Dasar', name_en: 'Basic Chemistry', credits: 3, sort_order: 1, created_at: new Date().toISOString() },
  { id: 'course-2', semester: 'I', name: 'Fisika Dasar', name_en: 'Basic Physics', credits: 3, sort_order: 2, created_at: new Date().toISOString() },
  { id: 'course-3', semester: 'I', name: 'Dasar Biologi', name_en: 'Biology Fundamentals', credits: 3, sort_order: 3, created_at: new Date().toISOString() },
  { id: 'course-4', semester: 'II', name: 'Kimia Organik', name_en: 'Organic Chemistry', credits: 3, sort_order: 4, created_at: new Date().toISOString() },
  { id: 'course-5', semester: 'II', name: 'Pengantar Industri Pangan', name_en: 'Food Industry Introduction', credits: 2, sort_order: 5, created_at: new Date().toISOString() },
  { id: 'course-6', semester: 'II', name: 'Biokimia Dasar', name_en: 'Basic Biochemistry', credits: 3, sort_order: 6, created_at: new Date().toISOString() },
  { id: 'course-7', semester: 'III', name: 'Kimia Pangan', name_en: 'Food Chemistry', credits: 3, sort_order: 7, created_at: new Date().toISOString() },
  { id: 'course-8', semester: 'III', name: 'Mikrobiologi Pangan', name_en: 'Food Microbiology', credits: 3, sort_order: 8, created_at: new Date().toISOString() },
  { id: 'course-9', semester: 'III', name: 'Operasi Satuan Industri Pangan', name_en: 'Unit Operations in Food Processing', credits: 3, sort_order: 9, created_at: new Date().toISOString() },
  { id: 'course-10', semester: 'IV', name: 'Analisis Pangan', name_en: 'Food Analysis', credits: 3, sort_order: 10, created_at: new Date().toISOString() },
  { id: 'course-11', semester: 'IV', name: 'Teknologi Pengolahan Pangan I', name_en: 'Food Processing Technology I', credits: 3, sort_order: 11, created_at: new Date().toISOString() },
  { id: 'course-12', semester: 'IV', name: 'Pengemasan & Pelabelan Pangan', name_en: 'Food Packaging & Labeling', credits: 3, sort_order: 12, created_at: new Date().toISOString() },
  { id: 'course-13', semester: 'V', name: 'Manajemen Mutu Pangan', name_en: 'Food Quality Management', credits: 3, sort_order: 13, created_at: new Date().toISOString() },
  { id: 'course-14', semester: 'V', name: 'Teknologi Pengolahan Pangan II', name_en: 'Food Processing Technology II', credits: 3, sort_order: 14, created_at: new Date().toISOString() },
  { id: 'course-15', semester: 'V', name: 'Evaluasi Sensoris Pangan', name_en: 'Food Sensory Evaluation', credits: 3, sort_order: 15, created_at: new Date().toISOString() },
  { id: 'course-16', semester: 'VI', name: 'Bioteknologi Pangan', name_en: 'Food Biotechnology', credits: 3, sort_order: 16, created_at: new Date().toISOString() },
  { id: 'course-17', semester: 'VI', name: 'Rekayasa Proses Pangan', name_en: 'Food Process Engineering', credits: 3, sort_order: 17, created_at: new Date().toISOString() },
  { id: 'course-18', semester: 'VI', name: 'Teknologi Pengolahan Limbah', name_en: 'Waste Treatment Technology', credits: 3, sort_order: 18, created_at: new Date().toISOString() },
  { id: 'course-19', semester: 'VII', name: 'Teknopreneurship Pangan', name_en: 'Food Technopreneurship', credits: 3, sort_order: 19, created_at: new Date().toISOString() },
  { id: 'course-20', semester: 'VII', name: 'Proposal Tugas Akhir', name_en: 'Final Project Proposal', credits: 2, sort_order: 20, created_at: new Date().toISOString() },
  { id: 'course-21', semester: 'VII', name: 'Magang Industri (MBKM)', name_en: 'Industrial Internship (MBKM)', credits: 6, sort_order: 21, created_at: new Date().toISOString() },
  { id: 'course-22', semester: 'VIII', name: 'Sidang Karya & Skripsi Tugas Akhir', name_en: 'Undergrad Thesis & Viva', credits: 6, sort_order: 22, created_at: new Date().toISOString() }
];

const initialKurikulumPlos: DbKurikulumPlo[] = [
  {
    id: 'plo-1',
    code: 'CPL-01',
    type: 'Nilai Islam & Etika',
    type_en: 'Islamic Values & Ethics',
    text: 'Menginternalisasikan nilai-nilai Keislaman, etika profesi, dan prinsip keberlanjutan dalam industri pangan.',
    text_en: 'Incorporate Islamic values, professional ethics, and sustainability principles in food industries.',
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'plo-2',
    code: 'CPL-02',
    type: 'Teori Sains Pangan',
    type_en: 'Food Science Theory',
    text: 'Menguasai konsep kimia pangan, mikrobiologi pangan, analisis pangan, dan prinsip teknik pangan secara mendalam.',
    text_en: 'Master concepts of food chemistry, food microbiology, food analysis, and engineering principles deeply.',
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 'plo-3',
    code: 'CPL-03',
    type: 'Keterampilan Pengolahan',
    type_en: 'Processing & Technical Skills',
    text: 'Mampu merancang sistem pengolahan pangan inovatif yang menjamin keamanan, mutu, dan kehalalan produk berbasis pangan lokal.',
    text_en: 'Design innovative food processing systems that ensure food safety, quality, and halal compliance based on local resources.',
    sort_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: 'plo-4',
    code: 'CPL-04',
    type: 'Food Technopreneurship',
    type_en: 'Food Technopreneurship',
    text: 'Mampu mengidentifikasi peluang pasar dan membangun bisnis pangan mandiri berbasis teknologi pangan berkelanjutan.',
    text_en: 'Identify market opportunities and build independent food business brands based on sustainable food technology.',
    sort_order: 4,
    created_at: new Date().toISOString()
  }
];

const initialKurikulumProfiles: DbKurikulumProfile[] = [
  {
    id: 'prof-1',
    title: 'Quality Assurance & Quality Control (QA/QC) Industri Pangan',
    title_en: 'Food Industry Quality Assurance & Quality Control (QA/QC)',
    desc: 'Profesional yang menjamin bahan baku dan produk pangan akhir memenuhi standar regulasi, keamanan, serta mutu kehalalan.',
    desc_en: 'Professionals who ensure that raw materials and finished food products meet regulatory, safety, and halal quality standards.',
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'prof-2',
    title: 'Spesialis Riset & Pengembangan Produk (R&D)',
    title_en: 'Food Research & Development (R&D) Specialist',
    desc: 'Inovator yang merancang formulasi produk pangan baru, mengoptimalkan proses, dan mengeksplorasi keanekaragaman pangan lokal.',
    desc_en: 'Innovators who design and formulate new food products, optimize processes, and explore local food biodiversity.',
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 'prof-3',
    title: 'Supervisor & Analis Proses Pengolahan Pangan',
    title_en: 'Food Processing Supervisor & Analyst',
    desc: 'Ahli dalam mengawasi lini manufaktur, mengelola alur kerja produksi, dan menganalisis risiko keamanan pada pengolahan pangan.',
    desc_en: 'Experts in supervising manufacturing lines, managing production workflows, and analyzing safety risks in food processing.',
    sort_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: 'prof-4',
    title: 'Teknopreneur Bidang Pangan (Food Entrepreneur)',
    title_en: 'Food Technopreneur',
    desc: 'Wirausahawan yang membangun startup pangan, UMKM, atau jasa konsultan dengan memanfaatkan teknologi pangan halal dan kearifan lokal.',
    desc_en: 'Entrepreneurs who build food startups, small-to-medium enterprises, or consulting services utilizing halal food technology and local wisdom.',
    sort_order: 4,
    created_at: new Date().toISOString()
  }
];

const initialTaSteps: DbTaStep[] = [
  {
    id: 'step-1',
    num: '01',
    title: 'Pengajuan Konsep Penelitian & Proposal',
    title_en: 'Research Concept & Proposal Submission',
    desc: 'Mahasiswa mengajukan draf rencana penelitian pangan beserta outline studi pustaka untuk dievaluasi oleh prodi.',
    desc_en: 'Students submit food research drafts along with a literature review outline to the department for evaluation.',
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'step-2',
    num: '02',
    title: 'Seminar Proposal Penelitian',
    title_en: 'Research Proposal Seminar',
    desc: 'Pemaparan metodologi penelitian, analisis lab, instrumen uji, dan jadwal eksperimen di hadapan dosen penguji.',
    desc_en: 'Presentation of research methodology, lab analysis, testing instruments, and experiment schedule before examiners.',
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 'step-3',
    num: '03',
    title: 'Pengerjaan Laboratorium & Eksperimen',
    title_en: 'Lab Work & Experimentation',
    desc: 'Proses pengujian sampel, analisis kimia/mikrobiologi, uji organoleptik, dan pengolahan data di laboratorium pangan.',
    desc_en: 'Sample testing process, chemical/microbiological analysis, organoleptic trials, and data processing in the food lab.',
    sort_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: 'step-4',
    num: '04',
    title: 'Sidang Tugas Akhir & Diseminasi',
    title_en: 'Undergraduate Thesis Defense & Dissemination',
    desc: 'Pertanggungjawaban hasil penelitian, konsep teoritis, dan pembahasan produk pangan di hadapan dewan penguji.',
    desc_en: 'Defending the completed research, theoretical concepts, and discussion on food products before the board of examiners.',
    sort_order: 4,
    created_at: new Date().toISOString()
  },
  {
    id: 'step-5',
    num: '05',
    title: 'Revisi & Pengarsipan Jurnal/Skripsi',
    title_en: 'Revision & Thesis/Journal Archiving',
    desc: 'Penyempurnaan laporan tertulis dan penyusunan draf naskah publikasi jurnal ilmiah nasional maupun internasional.',
    desc_en: 'Perfecting the written thesis report and drafting publication manuscripts for national or international scientific journals.',
    sort_order: 5,
    created_at: new Date().toISOString()
  }
];

// Initialize localStorage if empty
const initialPrestasi: DbPrestasi[] = [
  { id: 'prestasi-1', type: 'prodi', title: 'Akreditasi BAN-PT Baik Sekali', title_en: "BAN-PT 'Baik Sekali' Accreditation", year: '2024', desc: 'Predikat akreditasi Baik Sekali atas standar mutu pengajaran dan kurikulum sains pangan.', desc_en: "Achieved 'Baik Sekali' accreditation standard for teaching quality and food science curriculum.", host: null, host_en: null, competitor: null, image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600', sort_order: 1, created_at: new Date().toISOString() },
  { id: 'prestasi-2', type: 'mahasiswa', title: 'Juara I Inovasi Pangan Nasional', title_en: '1st Place National Food Innovation Competition', year: '2024', desc: 'Mengembangkan beras analog tinggi protein dengan memanfaatkan umbi-umbian lokal.', desc_en: 'Developed a high-protein analogue rice utilizing local tubers and circular biorefinery processes.', host: 'Perhimpunan Ahli Teknologi Pangan Indonesia (PATPI)', host_en: 'Indonesian Association of Food Technologists (PATPI)', competitor: 'Naila Putri & Tim', image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600', sort_order: 2, created_at: new Date().toISOString() }
];

const initialPublikasiDosen: DbPublikasiDosen[] = [
  { id: 'pub-1', title: 'Eksplorasi Kandungan Gizi dan Masa Simpan Tempe Kemasan Organik', title_en: 'Exploring Nutritional Value and Shelf Life of Organically Packaged Tempeh', author: 'Dr. Khairiah, S.P., M.T.', journal: 'Jurnal Teknologi Pangan Nusantara, Vol. 2 No. 1', journal_en: 'Nusantara Food Technology Journal, Vol. 2 No. 1', year: '2025', category: 'JURNAL NASIONAL', category_en: 'NATIONAL JOURNAL', link: 'https://sinta.kemdiktisaintek.go.id/', sort_order: 1, created_at: new Date().toISOString() },
  { id: 'pub-2', title: 'Penerapan Metode Pengawetan Alami Ekstrak Daun Jambu pada Daging Sapi', title_en: 'Application of Natural Preservation Method of Guava Leaf Extract on Beef', author: 'Ghaida Nasya Putri, S.Ds., M.Ds.', journal: 'Seminar Nasional Sains Pangan (SNSP)', journal_en: 'National Seminar on Food Science (SNSP)', year: '2024', category: 'PROSIDING SEMINAR', category_en: 'SEMINAR PROCEEDINGS', link: 'https://sinta.kemdiktisaintek.go.id/', sort_order: 2, created_at: new Date().toISOString() }
];

const initialKegiatanDosen: DbKegiatanDosen[] = [
  { id: 'kd-1', title: 'Konferensi Teknologi Pangan Internasional 2025', title_en: 'International Food Technology Conference 2025', date_text: '12 Maret 2025', date_text_en: 'March 12, 2025', location: 'Kuala Lumpur, Malaysia', desc: 'Presentasi riset tentang rekayasa proses fermentasi tempe untuk meningkatkan gizi.', desc_en: 'Presented research on tempeh fermentation process engineering to enhance nutrition.', image_url: '/assets/kegiatan-d1.png', sort_order: 1, created_at: new Date().toISOString() },
  { id: 'kd-2', title: 'Pelatihan Pengolahan Pangan Higienis bagi UMKM Kreatif', title_en: 'Hygienic Food Processing Training for Creative MSMEs', date_text: '18 Oktober 2024', date_text_en: 'October 18, 2024', location: 'Soreang, Bandung', desc: 'PKM pelatihan teknis penerapan Hazard Analysis Critical Control Point (HACCP) untuk industri rumah tangga.', desc_en: 'Public service training on implementing HACCP for home industries.', image_url: '/assets/kegiatan-d2.png', sort_order: 2, created_at: new Date().toISOString() }
];

const initialKegiatanMahasiswa: DbKegiatanMahasiswa[] = [
  { id: 'km-1', title: 'EXPO PANGAN 2026: Capstone Exhibition & Food Innovation Show', title_en: 'EXPO PANGAN 2026: Capstone Exhibition & Food Innovation Show', date_text: '24-28 Februari 2026', date_text_en: 'February 24-28, 2026', location: 'Gedung Rektorat UMB, Bandung', desc: 'Pameran kelulusan karya mandiri mahasiswa menampilkan inovasi produk pangan fungsional.', desc_en: 'Graduation portfolio exhibition showcasing student functional food product innovations.', image_url: '/assets/kegiatan-m1.png', sort_order: 1, created_at: new Date().toISOString() },
  { id: 'km-2', title: 'TP Food Camp: Workshop Daur Ulang Limbah Industri Pangan', title_en: 'TP Food Camp: Food Industry Waste Upcycling Workshop', date_text: '14 November 2025', date_text_en: 'November 14, 2025', location: 'Kampus UMB, Bandung', desc: 'Program kerja kemahasiswaan memberikan penyuluhan pemanfaatan ampas tahu menjadi produk bernilai gizi.', desc_en: 'Student body program organizing training to upcycle tofu dregs into nutritious products.', image_url: '/assets/kegiatan-m2.png', sort_order: 2, created_at: new Date().toISOString() }
];

const initialAlumni: DbAlumni[] = [
  { id: 'alumni-1', name: 'Amelia Rahma, S.T.P.', class_of: 'Angkatan 2019', class_of_en: 'Class of 2019', role: 'Quality Control Supervisor', company: 'PT Indofood CBP', quote: 'Di sini saya diajarkan teknologi pengolahan pangan serta sistem jaminan halal secara mendalam.', quote_en: 'Here I was taught food processing technology and halal assurance systems in depth.', image_url: '/assets/alumni-1.png', sort_order: 1, created_at: new Date().toISOString() },
  { id: 'alumni-2', name: 'Risa Fitria, S.T.P.', class_of: 'Angkatan 2019', class_of_en: 'Class of 2019', role: 'R&D Specialist', company: 'Garudafood', quote: 'Integrasi sains pangan dengan bisnis wirausaha memberikan bekal kuat di industri pangan nasional.', quote_en: 'Integrating food science with entrepreneurship gave me a strong edge in the national food industry.', image_url: '/assets/alumni-2.png', sort_order: 2, created_at: new Date().toISOString() }
];

const initialStatistikMaba: DbStatistikMaba[] = [
  { id: 'stat-1', year: '2021', count: 32, sort_order: 1, created_at: new Date().toISOString() },
  { id: 'stat-2', year: '2022', count: 38, sort_order: 2, created_at: new Date().toISOString() },
  { id: 'stat-3', year: '2023', count: 45, sort_order: 3, created_at: new Date().toISOString() },
  { id: 'stat-4', year: '2024', count: 48, sort_order: 4, created_at: new Date().toISOString() },
  { id: 'stat-5', year: '2025', count: 52, sort_order: 5, created_at: new Date().toISOString() }
];


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
  if (!localStorage.getItem('mock_dosen')) {
    localStorage.setItem('mock_dosen', JSON.stringify(initialDosen));
  }
  if (!localStorage.getItem('mock_kurikulum_courses')) {
    localStorage.setItem('mock_kurikulum_courses', JSON.stringify(initialKurikulumCourses));
  }
  if (!localStorage.getItem('mock_kurikulum_plos')) {
    localStorage.setItem('mock_kurikulum_plos', JSON.stringify(initialKurikulumPlos));
  }
  if (!localStorage.getItem('mock_kurikulum_profiles')) {
    localStorage.setItem('mock_kurikulum_profiles', JSON.stringify(initialKurikulumProfiles));
  }
  if (!localStorage.getItem('mock_tugas_akhir_steps')) {
    localStorage.setItem('mock_tugas_akhir_steps', JSON.stringify(initialTaSteps));
  }
  if (!localStorage.getItem('mock_prestasi')) {
    localStorage.setItem('mock_prestasi', JSON.stringify(initialPrestasi));
  }
  if (!localStorage.getItem('mock_publikasi_dosen')) {
    localStorage.setItem('mock_publikasi_dosen', JSON.stringify(initialPublikasiDosen));
  }
  if (!localStorage.getItem('mock_kegiatan_dosen')) {
    localStorage.setItem('mock_kegiatan_dosen', JSON.stringify(initialKegiatanDosen));
  }
  if (!localStorage.getItem('mock_kegiatan_mahasiswa')) {
    localStorage.setItem('mock_kegiatan_mahasiswa', JSON.stringify(initialKegiatanMahasiswa));
  }
  if (!localStorage.getItem('mock_alumni')) {
    localStorage.setItem('mock_alumni', JSON.stringify(initialAlumni));
  }
  if (!localStorage.getItem('mock_statistik_maba')) {
    localStorage.setItem('mock_statistik_maba', JSON.stringify(initialStatistikMaba));
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
