FROM node:20

WORKDIR /usr/src/app

COPY src src
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY bpmn-examples bpmn-examples

RUN npm ci

CMD ["npm", "run", "start"]