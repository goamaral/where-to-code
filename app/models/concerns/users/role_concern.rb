# frozen_string_literal: true

module Users

  module RoleConcern

    extend ActiveSupport::Concern

    USER_ROLE = 0
    ADMIN_ROLE = 1

    def admin?
      role == ADMIN_ROLE
    end

  end

end
