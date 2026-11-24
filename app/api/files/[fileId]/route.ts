import { NextRequest, NextResponse } from 'next/server';
import path from 'node:path';
import { readUploadedFile } from '@/lib/emodul-store';

const MIME_BY_EXT: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.zip': 'application/zip',
};

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ fileId: string }> }
) {
  const { fileId } = await context.params;
  const result = await readUploadedFile(fileId);
  if (!result) {
    return NextResponse.json({ error: 'Berkas tidak ditemukan.' }, { status: 404 });
  }

  const ext = path.extname(result.filePath).toLowerCase();
  const contentType = MIME_BY_EXT[ext] ?? 'application/octet-stream';
  const disposition = ext === '.zip' ? 'attachment' : 'inline';

  return new NextResponse(new Uint8Array(result.buffer), {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `${disposition}; filename="${path.basename(result.filePath)}"`,
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
