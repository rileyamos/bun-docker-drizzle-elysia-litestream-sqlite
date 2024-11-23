FROM oven/bun:1.1.36 AS builder
WORKDIR /app

RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM oven/bun:1.1.36 AS runtime
WORKDIR /app

# Install build dependencies (python is needed for better-sqlite3)
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    sqlite3 \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/package.json /app/bun.lockb ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/start.ts ./
COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/server ./server

# Create a directory for the SQLite database
RUN mkdir -p /app/database
RUN mkdir -p /app/etc

# Copy the Litestream configuration to shared etc directory
COPY --from=builder /app/litestream.yml ./etc/litestream.yml

ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

# Use the volume for the SQLite database
VOLUME /app/database

CMD ["bun", "./start.ts"]