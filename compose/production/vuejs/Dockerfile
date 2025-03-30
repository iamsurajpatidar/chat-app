# Build Stage
FROM node:lts-alpine AS build-stage

# Set working directory
WORKDIR /app

# Install Node.js and npm (if not already in Alpine)
RUN apk add --no-cache nodejs npm

# Copy package.json & package-lock.json separately for better Docker caching
COPY chat-frontend/package.json chat-frontend/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY chat-frontend/. .

# Build the Vue.js application
RUN npm run build

# Debug: Check if files exist
RUN ls -lah /app/dist

# Production Stage - Serve with Nginx
FROM nginx:stable-alpine AS production-stage

# Copy built Vue.js app from previous stage to Nginx web root
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration for Vue.js SPA
COPY ./compose/production/nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
