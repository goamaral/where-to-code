#!/bin/sh
pardino rake db:migrate

# rake assets:precompile
padrino s -p 3000 -h 0.0.0.0