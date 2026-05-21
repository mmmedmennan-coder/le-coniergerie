import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Champs requis manquants' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    await transporter.sendMail({
      from: `"La Conciergerie Rabat" <${process.env.EMAIL_USER}>`,
      to: 'master.dataspot@gmail.com',
      replyTo: email,
      subject: `[Conciergerie] ${subject} — ${name}`,
      html: `<h2>Nouvelle demande</h2>
        <p><b>Nom:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Sujet:</b> ${subject}</p>
        <p><b>Message:</b><br>${message.replace(/\n/g,'<br>')}</p>`
    });

    res.status(200).json({ success: true, message: 'Demande reçue avec succès' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: error.message });
  }
}