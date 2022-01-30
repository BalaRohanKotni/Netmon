FROM node:17

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /app/src

COPY package.json .

RUN npm install --silent

RUN apt-get update
RUN apt-get install -y curl
RUN curl -s https://install.speedtest.net/app/cli/install.deb.sh | bash
RUN apt install speedtest
RUN mkdir -p /data/db

COPY . .

EXPOSE 1819
CMD [ "npm", "start" ]