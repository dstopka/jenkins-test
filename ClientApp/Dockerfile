FROM node:14.2.0-alpine3.11 AS base

WORKDIR /app
RUN npm install -g @angular/cli@^10
COPY package.json package-lock.json ./

FROM base as dependencies

RUN npm install

FROM dependencies as build

COPY . .
RUN npm run build --prod

FROM nginx:alpine as deploy

COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/ClientApp /usr/share/nginx/html
