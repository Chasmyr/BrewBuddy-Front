FROM node:20.11.1-alpine

# Create app directory
WORKDIR /app

# Copy all files from the frontend folder to the container
COPY . .

# Delete the node_modules folder and package-lock.json file
RUN rm -rf node_modules package-lock.json

# Install all dependencies
RUN npm install

# Build the app
RUN npm run build

# Install serve
RUN npm install -g serve

# Expose the port
EXPOSE 5173

# Start the app
CMD ["npm", "run", "start"]