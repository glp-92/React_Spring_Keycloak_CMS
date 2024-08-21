# One stage
FROM node:22-alpine
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm i -g serve
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "serve", "-s", "dist" ]

# Multi stage
# Build stage
# FROM node:22-alpine AS build
# WORKDIR /app
# COPY package.json ./
# RUN npm install
# COPY . .
# RUN npm run build
# Production stage
# FROM nginx:1.27.1-alpine AS production
# COPY --from=build /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 3000
# CMD ["nginx", "-g", "daemon off;"]