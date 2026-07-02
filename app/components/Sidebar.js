"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// ── MENAMBAHKAN IKON YANG COCOK UNTUK SETIAP HALAMAN ──
import { 
  Bell, X, Info, AlertTriangle, CheckCircle,
  LayoutDashboard, ClipboardList, History, Monitor, User, LogOut
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Menentukan menu berdasarkan folder rute aktif
  const isPtsp = pathname.startsWith("/monitoring");

  // MASING-MASING MENU KINI MEMILIKI PROPERTI ICON YANG SESUAI
  const menuItems = isPtsp
    ? [
        { name: "Dashboard Monitoring", href: "/monitoring", icon: <Monitor size={18} /> },
      ]
    : [
        { name: "Dashboard", href: "/mahasiswa/dashboard", icon: <LayoutDashboard size={18} /> },
        { name: "Form Pengajuan", href: "/mahasiswa/pengajuan", icon: <ClipboardList size={18} /> },
        { name: "Riwayat Status", href: "/mahasiswa/riwayat", icon: <History size={18} /> },
      ];

  const isProfileActive = pathname === "/mahasiswa/profile";

  return (
    <>
      {/* HEADER UTAMA GLOBAL */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#0A2540] text-white flex items-center justify-between px-5 z-50 shadow-md">
        <div className="flex items-center gap-4">
          {/* Tombol Hamburger Mobile */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none p-1.5 rounded-lg hover:bg-[#1E3A8A] transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* LOGO SIPAS */}
          <div className="flex items-center py-1">
            <img 
              src="/L0g0.png" 
              alt="Logo SIPAS Paramadina" 
              className="h-15 w-auto object-contain transition-all"
            />
          </div>
          
          <span className="font-bold text-base sm:text-lg tracking-wide hidden sm:inline-block ml-1">
            SIPAS <span className="text-gray-400 font-light text-sm">| {isPtsp ? "PTSP Admin" : "Mahasiswa"}</span>
          </span>
        </div>

        {/* SEKTOR KANAN: PANEL NOTIFIKASI INTERAKTIF */}
        <div className="flex items-center gap-4 relative">
          <Link 
            href="/mahasiswa/notifications"
            className="p-2 text-blue-200 hover:text-white rounded-xl hover:bg-white/10 transition-all relative cursor-pointer focus:outline-none"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-[9px] font-black rounded-full flex items-center justify-center text-white ring-2 ring-[#0A2540]">
              3
            </span>
          </Link>

          {/* Indikator Status Sistem */}
          <div className="hidden sm:flex items-center gap-2 bg-[#1E3A8A]/40 border border-[#1E3A8A] px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Sistem Aktif
          </div>
        </div>
      </header>

      {/* SIDEBAR NAVIGASI */}
      <nav className={`
        fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-100 z-40 transition-transform duration-300 flex flex-col justify-between
        md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        
        {/* BAGIAN ATAS: MENU UTAMA */}
        <div className="p-4 flex-1 overflow-y-auto">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-3">
            Menu Utama
          </p>
          
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-[#0A2540] text-white shadow-md shadow-[#0A2540]/10 scale-[1.02]"
                      : "text-gray-600 hover:bg-slate-50 hover:text-[#0A2540]"
                  }`}
                >
                  {/* MENAMPILKAN IKON MENU */}
                  <div className={isActive ? "text-amber-400" : "text-gray-400"}>
                    {item.icon}
                  </div>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* BAGIAN BAWAH: PROFIL & LOGOUT */}
        <div className="p-4 border-t border-gray-100 bg-white space-y-3">
          
          {/* KOTAK PROFIL */}
          <Link 
            href="/mahasiswa/profile"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 p-3 border rounded-xl shadow-sm transition-all duration-200 cursor-pointer ${
              isProfileActive 
                ? "bg-[#0A2540] border-[#0A2540] text-white scale-[1.02] shadow-md shadow-[#0A2540]/10" 
                : "bg-slate-50 border-slate-100 text-gray-700 hover:bg-slate-100"
            }`}
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors ${
              isProfileActive ? "bg-white text-[#0A2540]" : "bg-[#0A2540] text-white"
            }`}>
              <User size={16} />
            </div>
            <div className="overflow-hidden">
              <h4 className={`text-xs font-bold truncate ${isProfileActive ? "text-white" : "text-[#0A2540]"}`}>
                Prila Fathur Rizqi
              </h4>
              <p className={`text-[10px] font-medium tracking-wider uppercase ${isProfileActive ? "text-blue-200" : "text-gray-400"}`}>
                MAHASISWA
              </p>
            </div>
          </Link>

          {/* TOMBOL LOGOUT */}
          <div>
            <button 
              onClick={() => {
                localStorage.removeItem('isLoggedIn');
                window.location.href = '/login';
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-red-600 hover:bg-red-50/70 transition-all duration-200 group text-left cursor-pointer"
            >
              <LogOut size={16} className="text-red-500 group-hover:translate-x-0.5 transition-transform" />
              Keluar Aplikasi
            </button>
          </div>

        </div>
      </nav>

      {/* Backdrop Mobile */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 z-30 md:hidden transition-opacity top-16"
        />
      )}
    </>
  );
}