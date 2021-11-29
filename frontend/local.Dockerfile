FROM node:16.3

WORKDIR /usr/src/app

EXPOSE 3000
CMD ["npm", "start"]