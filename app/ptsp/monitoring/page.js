'use client';

import { useState } from 'react';
import {
  Search, CheckCircle, XCircle, ExternalLink, Filter,
  FileText, AlertTriangle, Eye, ChevronDown, Clock,
} from 'lucide-react';
import { mockMahasiswa, Mahasiswa, StatusType } from '../lib/data';
import StatusBadge from '../components/StatusBadge';

type FilterType = 'semua' | StatusType;

export default function MonitoringPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('semua');
  const [selected, setSelected] = useState<Mahasiswa | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [statuses, setStatuses] = useState<Record<string, StatusType>>(
    Object.fromEntries(mockMahasiswa.map(m => [m.id, m.status]))
  );

  const filtered = mockMahasiswa.filter(m => {
    const matchSearch = m.nama.toLowerCase().includes(search.toLowerCase()) ||
      m.nim.includes(search) || m.prodi.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'semua' || statuses[m.id] === filter;
    return matchSearch && matchFilter;
  });

  const approve = (id: string) => {
    setStatuses(s => ({ ...s, [id]: 'disetujui' }));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: 'disetujui' } : null);
  };

  const reject = () => {
    if (!selected) return;
    setStatuses(s => ({ ...s, [selected.id]: 'ditolak' }));
    setSelected(prev => prev ? { ...prev, status: 'ditolak', catatanRevisi: rejectReason } : null);
    setShowRejectModal(false);
    setRejectReason('');
  };

  const filterOptions: { value: FilterType; label: string }[] = [
    { value: 'semua', label: 'Semua' },
    { value: 'menunggu_verifikasi', label: 'Menunggu' },
    { value: 'disetujui', label: 'Disetujui' },
    { value: 'ditolak', label: 'Ditolak' },
    { value: 'belum_upload', label: 'Belum Upload' },
    { value: 'terkena_denda', label: 'Kena Denda' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#0ea5e9' }}>STAF PTSP</div>
        <h1 className="text-3xl font-bold mb-1" style={{ color: '#e0f2fe' }}>Monitoring & Verifikasi</h1>
        <p className="text-sm" style={{ color: '#94a3b8' }}>Kelola dan verifikasi dokumen pengajuan mahasiswa</p>
      </div>

      <div className="flex gap-6">
        {/* Left: Table */}
        <div className="flex-1 min-w-0">
          {/* Search & Filter */}
          <div className="flex gap-3 mb-5">
            <div className="flex-1 relative">
              <Search size={15} className="absolute left-4 top-3" style={{ color: '#475569' }} />
              <input type="text" className="w-full pl-11 pr-4 py-2.5 text-sm"
                placeholder="Cari nama, NIM, atau prodi..."
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="relative">
              <Filter size={14} className="absolute left-3 top-3" style={{ color: '#475569' }} />
              <select className="pl-9 pr-8 py-2.5 text-sm appearance-none"
                value={filter} onChange={e => setFilter(e.target.value as FilterType)}>
                {filterOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-3 pointer-events-none" style={{ color: '#475569' }} />
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl overflow-hidden" style={{ background: '#0d1526', border: '1px solid #1e3a5f' }}>
            {/* Table Header */}
            <div className="grid grid-cols-12 px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ background: '#070c18', color: '#475569', borderBottom: '1px solid #1e3a5f' }}>
              <div className="col-span-4">Mahasiswa</div>
              <div className="col-span-2">Jalur</div>
              <div className="col-span-3">Status</div>
              <div className="col-span-2">Sisa Hari</div>
              <div className="col-span-1"></div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16" style={{ color: '#94a3b8' }}>
                <Search size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Tidak ada data ditemukan</p>
              </div>
            ) : (
              filtered.map(m => {
                const currentStatus = statuses[m.id];
                const sidang = new Date(m.tanggalSidang);
                const deadline = new Date(sidang);
                deadline.setDate(deadline.getDate() + 30);
                const daysLeft = Math.ceil((deadline.getTime() - Date.now()) / 86400000);
                const isSelected = selected?.id === m.id;

                return (
                  <div key={m.id}
                    className="grid grid-cols-12 items-center px-5 py-4 cursor-pointer transition-all"
                    style={{
                      borderBottom: '1px solid #1e3a5f',
                      background: isSelected ? 'rgba(14,165,233,0.1)' : 'transparent',
                    }}
                    onClick={() => setSelected({ ...m, status: currentStatus })}>
                    <div className="col-span-4">
                      <div className="text-sm font-medium" style={{ color: '#e0f2fe' }}>{m.nama}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#475569' }}>{m.nim} · {m.prodi}</div>
                    </div>
                    <div className="col-span-2">
                      <span className="text-xs px-2.5 py-1 rounded-lg capitalize font-medium"
                        style={{
                          background: m.jalur === 'skripsi' ? 'rgba(14,165,233,0.15)' : 'rgba(13,148,136,0.15)',
                          color: m.jalur === 'skripsi' ? '#7dd3fc' : '#5eead4',
                        }}>
                        {m.jalur}
                      </span>
                    </div>
                    <div className="col-span-3">
                      <StatusBadge status={currentStatus} />
                    </div>
                    <div className="col-span-2">
                      {m.jalur === 'skripsi' ? (
                        <span className="text-xs font-medium" style={{ color: daysLeft < 0 ? '#f43f5e' : daysLeft < 7 ? '#f59e0b' : '#10b981' }}>
                          {daysLeft < 0 ? 'Terlambat' : `${daysLeft} hari`}
                        </span>
                      ) : (
                        <span className="text-xs" style={{ color: '#475569' }}>N/A</span>
                      )}
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <Eye size={14} style={{ color: isSelected ? '#38bdf8' : '#475569' }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="mt-3 text-xs" style={{ color: '#475569' }}>
            Menampilkan {filtered.length} dari {mockMahasiswa.length} mahasiswa
          </div>
        </div>

        {/* Right: Detail Panel */}
        {selected ? (
          <div className="w-80 flex-shrink-0">
            <div className="rounded-2xl overflow-hidden sticky top-8" style={{ background: '#0d1526', border: '1px solid #1e3a5f' }}>
              {/* Panel Header */}
              <div className="p-5 pb-4" style={{ borderBottom: '1px solid #1e3a5f' }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold text-sm" style={{ color: '#e0f2fe' }}>{selected.nama}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>{selected.nim}</div>
                  </div>
                  <StatusBadge status={statuses[selected.id]} />
                </div>
                <div className="text-xs truncate" style={{ color: '#475569' }}>{selected.prodi}</div>
              </div>

              <div className="p-5 space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto scrollbar-thin">
                {/* Info */}
                <div className="space-y-2 text-xs">
                  {[
                    ['Jalur', selected.jalur === 'skripsi' ? 'Skripsi / TA' : 'Jurnal / Publikasi'],
                    ['Sidang', new Date(selected.tanggalSidang).toLocaleDateString('id-ID', { dateStyle: 'medium' })],
                    ['Nilai', selected.nilaiSidang],
                    ['Pembimbing', selected.dosenPembimbing],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-3">
                      <span style={{ color: '#475569' }}>{k}</span>
                      <span className="text-right" style={{ color: '#cbd5e1' }}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* Judul */}
                <div className="p-3 rounded-xl text-xs leading-relaxed" style={{ background: '#070c18', border: '1px solid #1e3a5f', color: '#94a3b8' }}>
                  {selected.judul}
                </div>

                {/* Link Publikasi */}
                {selected.jalur === 'jurnal' && selected.linkPublikasi && (
                  <div>
                    <div className="text-xs font-semibold mb-2" style={{ color: '#94a3b8' }}>LINK PUBLIKASI</div>
                    <a href={selected.linkPublikasi} target="_blank" rel="noopener noreferrer">
                      <div className="flex items-center gap-2 p-3 rounded-xl text-xs transition-all"
                        style={{ background: 'rgba(13,148,136,0.1)', border: '1px solid rgba(13,148,136,0.3)', color: '#5eead4' }}>
                        <ExternalLink size={13} />
                        <span className="truncate">{selected.linkPublikasi}</span>
                      </div>
                    </a>
                  </div>
                )}

                {/* Dokumen */}
                {selected.dokumenUploaded && selected.dokumenUploaded.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold mb-2" style={{ color: '#94a3b8' }}>DOKUMEN TERUNGGAH</div>
                    <div className="space-y-2">
                      {selected.dokumenUploaded.map(doc => (
                        <div key={doc} className="flex items-center gap-2 p-2.5 rounded-lg text-xs"
                          style={{ background: '#070c18', border: '1px solid #1e3a5f' }}>
                          <FileText size={13} style={{ color: '#0ea5e9' }} />
                          <span className="flex-1 truncate" style={{ color: '#cbd5e1' }}>{doc}</span>
                          <Eye size={13} style={{ color: '#475569', cursor: 'pointer' }} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Catatan */}
                {selected.catatanRevisi && (
                  <div className="p-3 rounded-xl text-xs leading-relaxed"
                    style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', color: '#fbbf24' }}>
                    <div className="font-semibold mb-1">Catatan Sebelumnya</div>
                    <p style={{ color: '#cbd5e1' }}>{selected.catatanRevisi}</p>
                  </div>
                )}

                {/* Denda Alert */}
                {statuses[selected.id] === 'terkena_denda' && (
                  <div className="p-3 rounded-xl flex items-start gap-2"
                    style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)' }}>
                    <AlertTriangle size={14} style={{ color: '#f43f5e', marginTop: 1 }} />
                    <div className="text-xs">
                      <div className="font-semibold mb-0.5" style={{ color: '#f43f5e' }}>Terkena Sanksi Denda</div>
                      <div style={{ color: '#fca5a5' }}>Rp 1.000.000,- harus dilunasi sebelum Yudisium</div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {(statuses[selected.id] === 'menunggu_verifikasi') && (
                  <div className="space-y-2 pt-2">
                    <button onClick={() => approve(selected.id)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all"
                      style={{ background: 'linear-gradient(135deg, #059669, #10b981)', color: '#fff' }}>
                      <CheckCircle size={15} /> Setujui Dokumen
                    </button>
                    <button onClick={() => setShowRejectModal(true)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all"
                      style={{ background: 'rgba(244,63,94,0.15)', border: '1px solid rgba(244,63,94,0.4)', color: '#f43f5e' }}>
                      <XCircle size={15} /> Tolak & Beri Catatan
                    </button>
                  </div>
                )}

                {statuses[selected.id] === 'disetujui' && (
                  <div className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm"
                    style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#6ee7b7' }}>
                    <CheckCircle size={15} />
                    <span>Dokumen Telah Disetujui</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-80 flex-shrink-0">
            <div className="rounded-2xl h-64 flex flex-col items-center justify-center" style={{ background: '#0d1526', border: '1px dashed #1e3a5f' }}>
              <Eye size={32} className="mb-3 opacity-20" style={{ color: '#94a3b8' }} />
              <p className="text-sm" style={{ color: '#475569' }}>Pilih mahasiswa untuk melihat detail</p>
            </div>
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="rounded-2xl p-6 w-full max-w-md" style={{ background: '#0d1526', border: '1px solid #1e3a5f' }}>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#e0f2fe' }}>Tolak Pengajuan</h3>
            <p className="text-sm mb-4" style={{ color: '#94a3b8' }}>Berikan alasan penolakan agar mahasiswa dapat memperbaiki dokumen</p>
            <textarea rows={4} className="w-full px-4 py-3 text-sm"
              placeholder="Contoh: File hardcover buram, harap upload ulang dengan kualitas lebih baik..."
              value={rejectReason} onChange={e => setRejectReason(e.target.value)} />
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowRejectModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-medium"
                style={{ background: '#1e3a5f', color: '#94a3b8' }}>Batal</button>
              <button onClick={reject} disabled={!rejectReason.trim()}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{ background: rejectReason.trim() ? 'rgba(244,63,94,0.9)' : '#1e3a5f', color: rejectReason.trim() ? '#fff' : '#475569' }}>
                Konfirmasi Tolak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
