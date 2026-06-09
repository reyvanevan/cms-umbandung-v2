# Dokumentasi Pembaruan Sistem: Halaman & Manajemen Dosen

Pembaruan ini menambahkan halaman profil **Dosen & Staff** pada website program studi (`prodi-umbandung`) serta mengintegrasikan manajemen CRUD (Create, Read, Update, Delete) dosen ke dalam panel administrasi (`cms-umbandung-v2`).

---

## 1. Pembaruan pada Website (`prodi-umbandung`)

### **Fitur & Halaman Baru**
- **`/src/pages/dosen.astro` (Halaman Bahasa Indonesia)**: Rencana antarmuka neo-brutalis untuk menampilkan daftar dosen program studi. Setiap dosen memiliki kartu profil yang menampilkan foto, nama lengkap, metrik akademik (Scopus, Sinta, Scholar), serta tautan media sosial.
- **`/src/pages/en/dosen.astro` (Halaman Bahasa Inggris)**: Lokalisasi halaman profil dosen untuk versi bahasa Inggris ("Faculty & Staff").

### **Navigasi & Menu**
- **`/src/components/Navigation.tsx` (Desktop Navigation)**:
  - Mengganti menu "Admission" menjadi "Akademik".
  - Menghapus menu "Home" (pengguna dapat kembali ke halaman utama dengan mengklik logo prodi).
  - Menghapus opsi "Sinta Prodi".
  - Menambahkan menu dropdown bercabang/sub-dropdown untuk profil dan akademik.
  - Mengarahkan tautan submenu "Dosen" ke `/dosen` (ID) dan `/en/dosen` (EN).
- **`/src/components/NavDrawer.tsx` (Mobile Navigation)**:
  - Menyelaraskan seluruh struktur menu mobile agar sesuai dengan versi desktop (menghapus Home, mengganti Admission, dan memperbarui tautan halaman Dosen).

### **Integrasi & Skema Data**
- **`/src/lib/supabase/db.ts`**:
  - Menambahkan fungsi `getDosenList()` untuk mengambil data dosen dari Supabase.
  - Mengimplementasikan mekanisme *fail-safe* (fallback) ke data statis/lokal dari `site-data.ts` jika koneksi Supabase tidak diatur atau gagal terhubung.
- **`/src/lib/supabase/schema.sql`**:
  - Menambahkan deklarasi skema tabel `dosen` Supabase:
    ```sql
    CREATE TABLE IF NOT EXISTS dosen (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      img_src TEXT,
      scopus TEXT,
      sinta TEXT,
      scholar TEXT,
      facebook TEXT,
      twitter TEXT,
      tiktok TEXT,
      instagram TEXT,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
    );
    ```
- **`/src/lib/site-data.ts`**:
  - Menambahkan objek data statis fallback (`dosenDataID` dan `dosenDataEN`) untuk memunculkan dosen *default* jika database utama luring.

---

## 2. Pembaruan pada Dashboard CMS (`cms-umbandung-v2`)

### **Model & Data Layer**
- **`/src/lib/mockData.ts`**:
  - Membuat antarmuka TypeScript `DbDosen` agar sesuai dengan skema database.
  - Menambahkan data awal (`initialDosen`) untuk visualisasi saat mode mock diaktifkan.
  - Memperbarui fungsi `initStorage` agar mendaftarkan koleksi `mock_dosen` pada localStorage browser.
- **`/src/lib/dataService.ts`**:
  - Menambahkan fungsi CRUD API: `getDosen()`, `createDosen()`, `updateDosen()`, dan `deleteDosen()`.
  - Mengarahkan query secara dinamis ke REST API Supabase (jika tersambung) atau ke helper MockDB localStorage (jika menggunakan mode demo offline).

### **Antarmuka CMS (UI/UX Components)**
- **`/src/components/Tabs/DosenTab.tsx` (Tab Baru)**:
  - Antarmuka tabel neo-brutalist dengan fitur pencarian (search bar) berdasarkan nama dosen.
  - Menampilkan ringkasan metrik Scopus, Sinta, Scholar, serta tombol aksi cepat untuk menambah, mengedit, atau menghapus item dosen.
- **`/src/components/Sidebar.tsx`**:
  - Menambahkan menu item **"Dosen & Staff"** lengkap dengan ikon `GraduationCap` di navigasi utama panel admin.
- **`/src/components/Modals/CrudModal.tsx`**:
  - Menambahkan form input khusus untuk data dosen (Nama, Urutan Tampilan, ID Scopus, ID Sinta, ID Scholar, URL Facebook, Twitter, TikTok, Instagram, serta sistem upload gambar via berkas lokal/URL eksternal).
- **`/src/App.tsx` (Root State Management)**:
  - Menambahkan tipe tab baru `'dosen'` pada `TabType`.
  - Menyediakan *state* global untuk `dosenList` dan `dosenForm`.
  - Menyambungkan form input modal ke trigger API untuk tambah (`createDosen`) dan perbarui (`updateDosen`).
  - Menambahkan opsi hapus data dosen pada modal konfirmasi hapus (`deleteDosen`).
  - Menambahkan opsi reset `mock_dosen` pada menu Settings Database.
