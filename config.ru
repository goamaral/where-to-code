require 'bundler/setup'
require 'sinatra'
require 'sinatra/activerecord'
require 'dotenv'
require 'require_all'

Dotenv.load('config/.env')

require_all "app/controllers/*.rb"
require_all "app/models/*.rb"

map '/' do
  run WebsiteController
end