FROM node:22

WORKDIR /app

COPY . .
RUN npm install
RUN npx prisma db push

EXPOSE 4200

CMD ["npm", "run", "start:dev"]