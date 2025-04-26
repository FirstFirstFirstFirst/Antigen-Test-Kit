# ─── STAGE 1: Build ───────────────────────────────────────────────────────────
FROM node:18-alpine AS builder

# Install build dependencies for bcrypt (and any other native modules)
RUN apk add --no-cache python3 make g++ 

WORKDIR /app

# Copy and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of your source
COPY . .

# Generate Prisma client
RUN npx prisma generate

RUN npm rebuild bcrypt --build-FROM-source

# Build the Next.js app
RUN npm run build

# ─── STAGE 2: Production Image ────────────────────────────────────────────────
FROM node:18-alpine AS runner

WORKDIR /app

# Copy only prod deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy build output and runtime assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
ENV NODE_ENV=production

CMD ["npm", "run", "start"]
