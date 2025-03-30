# Build Stage
FROM node:lts-alpine AS build-stage

# Set working directory
WORKDIR /app

# Ensure npm is installed
RUN apk add --no-cache nodejs npm

# Copy package.json and package-lock.json explicitly from chat-frontend
COPY chat-frontend/package.json chat-frontend/package-lock.json ./

# Verify the files exist (debugging step)
RUN ls -l

# Install dependencies
RUN npm install

# Copy the rest of the frontend files
COPY chat-frontend/. .

# Build Vue.js application
RUN npm run build

# Production Stage
FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
