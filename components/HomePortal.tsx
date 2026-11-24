'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  ArrowUp,
  Search,
  Menu,
  X,
  Upload,
  Eye,
  GraduationCap,
  BookOpen,
} from 'lucide-react';
import {
  DOSEN_PENGAMPU,
  OFFERINGS,
  type EModulSubmission,
  type OfferingCode,
} from '@/lib/emodul-types';
import { BrandLogos } from './BrandLogos';
import { ModuleDetailModal } from './ModuleDetailModal';

interface HomePortalProps {
  initialSubmissions: EModulSubmission[];
}

export function HomePortal({ initialSubmissions }: HomePortalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOffering, setSelectedOffering] = useState<'Semua' | OfferingCode>('Semua');
  const [activeSubmission, setActiveSubmission] = useState<EModulSubmission | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredSubmissions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return initialSubmissions.filter((item) => {
      const matchesOffering =
        selectedOffering === 'Semua' || item.offering === selectedOffering;
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.studentName.toLowerCase().includes(q) ||
        item.nim.toLowerCase().includes(q) ||
        item.topic.toLowerCase().includes(q);
      return matchesOffering && matchesQuery;
    });
  }, [initialSubmissions, searchQuery, selectedOffering]);

  return (
    <div id="top" className="min-h-screen w-full overflow-x-clip bg-[#F7F8FC] text-[#14181F]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#14181F] text-white">
        <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-3 px-4 py-3.5 sm:px-8 sm:py-4 lg:px-16">
          <Link href="/" className="min-w-0 shrink focus:outline-none">
            <BrandLogos variant="dark" />
          </Link>

          <nav className="hidden items-center gap-5 text-sm font-medium md:flex lg:gap-7 lg:text-[15px]">
            <a
              href="#tentang"
              className="whitespace-nowrap text-[#C9CEDD] transition hover:text-white"
            >
              Tentang
            </a>
            <a
              href="#katalog"
              className="whitespace-nowrap text-[#C9CEDD] transition hover:text-white"
            >
              Katalog E-Modul
            </a>
            <a
              href="#tim"
              className="whitespace-nowrap text-[#C9CEDD] transition hover:text-white"
            >
              Tim Pengampu
            </a>
            <Link
              href="/unggah"
              className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-[#F2A93B] px-3.5 py-2 text-sm font-bold text-[#14181F] transition hover:bg-[#f5b756] lg:px-4"
            >
              <Upload className="h-4 w-4" aria-hidden="true" />
              <span>Unggah Tugas</span>
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Buka menu navigasi"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 text-white md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#14181F] px-4 py-4 sm:px-8 md:hidden">
            <div className="flex flex-col gap-2 text-sm font-medium">
              <a
                href="#tentang"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-2 py-2 text-[#C9CEDD] transition hover:bg-white/5 hover:text-white"
              >
                Tentang
              </a>
              <a
                href="#katalog"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-2 py-2 text-[#C9CEDD] transition hover:bg-white/5 hover:text-white"
              >
                Katalog E-Modul
              </a>
              <a
                href="#tim"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-2 py-2 text-[#C9CEDD] transition hover:bg-white/5 hover:text-white"
              >
                Tim Pengampu
              </a>
              <Link
                href="/unggah"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-1 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#F2A93B] px-4 font-bold text-[#14181F]"
              >
                <Upload className="h-4 w-4" aria-hidden="true" />
                <span>Unggah Tugas</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-[#14181F] text-white">
        <div className="mx-auto grid max-w-[1360px] grid-cols-1 items-center gap-12 px-4 pt-10 pb-16 sm:px-8 sm:pt-14 sm:pb-20 lg:grid-cols-12 lg:gap-12 lg:px-16 lg:pt-18 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-4 sm:gap-5 lg:col-span-7"
          >
            <span className="text-xs font-semibold tracking-[2px] text-[#F2A93B] sm:text-[13px]">
              ― PORTAL KARYA E-MODUL MAHASISWA
            </span>

            <h1 className="font-[family-name:var(--font-space-grotesk)] text-[44px] font-bold leading-[0.98] tracking-[-1.5px] sm:text-6xl md:text-7xl xl:text-[84px] xl:tracking-[-3px]">
              Project{' '}
              <span className="italic text-[#F2A93B]">E-MODUL</span>
            </h1>

            <span className="text-sm font-semibold tracking-[2.5px] text-[#C9CEDD] sm:text-base sm:tracking-[3px] lg:text-lg">
              MATA KULIAH BAHAN PEMBELAJARAN
            </span>

            <p className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold leading-snug text-white sm:text-2xl lg:text-[26px]">
              Satu Ruang, Banyak Karya, Menginspirasi Belajar.
            </p>

            <p className="max-w-[540px] text-[15px] leading-[1.65] text-[#C9CEDD] sm:text-[17px]">
              Unggah e-modulmu dan jelajahi karya teman-temanmu di Bahan Pembelajaran. Semuanya
              ada dalam satu akses.
            </p>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/unggah"
                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-[12px] bg-[#F2A93B] px-7 text-sm font-bold tracking-[1px] text-[#14181F] transition hover:bg-[#f6b859] sm:min-h-[54px] sm:w-auto sm:px-8 sm:text-[15px]"
              >
                UNGGAH E-MODUL
              </Link>
              <a
                href="#katalog"
                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-[12px] border-2 border-white bg-transparent px-7 text-sm font-bold tracking-[1px] text-white transition hover:bg-white hover:text-[#14181F] sm:min-h-[54px] sm:w-auto sm:px-8 sm:text-[15px]"
              >
                JELAJAHI KATALOG
              </a>
            </div>
          </motion.div>

          {/* Hero Visual Card Stack — proportioned for mobile, tablet, and desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="relative mx-auto h-[300px] w-full max-w-[320px] sm:h-[380px] sm:max-w-[430px] lg:col-span-5 lg:h-[420px] lg:max-w-[440px]"
          >
            {/* Left Tilted Cobalt Card */}
            <div className="absolute top-8 left-2 flex h-[225px] w-[165px] -rotate-6 flex-col justify-between rounded-[18px] bg-[#2438C9] p-4 shadow-xl sm:top-10 sm:left-0 sm:h-[295px] sm:w-[220px] sm:p-5 lg:h-[320px] lg:w-[236px]">
              <span className="self-start rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white sm:px-3 sm:text-[11px]">
                S1 TEP UM
              </span>
              <div className="flex flex-col gap-2">
                <span className="h-2 w-[92px] rounded-full bg-white sm:h-2.5 sm:w-[120px]" />
                <span className="h-2 w-[58px] rounded-full bg-white/60 sm:h-2.5 sm:w-[80px]" />
              </div>
            </div>

            {/* Right Tilted Amber Card */}
            <div className="absolute top-0 right-2 flex h-[225px] w-[165px] rotate-[5deg] flex-col justify-between rounded-[18px] bg-[#F2A93B] p-4 shadow-xl sm:right-0 sm:h-[295px] sm:w-[220px] sm:p-5 lg:h-[320px] lg:w-[236px]">
              <span className="self-start rounded-full bg-[#14181F]/15 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-[#14181F] sm:px-3 sm:text-[11px]">
                E-MODUL 2026
              </span>
              <div className="flex flex-col gap-2">
                <span className="h-2 w-[96px] rounded-full bg-[#14181F] sm:h-2.5 sm:w-[130px]" />
                <span className="h-2 w-[52px] rounded-full bg-[#14181F]/50 sm:h-2.5 sm:w-[70px]" />
              </div>
            </div>

            {/* Front Floating Summary Card */}
            <div className="absolute bottom-0 left-1/2 flex w-[250px] -translate-x-1/2 flex-col gap-2 rounded-[18px] bg-white p-4 text-[#14181F] shadow-2xl sm:w-[270px] sm:p-5">
              <span className="font-[family-name:var(--font-space-grotesk)] text-[15px] font-bold sm:text-base">
                E-Modul Proyek Akhir
              </span>
              <span className="text-xs text-[#4A5160] sm:text-[13px]">
                Offering A2A – A2E ·{' '}
                <span className="font-mono font-semibold text-[#14181F] tabular-nums">
                  {initialSubmissions.length} karya aktif
                </span>
              </span>
              <div className="mt-1 flex items-center justify-between gap-2">
                <span className="rounded-full bg-[#F7F8FC] px-2.5 py-1 text-[11px] font-semibold text-[#2438C9] ring-1 ring-[#E3E6F0] sm:px-3 sm:text-xs">
                  Bahan Pembelajaran
                </span>
                <a
                  href="#katalog"
                  className="text-xs font-semibold text-[#2438C9] hover:underline"
                >
                  Lihat Katalog →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3-Column Stats Strip */}
      <section className="border-b border-[#E3E6F0] bg-white">
        <div className="mx-auto grid max-w-[1360px] grid-cols-1 divide-y divide-[#E3E6F0] md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="flex flex-col gap-1 px-4 py-6 sm:px-8 md:px-6 md:py-7 lg:px-12 lg:py-8 xl:px-16">
            <span className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold leading-none text-[#2438C9] tabular-nums lg:text-[40px]">
              +{169 + initialSubmissions.length}
            </span>
            <span className="text-sm font-medium text-[#4A5160]">E-Modul Terkumpul</span>
          </div>
          <div className="flex flex-col gap-1 px-4 py-6 sm:px-8 md:px-6 md:py-7 lg:px-12 lg:py-8 xl:px-16">
            <span className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold leading-none text-[#2438C9] lg:text-[40px]">
              Bahan Ajar
            </span>
            <span className="text-sm font-medium text-[#4A5160]">Digital dan Interaktif</span>
          </div>
          <div className="flex flex-col gap-1 px-4 py-6 sm:px-8 md:px-6 md:py-7 lg:px-12 lg:py-8 xl:px-16">
            <span className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold leading-none text-[#2438C9] lg:text-[40px]">
              1 Akses
            </span>
            <span className="text-sm font-medium text-[#4A5160]">
              Unggah dan Katalog Terintegrasi
            </span>
          </div>
        </div>
      </section>

      {/* Tentang Program */}
      <section
        id="tentang"
        className="mx-auto max-w-[1360px] px-4 py-14 sm:px-8 sm:py-16 lg:px-16 lg:py-[88px]"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10 lg:gap-16">
          <div className="flex flex-col items-start gap-3 md:col-span-5">
            <span className="text-xs font-semibold tracking-[2px] text-[#2438C9] sm:text-[13px]">
              ― TENTANG PROGRAM
            </span>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-[28px] font-bold leading-tight tracking-[-0.5px] text-[#14181F] sm:text-3xl lg:text-[36px]">
              Project e-modul tumbuh dari draf menjadi karya.
            </h2>
          </div>

          <div className="flex flex-col gap-4 text-[15px] leading-[1.7] text-[#4A5160] sm:text-[17px] md:col-span-7">
            <p>
              Project E-Modul adalah luaran mata kuliah Bahan Pembelajaran yang membantu
              mahasiswa mengumpulkan project e-modul secara rapi dalam satu ruang terpadu.
            </p>
            <p>
              Mahasiswa mengunggah berkas atau tautan e-modul sesuai offering masing-masing agar
              seluruh karya dapat diakses, dipelajari bersama, dan menjadi inspirasi antar
              mahasiswa di katalog.
            </p>
          </div>
        </div>
      </section>

      {/* Katalog E-Modul */}
      <section
        id="katalog"
        className="border-y border-[#E3E6F0] bg-white py-14 sm:py-16 lg:py-[72px]"
      >
        <div className="mx-auto flex max-w-[1360px] flex-col gap-6 px-4 sm:gap-7 sm:px-8 lg:px-16">
          <div className="flex flex-col gap-2.5 sm:gap-3">
            <span className="text-xs font-semibold tracking-[2px] text-[#2438C9] sm:text-[13px]">
              ― KATALOG
            </span>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-[28px] font-bold tracking-[-0.5px] text-[#14181F] sm:text-3xl lg:text-[36px]">
              Katalog E-Modul
            </h2>
            <span className="text-[15px] text-[#4A5160] sm:text-base">
              Cari berdasarkan judul, nama mahasiswa, atau pilih offering. E-modul terbuka di
              tab baru.
            </span>
          </div>

          {/* Search & Offering Filter Bar — separated cleanly for mobile, tablet & desktop */}
          <div className="flex flex-col gap-3.5 xl:flex-row xl:items-center">
            <div className="relative w-full xl:max-w-[380px] xl:shrink-0">
              <label htmlFor="cari" className="sr-only">
                Cari e-modul
              </label>
              <Search
                className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#6A7184]"
                aria-hidden="true"
              />
              <input
                id="cari"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari judul e-modul, nama, atau NIM…"
                className="min-h-[48px] w-full rounded-[12px] border border-[#B8BED0] bg-white pr-4 pl-11 text-[15px] text-[#14181F] placeholder:text-[#6A7184] focus:border-[#2438C9] focus:outline-none"
              />
            </div>

            <div className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
              {(['Semua', ...OFFERINGS] as const).map((offering) => {
                const isActive = selectedOffering === offering;
                return (
                  <button
                    key={offering}
                    type="button"
                    onClick={() => setSelectedOffering(offering)}
                    className={`min-h-[40px] shrink-0 whitespace-nowrap rounded-full px-4 text-xs font-semibold transition sm:min-h-[44px] sm:px-5 sm:text-sm ${
                      isActive
                        ? 'bg-[#14181F] text-white'
                        : 'border border-[#B8BED0] bg-white text-[#14181F] hover:border-[#14181F]'
                    }`}
                  >
                    {offering}
                  </button>
                );
              })}
            </div>
          </div>

          <span className="font-mono text-sm font-medium text-[#6A7184] tabular-nums">
            {filteredSubmissions.length} materi tersedia
          </span>

          {/* Cards Grid */}
          {filteredSubmissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#B8BED0] bg-[#F7F8FC] px-6 py-12 text-center sm:py-14">
              <BookOpen className="h-8 w-8 text-[#6A7184]" aria-hidden="true" />
              <p className="mt-3 font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-[#14181F]">
                Belum ada e-modul yang sesuai filter
              </p>
              <p className="mt-1 max-w-md text-sm text-[#4A5160]">
                Ubah kata kunci pencarian atau pilih offering lain, atau unggah karya baru pada
                kategori ini.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedOffering('Semua');
                  }}
                  className="min-h-[42px] rounded-xl border border-[#B8BED0] bg-white px-4 text-sm font-semibold text-[#14181F]"
                >
                  Reset Filter
                </button>
                <Link
                  href="/unggah"
                  className="inline-flex min-h-[42px] items-center rounded-xl bg-[#2438C9] px-5 text-sm font-semibold text-white"
                >
                  Unggah E-Modul
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredSubmissions.map((item, idx) => {
                const indexLabel = String(idx + 1).padStart(2, '0');
                const totalLabel = String(filteredSubmissions.length).padStart(2, '0');
                const openHref = item.linkUrl
                  ? item.linkUrl
                  : item.fileMeta
                  ? `/api/files/${encodeURIComponent(item.fileMeta.fileId)}`
                  : null;

                return (
                  <article
                    key={item.id}
                    className="flex flex-col overflow-hidden rounded-[16px] border border-[#E3E6F0] bg-white transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {/* Colored Top Card Banner */}
                    <div
                      className="flex h-[124px] flex-col justify-between p-4 sm:h-[132px]"
                      style={{ backgroundColor: item.accentColor }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#14181F]">
                          {item.offering}
                        </span>
                        <span className="truncate rounded-full bg-black/20 px-2.5 py-1 text-[11px] font-medium text-white">
                          {item.topic}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-11 rounded bg-white/85" />
                        <span className="h-2 w-6 rounded bg-white/55" />
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="flex flex-1 flex-col gap-2.5 p-5">
                      <span className="font-mono text-xs font-semibold text-[#6A7184] tabular-nums">
                        {indexLabel} / {totalLabel} · v{item.version}
                      </span>

                      <h3 className="font-[family-name:var(--font-space-grotesk)] text-[18px] font-bold leading-snug text-[#14181F] sm:text-[19px]">
                        {item.title}
                      </h3>

                      <p className="line-clamp-2 text-sm leading-[1.55] text-[#4A5160]">
                        {item.description}
                      </p>

                      <p className="mt-auto pt-1 text-xs font-medium text-[#6A7184]">
                        Oleh <span className="text-[#14181F]">{item.studentName}</span> ·{' '}
                        <span className="font-mono tabular-nums">{item.nim}</span>
                      </p>

                      <div className="mt-2 flex items-center justify-between gap-3 border-t border-[#E3E6F0] pt-3">
                        <button
                          type="button"
                          onClick={() => setActiveSubmission(item)}
                          className="inline-flex min-h-[36px] items-center gap-1.5 text-xs font-semibold text-[#4A5160] transition hover:text-[#14181F]"
                        >
                          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Detail Karya</span>
                        </button>

                        {openHref ? (
                          <a
                            href={openHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[36px] items-center gap-1 text-sm font-semibold text-[#2438C9] hover:underline"
                          >
                            <span>BUKA E-MODUL</span>
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setActiveSubmission(item)}
                            className="inline-flex min-h-[36px] items-center gap-1 text-sm font-semibold text-[#2438C9] hover:underline"
                          >
                            <span>LIHAT DETAIL</span>
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Tim Pengampu */}
      <section
        id="tim"
        className="mx-auto max-w-[1360px] px-4 py-14 sm:px-8 sm:py-16 lg:px-16 lg:py-[88px]"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10 lg:gap-16">
          <div className="flex flex-col gap-3 md:col-span-5">
            <span className="text-xs font-semibold tracking-[2px] text-[#2438C9] sm:text-[13px]">
              ― TIM PENGAMPU
            </span>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-[28px] font-bold leading-tight tracking-[-0.5px] text-[#14181F] sm:text-3xl lg:text-[36px]">
              Orang di balik ruang ini.
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-[#4A5160]">
              Dosen pengampu Mata Kuliah Bahan Pembelajaran pada Program Studi S1 Teknologi
              Pendidikan.
            </p>
          </div>

          <div className="flex flex-col gap-3.5 md:col-span-7">
            <div className="flex flex-col gap-2 rounded-[16px] bg-[#14181F] p-5 text-white sm:p-6">
              <span className="text-xs font-semibold tracking-[2px] text-[#F2A93B]">
                DOSEN PENGAMPU
              </span>
              <div className="space-y-1 font-[family-name:var(--font-space-grotesk)] text-lg font-bold sm:text-xl lg:text-[22px]">
                {DOSEN_PENGAMPU.map((name) => (
                  <div key={name}>- {name}</div>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3.5 rounded-[16px] border border-[#E3E6F0] bg-white px-5 py-4 sm:items-center sm:px-6 sm:py-5">
              <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-[#2438C9] sm:mt-0" aria-hidden="true" />
              <div>
                <p className="text-[15px] font-semibold text-[#14181F] sm:text-base">
                  Program Studi S1 Teknologi Pendidikan
                </p>
                <p className="text-sm text-[#4A5160]">
                  Fakultas Ilmu Pendidikan · Universitas Negeri Malang
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 rounded-[16px] border border-[#E3E6F0] bg-white px-5 py-4 sm:items-center sm:px-6 sm:py-5">
              <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-[#2438C9] sm:mt-0" aria-hidden="true" />
              <div>
                <p className="text-[15px] font-semibold text-[#14181F] sm:text-base">
                  Mata Kuliah Bahan Pembelajaran (Offering A2A – A2E)
                </p>
                <p className="text-sm text-[#4A5160]">
                  Portal Pengumpulan Tugas dan Katalog Karya Digital Mahasiswa
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Cobalt CTA Banner */}
      <section
        id="unggah"
        className="mx-auto max-w-[1360px] px-4 pb-12 sm:px-8 sm:pb-16 lg:px-16 lg:pb-[72px]"
      >
        <div className="flex flex-col items-start justify-between gap-6 rounded-[20px] bg-[#2438C9] px-6 py-10 text-white sm:rounded-[24px] sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:gap-8 lg:p-14">
          <div className="flex flex-col gap-2.5 sm:gap-3">
            <span className="text-xs font-semibold tracking-[2px] text-[#F2D9A6] sm:text-[13px]">
              ― BERSAMA UNTUK BELAJAR
            </span>
            <h2 className="max-w-2xl font-[family-name:var(--font-space-grotesk)] text-2xl font-bold leading-tight tracking-[-0.5px] sm:text-3xl lg:text-[34px]">
              Mari Berkarya dan Membagikan Bahan Ajar yang Menginspirasi!
            </h2>
          </div>

          <Link
            href="/unggah"
            className="inline-flex min-h-[52px] w-full shrink-0 items-center justify-center rounded-[12px] bg-[#F2A93B] px-7 text-sm font-bold tracking-[1px] text-[#14181F] transition hover:bg-[#f6b859] sm:min-h-[54px] sm:w-auto sm:px-8 sm:text-[15px]"
          >
            UNGGAH E-MODUL SEKARANG
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#14181F] text-[#C9CEDD]">
        <div className="mx-auto flex max-w-[1360px] flex-col items-start justify-between gap-4 px-4 py-7 text-sm sm:flex-row sm:items-center sm:px-8 lg:px-16">
          <div className="flex items-start gap-3 sm:items-center">
            <BrandLogos variant="dark" compact />
            <span className="text-xs leading-relaxed sm:text-sm">
              © 2026 Project E-Modul TEP · Mata Kuliah Bahan Pembelajaran · S1 Teknologi
              Pendidikan, Universitas Negeri Malang
            </span>
          </div>
          <a
            href="#top"
            className="inline-flex shrink-0 items-center gap-1.5 font-medium text-white transition hover:text-[#F2A93B]"
          >
            <span>Kembali ke atas</span>
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </footer>

      <ModuleDetailModal
        submission={activeSubmission}
        onClose={() => setActiveSubmission(null)}
      />
    </div>
  );
}
