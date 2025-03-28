FROM node:20 AS builder

RUN npm install -g --force yarn

RUN npm install -g pm2

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

#RUN yarn build

#RUN pm2 start ecosystem.config.js

CMD ["yarn","dev"]
