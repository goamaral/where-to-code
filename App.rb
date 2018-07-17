require 'sinatra'
require 'rubygems'
require 'sinatra/activerecord'

# Models
#require './Models/Marker.rb'

class App < Sinatra::Base
  get '/' do
    send_file('index.html')
  end
end