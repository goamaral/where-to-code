# frozen_string_literal: true

module Users

  class GeneralController < ApplicationController

    before_action :authenticate_user!

    def index
    end

  end

end
