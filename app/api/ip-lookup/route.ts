import { NextRequest, NextResponse } from 'next/server';
import { ExternalIpLookupService } from '@/lib/services/ip-lookup-external';

// Helper function to parse user agent
function parseUserAgent(userAgent: string) {
  const ua = userAgent.toLowerCase();

  // Device type detection
  let deviceType = 'Desktop';
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    deviceType = 'Tablet';
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
    deviceType = 'Mobile';
  }

  // OS detection
  let os = 'Unknown';
  if (ua.includes('windows nt 10.0')) os = 'Windows 10/11';
  else if (ua.includes('windows nt 6.3')) os = 'Windows 8.1';
  else if (ua.includes('windows nt 6.2')) os = 'Windows 8';
  else if (ua.includes('windows nt 6.1')) os = 'Windows 7';
  else if (ua.includes('windows')) os = 'Windows';
  else if (ua.includes('mac os x')) {
    const match = ua.match(/mac os x ([\d_]+)/);
    os = match ? `macOS ${match[1].replace(/_/g, '.')}` : 'macOS';
  }
  else if (ua.includes('android')) {
    const match = ua.match(/android ([\d.]+)/);
    os = match ? `Android ${match[1]}` : 'Android';
  }
  else if (ua.includes('iphone') || ua.includes('ipad')) {
    const match = ua.match(/os ([\d_]+)/);
    os = match ? `iOS ${match[1].replace(/_/g, '.')}` : 'iOS';
  }
  else if (ua.includes('linux')) os = 'Linux';
  else if (ua.includes('ubuntu')) os = 'Ubuntu';
  else if (ua.includes('fedora')) os = 'Fedora';

  // Browser detection
  let browser = 'Unknown';
  let browserVersion = '';

  if (ua.includes('edg/')) {
    const match = ua.match(/edg\/([\d.]+)/);
    browser = 'Microsoft Edge';
    browserVersion = match ? match[1] : '';
  } else if (ua.includes('chrome/') && !ua.includes('edg')) {
    const match = ua.match(/chrome\/([\d.]+)/);
    browser = 'Google Chrome';
    browserVersion = match ? match[1] : '';
  } else if (ua.includes('firefox/')) {
    const match = ua.match(/firefox\/([\d.]+)/);
    browser = 'Mozilla Firefox';
    browserVersion = match ? match[1] : '';
  } else if (ua.includes('safari/') && !ua.includes('chrome')) {
    const match = ua.match(/version\/([\d.]+)/);
    browser = 'Safari';
    browserVersion = match ? match[1] : '';
  } else if (ua.includes('opera') || ua.includes('opr/')) {
    const match = ua.match(/(?:opera|opr)\/([\d.]+)/);
    browser = 'Opera';
    browserVersion = match ? match[1] : '';
  }

  return {
    deviceType,
    os,
    browser,
    browserVersion,
    userAgent,
  };
}

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

    const result = await ExternalIpLookupService.lookupIp(ip);

    if (result.status === 'fail') {
      return NextResponse.json(result, { status: 404 });
    }

    // Add device information
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const deviceInfo = parseUserAgent(userAgent);

    return NextResponse.json({
      ...result,
      deviceInfo,
    }, { status: 200 });
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

    const result = await ExternalIpLookupService.lookupIp(ip);

    if (result.status === 'fail') {
      return NextResponse.json(result, { status: 404 });
    }

    // Add device information
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const deviceInfo = parseUserAgent(userAgent);

    return NextResponse.json({
      ...result,
      deviceInfo,
    }, { status: 200 });
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
