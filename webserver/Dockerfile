FROM node:14.15.4
MAINTAINER Hans Hoffman

WORKDIR /usr/src/app
COPY . .

RUN yarn install

EXPOSE 8000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

RUN yarn global add nodemon
CMD /wait && nodemon ./bin/app