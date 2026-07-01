'use client';

import { useState } from 'react';
import {
  FileText, Upload, Link2, CheckCircle, AlertCircle,
  ChevronRight, Book, Newspaper, Info, X, Check,
} from 'lucide-react';
import { mockMahasiswa } from '../lib/data';

type Step = 'pra' | 'pasca' | 'selesai';

export default function PengajuanPage() {
  const me = mockMahasiswa[0];
  const [step, setStep] = useState<Step>('pra');
  const [praForm, setPraForm] = useState({ setuju: false, nama: '', nim: '', tanggal: '' });
  const [pascaSkripsi, setPascaSkripsi] = useState({ hardcover: null as File | null, pengesahan: null as File | null, pernyataan: null as File | null });
  const [pascaJurnal, setPascaJurnal] = useState({ link: '', laporan: null as File | null });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePra = () => {
    const e: Record<string, string> = {};
    if (!praForm.nama.trim()) e.nama = 'Nama wajib diisi';
    if (!praForm.nim.trim()) e.nim = 'NIM wajib diisi';
    if (!praForm.tanggal) e.tanggal = 'Tanggal wajib diisi';
    if (!praForm.setuju) e.setuju = 'Harus menyetujui pernyataan';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePraSubmit = () => {
    if (validatePra()) setStep('pasca');
  };

  const validatePasca = () => {
    const e: Record<string, string> = {};
    if (me.jalur === 'skripsi') {
      if (!pascaSkripsi.hardcover) e.hardcover = 'Bukti hardcover wajib diunggah';
      if (!pascaSkripsi.pengesahan) e.pengesahan = 'Lembar pengesahan wajib diunggah';
    } else {
      if (!pascaJurnal.link.trim()) e.link = 'Link publikasi wajib diisi';
      else if (!/^https?:\/\/.+/.test(pascaJurnal.link)) e.link = 'Link harus diawali https://';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePascaSubmit = () => {
    if (validatePasca()) setStep('selesai');
  };

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#0ea5e9' }}>
          FORM PENGAJUAN
        </div>
        <h1 className="text-3xl font-bold mb-1" style={{ color: '#e0f2fe' }}>Pengajuan Dokumen Pasca-Sidang</h1>
        <p className="text-sm" style={{ color: '#94a3b8' }}>Lengkapi semua tahapan untuk menyelesaikan proses pasca-sidang kamu</p>
      </div>

      {/* Jalur Info Banner */}
      <div className="rounded-xl p-4 mb-6 flex items-start gap-3" style={{
        background: me.jalur === 'skripsi' ? 'rgba(14,165,233,0.1)' : 'rgba(13,148,136,0.1)',
        border: `1px solid ${me.jalur === 'skripsi' ? 'rgba(14,165,233,0.3)' : 'rgba(13,148,136,0.3)'}`,
      }}>
        {me.jalur === 'skripsi' ? <Book size={18} style={{ color: '#38bdf8', marginTop: 1 }} /> : <Newspaper size={18} style={{ color: '#5eead4', marginTop: 1 }} />}
        <div>
          <div className="text-sm font-semibold mb-1" style={{ color: me.jalur === 'skripsi' ? '#7dd3fc' : '#5eead4' }}>
            Kamu berada di Jalur {me.jalur === 'skripsi' ? 'Skripsi / Tugas Akhir' : 'Jurnal / Publikasi Ilmiah'}
          </div>
          <div className="text-xs" style={{ color: '#94a3b8' }}>
            {me.jalur === 'skripsi'
              ? 'Wajib mengumpulkan hardcover dalam 30 hari setelah sidang. Keterlambatan dikenakan denda Rp 1.000.000.'
              : 'Tidak diwajibkan menyerahkan hardcover. Cukup melampirkan link publikasi ilmiah yang valid.'}
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center mb-8">
        {[
          { id: 'pra', label: 'Pra-Sidang', num: 1 },
          { id: 'pasca', label: 'Pasca-Sidang', num: 2 },
          { id: 'selesai', label: 'Selesai', num: 3 },
        ].map((s, i, arr) => {
          const isDone = step === 'pasca' && s.id === 'pra' || step === 'selesai';
          const isActive = step === s.id;
          return (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                  style={{
                    background: isDone ? '#10b981' : isActive ? '#0ea5e9' : '#1e3a5f',
                    color: isDone || isActive ? '#fff' : '#475569',
                  }}>
                  {isDone ? <Check size={14} /> : s.num}
                </div>
                <span className="text-xs font-medium" style={{ color: isActive ? '#7dd3fc' : isDone ? '#6ee7b7' : '#475569' }}>
                  {s.label}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div className="flex-1 h-px mx-4 transition-all" style={{ background: step === 'pasca' && s.id === 'pra' || step === 'selesai' ? '#10b981' : '#1e3a5f' }} />
              )}
            </div>
          );
        })}
      </div>

      {/* ── STEP 1: PRA-SIDANG ── */}
      {step === 'pra' && (
        <div className="rounded-2xl p-6" style={{ background: '#0d1526', border: '1px solid #1e3a5f' }}>
          <div className="flex items-center gap-2 mb-6">
            <FileText size={18} style={{ color: '#0ea5e9' }} />
            <h2 className="text-lg font-semibold" style={{ color: '#e0f2fe' }}>Form Pernyataan Kesanggupan</h2>
          </div>

          <div className="rounded-xl p-4 mb-6 text-sm leading-relaxed" style={{ background: '#070c18', border: '1px solid #1e3a5f', color: '#cbd5e1' }}>
            <div className="font-semibold mb-2" style={{ color: '#e0f2fe' }}>SURAT PERNYATAAN DI ATAS METERAI</div>
            <p className="mb-3">Saya yang bertanda tangan di bawah ini, selaku mahasiswa Universitas Paramadina, dengan ini menyatakan bahwa:</p>
            <ol className="space-y-1.5 list-decimal list-inside text-xs" style={{ color: '#94a3b8' }}>
              <li>Saya <strong style={{ color: '#cbd5e1' }}>sanggup</strong> menyelesaikan revisi karya akhir dalam waktu <strong style={{ color: '#cbd5e1' }}>30 (tiga puluh) hari kalender</strong> terhitung sejak tanggal sidang.</li>
              <li>Saya memahami bahwa keterlambatan pengumpulan revisi akan dikenakan <strong style={{ color: '#f43f5e' }}>sanksi denda sebesar Rp 1.000.000,-</strong> (satu juta rupiah).</li>
              <li>Saya memahami batas akhir pengumpulan adalah sebelum tanggal <strong style={{ color: '#cbd5e1' }}>Yudisium</strong> yang ditetapkan oleh pihak akademik.</li>
              <li>Pernyataan ini saya buat dalam keadaan sadar dan tanpa paksaan dari pihak manapun.</li>
            </ol>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#94a3b8' }}>Nama Lengkap <span style={{ color: '#f43f5e' }}>*</span></label>
              <input type="text" className="w-full px-4 py-2.5 text-sm" placeholder="Masukkan nama lengkap sesuai KTP"
                value={praForm.nama} onChange={e => setPraForm({ ...praForm, nama: e.target.value })} />
              {errors.nama && <p className="text-xs mt-1" style={{ color: '#f43f5e' }}>{errors.nama}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#94a3b8' }}>NIM <span style={{ color: '#f43f5e' }}>*</span></label>
              <input type="text" className="w-full px-4 py-2.5 text-sm" placeholder="Nomor Induk Mahasiswa"
                value={praForm.nim} onChange={e => setPraForm({ ...praForm, nim: e.target.value })} />
              {errors.nim && <p className="text-xs mt-1" style={{ color: '#f43f5e' }}>{errors.nim}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#94a3b8' }}>Tanggal Pernyataan <span style={{ color: '#f43f5e' }}>*</span></label>
              <input type="date" className="w-full px-4 py-2.5 text-sm"
                value={praForm.tanggal} onChange={e => setPraForm({ ...praForm, tanggal: e.target.value })} />
              {errors.tanggal && <p className="text-xs mt-1" style={{ color: '#f43f5e' }}>{errors.tanggal}</p>}
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-3 p-4 rounded-xl cursor-pointer" style={{ background: '#070c18', border: `1px solid ${errors.setuju ? '#f43f5e' : '#1e3a5f'}` }}
              onClick={() => setPraForm({ ...praForm, setuju: !praForm.setuju })}>
              <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                style={{ background: praForm.setuju ? '#0ea5e9' : 'transparent', border: `2px solid ${praForm.setuju ? '#0ea5e9' : '#4a4870'}` }}>
                {praForm.setuju && <Check size={12} color="#fff" />}
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#94a3b8' }}>
                Saya telah membaca dan <strong style={{ color: '#7dd3fc' }}>menyetujui</strong> seluruh pernyataan di atas, dan bersedia menerima konsekuensi jika tidak memenuhi kewajiban.
              </p>
            </div>
            {errors.setuju && <p className="text-xs" style={{ color: '#f43f5e' }}>{errors.setuju}</p>}
          </div>

          <button onClick={handlePraSubmit} className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{ background: 'linear-gradient(135deg, #0ea5e9, #2563eb)', color: '#fff' }}>
            Lanjutkan ke Pasca-Sidang <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* ── STEP 2: PASCA-SIDANG ── */}
      {step === 'pasca' && (
        <div className="rounded-2xl p-6" style={{ background: '#0d1526', border: '1px solid #1e3a5f' }}>
          <div className="flex items-center gap-2 mb-6">
            {me.jalur === 'skripsi' ? <Book size={18} style={{ color: '#0ea5e9' }} /> : <Newspaper size={18} style={{ color: '#0d9488' }} />}
            <h2 className="text-lg font-semibold" style={{ color: '#e0f2fe' }}>
              Dokumen Pasca-Sidang — Jalur {me.jalur === 'skripsi' ? 'Skripsi' : 'Jurnal'}
            </h2>
          </div>

          {me.jalur === 'skripsi' ? (
            <div className="space-y-5">
              {[
                { key: 'pengesahan', label: 'Lembar Pengesahan', desc: 'PDF bertanda tangan dosen pembimbing & penguji' },
                { key: 'pernyataan', label: 'Lembar Pernyataan Keaslian', desc: 'PDF bermeterai Rp 10.000' },
                { key: 'hardcover', label: 'Bukti Penyerahan Hardcover', desc: 'Foto/scan tanda terima dari perpustakaan' },
              ].map(({ key, label, desc }) => (
                <div key={key}>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#e0f2fe' }}>
                    {label} <span style={{ color: '#f43f5e' }}>*</span>
                  </label>
                  <p className="text-xs mb-3" style={{ color: '#94a3b8' }}>{desc}</p>
                  <UploadBox
                    file={(pascaSkripsi as any)[key]}
                    onFile={f => setPascaSkripsi({ ...pascaSkripsi, [key]: f })}
                    error={errors[key]}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#e0f2fe' }}>
                  Link / URL Publikasi Ilmiah <span style={{ color: '#f43f5e' }}>*</span>
                </label>
                <p className="text-xs mb-3" style={{ color: '#94a3b8' }}>
                  Masukkan tautan artikel yang sudah dipublikasikan di jurnal terakreditasi (Sinta, Scopus, dll.)
                </p>
                <div className="relative">
                  <Link2 size={16} className="absolute left-4 top-3.5" style={{ color: '#94a3b8' }} />
                  <input type="url" className="w-full pl-11 pr-4 py-3 text-sm" placeholder="https://journal.example.ac.id/artikel/xxxxx"
                    value={pascaJurnal.link} onChange={e => setPascaJurnal({ ...pascaJurnal, link: e.target.value })} />
                </div>
                {errors.link && <p className="text-xs mt-1" style={{ color: '#f43f5e' }}>{errors.link}</p>}
                <div className="mt-2 flex items-start gap-2 text-xs" style={{ color: '#94a3b8' }}>
                  <Info size={13} style={{ marginTop: 1, flexShrink: 0 }} />
                  <span>Staf PTSP akan mengklik link ini untuk memverifikasi keaslian dan status publikasimu.</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#e0f2fe' }}>Laporan Penelitian (Opsional)</label>
                <p className="text-xs mb-3" style={{ color: '#94a3b8' }}>Upload laporan atau dokumen pendukung jika diperlukan</p>
                <UploadBox file={pascaJurnal.laporan} onFile={f => setPascaJurnal({ ...pascaJurnal, laporan: f })} />
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button onClick={() => setStep('pra')} className="flex-1 py-3 rounded-xl text-sm font-medium transition-all"
              style={{ background: '#1e3a5f', color: '#94a3b8' }}>
              Kembali
            </button>
            <button onClick={handlePascaSubmit} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: 'linear-gradient(135deg, #0ea5e9, #2563eb)', color: '#fff' }}>
              Kirim Pengajuan <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: SELESAI ── */}
      {step === 'selesai' && (
        <div className="rounded-2xl p-10 text-center" style={{ background: '#0d1526', border: '1px solid #1e3a5f' }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: 'rgba(16,185,129,0.15)', border: '2px solid rgba(16,185,129,0.4)' }}>
            <CheckCircle size={40} style={{ color: '#10b981' }} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#e0f2fe' }}>Pengajuan Berhasil Dikirim!</h2>
          <p className="text-sm mb-6 max-w-sm mx-auto" style={{ color: '#94a3b8' }}>
            Dokumen kamu sedang dalam proses verifikasi oleh staf PTSP. Kamu akan mendapatkan notifikasi setelah dokumen diproses.
          </p>
          <div className="rounded-xl p-4 mb-6 text-left" style={{ background: '#070c18', border: '1px solid #1e3a5f' }}>
            <div className="text-xs font-semibold mb-3" style={{ color: '#94a3b8' }}>RINGKASAN PENGAJUAN</div>
            <div className="space-y-2 text-xs">
              {[
                ['Nama', me.nama], ['NIM', me.nim], ['Jalur', me.jalur === 'skripsi' ? 'Skripsi / Tugas Akhir' : 'Jurnal / Publikasi'],
                ['Status', 'Menunggu Verifikasi'], ['Tanggal Kirim', new Date().toLocaleDateString('id-ID', { dateStyle: 'long' })],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span style={{ color: '#475569' }}>{k}</span>
                  <span style={{ color: '#cbd5e1' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <a href="/riwayat" className="flex-1">
              <button className="w-full py-3 rounded-xl text-sm font-medium" style={{ background: '#1e3a5f', color: '#94a3b8' }}>
                Lihat Riwayat
              </button>
            </a>
            <a href="/dashboard" className="flex-1">
              <button className="w-full py-3 rounded-xl text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #0ea5e9, #2563eb)', color: '#fff' }}>
                Ke Dashboard
              </button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function UploadBox({ file, onFile, error }: { file: File | null; onFile: (f: File) => void; error?: string }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) onFile(f);
  };

  return (
    <div>
      <label className="block cursor-pointer">
        <input type="file" className="hidden" onChange={handleChange} accept=".pdf,.jpg,.jpeg,.png" />
        <div className="rounded-xl p-5 text-center transition-all"
          style={{
            background: file ? 'rgba(16,185,129,0.08)' : '#070c18',
            border: `2px dashed ${error ? '#f43f5e' : file ? '#10b981' : '#1e3a5f'}`,
          }}>
          {file ? (
            <div className="flex items-center justify-center gap-3">
              <CheckCircle size={18} style={{ color: '#10b981' }} />
              <span className="text-sm font-medium" style={{ color: '#6ee7b7' }}>{file.name}</span>
            </div>
          ) : (
            <div>
              <Upload size={22} className="mx-auto mb-2" style={{ color: '#475569' }} />
              <p className="text-sm" style={{ color: '#94a3b8' }}>Klik untuk upload file</p>
              <p className="text-xs mt-1" style={{ color: '#475569' }}>PDF, JPG, PNG (maks. 10MB)</p>
            </div>
          )}
        </div>
      </label>
      {error && <p className="text-xs mt-1" style={{ color: '#f43f5e' }}>{error}</p>}
    </div>
  );
}
