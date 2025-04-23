# ------build stage-----------
FROM node:20-slim AS build
WORKDIR /ui
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ----------runtime stage-----------
FROM nginx:1.25-alpine
COPY --from=build /ui/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]