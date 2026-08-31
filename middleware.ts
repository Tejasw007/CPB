import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Signatures indicating potential malicious activity
const SQLI_SIGNATURES = [
  "UNION SELECT", "OR 1=1", "OR '1'='1", "DROP TABLE", "--", "WAITFOR DELAY"
];

const XSS_SIGNATURES = [
  "<script>", "javascript:", "onerror=", "onload="
];

const TRAVERSAL_SIGNATURES = [
  "../", "..\\", "/etc/passwd", "win.ini"
];

const SUSPICIOUS_USER_AGENTS = [
  "sqlmap", "nmap", "burpsuite", "nikto", "dirb"
];

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Skip middleware for static files and internal Next.js paths
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/static') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const userAgent = request.headers.get('user-agent') || '';
  const ip = request.headers.get('x-forwarded-for') || request.ip || 'unknown';
  
  // 1. Inspect User-Agent
  const isSuspiciousAgent = SUSPICIOUS_USER_AGENTS.some(agent => userAgent.toLowerCase().includes(agent));
  
  // 2. Inspect URL & Query Parameters
  const decodedUrl = decodeURIComponent(url.href).toUpperCase();
  
  const hasSqli = SQLI_SIGNATURES.some(sig => decodedUrl.includes(sig));
  const hasXss = XSS_SIGNATURES.some(sig => decodedUrl.includes(sig.toUpperCase()));
  const hasTraversal = TRAVERSAL_SIGNATURES.some(sig => decodedUrl.includes(sig.toUpperCase()));

  if (isSuspiciousAgent || hasSqli || hasXss || hasTraversal) {
    // Determine attack type
    let attackType = "UNKNOWN";
    if (hasSqli) attackType = "SQL_INJECTION";
    else if (hasXss) attackType = "CROSS_SITE_SCRIPTING";
    else if (hasTraversal) attackType = "PATH_TRAVERSAL";
    else if (isSuspiciousAgent) attackType = "AUTOMATED_SCANNER";

    // Send the alert to the internal SOC logging API (fire and forget)
    // In production, we construct the absolute URL for the fetch call
    const origin = request.nextUrl.origin;
    
    // Fire and forget fetch to our internal blockchain logger
    fetch(`${origin}/api/soc/alerts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-WAF-Key": "cpb_internal_waf_webhook_9921"
      },
      body: JSON.stringify({
        ip,
        url: request.nextUrl.href,
        attackType,
        userAgent,
        payload: decodedUrl
      })
    }).catch(console.error);

    // Block the request
    return new NextResponse(
      JSON.stringify({ 
        error: "WAF_BLOCK", 
        message: "Your request was blocked by the Code Paglu Bank Web Application Firewall. Malicious payload detected.",
        attackType
      }),
      { status: 403, headers: { 'content-type': 'application/json' } }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
