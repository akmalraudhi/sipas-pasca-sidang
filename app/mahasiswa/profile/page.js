'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// ── FIX UTAMA: MENAMBAHKAN ICON CALENDAR YANG SEBELUMNYA TERTINGGAL ──
import { 
  User, GraduationCap, Mail, Phone, MapPin, 
  Book, Newspaper, ShieldCheck, ArrowLeft, Award, Calendar
} from 'lucide-react';

export default function ProfilPage() {
  const [jalurAktif, setJalurAktif] = useState('skripsi');

  // Sinkronisasi Global Jalur Kelulusan dari LocalStorage agar selaras dengan halaman lainnya
  useEffect(() => {
    const savedJalur = localStorage.getItem('jalurKelulusan');
    if (savedJalur) {
      setJalurAktif(savedJalur);
    }
  }, []);

  // Data Profil Utama Prila Fathur Rizqi (Sesuai Data Institusi Paramadina)
  const me = {
    nama: "Prila Fathur Rizqi",
    nim: "123103149",
    prodi: "S1 Informatika",
    fakultas: "Fakultas Ilmu Komputer & Desain",
    email: "prila.fathur@students.paramadina.ac.id",
    telepon: "+62 812-3456-7890",
    angkatan: "2022",
    statusAkademik: "Aktif (Pasca-Sidang)",
    judulKarya: "Analisis Komunikasi Strategis dalam Diplomasi Digital"
  };

  return (
    <div className="w-full bg-[#F8F9FF] min-h-screen text-[#0D1C2E] p-4 sm:p-6 lg:p-8 space-y-6 animate-fadeIn">
      
      {/* ── 1. HEADER HALAMAN (SELARAS DENGAN DASHBOARD) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-[#0A2540]">
            Profil Mahasiswa
          </h1>
          <p className="text-sm text-gray-500">
            Kelola informasi data diri dan periksa validitas status rute akademik Anda
          </p>
        </div>
        
        <Link href="/mahasiswa/dashboard">
          <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 hover:bg-slate-50 text-xs font-bold text-gray-600 rounded-xl transition-all shadow-sm cursor-pointer">
            <ArrowLeft size={14} />
            <span>Kembali ke Dasbor</span>
          </button>
        </Link>
      </div>

      {/* ── 2. KARTU HERO UTAMA PROFIL (KARYA CORPORATE MODERN) ── */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
        {/* Dekorasi Latar Belakang Aksen Logo Instansi */}
        <div className="absolute right-0 top-0 opacity-[0.02] pointer-events-none transform translate-x-8 -translate-y-8 scale-150">
          <GraduationCap size={300} className="text-[#0A2540]" />
        </div>

        {/* Avatar Bulat Besar */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#0A2540] to-[#1E3A8A] flex items-center justify-center text-white font-black text-3xl shadow-md border-4 border-white flex-shrink-0">
          PR
        </div>

        {/* Detail Ringkas Identitas */}
        <div className="space-y-2 text-center sm:text-left flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
            <h2 className="text-xl font-black text-[#0A2540] tracking-tight">{me.nama}</h2>
            <span className="px-2.5 py-0.5 bg-green-50 border border-green-200 text-green-700 text-[10px] font-extrabold uppercase rounded-md tracking-wider mx-auto sm:mx-0 w-max">
              {me.statusAkademik}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 font-bold tracking-wide uppercase">
            NIM: {me.nim} <span className="text-gray-300 mx-1">|</span> {me.prodi}
          </p>
          <p className="text-xs text-gray-400 font-medium">{me.fakultas}</p>
        </div>

        {/* Jalur Kelulusan Aktif Badge */}
        <div className="pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100 w-full sm:w-auto flex flex-col items-center sm:items-end justify-center flex-shrink-0">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">Metode Kelulusan</span>
          <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black tracking-wide uppercase border shadow-sm ${
            jalurAktif === 'skripsi' 
              ? 'bg-blue-50 text-[#0A2540] border-blue-100' 
              : 'bg-teal-50 text-teal-700 border-teal-100'
          }`}>
            {jalurAktif === 'skripsi' ? <Book size={13} /> : <Newspaper size={13} />}
            {jalurAktif === 'skripsi' ? 'Skripsi / Tugas Akhir' : 'Publikasi Jurnal'}
          </span>
        </div>
      </div>

      {/* ── 3. DETAILED DATA GRID (2 KOLOM STRUKTUR SEJAJAR) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* BLOK KIRI: INFORMASI DATA DIRI KONTAK */}
        <div className="lg:col-span-2 bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-slate-50/60 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User size={18} className="text-[#0A2540]" />
              <h3 className="text-xs font-black text-[#0A2540] uppercase tracking-wider">Biodata & Kontak Resmi</h3>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: "Email Mahasiswa", value: me.email, icon: <Mail size={16} /> },
              { label: "Nomor Telepon / WA", value: me.telepon, icon: <Phone size={16} /> },
              { label: "Tahun Angkatan", value: me.angkatan, icon: <Calendar size={16} /> },
              { label: "Kampus Afiliasi", value: "Universitas Paramadina Jakarta", icon: <MapPin size={16} /> }
            ].map((info, idx) => (
              <div key={idx} className="p-4 bg-slate-50/50 border border-gray-100 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">{info.label}</span>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-[#0D1C2E]">
                  <div className="text-[#0A2540]">{info.icon}</div>
                  <span className="truncate">{info.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BLOK KANAN: DOKUMEN PENELITIAN & AKREDITASI */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#0A2540]">
              <Award size={18} />
              <h3 className="text-xs font-black text-[#0A2540] uppercase tracking-wider">Topik Karya Ilmiah</h3>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Judul Terdaftar</span>
              <p className="text-xs sm:text-sm font-bold text-[#0A2540] italic leading-relaxed">
                "{me.judulKarya}"
              </p>
            </div>
          </div>

          {/* Banner Validasi Keamanan Data */}
          <div className="mt-6 p-4 bg-slate-50 border border-gray-200 rounded-xl flex items-start gap-2.5 text-gray-500">
            <ShieldCheck size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed font-medium">
              Data profil di atas bersumber langsung dari sistem Pusat Data PDDikti Kemendikbudristek RI dan bersifat mutlak.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
