FROM node:22

WORKDIR /app

COPY . .
RUN npm install

EXPOSE 4200

CMD ["npm", "run", "start:dev"]