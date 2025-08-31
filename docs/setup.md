# Setup Guide

Follow these steps to configure and run thecueRoom locally.

## Prerequisites
- [Node.js](https://nodejs.org/) **20.19.4**
- [npm](https://www.npmjs.com/) **11.4.2**
- [Supabase CLI](https://supabase.com/docs/guides/cli) `>=1`
- [Expo CLI](https://docs.expo.dev/more/expo-cli/) (installed automatically via `npx`)

## 1. Clone and configure
```bash
git clone https://github.com/<your-fork>/thecueRoom_mobileapp.git
cd thecueRoom_mobileapp
cp .env.example .env
```
Populate `.env` with local values.

## 2. Install dependencies
```bash
bash scripts/setup.sh
```
The script installs root and mobile packages.

## 3. Start local services
To run everything:
```bash
bash scripts/dev.sh
```
This will:
1. Start Supabase (if the CLI is installed)
2. Launch the Next.js admin console
3. Launch the Expo mobile app

## 4. Manual commands
If you prefer manual control:
```bash
# Supabase
supabase start

# Admin web app
npm --prefix admin run dev

# Mobile app
npm --prefix mobile run start
```

## 5. Quality checks
```bash
npm test
npm run typecheck
npm run lint
```

## 6. Build
```bash
npm run build
```

You're ready to contribute!
