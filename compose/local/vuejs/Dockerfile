FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json from the correct path
COPY chat-frontend/package.json chat-frontend/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the frontend source code
COPY chat-frontend/ ./

# Expose the frontend development port
EXPOSE 5173

# Start the frontend
CMD ["npm", "run", "dev"]
