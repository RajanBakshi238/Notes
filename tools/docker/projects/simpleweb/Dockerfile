# # Specify a base image
# # FROM alpine // this will not work here as this doesn't have node or npm in it.

# # so using node
# FROM node:alpine


# # Install some dependencies
# COPY ./ ./
# RUN npm install

# # Default command
# CMD ["npm", "start"]

# ABOVE ONE IS AS TUT



FROM node:alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json .

# Clear npm cache
RUN npm cache clean --force

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Default command
CMD ["npm", "start"]

