# Specify a base image
# FROM alpine // this will not work here as this doesn't have node or npm in it.

# so using node
FROM node:alpine


# Install some dependencies
COPY ./ ./
RUN npm install

# Default command
CMD ["npm", "start"]
