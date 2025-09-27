# Use Node.js 18 LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the frontend
RUN npm run build

# Expose port (EasyPanel will map this)
EXPOSE 8001

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=8001

# Start the server
CMD ["node", "server/server.js"]