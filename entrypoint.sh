#!/bin/sh
./bin/setup
./bin/update
puma -C config/puma.rb