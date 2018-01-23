FROM node:8
LABEL maintainer="florian@docqube.de"

WORKDIR /app/
COPY . /app/
RUN npm install

VOLUME /app/config/
ENTRYPOINT ["npm", "start"]
