'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Book, Newspaper } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // Default pilihan jalur diset ke 'skripsi' terlebih dahulu
  const [jalurPilihan, setJalurPilihan] = useState('skripsi');

  const handleGoogleAuth = () => {
    setIsLoading(true);

    setTimeout(() => {
      // Menyimpan status login aktif
      localStorage.setItem('isLoggedIn', 'true');
      // MENYIMPAN JALUR YANG DIPILIH MAHASISWA AGAR TERINTEGRASI GLOBAL
      localStorage.setItem('jalurKelulusan', jalurPilihan);
      
      router.push('/mahasiswa/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row items-stretch overflow-x-hidden">
      
      {/* ── KIRI: VISUAL KAMPUS ── */}
      <div 
        className="flex lg:w-1/2 p-6 sm:p-10 lg:p-16 flex-col justify-between text-white relative overflow-hidden bg-cover bg-center min-h-[280px] sm:min-h-[350px] lg:min-h-screen"
        style={{ backgroundImage: "url('/kampus.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A2540]/95 via-[#0A2540]/85 to-[#1E3A8A]/80 z-0"></div>
        <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 lg:-mr-40 lg:-mt-40 z-0"></div>

        <div className="flex items-center gap-3 py-1 z-10">
          <img src="/L0g0.png" alt="Logo" className="h-14 sm:h-20 w-auto object-contain brightness-0 invert filter drop-shadow-sm" />
          <div className="h-8 w-0.5 bg-white/20 rounded-full"></div>
          <span className="font-black text-lg sm:text-xl tracking-wider uppercase">SIPAS</span>
        </div>

        <div className="space-y-3 max-w-xl z-10 bg-black/15 p-4 rounded-2xl backdrop-blur-sm border border-white/10 mt-4 lg:mt-0">
          <h2 className="text-xl sm:text-3xl font-black tracking-tight leading-tight">Sistem Informasi Pasca-Sidang</h2>
          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">Satu platform terintegrasi untuk pelaporan revisi buku karya akhir, hardcover, serta validasi jurnal ilmiah Universitas Paramadina.</p>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase z-10 mt-6 lg:mt-0 text-blue-200/80">
          <ShieldCheck size={16} className="text-green-400" /> Secure Authentication
        </div>
      </div>

      {/* ── KANAN: FORM LOGIN & PILIHAN JALUR KELULUSAN ── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-white relative">
        <div className="w-full max-w-md space-y-8 py-4">
          
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] tracking-tight">Masuk Aplikasi</h1>
            <p className="text-xs sm:text-sm text-gray-400">Pilih metode kelulusan sidang akhir Anda sebelum masuk ke sistem.</p>
          </div>

          {/* PILIHAN JALUR (AKAN DISIMPAN KE LOCALSTORAGE) */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Jalur Kelulusan Anda *</label>
            <div className="grid grid-cols-2 gap-4">
              
              {/* Opsi 1: Skripsi / Tugas Akhir */}
              <div 
                onClick={() => setJalurPilihan('skripsi')}
                className={`p-4 border-2 rounded-2xl flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all ${
                  jalurPilihan === 'skripsi'
                    ? 'border-[#0A2540] bg-[#0A2540]/5 text-[#0A2540] font-bold shadow-sm scale-[1.01]'
                    : 'border-gray-200 text-gray-400 hover:border-gray-300'
                }`}
              >
                <Book size={22} className={jalurPilihan === 'skripsi' ? 'text-[#0A2540]' : 'text-gray-400'} />
                <span className="text-xs sm:text-sm">Skripsi / TA</span>
              </div>

              {/* Opsi 2: Jurnal / Publikasi */}
              <div 
                onClick={() => setJalurPilihan('jurnal')}
                className={`p-4 border-2 rounded-2xl flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all ${
                  jalurPilihan === 'jurnal'
                    ? 'border-teal-600 bg-teal-50 text-teal-700 font-bold shadow-sm scale-[1.01]'
                    : 'border-gray-200 text-gray-400 hover:border-gray-300'
                }`}
              >
                <Newspaper size={22} className={jalurPilihan === 'jurnal' ? 'text-teal-600' : 'text-gray-400'} />
                <span className="text-xs sm:text-sm">Publish Jurnal</span>
              </div>

            </div>
          </div>

          {/* TOMBOL LOGIN GOOGLE */}
          <div className="pt-2">
            <button
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-4 px-5 border-2 border-gray-200 bg-white hover:bg-slate-50 text-gray-700 font-black text-xs sm:text-sm rounded-xl transition-all shadow-sm cursor-pointer"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-[#0A2540] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0112 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.33 0 3.353 2.627 1.341 6.477l3.925 3.288z"/>
                  <path fill="#FBBC05" d="M1.341 6.477A11.894 11.894 0 000 12c0 1.927.458 3.755 1.277 5.386l4.032-3.123A6.983 6.983 0 014.91 12c0-1.255.327-2.436.9-3.477L1.341 6.477z"/>
                  <path fill="#4285F4" d="M12 24c3.245 0 5.973-1.073 7.964-2.927l-3.836-3.145c-1.127.754-2.564 1.2-4.128 1.2-3.19 0-5.89-2.155-6.854-5.064L1.277 17.15A11.94 11.94 0 0012 24z"/>
                  <path fill="#34A853" d="M23.755 12.273c0-.818-.073-1.609-.209-2.382H12v4.51h6.6c-.282 1.482-1.12 2.736-2.382 3.582l3.836 3.145C22.29 19.236 23.755 16.036 23.755 12.273z"/>
                </svg>
              )}
              <span>{isLoading ? 'Menghubungkan Akun...' : 'Masuk dengan Google'}</span>
            </button>
          </div>

          <div className="pt-4 border-t border-gray-100 text-center text-[10px] sm:text-[11px] text-gray-400 leading-relaxed">
            Sistem Autentikasi Tunggal Terintegrasi Pangkalan Data Akademik Universitas Paramadina.
          </div>

        </div>
      </div>

    </div>
  );
}
