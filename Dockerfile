FROM node:20-slim

LABEL author="Maires"

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

ENTRYPOINT [ "npm", "run" ]

CMD [ "dev" ]