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
COPY local.graphql .
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

ARG APP_FQDN

ENV NEXT_PUBLIC_APP_FQDN $APP_FQDN
ENV NODE_ENV "production"

RUN npm run build

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "run", "start"]
