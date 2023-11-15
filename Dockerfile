FROM node:18-alpine

WORKDIR /usr/programming/api-aeron

COPY package*.json ./

RUN npm ci

COPY . .

# RUN npm run build

EXPOSE 3001

CMD [ "node", "dist/main.js" ]