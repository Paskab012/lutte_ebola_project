FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# ─── Development ────────────────────────────────────────────────────────────────
FROM base AS development
RUN npm ci
COPY . .
CMD ["npm", "run", "start:dev"]

# ─── Builder ────────────────────────────────────────────────────────────────────
FROM base AS builder
RUN npm ci
COPY . .
RUN npm run build

# ─── Production ─────────────────────────────────────────────────────────────────
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist

RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001
USER nestjs

EXPOSE 3001
CMD ["node", "dist/main"]
