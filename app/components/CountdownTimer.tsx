'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface CountdownTimerProps {
  tanggalSidang: string;
}

export default function CountdownTimer({ tanggalSidang }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isOverdue, setIsOverdue] = useState(false);

  useEffect(() => {
    const calculate = () => {
      const sidang = new Date(tanggalSidang);
      const deadline = new Date(sidang);
      deadline.setDate(deadline.getDate() + 30);
      const now = new Date();
      const diff = deadline.getTime() - now.getTime();

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

  const totalDays = 30;
  const sidang = new Date(tanggalSidang);
  const deadline = new Date(sidang);
  deadline.setDate(deadline.getDate() + 30);
  const now = new Date();
  const elapsed = Math.max(0, now.getTime() - sidang.getTime());
  const total = deadline.getTime() - sidang.getTime();
  const progress = Math.min(100, (elapsed / total) * 100);

  const isUrgent = timeLeft.days <= 7 && !isOverdue;
  const isSafe = timeLeft.days > 14;

  const accentColor = isOverdue ? '#f43f5e' : isUrgent ? '#f59e0b' : '#10b981';
  const bgColor = isOverdue ? 'rgba(244, 63, 94, 0.1)' : isUrgent ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)';
  const borderColor = isOverdue ? 'rgba(244, 63, 94, 0.3)' : isUrgent ? 'rgba(245, 158, 11, 0.3)' : 'rgba(16, 185, 129, 0.3)';

  return (
    <div className="rounded-2xl p-6" style={{ background: bgColor, border: `1px solid ${borderColor}` }}>
      <div className="flex items-center gap-2 mb-4">
        {isOverdue ? (
          <AlertTriangle size={18} style={{ color: accentColor }} />
        ) : isSafe ? (
          <CheckCircle size={18} style={{ color: accentColor }} />
        ) : (
          <Clock size={18} style={{ color: accentColor }} />
        )}
        <span className="text-sm font-semibold" style={{ color: accentColor }}>
          {isOverdue ? 'Batas Waktu Terlampaui!' : isUrgent ? 'Segera Selesaikan Revisi' : 'Masih Dalam Batas Waktu'}
        </span>
      </div>

      {!isOverdue ? (
        <div className="grid grid-cols-4 gap-3 mb-4">
          {[
            { val: timeLeft.days, label: 'Hari' },
            { val: timeLeft.hours, label: 'Jam' },
            { val: timeLeft.minutes, label: 'Menit' },
            { val: timeLeft.seconds, label: 'Detik' },
          ].map((item) => (
            <div key={item.label} className="text-center p-3 rounded-xl" style={{ background: 'rgba(0,0,0,0.3)' }}>
              <div className="text-2xl font-bold tabular-nums countdown-anim" style={{ color: accentColor }}>
                {String(item.val).padStart(2, '0')}
              </div>
              <div className="text-xs mt-1" style={{ color: '#94a3b8' }}>{item.label}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-3 mb-4">
          <div className="text-3xl font-bold" style={{ color: '#f43f5e' }}>TERLAMBAT</div>
          <div className="text-sm mt-1" style={{ color: '#94a3b8' }}>Denda Rp 1.000.000 telah dikenakan</div>
        </div>
      )}

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-xs mb-2" style={{ color: '#94a3b8' }}>
          <span>Hari Sidang ({new Date(tanggalSidang).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })})</span>
          <span>Deadline ({deadline.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })})</span>
        </div>
        <div className="w-full h-2 rounded-full" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div
            className="h-2 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${accentColor}88, ${accentColor})` }}
          />
        </div>
        <div className="text-center mt-2 text-xs" style={{ color: '#94a3b8' }}>
          {Math.round(progress)}% waktu telah berlalu
        </div>
      </div>
    </div>
  );
}
