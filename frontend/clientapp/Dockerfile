FROM node:22-alpine
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm i -g serve
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "serve", "-s", "dist" ]

# FROM node:22-alpine AS build
# WORKDIR /app
# COPY package.json ./
# RUN npm install
# ENV PATH /app/node_modules/.bin:$PATH
# COPY . .
# RUN npm run build
# FROM nginx:1.27.1-alpine
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=build /app/dist /var/www/html/
# EXPOSE 3000
# ENTRYPOINT ["nginx","-g","daemon off;"]