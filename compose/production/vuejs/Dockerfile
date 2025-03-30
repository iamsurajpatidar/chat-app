# Build Stage
FROM node:lts-alpine AS build-stage
WORKDIR /app

# Copy package.json and package-lock.json separately to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy project files and build Vue.js application
COPY . .
RUN npm run build

# Production Stage - Serve with Nginx
FROM nginx:stable-alpine AS production-stage

# Copy built Vue.js app from the previous stage to Nginx web root
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
