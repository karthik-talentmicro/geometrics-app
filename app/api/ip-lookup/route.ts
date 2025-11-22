import { NextRequest, NextResponse } from 'next/server';
import { IpLookupService } from '@/lib/services/ip-lookup-prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const ip = searchParams.get('ip');

    if (!ip) {
      return NextResponse.json(
        {
          status: 'fail',
          message: 'IP address parameter is required',
        },
        { status: 400 }
      );
    }

    const result = await IpLookupService.lookupIp(ip);

    if (result.status === 'fail') {
      return NextResponse.json(result, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        status: 'fail',
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ip } = body;

    if (!ip) {
      return NextResponse.json(
        {
          status: 'fail',
          message: 'IP address is required in request body',
        },
        { status: 400 }
      );
    }

    const result = await IpLookupService.lookupIp(ip);

    if (result.status === 'fail') {
      return NextResponse.json(result, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        status: 'fail',
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
