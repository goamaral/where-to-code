#!/bin/sh
rm Gemfile.lock
bundle install

pkill -F /project/tmp/pids/server.pid
rm /project/tmp/pids/server.pid

# rake assets:precompile
padrino s -p 3000 -h 0.0.0.0