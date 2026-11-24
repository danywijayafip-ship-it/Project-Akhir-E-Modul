import type { Metadata } from 'next';
import { UploadFormClient } from '@/components/UploadFormClient';

export const metadata: Metadata = {
  title: 'Unggah E-Modul — Project E-Modul TEP 2026',
  description:
    'Formulir pengumpulan tugas e-modul mahasiswa Mata Kuliah Bahan Pembelajaran — S1 Teknologi Pendidikan, Universitas Negeri Malang.',
};

export default function UnggahPage() {
  return <UploadFormClient />;
}
