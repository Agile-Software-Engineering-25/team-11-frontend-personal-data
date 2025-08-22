
FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm i

COPY . .

ENV PORT=8080

ENV DEBUG=*

EXPOSE 8080

CMD ["npm","run","dev"]