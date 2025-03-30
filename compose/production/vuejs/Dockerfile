# Use Node.js Alpine version
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Ensure npm is installed
RUN apk add --no-cache nodejs npm

# Copy package.json and install dependencies
COPY chat-frontend/package.json chat-frontend/package-lock.json ./
RUN npm install

# Copy the rest of the app and build
COPY chat-frontend/ ./
RUN npm run build

# Use Nginx to serve Vue app
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
