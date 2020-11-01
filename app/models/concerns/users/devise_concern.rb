# frozen_string_literal: true

module Users

  module DeviseConcern

    extend ActiveSupport::Concern

    included do
      devise :database_authenticatable, :registerable, :confirmable, :recoverable, :rememberable, :validatable
    end

  end

end
