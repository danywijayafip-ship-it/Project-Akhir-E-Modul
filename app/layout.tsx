import type { Metadata } from 'next';
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space-grotesk',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plus-jakarta',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'Project E-Modul TEP 2026 — Mata Kuliah Bahan Pembelajaran',
  description:
    'Portal pengumpulan tugas dan katalog karya e-modul mahasiswa Mata Kuliah Bahan Pembelajaran — S1 Teknologi Pendidikan, Universitas Negeri Malang.',
  openGraph: {
    title: 'Project E-Modul TEP 2026 — Mata Kuliah Bahan Pembelajaran',
    description:
      'Satu Ruang, Banyak Karya, Menginspirasi Belajar. Portal pengumpulan tugas dan katalog e-modul S1 Teknologi Pendidikan UM.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Project E-Modul TEP 2026 — Mata Kuliah Bahan Pembelajaran',
    description:
      'Portal pengumpulan tugas dan katalog karya e-modul mahasiswa S1 Teknologi Pendidikan Universitas Negeri Malang.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body suppressHydrationWarning className="min-h-screen bg-[#F7F8FC] text-[#14181F] antialiased">
        {children}
      </body>
    </html>
  );
}
