# Use the specific version of Node.js from an argument
ARG NODE_VERSION=20.15.0
FROM node:${NODE_VERSION}-alpine

# Set environment variables
ENV NODE_ENV=production

# Create a directory for the app
WORKDIR /usr/src/app

# Copy only the package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm uninstall \
    npm install

# Copy the rest of the source code
COPY . .

# Ensure correct permissions on node_modules/.cache
RUN mkdir -p node_modules/.cache && \
    chown -R node:node node_modules/.cache

# Expose the port that the app listens on
EXPOSE 3000

# Run the app with a non-root user
USER node

# Command to run the app
CMD ["npm", "start"]
