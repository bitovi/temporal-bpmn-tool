FROM node:20

WORKDIR /usr/src/app

COPY src src
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci

CMD ["npm", "run", "start"]