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

const initialDosen: DbDosen[] = [
  {
    id: 'dosen-1',
    name: 'Hanif Alamudin Manshur, S.Gz., M.Si.',
    img_src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop',
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
    name: 'Vritta Amroini Wahyudi, S.Si., M.Si.',
    img_src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
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
    name: 'Prof. Dr. Ir. Noor Harini, M.S.',
    img_src: 'https://images.unsplash.com/photo-1580894732444-8fecef2271ff?q=80&w=300&auto=format&fit=crop',
    scopus: '57203912449',
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
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    testimonial: 'Program magang laboratorium memberikan saya kesempatan berjejaring langsung dengan praktisi cloud dan devops nasional sejak awal perkuliahan.',
    testimonial_en: 'The lab internship program gave me the opportunity to network directly with national cloud and devops practitioners since the beginning of college.',
    by: 'Rian Hidayat, S.Kom (DevOps Engineer at GoTo)',
    by_en: 'Rian Hidayat, S.Kom (DevOps Engineer at GoTo)',
    img_src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    created_at: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    testimonial: 'Informatika UMB benar-benar mengasah kemampuan berpikir logis dan pemecahan masalah kompleks menggunakan teknologi kecerdasan buatan.',
    testimonial_en: 'Informatics UMB really sharpens logical thinking and complex problem solving skills using artificial intelligence technology.',
    by: 'Melati Indah, S.Kom (AI Researcher at Bukalapak)',
    by_en: 'Melati Indah, S.Kom (AI Researcher at Bukalapak)',
    img_src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    created_at: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    testimonial: 'Suasana lab yang kolaboratif membuat saya terbiasa melakukan eksperimen sistem dan coding tanpa takut gagal.',
    testimonial_en: 'The collaborative lab atmosphere makes me accustomed to conducting system experiments and coding without fear of failure.',
    by: 'Fauzan Adhi, S.Kom (Cybersecurity Analyst at Cyber Security Agency)',
    by_en: 'Fauzan Adhi, S.Kom (Cybersecurity Analyst at Cyber Security Agency)',
    img_src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '5',
    testimonial: 'Pembekalan portofolio proyek berkala selama perkuliahan sangat mempermudah saya ketika melamar kerja di perusahaan multinasional.',
    testimonial_en: 'Regular project portfolio preparation during college made it very easy for me when applying for jobs at multinational companies.',
    by: 'Sarah Amalia, S.Kom (Technical Product Manager at Shopee)',
    by_en: 'Sarah Amalia, S.Kom (Technical Product Manager at Shopee)',
    img_src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '6',
    testimonial: 'Berkat bimbingan intensif dosen-dosen praktisi industri, saya bisa merilis proyek akhir saya di ajang kompetisi IT nasional.',
    testimonial_en: 'Thanks to the intensive guidance of industry practitioner lecturers, I was able to release my final project in a national IT competition.',
    by: 'Yusuf Maulana, S.Kom (Data Scientist at Telkom Indonesia)',
    by_en: 'Yusuf Maulana, S.Kom (Data Scientist at Telkom Indonesia)',
    img_src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop',
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const initialPartners: DbPartner[] = [
  { id: '1', name: 'Asosiasi Telekomunikasi Indonesia', created_at: new Date().toISOString() },
  { id: '2', name: 'PT Indonesia Digital Teknologi', created_at: new Date().toISOString() },
  { id: '3', name: 'Google Developer Groups Bandung', created_at: new Date().toISOString() },
  { id: '4', name: 'Kementerian Komunikasi & Informatika', created_at: new Date().toISOString() },
  { id: '5', name: 'Ikatan Alumni Teknik Informatika (IKATI)', created_at: new Date().toISOString() },
  { id: '6', name: 'PT GoTo Gojek Tokopedia Tbk', created_at: new Date().toISOString() }
];

const initialLandingStats: DbLandingStat[] = [
  { id: '1', number: '98%', label: 'Keterserapan Lulusan di Industri', label_en: 'Graduate Employment Rate in Industry', sort_order: 1 },
  { id: '2', number: '20+', label: 'Mitra Industri & Tech Company', label_en: 'Industry Partners & Tech Companies', sort_order: 2 },
  { id: '3', number: '150+', label: 'Project Apps Mahasiswa Terpublikasi', label_en: 'Published Student Project Apps', sort_order: 3 },
  { id: '4', number: '8', label: 'Laboratorium Komputasi & Riset', label_en: 'Computing & Research Laboratories', sort_order: 4 }
];

const initialLandingPartners: DbLandingPartner[] = [
  { id: '1', name: 'PT GoTo Gojek Tokopedia Tbk', sort_order: 1 },
  { id: '2', name: 'Google Developer Groups Bandung', sort_order: 2 },
  { id: '3', name: 'Asosiasi Telekomunikasi Indonesia', sort_order: 3 },
  { id: '4', name: 'PT Indonesia Digital Teknologi', sort_order: 4 },
  { id: '5', name: 'Kementerian Komunikasi & Informatika', sort_order: 5 },
  { id: '6', name: 'Ikatan Alumni Teknik Informatika (IKATI)', sort_order: 6 }
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
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop',
    title: 'AI Lung Cancer Detection Model',
    medium: 'Python & PyTorch',
    technique: 'Developer: Ryu Hansen',
    year: 'Karya Inovatif // Global Health',
    gridClass: 'col-span-1 row-span-1',
    sort_order: 4
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop',
    title: 'AR Campus Navigation System',
    medium: 'Unity & C#',
    technique: 'Developer: Farah Amalia',
    year: 'Finalis // Indonesian Young Inventor',
    gridClass: 'col-span-2 row-span-1',
    sort_order: 5
  }
];

export const initialSiteContent: DbSiteContent[] = [
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
    value: 'Selamat datang di portal resmi Program Studi S1 Teknik Informatika Universitas Muhammadiyah Bandung. Kami berkomitmen untuk mencetak pemimpin teknologi dan rekayasawan perangkat lunak masa depan yang menguasai komputasi modern, sistem pemrograman, dan kecerdasan buatan.',
    value_en: 'Welcome to the official portal of the S1 Program in Informatics Engineering at Universitas Muhammadiyah Bandung. We are committed to shaping future technology leaders and software engineers who master modern computing, programming systems, and artificial intelligence.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kaprodi_welcome_p2',
    value: 'Fokus pengembangan kami terletak pada integrasi kemajuan ilmu komputer dengan kebutuhan praktis industri, menciptakan solusi dan sistem digital yang berdaya saing global serta berdampak sosial.',
    value_en: 'Our development focus lies in integrating computer science advancements with practical industry needs, creating digital solutions and systems that are globally competitive and socially impactful.',
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
    value: 'M. Yusuf Efendi, S.T., M.T.',
    value_en: 'M. Yusuf Efendi, S.T., M.T.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kaprodi_title',
    value: 'Ketua Program Studi Teknik Informatika',
    value_en: 'Head of Informatics Engineering Department',
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
  },
  {
    key: 'visi_misi_vision',
    value: 'Menjadi program studi rekayasa perangkat lunak yang unggul di tingkat nasional, berdaya saing global, terintegrasi dengan nilai-nilai Keislaman serta inovasi teknologi digital pada tahun 2030.',
    value_en: 'To become a leading, globally-recognized center of software engineering education and research that integrates Islamic values and digital technological innovations by 2030.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'visi_misi_missions',
    value: 'Menyelenggarakan pendidikan rekayasa perangkat lunak berkualitas tinggi yang selaras dengan standar komputasi global dan kebutuhan dinamis industri teknologi.\nMelaksanakan riset inovatif dan kolaboratif di bidang sistem awan, kecerdasan buatan, dan keamanan siber dengan publikasi akademis yang berdampak.\nMengimplementasikan program pengabdian masyarakat berbasis transformasi digital untuk memberdayakan UMKM lokal dan sektor sosial kemasyarakatan.\nMengintegrasikan etika Keislaman, integritas profesional, dan prinsip moral dalam pembelajaran akademik serta pembinaan karakter.',
    value_en: 'Deliver a high-quality software engineering curriculum that aligns with global computing standards and dynamic tech industry demands.\nConduct innovative, collaborative research in cloud systems, artificial intelligence, and cybersecurity with meaningful academic publications.\nImplement digital transformation initiatives and community service programs to support local MSMEs and community sectors.\nIntegrate Islamic ethics, professional integrity, and moral principles into academic learning and character development.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'visi_misi_goals',
    value: 'Kompetensi Profesional Global\nOutput Riset yang Inovatif\nEkosistem Digital Berkelanjutan\nKarakter Islami & Kepemimpinan',
    value_en: 'Global Professional Competency\nInnovative Research Output\nSustainable Digital Ecosystems\nIslamic Character & Leadership',
    updated_at: new Date().toISOString()
  },
  {
    key: 'gov_sec_name',
    value: 'Vritta Amroini Wahyudi, S.Si., M.Si.',
    value_en: 'Vritta Amroini Wahyudi, S.Si., M.Si.',
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
    value: 'vritta.aw@umbandung.ac.id',
    value_en: 'vritta.aw@umbandung.ac.id',
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
    value: 'Hanif Alamudin Manshur, S.Gz., M.Si.',
    value_en: 'Hanif Alamudin Manshur, S.Gz., M.Si.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'gov_lab_role',
    value: 'Kepala Laboratorium Komputasi',
    value_en: 'Head of Computing Laboratories',
    updated_at: new Date().toISOString()
  },
  {
    key: 'gov_lab_email',
    value: 'hanif.am@umbandung.ac.id',
    value_en: 'hanif.am@umbandung.ac.id',
    updated_at: new Date().toISOString()
  },
  {
    key: 'gov_lab_photo',
    value: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop',
    value_en: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kurikulum_description',
    value: 'Pelajari kurikulum adaptif kami yang disusun berdasarkan standar komputasi internasional (ACM/IEEE), sertifikasi profesi industri, serta skema Merdeka Belajar Kampus Merdeka (MBKM).',
    value_en: 'Explore our modern, adaptive curriculum structured around international computing standards (ACM/IEEE), industry certifications, and MBKM learning path designs.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kurikulum_internship_desc',
    value: 'Mahasiswa kami difasilitasi untuk mengkonversikan pengalaman kerja lapangan / magang industri riil hingga 20 SKS akademik di bawah skema MBKM Kemendikbud, bermitra dengan startup dan BUMN teknologi terkemuka.',
    value_en: 'Our students are eligible to convert real-world industrial experiences into up to 20 academic credits under the Kemendikbud MBKM schema, collaborating with global and national technology enterprises.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'tugas_akhir_description',
    value: 'Akses panduan akademik, persyaratan kelayakan, alur pengajuan proposal, serta berkas unduhan template untuk menyelesaikan Tugas Akhir (Skripsi) Anda.',
    value_en: 'Access guidelines, academic prerequisites, research workflows, and download templates required to successfully complete your capstone final project.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'tugas_akhir_prereq_desc',
    value: 'Telah menempuh dan lulus minimal 110 SKS mata kuliah akademik, tidak memiliki nilai D/E untuk core courses, IPK Kumulatif minimal 2.00, serta menyertakan Seminar Proposal di KRS berjalan.',
    value_en: 'Successfully completed a minimum of 110 academic credits (SKS), no D or E grades for core courses, minimum GPA of 2.00, and enrolled in Thesis Proposal Seminar in the current KRS.',
    updated_at: new Date().toISOString()
  },
  {
    key: 'kerjasama_description',
    value: 'Membuka peluang kolaborasi global guna mendukung Tri Dharma Perguruan Tinggi, magang industri mahasiswa, riset bersama, serta penyerapan karir lulusan.',
    value_en: 'Exploring global collaborations to support the Tri Dharma of Higher Education, student internships, joint research programs, and professional career transitions.',
    updated_at: new Date().toISOString()
  }
];

const initialKurikulumCourses: DbKurikulumCourse[] = [
  { id: 'course-1', semester: 'I', name: 'Pengantar Teknologi Pangan', name_en: 'Introduction to Food Technology', credits: 2, sort_order: 1, created_at: new Date().toISOString() },
  { id: 'course-2', semester: 'I', name: 'Kimia Dasar', name_en: 'General Chemistry', credits: 3, sort_order: 2, created_at: new Date().toISOString() },
  { id: 'course-3', semester: 'I', name: 'Biologi Umum', name_en: 'General Biology', credits: 3, sort_order: 3, created_at: new Date().toISOString() },
  { id: 'course-4', semester: 'II', name: 'Kimia Organik', name_en: 'Organic Chemistry', credits: 3, sort_order: 4, created_at: new Date().toISOString() },
  { id: 'course-5', semester: 'II', name: 'Mikrobiologi Umum', name_en: 'General Microbiology', credits: 3, sort_order: 5, created_at: new Date().toISOString() },
  { id: 'course-6', semester: 'II', name: 'Matematika Pangan', name_en: 'Food Mathematics', credits: 2, sort_order: 6, created_at: new Date().toISOString() },
  { id: 'course-7', semester: 'III', name: 'Kimia Pangan', name_en: 'Food Chemistry', credits: 3, sort_order: 7, created_at: new Date().toISOString() },
  { id: 'course-8', semester: 'III', name: 'Mikrobiologi Pangan', name_en: 'Food Microbiology', credits: 3, sort_order: 8, created_at: new Date().toISOString() },
  { id: 'course-9', semester: 'III', name: 'Biokimia Pangan', name_en: 'Food Biochemistry', credits: 3, sort_order: 9, created_at: new Date().toISOString() },
  { id: 'course-10', semester: 'IV', name: 'Analisis Pangan', name_en: 'Food Analysis', credits: 3, sort_order: 10, created_at: new Date().toISOString() },
  { id: 'course-11', semester: 'IV', name: 'Satuan Operasi Industri Pangan', name_en: 'Unit Operations in Food Industry', credits: 3, sort_order: 11, created_at: new Date().toISOString() },
  { id: 'course-12', semester: 'IV', name: 'Bahan Tambahan Pangan', name_en: 'Food Additives', credits: 2, sort_order: 12, created_at: new Date().toISOString() },
  { id: 'course-13', semester: 'V', name: 'Teknologi Pengolahan Pangan', name_en: 'Food Processing Technology', credits: 4, sort_order: 13, created_at: new Date().toISOString() },
  { id: 'course-14', semester: 'V', name: 'Sensoris Pangan', name_en: 'Food Sensory Evaluation', credits: 3, sort_order: 14, created_at: new Date().toISOString() },
  { id: 'course-15', semester: 'V', name: 'Peraturan & Undang-Undang Pangan', name_en: 'Food Regulations & Laws', credits: 2, sort_order: 15, created_at: new Date().toISOString() },
  { id: 'course-16', semester: 'VI', name: 'Sistem Jaminan Produk Halal', name_en: 'Halal Product Assurance System', credits: 3, sort_order: 16, created_at: new Date().toISOString() },
  { id: 'course-17', semester: 'VI', name: 'Manajemen Mutu & Keamanan Pangan', name_en: 'Food Quality & Safety Management', credits: 3, sort_order: 17, created_at: new Date().toISOString() },
  { id: 'course-18', semester: 'VI', name: 'Desain & Inovasi Produk Pangan', name_en: 'Food Product Design & Innovation', credits: 3, sort_order: 18, created_at: new Date().toISOString() },
  { id: 'course-19', semester: 'VII', name: 'Metodologi Penelitian Pangan', name_en: 'Food Research Methodology', credits: 2, sort_order: 19, created_at: new Date().toISOString() },
  { id: 'course-20', semester: 'VII', name: 'Seminar Proposal Tugas Akhir', name_en: 'Final Project Proposal Seminar', credits: 1, sort_order: 20, created_at: new Date().toISOString() },
  { id: 'course-21', semester: 'VII', name: 'Magang Industri Pangan', name_en: 'Food Industry Internship', credits: 4, sort_order: 21, created_at: new Date().toISOString() },
  { id: 'course-22', semester: 'VIII', name: 'Tugas Akhir / Skripsi', name_en: 'Final Project / Undergraduate Thesis', credits: 6, sort_order: 22, created_at: new Date().toISOString() }
];

const initialKurikulumPlos: DbKurikulumPlo[] = [
  {
    id: 'plo-1',
    code: 'CPL-01',
    type: 'Sikap & Nilai Keislaman',
    type_en: 'Islamic Attitude & Values',
    text: 'Mampu menginternalisasikan nilai-nilai Islam, etika profesi pangan, dan prinsip kehalalan dalam kehidupan bermasyarakat dan dunia industri.',
    text_en: 'Able to internalize Islamic values, food professional ethics, and halal principles in community life and the industrial world.',
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'plo-2',
    code: 'CPL-02',
    type: 'Penguasaan Pengetahuan Sains Pangan',
    type_en: 'Food Science Knowledge Mastery',
    text: 'Menguasai konsep sains pangan, kimia pangan, mikrobiologi pangan, analisis pangan, gizi, dan rekayasa proses pengolahan pangan secara mendalam.',
    text_en: 'Mastering food science concepts, food chemistry, food microbiology, food analysis, nutrition, and food processing engineering deeply.',
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 'plo-3',
    code: 'CPL-03',
    type: 'Keterampilan Kerja Khusus',
    type_en: 'Specific Work Skills',
    text: 'Mampu mengaplikasikan ilmu teknologi pangan dalam merancang produk pangan halal, aman, bermutu, dan mengelola sistem penjaminan mutu (HACCP & Sertifikasi Halal).',
    text_en: 'Able to apply food technology science to design halal, safe, and quality food products, and manage quality assurance systems (HACCP & Halal Certification).',
    sort_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: 'plo-4',
    code: 'CPL-04',
    type: 'Technopreneurship & Inovasi',
    type_en: 'Technopreneurship & Innovation',
    text: 'Mampu mengidentifikasi peluang bisnis pangan berbasis pangan lokal Nusantara dengan pendekatan technopreneurship sirkular berkelanjutan.',
    text_en: 'Able to identify food business opportunities based on local Nusantara food with a sustainable circular technopreneurship approach.',
    sort_order: 4,
    created_at: new Date().toISOString()
  }
];

const initialKurikulumProfiles: DbKurikulumProfile[] = [
  {
    id: 'prof-1',
    title: 'QA/QC & Food Safety Specialist',
    title_en: 'QA/QC & Food Safety Specialist',
    desc: 'Profesional yang mampu menjamin mutu, keamanan, dan kehalalan produk pangan dari bahan baku hingga produk jadi di industri makanan dan minuman.',
    desc_en: 'Professionals capable of ensuring the quality, safety, and halal integrity of food products from raw materials to finished products in the food and beverage industry.',
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'prof-2',
    title: 'R&D & Product Development Specialist',
    title_en: 'R&D & Product Development Specialist',
    desc: 'Inovator yang mampu merancang formulasi baru, diversifikasi pangan lokal Nusantara, serta rekayasa kemasan pangan bernilai gizi tinggi.',
    desc_en: 'Innovators capable of designing new formulations, diversifying local Nusantara food, and engineering high-nutrition food packaging.',
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 'prof-3',
    title: 'Halal Food Auditor / Consultant',
    title_en: 'Halal Food Auditor / Consultant',
    desc: 'Ahli bersertifikasi yang mendampingi industri pangan dan UMKM dalam mengaudit, menyusun dokumen Sistem Jaminan Produk Halal (SJPH).',
    desc_en: 'Certified experts assisting the food industry and MSMEs in auditing and compiling Halal Product Assurance System documents.',
    sort_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: 'prof-4',
    title: 'Food Technopreneur',
    title_en: 'Food Technopreneur',
    desc: 'Wirausahawan mandiri yang mengembangkan bisnis pengolahan pangan lokal yang inovatif dengan mengedepankan aspek halal dan keberlanjutan.',
    desc_en: 'Independent entrepreneurs developing innovative local food processing businesses prioritizing halal and sustainability aspects.',
    sort_order: 4,
    created_at: new Date().toISOString()
  }
];

const initialTaSteps: DbTaStep[] = [
  {
    id: 'step-1',
    num: '01',
    title: 'Pengajuan Judul & Proposal',
    title_en: 'Title & Proposal Submission',
    desc: 'Mahasiswa mengajukan draf rencana penelitian beserta calon dosen pembimbing ke prodi untuk dievaluasi kesesuaian topiknya.',
    desc_en: 'Students submit research plan drafts along with prospective advisors to the department for topic suitability evaluation.',
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'step-2',
    num: '02',
    title: 'Seminar Proposal',
    title_en: 'Proposal Seminar',
    desc: 'Pemaparan rencana penelitian di hadapan dosen penguji untuk mendapat masukan metodologi ilmiah dan kelayakan riset.',
    desc_en: 'Presentation of research plans before examiners to receive scientific methodology feedback and research feasibility validation.',
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 'step-3',
    num: '03',
    title: 'Penelitian Laboratorium & Analisis',
    title_en: 'Lab Research & Analysis',
    desc: 'Pelaksanaan eksperimen, analisis laboratorium (fisik, kimia, mikrobiologi, atau organoleptik) sesuai metodologi proposal.',
    desc_en: 'Conducting experiments and laboratory analyses (physical, chemical, microbiological, or organoleptic) per proposal methodology.',
    sort_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: 'step-4',
    num: '04',
    title: 'Sidang Tugas Akhir',
    title_en: 'Undergraduate Thesis Defense',
    desc: 'Ujian lisan komprehensif untuk mempertahankan hasil penelitian, analisis data, dan kesimpulan di hadapan dewan penguji.',
    desc_en: 'Comprehensive oral exam to defend research results, data analysis, and conclusions before the board of examiners.',
    sort_order: 4,
    created_at: new Date().toISOString()
  },
  {
    id: 'step-5',
    num: '05',
    title: 'Revisi & Pengumpulan Berkas',
    title_en: 'Revision & Submission',
    desc: 'Penyempurnaan draf naskah skripsi berdasarkan masukan penguji serta pengunggahan manuskrip ke repositori institusi.',
    desc_en: 'Perfecting the thesis draft per examiners\' feedback and uploading the final manuscript to the institutional repository.',
    sort_order: 5,
    created_at: new Date().toISOString()
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
