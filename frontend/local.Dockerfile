FROM node:16.3

WORKDIR /usr/src/app

EXPOSE 3000
RUN npm install --force
CMD ["npm", "start"]