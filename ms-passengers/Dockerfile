FROM node:19-alpine3.15 AS dev

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

CMD ["yarn", "start:dev"]


FROM node:19-alpine3.15 AS prod

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY ./dist ./src

CMD ["node", "src/main.js"]
