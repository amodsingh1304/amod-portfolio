import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "your_secure_password_here";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;
    
    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }
    
    if (password === ADMIN_PASSWORD) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}