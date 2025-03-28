FROM node:18 AS builder

WORKDIR /app

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

RUN npm install --ignore-scripts --legacy-peer-deps

COPY . .

RUN npm run build-prod

FROM nginx:alpine as production

COPY default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html


