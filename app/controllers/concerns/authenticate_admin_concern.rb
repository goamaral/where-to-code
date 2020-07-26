# frozen_string_literal: true

module AuthenticateAdminConcern
  
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_admin!
  end

  private

    def authenticate_admin!
      authenticate_user!
      redirect_to root_path unless current_user.admin?
    end

end
