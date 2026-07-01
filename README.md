# Paramadina Pasca-Sidang System

Website manajemen pasca-sidang untuk Universitas Paramadina, dibangun dengan **Next.js 16** + **TypeScript** + **Tailwind CSS**.

## Fitur Utama

### 🖥️ Dashboard
- **Sisi Mahasiswa**: Countdown timer 30 hari, status pengajuan, info profil & judul
- **Statistik PTSP**: Grafik mingguan aktivitas upload/verifikasi, pie chart distribusi status, breakdown jalur

### 📝 Form Pengajuan (Multi-Step)
- **Step 1 – Pra-Sidang**: Surat pernyataan bermeterai dengan validasi form
- **Step 2 – Pasca-Sidang Kondisional**:
  - Jalur Skripsi: Upload lembar pengesahan, pernyataan, dan hardcover
  - Jalur Jurnal: Input URL publikasi ilmiah + upload laporan opsional
- **Step 3 – Konfirmasi**: Ringkasan pengajuan berhasil

### 🔍 Monitoring & Verifikasi (Staf PTSP)
- Tabel daftar mahasiswa dengan search & filter status
- Panel detail samping: lihat dokumen, klik link jurnal, beri catatan
- Tombol Approve / Reject dengan modal alasan penolakan
- Indikator denda otomatis

### ⏳ Riwayat & Status
- Timeline aktivitas pengajuan dengan accordion detail
- Progress tracker tahapan kelulusan
- Tabel riwayat semua mahasiswa

## Cara Menjalankan

```bash
npm install
npm run dev
# Buka http://localhost:3000
```

## Ganti Role

Klik tombol **"Ganti"** di sidebar untuk berpindah antara tampilan Mahasiswa dan Staf PTSP.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Charts**: Recharts
- **Icons**: Lucide React
