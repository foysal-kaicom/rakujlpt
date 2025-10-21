FROM node:20-alpine

WORKDIR /app

# Copy only the necessary files first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app code
COPY . .

# Expose Next.js dev server port
EXPOSE 3000

# Start the app in development mode
CMD ["npm", "run", "dev"]
