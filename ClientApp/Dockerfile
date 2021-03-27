FROM node:14.2.0-alpine3.11 AS build

WORKDIR /app

RUN npm install -g @angular/cli

COPY package.json package-lock.json ./
RUN npm install
COPY . .

RUN npm run build --prod --configuration=production

FROM nginx
RUN apt-get update && apt-get install -y curl && apt-get clean
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/ClientApp /usr/share/nginx/html
