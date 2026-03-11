import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const NOTIFY_EMAIL = 'info@simlimited.net';
const MAX_BODY_SIZE = 10 * 1024; // 10KB
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // max requests per window

/* ------------------------------------------------------------------ */
/*  In-memory rate limiter (sliding window)                            */
/* ------------------------------------------------------------------ */
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Remove expired entries
  const valid = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);

  if (valid.length >= RATE_LIMIT_MAX) {
    rateLimitMap.set(ip, valid);
    return true;
  }

  valid.push(now);
  rateLimitMap.set(ip, valid);
  return false;
}

// Periodic cleanup to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitMap) {
    const valid = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
    if (valid.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, valid);
    }
  }
}, RATE_LIMIT_WINDOW);

function getClientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Escape HTML special characters to prevent XSS in email body */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/** Strip newline characters to prevent email header injection */
function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]/g, '');
}

/** Validate email format with stricter rules */
function isValidEmail(email: string): boolean {
  if (email.length > 254) return false;
  if (email.includes('..')) return false;
  if (/[\r\n]/.test(email)) return false;
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function buildEmailHtml({
  name,
  email,
  phone,
  company,
  subject,
  message,
}: Record<string, string>): string {
  const rows = [
    { label: 'Ad Soyad', value: name },
    { label: 'E-posta', value: email },
    ...(phone ? [{ label: 'Telefon', value: phone }] : []),
    ...(company ? [{ label: 'Firma', value: company }] : []),
    ...(subject ? [{ label: 'Konu', value: subject }] : []),
  ];

  const tableRows = rows
    .map(
      (r) =>
        `<tr>
          <td style="padding:12px 16px;border-bottom:1px solid #eee;color:#666;font-size:13px;width:120px;">${r.label}</td>
          <td style="padding:12px 16px;border-bottom:1px solid #eee;color:#1a1a1a;font-size:14px;">${escapeHtml(r.value)}</td>
        </tr>`,
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
        <!-- Header -->
        <tr>
          <td style="background:#080C14;padding:24px 32px;text-align:center;">
            <h1 style="margin:0;color:#C4922A;font-size:18px;font-weight:700;letter-spacing:1px;">SIM BASKI MALZEMELERİ</h1>
            <p style="margin:6px 0 0;color:#9BA8B4;font-size:12px;letter-spacing:2px;">YENİ İLETİŞİM FORMU MESAJI</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:8px;overflow:hidden;">
              ${tableRows}
            </table>
            <div style="margin-top:24px;">
              <p style="margin:0 0 8px;color:#666;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Mesaj</p>
              <div style="background:#f9f9f9;border:1px solid #eee;border-radius:8px;padding:16px;color:#1a1a1a;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(message)}</div>
            </div>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#fafafa;border-top:1px solid #eee;padding:16px 32px;text-align:center;">
            <p style="margin:0;color:#999;font-size:11px;">Bu mesaj <a href="https://www.simlimited.net" style="color:#C4922A;text-decoration:none;">simlimited.net</a> iletişim formundan gönderilmiştir.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

/* ------------------------------------------------------------------ */
/*  POST handler                                                       */
/* ------------------------------------------------------------------ */
export async function POST(request: Request) {
  try {
    // Body size check
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_BODY_SIZE) {
      return NextResponse.json(
        { error: 'Payload too large.' },
        { status: 413 },
      );
    }

    // Rate limiting
    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { name, email, phone, company, subject, message, _honey } = body;

    // Honeypot check — bots fill hidden fields
    if (_honey) {
      console.warn('[contact] Honeypot triggered', {
        ip: clientIp,
        userAgent: request.headers.get('user-agent'),
      });
      return NextResponse.json({ success: true });
    }

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 },
      );
    }

    if (typeof name !== 'string' || name.length > 200) {
      return NextResponse.json({ error: 'Invalid name.' }, { status: 400 });
    }

    if (typeof email !== 'string' || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 });
    }

    if (typeof message !== 'string' || message.length > 5000) {
      return NextResponse.json({ error: 'Message too long.' }, { status: 400 });
    }

    if (phone && (typeof phone !== 'string' || phone.length > 30)) {
      return NextResponse.json({ error: 'Invalid phone.' }, { status: 400 });
    }

    if (company && (typeof company !== 'string' || company.length > 200)) {
      return NextResponse.json({ error: 'Invalid company.' }, { status: 400 });
    }

    if (subject && (typeof subject !== 'string' || subject.length > 300)) {
      return NextResponse.json({ error: 'Invalid subject.' }, { status: 400 });
    }

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('[contact] SMTP credentials not configured.');
      return NextResponse.json(
        { error: 'Mail server configuration error.' },
        { status: 500 },
      );
    }

    const safeName = escapeHtml(name);
    const safeSubject = subject ? escapeHtml(subject) : '';

    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"SIM Baskı Malzemeleri" <${process.env.SMTP_USER}>`,
      to: NOTIFY_EMAIL,
      replyTo: sanitizeHeader(email),
      subject: safeSubject
        ? `[İletişim Formu] ${safeSubject}`
        : `[İletişim Formu] ${safeName} - Yeni Mesaj`,
      html: buildEmailHtml({
        name,
        email,
        phone: phone || '',
        company: company || '',
        subject: subject || '',
        message,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('[contact] Error:', errorMessage);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
