FROM ruby:2.6.5-alpine

ENV INSTALL_PATH /project

RUN mkdir $INSTALL_PATH
WORKDIR $INSTALL_PATH
COPY . $INSTALL_PATH

RUN apk --update --no-cache add make g++ postgresql-dev bash && gem install bundler && bundle install

EXPOSE 3000

ENTRYPOINT [ "./entrypoint.sh" ]