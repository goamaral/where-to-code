require 'bundler/setup'
require 'sinatra'
require 'sinatra/activerecord'
require 'dotenv'
require 'require_all'

Dotenv.load('config/.env')

# Require models and controllers
require_all "app/**/*.rb"

map '/' do
  run WebsiteController
end