# Use Node.js 18 LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev for build)
RUN npm ci

# Copy source code
COPY . .

# Build the frontend
RUN npm run build

# Remove dev dependencies to reduce image size
RUN npm prune --production

# Expose port (EasyPanel will map this)
EXPOSE 8001

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=8001

# Start the server
CMD ["node", "server/server.js"]