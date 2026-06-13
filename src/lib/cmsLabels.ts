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
  gov_upm_name: {
    label: 'Nama Unit Penjaminan Mutu (UPM)',
    desc: 'Nama lengkap beserta gelar akademik Penanggung Jawab Unit Penjaminan Mutu.'
  },
  gov_upm_role: {
    label: 'Jabatan Unit Penjaminan Mutu (UPM)',
    desc: 'Nama jabatan resmi UPM.'
  },
  gov_upm_email: {
    label: 'E-mail Unit Penjaminan Mutu (UPM)',
    desc: 'Alamat e-mail aktif UPM.'
  },
  gov_upm_photo: {
    label: 'Foto Unit Penjaminan Mutu (UPM)',
    desc: 'Foto profil resmi Penanggung Jawab UPM.'
  },
  kurikulum_description: {
    label: 'Deskripsi Kurikulum & CPL',
    desc: 'Penjelasan umum mengenai visi kurikulum, sertifikasi, dan integrasi standar internasional.'
  },
  kurikulum_internship_desc: {
    label: 'Deskripsi Magang MBKM',
    desc: 'Penjelasan tata cara konversi kredit dan kemitraan magang industri.'
  },
  kurikulum_peo_title: {
    label: 'Judul PEO (Educational Objectives)',
    desc: 'Judul atau istilah untuk PEO.'
  },
  kurikulum_peo_desc: {
    label: 'Deskripsi PEO (Educational Objectives)',
    desc: 'Deskripsi kompetensi lulusan dalam jangka panjang (PEO).'
  },
  kurikulum_plo_title: {
    label: 'Judul PLO (Learning Outcomes)',
    desc: 'Judul atau istilah untuk PLO.'
  },
  kurikulum_plo_desc: {
    label: 'Deskripsi PLO (Learning Outcomes)',
    desc: 'Deskripsi kompetensi kelulusan mahasiswa saat lulus (PLO).'
  },
  kurikulum_facility_1_name: {
    label: 'Fasilitas 1: Nama Laboratorium/Studio',
    desc: 'Nama laboratorium/studio pertama program studi.'
  },
  kurikulum_facility_1_desc: {
    label: 'Fasilitas 1: Deskripsi Laboratorium/Studio',
    desc: 'Deskripsi kegunaan atau alat-alat di laboratorium/studio pertama.'
  },
  kurikulum_facility_2_name: {
    label: 'Fasilitas 2: Nama Laboratorium/Studio',
    desc: 'Nama laboratorium/studio kedua program studi.'
  },
  kurikulum_facility_2_desc: {
    label: 'Fasilitas 2: Deskripsi Laboratorium/Studio',
    desc: 'Deskripsi kegunaan atau alat-alat di laboratorium/studio kedua.'
  },
  kurikulum_facility_3_name: {
    label: 'Fasilitas 3: Nama Laboratorium/Studio',
    desc: 'Nama laboratorium/studio ketiga program studi.'
  },
  kurikulum_facility_3_desc: {
    label: 'Fasilitas 3: Deskripsi Laboratorium/Studio',
    desc: 'Deskripsi kegunaan atau alat-alat di laboratorium/studio ketiga.'
  },
  kurikulum_facility_4_name: {
    label: 'Fasilitas 4: Nama Laboratorium/Studio',
    desc: 'Nama laboratorium/studio keempat program studi.'
  },
  kurikulum_facility_4_desc: {
    label: 'Fasilitas 4: Deskripsi Laboratorium/Studio',
    desc: 'Deskripsi kegunaan atau alat-alat di laboratorium/studio keempat.'
  },
  kurikulum_semester_1_2_title: {
    label: 'Kurikulum: Semester 1-2 Title',
    desc: 'Judul tahapan pembelajaran semester 1-2.'
  },
  kurikulum_semester_1_2_desc: {
    label: 'Kurikulum: Semester 1-2 Desc',
    desc: 'Penjelasan umum / daftar mata kuliah utama di semester 1-2.'
  },
  kurikulum_semester_3_4_title: {
    label: 'Kurikulum: Semester 3-4 Title',
    desc: 'Judul tahapan pembelajaran semester 3-4.'
  },
  kurikulum_semester_3_4_desc: {
    label: 'Kurikulum: Semester 3-4 Desc',
    desc: 'Penjelasan umum / daftar mata kuliah utama di semester 3-4.'
  },
  kurikulum_semester_5_6_title: {
    label: 'Kurikulum: Semester 5-6 Title',
    desc: 'Judul tahapan pembelajaran semester 5-6.'
  },
  kurikulum_semester_5_6_desc: {
    label: 'Kurikulum: Semester 5-6 Desc',
    desc: 'Penjelasan umum / daftar mata kuliah utama di semester 5-6.'
  },
  kurikulum_semester_7_8_title: {
    label: 'Kurikulum: Semester 7-8 Title',
    desc: 'Judul tahapan pembelajaran semester 7-8.'
  },
  kurikulum_semester_7_8_desc: {
    label: 'Kurikulum: Semester 7-8 Desc',
    desc: 'Penjelasan umum / daftar mata kuliah utama di semester 7-8.'
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
  },
  footer_email: {
    label: 'Footer: E-mail Program Studi',
    desc: 'Alamat e-mail resmi program studi yang tampil di bagian footer.'
  },
  footer_phone: {
    label: 'Footer: Nomor Telepon / HP',
    desc: 'Nomor kontak telepon atau WhatsApp helpdesk yang tampil di bagian footer.'
  },
  footer_address: {
    label: 'Footer: Alamat Kantor / Kampus',
    desc: 'Alamat fisik kantor program studi atau lokasi kampus yang tampil di bagian footer.'
  },
  footer_work_hours: {
    label: 'Footer: Jam Operasional',
    desc: 'Jam operasional pelayanan program studi (contoh: Senin - Jumat | 08:00 - 16:00 WIB).'
  },
  footer_social_instagram: {
    label: 'Footer: Tautan Instagram',
    desc: 'Link lengkap ke profil Instagram prodi (contoh: https://instagram.com/nama_akun). Kosongkan atau isi # untuk menyembunyikan.'
  },
  footer_social_youtube: {
    label: 'Footer: Tautan YouTube',
    desc: 'Link lengkap ke channel YouTube prodi. Kosongkan atau isi # untuk menyembunyikan.'
  },
  footer_social_whatsapp: {
    label: 'Footer: Tautan Grup/Chat WhatsApp',
    desc: 'Link lengkap ke chat WhatsApp atau grup WhatsApp prodi. Kosongkan atau isi # untuk menyembunyikan.'
  },
  footer_social_linkedin: {
    label: 'Footer: Tautan LinkedIn',
    desc: 'Link lengkap ke profil LinkedIn prodi. Kosongkan atau isi # untuk menyembunyikan.'
  },
  footer_social_univ: {
    label: 'Footer: Tautan Website Universitas',
    desc: 'Link lengkap ke website utama universitas.'
  },
  info_singkat_degree_title: {
    label: 'Info Singkat: Gelar Singkat (e.g. S.T.P.)',
    desc: 'Singkatan gelar akademik lulusan (contoh: S.T.P. atau S.Sn.).'
  },
  info_singkat_degree_name: {
    label: 'Info Singkat: Nama Gelar Lengkap',
    desc: 'Nama lengkap gelar akademik beserta jenjangnya (contoh: Sarjana Teknologi Pangan (S1)).'
  },
  info_singkat_sks_title: {
    label: 'Info Singkat: Jumlah SKS',
    desc: 'Jumlah total SKS kelulusan (contoh: 144 SKS).'
  },
  info_singkat_sks_desc: {
    label: 'Info Singkat: Deskripsi SKS',
    desc: 'Keterangan pembagian SKS (contoh: SKS Perkuliahan dan Praktikum).'
  },
  info_singkat_duration_title: {
    label: 'Info Singkat: Masa Studi',
    desc: 'Lama studi standar (contoh: 4 Tahun).'
  },
  info_singkat_duration_desc: {
    label: 'Info Singkat: Deskripsi Masa Studi',
    desc: 'Keterangan semester akademik (contoh: 8 Semester Perkuliahan Akademik).'
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
