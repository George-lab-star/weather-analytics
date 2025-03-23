FROM node:20 AS builder

RUN npm install -g --force yarn

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

CMD ["yarn", "dev"]
