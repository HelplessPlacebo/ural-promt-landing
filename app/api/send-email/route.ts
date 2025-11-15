import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, message } = body ?? {};

    const user = process.env.YANDEX_SMTP_USER;
    const pass = process.env.YANDEX_SMTP_PASS;
    const host = process.env.SMTP_HOST || 'smtp.yandex.ru';
    const port = Number(process.env.SMTP_PORT || 465);

    if (!user || !pass) {
      console.error('SMTP credentials are missing');
      return NextResponse.json(
        { success: false, error: 'SMTP credentials missing' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const mailOptions = {
      from: `"Сайт УРАЛПРОМТ" <${user}>`,
      to: 'td-upt@yandex.ru',
      subject: 'Запрос коммерческого предложения',
      text: `Имя: ${name || '-'}\nТелефон: ${phone || '-'}\nСообщение:\n${message || '-'}`,
      html: `<p><strong>Имя:</strong> ${name || '-'}</p>
             <p><strong>Телефон:</strong> ${phone || '-'}</p>
             <p><strong>Сообщение:</strong><br/>${(message || '-').replace(/\n/g, '<br/>')}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Send error:', err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
