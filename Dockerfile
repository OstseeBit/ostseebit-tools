# build stage
# The build runs on the build machine's own architecture; the result is platform independent (static files),
# so a multi-architecture image does not have to run the Vite build under emulation.
FROM --platform=$BUILDPLATFORM node:24.18.1-alpine AS build-stage
ENV NPM_CONFIG_LOGLEVEL=warn
ENV CI=true
WORKDIR /app
# pnpm-workspace.yaml holds the dependency overrides and build permissions; without it the
# lockfile does not match and "--frozen-lockfile" aborts.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Use the pnpm version pinned in package.json ("packageManager") through corepack, like CI and local runs.
RUN corepack enable && corepack pnpm install --frozen-lockfile
COPY . .
# The build stage has no git, so the footer's version (date and commit) is passed in:
#   docker build --build-arg GIT_COMMIT_SHA=$(git rev-parse HEAD) --build-arg BUILD_DATE=$(git log -1 --format=%cs) .
ARG GIT_COMMIT_SHA=""
ARG BUILD_DATE=""
ENV VITE_GIT_COMMIT_SHA=$GIT_COMMIT_SHA \
    VITE_BUILD_DATE=$BUILD_DATE
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
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget -q --spider http://127.0.0.1:80/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
