require 'bundler/setup'
require 'sinatra'
require 'rubygems'
require 'active_record'

# Models
#require './Models/Marker.rb'

get '/' do
  send_file('index.html')
end
