# Build Stage
FROM node:lts-alpine AS build-stage

# Set working directory
WORKDIR /app

# Ensure npm is installed (in case it's missing)
RUN apk add --no-cache nodejs npm

# Copy only package files to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining application files
COPY . .

# Build Vue.js application
RUN npm run build

# Production Stage
FROM nginx:stable-alpine AS production-stage

# Copy built files to Nginx serving directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
