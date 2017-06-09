FROM node:7.8.0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install
RUN npm run build

COPY . /usr/src/app

EXPOSE 8080
CMD [ "npm", "start" ]