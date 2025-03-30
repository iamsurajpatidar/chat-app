# Base image
FROM node:lts-alpine AS build-stage

# Set working directory
WORKDIR /app

# Install necessary dependencies
RUN apk add --no-cache git

# Copy package.json & package-lock.json separately for better caching
COPY chat-frontend/package.json chat-frontend/package-lock.json ./
RUN npm install

# Copy the entire project
COPY chat-frontend/. .

# Build Vue.js project
RUN npm run build

FROM docker.io/nginx:1.17.8-alpine
COPY ./compose/production/nginx/default.conf /etc/nginx/conf.d/default.conf
# Copy built Vue app to Nginx html directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

