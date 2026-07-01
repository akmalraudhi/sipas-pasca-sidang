export type JalurType = 'skripsi' | 'jurnal';
export type StatusType = 'belum_upload' | 'menunggu_verifikasi' | 'disetujui' | 'ditolak' | 'terkena_denda';
export type UserRole = 'mahasiswa' | 'staf';

export interface Mahasiswa {
  id: string;
  nim: string;
  nama: string;
  prodi: string;
  jalur: JalurType;
  tanggalSidang: string;
  status: StatusType;
  nilaiSidang: string;
  dosenPembimbing: string;
  dosenPenguji: string;
  judul: string;
  linkPublikasi?: string;
  catatanRevisi?: string;
  dokumenUploaded?: string[];
}

export const mockMahasiswa: Mahasiswa[] = [
  {
    id: '1',
    nim: '202010370311001',
    nama: 'Ahmad Rizki Pratama',
    prodi: 'Ilmu Komunikasi',
    jalur: 'skripsi',
    tanggalSidang: '2025-06-01',
    status: 'menunggu_verifikasi',
    nilaiSidang: 'A',
    dosenPembimbing: 'Dr. Siti Rahayu, M.Si.',
    dosenPenguji: 'Prof. Budi Santoso, Ph.D.',
    judul: 'Pengaruh Media Sosial Terhadap Perilaku Konsumen Gen Z',
    dokumenUploaded: ['lembar_pengesahan.pdf', 'hardcover_bukti.jpg'],
    catatanRevisi: 'Perbaiki abstrak dan daftar pustaka format APA',
  },
  {
    id: '2',
    nim: '202010370311042',
    nama: 'Bella Septiana Putri',
    prodi: 'Ilmu Komunikasi',
    jalur: 'jurnal',
    tanggalSidang: '2025-06-03',
    status: 'disetujui',
    nilaiSidang: 'A',
    dosenPembimbing: 'Dr. Anwar Ibrahim, M.Kom.',
    dosenPenguji: 'Dr. Maya Dewi, M.Si.',
    judul: 'Digital Literacy Among Urban Youth: A Case Study',
    linkPublikasi: 'https://journal.paramadina.ac.id/artikel/12345',
    dokumenUploaded: ['laporan_penelitian.pdf'],
  },
  {
    id: '3',
    nim: '202010370311078',
    nama: 'Chandra Wijaya',
    prodi: 'Teknik Informatika',
    jalur: 'skripsi',
    tanggalSidang: '2025-05-20',
    status: 'terkena_denda',
    nilaiSidang: 'B+',
    dosenPembimbing: 'Dr. Eko Prasetyo, M.T.',
    dosenPenguji: 'Prof. Lina Kusuma, Ph.D.',
    judul: 'Implementasi Machine Learning untuk Deteksi Anomali Jaringan',
    catatanRevisi: 'Revisi bab 4 dan 5, lengkapi lampiran kode program',
  },
  {
    id: '4',
    nim: '202010370311103',
    nama: 'Diana Maharani',
    prodi: 'Psikologi',
    jalur: 'jurnal',
    tanggalSidang: '2025-06-10',
    status: 'belum_upload',
    nilaiSidang: 'A-',
    dosenPembimbing: 'Dr. Fitri Handayani, M.Psi.',
    dosenPenguji: 'Dr. Gunawan Saputra, M.Psi.',
    judul: 'Mindfulness-Based Stress Reduction pada Mahasiswa Tingkat Akhir',
  },
  {
    id: '5',
    nim: '202010370311215',
    nama: 'Eko Mulyanto',
    prodi: 'Manajemen',
    jalur: 'skripsi',
    tanggalSidang: '2025-06-05',
    status: 'ditolak',
    nilaiSidang: 'B',
    dosenPembimbing: 'Dr. Hendra Susanto, M.M.',
    dosenPenguji: 'Dr. Indah Pratiwi, M.M.',
    judul: 'Analisis Strategi Pemasaran Digital UMKM di Era Post-Pandemi',
    dokumenUploaded: ['hardcover_bukti.jpg'],
    catatanRevisi: 'File hardcover tidak terbaca, harap upload ulang dengan kualitas lebih baik',
  },
];

export const currentUser = {
  role: 'mahasiswa' as UserRole,
  mahasiswaId: '1',
};

export function getDaysRemaining(tanggalSidang: string): number {
  const sidang = new Date(tanggalSidang);
  const deadline = new Date(sidang);
  deadline.setDate(deadline.getDate() + 30);
  const today = new Date();
  const diff = deadline.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getDeadlineDate(tanggalSidang: string): string {
  const sidang = new Date(tanggalSidang);
  const deadline = new Date(sidang);
  deadline.setDate(deadline.getDate() + 30);
  return deadline.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function getStatusLabel(status: StatusType): string {
  const map: Record<StatusType, string> = {
    belum_upload: 'Belum Upload',
    menunggu_verifikasi: 'Menunggu Verifikasi',
    disetujui: 'Disetujui',
    ditolak: 'Ditolak',
    terkena_denda: 'Terkena Denda',
  };
  return map[status];
}

export function getStatusColor(status: StatusType): string {
  const map: Record<StatusType, string> = {
    belum_upload: 'bg-slate-500/20 text-slate-300 border border-slate-500/30',
    menunggu_verifikasi: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    disetujui: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    ditolak: 'bg-rose-500/20 text-rose-300 border border-rose-500/30',
    terkena_denda: 'bg-red-600/20 text-red-300 border border-red-600/30',
  };
  return map[status];
}

export const yudisiumDate = '2025-07-15';

export const statsData = {
  totalMahasiswa: 248,
  sudahDiverifikasi: 89,
  menungguVerifikasi: 76,
  belumUpload: 54,
  terkenaD: 29,
  jalurSkripsi: 158,
  jalurJurnal: 90,
};

export const weeklyData = [
  { hari: 'Sen', upload: 12, verifikasi: 8 },
  { hari: 'Sel', upload: 19, verifikasi: 14 },
  { hari: 'Rab', upload: 15, verifikasi: 11 },
  { hari: 'Kam', upload: 22, verifikasi: 18 },
  { hari: 'Jum', upload: 28, verifikasi: 20 },
  { hari: 'Sab', upload: 9, verifikasi: 6 },
  { hari: 'Min', upload: 5, verifikasi: 3 },
];
