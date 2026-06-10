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
