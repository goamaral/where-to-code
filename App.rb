require 'sinatra'

class App < Sinatra::Base
  get '/' do
    @js = '<script src="js/Home.js"></script>'
    erb :index
  end

  get '/location/:location' do
    @location = params[:location]
    @js = ""
    erb :location
  end
end
