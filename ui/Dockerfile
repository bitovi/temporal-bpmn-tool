FROM node:20

WORKDIR /usr/src/app

COPY src src
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY webpack.config.js webpack.config.js

RUN npm ci
RUN npm run all

CMD ["npm", "run", "dev"]