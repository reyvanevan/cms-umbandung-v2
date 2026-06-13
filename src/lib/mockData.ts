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
    sort_order: 3,
    created_at: new Date().toISOString()
  }
];

// Initial mock datasets
const initialNews: DbNews[] = [
  {
    id: '1',
    title: 'Workshop Pewarnaan Alami dan Ecoprint untuk Pengrajin Lokal',
    title_en: 'Natural Dye and Ecoprint Workshop for Local Artisans',
    category: 'Pengabdian Masyarakat',
    category_en: 'Community Service',
    snippet: 'Dosen dan mahasiswa Kriya Tekstil dan Fashion UMB menyelenggarakan workshop pemanfaatan zat warna alam lokal untuk meningkatkan nilai jual produk UMKM.',
    snippet_en: 'UMB Textile & Fashion lecturers and students host a workshop on natural dyes utilization to increase local MSME product value.',
    date: '02 Jun 2026',
    img_src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    title: 'Tim Mahasiswa KTF UMB Raih Juara I Fashion Design Competition Nasional',
    title_en: 'UMB KTF Student Team Wins 1st Place in National Fashion Design Competition',
    category: 'Prestasi Mahasiswa',
    category_en: 'Student Achievement',
    snippet: 'Mengusung tema Zero Waste Fashion dengan teknik tenun struktur modern, karya mahasiswa angkatan 2024 berhasil memukau dewan juri.',
    snippet_en: 'With a Zero Waste Fashion theme using modern structural weaving, the project by class of 2024 students wowed the jury.',
    date: '28 Mei 2026',
    img_src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop',
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    title: 'Kolaborasi Riset Serat Alami Bersama Asosiasi Pertekstilan Indonesia',
    title_en: 'Natural Fiber Research Collaboration with Indonesian Textile Association',
    category: 'Kolaborasi Riset',
    category_en: 'Research Collaboration',
    snippet: 'Program studi resmi menandatangani kerjasama riset pengembangan serat pelepah pisang untuk aplikasi tekstil fashion berkelanjutan.',
    snippet_en: 'The study program officially signed a research partnership for banana fiber development in sustainable fashion textiles.',
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
    title: 'TUMPAL 2026: Capstone Exhibition & Fashion Show UMB',
    title_en: 'TUMPAL 2026: Capstone Exhibition & Fashion Show UMB',
    location: 'Aula Utama KH. Ahmad Dahlan, UMB Bandung',
    location_en: 'KH. Ahmad Dahlan Main Hall, UMB Bandung',
    created_at: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    date_day: '25',
    date_month: 'JUN',
    title: 'Workshop Batik & Shibori: Teknik Manipulasi Kain Kontemporer',
    title_en: 'Batik & Shibori Workshop: Contemporary Fabric Manipulation Techniques',
    location: 'Studio Kriya & Desain Gedung UMB',
    location_en: 'UMB Building Craft & Design Studio',
    created_at: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    date_day: '05',
    date_month: 'JUL',
    title: 'Kuliah Umum: Tren Sustainable Fashion & Green Lifestyle di Era Global',
    title_en: 'Public Lecture: Sustainable Fashion & Green Lifestyle Trends in Global Era',
    location: 'Auditorium Utama UMB Bandung',
    location_en: 'UMB Bandung Main Auditorium',
    created_at: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const initialTestimonials: DbTestimonial[] = [
  {
    id: '1',
    testimonial: 'Materi kurikulum yang berfokus pada surface & structure design serta entrepreneurship sangat relevan dengan industri fashion saat ini.',
    testimonial_en: 'Curriculum material focusing on surface & structure design and entrepreneurship is highly relevant to current fashion industry needs.',
    by: 'Andini Kusuma, S.Sn. (Fashion Designer at Cottonink)',
    by_en: 'Andini Kusuma, S.Sn. (Fashion Designer at Cottonink)',
    img_src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    testimonial: 'Magang di studio desainer terkemuka memberikan saya kesempatan berjejaring langsung dengan praktisi mode nasional sejak kuliah.',
    testimonial_en: 'Interning at leading designer studios gave me the opportunity to network directly with national fashion practitioners since college.',
    by: 'Rian Hidayat, S.Sn. (Creative Director at Batik Komar)',
    by_en: 'Rian Hidayat, S.Sn. (Creative Director at Batik Komar)',
    img_src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    created_at: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    testimonial: 'Kriya Tekstil UMB benar-benar mengasah kemampuan berpikir kreatif dan kepekaan estetika terhadap serat-serat alami Nusantara.',
    testimonial_en: 'Textile Craft UMB really sharpens creative thinking skills and aesthetic sensitivity towards Nusantara natural fibers.',
    by: 'Melati Indah, S.Sn. (Textile Artist & Founder of KainSerat)',
    by_en: 'Melati Indah, S.Sn. (Textile Artist & Founder of KainSerat)',
    img_src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    created_at: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const initialPartners: DbPartner[] = [
  { id: '1', name: 'Asosiasi Pertekstilan Indonesia (API)', created_at: new Date().toISOString() },
  { id: '2', name: 'PT Kahatex', created_at: new Date().toISOString() },
  { id: '3', name: 'Rumah Batik Komar', created_at: new Date().toISOString() },
  { id: '4', name: 'Ikatan Perancang Mode Indonesia (IPMI)', created_at: new Date().toISOString() },
  { id: '5', name: 'ASEPHI (Handicraft Association)', created_at: new Date().toISOString() },
  { id: '6', name: 'Ikatan Alumni Kriya Tekstil dan Fashion (IKA-KTF)', created_at: new Date().toISOString() }
];

const initialLandingStats: DbLandingStat[] = [
  { id: '1', number: '95%', label: 'Keterserapan Lulusan di Industri Kreatif', label_en: 'Graduate Employment Rate in Creative Industry', sort_order: 1 },
  { id: '2', number: '30+', label: 'Mitra Industri Tekstil & Fashion', label_en: 'Textile & Fashion Industry Partners', sort_order: 2 },
  { id: '3', number: '200+', label: 'Karya Desain Mahasiswa Terpublikasi', label_en: 'Published Student Design Works', sort_order: 3 },
  { id: '4', number: '6', label: 'Studio Kriya, Batik, & Desain Mode', label_en: 'Craft, Batik, & Fashion Design Studios', sort_order: 4 }
];

const initialLandingPartners: DbLandingPartner[] = [
  { id: '1', name: 'Rumah Batik Komar', sort_order: 1 },
  { id: '2', name: 'PT Kahatex', sort_order: 2 },
  { id: '3', name: 'Asosiasi Pertekstilan Indonesia (API)', sort_order: 3 },
  { id: '4', name: 'Ikatan Perancang Mode Indonesia (IPMI)', sort_order: 4 },
  { id: '5', name: 'ASEPHI (Handicraft Association)', sort_order: 5 },
  { id: '6', name: 'Ikatan Alumni Kriya Tekstil dan Fashion (IKA-KTF)', sort_order: 6 }
];

const initialLandingPortfolioItems: DbLandingPortfolioItem[] = [
  {
    id: '1',
    image: '/assets/portfolio-organic-gown.jpg',
    title: 'Organic Ecoprint Evening Gown',
    medium: 'Cotton & Silk Ecoprint',
    technique: 'Developer: Naila Putri',
    year: 'Juara I // Fashion Show Nasional',
    gridClass: 'col-span-2 row-span-2',
    sort_order: 1
  },
  {
    id: '2',
    image: '/assets/portfolio-songket.jpg',
    title: 'Songket-Inspired Contemporary Jacket',
    medium: 'Handwoven Songket & Linen',
    technique: 'Developer: Daniel Wijaya',
    year: 'Karya Terbaik // Exhibition ITB',
    gridClass: 'col-span-1 row-span-1',
    sort_order: 2
  },
  {
    id: '3',
    image: '/assets/portfolio-ikat-jacket.jpg',
    title: 'Ikat-Weave Modern Trench Coat',
    medium: 'Handwoven Ikat & Cotton',
    technique: 'Developer: Arya Dinata',
    year: 'Proyek Riset // Kementerian Dikti',
    gridClass: 'col-span-1 row-span-2',
    sort_order: 3
  },
  {
    id: '4',
    image: '/assets/portfolio-batik.jpg',
    title: 'Batik Lasem Eco-Friendly Kimono',
    medium: 'Hand-drawn Batik & Tencel',
    technique: 'Developer: Ryu Hansen',
    year: 'Karya Inovatif // Global Health',
    gridClass: 'col-span-1 row-span-1',
    sort_order: 4
  },
  {
    id: '5',
    image: '/assets/portfolio-ready-to-wear.jpg',
    title: 'Ready-to-Wear Streetwear Collection',
    medium: 'Digital Print & Organic Cotton',
    technique: 'Developer: Farah Amalia',
    year: 'Finalis // Indonesian Young Inventor',
    gridClass: 'col-span-2 row-span-1',
    sort_order: 5
  }
];

export const initialSiteContent: DbSiteContent[] = [
  {
    key: 'hero_title',
    value: 'Kriya Tekstil dan Fashion UMB',
    value_en: 'Textile and Fashion Design UMB',
    updated_at: new Date().toISOString()
  },
  {
    key: 'hero_subtitle',
    value: 'Mencetak Creativepreneur dan Desainer Kriya Kontemporer Berbasis Nilai Islam & Kearifan Lokal.',
    value_en: 'Creating Creativepreneurs and Contemporary Craft Designers based on Islamic Values & Local Indigenous.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kaprodi_welcome',
    value: 'Selamat datang di portal resmi Program Studi S1 Kriya Tekstil dan Fashion Universitas Muhammadiyah Bandung. Kami berkomitmen untuk menghasilkan desainer, kriya, dan wirausahawan kreatif masa depan yang menguasai teknik tekstil, desain mode, dan seni kriya kontemporer.',
    value_en: 'Welcome to the official portal of the S1 Program in Textile and Fashion Design at Universitas Muhammadiyah Bandung. We are committed to shaping future designers, crafters, and creative entrepreneurs who master textile techniques, fashion design, and contemporary craft arts.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kaprodi_welcome_p2',
    value: 'Fokus pengembangan kami terletak pada integrasi seni tekstil modern dengan nilai tradisi budaya Nusantara sebagai fondasi inovasi, menciptakan desainer yang peka secara estetis, sosial, dan lingkungan.',
    value_en: 'Our development focus lies in integrating modern textile arts with Nusantara cultural traditions as an innovation foundation, creating designers who are aesthetically, socially, and environmentally sensitive.',
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
    value: 'Dra. Saftiyaningsih Ken Atik, M.Ds.',
    value_en: 'Dra. Saftiyaningsih Ken Atik, M.Ds.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kaprodi_title',
    value: 'Ketua Program Studi Kriya Tekstil dan Fashion',
    value_en: 'Head of Textile and Fashion Design Department',
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
    value: 'Kami percaya bahwa kriya tekstil dan fashion bukan hanya tentang estetika visual, melainkan tentang mengekspresikan nilai budaya, inovasi material yang ramah lingkungan, serta memberikan dampak nyata bagi industri kreatif.',
    value_en: 'We believe that textile craft and fashion are not just about visual aesthetics, but about expressing cultural values, sustainable material innovation, and delivering real impact to the creative industry.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'visi_misi_vision',
    value: 'Menjadi program studi kriya tekstil dan fashion yang unggul dan inovatif dalam pengembangan seni kriya dan desain mode berbasis kearifan lokal Nusantara serta berdaya saing global pada tahun 2030.',
    value_en: 'To become a leading and innovative textile craft and fashion study program in developing craft arts and fashion design based on Nusantara local wisdom with global competitiveness by 2030.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'visi_misi_missions',
    value: 'Menyelenggarakan pendidikan kriya tekstil dan fashion yang berkualitas tinggi dengan mengintegrasikan nilai-nilai Islam dan technopreneurship kreatif.\nMelaksanakan penelitian dan pengabdian masyarakat di bidang kriya dan fashion yang berorientasi pada eksplorasi budaya lokal dan sustainable design.\nMengembangkan kemitraan strategis dengan industri kreatif, galeri seni, dan perancang busana untuk memfasilitasi magang dan karier mahasiswa.',
    value_en: 'Deliver high-quality textile craft and fashion education integrating Islamic values and creative technopreneurship.\nConduct research and community service in craft and fashion oriented towards local cultural exploration and sustainable design.\nDevelop strategic partnerships with creative industries, art galleries, and fashion designers to facilitate student internships and careers.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'visi_misi_goals',
    value: 'Desain Kriya & Mode Kreatif\nEksplorasi Budaya Nusantara\nSustainable & Eco-Fashion\nIslamic Character & Creativepreneurship',
    value_en: 'Creative Craft & Fashion Design\nNusantara Cultural Exploration\nSustainable & Eco-Fashion\nIslamic Character & Creativepreneurship',
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
    key: 'gov_lab_name',
    value: 'Ghaida Nasya Putri, S.Ds., M.Ds.',
    value_en: 'Ghaida Nasya Putri, S.Ds., M.Ds.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'gov_lab_role',
    value: 'Kepala Laboratorium Kriya & Desain',
    value_en: 'Head of Craft & Design Laboratories',
    updated_at: new Date().toISOString()
  },
  {
    key: 'gov_lab_email',
    value: 'ghaida.np@umbandung.ac.id',
    value_en: 'ghaida.np@umbandung.ac.id',
    updated_at: new Date().toISOString()
  },
  {
    key: 'gov_lab_photo',
    value: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop',
    value_en: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop',
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
    value: 'Pelajari kurikulum adaptif kami yang dirancang untuk membekali mahasiswa dengan keahlian surface design (batik, ecoprint, shibori), structure design (tenun, anyam, rajut), serta manajemen bisnis fashion.',
    value_en: 'Explore our adaptive curriculum designed to equip students with expertise in surface design (batik, ecoprint, shibori), structure design (weaving, knitting), and fashion business management.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kurikulum_internship_desc',
    value: 'Mahasiswa difasilitasi untuk magang industri atau di studio desainer terkemuka di bawah skema MBKM hingga 20 SKS.',
    value_en: 'Students are facilitated to intern in creative industries or leading designer studios under the MBKM scheme for up to 20 credits.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'tugas_akhir_description',
    value: 'Akses panduan akademik, persyaratan kelayakan, alur pengajuan proposal karya kriya dan busana, serta template Tugas Akhir (Skripsi/Karya Mandiri).',
    value_en: 'Access academic guidelines, prerequisites, project proposals, and templates required to complete your final project (Thesis/Creative Work).',
    updated_at: new Date().toISOString()
  },
  {
    key: 'tugas_akhir_prereq_desc',
    value: 'Telah menempuh minimal 110 SKS, tidak memiliki nilai D/E untuk mata kuliah inti kriya, IPK Kumulatif minimal 2.00, serta mengajukan outline konsep karya.',
    value_en: 'Successfully completed a minimum of 110 academic credits (SKS), no D/E grades for core craft courses, minimum GPA of 2.00, and submitted a creative design outline.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kerjasama_description',
    value: 'Membuka peluang kolaborasi industri kreatif guna mendukung magang mahasiswa, pameran bersama, serta penyerapan karir lulusan.',
    value_en: 'Exploring collaborations with creative industries to support student internships, joint exhibitions, and professional career transitions.',
    updated_at: new Date().toISOString()
  }
];

const initialKurikulumCourses: DbKurikulumCourse[] = [
  { id: 'course-1', semester: 'I', name: 'Pengantar Seni Kriya & Desain', name_en: 'Introduction to Craft & Design', credits: 3, sort_order: 1, created_at: new Date().toISOString() },
  { id: 'course-2', semester: 'I', name: 'Nirmana 2D', name_en: '2D Design Principles (Nirmana)', credits: 3, sort_order: 2, created_at: new Date().toISOString() },
  { id: 'course-3', semester: 'I', name: 'Menggambar Rupa', name_en: 'Figure Drawing', credits: 3, sort_order: 3, created_at: new Date().toISOString() },
  { id: 'course-4', semester: 'II', name: 'Nirmana 3D', name_en: '3D Design Principles (Nirmana)', credits: 3, sort_order: 4, created_at: new Date().toISOString() },
  { id: 'course-5', semester: 'II', name: 'Sejarah Tekstil & Mode', name_en: 'History of Textiles & Fashion', credits: 3, sort_order: 5, created_at: new Date().toISOString() },
  { id: 'course-6', semester: 'II', name: 'Pengetahuan Serat & Tekstil', name_en: 'Fiber & Textile Science', credits: 2, sort_order: 6, created_at: new Date().toISOString() },
  { id: 'course-7', semester: 'III', name: 'Desain Permukaan (Batik & Shibori)', name_en: 'Surface Design (Batik & Shibori)', credits: 3, sort_order: 7, created_at: new Date().toISOString() },
  { id: 'course-8', semester: 'III', name: 'Desain Struktur (Tenun & Anyam)', name_en: 'Structure Design (Weaving & Basketry)', credits: 3, sort_order: 8, created_at: new Date().toISOString() },
  { id: 'course-9', semester: 'III', name: 'Ilustrasi Fashion', name_en: 'Fashion Illustration', credits: 3, sort_order: 9, created_at: new Date().toISOString() },
  { id: 'course-10', semester: 'IV', name: 'Pola & Konstruksi Busana', name_en: 'Pattern Drafting & Garment Construction', credits: 3, sort_order: 10, created_at: new Date().toISOString() },
  { id: 'course-11', semester: 'IV', name: 'Teknik Pewarnaan Alami', name_en: 'Natural Dyeing Techniques', credits: 3, sort_order: 11, created_at: new Date().toISOString() },
  { id: 'course-12', semester: 'IV', name: 'Tekstil Kontemporer', name_en: 'Contemporary Textiles', credits: 2, sort_order: 12, created_at: new Date().toISOString() },
  { id: 'course-13', semester: 'V', name: 'Desain Mode (Ready-to-Wear)', name_en: 'Fashion Design (Ready-to-Wear)', credits: 4, sort_order: 13, created_at: new Date().toISOString() },
  { id: 'course-14', semester: 'V', name: 'Trend Forecasting & Fashion Styling', name_en: 'Trend Forecasting & Fashion Styling', credits: 3, sort_order: 14, created_at: new Date().toISOString() },
  { id: 'course-15', semester: 'V', name: 'Fotografi Produk & Mode', name_en: 'Product & Fashion Photography', credits: 2, sort_order: 15, created_at: new Date().toISOString() },
  { id: 'course-16', semester: 'VI', name: 'Sustainable Fashion & Circular Craft', name_en: 'Sustainable Fashion & Circular Craft', credits: 3, sort_order: 16, created_at: new Date().toISOString() },
  { id: 'course-17', semester: 'VI', name: 'Creativepreneurship & Portofolio', name_en: 'Creativepreneurship & Portfolio', credits: 3, sort_order: 17, created_at: new Date().toISOString() },
  { id: 'course-18', semester: 'VI', name: 'Eksperimen Material Tekstil', name_en: 'Textile Material Experimentation', credits: 3, sort_order: 18, created_at: new Date().toISOString() },
  { id: 'course-19', semester: 'VII', name: 'Metodologi Penelitian Seni & Desain', name_en: 'Art & Design Research Methodology', credits: 2, sort_order: 19, created_at: new Date().toISOString() },
  { id: 'course-20', semester: 'VII', name: 'Seminar Proposal Tugas Akhir', name_en: 'Final Project Proposal Seminar', credits: 1, sort_order: 20, created_at: new Date().toISOString() },
  { id: 'course-21', semester: 'VII', name: 'Magang Industri Kreatif / Fashion Studio', name_en: 'Creative Industry / Fashion Studio Internship', credits: 4, sort_order: 21, created_at: new Date().toISOString() },
  { id: 'course-22', semester: 'VIII', name: 'Tugas Akhir / Karya Mandiri & Skripsi', name_en: 'Final Capstone Project / Thesis', credits: 6, sort_order: 22, created_at: new Date().toISOString() }
];

const initialKurikulumPlos: DbKurikulumPlo[] = [
  {
    id: 'plo-1',
    code: 'CPL-01',
    type: 'Sikap & Nilai Keislaman',
    type_en: 'Islamic Attitude & Values',
    text: 'Mampu menginternalisasikan nilai-nilai Islam, etika profesi desain, dan prinsip keberlanjutan dalam kehidupan bermasyarakat dan dunia industri kreatif.',
    text_en: 'Able to internalize Islamic values, design professional ethics, and sustainability principles in community life and the creative industry.',
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'plo-2',
    code: 'CPL-02',
    type: 'Penguasaan Pengetahuan Kriya & Mode',
    type_en: 'Craft & Fashion Knowledge Mastery',
    text: 'Menguasai konsep sejarah kriya, teori warna, trend forecasting, material serat, serta teknik konstruksi tekstil secara mendalam.',
    text_en: 'Mastering craft history concepts, color theory, trend forecasting, fiber materials, and textile construction techniques deeply.',
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 'plo-3',
    code: 'CPL-03',
    type: 'Keterampilan Kerja Khusus Desain',
    type_en: 'Specific Design Work Skills',
    text: 'Mampu merancang karya kriya tekstil (surface dan structure) serta koleksi busana yang inovatif berbasis kearifan lokal dan ramah lingkungan.',
    text_en: 'Able to design textile craft works (surface and structure) and innovative fashion collections based on local wisdom and eco-friendly principles.',
    sort_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: 'plo-4',
    code: 'CPL-04',
    type: 'Creativepreneurship & Inovasi',
    type_en: 'Creativepreneurship & Innovation',
    text: 'Mampu mengidentifikasi peluang pasar dan membangun bisnis kreatif mandiri (brand fashion/kriya) berbasis technopreneurship budaya.',
    text_en: 'Able to identify market opportunities and build independent creative businesses (fashion/craft brand) based on cultural technopreneurship.',
    sort_order: 4,
    created_at: new Date().toISOString()
  }
];

const initialKurikulumProfiles: DbKurikulumProfile[] = [
  {
    id: 'prof-1',
    title: 'Fashion / Textile Designer',
    title_en: 'Fashion / Textile Designer',
    desc: 'Profesional yang merancang motif tekstil atau koleksi busana siap pakai untuk industri fashion nasional dan global.',
    desc_en: 'Professionals who design textile motifs or ready-to-wear fashion collections for the national and global fashion industry.',
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'prof-2',
    title: 'Contemporary Craft Artist / Maker',
    title_en: 'Contemporary Craft Artist / Maker',
    desc: 'Seniman kriya independen yang menciptakan karya seni serat, instalasi tekstil, serta produk kerajinan tangan bernilai seni tinggi.',
    desc_en: 'Independent craft artists who create fiber art, textile installations, and high-value handmade craft products.',
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 'prof-3',
    title: 'Fashion Stylist & Visual Merchandiser',
    title_en: 'Fashion Stylist & Visual Merchandiser',
    desc: 'Ahli yang menyusun konsep visual untuk photoshoot, pameran produk di butik, dan pengarah gaya mode media.',
    desc_en: 'Experts who curate visual concepts for photo shoots, boutique product exhibitions, and media fashion styling.',
    sort_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: 'prof-4',
    title: 'Creativepreneur (Craft & Fashion)',
    title_en: 'Creativepreneur (Craft & Fashion)',
    desc: 'Wirausahawan mandiri yang mendirikan brand fashion ramah lingkungan atau bisnis kriya berbasis pemberdayaan komunitas lokal.',
    desc_en: 'Independent entrepreneurs who establish eco-friendly fashion brands or craft businesses based on local community empowerment.',
    sort_order: 4,
    created_at: new Date().toISOString()
  }
];

const initialTaSteps: DbTaStep[] = [
  {
    id: 'step-1',
    num: '01',
    title: 'Pengajuan Konsep Karya & Proposal',
    title_en: 'Concept & Proposal Submission',
    desc: 'Mahasiswa mengajukan draf rencana karya kriya/busana beserta outline konsep visual untuk dievaluasi oleh prodi.',
    desc_en: 'Students submit craft/fashion research drafts along with a visual concept outline to the department for evaluation.',
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'step-2',
    num: '02',
    title: 'Seminar Proposal Desain',
    title_en: 'Design Proposal Seminar',
    desc: 'Pemaparan rencana desain, moodboard, sketsa awal, dan pemilihan material di hadapan dosen penguji.',
    desc_en: 'Presentation of design plans, moodboard, initial sketches, and material selection before examiners.',
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 'step-3',
    num: '03',
    title: 'Pengerjaan Studio & Eksperimen',
    title_en: 'Studio Work & Experimentation',
    desc: 'Proses pembuatan karya (weaving, dyeing, sewing) dan eksperimen material di studio kriya.',
    desc_en: 'Fabrication process (weaving, dyeing, sewing) and material experimentation in the craft studio.',
    sort_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: 'step-4',
    num: '04',
    title: 'Sidang Karya & Pameran',
    title_en: 'Undergraduate Thesis & Exhibition Defense',
    desc: 'Pertanggungjawaban hasil karya, konsep teoritis, dan display pameran di hadapan dewan penguji.',
    desc_en: 'Defending the completed work, theoretical concept, and exhibition display before the board of examiners.',
    sort_order: 4,
    created_at: new Date().toISOString()
  },
  {
    id: 'step-5',
    num: '05',
    title: 'Revisi & Pengarsipan Portofolio',
    title_en: 'Revision & Portfolio Archiving',
    desc: 'Penyempurnaan laporan tertulis dan dokumentasi karya foto resolusi tinggi untuk portofolio digital lulusan.',
    desc_en: 'Perfecting the written report and high-resolution work documentation for the graduate\'s digital portfolio.',
    sort_order: 5,
    created_at: new Date().toISOString()
  }
];

// Initialize localStorage if empty
const initialPrestasi: DbPrestasi[] = [
  { id: 'prestasi-1', type: 'prodi', title: 'Akreditasi BAN-PT Baik', title_en: "BAN-PT 'Baik' Accreditation", year: '2024', desc: 'Predikat akreditasi Baik atas standar mutu pengajaran dan kurikulum kreatif.', desc_en: "Achieved 'Baik' standard for teaching quality and creative curriculum.", host: null, host_en: null, competitor: null, image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600', sort_order: 1, created_at: new Date().toISOString() },
  { id: 'prestasi-2', type: 'mahasiswa', title: 'Juara I Fashion Show Reka Rupa Nusantara', title_en: '1st Place Reka Rupa Nusantara Fashion Show', year: '2024', desc: 'Mengembangkan gaun malam eco-printing ramah lingkungan.', desc_en: 'Developed eco-printing evening gown made from sustainable materials.', host: 'Kementerian Pariwisata & Ekonomi Kreatif', host_en: 'Ministry of Tourism & Creative Economy', competitor: 'Naila Putri & Tim', image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600', sort_order: 2, created_at: new Date().toISOString() }
];

const initialPublikasiDosen: DbPublikasiDosen[] = [
  { id: 'pub-1', title: 'Eksplorasi Motif Batik Garutan Menggunakan Zat Pewarna Alam', title_en: 'Exploring Garut Batik Motifs Using Natural Colorants', author: 'Dra. Saftiyaningsih Ken Atik, M.Ds.', journal: 'TUMPAL: Jurnal Kriya Tekstil & Fashion, Vol. 2 No. 1', journal_en: 'TUMPAL: Journal of Textile Craft & Fashion, Vol. 2 No. 1', year: '2025', category: 'JURNAL NASIONAL', category_en: 'NATIONAL JOURNAL', link: 'https://sinta.kemdiktisaintek.go.id/', sort_order: 1, created_at: new Date().toISOString() },
  { id: 'pub-2', title: 'Penerapan Teknik Eco-Print Daun Jati pada Serat Selulosa', title_en: 'Application of Teak Leaf Eco-Print Technique on Cellulosic Fibers', author: 'Ghaida Nasya Putri, S.Ds., M.Ds.', journal: 'Seminar Nasional Desain Nusantara (SNDN)', journal_en: 'National Seminar on Nusantara Design (SNDN)', year: '2024', category: 'PROSIDING SEMINAR', category_en: 'SEMINAR PROCEEDINGS', link: 'https://sinta.kemdiktisaintek.go.id/', sort_order: 2, created_at: new Date().toISOString() }
];

const initialKegiatanDosen: DbKegiatanDosen[] = [
  { id: 'kd-1', title: 'Konferensi Seni Kriya dan Serat Internasional 2025', title_en: 'International Craft and Fiber Art Conference 2025', date_text: '12 Maret 2025', date_text_en: 'March 12, 2025', location: 'Kuala Lumpur, Malaysia', desc: 'Presentasi riset tentang rekayasa struktur tenun tradisional untuk pakaian kontemporer.', desc_en: 'Presented research on traditional weaving structure engineering for contemporary wear.', image_url: '/assets/kegiatan-d1.png', sort_order: 1, created_at: new Date().toISOString() },
  { id: 'kd-2', title: 'Pelatihan Teknik Batik dan Ecoprint bagi UMKM Kreatif', title_en: 'Batik & Ecoprint Technique Training for Creative MSMEs', date_text: '18 Oktober 2024', date_text_en: 'October 18, 2024', location: 'Soreang, Bandung', desc: 'PKM pelatihan teknis eksplorasi motif permukaan kain untuk pengrajin batik lokal.', desc_en: 'Public service training on fabric surface motif exploration for local batik artisans.', image_url: '/assets/kegiatan-d2.png', sort_order: 2, created_at: new Date().toISOString() }
];

const initialKegiatanMahasiswa: DbKegiatanMahasiswa[] = [
  { id: 'km-1', title: 'TUMPAL EXPO 2026: Capstone Exhibition & Fashion Show', title_en: 'TUMPAL EXPO 2026: Capstone Exhibition & Fashion Show', date_text: '24-28 Februari 2026', date_text_en: 'February 24-28, 2026', location: 'Gedung Rektorat UMB, Bandung', desc: 'Pameran kelulusan karya mandiri mahasiswa menampilkan koleksi busana dan kriya tekstil.', desc_en: 'Graduation portfolio exhibition showcasing student fashion collections and textile crafts.', image_url: '/assets/kegiatan-m1.png', sort_order: 1, created_at: new Date().toISOString() },
  { id: 'km-2', title: 'KTF Fashion Camp: Workshop Daur Ulang Tekstil Kreatif', title_en: 'KTF Fashion Camp: Creative Textile Upcycling Workshop', date_text: '14 November 2025', date_text_en: 'November 14, 2025', location: 'Kampus UMB, Bandung', desc: 'Program kerja kemahasiswaan memberikan penyuluhan pengolahan limbah kain menjadi produk kriya.', desc_en: 'Student body program organizing training to upcycle textile waste into craft products.', image_url: '/assets/kegiatan-m2.png', sort_order: 2, created_at: new Date().toISOString() }
];

const initialAlumni: DbAlumni[] = [
  { id: 'alumni-1', name: 'Amelia Rahma, S.Sn.', class_of: 'Angkatan 2019', class_of_en: 'Class of 2019', role: 'Senior Fashion Designer', company: 'PT Danar Hadi', quote: 'Di sini saya diajarkan surface & structure design serta trend forecasting secara mendalam.', quote_en: 'Here I was taught surface & structure design and trend forecasting in depth.', image_url: '/assets/alumni-1.png', sort_order: 1, created_at: new Date().toISOString() },
  { id: 'alumni-2', name: 'Risa Fitria, S.Sn.', class_of: 'Angkatan 2019', class_of_en: 'Class of 2019', role: 'Creative Director', company: 'Batik Komar', quote: 'Integrasi kearifan lokal Nusantara dengan bisnis kreatif memberikan bekal kuat di industri fashion.', quote_en: 'Integrating Nusantara local wisdom with creative business gave me a strong edge in the fashion industry.', image_url: '/assets/alumni-2.png', sort_order: 2, created_at: new Date().toISOString() }
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
