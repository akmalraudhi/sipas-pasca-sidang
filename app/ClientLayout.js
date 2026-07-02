"use client";

import Sidebar from "./components/Sidebar";

export default function ClientLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Komponen Navigasi Satu File Utama */}
      <Sidebar />

      {/* Pembungkus Area Konten Responsif */}
      <div className="pt-16 md:pl-64 transition-all duration-300">
        {/* Mengubah max-w-7xl menjadi kontainer lebar premium agar konten dasbor leluasa */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-[95%] xl:max-w-[1650px] mx-auto w-full transition-all">
          {children}
        </main>
      </div>
    </div>
  );
}
