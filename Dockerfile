# 1. Билдер на основе bun
FROM oven/bun:1.1 as builder

WORKDIR /app

COPY bun.lockb .
COPY package.json .
COPY tsconfig.json .
COPY next.config.ts .
COPY .env.production .

RUN bun install --frozen-lockfile

COPY . .

# Важно: устанавливаем prisma CLI в prod (если он не в deps)
RUN bun add prisma --production

RUN bun run build

# 2. Финальный продакшн образ
FROM oven/bun:1.1

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3005

COPY --from=builder /app /app

# Создаём папку для файлов
RUN mkdir -p /app/files/uploads2345

# Авто-миграция при запуске
CMD bunx prisma migrate deploy && bun start

EXPOSE 3005
