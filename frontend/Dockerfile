FROM node:16.3

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

EXPOSE 3000
COPY frontend .
RUN apt-get install -y gcc make
RUN npm install --force

CMD ["npm", "start"]