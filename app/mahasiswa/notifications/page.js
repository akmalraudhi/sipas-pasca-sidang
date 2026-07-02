'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bell, ArrowLeft, AlertTriangle, Info, CheckCircle2, 
  Trash2, MailOpen, Calendar, ShieldAlert 
} from 'lucide-react';

export default function NotificationsPage() {
  const [jalurAktif, setJalurAktif] = useState('skripsi');

  useEffect(() => {
    const savedJalur = localStorage.getItem('jalurKelulusan');
    if (savedJalur) {
      setJalurAktif(savedJalur);
    }
  }, []);

  // Kumpulan data notifikasi pasca-sidang institusional
  const [notifs, setNotifs] = useState([
    {
      id: 1,
      tipe: 'warning',
      judul: 'Peringatan Masa Tenggat Revisi Kalender',
      deskripsi: jalurAktif === 'skripsi' 
        ? 'Sisa waktu penyelesaian revisi naskah skripsi dan penyerahan buku hardcover Anda tersisa 18 hari lagi sebelum denda sistem aktif.' 
        : 'Sisa waktu pelaporan tautan jurnal ilmiah Anda mendekati batas cut-off verifikasi yudisium massal.',
      waktu: 'Baru saja',
      tanggal: '02 Juli 2026',
      isRead: false
    },
    {
      id: 2,
      tipe: 'info',
      judul: 'Pembaruan Dokumen Template GDrive',
      deskripsi: 'Berkas template master Lembar Pengesahan.docx dan Lembar Pernyataan Keaslian telah diperbarui di folder utama Google Drive SIPAS.',
      waktu: '2 jam yang lalu',
      tanggal: '02 Juli 2026',
      isRead: false
    },
    {
      id: 3,
      tipe: 'success',
      judul: 'Validasi Fakta Integritas Berhasil',
      deskripsi: 'Penandatanganan deklarasi komitmen awal Anda telah berhasil divalidasi dan dicatat oleh sistem pusat pangkalan data akademik.',
      waktu: 'Kemarin',
      tanggal: '01 Juli 2026',
      isRead: true
    }
  ]);

  const handleMarkAllAsRead = () => {
    setNotifs(notifs.map(n => ({ ...n, isRead: true })));
  };

  const handleDeleteNotif = (id) => {
    setNotifs(notifs.filter(n => n.id !== id));
  };

  return (
    <div className="w-full bg-[#F8F9FF] min-h-screen text-[#0D1C2E] p-4 sm:p-6 lg:p-8 space-y-6 animate-fadeIn">
      
      {/* ── 1. HEADER HALAMAN SINKRON ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#0A2540]">
            <Bell size={22} className="text-[#0A2540]" />
            <h1 className="text-xl font-bold text-[#0A2540]">
              Pemberitahuan Sistem
            </h1>
          </div>
          <p className="text-sm text-gray-500">
            Pusat kotak masuk pengingat sanksi denda, agenda yudisium, dan revisi berkas kelulusan Anda
          </p>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <button 
            onClick={handleMarkAllAsRead}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 hover:bg-slate-50 text-xs font-bold text-gray-600 rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <MailOpen size={13} />
            <span>Tandai Semua Terbaca</span>
          </button>
          
          <Link href="/mahasiswa/dashboard">
            <button className="flex items-center gap-1.5 px-3 py-2 bg-[#0A2540] hover:bg-[#1E3A8A] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer">
              <ArrowLeft size={13} />
              <span>Kembali</span>
            </button>
          </Link>
        </div>
      </div>

      {/* ── 2. BOX NOTIFIKASI KOSONG KONDISIONAL ── */}
      {notifs.length === 0 ? (
        <div className="bg-white border border-gray-200/80 rounded-2xl p-12 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 bg-slate-50 border rounded-full flex items-center justify-center mx-auto text-gray-400 shadow-inner">
            <MailOpen size={20} />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-gray-700">Kotak Masuk Kosong</h3>
            <p className="text-xs text-gray-400 max-w-xs mx-auto">Tidak ada informasi pemberitahuan atau instruksi revisi baru yang masuk untuk saat ini.</p>
          </div>
        </div>
      ) : (
        /* ── 3. DAFTAR LIST NOTIFIKASI PREMIUM (KORPORAT SAAS) ── */
        <div className="space-y-3">
          {notifs.map((notif) => {
            const isWarning = notif.tipe === 'warning';
            const isSuccess = notif.tipe === 'success';
            
            return (
              <div 
                key={notif.id}
                className={`p-5 bg-white border rounded-2xl flex items-start justify-between gap-4 transition-all shadow-sm hover:shadow-md ${
                  !notif.isRead ? 'border-l-4 border-l-[#0A2540] border-gray-200' : 'border-gray-200/70 opacity-80'
                }`}
              >
                <div className="flex items-start gap-4 text-left">
                  {/* Lingkaran Ikon Berdasarkan Tipe */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 border ${
                    isWarning ? 'bg-amber-50 text-amber-600 border-amber-200' : 
                    isSuccess ? 'bg-green-50 text-green-600 border-green-200' : 
                    'bg-blue-50 text-blue-600 border-blue-200'
                  }`}>
                    {isWarning ? <AlertTriangle size={16} /> : 
                     isSuccess ? <CheckCircle2 size={16} /> : 
                     <Info size={16} />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h4 className="text-sm font-black text-[#0A2540]">{notif.judul}</h4>
                      {!notif.isRead && (
                        <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-4xl">{notif.deskripsi}</p>
                    
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider pt-1">
                      <Calendar size={11} />
                      <span>{notif.tanggal}</span>
                      <span>•</span>
                      <span>{notif.waktu}</span>
                    </div>
                  </div>
                </div>

                {/* Aksi Hapus Item */}
                <button 
                  onClick={() => handleDeleteNotif(notif.id)}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer flex-shrink-0"
                  title="Hapus Notifikasi"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* ── 4. ATURAN KEAMANAN DATA FOOTER BANNER ── */}
      <div className="p-4 bg-slate-50 border border-gray-200/60 rounded-2xl flex items-center gap-3 text-gray-400">
        <ShieldAlert size={16} className="text-gray-400 flex-shrink-0" />
        <p className="text-[11px] leading-relaxed font-medium text-left">
          Seluruh log instruksi revisi akademik dikirim secara otomatis oleh sistem pimpinan sidang dan sinkron langsung dengan biro PTSP Universitas Paramadina.
        </p>
      </div>

    </div>
  );
}
