import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const NOTIFY_EMAIL = 'info@simlimited.net';

/** Escape HTML special characters to prevent XSS in email body */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/** Simple email format check */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    // Shared hosting uses provider's certificate (natrohost.com)
    rejectUnauthorized: false,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, subject, message, _honey } = body;

    // Honeypot check — bots fill hidden fields
    if (_honey) {
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

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 });
    }

    if (typeof message !== 'string' || message.length > 5000) {
      return NextResponse.json({ error: 'Message too long.' }, { status: 400 });
    }

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('[contact] SMTP credentials not configured. Email not sent.');
      return NextResponse.json({ success: true, debug: 'smtp_not_configured' });
    }

    const safeName = escapeHtml(name);
    const safeSubject = subject ? escapeHtml(subject) : '';

    await transporter.sendMail({
      from: `"SIM Baskı Malzemeleri" <${process.env.SMTP_USER}>`,
      to: NOTIFY_EMAIL,
      replyTo: email,
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
    console.error('[contact] Error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
