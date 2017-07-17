require 'sinatra'

class App < Sinatra::Base
  get '/' do
    @js = '<script src="Home.js"></script>'
    erb :index
  end
end
