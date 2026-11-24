import { NextRequest, NextResponse } from 'next/server';
import path from 'node:path';
import {
  listSubmissions,
  saveUploadedFile,
  upsertSubmissionByNim,
} from '@/lib/emodul-store';
import { OFFERINGS, type OfferingCode } from '@/lib/emodul-types';

const MAX_FILE_BYTES = 25 * 1024 * 1024; // 25 MB
const ALLOWED_EXTENSIONS = new Set(['.pdf', '.html', '.htm', '.zip']);

export async function GET(req: NextRequest) {
  try {
    const nimQuery = req.nextUrl.searchParams.get('nim')?.trim().toLowerCase();
    const items = await listSubmissions();

    if (nimQuery) {
      const matched = items.filter((item) => item.nim.toLowerCase() === nimQuery);
      return NextResponse.json({ submissions: matched });
    }

    return NextResponse.json({ submissions: items });
  } catch (error) {
    console.error('GET /api/submissions failed:', error);
    return NextResponse.json(
      { error: 'Gagal memuat daftar pengumpulan e-modul.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const studentName = String(formData.get('studentName') ?? '').trim();
    const nim = String(formData.get('nim') ?? '').trim();
    const offeringRaw = String(formData.get('offering') ?? '').trim();
    const topic = String(formData.get('topic') ?? '').trim();
    const title = String(formData.get('title') ?? '').trim();
    const description = String(formData.get('description') ?? '').trim();
    const linkUrl = String(formData.get('linkUrl') ?? '').trim();
    const orisinal = String(formData.get('orisinal') ?? '') === 'true';
    const fileEntry = formData.get('file');

    if (!studentName || studentName.length < 2) {
      return NextResponse.json(
        { error: 'Nama lengkap sesuai SIAKAD wajib diisi.' },
        { status: 400 }
      );
    }

    if (!nim || nim.length < 5) {
      return NextResponse.json(
        { error: 'NIM mahasiswa wajib diisi dengan benar.' },
        { status: 400 }
      );
    }

    if (!OFFERINGS.includes(offeringRaw as OfferingCode)) {
      return NextResponse.json(
        { error: 'Pilih offering yang valid (A2A–A2E).' },
        { status: 400 }
      );
    }

    if (!title || title.length < 3) {
      return NextResponse.json(
        { error: 'Judul e-modul wajib diisi.' },
        { status: 400 }
      );
    }

    if (!orisinal) {
      return NextResponse.json(
        { error: 'Anda harus mencentang pernyataan keaslian karya.' },
        { status: 400 }
      );
    }

    const hasFile = fileEntry instanceof File && fileEntry.size > 0;
    const hasLink = linkUrl.length > 0;

    if (!hasFile && !hasLink) {
      return NextResponse.json(
        { error: 'Unggah berkas e-modul atau sertakan tautan e-modul yang valid.' },
        { status: 400 }
      );
    }

    if (hasLink) {
      try {
        const parsed = new URL(linkUrl);
        if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
          return NextResponse.json(
            { error: 'Tautan e-modul harus diawali dengan https:// atau http://' },
            { status: 400 }
          );
        }
      } catch {
        return NextResponse.json(
          { error: 'Format tautan e-modul tidak valid. Pastikan diawali https://' },
          { status: 400 }
        );
      }
    }

    let fileMeta = null;
    if (hasFile) {
      const ext = path.extname(fileEntry.name).toLowerCase();
      if (!ALLOWED_EXTENSIONS.has(ext)) {
        return NextResponse.json(
          { error: 'Format berkas harus PDF, HTML5 (.html/.htm), atau ZIP.' },
          { status: 400 }
        );
      }
      if (fileEntry.size > MAX_FILE_BYTES) {
        return NextResponse.json(
          { error: 'Ukuran berkas melebihi batas maksimal 25 MB.' },
          { status: 400 }
        );
      }
      const arrayBuffer = await fileEntry.arrayBuffer();
      fileMeta = await saveUploadedFile({
        originalName: fileEntry.name,
        mimeType: fileEntry.type,
        buffer: Buffer.from(arrayBuffer),
      });
    }

    const finalDescription =
      description ||
      `Karya e-modul mahasiswa ${offeringRaw} pada topik ${topic || 'Bahan Pembelajaran'}.`;

    const result = await upsertSubmissionByNim({
      studentName,
      nim,
      offering: offeringRaw as OfferingCode,
      topic: topic || 'Desain Pembelajaran',
      title,
      description: finalDescription,
      linkUrl,
      fileMeta,
    });

    return NextResponse.json(result, {
      status: result.replacedPrevious ? 200 : 201,
    });
  } catch (error) {
    console.error('POST /api/submissions failed:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menyimpan tugas e-modul.' },
      { status: 500 }
    );
  }
}
