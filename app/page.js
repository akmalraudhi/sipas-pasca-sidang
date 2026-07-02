'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // 1. Memastikan kode hanya berjalan di sisi browser (Client-Side)
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn');

      // 2. Eksekusi pengalihan rute secara mutlak
      if (!isLoggedIn) {
        // Jika tidak ada data login, kunci di pintu masuk utama
        router.replace('/login');
      } else {
        // Jika terdeteksi sudah login, teruskan ke area dalam
        router.replace('/mahasiswa/dashboard');
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner Animasi Bertema Biru Paramadina */}
        <div className="w-12 h-12 border-4 border-[#0A2540] border-t-transparent rounded-full animate-spin"></div>
        <div className="text-center space-y-1">
          <p className="text-xs font-black text-[#0A2540] uppercase tracking-widest animate-pulse">
            Memuat Akses Sistem
          </p>
          <p className="text-[10px] text-gray-400 font-medium">
            Memeriksa enkripsi autentikasi institusi...
          </p>
        </div>
      </div>
    </div>
  );
}
