'use client';

import { useState } from 'react';
import {
  Search, CheckCircle2, XCircle, ExternalLink, Filter,
  FileText, AlertTriangle, Eye, ChevronDown, Clock,
} from 'lucide-react';
import { mockMahasiswa, getStatusLabel } from '../../lib/data';
import StatusBadge from '../../components/StatusBadge';

const filterOptions = [
  { value: 'semua', label: 'Semua' },
  { value: 'menunggu_verifikasi', label: 'Menunggu' },
  { value: 'disetujui', label: 'Disetujui' },
  { value: 'ditolak', label: 'Ditolak' },
  { value: 'belum_upload', label: 'Belum Upload' },
  { value: 'terkena_denda', label: 'Kena Denda' },
];

export default function AdminVerifikasiPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('semua');
  const [selectedId, setSelectedId] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [statuses, setStatuses] = useState(
    Object.fromEntries(mockMahasiswa.map((m) => [m.id, m.status]))
  );

  const selected = mockMahasiswa.find((m) => m.id === selectedId) || null;

  const filtered = mockMahasiswa.filter((m) => {
    const q = search.toLowerCase();
    const matchSearch =
      m.nama.toLowerCase().includes(q) ||
      m.nim.includes(search) ||
      m.prodi.toLowerCase().includes(q);
    const matchFilter = filter === 'semua' || statuses[m.id] === filter;
    return matchSearch && matchFilter;
  });

  const approve = (id) => setStatuses((s) => ({ ...s, [id]: 'disetujui' }));

  const reject = () => {
    if (!selected) return;
    setStatuses((s) => ({ ...s, [selected.id]: 'ditolak' }));
    setShowRejectModal(false);
    setRejectReason('');
  };

  return (
    <div className="w-full bg-[#F8F9FF] min-h-screen text-[#0D1C2E] space-y-6 animate-fadeIn">

      {/* ── Header ── */}
      <div>
        <div className="text-xs font-black uppercase tracking-widest mb-2 text-[#1E3A8A]">Panel Admin</div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0A2540]">Monitoring &amp; Verifikasi</h1>
        <p className="text-sm text-gray-500 mt-1">Kelola dan verifikasi dokumen pengajuan mahasiswa</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ── Kolom Kiri: Tabel ── */}
        <div className="flex-1 min-w-0">

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="flex-1 relative">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full pl-11 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A2540]/20 focus:border-[#0A2540]/40"
                placeholder="Cari nama, NIM, atau prodi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                className="pl-9 pr-8 py-2.5 text-sm bg-white border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#0A2540]/20 text-gray-700 font-medium"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                {filterOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl overflow-hidden bg-white border border-gray-200/80 shadow-sm">
            <div className="grid grid-cols-12 px-5 py-3 text-[10px] sm:text-xs font-black uppercase tracking-wider bg-slate-50 text-gray-400 border-b border-gray-200/80">
              <div className="col-span-4">Mahasiswa</div>
              <div className="col-span-2 hidden sm:block">Jalur</div>
              <div className="col-span-4 sm:col-span-3">Status</div>
              <div className="col-span-2 hidden sm:block">Sisa Hari</div>
              <div className="col-span-4 sm:col-span-1"></div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <Search size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Tidak ada data ditemukan</p>
              </div>
            ) : (
              filtered.map((m) => {
                const currentStatus = statuses[m.id];
                const sidang = new Date(m.tanggalSidang);
                const deadline = new Date(sidang);
                deadline.setDate(deadline.getDate() + 30);
                const daysLeft = Math.ceil((deadline.getTime() - Date.now()) / 86400000);
                const isSelected = selectedId === m.id;

                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedId(m.id)}
                    className={`grid grid-cols-12 items-center px-5 py-4 cursor-pointer transition-all border-b border-gray-100 last:border-b-0 ${
                      isSelected ? 'bg-blue-50/70' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="col-span-4">
                      <div className="text-sm font-bold text-[#0A2540]">{m.nama}</div>
                      <div className="text-xs mt-0.5 text-gray-400">{m.nim} · {m.prodi}</div>
                    </div>
                    <div className="col-span-2 hidden sm:block">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-lg capitalize font-bold ${
                          m.jalur === 'skripsi'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {m.jalur}
                      </span>
                    </div>
                    <div className="col-span-4 sm:col-span-3">
                      <StatusBadge status={currentStatus} />
                    </div>
                    <div className="col-span-2 hidden sm:block">
                      {m.jalur === 'skripsi' ? (
                        <span
                          className={`text-xs font-bold ${
                            daysLeft < 0 ? 'text-rose-500' : daysLeft < 7 ? 'text-amber-500' : 'text-emerald-600'
                          }`}
                        >
                          {daysLeft < 0 ? 'Terlambat' : `${daysLeft} hari`}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">N/A</span>
                      )}
                    </div>
                    <div className="col-span-4 sm:col-span-1 flex justify-end">
                      <Eye size={15} className={isSelected ? 'text-[#0A2540]' : 'text-gray-300'} />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="mt-3 text-xs text-gray-400">
            Menampilkan {filtered.length} dari {mockMahasiswa.length} mahasiswa
          </div>
        </div>

        {/* ── Kolom Kanan: Panel Detail ── */}
        {selected ? (
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="rounded-2xl overflow-hidden sticky top-24 bg-white border border-gray-200/80 shadow-sm">
              <div className="p-5 pb-4 border-b border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-black text-sm text-[#0A2540]">{selected.nama}</div>
                    <div className="text-xs mt-0.5 text-gray-400">{selected.nim}</div>
                  </div>
                  <StatusBadge status={statuses[selected.id]} />
                </div>
                <div className="text-xs truncate text-gray-400">{selected.prodi}</div>
              </div>

              <div className="p-5 space-y-4 max-h-[calc(100vh-320px)] overflow-y-auto">
                {/* Info */}
                <div className="space-y-2 text-xs">
                  {[
                    ['Jalur', selected.jalur === 'skripsi' ? 'Skripsi / TA' : 'Jurnal / Publikasi'],
                    ['Sidang', new Date(selected.tanggalSidang).toLocaleDateString('id-ID', { dateStyle: 'medium' })],
                    ['Nilai', selected.nilaiSidang],
                    ['Pembimbing', selected.dosenPembimbing],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-3">
                      <span className="text-gray-400">{k}</span>
                      <span className="text-right font-medium text-[#0A2540]">{v}</span>
                    </div>
                  ))}
                </div>

                {/* Judul */}
                <div className="p-3 rounded-xl text-xs leading-relaxed bg-slate-50 border border-gray-100 text-gray-500">
                  {selected.judul}
                </div>

                {/* Link Publikasi */}
                {selected.jalur === 'jurnal' && selected.linkPublikasi && (
                  <div>
                    <div className="text-xs font-black mb-2 text-gray-400 uppercase tracking-wider">Link Publikasi</div>
                    <a href={selected.linkPublikasi} target="_blank" rel="noopener noreferrer">
                      <div className="flex items-center gap-2 p-3 rounded-xl text-xs transition-all bg-amber-50 border border-amber-100 text-amber-700 hover:bg-amber-100">
                        <ExternalLink size={13} />
                        <span className="truncate">{selected.linkPublikasi}</span>
                      </div>
                    </a>
                  </div>
                )}

                {/* Dokumen */}
                {selected.dokumenUploaded && selected.dokumenUploaded.length > 0 && (
                  <div>
                    <div className="text-xs font-black mb-2 text-gray-400 uppercase tracking-wider">Dokumen Terunggah</div>
                    <div className="space-y-2">
                      {selected.dokumenUploaded.map((doc) => (
                        <div key={doc} className="flex items-center gap-2 p-2.5 rounded-lg text-xs bg-slate-50 border border-gray-100">
                          <FileText size={13} className="text-[#0A2540]" />
                          <span className="flex-1 truncate text-gray-600">{doc}</span>
                          <Eye size={13} className="text-gray-300 cursor-pointer" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Catatan */}
                {selected.catatanRevisi && (
                  <div className="p-3 rounded-xl text-xs leading-relaxed bg-amber-50 border border-amber-100 text-amber-800">
                    <div className="font-black mb-1">Catatan Sebelumnya</div>
                    <p className="text-gray-600">{selected.catatanRevisi}</p>
                  </div>
                )}

                {/* Denda Alert */}
                {statuses[selected.id] === 'terkena_denda' && (
                  <div className="p-3 rounded-xl flex items-start gap-2 bg-rose-50 border border-rose-100">
                    <AlertTriangle size={14} className="text-rose-500 mt-0.5" />
                    <div className="text-xs">
                      <div className="font-black mb-0.5 text-rose-600">Terkena Sanksi Denda</div>
                      <div className="text-rose-400">Rp 1.000.000,- harus dilunasi sebelum Yudisium</div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {statuses[selected.id] === 'menunggu_verifikasi' && (
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => approve(selected.id)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-all cursor-pointer"
                    >
                      <CheckCircle2 size={15} /> Setujui Dokumen
                    </button>
                    <button
                      onClick={() => setShowRejectModal(true)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-all cursor-pointer"
                    >
                      <XCircle size={15} /> Tolak &amp; Beri Catatan
                    </button>
                  </div>
                )}

                {statuses[selected.id] === 'disetujui' && (
                  <div className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm bg-emerald-50 border border-emerald-100 text-emerald-600">
                    <CheckCircle2 size={15} />
                    <span className="font-bold">Dokumen Telah Disetujui</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="rounded-2xl h-64 flex flex-col items-center justify-center bg-white border border-dashed border-gray-200">
              <Eye size={32} className="mb-3 opacity-20 text-gray-400" />
              <p className="text-sm text-gray-400">Pilih mahasiswa untuk melihat detail</p>
            </div>
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 p-4">
          <div className="rounded-2xl p-6 w-full max-w-md bg-white shadow-xl">
            <h3 className="text-lg font-black mb-2 text-[#0A2540]">Tolak Pengajuan</h3>
            <p className="text-sm mb-4 text-gray-500">Berikan alasan penolakan agar mahasiswa dapat memperbaiki dokumen</p>
            <textarea
              rows={4}
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A2540]/20"
              placeholder="Contoh: File hardcover buram, harap upload ulang dengan kualitas lebih baik..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-slate-100 text-gray-500 hover:bg-slate-200 transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={reject}
                disabled={!rejectReason.trim()}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  rejectReason.trim()
                    ? 'bg-rose-500 text-white hover:bg-rose-600 cursor-pointer'
                    : 'bg-slate-100 text-gray-300 cursor-not-allowed'
                }`}
              >
                Konfirmasi Tolak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
