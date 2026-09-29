import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { createClient } from '@supabase/supabase-js';
import { PortfolioContent, defaultContent, normalizeContent } from '@/lib/content';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const CONTENT_FILE = join(process.cwd(), 'public', 'content.json');
const TABLE = 'portfolio_content';
const ROW_ID = 1;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const cacheHeaders = {
  'Cache-Control': 'no-store, max-age=0, must-revalidate',
};

function jsonResponse(body: any, status = 200) {
  return NextResponse.json(body, { status, headers: cacheHeaders });
}

async function ensureContentFile(): Promise<void> {
  try {
    await readFile(CONTENT_FILE, 'utf-8');
  } catch (error) {
    // File doesn't exist, create it with default content
    await writeFile(CONTENT_FILE, JSON.stringify(defaultContent, null, 2), 'utf-8');
  }
}

async function readFromFile(): Promise<PortfolioContent> {
  await ensureContentFile();
  const content = await readFile(CONTENT_FILE, 'utf-8');
  return normalizeContent(JSON.parse(content));
}

export async function GET() {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from(TABLE)
        .select('data')
        .eq('id', ROW_ID)
        .maybeSingle();

      if (error) {
        console.error('Supabase GET error:', error);
        const fileContent = await readFromFile();
        return jsonResponse(fileContent);
      }

      if (data?.data) {
        return jsonResponse(normalizeContent(data.data));
      }

      // Row missing — seed it from the current file content
      const fileContent = await readFromFile();
      const { error: seedError } = await supabase
        .from(TABLE)
        .upsert({ id: ROW_ID, data: fileContent });

      if (seedError) {
        console.error('Supabase seed error:', seedError);
      }
      return jsonResponse(fileContent);
    }

    const content = await readFromFile();
    return jsonResponse(content);
  } catch (error) {
    return jsonResponse(normalizeContent(defaultContent), 200);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const content: PortfolioContent = normalizeContent(body);

    // Validate content structure
    if (!content.hero || !content.about || !content.skills || !content.experience || !content.projects || !content.contact) {
      return jsonResponse({ error: 'Invalid content structure' }, 400);
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

    // If Supabase is configured, save to the database — works live
    // on Vercel instantly, no redeploy needed.
    if (supabase) {
      const { error } = await supabase
        .from(TABLE)
        .upsert({ id: ROW_ID, data: content });

      if (error) {
        return jsonResponse(
          { error: 'Supabase save failed', details: error.message },
          500
        );
      }
      return jsonResponse({ success: true, stored: 'supabase' });
    }

    // Fallback: write to local file (local development)
    try {
      await ensureContentFile();
      await writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf-8');
      return jsonResponse({ success: true, stored: 'file' });
    } catch {
      return jsonResponse({ error: 'Failed to save content' }, 500);
    }
  } catch (error) {
    return jsonResponse({ error: 'Failed to save content' }, 500);
  }
}
