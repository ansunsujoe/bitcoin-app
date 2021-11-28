FROM node:16.3

WORKDIR /usr/src/app

EXPOSE 3000
COPY frontend/package.json .
RUN npm install -g react-scripts
RUN npm install --force
ENV NODE_PATH=/usr/src/app/node_modules/.bin
CMD ["npm", "start"]