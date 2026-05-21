import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "3000");

  app.use(express.json());

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Contact form handler
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Champs requis manquants" });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Adresse email invalide" });
      }

      console.log("═══════════════════════════════════════");
      console.log(" 📩 NOUVELLE DEMANDE DE CONTACT");
      console.log("═══════════════════════════════════════");
      console.log(` Nom    : ${name}`);
      console.log(` Email  : ${email}`);
      console.log(` Sujet  : ${subject}`);
      console.log(` Message: ${message}`);
      console.log("═══════════════════════════════════════");

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

      res.status(200).json({ success: true, message: "Demande reçue avec succès" });
    } catch (error) {
      console.error("Erreur formulaire contact:", error);
      res.status(500).json({ error: "Erreur serveur interne" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅  La Conciergerie Rabat — http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);