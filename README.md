# 🎛 thecueRoom

Underground music community + AI Studio.  
Built with **Expo React Native (mobile)**, **Next.js (admin)**, and **Supabase (backend)**.  

---

## 🚀 Tech Stack
- **Mobile**: Expo React Native (TS), Reanimated, Supabase SDK  
- **Web**: Next.js (TS), Supabase Auth Helpers  
- **Backend**: Supabase (Auth, Postgres, RLS, Storage, Edge Functions)  
- **Feeds**: 40+ curated RSS sources (RA, Mixmag, DJ Mag, Wild City, etc.)

---

## 🖼 Brand System
- **Logo**: inline blinking SVG (see `/shared/Logo.tsx`)  
- **Colors**:  
  - Background: `#0B0B0B`  
  - Surface: `#111111`  
  - Lime: `#D1FF3D`  
  - Purple: `#873BBF`  
- **Fonts**: Inter, Source Code Pro  

---

## 📱 Mobile App
```bash
cd mobile
npm install
npm run start
```
Expo will open. Scan QR with Expo Go.  

---

## 🖥 Admin Console
```bash
cd admin
npm install
npm run dev
```
Visit `http://localhost:3000`  

---

## 🔐 Auth
- Supabase Auth (email OTP, Magic Link)  
- Tokens persisted with SecureStore (mobile), cookies (web)  

---

## 🗄 DB Schema
- `users`, `posts`, `comments`, `reactions`, `gigs`, `venues`, `news`, `rooms/messages`, `tools`, `flags`, `featureFlags`

---

## ☁️ Edge Functions
- `ingestNews`: pull all feeds every 30m
- `generateEpk`: render + store PDFs
- `notifyPost`: push notifications
- `gigGeo`: geohash utils

Deploy (needs `SUPABASE_ACCESS_TOKEN`):
```bash
export SUPABASE_ACCESS_TOKEN=<access-token> # locally
supabase functions deploy ingestNews
```
GitHub Actions uses a real token via `SUPABASE_ACCESS_TOKEN` secret (see `.github/workflows/deploy.yml`).

---

## 🔧 Dev & Seed
```bash
supabase start      # local Postgres + Studio
node scripts/seed.js
```

Seed creates:
- 1 admin, 2 verified artists  
- 3 gigs (Bangalore, Berlin, Mumbai)  
- 5 posts, 2 memes  
- Feature flags: all true  

---

## ✅ Quality
- TypeScript everywhere  
- ESLint + Prettier configs shared  
- Jest tests in `/mobile`, `/admin`, `/functions`  
- GitHub Actions → lint, typecheck, test, build  

---

## 📦 Deploy
- **Mobile**: Expo EAS build/deploy  
- **Admin**: Vercel (Next.js)  
- **Backend**: Supabase project (free tier)  
