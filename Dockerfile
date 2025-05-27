# Dockerfile
FROM oven/bun:1.0.31

# Создаем директорию для приложения
WORKDIR /app

# Копируем зависимости
COPY bun.lockb package.json ./

# Устанавливаем зависимости
RUN bun install

# Копируем остальные файлы
COPY . .

# Собираем Next.js приложение
RUN bun run build

# Указываем порт
EXPOSE 3000

# Запускаем сервер
CMD ["bun", "start"]
