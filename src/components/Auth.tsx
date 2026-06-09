import React from 'react';
import { Database, LogIn, RefreshCw, Settings, LayoutGrid } from 'lucide-react';
import { type ConnectionMode } from '../lib/dataService';

interface AuthProps {
  authEmail: string;
  setAuthEmail: (email: string) => void;
  authPassword: string;
  setAuthPassword: (password: string) => void;
  isAuthLoading: boolean;
  connectionMode: ConnectionMode;
  handleSignIn: (e: React.FormEvent) => void;
  triggerToast: (msg: string, type?: 'success' | 'error' | 'warning') => void;
  setIsAuthenticated: (val: boolean) => void;
  setCurrentUserEmail: (email: string) => void;
  setActiveTab: (tab: any) => void;
}

export default function Auth({
  authEmail,
  setAuthEmail,
  authPassword,
  setAuthPassword,
  isAuthLoading,
  connectionMode,
  handleSignIn,
  triggerToast,
  setIsAuthenticated,
  setCurrentUserEmail,
  setActiveTab
}: AuthProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 relative overflow-hidden px-4 select-none">
      {/* Decorative gradient blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#0B2545]/5 blur-[120px] opacity-70"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#0B2545]/5 blur-[120px] opacity-70"></div>

      <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl p-8 shadow-xl relative z-10 glass-card">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-[#0B2545] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-[#0B2545]/20">
            <LayoutGrid className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0B2545]">CMS Prodi</h1>
          <p className="text-xs text-gray-400 font-medium mt-1 uppercase tracking-wider">Universitas Muhammadiyah Bandung</p>
        </div>

        {/* Connection Mode Status */}
        <div className="mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
          <Database className={`w-5 h-5 ${connectionMode === 'supabase' ? 'text-green-600' : 'text-amber-500'}`} />
          <div className="text-xs text-gray-500 font-medium">
            Database Mode: <strong className={`font-bold uppercase ${connectionMode === 'supabase' ? 'text-green-600' : 'text-amber-500'}`}>{connectionMode === 'supabase' ? 'Supabase' : 'Local Mock'}</strong>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSignIn} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Administrator</label>
            <input
              type="email"
              placeholder="admin@umb.ac.id"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2545]/10 focus:border-[#0B2545] focus:bg-white transition"
              value={authEmail}
              onChange={(e) => setAuthEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2545]/10 focus:border-[#0B2545] focus:bg-white transition"
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#0B2545] hover:bg-[#061830] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition shadow-md shadow-[#0B2545]/15 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            disabled={isAuthLoading}
          >
            {isAuthLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Sign In...</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        {/* Local Mock Helper */}
        {connectionMode === 'mock' && (
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-[10px] text-gray-400 mb-3 leading-relaxed">
              * Local mode active. You can log in using any email & password (min 4 chars) to test the dashboard.
            </p>
            <button
              type="button"
              className="px-4 py-2 border border-gray-200 hover:bg-[#0B2545]/5 hover:border-[#0B2545]/20 text-[#0B2545] rounded-xl text-xs font-semibold transition cursor-pointer"
              onClick={() => {
                setAuthEmail('admin@umb.ac.id');
                setAuthPassword('admin123');
                triggerToast('Credentials pre-filled. Click Sign In!', 'warning');
              }}
            >
              Auto-fill Credentials
            </button>
          </div>
        )}

        {/* Bypass to settings */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-[#0B2545] transition cursor-pointer"
            onClick={() => {
              triggerToast('Please configure Supabase URL and Key inside settings!', 'warning');
              setIsAuthenticated(true);
              setCurrentUserEmail('Guest Developer');
              setActiveTab('settings');
            }}
          >
            <Settings className="w-4 h-4" />
            <span>Setup Supabase URL & Keys</span>
          </button>
        </div>
      </div>
    </div>
  );
}
