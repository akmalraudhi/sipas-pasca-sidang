'use client';

import { useState } from 'react';
import {
  Users, Clock, CheckCircle, AlertTriangle, BookOpen,
  FileText, TrendingUp, Calendar, ArrowRight, Zap, Award, XCircle,
} from 'lucide-react';
import CountdownTimer from '../components/CountdownTimer';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import {
  mockMahasiswa, statsData, weeklyData, yudisiumDate,
  getDaysRemaining, getDeadlineDate,
} from '../lib/data';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

const PIE_COLORS = ['#10b981', '#f59e0b', '#475569', '#f43f5e', '#ef4444'];

export default function DashboardPage() {
  const me = mockMahasiswa[0];
  const yudisium = new Date(yudisiumDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  const pieData = [
    { name: 'Disetujui', value: statsData.sudahDiverifikasi },
    { name: 'Menunggu', value: statsData.menungguVerifikasi },
    { name: 'Belum Upload', value: statsData.belumUpload },
    { name: 'Ditolak', value: 14 },
    { name: 'Kena Denda', value: statsData.terkenaD },
  ];

  return (
    <div className="p-8">
      {/* ── Header ── */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#38bdf8' }}>
            SIPAS — SISTEM INFORMASI PASCA-SIDANG
          </div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: '#e0f2fe' }}>
            Selamat Datang, Ahmad 👋
          </h1>
          <p className="text-sm" style={{ color: '#94a3b8' }}>
            Pantau progres pasca-sidang kamu di sini
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs mb-1" style={{ color: '#94a3b8' }}>Tanggal Yudisium</div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{ background: 'rgba(14,165,233,0.12)', border: '1px solid rgba(14,165,233,0.3)' }}>
            <Calendar size={14} style={{ color: '#38bdf8' }} />
            <span className="text-sm font-semibold" style={{ color: '#bae6fd' }}>{yudisium}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">

        {/* ── Profile Card ── */}
        <div className="col-span-12 lg:col-span-4">
          <div className="rounded-2xl p-6 h-full" style={{ background: '#0d1526', border: '1px solid #1e3a5f' }}>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold"
                style={{ background: 'linear-gradient(135deg, #0ea5e9, #2563eb)', color: '#fff' }}>
                AR
              </div>
              <div>
                <div className="font-bold" style={{ color: '#e0f2fe' }}>{me.nama}</div>
                <div className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>{me.nim}</div>
                <div className="text-xs" style={{ color: '#94a3b8' }}>{me.prodi}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-3 rounded-xl text-center"
                style={{ background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.2)' }}>
                <div className="text-xs mb-1" style={{ color: '#94a3b8' }}>Jalur</div>
                <div className="text-sm font-bold capitalize" style={{ color: '#7dd3fc' }}>{me.jalur}</div>
              </div>
              <div className="p-3 rounded-xl text-center"
                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <div className="text-xs mb-1" style={{ color: '#94a3b8' }}>Nilai</div>
                <div className="text-sm font-bold" style={{ color: '#6ee7b7' }}>{me.nilaiSidang}</div>
              </div>
            </div>

            <div className="mb-5">
              <div className="text-xs mb-2" style={{ color: '#94a3b8' }}>Status Pengajuan</div>
              <StatusBadge status={me.status} />
            </div>

            <div className="p-3 rounded-xl" style={{ background: '#070c18', border: '1px solid #1e3a5f' }}>
              <div className="text-xs mb-1" style={{ color: '#475569' }}>Judul Karya Akhir</div>
              <div className="text-xs leading-relaxed" style={{ color: '#cbd5e1' }}>{me.judul}</div>
            </div>
          </div>
        </div>

        {/* ── Countdown ── */}
        <div className="col-span-12 lg:col-span-8">
          <CountdownTimer tanggalSidang={me.tanggalSidang} />
          <div className="grid grid-cols-3 gap-4 mt-4">
            {[
              ['Tanggal Sidang', new Date(me.tanggalSidang).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })],
              ['Deadline Revisi', getDeadlineDate(me.tanggalSidang)],
              ['Pembimbing', me.dosenPembimbing],
            ].map(([k, v]) => (
              <div key={k} className="p-4 rounded-xl" style={{ background: '#0d1526', border: '1px solid #1e3a5f' }}>
                <div className="text-xs mb-2" style={{ color: '#94a3b8' }}>{k}</div>
                <div className="text-xs font-bold" style={{ color: '#e0f2fe' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Catatan Revisi ── */}
        {me.catatanRevisi && (
          <div className="col-span-12 lg:col-span-6">
            <div className="rounded-2xl p-5"
              style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.25)' }}>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={15} style={{ color: '#f59e0b' }} />
                <span className="text-sm font-semibold" style={{ color: '#fbbf24' }}>Catatan Revisi dari Penguji</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#cbd5e1' }}>{me.catatanRevisi}</p>
            </div>
          </div>
        )}

        {/* ── Quick Actions ── */}
        <div className={`col-span-12 ${me.catatanRevisi ? 'lg:col-span-6' : ''}`}>
          <div className="rounded-2xl p-5 h-full" style={{ background: '#0d1526', border: '1px solid #1e3a5f' }}>
            <div className="text-sm font-semibold mb-4" style={{ color: '#e0f2fe' }}>Aksi Cepat</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Upload Dokumen', icon: FileText, href: '/pengajuan', color: '#0ea5e9' },
                { label: 'Lihat Status', icon: Clock, href: '/riwayat', color: '#2563eb' },
                { label: 'Panduan Revisi', icon: BookOpen, href: '#', color: '#0d9488' },
                { label: 'Hubungi PTSP', icon: Zap, href: '#', color: '#f59e0b' },
              ].map(item => (
                <a key={item.label} href={item.href}>
                  <div className="p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all card-hover"
                    style={{ background: `${item.color}12`, border: `1px solid ${item.color}28` }}>
                    <item.icon size={16} style={{ color: item.color }} />
                    <span className="text-xs font-medium" style={{ color: '#cbd5e1' }}>{item.label}</span>
                    <ArrowRight size={12} className="ml-auto" style={{ color: item.color }} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="col-span-12 mt-2">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1" style={{ background: '#1e3a5f' }} />
            <span className="text-xs font-semibold uppercase tracking-widest px-3"
              style={{ color: '#475569' }}>Statistik PTSP</span>
            <div className="h-px flex-1" style={{ background: '#1e3a5f' }} />
          </div>
        </div>

        {/* ── Stat Cards ── */}
        <div className="col-span-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard title="Total Mahasiswa" value={statsData.totalMahasiswa} icon={Users} color="#0ea5e9" trend="+12%" />
          <StatCard title="Disetujui" value={statsData.sudahDiverifikasi} subtitle="Dokumen valid" icon={CheckCircle} color="#10b981" />
          <StatCard title="Menunggu Verifikasi" value={statsData.menungguVerifikasi} icon={Clock} color="#f59e0b" />
          <StatCard title="Belum Upload" value={statsData.belumUpload} icon={AlertTriangle} color="#475569" />
          <StatCard title="Terkena Denda" value={statsData.terkenaD} subtitle="Rp 1.000.000/mhs" icon={XCircle} color="#f43f5e" />
        </div>

        {/* ── Bar Chart ── */}
        <div className="col-span-12 lg:col-span-7">
          <div className="rounded-2xl p-6" style={{ background: '#0d1526', border: '1px solid #1e3a5f' }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="font-semibold" style={{ color: '#e0f2fe' }}>Aktivitas Mingguan</div>
                <div className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>Upload & Verifikasi dokumen</div>
              </div>
              <div className="flex items-center gap-4 text-xs">
                {[['#0ea5e9', 'Upload'], ['#10b981', 'Verifikasi']].map(([c, l]) => (
                  <div key={l} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ background: c }} />
                    <span style={{ color: '#94a3b8' }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData} barGap={4}>
                <XAxis dataKey="hari" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#0d1526', border: '1px solid #1e3a5f', borderRadius: 8, color: '#e0f2fe', fontSize: 12 }}
                  cursor={{ fill: 'rgba(14,165,233,0.07)' }} />
                <Bar dataKey="upload" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="verifikasi" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Pie Chart ── */}
        <div className="col-span-12 lg:col-span-5">
          <div className="rounded-2xl p-6 h-full" style={{ background: '#0d1526', border: '1px solid #1e3a5f' }}>
            <div className="font-semibold mb-1" style={{ color: '#e0f2fe' }}>Distribusi Status</div>
            <div className="text-xs mb-4" style={{ color: '#94a3b8' }}>Semua mahasiswa ({statsData.totalMahasiswa} orang)</div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3}>
                  {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#0d1526', border: '1px solid #1e3a5f', borderRadius: 8, color: '#e0f2fe', fontSize: 12 }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Jalur Breakdown ── */}
        <div className="col-span-12">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl p-5" style={{ background: 'rgba(14,165,233,0.07)', border: '1px solid rgba(14,165,233,0.25)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs mb-1" style={{ color: '#94a3b8' }}>Jalur Skripsi / Tugas Akhir</div>
                  <div className="text-3xl font-bold" style={{ color: '#7dd3fc' }}>{statsData.jalurSkripsi}</div>
                  <div className="text-xs mt-1" style={{ color: '#94a3b8' }}>
                    {Math.round((statsData.jalurSkripsi / statsData.totalMahasiswa) * 100)}% dari total mahasiswa
                  </div>
                </div>
                <Award size={36} style={{ color: '#0ea5e9', opacity: 0.4 }} />
              </div>
            </div>
            <div className="rounded-2xl p-5" style={{ background: 'rgba(13,148,136,0.07)', border: '1px solid rgba(13,148,136,0.25)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs mb-1" style={{ color: '#94a3b8' }}>Jalur Jurnal / Publikasi</div>
                  <div className="text-3xl font-bold" style={{ color: '#5eead4' }}>{statsData.jalurJurnal}</div>
                  <div className="text-xs mt-1" style={{ color: '#94a3b8' }}>
                    {Math.round((statsData.jalurJurnal / statsData.totalMahasiswa) * 100)}% dari total mahasiswa
                  </div>
                </div>
                <TrendingUp size={36} style={{ color: '#0d9488', opacity: 0.4 }} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
