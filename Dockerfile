# build stage
FROM node:24.18.1-alpine AS build-stage
ENV NPM_CONFIG_LOGLEVEL=warn
ENV CI=true
WORKDIR /app
# pnpm-workspace.yaml holds the dependency overrides and build permissions; without it the
# lockfile does not match and "--frozen-lockfile" aborts.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Use the pnpm version pinned in package.json ("packageManager") through corepack, like CI and local runs.
RUN corepack enable && corepack pnpm install --frozen-lockfile
COPY . .
RUN corepack pnpm build

# production stage
FROM nginx:1.27-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY security-headers.conf /etc/nginx/snippets/security-headers.conf
RUN chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d \
  && touch /var/run/nginx.pid \
  && chown nginx:nginx /var/run/nginx.pid
USER nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
