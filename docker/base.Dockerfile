FROM ruby:2.5.1-alpine

ENV INSTALL_PATH /project
RUN mkdir $INSTALL_PATH
WORKDIR $INSTALL_PATH
COPY . $INSTALL_PATH

RUN apk --update --no-cache add make g++ bash && gem install bundler && bundle install

EXPOSE 3000