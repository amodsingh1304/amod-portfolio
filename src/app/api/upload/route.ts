import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, readdir, unlink } from 'fs/promises';
import { join, extname } from 'path';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');

export async function POST(request: NextRequest) {
  try {
    const type = request.nextUrl.searchParams.get('type') || 'logo';
    const id = request.nextUrl.searchParams.get('id') || '';
    const formData = await request.formData();
    const file = (formData.get('logo') || formData.get('file')) as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const ext = extname(file.name).toLowerCase();
    if (!['.png', '.jpg', '.jpeg', '.webp', '.svg'].includes(ext)) {
      return NextResponse.json({ error: 'Invalid image type' }, { status: 400 });
    }

    await mkdir(UPLOAD_DIR, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());

    if (type === 'skill' && id) {
      const skillsDir = join(UPLOAD_DIR, 'skills');
      await mkdir(skillsDir, { recursive: true });

      const files = await readdir(skillsDir);
      for (const f of files) {
        if (f.startsWith(`skill-${id}-`)) {
          await unlink(join(skillsDir, f));
        }
      }

      const filename = `skill-${id}-${Date.now()}${ext}`;
      const filepath = join(skillsDir, filename);
      await writeFile(filepath, buffer);

      return NextResponse.json({ url: `/uploads/skills/${filename}` });
    }

    const files = await readdir(UPLOAD_DIR);
    for (const f of files) {
      if (f.startsWith('logo.')) {
        await unlink(join(UPLOAD_DIR, f));
      }
    }

    const filename = `logo${ext}`;
    const filepath = join(UPLOAD_DIR, filename);
    await writeFile(filepath, buffer);

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
