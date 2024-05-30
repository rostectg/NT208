FROM node:20.9-alpine

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

ENTRYPOINT ["npm", "start"]