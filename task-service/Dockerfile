FROM node:22-alpine

# 1. Set the working directory
WORKDIR /app

# 2. Copy package files first
COPY package*.json ./

# 3. Install dependencies as root (so it has permission to write node_modules)
RUN npm install

# 4. Copy your source code
COPY . .

# 5. Fix permissions for the existing 'node' user (UID 1000)
RUN chown -R node:node /app

# 6. Switch to the non-root 'node' user
USER node

EXPOSE 3001
CMD ["npm","run","dev"]