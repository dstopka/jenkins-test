FROM node:14.2.0-alpine3.11
WORKDIR /app

RUN npm install -g @angular/cli

COPY ./ClientApp/package.json .
RUN npm install
COPY ./ClientApp .

RUN npm run build --prod

