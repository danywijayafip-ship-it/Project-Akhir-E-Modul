'use client';

import { AnimatePresence, motion } from 'motion/react';
import { X, ExternalLink, FileText } from 'lucide-react';
import { formatBytes, type EModulSubmission } from '@/lib/emodul-types';

interface ModuleDetailModalProps {
  submission: EModulSubmission | null;
  onClose: () => void;
}

export function ModuleDetailModal({ submission, onClose }: ModuleDetailModalProps) {
  return (
    <AnimatePresence>
      {submission && (
        <ModuleDetailBody key={submission.id} submission={submission} onClose={onClose} />
      )}
    </AnimatePresence>
  );
}

function ModuleDetailBody({
  submission,
  onClose,
}: {
  submission: EModulSubmission;
  onClose: () => void;
}) {
  const openHref = submission.linkUrl
    ? submission.linkUrl
    : submission.fileMeta
    ? `/api/files/${encodeURIComponent(submission.fileMeta.fileId)}`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#14181F]/65 p-0 backdrop-blur-xs sm:items-center sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 14, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-t-[22px] border border-[#E3E6F0] bg-white shadow-2xl sm:rounded-[22px]"
      >
        {/* Header Strip */}
        <div
          className="flex items-start justify-between gap-3 p-5 text-white sm:gap-4 sm:p-6"
          style={{ backgroundColor: submission.accentColor }}
        >
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#14181F]">
                {submission.offering}
              </span>
              <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-medium text-white">
                {submission.topic}
              </span>
              <span className="rounded-full bg-white/20 px-2.5 py-1 font-mono text-xs font-semibold text-white tabular-nums">
                Versi {submission.version}
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold leading-snug sm:text-2xl">
              {submission.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail e-modul"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white transition hover:bg-white/25"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 p-5 sm:space-y-6 sm:p-7">
          <div className="border-b border-[#E3E6F0] pb-4">
            <p className="text-base font-semibold text-[#14181F]">
              {submission.studentName}
            </p>
            <p className="mt-0.5 font-mono text-xs text-[#6A7184] tabular-nums">
              NIM {submission.nim} · Diperbarui{' '}
              {new Date(submission.updatedAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[1.5px] text-[#6A7184] uppercase">
              Ringkasan Karya
            </h4>
            <p className="mt-1.5 text-[15px] leading-relaxed text-[#4A5160]">
              {submission.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
            {openHref && (
              <a
                href={openHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-[#2438C9] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1C2DA6] sm:w-auto"
              >
                <span>BUKA E-MODUL</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
            {submission.fileMeta && (
              <a
                href={`/api/files/${encodeURIComponent(submission.fileMeta.fileId)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl border border-[#B8BED0] bg-[#F7F8FC] px-4 py-2.5 text-sm font-medium text-[#14181F] transition hover:border-[#2438C9] sm:w-auto sm:justify-start"
              >
                <FileText className="h-4 w-4 shrink-0 text-[#2438C9]" aria-hidden="true" />
                <span className="truncate">{submission.fileMeta.originalName}</span>
                <span className="shrink-0 font-mono text-xs text-[#6A7184] tabular-nums">
                  ({formatBytes(submission.fileMeta.sizeBytes)})
                </span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
