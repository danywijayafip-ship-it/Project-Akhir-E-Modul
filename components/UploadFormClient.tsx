'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Upload,
  FileCheck2,
  X,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import {
  OFFERINGS,
  SUBMISSION_DEADLINE_ISO,
  SUBMISSION_DEADLINE_LABEL,
  TOPIC_OPTIONS,
  formatBytes,
  type EModulSubmission,
  type OfferingCode,
} from '@/lib/emodul-types';
import { BrandLogos } from './BrandLogos';

function getCountdownLabel(targetIso: string): string {
  const diff = new Date(targetIso).getTime() - Date.now();
  if (diff <= 0) return 'Batas waktu pengumpulan telah berakhir';
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  return `Tersisa ${days} hari ${hours} jam lagi`;
}

export function UploadFormClient() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [studentName, setStudentName] = useState('');
  const [nim, setNim] = useState('');
  const [offering, setOffering] = useState<OfferingCode>('Offering A2A');
  const [topic, setTopic] = useState(TOPIC_OPTIONS[0]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [orisinal, setOrisinal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedResult, setSubmittedResult] = useState<{
    submission: EModulSubmission;
    replacedPrevious: boolean;
  } | null>(null);

  const [countdown, setCountdown] = useState<string>('');

  useEffect(() => {
    const initial = setTimeout(() => {
      setCountdown(getCountdownLabel(SUBMISSION_DEADLINE_ISO));
    }, 0);
    const timer = setInterval(() => {
      setCountdown(getCountdownLabel(SUBMISSION_DEADLINE_ISO));
    }, 60_000);
    return () => {
      clearTimeout(initial);
      clearInterval(timer);
    };
  }, []);

  function handleFilePicked(file: File | null) {
    if (!file) return;
    const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
    if (!['pdf', 'html', 'htm', 'zip'].includes(ext)) {
      setErrorMsg('Format berkas harus PDF, HTML5 (.html/.htm), atau ZIP.');
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      setErrorMsg('Ukuran berkas melebihi batas maksimal 25 MB.');
      return;
    }
    setErrorMsg(null);
    setSelectedFile(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    if (!studentName.trim() || !nim.trim() || !title.trim()) {
      setErrorMsg('Lengkapi nama lengkap, NIM, dan judul e-modul terlebih dahulu.');
      return;
    }
    if (!selectedFile && !linkUrl.trim()) {
      setErrorMsg('Unggah berkas e-modul atau masukkan tautan Canva/Heyzine/Google Drive.');
      return;
    }
    if (!orisinal) {
      setErrorMsg('Centang pernyataan bahwa e-modul ini karya sendiri.');
      return;
    }

    const rawLink = linkUrl.trim();
    const normalizedLink =
      rawLink && !/^https?:\/\//i.test(rawLink) ? `https://${rawLink}` : rawLink;

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('studentName', studentName.trim());
      formData.append('nim', nim.trim());
      formData.append('offering', offering);
      formData.append('topic', topic);
      formData.append('title', title.trim());
      formData.append('description', description.trim());
      formData.append('linkUrl', normalizedLink);
      formData.append('orisinal', String(orisinal));
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      const res = await fetch('/api/submissions', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Gagal mengirim tugas e-modul.');
      } else {
        setSubmittedResult(data);
      }
    } catch {
      setErrorMsg('Terjadi gangguan koneksi saat mengunggah tugas.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-[#F7F8FC] text-[#14181F]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[#E3E6F0] bg-white">
        <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-3 px-4 py-3.5 sm:px-8 sm:py-4 lg:px-16">
          <Link href="/" className="min-w-0 shrink">
            <BrandLogos variant="light" />
          </Link>

          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <span className="hidden text-[15px] font-medium text-[#4A5160] md:inline">
              Bahan Pembelajaran
            </span>
            <Link
              href="/"
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-[#E3E6F0] bg-[#F7F8FC] px-3 py-1.5 text-xs font-semibold text-[#14181F] transition hover:border-[#2438C9] hover:text-[#2438C9] sm:min-h-[40px] sm:px-3.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Beranda</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content — 1 col mobile, 2-col sidebar cards on tablet, 8/4 split on desktop */}
      <main className="mx-auto grid max-w-[1360px] grid-cols-1 items-start gap-6 px-4 py-6 sm:gap-8 sm:px-8 sm:py-10 lg:grid-cols-12 lg:gap-10 lg:px-16 lg:py-12">
        {/* Left Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-[18px] border border-[#E3E6F0] bg-white p-5 sm:rounded-[20px] sm:p-8 lg:col-span-8 lg:p-9"
        >
          {submittedResult ? (
            <div className="space-y-6 py-2 sm:py-4">
              <div className="flex items-start gap-3.5 rounded-2xl bg-[#DDF3E4] p-4 text-[#14532D] sm:gap-4 sm:p-5">
                <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 sm:h-7 sm:w-7" aria-hidden="true" />
                <div>
                  <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold sm:text-2xl">
                    {submittedResult.replacedPrevious
                      ? 'Pembaruan E-Modul Berhasil Dikirim'
                      : 'E-Modul Berhasil Dikumpulkan'}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed">
                    {submittedResult.replacedPrevious
                      ? `Unggahan baru untuk NIM ${submittedResult.submission.nim} telah menggantikan versi sebelumnya (sekarang Versi ${submittedResult.submission.version}).`
                      : `Karya "${submittedResult.submission.title}" telah tersimpan dan tampil di Katalog E-Modul.`}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 rounded-2xl border border-[#E3E6F0] bg-[#F7F8FC] p-4 sm:p-5">
                <span className="font-mono text-xs font-semibold text-[#6A7184] tabular-nums">
                  ID: {submittedResult.submission.id} · Versi {submittedResult.submission.version}
                </span>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-[#14181F] sm:text-xl">
                  {submittedResult.submission.title}
                </h3>
                <p className="text-sm text-[#4A5160]">
                  {submittedResult.submission.studentName} ({submittedResult.submission.nim}) ·{' '}
                  {submittedResult.submission.offering} · {submittedResult.submission.topic}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/#katalog"
                  className="inline-flex min-h-[48px] w-full items-center justify-center rounded-[12px] bg-[#2438C9] px-6 text-sm font-semibold text-white transition hover:bg-[#1C2DA6] sm:w-auto"
                >
                  Lihat di Katalog Beranda
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedResult(null);
                    setSelectedFile(null);
                  }}
                  className="inline-flex min-h-[48px] w-full items-center justify-center rounded-[12px] border border-[#B8BED0] bg-white px-6 text-sm font-semibold text-[#14181F] transition hover:border-[#14181F] sm:w-auto"
                >
                  Kirim atau Perbarui Tugas Lain
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <h1 className="font-[family-name:var(--font-space-grotesk)] text-[26px] font-bold text-[#14181F] sm:text-3xl lg:text-[34px]">
                  Unggah E-Modul
                </h1>
                <p className="mt-1 text-sm text-[#4A5160] sm:mt-1.5 sm:text-[15px]">
                  Isi data di bawah, lalu kirim sebelum batas waktu.
                </p>
              </div>

              {errorMsg && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-xl bg-[#FDE8E8] px-4 py-3 text-sm font-medium text-[#9B1C1C]"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Nama & NIM */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="nama" className="text-sm font-semibold text-[#14181F]">
                    Nama lengkap
                  </label>
                  <input
                    id="nama"
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Nama sesuai SIAKAD"
                    className="min-h-[48px] w-full rounded-[10px] border border-[#B8BED0] bg-white px-3.5 text-[15px] text-[#14181F] placeholder:text-[#6A7184] focus:border-[#2438C9] focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="nim" className="text-sm font-semibold text-[#14181F]">
                    NIM
                  </label>
                  <input
                    id="nim"
                    type="text"
                    required
                    value={nim}
                    onChange={(e) => setNim(e.target.value)}
                    placeholder="NIM (contoh: 240121600123)"
                    className="min-h-[48px] w-full rounded-[10px] border border-[#B8BED0] bg-white px-3.5 font-mono text-[15px] text-[#14181F] placeholder:font-sans placeholder:text-[#6A7184] focus:border-[#2438C9] focus:outline-none tabular-nums"
                  />
                </div>
              </div>

              {/* Offering & Topik */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="offering" className="text-sm font-semibold text-[#14181F]">
                    Offering
                  </label>
                  <select
                    id="offering"
                    value={offering}
                    onChange={(e) => setOffering(e.target.value as OfferingCode)}
                    className="min-h-[48px] w-full rounded-[10px] border border-[#B8BED0] bg-white px-3.5 text-[15px] text-[#14181F] focus:border-[#2438C9] focus:outline-none"
                  >
                    {OFFERINGS.map((off) => (
                      <option key={off} value={off}>
                        {off}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="topik" className="text-sm font-semibold text-[#14181F]">
                    Topik / Bidang Materi
                  </label>
                  <select
                    id="topik"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="min-h-[48px] w-full rounded-[10px] border border-[#B8BED0] bg-white px-3.5 text-[15px] text-[#14181F] focus:border-[#2438C9] focus:outline-none"
                  >
                    {TOPIC_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Judul E-Modul */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="judul" className="text-sm font-semibold text-[#14181F]">
                  Judul e-modul
                </label>
                <input
                  id="judul"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Judul e-modul yang kamu kembangkan"
                  className="min-h-[48px] w-full rounded-[10px] border border-[#B8BED0] bg-white px-3.5 text-[15px] text-[#14181F] placeholder:text-[#6A7184] focus:border-[#2438C9] focus:outline-none"
                />
              </div>

              {/* Deskripsi Singkat */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="deskripsi" className="text-sm font-semibold text-[#14181F]">
                  Deskripsi singkat{' '}
                  <span className="font-normal text-[#6A7184]">(opsional)</span>
                </label>
                <textarea
                  id="deskripsi"
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Satu kalimat tentang isi, target pembelajar, dan tujuan e-modul."
                  className="w-full rounded-[10px] border border-[#B8BED0] bg-white p-3.5 text-[15px] text-[#14181F] placeholder:text-[#6A7184] focus:border-[#2438C9] focus:outline-none"
                />
              </div>

              {/* Berkas E-Modul Drag-and-Drop */}
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-[#14181F]">Berkas e-modul</span>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const file = e.dataTransfer.files?.[0] ?? null;
                    handleFilePicked(file);
                  }}
                  className={`flex flex-col items-center gap-2.5 rounded-[14px] border-2 border-dashed p-6 text-center transition sm:p-8 ${
                    isDragging
                      ? 'border-[#2438C9] bg-[#2438C9]/5'
                      : 'border-[#8E97B5] bg-[#F7F8FC]'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.html,.htm,.zip"
                    className="hidden"
                    onChange={(e) => handleFilePicked(e.target.files?.[0] ?? null)}
                  />

                  {selectedFile ? (
                    <div className="flex w-full max-w-md items-center justify-between gap-3 rounded-xl border border-[#2438C9]/30 bg-white px-4 py-3 text-left">
                      <div className="flex min-w-0 items-center gap-3">
                        <FileCheck2 className="h-6 w-6 shrink-0 text-[#2438C9]" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-[#14181F]">
                            {selectedFile.name}
                          </p>
                          <p className="font-mono text-xs text-[#6A7184] tabular-nums">
                            {formatBytes(selectedFile.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        aria-label="Hapus berkas terpilih"
                        className="shrink-0 rounded-lg p-1.5 text-[#6A7184] transition hover:bg-[#F7F8FC] hover:text-[#9B1C1C]"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-[#2438C9]" aria-hidden="true" />
                      <span className="font-semibold text-[#14181F]">Tarik berkas ke sini</span>
                      <span className="text-[13px] text-[#4A5160]">
                        PDF, HTML5, atau ZIP · maksimal 25 MB
                      </span>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-1 min-h-[44px] rounded-[10px] border-2 border-[#2438C9] bg-white px-5 text-sm font-semibold text-[#2438C9] transition hover:bg-[#2438C9] hover:text-white"
                      >
                        Pilih berkas
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Tautan E-Modul */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="tautan" className="text-sm font-semibold text-[#14181F]">
                  Atau tautan e-modul (Canva, Heyzine, Google Drive)
                </label>
                <input
                  id="tautan"
                  type="text"
                  inputMode="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://"
                  className="min-h-[48px] w-full rounded-[10px] border border-[#B8BED0] bg-white px-3.5 text-[15px] text-[#14181F] placeholder:text-[#6A7184] focus:border-[#2438C9] focus:outline-none"
                />
              </div>

              {/* Pernyataan Orisinalitas */}
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  id="orisinal"
                  type="checkbox"
                  checked={orisinal}
                  onChange={(e) => setOrisinal(e.target.checked)}
                  className="h-5 w-5 shrink-0 rounded border-[#B8BED0] accent-[#2438C9]"
                />
                <span className="text-sm text-[#4A5160]">
                  Saya menyatakan e-modul ini karya sendiri.
                </span>
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="min-h-[52px] w-full rounded-[12px] bg-[#2438C9] px-8 text-base font-semibold text-white transition hover:bg-[#1C2DA6] disabled:opacity-60 sm:w-auto sm:self-start"
              >
                {submitting ? 'Mengirim Tugas...' : 'Kirim Tugas'}
              </button>
            </form>
          )}
        </motion.div>

        {/* Right Sidebar — 2 columns side-by-side on tablet, stacked in right column on desktop */}
        <aside className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
          {/* Ketentuan Card */}
          <div className="flex flex-col gap-3 rounded-[18px] border border-[#E3E6F0] bg-white p-6 sm:rounded-[20px] sm:p-7">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-[#14181F]">
              Ketentuan
            </h2>
            <ol className="space-y-2 text-[14px] leading-[1.6] text-[#4A5160] sm:text-[15px]">
              <li>1. Gunakan format yang diminta dosen.</li>
              <li>2. Pastikan tautan dapat dibuka tanpa izin khusus.</li>
              <li>3. Unggahan ulang menggantikan versi sebelumnya.</li>
            </ol>
          </div>

          {/* Batas Unggah Card */}
          <div className="flex flex-col justify-center gap-1.5 rounded-[18px] bg-[#FFF1D6] p-6 text-[#7A4B00] sm:rounded-[20px] sm:p-7">
            <span className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold">
              Batas unggah
            </span>
            <span className="text-[14px] font-medium sm:text-[15px]">
              {SUBMISSION_DEADLINE_LABEL}
            </span>
            {countdown && (
              <span className="mt-1 font-mono text-xs font-semibold opacity-90 tabular-nums">
                {countdown}
              </span>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}
