FROM node:14.15.4-alpine3.10

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

EXPOSE 8081

CMD [ "npm", "run", "dev" ]
