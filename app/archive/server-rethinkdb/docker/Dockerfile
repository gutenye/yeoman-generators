FROM gutenye/node

COPY package.json yarn.lock /app/
RUN yarn --prod
COPY . /app

CMD [ "npm", "start" ]
