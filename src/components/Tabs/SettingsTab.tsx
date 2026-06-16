import React, { useState } from 'react';
import { Database, Key, CheckCircle, XCircle, RefreshCw, Trash2, Copy, Check } from 'lucide-react';
import { type ConnectionMode } from '../../lib/dataService';
import { type SupabaseConfig } from '../../lib/supabase';

interface SettingsTabProps {
  connectionMode: ConnectionMode;
  supabaseConfig: SupabaseConfig;
  dbStatusMessage: string;
  isStatusChecking: boolean;
  onSaveCredentials: (url: string, key: string) => void;
  onClearCredentials: () => void;
  onCheckConnection: () => void;
  onResetMockData: () => void;
  triggerToast: (msg: string, type?: 'success' | 'error' | 'warning') => void;
}

export default function SettingsTab({
  connectionMode,
  supabaseConfig,
  dbStatusMessage,
  isStatusChecking,
  onSaveCredentials,
  onClearCredentials,
  onCheckConnection,
  onResetMockData,
  triggerToast
}: SettingsTabProps) {
  const [urlInput, setUrlInput] = useState(supabaseConfig.url);
  const [keyInput, setKeyInput] = useState(supabaseConfig.anonKey);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput || !keyInput) {
      triggerToast('Mohon isi Supabase URL & Anon Key!', 'error');
      return;
    }
    onSaveCredentials(urlInput, keyInput);
    triggerToast('Kredensial disimpan! Sistem mencoba menghubungkan...', 'success');
  };

  const handleClear = () => {
    onClearCredentials();
    setUrlInput('');
    setKeyInput('');
    triggerToast('Kredensial dihapus! Kembali menggunakan Local Mock Mode.', 'warning');
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    triggerToast('SQL skema disalin!', 'success');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const sqlSchemas = [
    {
      title: 'Tabel news (Berita)',
      sql: `create table news (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  title_en text,
  category text not null,
  category_en text,
  snippet text not null,
  snippet_en text,
  date text not null,
  img_src text not null
);`
    },
    {
      title: 'Tabel events (Event Terkini)',
      sql: `create table events (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  date_day text not null,
  date_month text not null,
  title text not null,
  title_en text,
  location text not null,
  location_en text
);`
    },
    {
      title: 'Tabel testimonials (Testimoni)',
      sql: `create table testimonials (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  testimonial text not null,
  testimonial_en text,
  by text not null,
  by_en text,
  img_src text not null
);`
    },
    {
      title: 'Tabel partners (Mitra Logo)',
      sql: `create table partners (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null
);`
    },
    {
      title: 'Tabel landing_stats (Stat Ribbon)',
      sql: `create table landing_stats (
  id uuid default gen_random_uuid() primary key,
  number text not null,
  label text not null,
  sort_order integer not null default 0
);`
    },
    {
      title: 'Tabel landing_portfolio_items (Galeri)',
      sql: `create table landing_portfolio_items (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  year text not null,
  medium text not null,
  technique text not null,
  image text not null,
  "gridClass" text not null default 'col-span-1',
  sort_order integer not null default 0
);`
    },
    {
      title: 'Tabel site_content (Teks Halaman)',
      sql: `create table site_content (
  key text primary key,
  value text not null,
  value_en text,
  section text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);`
    },
    {
      title: 'Setup Storage Bucket (Penyimpanan Gambar/Video)',
      sql: `-- 1. Jalankan query ini jika ingin membuat bucket prodi-assets & kebijakan akses secara manual
insert into storage.buckets (id, name, public)
values ('prodi-assets', 'prodi-assets', true)
on conflict (id) do nothing;

-- 2. Kebijakan akses publik untuk membaca berkas
create policy "Allow public read-only access"
on storage.objects for select
using ( bucket_id = 'prodi-assets' );

-- 3. Kebijakan untuk mengizinkan unggah berkas (insert)
create policy "Allow public uploads"
on storage.objects for insert
with check ( bucket_id = 'prodi-assets' );

-- 4. Kebijakan untuk memperbarui berkas (update)
create policy "Allow public updates"
on storage.objects for update
using ( bucket_id = 'prodi-assets' );`
    }
  ];

  return (
    <div className="space-y-8 select-none max-w-4xl">
      {/* DB setup section */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6 glass-card">
        <div>
          <h2 className="text-base font-bold text-gray-950 uppercase tracking-wider flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-600" />
            <span>Setup Kredensial Supabase</span>
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Integrasikan CMS dengan backend database Supabase Anda agar data bersinkronisasi langsung dengan landing page.
          </p>
        </div>

        {/* Status card */}
        <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            {connectionMode === 'supabase' ? (
              <CheckCircle className="w-8 h-8 text-green-500 shrink-0" />
            ) : (
              <XCircle className="w-8 h-8 text-amber-500 shrink-0" />
            )}
            <div>
              <div className="text-xs text-gray-400">Status Koneksi Saat Ini</div>
              <div className="text-sm font-bold text-gray-900 mt-0.5 uppercase">
                {connectionMode === 'supabase' ? 'DATABASE ONLINE' : 'LOCAL MOCK DATABASE ACTIVE'}
              </div>
              <div className="text-[11px] text-gray-400 mt-0.5">{dbStatusMessage}</div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onCheckConnection}
              disabled={isStatusChecking}
              className="px-4 py-2 border border-gray-200 hover:bg-gray-100 text-gray-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isStatusChecking ? 'animate-spin' : ''}`} />
              <span>Tes Ulang Koneksi</span>
            </button>
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Supabase API URL</label>
            <input
              type="text"
              placeholder="https://xyz.supabase.co"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
              <Key className="w-3.5 h-3.5" />
              <span>Supabase Anon Public Key</span>
            </label>
            <input
              type="password"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5..."
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="px-5 py-2.5 bg-black hover:bg-gray-900 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-gray-200/50 transition cursor-pointer"
            >
              <span>Hubungkan Database</span>
            </button>

            {supabaseConfig.source === 'localStorage' && (
              <button
                type="button"
                onClick={handleClear}
                className="px-5 py-2.5 border border-red-200 hover:bg-red-50 text-red-600 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <span>Hapus & Putuskan Kredensial</span>
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Local mockup tools */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6 glass-card">
        <div>
          <h2 className="text-base font-bold text-gray-950 uppercase tracking-wider flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-red-500" />
            <span>Reset Local Mock Data</span>
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Jika local storage Anda bermasalah atau Anda ingin mengembalikan data tiruan ke keadaan semula.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={onResetMockData}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-red-200/50 transition cursor-pointer"
          >
            <span>Reset Database Mock</span>
          </button>
        </div>
      </div>

      {/* Copy SQL Schema section */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6 glass-card">
        <div>
          <h2 className="text-base font-bold text-gray-950 uppercase tracking-wider">
            Struktur Tabel SQL Supabase
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Gunakan skema SQL DDL di bawah ini untuk membuat tabel di konsol SQL editor Supabase Anda agar kompatibel secara langsung.
          </p>
        </div>

        <div className="space-y-6">
          {sqlSchemas.map((schema, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700">{schema.title}</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(schema.sql, index)}
                  className="px-2.5 py-1 border border-gray-200 hover:bg-gray-50 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition cursor-pointer text-gray-600"
                >
                  {copiedIndex === index ? (
                    <>
                      <Check className="w-3 h-3 text-green-500" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy SQL</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-[11px] font-mono text-gray-600 overflow-x-auto">
                {schema.sql}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
