FROM node:22-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine

WORKDIR /app
ENV PORT=4000
COPY --from=build --chown=node:node /app/dist/frontend ./dist/frontend
USER node

EXPOSE 4000
CMD ["node", "dist/frontend/server/server.mjs"]
