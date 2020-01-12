class ApplicationController < ActionController::Base

  def devise_parameter_sanitizer
    if resource_class == User
      User::ParameterSanitizer.new(User, :user, params)
      
    elsif resource_class == Admin
      Admin::ParameterSanitizer.new(Admin, :admin, params)

    else
      super # Use the default one
    end
  end

end
