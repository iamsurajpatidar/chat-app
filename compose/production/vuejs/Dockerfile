# Build Stage
FROM node:lts-alpine AS build-stage

# Set working directory
WORKDIR /app

# Install dependencies separately for better caching
COPY chat-frontend/package.json chat-frontend/package-lock.json ./
RUN npm install

# Copy the rest of the frontend files
COPY chat-frontend/. .

# Build Vue.js application
RUN npm run build

# Production Stage - Serve with Nginx
FROM nginx:stable-alpine AS production-stage

# Copy built Vue.js app from the previous stage to Nginx web root
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration for Vue.js SPA
COPY ./compose/production/nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
