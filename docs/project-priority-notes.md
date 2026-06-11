# Catatan Prioritas Proyek - STATUS: SELESAI (COMPLETED)

Dokumen ini mencatat progres pengerjaan tiga hal utama sebelum proyek ini siap digunakan secara penuh atau masuk production. Berdasarkan audit integrasi antara `cms-umbandung-v2` dan `prodi-umbandung`, seluruh prioritas telah selesai diimplementasikan.

## [✓] 1. Lengkapi Modal CRUD untuk Tab CMS Baru

**Status: Selesai**

Semua state dan handler CRUD untuk tab-tab baru di `App.tsx` telah disinkronkan dengan `CrudModal.tsx`:
- **Form Input Terbuka Sesuai Tab**: Modal CRUD kini secara dinamis menampilkan input field spesifik untuk tab:
  - `prestasi`: type (prodi/mahasiswa), year, title, host, competitor, desc, sort_order, image_url.
  - `publikasi_dosen`: title, author, journal, year, category, link, sort_order.
  - `kegiatan_dosen`: title, date_text, location, desc, image_url, sort_order.
  - `kegiatan_mahasiswa`: title, date_text, location, desc, image_url, sort_order.
  - `alumni`: name, class_of, role, company, quote, image_url, sort_order.
  - `statistik_maba`: year, count, sort_order.
- **Upload Gambar**: Menambahkan integrasi handler file change yang mengunggah gambar langsung ke Supabase Storage (bucket `assets`) dan mengembalikan public URL yang terisi otomatis ke form.
- **Bilingual (ID/EN) Fields**: Mendukung input data dalam Bahasa Indonesia dan Bahasa Inggris untuk field bertipe teks panjang/judul di seluruh form.

## [✓] 2. Rapikan Integrasi Supabase Client dan Server di Website Publik

**Status: Selesai**

Masalah error `window is not defined` ketika runtime server-side rendering (SSR) di Astro telah diperbaiki:
- **Pemisahan Supabase Client**:
  - `supabaseClient.ts` sekarang mendeteksi lingkungan eksekusi secara dinamis. Jika dieksekusi di server/Astro build, ia menggunakan environment variable server-safe dan tidak mengakses objek `window`.
  - Helper database di `db.ts` memisahkan logika pemanggilan antara server (build time/SSR) dan browser client, menjamin pemanggilan `get` data aman dan tidak crash.
- **Fallback Terstruktur**: Seluruh layout Astro (Dosen, Prestasi, Kurikulum, Visi Misi, Kegiatan) dikonfigurasi untuk otomatis jatuh ke static fallback data yang komprehensif apabila koneksi database mati atau data di Supabase kosong.

## [✓] 3. Samakan Identitas Program Studi dan Konten Fallback

**Status: Selesai**

Penyelarasan identitas prodi menjadi **Kriya Tekstil dan Fashion (KTF)** telah dilakukan secara menyeluruh untuk membuang referensi lama (Teknologi Pangan, Teknik Informatika, dll.):
- **Konfigurasi Utama**: `prodi.config.ts` diatur sebagai master configuration untuk KTF (Kriya Tekstil dan Fashion).
- **Fallback Layout Publik**: Semua Astro Page Layouts diperbarui dengan data KTF:
  - `VisiMisiPageLayout.astro`: Visi, Misi, dan Tujuan Pendidikan KKTF.
  - `TulisanDosenPageLayout.astro`: Daftar publikasi dosen bertema kriya, eco-fashion, batik, dan struktur tenun kontemporer.
  - `PrestasiPageLayout.astro`: Prestasi program studi dan mahasiswa kriya (Batik, Ecoprint, Fashion Design).
  - `KurikulumPageLayout.astro`: Struktur kurikulum, CPL/PLO, profil lulusan, dan tahapan Tugas Akhir yang disesuaikan dengan KKTF.
  - `KegiatanDosenPageLayout.astro`: Dokumentasi pameran, riset serat hayati BRIN, dan workshop ecoprint.
- **Database & Migration Seeds**: File SQL berikut telah diperbarui sepenuhnya agar menyemai data awal yang konsisten dengan identitas KTF:
  - `schema.sql` (Master database seed)
  - `migration_content_tables.sql` (Data alumni, kegiatan, prestasi)
  - `migration_academic_tables.sql` (Data kurikulum, profil lulusan, PLO)

## Status Teknis Terakhir (Verifikasi Build)

- **CMS Build (`cms-umbandung-v2`)**: `SUCCESS` (Bundling Vite selesai tanpa error).
- **Public Site Build (`prodi-umbandung`)**: `SUCCESS` (Seluruh 26 rute statis berhasil di-generate tanpa SSR/hydration error).
