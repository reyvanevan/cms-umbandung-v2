# Catatan Prioritas Proyek

Dokumen ini mencatat tiga hal utama yang perlu dibereskan sebelum proyek dipakai lebih serius atau masuk production. Catatan dibuat dari hasil review struktur `cms-prodi` dan integrasinya dengan website publik `prodi-umbandung`.

## 1. Lengkapi Modal CRUD untuk Tab CMS Baru

`App.tsx` sudah punya state dan handler CRUD untuk beberapa tab baru:

- `prestasi`
- `publikasi_dosen`
- `kegiatan_dosen`
- `kegiatan_mahasiswa`
- `alumni`
- `statistik_maba`

Namun `CrudModal.tsx` baru menyediakan form sampai `tugas_akhir_steps`. Akibatnya tombol tambah/edit pada tab-tab baru berisiko membuka modal tanpa field input yang sesuai, sehingga data tidak bisa dibuat atau diperbarui dengan benar dari UI.

Target perbaikan:

- Tambahkan props form dan setter untuk semua tab baru ke `CrudModal`.
- Tambahkan tampilan form masing-masing tab.
- Pastikan upload gambar bekerja untuk field seperti `image_url`.
- Verifikasi create/edit/delete di mode mock dan Supabase.

## 2. Rapikan Integrasi Supabase Client dan Server di Website Publik

Website publik punya helper Supabase yang mengembalikan `null` saat berjalan di server karena bergantung pada `window`. Tetapi beberapa layout Astro memanggil fungsi database dari frontmatter server-side, misalnya halaman dosen, prestasi, dan statistik.

Dampaknya, halaman-halaman tersebut kemungkinan selalu jatuh ke fallback data statis saat build/server render, walaupun environment Supabase sudah dikonfigurasi.

Target perbaikan:

- Pisahkan Supabase browser client dan server/static-build client.
- Gunakan client server-safe untuk pemanggilan dari `.astro` frontmatter.
- Pertahankan client browser untuk komponen React yang memang memakai `client:load`.
- Uji ulang halaman publik yang datanya harus berasal dari Supabase.

## 3. Samakan Identitas Program Studi dan Konten Fallback

Masih ada inkonsistensi domain program studi di beberapa tempat:

- README/tech spec menyebut Kriya Tekstil dan Fashion.
- Konfigurasi utama website masih memakai Teknik Informatika.
- Banyak seed schema, migration, dan fallback content memakai Teknologi Pangan.

Ini tidak menyebabkan build gagal, tetapi berisiko besar untuk konten production karena label, deskripsi, kurikulum, mitra, dan narasi halaman bisa saling bertabrakan.

Target perbaikan:

- Tentukan satu identitas program studi yang benar.
- Sinkronkan `PRODI_CONFIG`, `site-data`, `mockData`, schema seed, migration, label CMS, dan README.
- Setelah disamakan, reset data mock lokal dan seed Supabase agar data awal konsisten.
- Review ulang halaman ID dan EN untuk memastikan narasi bilingual sesuai.

## Status Teknis Saat Dicatat

- `npm run build` berhasil di `cms-prodi`.
- `npm run build` berhasil di `prodi-umbandung`.
- `npm run lint` belum bersih di kedua proyek.
- Worktree awal bersih sebelum dokumen ini ditambahkan.
