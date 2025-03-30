# Build Stage
FROM node:lts-alpine AS build-stage

# Set working directory
WORKDIR /app

# Install Node.js and npm
RUN apk add --no-cache nodejs npm

# Copy package.json & package-lock.json separately for better caching
COPY chat-frontend/package.json chat-frontend/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY chat-frontend/. .

# Build the Vue.js application
RUN npm run build

# Debug: Ensure the files are built
RUN ls -lah /app/dist
