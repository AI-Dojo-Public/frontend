# Stage 1: Builder
FROM node:18 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

# Run the production build
RUN npm run build-prod

# Stage 2: Production
FROM nginx:alpine AS production

WORKDIR /usr/share/nginx/html

# Copy custom NGINX configuration
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy built application from builder stage
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html
