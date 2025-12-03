# Goods Helper Mini App

Goods Helper — это чистый фронтенд мини‑аппы в стиле Telegram, который показывает состояние холодильника, список essentials, добавление продуктов и настройки доставки. Теперь репозиторий содержит только UI, поэтому всё, что нужно для запуска, — это Vite dev server или Docker.

## Tech Stack

- React + TypeScript (Vite)
- Modern CSS без сторонних UI‑библиотек
- Docker + docker compose для быстрого деплоя статики

## Локальная разработка

```bash
cd /Users/andrejsitalo/PycharmProjects/goods_helper/client
npm install          # один раз
npm run dev -- --host
```

Открой ссылку из консоли (по умолчанию http://localhost:5173). Чтобы зайти с телефона в одной сети:

1. Узнай IP компьютера в LAN, например `ipconfig getifaddr en0` (macOS) или `hostname -I` (Linux).
2. На телефоне введи `http://<LAN-IP>:5173`.

## Docker (production-like сборка)

```bash
cd /Users/andrejsitalo/PycharmProjects/goods_helper
docker compose up --build
```

Будет собран production-бандл и выдан nginx по адресу http://<host-ip>:4173. Если сервер имеет публичный IP, просто пробрось порт 4173 (или поменяй в compose) и открой `http://SERVER_IP:4173` с телефона. HTTPS не обязателен, так как бот больше не используется.

## Project Structure

- `client/src/screens/*` – все экраны интерфейса (Home, Essentials, Fridge View, Add Product, Delivery)
- `client/src/data/mockData.ts` – моковые данные для прототипа
- `client/src/types/app.ts` – общие типы
- `Dockerfile` + `docker-compose.yml` – сборка и публикация UI

Данные и логика легко заменяются реальными API. Когда появится необходимость снова интегрировать Telegram Mini Apps SDK или бота, UI уже готов к встраиванию.*** End Patch
