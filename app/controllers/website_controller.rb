class WebsiteController < ApplicationController
  get '/' do
    erb :home, layout: 'layouts/general'.to_sym
  end

  get '/search' do
    erb :search
  end
end