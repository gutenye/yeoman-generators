FROM gutenye/node

COPY package.json yarn.lock /app/
RUN yarn
COPY . /app
RUN npm run build

EXPOSE 80

CMD [ "npm", "start" ]
