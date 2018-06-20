require 'sinatra'
require 'rubygems'
require 'active_record'

# Database config
ActiveRecord::Base.establish_connection(
  :adapter => "sqlite3 ",
  :pool => "5",
  :timeout => "5000",
  :database => "database.sqlite3"
)

# Models
#require './Models/Marker.rb'

class ApplicationController < Sinatra::Base
  get '/' do
    send_file('index.html')
  end
end
