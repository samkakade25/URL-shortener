FROM node:20

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 5173

# Modified command to explicitly bind to 0.0.0.0
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]