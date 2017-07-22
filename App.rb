require 'sinatra'

class App < Sinatra::Base
  get '/' do
    erb :home
  end

  get '/location/:location' do
    @location = params[:location]
    erb :location
  end
end
