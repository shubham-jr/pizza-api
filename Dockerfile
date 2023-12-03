FROM node:18-alpine 

WORKDIR /usr/app

COPY ./package.json ./

RUN npm install --fetch-timeout=600000

COPY . .

EXPOSE 4000

CMD [ "npm","start" ]


