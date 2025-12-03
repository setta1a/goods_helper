# Goods Helper Mini App

Goods Helper is a Telegram mini app designed to manage kitchen stock, plan refills, and configure deliveries without stress. The repository contains both the interactive front-end and a lightweight Python bot that exposes the mini app via Telegram’s WebApp button.

## Tech Stack

- React + TypeScript (Vite)
- Modern handcrafted CSS
- Python 3.12 + aiogram for the Telegram bot
- Docker + docker compose

## Environment

Create your `.env` using the provided template:

```bash
cp .env.example .env
# edit .env with your BOT_TOKEN and mini app URL
```

## Front-End (local dev)

```bash
cd /Users/andrejsitalo/PycharmProjects/goods_helper/client
npm install
npm run dev -- --host
```

Open the printed URL (usually http://localhost:5173). This URL is what you can set as `WEBAPP_URL` for local testing via Telegram’s web app sandbox (use a tunneling solution if Telegram must reach your machine).

## Docker Compose (UI + Bot)

```bash
cd /Users/andrejsitalo/PycharmProjects/goods_helper
docker compose up --build
```

- `goods-helper-ui` serves the static mini app at http://localhost:4173.
- `goods-helper-bot` starts an aiogram polling bot. It loads `BOT_TOKEN` and `WEBAPP_URL` from `.env` and sends an “Open Goods Helper” WebApp button on `/start` or `/menu`.

> Telegram must be able to reach the `WEBAPP_URL`, so expose the UI publicly (e.g., HTTPS domain or tunneling service) when testing on real devices.

## Server deployment & public IP helper

When you deploy on a remote server, Telegram expects an IP or domain that resolves from the public internet. To auto-detect the outward-facing IP and build the full URL for the mini app, run:

```bash
cd /Users/andrejsitalo/PycharmProjects/goods_helper
./scripts/print-webapp-url.sh          # optionally pass a custom port as the first argument
```

The script tries several strategies (ipify, OpenDNS, fallback to host IP). Copy the printed URL into `WEBAPP_URL` inside `.env` so the bot shares a valid address with Telegram users. If you terminate TLS elsewhere (e.g., nginx with certificates), export `PROTO=https` before running the script to emit an HTTPS link.

## Project Structure

- `client/src/screens/*` – UI screens (Home, Essentials, Fridge View, Add Product, Delivery)
- `client/src/data/mockData.ts` – mock content powering the UI
- `client/src/types/app.ts` – shared types
- `bot/main.py` – aiogram bot that links users to the mini app
- `bot/config.py` – environment handling
- `.env.example` – tokens + URLs expected by docker compose

Feel free to swap the mock data for live APIs. The UI is isolated in the `client` package, so you can later inject Telegram Mini App initialization without restructuring the layout.
