FROM node:18 AS build

WORKDIR /app

# Copy package files
COPY chat-frontend/package.json chat-frontend/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the frontend source code
COPY chat-frontend/ ./

# Build the project
RUN npm run build

# Use Nginx to serve static files
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
