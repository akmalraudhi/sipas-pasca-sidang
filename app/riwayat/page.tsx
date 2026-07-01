'use client';

import { useState } from 'react';
import {
  Clock, CheckCircle, XCircle, AlertTriangle,
  FileText, Link2, Download, ChevronDown, ChevronUp,
  Calendar, MessageSquare, RefreshCw,
} from 'lucide-react';
import { mockMahasiswa, StatusType } from '../lib/data';
import StatusBadge from '../components/StatusBadge';

interface TimelineItem {
  tanggal: string;
  event: string;
  deskripsi: string;
  icon: React.ElementType;
  color: string;
}

export default function RiwayatPage() {
  const me = mockMahasiswa[0];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  // Build timeline from mock data
  const sidangDate = new Date(me.tanggalSidang);
  const timeline: TimelineItem[] = [
    {
      tanggal: new Date(sidangDate.getTime() - 7 * 86400000).toLocaleDateString('id-ID', { dateStyle: 'long' }),
      event: 'Form Pra-Sidang Diterima',
      deskripsi: 'Surat pernyataan kesanggupan bermeterai telah diterima oleh PTSP.',
      icon: FileText,
      color: '#0ea5e9',
    },
    {
      tanggal: sidangDate.toLocaleDateString('id-ID', { dateStyle: 'long' }),
      event: 'Sidang Karya Akhir Dilaksanakan',
      deskripsi: `Sidang berlangsung lancar. Nilai diperoleh: ${me.nilaiSidang}. Penguji: ${me.dosenPenguji}.`,
      icon: Calendar,
      color: '#2563eb',
    },
    {
      tanggal: new Date(sidangDate.getTime() + 2 * 86400000).toLocaleDateString('id-ID', { dateStyle: 'long' }),
      event: 'Catatan Revisi Diberikan',
      deskripsi: me.catatanRevisi ?? 'Tidak ada catatan revisi.',
      icon: MessageSquare,
      color: '#f59e0b',
    },
    {
      tanggal: new Date(sidangDate.getTime() + 10 * 86400000).toLocaleDateString('id-ID', { dateStyle: 'long' }),
      event: 'Dokumen Diunggah',
      deskripsi: `Berkas ${(me.dokumenUploaded ?? []).join(', ')} berhasil diunggah ke sistem.`,
      icon: CheckCircle,
      color: '#0d9488',
    },
    {
      tanggal: new Date(sidangDate.getTime() + 12 * 86400000).toLocaleDateString('id-ID', { dateStyle: 'long' }),
      event: 'Menunggu Verifikasi PTSP',
      deskripsi: 'Dokumen kamu sedang dalam antrian verifikasi staf PTSP. Rata-rata waktu proses 2–3 hari kerja.',
      icon: Clock,
      color: '#f59e0b',
    },
  ];

  const allMahasiswa = mockMahasiswa;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#0ea5e9' }}>RIWAYAT</div>
        <h1 className="text-3xl font-bold mb-1" style={{ color: '#e0f2fe' }}>Riwayat & Status Pengajuan</h1>
        <p className="text-sm" style={{ color: '#94a3b8' }}>Pantau setiap tahapan proses pengajuan pasca-sidangmu</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Status Summary Card */}
        <div className="col-span-12 lg:col-span-4">
          <div className="rounded-2xl p-6" style={{ background: '#0d1526', border: '1px solid #1e3a5f' }}>
            <div className="text-sm font-semibold mb-4" style={{ color: '#e0f2fe' }}>Status Saat Ini</div>

            <div className="text-center mb-5 p-4 rounded-xl" style={{ background: '#070c18' }}>
              <div className="inline-block mb-3">
                <StatusBadge status={me.status} />
              </div>
              <div className="text-xs" style={{ color: '#94a3b8' }}>
                Terakhir diperbarui: {new Date(sidangDate.getTime() + 12 * 86400000).toLocaleDateString('id-ID', { dateStyle: 'long' })}
              </div>
            </div>

            {/* Progress Steps */}
            <div className="space-y-3">
              {[
                { label: 'Form Pra-Sidang', done: true },
                { label: 'Sidang Dilaksanakan', done: true },
                { label: 'Upload Dokumen', done: me.dokumenUploaded && me.dokumenUploaded.length > 0 },
                { label: 'Verifikasi PTSP', done: me.status === 'disetujui' },
                { label: 'Disetujui / Lulus', done: me.status === 'disetujui' },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: step.done ? 'rgba(16,185,129,0.2)' : 'rgba(107,104,148,0.2)',
                      border: `1.5px solid ${step.done ? '#10b981' : '#4a4870'}`,
                    }}>
                    {step.done ? (
                      <CheckCircle size={13} style={{ color: '#10b981' }} />
                    ) : (
                      <div className="w-2 h-2 rounded-full" style={{ background: '#4a4870' }} />
                    )}
                  </div>
                  <span className="text-sm" style={{ color: step.done ? '#cbd5e1' : '#475569' }}>{step.label}</span>
                </div>
              ))}
            </div>

            {/* Info Cards */}
            <div className="mt-5 space-y-2">
              <div className="p-3 rounded-xl flex items-center gap-3 text-xs"
                style={{ background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.2)' }}>
                <FileText size={14} style={{ color: '#38bdf8' }} />
                <div>
                  <div style={{ color: '#7dd3fc' }}>Jalur: {me.jalur === 'skripsi' ? 'Skripsi / TA' : 'Jurnal'}</div>
                </div>
              </div>
              {me.jalur === 'jurnal' && me.linkPublikasi && (
                <div className="p-3 rounded-xl flex items-center gap-3 text-xs"
                  style={{ background: 'rgba(13,148,136,0.08)', border: '1px solid rgba(13,148,136,0.2)' }}>
                  <Link2 size={14} style={{ color: '#5eead4' }} />
                  <a href={me.linkPublikasi} target="_blank" rel="noreferrer"
                    className="truncate hover:underline" style={{ color: '#5eead4' }}>
                    {me.linkPublikasi}
                  </a>
                </div>
              )}
              {me.dokumenUploaded?.map(doc => (
                <div key={doc} className="p-3 rounded-xl flex items-center gap-3 text-xs"
                  style={{ background: '#070c18', border: '1px solid #1e3a5f' }}>
                  <FileText size={14} style={{ color: '#0ea5e9' }} />
                  <span className="flex-1 truncate" style={{ color: '#cbd5e1' }}>{doc}</span>
                  <Download size={13} style={{ color: '#475569', cursor: 'pointer' }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="col-span-12 lg:col-span-8">
          <div className="rounded-2xl p-6" style={{ background: '#0d1526', border: '1px solid #1e3a5f' }}>
            <div className="flex items-center justify-between mb-5">
              <div className="text-sm font-semibold" style={{ color: '#e0f2fe' }}>Riwayat Aktivitas</div>
              <div className="flex items-center gap-2 text-xs cursor-pointer"
                style={{ color: '#94a3b8' }}>
                <RefreshCw size={13} />
                <span>Perbarui</span>
              </div>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-4 bottom-4 w-px" style={{ background: '#1e3a5f' }} />

              <div className="space-y-1">
                {timeline.map((item, i) => {
                  const Icon = item.icon;
                  const isExpanded = expandedIndex === i;
                  return (
                    <div key={i} className="relative pl-12">
                      {/* Icon bubble */}
                      <div className="absolute left-0 top-3 w-8 h-8 rounded-full flex items-center justify-center z-10"
                        style={{ background: `${item.color}20`, border: `1.5px solid ${item.color}60` }}>
                        <Icon size={14} style={{ color: item.color }} />
                      </div>

                      {/* Card */}
                      <div className="mb-2 rounded-xl overflow-hidden cursor-pointer transition-all"
                        style={{ background: isExpanded ? '#070c18' : 'transparent', border: `1px solid ${isExpanded ? '#1e3a5f' : 'transparent'}` }}
                        onClick={() => setExpandedIndex(isExpanded ? null : i)}>
                        <div className="px-4 py-3 flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium" style={{ color: '#e0f2fe' }}>{item.event}</div>
                            <div className="text-xs mt-0.5" style={{ color: '#475569' }}>{item.tanggal}</div>
                          </div>
                          {isExpanded ? <ChevronUp size={14} style={{ color: '#475569' }} /> : <ChevronDown size={14} style={{ color: '#475569' }} />}
                        </div>
                        {isExpanded && (
                          <div className="px-4 pb-3 text-xs leading-relaxed" style={{ color: '#94a3b8', borderTop: '1px solid #1e3a5f', paddingTop: '12px' }}>
                            {item.deskripsi}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* All submissions table (mahasiswa lain, for staf context) */}
        <div className="col-span-12">
          <div className="rounded-2xl overflow-hidden" style={{ background: '#0d1526', border: '1px solid #1e3a5f' }}>
            <div className="px-5 py-4" style={{ borderBottom: '1px solid #1e3a5f' }}>
              <div className="text-sm font-semibold" style={{ color: '#e0f2fe' }}>Semua Riwayat Pengajuan</div>
            </div>
            <div className="divide-y" style={{ borderColor: '#1e3a5f' }}>
              {allMahasiswa.map(m => {
                const sidang = new Date(m.tanggalSidang);
                const deadline = new Date(sidang);
                deadline.setDate(deadline.getDate() + 30);
                return (
                  <div key={m.id} className="px-5 py-4 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #0ea5e9, #2563eb)', color: '#fff' }}>
                      {m.nama.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium" style={{ color: '#e0f2fe' }}>{m.nama}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#475569' }}>{m.nim} · {m.prodi}</div>
                    </div>
                    <div className="hidden md:block text-xs flex-shrink-0" style={{ color: '#94a3b8' }}>
                      Sidang: {sidang.toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                    </div>
                    <div className="text-xs flex-shrink-0 capitalize px-2.5 py-1 rounded-lg"
                      style={{
                        background: m.jalur === 'skripsi' ? 'rgba(14,165,233,0.1)' : 'rgba(13,148,136,0.1)',
                        color: m.jalur === 'skripsi' ? '#7dd3fc' : '#5eead4',
                      }}>
                      {m.jalur}
                    </div>
                    <StatusBadge status={m.status} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
