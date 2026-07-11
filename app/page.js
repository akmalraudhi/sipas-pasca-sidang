'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole'); // 'mahasiswa' | 'admin'

    // Belum login sama sekali -> paksa ke /login
    if (!isLoggedIn) {
      router.replace('/login');
      return;
    }

    // Sudah login -> arahkan sesuai role
    if (userRole === 'admin') {
      router.replace('/admin/dashboard');
    } else if (userRole === 'mahasiswa') {
      router.replace('/mahasiswa/dashboard');
    } else {
      // Role tidak dikenali / data korup -> aman-nya balik ke login
      router.replace('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F8F9FF] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-[#0A2540] border-t-transparent rounded-full animate-spin"></div>
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
