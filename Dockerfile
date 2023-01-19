FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci


FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY tsconfig.json .
COPY postcss.config.js .
COPY tailwind.config.js .
COPY next.config.js .
COPY package.json package-lock.json* ./
COPY @types @types
COPY public public
COPY src src

FROM builder as development

EXPOSE 3000

ENV NODE_ENV "development"

ENV PORT 3000

CMD ["npm", "run", "dev"]

FROM builder AS production

ENV NODE_ENV "production"

RUN npm run build

FROM production AS runner
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]