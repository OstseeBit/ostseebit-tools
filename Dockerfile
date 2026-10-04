# build stage
FROM node:24.18.1-alpine AS build-stage
# Set environment variables for non-interactive npm installs
ENV NPM_CONFIG_LOGLEVEL warn
ENV CI true
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm i --frozen-lockfile
COPY . .
RUN pnpm build

# production stage
FROM nginx:1.27-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d \
  && touch /var/run/nginx.pid \
  && chown nginx:nginx /var/run/nginx.pid
USER nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
