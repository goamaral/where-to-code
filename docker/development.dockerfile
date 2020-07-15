FROM ruby:2.6.6-alpine3.10

ENV APP_PATH /project
ENV PATH "${PATH}:${APP_PATH}/bin"
WORKDIR $APP_PATH

RUN apk add --update make g++ bash zsh git openssh postgresql-dev nodejs npm yarn \
  && apk add --update micro --repository=http://dl-cdn.alpinelinux.org/alpine/edge/testing \
  && gem install bundler \
  && echo "user:x:1000:1000::/project/docker/home:/bin/zsh" >> /etc/passwd

COPY Gemfile $APP_PATH
COPY Gemfile.lock $APP_PATH
RUN bundle install

COPY package.json $APP_PATH
COPY package-lock.json $APP_PATH
RUN npm install

COPY . $APP_PATH

USER user

CMD [ "puma" ]

EXPOSE 3000