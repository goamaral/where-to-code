# frozen_string_literal: true

class User::ParameterSanitizer < Devise::ParameterSanitizer

  def initialize(*)
    super
    permit(:sign_up, keys: [:username, :name, :email])
  end

end
