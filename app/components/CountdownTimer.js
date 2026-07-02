'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, Clock, CheckCircle2, Upload, CreditCard, ExternalLink } from 'lucide-react';

export default function CountdownTimer({ tanggalSidang }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isOverdue, setIsOverdue] = useState(false);
  
  // State simulasi integrasi pembayaran denda
  const [buktiFoto, setBuktiFoto] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const calculate = () => {
      const sidang = new Date(tanggalSidang);
      const deadline = new Date(sidang);
      deadline.setDate(deadline.getDate() + 30);
      const now = new Date();
      const diff = deadline.getTime() - now.getTime();

      // Jika waktu habis, kunci status keterlambatan (Kecuali jika sudah dibayar)
      if (diff <= 0) {
        setIsOverdue(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setIsOverdue(false);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [tanggalSidang]);

  // Fungsi simulasi muat naik resit pembayaran denda bank
  const handleUploadBukti = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBuktiFoto(file);
      setIsVerifying(true);

      // Simulasi staf kewangan memverifikasi berkas dalam 2 saat
      setTimeout(() => {
        setIsVerifying(false);
        setIsPaid(true); // Tagihan bertukar menjadi LUNAS / Rp 0
      }, 2000);
    }
  };

  const sidang = new Date(tanggalSidang);
  const deadline = new Date(sidang);
  deadline.setDate(deadline.getDate() + 30);
  const now = new Date();
  const elapsed = Math.max(0, now.getTime() - sidang.getTime());
  const total = deadline.getTime() - sidang.getTime();
  const progress = Math.min(100, (elapsed / total) * 100);

  const isUrgent = timeLeft.days <= 7 && !isOverdue;

  const accentColor = isPaid ? '#10B981' : isOverdue ? '#DC2626' : isUrgent ? '#D97706' : '#0A2540';
  const bgColor = isPaid ? '#F0FDF4' : isOverdue ? '#FEF2F2' : isUrgent ? '#FFFBEB' : '#F0F4F8';
  const borderColor = isPaid ? '#BBF7D0' : isOverdue ? '#FCA5A5' : isUrgent ? '#FDE68A' : '#D1FAE5';

  return (
    <div className="rounded-2xl p-6 bg-white border shadow-sm transition-all duration-500 space-y-6" style={{ background: bgColor, borderColor: borderColor }}>
      
      {/* HEADER KONDISIANAL STATUS TIMER */}
      <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: `${accentColor}20` }}>
        <div className="flex items-center gap-2">
          {isPaid ? (
            <CheckCircle2 size={20} className="text-green-600 animate-pulse" />
          ) : isOverdue ? (
            <AlertTriangle size={18} style={{ color: accentColor }} />
          ) : (
            <Clock size={18} style={{ color: accentColor }} />
          )}
          <span className="text-xs sm:text-sm font-black uppercase tracking-wider" style={{ color: accentColor }}>
            {isPaid ? 'Sanksi Denda Telah Diselesaikan' : isOverdue ? 'Batas Waktu Terlampaui!' : 'Masa Kalender Penyelesaian'}
          </span>
        </div>
        
        {isPaid && (
          <span className="bg-green-100 text-green-800 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-widest border border-green-200">
            Lunas / Terverifikasi
          </span>
        )}
      </div>

      {/* KONDISI 1: JIKA TERLAMBAT DAN BELUM BAYAR */}
      {isOverdue && !isPaid ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          
          {/* Detail Nominal Tagihan & Nomor Rekening Kampus */}
          <div className="bg-white p-5 rounded-xl border border-red-100 shadow-sm space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Tagihan Sanksi</span>
              <div className="text-3xl font-black text-red-600 tracking-tight">Rp 1.000.000,-</div>
              <p className="text-[11px] text-gray-400">Terlambat mengumpulkan naskah revisi hardcover melewati batas 30 hari.</p>
            </div>

            <div className="pt-2 border-t border-gray-100 space-y-2.5">
              <div className="flex items-center gap-2 text-gray-700 font-bold text-xs uppercase tracking-wider">
                <CreditCard size={14} className="text-[#0A2540]" />
                <span>Metode Pembayaran Resmi</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-gray-200 space-y-1">
                <div className="text-xs font-black text-[#0A2540]">BANK MANDIRI VA</div>
                <div className="text-sm font-mono font-bold text-gray-800 tracking-wider flex items-center justify-between">
                  <span>900123103149000</span>
                  <span className="text-[10px] font-sans text-gray-400 font-normal lowercase">(nim anda)</span>
                </div>
                <div className="text-[10px] text-gray-400 font-medium">a.n. Universitas Paramadina Pasca-Sidang</div>
              </div>
            </div>
          </div>

          {/* Area Interaksi Unggah Foto Bukti Transfer */}
          <div className="bg-white p-5 rounded-xl border border-red-100 shadow-sm flex flex-col justify-between min-h-[180px]">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase">Upload Bukti Transfer <span className="text-red-500">*</span></label>
              <p className="text-[11px] text-gray-400 leading-relaxed">Kirimkan foto resi ATM atau screenshot mobile banking yang valid untuk menghapus tagihan denda Anda secara otomatis.</p>
            </div>

            <label className="block cursor-pointer mt-3">
              <input type="file" className="hidden" accept="image/*" onChange={handleUploadBukti} disabled={isVerifying} />
              <div className={`rounded-xl p-5 text-center border-2 border-dashed flex flex-col justify-center items-center transition-all ${
                isVerifying ? 'bg-amber-50/50 border-amber-400' : 'bg-slate-50/50 border-gray-300 hover:border-red-500'
              }`}>
                {isVerifying ? (
                  <div className="space-y-2">
                    <div className="w-5 h-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-xs font-bold text-amber-700 animate-pulse">Menghitung & Memverifikasi Dana...</p>
                  </div>
                ) : buktiFoto ? (
                  <div className="text-xs font-bold text-green-700 truncate max-w-full px-2">
                    ✓ {buktiFoto.name}
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Upload size={20} className="mx-auto text-gray-400" />
                    <p className="text-xs font-bold text-gray-600">Klik untuk lampirkan foto bukti</p>
                    <p className="text-[9px] text-gray-400">Format PNG, JPG, JPEG (Maks. 5MB)</p>
                  </div>
                )}
              </div>
            </label>
          </div>

        </div>
      ) : isPaid ? (
        /* KONDISI 2: JIKA TAGIHAN SUDAH DIBAYAR (Rp 0 / HILANG) */
        <div className="p-5 bg-white border border-green-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn shadow-sm">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
              <CheckCircle2 size={22} />
            </div>
            <div className="space-y-0.5">
              <h5 className="text-sm font-black text-gray-800">Tagihan Sanksi Denda: <span className="text-green-600">Rp 0 (Lunas)</span></h5>
              <p className="text-xs text-gray-400">Bukti pembayaran digital Anda telah disetujui. Gerbang pengumpulan ijazah Dikti telah dibuka kembali.</p>
            </div>
          </div>
          <div className="text-xs font-bold text-gray-400 italic flex items-center gap-1">
            <span>Diverifikasi Sistem Keuangan</span>
            <ExternalLink size={12} />
          </div>
        </div>
      ) : (
        /* KONDISI 3: ALUR AMAN JIKA BELUM TERLAMBAT */
        <div className="grid grid-cols-4 gap-2.5 mb-4 animate-fadeIn">
          {[
            { val: timeLeft.days, label: 'Hari' },
            { val: timeLeft.hours, label: 'Jam' },
            { val: timeLeft.minutes, label: 'Menit' },
            { val: timeLeft.seconds, label: 'Detik' },
          ].map((item) => (
            <div key={item.label} className="text-center p-2.5 rounded-xl bg-white border border-gray-200/60 shadow-sm">
              <div className="text-xl sm:text-2xl font-black tabular-nums" style={{ color: accentColor }}>
                {String(item.val).padStart(2, '0')}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* PROGRESS BAR LINIMASA BAWAH */}
      {!isPaid && (
        <div className="space-y-1.5 pt-2">
          <div className="flex justify-between text-[11px] font-bold text-gray-400">
            <span>Mulai Sidang ({sidang.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })})</span>
            <span>Deadline ({deadline.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })})</span>
          </div>
          <div className="w-full h-2 rounded-full bg-gray-100 shadow-inner">
            <div
              className="h-2 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${accentColor}aa, ${accentColor})` }}
            />
          </div>
          <div className="text-center text-[10px] font-medium text-gray-400">
            {Math.round(progress)}% dari total masa tenggatan bulanan telah berjalan
          </div>
        </div>
      )}
    </div>
  );
}
