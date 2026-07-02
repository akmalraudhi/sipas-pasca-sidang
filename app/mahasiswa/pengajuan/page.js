'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Upload, Link2, CheckCircle, ChevronRight, Book, 
  Newspaper, Info, Check, AlertTriangle, User, 
  GraduationCap, FileText, Calendar
} from 'lucide-react';

export default function PengajuanPage() {
  const [jalurAktif, setJalurAktif] = useState('skripsi');

  useEffect(() => {
    // Sinkronisasi Global Jalur Kelulusan dari LocalStorage
    const savedJalur = localStorage.getItem('jalurKelulusan');
    if (savedJalur) {
      setJalurAktif(savedJalur);
    }
  }, []);

  const me = {
    nama: "Prila Fathur Rizqi",
    nim: "123103149",
    prodi: "S1 Informatika",
    jalur: jalurAktif 
  };

  const [step, setStep] = useState('pra');
  const [praForm, setPraForm] = useState({ 
    setuju: false, 
    nama: me.nama, 
    nim: me.nim, 
    prodi: me.prodi, 
    tanggal: '2026-07-02' 
  });
  const [pascaSkripsi, setPascaSkripsi] = useState({ hardcover: null, pengesahan: null, pernyataan: null });
  const [pascaJurnal, setPascaJurnal] = useState({ link: '', laporan: null });
  const [errors, setErrors] = useState({});

  const validatePra = () => {
    const e = {};
    if (!praForm.nama.trim()) e.nama = 'Nama wajib diisi';
    if (!praForm.nim.trim()) e.nim = 'NIM wajib diisi';
    if (!praForm.tanggal) e.tanggal = 'Tanggal wajib diisi';
    if (!praForm.setuju) e.setuju = 'Kotak konfirmasi persetujuan wajib dicentang';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePraSubmit = () => {
    if (validatePra()) setStep('pasca');
  };

  const validatePasca = () => {
    const e = {};
    if (jalurAktif === 'skripsi') {
      if (!pascaSkripsi.hardcover) e.hardcover = 'Bukti hardcover wajib diunggah';
      if (!pascaSkripsi.pengesahan) e.pengesahan = 'Lembar pengesahan wajib diunggah';
      if (!pascaSkripsi.pernyataan) e.pernyataan = 'Lembar pernyataan wajib diunggah';
    } else {
      if (!pascaJurnal.link.trim()) e.link = 'Link publikasi jurnal wajib diisi';
      else if (!/^https?:\/\/.+/.test(pascaJurnal.link)) e.link = 'Tautan harus diawali dengan https://';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePascaSubmit = () => {
    if (validatePasca()) setStep('selesai');
  };

  return (
    <div className="w-full bg-[#F8F9FF] min-h-screen text-[#0D1C2E] p-4 sm:p-6 lg:p-8 space-y-6 animate-fadeIn">
      
      {/* ── 1. TITEL TAHAPAN (ADAPTIF JALUR) ── */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-[#0A2540]">
          {jalurAktif === 'skripsi' ? 'Pernyataan Fakta Integritas Skripsi' : 'Pernyataan Komitmen Publikasi Jurnal'}
        </h1>
        <p className="text-sm text-gray-500">
          Langkah {step === 'pra' ? '1' : step === 'pasca' ? '2' : '3'} dari 3: {
            step === 'pra' ? 'Persyaratan Dokumen & Komitmen Akademik' : 
            step === 'pasca' ? 'Pengunggahan Output Dokumen Kelulusan' : 'Selesai & Validasi'
          }
        </p>
      </div>

      {/* ── 2. INDIKATOR PROGRES & BADGE JALUR ── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 text-white text-[10px] font-black tracking-widest rounded-full uppercase ${
            jalurAktif === 'skripsi' ? 'bg-[#0A2540]' : 'bg-teal-700'
          }`}>
            {jalurAktif === 'skripsi' ? 'PERSIAPAN SKRIPSI' : 'PUBLIKASI JURNAL'}
          </span>
          <span className="text-xs font-bold text-[#0A2540]">
            {step === 'pra' ? '33%' : step === 'pasca' ? '66%' : '100%'} Selesai
          </span>
        </div>
        <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
          <div 
            className={`h-2 transition-all duration-500 ${jalurAktif === 'skripsi' ? 'bg-[#0A2540]' : 'bg-teal-600'}`}
            style={{ width: step === 'pra' ? '33.33%' : step === 'pasca' ? '66.66%' : '100%' }}
          />
        </div>
      </div>

      {/* ── 3. BOX KETENTUAN & SANKSI (KONDISIONAL BERDASARKAN JALUR) ── */}
      {step === 'pra' && (
        jalurAktif === 'skripsi' ? (
          <div className="p-5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-4 shadow-sm text-red-900">
            <AlertTriangle className="text-red-600 mt-0.5 flex-shrink-0" size={20} />
            <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
              <h4 className="font-black text-red-700">Ketentuan Batas Waktu & Sanksi Skripsi</h4>
              <p>
                Sesuai Pedoman Akademik Pasal 24: Penyelesaian revisi Skripsi wajib diselesaikan dalam kurun waktu <strong className="font-black">30 hari kalender</strong> sejak sidang dinyatakan lulus. Keterlambatan tanpa alasan mendesak akan dikenakan denda administratif sebesar <strong className="font-black">Rp 1.000.000 (Satu Juta Rupiah)</strong>.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-5 bg-teal-50 border border-teal-200 rounded-2xl flex items-start gap-4 shadow-sm text-teal-900">
            <Info className="text-teal-600 mt-0.5 flex-shrink-0" size={20} />
            <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
              <h4 className="font-black text-teal-700">Ketentuan Bebas Hardcover & Validasi URL</h4>
              <p>
                Melalui jalur Publikasi Ilmiah, Anda dinyatakan <strong className="font-black text-teal-800">Bebas dari Kewajiban Cetak Buku Hardcover fisik</strong>. Mahasiswa wajib menjamin bahwa tautan/link jurnal eksternal yang diinput berstatus aktif, valid, dan memuat nama mahasiswa secara resmi.
              </p>
            </div>
          </div>
        )
      )}

      {/* ── STEP 1: DEKLARASI PERNYATAAN MAHASISWA ── */}
      {step === 'pra' && (
        <div className="space-y-6">
          
          {/* FORMULIR DATA POKOK */}
          <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-slate-50/60 border-b border-gray-100 px-6 py-4 flex items-center gap-2.5">
              <FileText size={18} className="text-[#0A2540]" />
              <h2 className="text-sm font-black text-[#0A2540] uppercase tracking-wider">Formulir Pernyataan Mahasiswa</h2>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Nama Lengkap</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-3.5 text-gray-400" />
                  <input type="text" className="w-full pl-11 pr-4 py-3 text-sm bg-gray-50/50 border border-gray-200 rounded-xl font-bold text-gray-700 focus:outline-none" value={praForm.nama} readOnly />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">NIM Pokok</label>
                <div className="relative">
                  <GraduationCap size={16} className="absolute left-4 top-3.5 text-gray-400" />
                  <input type="text" className="w-full pl-11 pr-4 py-3 text-sm bg-gray-50/50 border border-gray-200 rounded-xl font-bold text-gray-700 focus:outline-none" value={praForm.nim} readOnly />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Program Studi</label>
                <div className="relative">
                  <Book size={16} className="absolute left-4 top-3.5 text-gray-400" />
                  <input type="text" className="w-full pl-11 pr-4 py-3 text-sm bg-gray-50/50 border border-gray-200 rounded-xl font-bold text-gray-700 focus:outline-none" value={praForm.prodi} readOnly />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Tanggal Pengisian</label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-4 top-3.5 text-gray-400" />
                  <input type="text" className="w-full pl-11 pr-4 py-3 text-sm bg-gray-50/50 border border-gray-200 rounded-xl font-bold text-gray-700 focus:outline-none" value="2 Juli 2026" readOnly />
                </div>
              </div>
            </div>
          </div>

          {/* KOTAK POIN INTEGRITAS */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-[#0A2540] uppercase tracking-wider">Poin Komitmen Kelulusan</h3>
            
            <div className="space-y-4">
              {jalurAktif === 'skripsi' ? [
                "Saya menyatakan bahwa skripsi yang saya ajukan adalah hasil karya sendiri, bukan plagiasi, dan belum pernah diajukan untuk gelar akademik lain.",
                "Saya berkomitmen untuk menuntaskan dokumen hardcover fisik dan menyerahkannya ke perpustakaan pusat dalam batas waktu 30 hari kalender.",
                "Apabila melanggar batas waktu kontrak, saya bersedia menerima sanksi administrasi denda sistem senilai Rp 1.000.000,-."
              ].map((poin, index) => (
                <div key={index} className="flex items-start gap-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <span className="w-6 h-6 rounded-full bg-[#0A2540] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 shadow-sm">
                    {index + 1}
                  </span>
                  <p>{poin}</p>
                </div>
              )) : [
                "Saya menyatakan artikel ilmiah yang dipublikasikan adalah benar orisinal dan bersumber dari penelitian tugas akhir mandiri saya.",
                "Saya menjamin tautan / link URL berkas publikasi jurnal eksternal bersifat permanen, valid, serta dapat diakses penuh secara publik.",
                "Saya bersedia menerima pembatalan kelulusan administrasi jika ditemukan pemalsuan metadata naskah atau indeks akreditasi jurnal."
              ].map((poin, index) => (
                <div key={index} className="flex items-start gap-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <span className="w-6 h-6 rounded-full bg-teal-800 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 shadow-sm">
                    {index + 1}
                  </span>
                  <p>{poin}</p>
                </div>
              ))}
            </div>
          </div>

          {/* BOX KONFIRMASI PERSETUJUAN */}
          <div 
            onClick={() => setPraForm({ ...praForm, setuju: !praForm.setuju })}
            className={`p-6 border rounded-2xl cursor-pointer transition-all flex items-start gap-4 ${
              praForm.setuju ? 'bg-slate-50 border-gray-400' : 'bg-white border-gray-200/80 hover:border-gray-300'
            }`}
          >
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
              praForm.setuju 
                ? (jalurAktif === 'skripsi' ? 'bg-[#0A2540] border-[#0A2540]' : 'bg-teal-700 border-teal-700') 
                : 'border-gray-300 bg-white'
            }`}>
              {praForm.setuju && <Check size={12} className="text-white" />}
            </div>
            <div className="space-y-1 text-xs sm:text-sm select-none">
              <h4 className="font-black text-gray-800">Konfirmasi Persetujuan</h4>
              <p className="text-gray-500 leading-relaxed">
                Saya telah membaca, memahami, dan menyetujui seluruh ketentuan akademik di atas serta bersedia menanggung segala konsekuensi hukum maupun administratif yang berlaku.
              </p>
            </div>
          </div>
          {errors.setuju && <p className="text-xs text-red-500 font-bold px-2">{errors.setuju}</p>}

          {/* BUTTON BAR ACTION */}
          <div className="flex items-center justify-between pt-2">
            <Link href="/mahasiswa/dashboard">
              <button className="px-6 py-2.5 border border-gray-300 bg-white text-gray-700 font-bold text-xs sm:text-sm rounded-xl hover:bg-slate-50 transition-all cursor-pointer shadow-sm">
                Batal
              </button>
            </Link>
            <button 
              onClick={handlePraSubmit} 
              className={`px-6 py-2.5 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer ${
                jalurAktif === 'skripsi' ? 'bg-[#7C8BA1] hover:bg-[#0A2540]' : 'bg-teal-600 hover:bg-teal-800'
              }`}
            >
              <span>Lanjutkan Ke Step 2</span>
              <ChevronRight size={14} />
            </button>
          </div>

        </div>
      )}

      {/* ── STEP 2: PASCA-SIDANG / INPUT LUARAN BERKAS ── */}
      {step === 'pasca' && (
        <div className="bg-white border border-gray-200/80 p-8 sm:p-10 rounded-2xl shadow-sm space-y-8 animate-fadeIn">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            {jalurAktif === 'skripsi' ? <Book size={22} className="text-[#0A2540]" /> : <Newspaper size={22} className="text-teal-700" />}
            <h2 className="text-base font-black text-[#0A2540] uppercase tracking-wider">
              {jalurAktif === 'skripsi' ? 'Unggah Dokumen Cetak Hardcover' : 'Input Validasi Tautan Jurnal Ilmiah'}
            </h2>
          </div>

          {/* DOKUMEN INPUT UNTUK SKRIPSI */}
          {jalurAktif === 'skripsi' ? (
            <div className="space-y-6">
              <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs sm:text-sm flex gap-3">
                <AlertTriangle className="text-amber-600 flex-shrink-0 mt-0.5" size={18} />
                <span><strong className="font-bold">Perhatian:</strong> Seluruh berkas wajib berformat PDF atau Gambar berkualitas tinggi agar tanda tangan dosen pembimbing terbaca jelas.</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { key: 'pengesahan', label: 'Lembar Pengesahan', desc: 'Scan berkas PDF yang sudah dibubuhi tanda tangan basah/digital dekan & pembimbing.' },
                  { key: 'pernyataan', label: 'Lembar Pernyataan Keaslian', desc: 'Scan surat bebas plagiarisme bermeterai resmi Rp 10.000 dalam bentuk PDF.' },
                  { key: 'hardcover', label: 'Bukti Penyerahan Hardcover', desc: 'Foto tanda terima penyerahan fisik buku bersampul tebal dari perpustakaan.' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="bg-gray-50/60 p-5 rounded-xl border border-gray-200/60 flex flex-col justify-between h-full min-h-[190px]">
                    <div>
                      <label className="block text-xs font-bold text-[#0A2540] uppercase tracking-wide mb-1">{label} <span className="text-red-500">*</span></label>
                      <p className="text-[11px] text-gray-400 mb-4 leading-relaxed">{desc}</p>
                    </div>
                    <UploadBox
                      file={pascaSkripsi[key]}
                      onFile={f => setPascaSkripsi({ ...pascaSkripsi, [key]: f })}
                      error={errors[key]}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* DOKUMEN INPUT UNTUK PUBLIKASI JURNAL */
            <div className="space-y-6">
              <div className="p-6 bg-teal-50/40 border border-teal-100 rounded-2xl">
                <label className="block text-xs font-bold text-teal-800 uppercase tracking-wide mb-1">
                  Tautan / URL Publikasi Ilmiah Valid <span className="text-red-500">*</span>
                </label>
                <p className="text-[11px] text-gray-400 mb-4 leading-relaxed">
                  Tempelkan link artikel ilmiah Anda yang sudah diterbitkan oleh jurnal eksternal terakreditasi resmi (Sinta / Scopus / OJS).
                </p>
                <div className="relative">
                  <Link2 size={18} className="absolute left-4 top-4 text-gray-400" />
                  <input 
                    type="url" 
                    className="w-full pl-12 pr-4 py-3.5 text-sm bg-white border border-gray-300 rounded-xl focus:outline-none" 
                    placeholder="https://journal.paramadina.ac.id/index.php/artikel/view/xxxx"
                    value={pascaJurnal.link} 
                    onChange={e => setPascaJurnal({ ...pascaJurnal, link: e.target.value })} 
                  />
                </div>
                {errors.link && <p className="text-xs text-red-500 mt-2 font-bold">{errors.link}</p>}
                
                <div className="mt-4 flex items-start gap-3 text-xs text-gray-500 bg-white p-4 rounded-xl border border-gray-100">
                  <Info size={16} className="text-teal-600 mt-0.5 flex-shrink-0" />
                  <span>Staf administrasi PTSP akan melakukan pemeriksaan dan pencocokan metadata tautan artikel dengan nama Anda.</span>
                </div>
              </div>

              <div className="bg-gray-50/60 p-5 rounded-xl border border-gray-200/50">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Upload Bukti LOA / Naskah Pendukung (Opsional)</label>
                <p className="text-[11px] text-gray-400 mb-3">Tambahkan file PDF surat korespondensi atau bukti cetak publikasi jika diperlukan.</p>
                <UploadBox file={pascaJurnal.laporan} onFile={f => setPascaJurnal({ ...pascaJurnal, laporan: f })} />
              </div>
            </div>
          )}

          {/* ACTION NAVIGATION BOTTOM */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button onClick={() => setStep('pra')} className="px-6 py-2.5 border border-gray-300 bg-white text-gray-700 font-bold text-xs sm:text-sm rounded-xl hover:bg-slate-50 cursor-pointer shadow-sm">
              Kembali
            </button>
            <button 
              onClick={handlePascaSubmit} 
              className={`px-6 py-2.5 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer ${
                jalurAktif === 'skripsi' ? 'bg-[#0A2540] hover:bg-blue-900' : 'bg-teal-700 hover:bg-teal-900'
              }`}
            >
              <span>Kirim Pengajuan</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: SELESAI ── */}
      {step === 'selesai' && (
        <div className="bg-white border border-gray-200/80 p-8 sm:p-12 rounded-2xl shadow-sm text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle size={36} className="text-green-600" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#0A2540]">Pengajuan Berhasil Diajukan!</h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
              Dokumen pengumpulan Anda telah masuk ke basis data PTSP Universitas Paramadina untuk diperiksa validitasnya.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto pt-4">
            <Link href="/mahasiswa/riwayat" className="flex-1">
              <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-xs sm:text-sm font-bold shadow-sm cursor-pointer">
                Pantau Jejak Riwayat
              </button>
            </Link>
            <Link href="/mahasiswa/dashboard" className="flex-1">
              <button className="w-full py-3 bg-[#0A2540] hover:bg-[#1E3A8A] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md cursor-pointer">
                Kembali ke Dashboard
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// Sub-Komponen Upload Box Berkas
function UploadBox({ file, onFile, error }) {
  const handleChange = (e) => {
    const f = e.target.files?.[0];
    if (f) onFile(f);
  };

  return (
    <div className="w-full">
      <label className="block cursor-pointer">
        <input type="file" className="hidden" onChange={handleChange} accept=".pdf,.jpg,.jpeg,.png" />
        <div className={`rounded-xl p-5 text-center transition-all border-2 border-dashed flex flex-col justify-center items-center min-h-[110px] ${
          error ? 'bg-red-50/30 border-red-400' : file ? 'bg-green-50/30 border-green-400' : 'bg-white border-gray-300 hover:border-[#0A2540]'
        }`}>
          {file ? (
            <div className="flex flex-col items-center justify-center gap-1.5 w-full">
              <CheckCircle size={20} className="text-green-600" />
              <span className="text-xs font-bold text-green-700 truncate max-w-full px-2">{file.name}</span>
            </div>
          ) : (
            <div className="space-y-1">
              <Upload size={20} className="mx-auto text-gray-400" />
              <p className="text-xs font-bold text-gray-600">Cari file</p>
            </div>
          )}
        </div>
      </label>
      {error && <p className="text-xs text-red-500 mt-1.5 text-center font-bold">{error}</p>}
    </div>
  );
}
