import { NextResponse } from 'next/server';
import { IpLookupService } from '@/lib/services/ip-lookup-prisma';

export async function GET() {
  try {
    const stats = await IpLookupService.getStats();
    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error('Stats API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to retrieve statistics',
      },
      { status: 500 }
    );
  }
}
