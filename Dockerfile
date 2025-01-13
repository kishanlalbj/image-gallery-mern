FROM node:22.12.0-alpine AS builder

WORKDIR /app

COPY client/package.json client/yarn.lock ./

RUN yarn install --frozen-lockfile

COPY client/ ./

RUN yarn build

###

FROM node:22.12.0-alpine

WORKDIR /app

COPY server/package.json server/yarn.lock ./

RUN yarn install --production --frozen-lockfile

COPY server/ .

COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production

EXPOSE 5000

CMD ["npm", "start"]