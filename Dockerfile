FROM node:alpine
LABEL author=moshood
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
