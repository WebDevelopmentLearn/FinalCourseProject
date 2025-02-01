FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install && npm install -g nodemon
#     && npm install -g typescript && npm install bcrypt
COPY . .
EXPOSE 3400
CMD ["npm", "run", "dev"]