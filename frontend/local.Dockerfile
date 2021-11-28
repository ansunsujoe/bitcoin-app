FROM node:16.3

WORKDIR /usr/src/cache
COPY frontend/package.json .
RUN npm install -g react-scripts
RUN npm install --force

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV NODE_PATH=/usr/src/app/node_modules/.bin

EXPOSE 3000
CMD ["npm", "start"]