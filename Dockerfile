# Build stage
FROM node:18-alpine AS build

# Set environment variables for build
ENV NODE_ENV=development

WORKDIR /app

# Install system dependencies needed for build
RUN apk update && apk add --no-cache \
    python3 \
    make \
    g++ \
    && rm -rf /var/cache/apk/*

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm ci --verbose

# Copy source code and build
COPY . .
RUN npm run build && \
    ls -la dist/ && \
    echo "Build completed successfully"

# Production stage
FROM node:18-alpine AS production

# Environment variables
ENV NODE_ENV=production \
    PORT=8001

WORKDIR /app

# Install only runtime system dependencies
RUN apk update && apk add --no-cache \
    curl \
    && rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production --no-audit && \
    npm cache clean --force

# Copy built application from build stage
COPY --from=build /app/dist ./dist

# Copy server files (since we don't have TypeScript compilation for server)
COPY server ./server

# Set permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 8001

# Enhanced health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
    CMD curl -f http://localhost:8001/api/status || exit 1

# Start application
CMD ["node", "server/server.js"]