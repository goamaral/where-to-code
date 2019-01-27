class WhereToCode < Sinatra::Base
  set :public_folder => "public", :static => true

  include LayoutRenderer

  def folder_name
    'website'
  end

  get '/' do
    render_view :index
  end

  get '/search' do
    render_view :search
  end
end
