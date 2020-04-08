FROM node:12.2.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# копируем оба 'package.json' и 'package-lock.json' (если есть)
COPY package*.json ./

RUN ["npm install", \
    "npm install vue", \
    "npm install vue-resource", \
    "npm install -g json-server", \
    "npm install --save json-server"]

CMD ["npm run server", "npm run serve"]