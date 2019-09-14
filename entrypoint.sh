#!/bin/sh
padrino rake mi:create_indexes

# rake assets:precompile
padrino s -p 3000 -h 0.0.0.0