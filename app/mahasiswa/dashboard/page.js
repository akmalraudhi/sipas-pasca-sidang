'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calendar, FileText, ChevronRight, HelpCircle, 
  MessageSquare, Mail, CheckCircle2, ArrowUpRight
} from 'lucide-react';

// ── IMPORT KOMPONEN MODULAR RELATIF ──
import CountdownTimer from '../../components/CountdownTimer';
import StatCard from '../../components/StatCard';

export default function DashboardPage() {
  const [jalurAktif, setJalurAktif] = useState('skripsi');

  useEffect(() => {
    // Sinkronisasi Global Jalur Kelulusan dari LocalStorage
    const savedJalur = localStorage.getItem('jalurKelulusan');
    if (savedJalur) {
      setJalurAktif(savedJalur);
    }
  }, []);

  const me = {
    nama: "Prila Fathur Rizqi",
    nim: "123103149",
    jalur: jalurAktif,
    judul: "Analisis Komunikasi Strategis dalam Diplomasi Digital"
  };

  // Tanggal sidang riil untuk memicu kalkulasi CountdownTimer
  const [tanggalSidang] = useState('2026-06-15'); 

  // Daftar berkas riil berdasarkan dokumen terbaru di Google Drive Anda
  const gdriveLinks = [
    {
      nama: "Informasi Setelah Sidang Akhir_Softfile.pdf",
      deskripsi: "Panduan langkah dan berkas administratif wajib pasca-kelulusan sidang.",
      format: "PDF",
      color: "bg-red-50 text-red-700 border-red-200",
      previewUrl: "https://drive.google.com/file/d/1SEmiewo4fDYDoRezefoEMFBKcjmItoN8/view?usp=sharing",
      downloadUrl: "https://drive.google.com/uc?export=download&id=1SEmiewo4fDYDoRezefoEMFBKcjmItoN8"
    },
    {
      nama: "LEMBAR PENGESAHAN.docx",
      deskripsi: "Template mentah lembar pengesahan revisi untuk tanda tangan dosen.",
      format: "DOCX",
      color: "bg-blue-50 text-blue-700 border-blue-200",
      previewUrl: "https://docs.google.com/document/d/1gs5_t-boK7wZzf_kLyMzpwZJo17wOmm3/edit",
      downloadUrl: "https://docs.google.com/document/d/1gs5_t-boK7wZzf_kLyMzpwZJo17wOmm3/export?format=docx"
    },
    {
      nama: "LEMBAR PERNYATAAN.docx",
      deskripsi: "Template surat pernyataan keaslian dokumen karya akhir di atas meterai.",
      format: "DOCX",
      color: "bg-blue-50 text-blue-700 border-blue-200",
      previewUrl: "https://docs.google.com/document/d/1kcCyvH3VJkSIC6KabLPROdO5FPB95VQM/edit",
      downloadUrl: "https://docs.google.com/document/d/1kcCyvH3VJkSIC6KabLPROdO5FPB95VQM/export?format=docx"
    },
    {
      nama: "Panduan_Tugas_Akhir_Program_Sarjana_dan_Magister_Tahun_2024.pdf",
      deskripsi: "Buku pedoman standar regulasi penulisan ilmiah Universitas Paramadina.",
      format: "PDF",
      color: "bg-red-50 text-red-700 border-red-200",
      previewUrl: "https://drive.google.com/file/d/1rDO-vUTCNhfQmA32PokO6gEgt2CdvouM/view?usp=sharing",
      downloadUrl: "https://drive.google.com/uc?export=download&id=1rDO-vUTCNhfQmA32PokO6gEgt2CdvouM"
    }
  ];

  return (
    <div className="w-full bg-[#F8F9FF] min-h-screen text-[#0D1C2E] p-4 sm:p-6 lg:p-8 space-y-6 animate-fadeIn">
      
      {/* ── SEKSI ATAS: GRID UTAMA TENGGAT WAKTU & STATUS SAAT INI (2 KOLOM) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* KARTU 1: TENGGAT WAKTU REVISI (Gaya Visual screen.jpg) */}
        <div className="lg:col-span-2 bg-[#0A2540] rounded-2xl p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden shadow-lg shadow-blue-950/10 min-h-[260px]">
          {/* Pola Jam Abstrak di Latar Belakang */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-10 translate-y-10 scale-150">
            <svg width="240" height="240" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.7 2.8-.-.8z"/>
            </svg>
          </div>

          <div className="space-y-3 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-sm border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              Tahap Revisi Final
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {jalurAktif === 'skripsi' ? 'Tenggat Waktu Revisi Skripsi' : 'Validasi Publikasi Jurnal Ilmiah'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              {jalurAktif === 'skripsi'
                ? 'Pengumpulan akhir termasuk seluruh tanda tangan digital dari dosen pembimbing harus diselesaikan sebelum sistem ditutup.'
                : 'Proses verifikasi status indeks jurnal dan detail kepenulisan akan ditinjau berdasarkan pedoman standar universitas.'}
            </p>
          </div>

          <div className="flex items-center gap-12 pt-6 border-t border-white/10 z-10 mt-4">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-black text-amber-400 tracking-tighter">24</span>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Hari</span>
              </div>
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Tersisa</p>
            </div>
            <div className="h-10 w-px bg-white/10"></div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-0.5">Tanggal Target</div>
              <div className="text-sm sm:text-base font-bold text-slate-100">12 Oktober 2026</div>
              <div className="text-[11px] text-slate-400">Pukul 23:59 WIB</div>
            </div>
          </div>
        </div>

        {/* KARTU 2: STATUS SAAT INI & PROGRES */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Status Saat Ini</h3>
              <span className="px-2.5 py-1 bg-amber-100/70 border border-amber-200 text-amber-800 text-[10px] font-extrabold uppercase tracking-wider rounded">
                Revisi Sedang Berjalan
              </span>
            </div>
            
            <div className="py-2">
              <p className="text-sm font-bold text-[#0A2540] italic leading-relaxed">
                "{me.judul}"
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-gray-400 uppercase tracking-wider text-[10px]">Progres Keseluruhan</span>
              <span className="text-[#0A2540]">{jalurAktif === 'skripsi' ? '75%' : '100%'}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100">
              <div 
                className="h-2 rounded-full bg-amber-500 transition-all duration-500" 
                style={{ width: jalurAktif === 'skripsi' ? '75%' : '100%' }}
              ></div>
            </div>
            <p className="text-[11px] text-gray-400 font-medium">
              {jalurAktif === 'skripsi' ? '3 dari 4 Tahapan Selesai' : 'Semua Validasi Terpenuhi'}
            </p>
          </div>
        </div>

      </div>

      {/* REVISI LIVE TIMER SEKTOR (Mencegah denda finansial bertabrakan) */}
      <div className="w-full">
        {jalurAktif === 'skripsi' && <CountdownTimer tanggalSidang={tanggalSidang} />}
      </div>

      {/* ── 3. RESOURCE CENTER / PUSAT PANDUAN PENDUKUNG (3 KOLOM SEJAJAR) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        {/* KOLOM A: JADWAL YUDISIUM */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-sm shadow-slate-100">
          <div className="absolute right-4 top-4 text-slate-100 pointer-events-none">
            <svg width="64" height="64" fill="currentColor" viewBox="0 0 24 24" className="opacity-40 text-blue-100">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5.48 13.15l-2.14-1.17L12 17.23l8.66-5.25-2.14 1.17L12 19.39l-6.52-6.24z"/>
            </svg>
          </div>

          <div className="space-y-3 z-10">
            <div className="flex items-center gap-2.5 text-[#0A2540]">
              <Calendar size={18} />
              <h4 className="text-sm font-black uppercase tracking-wider">Jadwal Yudisium</h4>
            </div>
            <div className="pt-2">
              <div className="text-2xl font-black text-[#0A2540] tracking-tight">30 Okt 2026</div>
              <p className="text-xs text-gray-500 font-medium mt-1">Auditorium Universitas Paramadina</p>
              <p className="text-[11px] text-gray-400">Pukul 09:00 - 12:00 WIB</p>
            </div>
          </div>

          <button className="w-full mt-6 py-2.5 bg-[#0A2540] hover:bg-[#1E3A8A] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer">
            <span>Tambahkan ke Kalender</span>
          </button>
        </div>

        {/* KOLOM B: PUSAT UNDUHAN (GDRIVE FILE ACCESS) */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#0A2540]">
              <FileText size={18} />
              <h4 className="text-sm font-black uppercase tracking-wider">Pusat Dokumen</h4>
            </div>

            <div className="space-y-2">
              {gdriveLinks.map((link, idx) => (
                <div key={idx} className="w-full px-3 py-2 bg-slate-50 border border-gray-100 rounded-xl flex items-center justify-between transition-all">
                  <span className="text-xs font-bold text-gray-700 truncate max-w-[160px]">{link.nama}</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <a href={link.previewUrl} target="_blank" rel="noopener noreferrer" className="p-1 text-gray-400 hover:text-[#0A2540] text-[11px] font-bold">Lihat</a>
                    <a href={link.downloadUrl} className="p-1 text-blue-600 hover:text-blue-800 text-[11px] font-bold">Unduh</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KOLOM C: DOSEN PEMBIMBING UTAMA */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-wider text-[#0A2540]">Dosen Pembimbing</h4>
            
            <div className="flex items-center gap-4 py-2">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100" 
                  alt="Dr. Ahmad Wijaya" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-black text-[#0A2540]">Dr. Ahmad Wijaya, M.A.</h5>
                <p className="text-[11px] text-gray-400 leading-tight mt-0.5">Kepala Komunikasi Strategis</p>
              </div>
            </div>
          </div>

          {/* Tombol Kontak Hubungi */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <a href="mailto:ahmad.wijaya@paramadina.ac.id" className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 transition-all cursor-pointer">
              <Mail size={13} />
              <span>Email</span>
            </a>
            <button className="flex items-center justify-center gap-1.5 py-2 px-3 bg-blue-50 hover:bg-blue-100 text-[#0A2540] rounded-xl text-xs font-bold transition-all cursor-pointer">
              <MessageSquare size={13} />
              <span>Obrolan</span>
            </button>
          </div>
        </div>

      </div>

      {/* ── 4. LOG AKTIVITAS TERBARU (RECENT UPDATES) ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#0A2540]">
            <CheckCircle2 size={18} />
            <h3 className="text-sm font-black uppercase tracking-wider">Pemberitahuan Terbaru</h3>
          </div>
          <Link href="/mahasiswa/riwayat" className="text-xs font-bold text-[#0A2540] hover:underline flex items-center gap-1">
            <span>Lihat Semua Riwayat</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        <div className="space-y-3">
          {[
            {
              title: "Hasil Sidang Disetujui",
              desc: "Hasil sidang akhir Anda telah divalidasi dan disetujui oleh Biro Administrasi Akademik.",
              time: "2 jam yang lalu",
              color: "bg-emerald-50 border-emerald-100 text-emerald-600",
              iconBg: "bg-emerald-500"
            },
            {
              title: "Catatan Masukan Baru Diterima",
              desc: "Dr. Ahmad Wijaya memberikan catatan revisi pada draf laporan Bab IV Anda.",
              time: "Kemarin",
              color: "bg-blue-50 border-blue-100 text-blue-600",
              iconBg: "bg-[#0A2540]"
            }
          ].map((log, idx) => (
            <div key={idx} className="bg-white border border-gray-200/60 p-4 rounded-xl flex items-start justify-between gap-4 shadow-sm hover:border-blue-100 transition-colors">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full ${log.iconBg} flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-sm`}>
                  {idx === 0 ? <CheckCircle2 size={15} /> : <FileText size={15} />}
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-black text-[#0A2540]">{log.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{log.desc}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap mt-0.5">{log.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
