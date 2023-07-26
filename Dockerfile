FROM node:20-alpine AS deps
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
COPY local.graphql .
COPY package.json package-lock.json* ./
COPY @types @types
COPY public public
COPY src src

FROM builder as development
ARG APP_FQDN


ENV NEXT_PUBLIC_APP_FQDN $APP_FQDN
ENV NODE_ENV "development"
ENV PORT 3000

EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM builder AS production
ARG APP_FQDN

ENV NEXT_PUBLIC_APP_FQDN $APP_FQDN
ENV NODE_ENV "production"

RUN npm run build

FROM production AS runner
ARG APP_FQDN

ENV NEXT_PUBLIC_APP_FQDN $APP_FQDN
ENV NEXT_PUBLIC_COOKIE_CONSENT_BANNER $COOKIE_CONSENT_BANNER
ENV NEXT_PUBLIC_TERMLY_ID $TERMLY_ID
ENV PORT 3000

WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=production /app/public ./public

# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=production --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=production --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN chown -R nextjs:nodejs /app/.next

USER nextjs

RUN chmod +rw /app/.next

EXPOSE 3000
CMD ["node", "server.js"]
