module LayoutRenderer
  def render_view(file)
    erb "#{folder_name}/#{file}".to_sym, layout: self.layout.to_sym, locals: { view_name: file.to_sym }
  end

  def layout
    "#{folder_name}/layout"
  end

  def folder_name
    self.class.name.underscore
  end

  def action_stylesheet(action_name)
    css_file_location = "/css/#{folder_name}/#{action_name}.css"

    if File.exists? File.join(settings.public_folder, css_file_location)
      "<link rel='stylesheet' href='#{css_file_location}' type='text/css'>"
    end
  end
end