# 🏙️ La Conciergerie Rabat — Prestige Edition

Site web de conciergerie de luxe pour Rabat, Maroc. Construit avec **React 19 + TypeScript + Vite + TailwindCSS v4 + Framer Motion**.

## 🚀 Démarrage Rapide

```bash
npm install
npm run dev
```
Le site sera accessible sur **http://localhost:3000**

## 📦 Build Production

```bash
npm run build
npm start
```

## 🗂️ Structure du Projet

```
src/
├── components/
│   ├── Navbar.tsx             # Navigation sticky avec scroll actif
│   ├── Hero.tsx               # Hero avec parallaxe souris
│   ├── StatsSection.tsx       # Compteurs animés
│   ├── ApartmentGrid.tsx      # Grille des appartements
│   ├── PropertyModal.tsx      # Modal appartement avec slider photos
│   ├── RestaurantGrid.tsx     # Grille des restaurants
│   ├── RestaurantModal.tsx    # Modal restaurant
│   ├── CircuitSection.tsx     # Section circuits alternés
│   ├── CircuitModal.tsx       # Modal circuit
│   ├── ServicesSection.tsx    # 6 services en grille
│   ├── GallerySection.tsx     # Galerie masonry
│   ├── TestimonialsSection.tsx# Témoignages clients
│   ├── ContactSection.tsx     # Formulaire + infos contact
│   └── WhatsAppFloatingButton.tsx
├── data.ts                    # Données (appartements, restaurants, circuits...)
├── App.tsx
├── main.tsx
└── index.css
```

## ✉️ Activer l'Envoi d'Emails

1. `npm install nodemailer @types/nodemailer`
2. Créer `.env`:
   ```
   EMAIL_USER=votre@gmail.com
   EMAIL_PASS=votre_mot_de_passe_app
   ```
3. Décommenter le bloc Nodemailer dans `server.ts`

## 📞 Contact & WhatsApp

- **WhatsApp**: +212 719 165 197
- **Email**: master.dataspot@gmail.com

---
Développé avec ❤️ pour La Conciergerie Rabat
