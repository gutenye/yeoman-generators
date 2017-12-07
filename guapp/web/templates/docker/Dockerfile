FROM gutenye/node

ENV GENERATE_SOURCEMAP="false"

COPY package.json yarn.lock /app/
RUN yarn
COPY . /app
RUN yarn run build

############

FROM nginx:stable

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /app/build /app

EXPOSE 80
