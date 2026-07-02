// Data Mockup Mahasiswa SIPAS (Murni JavaScript)
export const mockMahasiswa = [
  {
    id: '1',
    nim: '123103149',
    nama: 'Prila Fathur Rizqi',
    prodi: 'Fakultas Ilmu Rekayasa (FIR)',
    jalur: 'skripsi', // Nilai: 'skripsi' atau 'jurnal'
    tanggalSidang: '2026-06-30',
    status: 'belum_upload', // Nilai: 'belum_upload', 'menunggu_verifikasi', 'disetujui', 'ditolak', 'terkena_denda'
    nilaiSidang: 'A',
    dosenPembimbing: 'Dr. Siti Rahayu, M.Si.',
    dosenPenguji: 'Prof. Budi Santoso, Ph.D.',
    judul: 'Digitalisasi Layanan Administrasi Pasca-Sidang Universitas Paramadina',
    linkPublikasi: '',
    catatanRevisi: '',
    dokumenUploaded: []
  },
  {
    id: '2',
    nim: '123103150',
    nama: 'Ahmad Rizki Pratama',
    prodi: 'Fakultas Ilmu Rekayasa (FIR)',
    jalur: 'jurnal',
    tanggalSidang: '2026-06-15',
    status: 'disetujui',
    nilaiSidang: 'A',
    dosenPembimbing: 'Dr. Ahmad Subarjo, M.T.',
    dosenPenguji: 'Hendra Wijaya, Ph.D.',
    judul: 'Analisis Performa Asynchronous Query Terhadap Database MongoDB Pada Node.js',
    linkPublikasi: 'https://journal.paramadina.ac.id/index.php/fir/article/view/12345',
    catatanRevisi: 'Publikasi valid dan terverifikasi',
    dokumenUploaded: ['laporan_penelitian.pdf']
  }
];

// Helper utilitas untuk memformat tanggal lokal Indonesia
export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Helper untuk mendapatkan label status berbahasa Indonesia
export function getStatusLabel(status) {
  const map = {
    belum_upload: 'Belum Upload',
    menunggu_verifikasi: 'Menunggu Verifikasi',
    disetujui: 'Disetujui',
    ditolak: 'Ditolak',
    terkena_denda: 'Terkena Denda',
  };
  return map[status] || status;
}

// Helper untuk mendapatkan kelas warna Tailwind CSS berdasarkan status berkas
export function getStatusColor(status) {
  const map = {
    belum_upload: 'bg-slate-500/20 text-slate-400 border border-slate-500/30',
    menunggu_verifikasi: 'bg-amber-500/20 text-amber-500 border border-amber-500/30',
    disetujui: 'bg-emerald-500/20 text-emerald-600 border border-emerald-500/30',
    ditolak: 'bg-rose-500/20 text-rose-500 border border-rose-500/30',
    terkena_denda: 'bg-red-600/20 text-red-600 border border-red-600/30',
  };
  return map[status] || 'bg-gray-500/20 text-gray-500';
}

// Tanggal agenda mutlak pelaksanaan Yudisium Kampus
export const yudisiumDate = '2026-08-15';
