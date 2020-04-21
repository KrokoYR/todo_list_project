FROM node:12.2.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# копируем оба 'package.json' и 'package-lock.json' (если есть)
COPY package*.json ./

RUN ["npm install"]

CMD ["npm run dev"]