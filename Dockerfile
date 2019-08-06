FROM ruby:2.5.1-alpine

ENV INSTALL_PATH /project
RUN mkdir $INSTALL_PATH
WORKDIR $INSTALL_PATH
COPY . $INSTALL_PATH

# RUN echo "http://dl-cdn.alpinelinux.org/alpine/v3.5/main" >> /etc/apk/repositories
RUN apk --update --no-cache add make g++ bash && gem install bundler

VOLUME ["$INSTALL_PATH/public"]

EXPOSE 3000

ENTRYPOINT "./entrypoint.sh"