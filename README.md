# Panel CMS — Prodi Kriya Tekstil dan Fashion UMB

Aplikasi **`cms-prodi`** adalah panel administrator kustom yang dirancang dari nol untuk mendampingi situs beranda program studi (`prodi-umbandung`). CMS ini memberikan kontrol penuh terhadap konten beranda, berita, agenda kegiatan, data statistik prodi, arsip karya mahasiswa, testimoni alumni, dan daftar mitra kerja sama.

---

## 1. Desain & Antarmuka Utama (Aesthetic Design System)

Panel CMS dirancang selaras dengan brand identity **Kriya Tekstil dan Fashion (KTF) Universitas Muhammadiyah Bandung**:
* **Tema Neo-Brutalist & Premium Dark-Navy**: Menggunakan palet biru dongker gelap (`#0B132B`, `#1C2541`) dengan aksen kuning terang khas UMB (`#FFD700`) dan sian digital (`#00F0FF`).
* **Sudut Tajam (Zero Border-Radius)**: Selaras dengan estetika brutalist di web utama, seluruh tombol, kartu, input form, dan modal memiliki `border-radius: 0 !important;` dengan outline tebal berbayang padat (*brutal shadows*).
* **Tipografi Premium**: Judul menggunakan **Outfit** (modern, tebal), teks isi menggunakan **Inter** (sangat terbaca), dan data/kode menggunakan **JetBrains Mono** untuk kejelasan sistem pengarsipan.
* **Responsive Layout**: Menggunakan sidebar navigasi tetap di layar lebar yang otomatis menciut menjadi menu atas pada perangkat tablet/mobile.

---

## 2. Fitur Utama

1. **Dual-Mode Database (Failover & Mock Mode)**:
   * Jika kredensial Supabase dikonfigurasi (melalui `.env` atau menu *Settings* di UI), CMS akan terhubung langsung ke database cloud.
   * Jika tidak ada konfigurasi, CMS secara otomatis masuk ke **Mode Local Storage (Mock Data)**. Anda tetap bisa menambah, mengubah, dan menghapus data tanpa perlu setup server terlebih dahulu.
2. **Input Bilingual (Bahasa Indonesia & English Translation)**:
   * Dukungan penuh multibahasa untuk data berita, kegiatan akademik, testimoni, dan deskripsi dinamis landing page.
3. **Penyunting Teks Halaman (Site Content Manager)**:
   * Mengatur judul banner, deskripsi *Philosophy*, nama Kaprodi, dan sambutan hangat secara langsung melalui text editor side-by-side.
4. **Galeri Portofolio & Stats Ribbon**:
   * Kelola visual karya mahasiswa (termasuk rasio grid CSS: 1x1, 2x1, 1x2, 2x2) dan 4 stats ribbon pendukung di landing page.

---

## 3. Cara Penggunaan Lokal

1. Masuk ke direktori `cms-prodi`:
   ```bash
   cd cms-prodi
   ```
2. Jalankan development server:
   ```bash
   npm run dev
   ```
3. Buka browser di [http://localhost:5173/](http://localhost:5173/)
4. Di halaman login, klik **Auto-fill Admin Credentials** lalu klik **Sign In** untuk menjelajahi dashboard menggunakan database lokal.
5. Jika ingin menghubungkan ke database online:
   * Masuk ke tab **Settings & Database** di sidebar.
   * Tempelkan **Supabase URL** dan **Anon API Key** milik Anda.
   * Klik **Hubungkan**. Sistem akan mengalihkan koneksi secara instan.

---

## 4. Script Setup Database Supabase

Jalankan perintah SQL berikut di dashboard editor database Supabase Anda untuk menginisialisasi tabel-tabel data:

```sql
-- SQL Tables Setup
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_en text,
  category text not null,
  category_en text,
  snippet text not null,
  snippet_en text,
  date text not null,
  img_src text not null,
  created_at timestamptz default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  date_day text not null,
  date_month text not null,
  title text not null,
  title_en text,
  location text not null,
  location_en text,
  created_at timestamptz default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  testimonial text not null,
  testimonial_en text,
  "by" text not null,
  by_en text,
  img_src text not null,
  created_at timestamptz default now()
);

create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz default now()
);

create table if not exists public.site_content (
  key text primary key,
  value text not null,
  value_en text,
  updated_at timestamptz default now()
);

create table if not exists public.landing_stats (
  id uuid primary key default gen_random_uuid(),
  number text not null,
  label text not null,
  sort_order int not null,
  created_at timestamptz default now()
);

create table if not exists public.landing_partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sort_order int not null,
  created_at timestamptz default now()
);

create table if not exists public.landing_portfolio_items (
  id uuid primary key default gen_random_uuid(),
  image text not null,
  title text not null,
  medium text not null,
  technique text not null,
  year text not null,
  "gridClass" text not null,
  sort_order int not null,
  created_at timestamptz default now()
);
```
