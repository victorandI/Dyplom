# frontend/Dockerfile

FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci || npm install

# Copy the rest of the application
COPY . .

EXPOSE 3000

# Start the application
CMD ["npm", "start"]