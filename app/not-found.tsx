import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BrandLogos } from '@/components/BrandLogos';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7F8FC] px-4 text-center text-[#14181F]">
      <div className="max-w-md space-y-5 rounded-[20px] border border-[#E3E6F0] bg-white p-8">
        <div className="flex justify-center">
          <BrandLogos variant="light" compact />
        </div>
        <div className="space-y-2">
          <p className="font-mono text-xs font-semibold tracking-widest text-[#2438C9] uppercase">
            404 · Halaman Tidak Ditemukan
          </p>
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#14181F]">
            Halaman tidak tersedia
          </h1>
          <p className="text-sm leading-relaxed text-[#4A5160]">
            Tautan yang Anda buka mungkin telah berpindah atau tidak tersedia. Kembali ke
            beranda untuk mengakses katalog dan formulir unggah e-modul.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#2438C9] px-6 text-sm font-semibold text-white transition hover:bg-[#1C2DA6]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    </div>
  );
}
