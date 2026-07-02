'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  History, Clock, AlertCircle, Book, Newspaper, 
  ArrowLeft, CheckCircle2, ChevronRight, FileText, ExternalLink
} from 'lucide-react';

export default function RiwayatPage() {
  const [jalurAktif, setJalurAktif] = useState('skripsi');

  // Sinkronisasi Global Jalur Kelulusan dari LocalStorage agar selaras dengan halaman lainnya
  useEffect(() => {
    const savedJalur = localStorage.getItem('jalurKelulusan');
    if (savedJalur) {
      setJalurAktif(savedJalur);
    }
  }, []);

  const me = {
    nama: "Prila Fathur Rizqi",
    nim: "123103149",
    prodi: "S1 Informatika",
    jalur: jalurAktif,
    status: "menunggu_verifikasi", // Menunggu Pemeriksaan Staf
    judul: "Analisis Komunikasi Strategis dalam Diplomasi Digital"
  };

  // Log Aktivitas Linimasa Dinamis yang disesuaikan berdasarkan Jalur Kelulusan aktif
  const logsSkripsi = [
    {
      id: 1,
      tanggal: '2026-07-02',
      waktu: '11:35 WIB',
      aktivitas: 'Pemeriksaan Dokumen Fisik Hardcover oleh Staf PTSP',
      status: 'Menunggu Verifikasi',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-200',
      catatan: 'Berkas digital berupa Lembar Pengesahan, Surat Pernyataan Keaslian, dan foto bukti serah terima hardcover perpustakaan telah masuk dalam antrean validasi Biro Administrasi Akademik (BAA).'
    },
    {
      id: 2,
      tanggal: '2026-07-02',
      waktu: '11:30 WIB',
      aktivitas: 'Penandatanganan Fakta Integritas & Upload Berkas',
      status: 'Selesai',
      statusColor: 'bg-green-100 text-green-800 border-green-200',
      catatan: 'Mahasiswa berhasil melakukan submit formulir deklarasi komitmen kelulusan 30 hari kalender serta mengunggah seluruh dokumen lampiran wajib.'
    }
  ];

  const logsJurnal = [
    {
      id: 1,
      tanggal: '2026-07-02',
      waktu: '11:35 WIB',
      aktivitas: 'Audit Sinkronisasi Tautan URL Jurnal Ilmiah',
      status: 'Menunggu Verifikasi',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-200',
      catatan: 'Tautan URL penerbit jurnal luar yang Anda input sedang ditinjau kesesuaian metadatanya dengan nama penulis, abstrak kelulusan, dan status indeks akreditasi oleh tim verifikator.'
    },
    {
      id: 2,
      tanggal: '2026-07-02',
      waktu: '11:30 WIB',
      aktivitas: 'Pernyataan Jalur Jurnal & Input Tautan Penerbit',
      status: 'Selesai',
      statusColor: 'bg-green-100 text-green-800 border-green-200',
      catatan: 'Mahasiswa berhasil menginput alamat link eksternal artikel ilmiah yang valid ke dalam sistem tanpa kewajiban penyerahan berkas hardcover fisik.'
    }
  ];

  const logs = jalurAktif === 'skripsi' ? logsSkripsi : logsJurnal;

  return (
    <div className="w-full bg-[#F8F9FF] min-h-screen text-[#0D1C2E] p-4 sm:p-6 lg:p-8 space-y-6 animate-fadeIn">
      
      {/* ── 1. HEADER HALAMAN (SELARAS DENGAN DASHBOARD & PENGAJUAN) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-[#0A2540]">
            Riwayat Status Pengajuan
          </h1>
          <p className="text-sm text-gray-500">
            Pantau jejak pelacakan verifikasi dokumen pasca-sidang Anda secara real-time
          </p>
        </div>
        
        <Link href="/mahasiswa/dashboard">
          <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 hover:bg-slate-50 text-xs font-bold text-gray-600 rounded-xl transition-all shadow-sm cursor-pointer">
            <ArrowLeft size={14} />
            <span>Kembali ke Dasbor</span>
          </button>
        </Link>
      </div>

      {/* ── 2. RINGKASAN STATUS UTAMA / INFO MAHASISWA CARD ── */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3.5 bg-blue-50 text-[#0A2540] rounded-xl border border-blue-100/50 flex-shrink-0">
            <History size={22} />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Dokumen Karya Akhir</span>
            <h3 className="text-sm font-black text-[#0A2540] leading-snug">
              {me.judul}
            </h3>
            
            {/* Indikator Jenis Jalur yang Sinkron */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-gray-400">Metode Validasi:</span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black tracking-wide uppercase border ${
                jalurAktif === 'skripsi' 
                  ? 'bg-blue-50 text-[#0A2540] border-blue-100' 
                  : 'bg-teal-50 text-teal-700 border-teal-100'
              }`}>
                {jalurAktif === 'skripsi' ? <Book size={11} /> : <Newspaper size={11} />}
                {jalurAktif === 'skripsi' ? 'Skripsi / TA' : 'Publish Jurnal'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Badge Status Kelulusan Sistem */}
        <div className="flex flex-col items-start md:items-end justify-center border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 flex-shrink-0">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">Status Verifikasi Sistem</span>
          <span className="px-4 py-2 bg-amber-100/70 border border-amber-200 text-amber-800 text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-sm">
            Menunggu Pemeriksaan Staf
          </span>
        </div>
      </div>

      {/* ── 3. TIMELINE LOG ALUR PEMERIKSAAN (PERSIS GAYA PREMIUM INDEPENDEN) ── */}
      <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-slate-50/60 border-b border-gray-100 px-6 py-4 flex items-center gap-2.5">
          <Clock size={18} className="text-[#0A2540]" />
          <h4 className="text-sm font-black text-[#0A2540] uppercase tracking-wider">Log Aktivitas Alur Pemeriksaan Berkas</h4>
        </div>

        <div className="p-6 sm:p-8">
          <div className="relative border-l-2 border-slate-200 pl-6 ml-3 space-y-8">
            {logs.map((log, index) => {
              const isCurrentActive = index === 0;
              return (
                <div key={log.id} className="relative animate-fadeIn">
                  
                  {/* Titik Indikator Node Garis Waktu */}
                  <span className={`absolute -left-[31px] top-1.5 rounded-full w-3.5 h-34 h-3.5 border-2 border-white shadow flex items-center justify-center transition-all ${
                    isCurrentActive ? 'bg-[#0A2540] ring-4 ring-blue-100' : 'bg-slate-300'
                  }`} />

                  {/* Konten Box Detail Log */}
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <h5 className={`text-sm sm:text-base font-black ${isCurrentActive ? 'text-[#0A2540]' : 'text-gray-500'}`}>
                        {log.aktivitas}
                      </h5>
                      <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1.5">
                        <span>{log.tanggal}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span>{log.waktu}</span>
                      </span>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-4xl">
                      {log.catatan}
                    </p>

                    <div className="pt-1">
                      <span className={`inline-block text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded border shadow-sm ${log.statusColor}`}>
                        {log.status}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 4. BOX FOOTER HELP DESK BANTUAN INFORMASI ── */}
      <div className="bg-slate-50 border border-gray-200/60 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <AlertCircle size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-500 leading-relaxed max-w-3xl">
            Apabila Anda perlu melakukan perbaikan tautan URL publikasi atau file dokumen lampiran hardcover yang terlanjur salah kirim, silakan hubungi unit Loket Helpdesk PTSP Universitas Paramadina untuk instruksi pembukaan ulang akses formulir.
          </p>
        </div>
        <div className="text-xs font-bold text-gray-400 italic flex items-center gap-1 flex-shrink-0">
          <span>SIPAS Tracking Engine</span>
          <ExternalLink size={12} />
        </div>
      </div>

    </div>
  );
}
