# Use Node.js for building
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source files and build the project
COPY . .
RUN npm run build

# Use a lightweight HTTP server (Caddy) for serving Vue.js app
FROM caddy:2.6.2-alpine
COPY --from=build /app/dist /usr/share/caddy
EXPOSE 80
