import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { PortfolioContent, defaultContent } from '@/lib/content';

const CONTENT_FILE = join(process.cwd(), 'public', 'content.json');

async function ensureContentFile(): Promise<void> {
  try {
    await readFile(CONTENT_FILE, 'utf-8');
  } catch (error) {
    // File doesn't exist, create it with default content
    await writeFile(CONTENT_FILE, JSON.stringify(defaultContent, null, 2), 'utf-8');
  }
}

export async function GET() {
  try {
    await ensureContentFile();
    const content = await readFile(CONTENT_FILE, 'utf-8');
    return NextResponse.json(JSON.parse(content));
  } catch (error) {
    return NextResponse.json(defaultContent, { status: 200 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const content: PortfolioContent = body;
    
    // Validate content structure
    if (!content.hero || !content.about || !content.skills || !content.experience || !content.projects || !content.contact) {
      return NextResponse.json({ error: 'Invalid content structure' }, { status: 400 });
    }
    
    // Ensure statistics exist
    if (!content.about.statistics) {
      content.about.statistics = {
        years: '1+',
        projects: '4+',
        technologies: '15+',
        satisfaction: '100%'
      };
    }
    
    await ensureContentFile();
    await writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
