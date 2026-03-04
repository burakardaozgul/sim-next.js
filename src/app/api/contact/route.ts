import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_EMAIL = 'info@simlimited.net';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 },
      );
    }

    // Send notification email via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'SIM Web <onboarding@resend.dev>',
        to: [NOTIFY_EMAIL],
        replyTo: email,
        subject: subject
          ? `[Web İletişim Formu] ${subject}`
          : `[Web İletişim Formu] ${name} tarafından yeni mesaj`,
        html: `
          <h2>Yeni İletişim Formu Mesajı</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Ad Soyad</td><td style="padding:8px;border:1px solid #ddd;">${name}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">E-posta</td><td style="padding:8px;border:1px solid #ddd;">${email}</td></tr>
            ${phone ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Telefon</td><td style="padding:8px;border:1px solid #ddd;">${phone}</td></tr>` : ''}
            ${company ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Şirket</td><td style="padding:8px;border:1px solid #ddd;">${company}</td></tr>` : ''}
            ${subject ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Konu</td><td style="padding:8px;border:1px solid #ddd;">${subject}</td></tr>` : ''}
          </table>
          <h3>Mesaj:</h3>
          <p style="white-space:pre-wrap;background:#f5f5f5;padding:16px;border-radius:8px;">${message}</p>
          <hr/>
          <p style="color:#999;font-size:12px;">Bu mesaj simlimited.net iletişim formundan gönderilmiştir.</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
