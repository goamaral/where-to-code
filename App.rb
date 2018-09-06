require 'sinatra'
require 'rubygems'
require 'sinatra/activerecord'
require 'sinatra/multi_route'

# Models
# require './Models/Marker.rb'

class App < Sinatra::Base
  register Sinatra::MultiRoute

  get '/', '/search_spots'  do
    send_file('index.html')
  end
end