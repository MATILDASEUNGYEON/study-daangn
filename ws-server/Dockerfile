FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci && \
    chmod -R +x node_modules/.bin

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["node", "dist/index.js"]
