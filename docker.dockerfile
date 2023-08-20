FROM node:16 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration=production

FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d/

COPY --from=builder /app/dist/rattrapage /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
