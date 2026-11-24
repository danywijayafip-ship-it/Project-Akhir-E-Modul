export type OfferingCode =
  | 'Offering A2A'
  | 'Offering A2B'
  | 'Offering A2C'
  | 'Offering A2D'
  | 'Offering A2E';

export interface UploadedFileMeta {
  fileId: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
}

export interface EModulSubmission {
  id: string;
  studentName: string;
  nim: string;
  offering: OfferingCode;
  topic: string;
  title: string;
  description: string;
  linkUrl: string;
  fileMeta: UploadedFileMeta | null;
  accentColor: string;
  version: number;
  submittedAt: string;
  updatedAt: string;
  isCuratedSeed?: boolean;
}

export const OFFERINGS: OfferingCode[] = [
  'Offering A2A',
  'Offering A2B',
  'Offering A2C',
  'Offering A2D',
  'Offering A2E',
];

export const TOPIC_OPTIONS = [
  'Desain Pembelajaran',
  'Multimedia Interaktif',
  'Microlearning & Video',
  'Bahan Ajar Proyek',
  'Asesmen Formatif Digital',
  'Kurikulum & Inovasi',
];

export const CARD_BANNER_COLORS = [
  '#2438C9',
  '#E08A00',
  '#0F7B6C',
  '#7A3FC9',
  '#C93B5A',
  '#2438C9',
];

export const DOSEN_PENGAMPU = [
  'Dr. Deka Dyah Utami, S.Pd., M.Pd.',
  'Dany Wijaya Kesuma, S.Pd., M.Pd.',
];

export const SUBMISSION_DEADLINE_ISO = '2026-12-20T23:59:00+07:00';
export const SUBMISSION_DEADLINE_LABEL = 'Minggu, 20 Desember 2026 · 23.59 WIB';

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
