require_all File.join(Dir.pwd, "app/helpers/*.rb")

class ApplicationController < Sinatra::Base
  set :app_file, File.join(Dir.pwd, 'config.ru')
  set :views, File.join(root, "app/views")

  include HtmlHelpers
end