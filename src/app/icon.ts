import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export function GET(request: NextRequest) {
  // Check if behind proxy
  const isProxy = request.url.includes('/proxy/3000');
  const iconPath = path.join(process.cwd(), 'public', 'icon.png');
  
  try {
    const iconBuffer = fs.readFileSync(iconPath);
    
    return new NextResponse(iconBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Icon not found' }, { status: 404 });
  }
}