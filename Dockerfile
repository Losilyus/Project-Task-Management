FROM node:16-alpine

WORKDIR /app

COPY . .

COPY ./package.json /

RUN npm install

CMD npm start