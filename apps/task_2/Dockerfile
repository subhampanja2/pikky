# Base image with Bun
FROM oven/bun:latest AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN bun install

# Copy the rest of your application code
COPY . .

# Build the Next.js application (adjust for your build command)
RUN bun run build

# Separate image for production (optional)
FROM mongo:latest AS mongo

# Expose MongoDB port
EXPOSE 27017

# Create data directory (optional, adjust as needed)
RUN mkdir -p /data/db

# Persist data volume (optional, consider separate volume container)
VOLUME /data/db

# Start MongoDB in the foreground
CMD ["mongod", "--storageEngine", "wiredTiger"]

# Final image for running the application
FROM builder

# Copy the built Next.js application
COPY . .

# Expose Next.js port
EXPOSE 3000

# Set environment variable for MongoDB connection string (adjust format)
ENV MONGODB_URI=mongodb://mongo:27017/pikky
ENV NEXTAUTH_SECRET=asdhkjashdkjhasdjhkjs

CMD ["bun", "run", "start"]

