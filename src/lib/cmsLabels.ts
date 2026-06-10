export interface LabelConfig {
  label: string;
  desc: string;
}

export const SITE_CONTENT_LABELS: Record<string, LabelConfig> = {
  hero_title: {
    label: 'Judul Utama Website',
    desc: 'Judul besar yang ditampilkan paling pertama di halaman depan (hero section).'
  },
  hero_subtitle: {
    label: 'Sub-judul Utama Website',
    desc: 'Deskripsi pendek di bawah judul utama untuk menjelaskan visi program studi.'
  },
  kaprodi_welcome: {
    label: 'Kalimat Sambutan Kaprodi (Paragraf 1)',
    desc: 'Paragraf pertama kalimat sambutan selamat datang dari Ketua Program Studi.'
  },
  kaprodi_welcome_p2: {
    label: 'Kalimat Sambutan Kaprodi (Paragraf 2)',
    desc: 'Paragraf kedua kalimat sambutan untuk memaparkan fokus pengembangan prodi.'
  },
  kaprodi_photo_url: {
    label: 'Foto Ketua Program Studi',
    desc: 'Foto resmi Kepala Program Studi yang muncul di sebelah teks kata sambutan.'
  },
  logo_prodi_url: {
    label: 'Logo Program Studi',
    desc: 'Logo resmi Program Studi (jika ada, kosongkan untuk menggunakan logo default).'
  },
  hero_bg_url: {
    label: 'Gambar Latar Spanduk Utama',
    desc: 'Gambar latar belakang spanduk utama website (hero section).'
  },
  kaprodi_name: {
    label: 'Nama Ketua Program Studi',
    desc: 'Nama lengkap beserta gelar akademik Ketua Program Studi.'
  },
  kaprodi_title: {
    label: 'Jabatan Ketua Program Studi',
    desc: 'Nama jabatan resmi yang mendampingi nama Kaprodi.'
  },
  philosophy_title: {
    label: 'Judul Filosofi Pembelajaran',
    desc: 'Judul untuk bagian filosofi atau metodologi pembelajaran.'
  },
  philosophy_body: {
    label: 'Isi Filosofi Pembelajaran',
    desc: 'Penjelasan lengkap atau narasi dari filosofi pembelajaran program studi.'
  },
  visi_misi_vision: {
    label: 'Visi Program Studi',
    desc: 'Rumusan Visi utama Program Studi Teknik Informatika.'
  },
  visi_misi_missions: {
    label: 'Misi Program Studi',
    desc: 'Rumusan Misi operasional Program Studi. Masukkan tiap misi di baris baru (tekan Enter).'
  },
  visi_misi_goals: {
    label: 'Tujuan Program Studi (Educational Goals)',
    desc: 'Sasaran strategis lulusan prodi. Masukkan tiap tujuan di baris baru (tekan Enter).'
  },
  gov_sec_name: {
    label: 'Nama Sekretaris Program Studi',
    desc: 'Nama lengkap beserta gelar akademik Sekretaris Prodi.'
  },
  gov_sec_role: {
    label: 'Jabatan Sekretaris Program Studi',
    desc: 'Nama jabatan resmi untuk Sekretaris Prodi.'
  },
  gov_sec_email: {
    label: 'E-mail Sekretaris Program Studi',
    desc: 'Alamat e-mail aktif Sekretaris Prodi.'
  },
  gov_sec_photo: {
    label: 'Foto Sekretaris Program Studi',
    desc: 'Foto profil resmi Sekretaris Prodi.'
  },
  gov_lab_name: {
    label: 'Nama Kepala Lab Komputasi',
    desc: 'Nama lengkap beserta gelar akademik Kepala Laboratorium.'
  },
  gov_lab_role: {
    label: 'Jabatan Kepala Lab Komputasi',
    desc: 'Nama jabatan resmi untuk Kepala Lab.'
  },
  gov_lab_email: {
    label: 'E-mail Kepala Lab Komputasi',
    desc: 'Alamat e-mail aktif Kepala Lab Komputasi.'
  },
  gov_lab_photo: {
    label: 'Foto Kepala Lab Komputasi',
    desc: 'Foto profil resmi Kepala Laboratorium Komputasi.'
  },
  kurikulum_description: {
    label: 'Deskripsi Kurikulum & CPL',
    desc: 'Penjelasan umum mengenai visi kurikulum, sertifikasi, dan integrasi standar internasional.'
  },
  kurikulum_internship_desc: {
    label: 'Deskripsi Magang MBKM',
    desc: 'Penjelasan tata cara konversi kredit dan kemitraan magang industri.'
  },
  tugas_akhir_description: {
    label: 'Deskripsi Portal Tugas Akhir',
    desc: 'Kalimat pembuka / pengantar pada portal Tugas Akhir.'
  },
  tugas_akhir_prereq_desc: {
    label: 'Persyaratan Akademik Tugas Akhir',
    desc: 'Ketentuan jumlah SKS lulus, IPK minimal, dan prasyarat pendaftaran proposal skripsi.'
  },
  kerjasama_description: {
    label: 'Deskripsi Kerjasama & Kemitraan',
    desc: 'Kalimat pembuka / pengantar pada halaman direktori kerjasama industri.'
  }
};

export function getHumanLabel(key: string): string {
  if (SITE_CONTENT_LABELS[key]) {
    return SITE_CONTENT_LABELS[key].label;
  }
  // Fallback: snake_case to Title Case
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getHelpText(key: string): string {
  if (SITE_CONTENT_LABELS[key]) {
    return SITE_CONTENT_LABELS[key].desc;
  }
  return `Pengaturan konten untuk bidang ${key}.`;
}
