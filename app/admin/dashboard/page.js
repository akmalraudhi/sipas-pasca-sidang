'use client';

import {
  Users, Clock, CheckCircle2, AlertTriangle, XCircle,
  Award, TrendingUp, FileCheck2, ArrowUpRight,
} from 'lucide-react';
import Link from 'next/link';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import StatCard from '../../components/StatCard';
import { mockMahasiswa, getStatusLabel } from '../../lib/data';

// ── Data mingguan ilustratif untuk grafik aktivitas ──
const weeklyData = [
  { hari: 'Sen', upload: 4, verifikasi: 2 },
  { hari: 'Sel', upload: 6, verifikasi: 5 },
  { hari: 'Rab', upload: 3, verifikasi: 4 },
  { hari: 'Kam', upload: 8, verifikasi: 6 },
  { hari: 'Jum', upload: 5, verifikasi: 5 },
  { hari: 'Sab', upload: 2, verifikasi: 1 },
  { hari: 'Min', upload: 1, verifikasi: 0 },
];

const PIE_COLORS = {
  belum_upload: '#94a3b8',
  menunggu_verifikasi: '#f59e0b',
  disetujui: '#10b981',
  ditolak: '#f43f5e',
  terkena_denda: '#dc2626',
};

export default function AdminDashboardPage() {
  const total = mockMahasiswa.length;
  const countBy = (status) => mockMahasiswa.filter((m) => m.status === status).length;

  const stats = {
    total,
    menunggu: countBy('menunggu_verifikasi'),
    disetujui: countBy('disetujui'),
    belumUpload: countBy('belum_upload'),
    denda: countBy('terkena_denda'),
  };

  const statusKeys = ['belum_upload', 'menunggu_verifikasi', 'disetujui', 'ditolak', 'terkena_denda'];
  const pieData = statusKeys
    .map((key) => ({ name: getStatusLabel(key), value: countBy(key), key }))
    .filter((d) => d.value > 0);

  const jalurSkripsi = mockMahasiswa.filter((m) => m.jalur === 'skripsi').length;
  const jalurJurnal = mockMahasiswa.filter((m) => m.jalur === 'jurnal').length;

  return (
    <div className="w-full bg-[#F8F9FF] min-h-screen text-[#0D1C2E] space-y-6 animate-fadeIn">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <div className="text-xs font-black uppercase tracking-widest mb-2 text-[#1E3A8A]">
            SIPAS — Panel Admin
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0A2540]">
            Ringkasan Pasca-Sidang
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Pantau progres verifikasi dokumen seluruh mahasiswa
          </p>
        </div>
        <Link
          href="/admin/verifikasi"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0A2540] hover:bg-[#1E3A8A] text-white text-xs font-bold rounded-xl transition-all shadow-sm self-start"
        >
          <FileCheck2 size={15} />
          <span>Buka Verifikasi</span>
        </Link>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard title="Total Mahasiswa" value={stats.total} icon={Users} color="#0A2540" />
        <StatCard title="Menunggu Verifikasi" value={stats.menunggu} icon={Clock} color="#f59e0b" />
        <StatCard title="Disetujui" value={stats.disetujui} subtitle="Dokumen valid" icon={CheckCircle2} color="#10b981" />
        <StatCard title="Belum Upload" value={stats.belumUpload} icon={AlertTriangle} color="#64748b" />
        <StatCard title="Terkena Denda" value={stats.denda} subtitle="Rp 1.000.000/mhs" icon={XCircle} color="#f43f5e" />
      </div>

      {/* ── Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 items-stretch">

        {/* Bar Chart */}
        <div className="lg:col-span-4 bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-[#0A2540]">Aktivitas Mingguan</h3>
              <p className="text-xs text-gray-400 mt-0.5">Upload & verifikasi dokumen</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              {[['#0A2540', 'Upload'], ['#f59e0b', 'Verifikasi']].map(([c, l]) => (
                <div key={l} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ background: c }} />
                  <span className="text-gray-500 font-medium">{l}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData} barGap={4}>
              <XAxis dataKey="hari" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 12 }}
                cursor={{ fill: 'rgba(10,37,64,0.05)' }}
              />
              <Bar dataKey="upload" fill="#0A2540" radius={[4, 4, 0, 0]} />
              <Bar dataKey="verifikasi" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="lg:col-span-3 bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-wider text-[#0A2540]">Distribusi Status</h3>
          <p className="text-xs text-gray-400 mt-0.5 mb-4">Semua mahasiswa ({stats.total} orang)</p>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3}>
                  {pieData.map((d) => <Cell key={d.key} fill={PIE_COLORS[d.key]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 12 }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: '#64748b' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-xs text-gray-400">
              Belum ada data
            </div>
          )}
        </div>
      </div>

      {/* ── Jalur Breakdown ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Jalur Skripsi / Tugas Akhir</div>
            <div className="text-3xl font-black text-[#0A2540]">{jalurSkripsi}</div>
            <div className="text-xs text-gray-500 mt-1">
              {total ? Math.round((jalurSkripsi / total) * 100) : 0}% dari total mahasiswa
            </div>
          </div>
          <Award size={36} className="text-[#0A2540] opacity-30" />
        </div>
        <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Jalur Jurnal / Publikasi</div>
            <div className="text-3xl font-black text-amber-600">{jalurJurnal}</div>
            <div className="text-xs text-gray-500 mt-1">
              {total ? Math.round((jalurJurnal / total) * 100) : 0}% dari total mahasiswa
            </div>
          </div>
          <TrendingUp size={36} className="text-amber-500 opacity-40" />
        </div>
      </div>

      {/* ── Perlu Tindakan ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#0A2540]">
            <Clock size={18} />
            <h3 className="text-sm font-black uppercase tracking-wider">Perlu Tindakan Segera</h3>
          </div>
          <Link href="/admin/verifikasi" className="text-xs font-bold text-[#0A2540] hover:underline flex items-center gap-1">
            <span>Buka Verifikasi</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        <div className="space-y-3">
          {mockMahasiswa.filter((m) => m.status === 'menunggu_verifikasi').length === 0 ? (
            <div className="bg-white border border-gray-200/60 p-5 rounded-xl text-xs text-gray-400 text-center shadow-sm">
              Tidak ada pengajuan yang menunggu verifikasi saat ini.
            </div>
          ) : (
            mockMahasiswa
              .filter((m) => m.status === 'menunggu_verifikasi')
              .map((m) => (
                <div key={m.id} className="bg-white border border-gray-200/60 p-4 rounded-xl flex items-center justify-between gap-4 shadow-sm hover:border-blue-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                      <Clock size={15} />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-[#0A2540]">{m.nama}</h4>
                      <p className="text-xs text-gray-500">{m.nim} · {m.prodi}</p>
                    </div>
                  </div>
                  <Link href="/admin/verifikasi" className="text-[11px] font-bold text-[#0A2540] whitespace-nowrap hover:underline">
                    Tinjau &rarr;
                  </Link>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
