FROM node:14.15.5
WORKDIR /client
COPY . /client/

RUN npm install

EXPOSE 3000

CMD npm start