#require_all File.join(Dir.pwd, "app/helpers/*.rb")
#require_all File.join(Dir.pwd, "app/concerns/*.rb")

class ApplicationController < Sinatra::Base
  set :app_file, File.join(Dir.pwd, 'config.ru')
  set :views, File.join(root, "app/views")

  def render_view(file)
    erb file.to_sym, layout: self.layout.to_sym, locals: { view_name: file.to_sym }
  end
end