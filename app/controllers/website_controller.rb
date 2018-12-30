class WebsiteController < ApplicationController
  def layout
    'layouts/general'
  end

  get '/' do
    render_view :home
  end

  get '/search' do
    render_view :search
  end
end