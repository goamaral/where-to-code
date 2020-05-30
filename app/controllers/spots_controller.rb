# frozen_string_literal: true

class SpotsController < ApplicationController

  def index
  end

  private

    def name_param
      params.permit(:name)[:name] || ""
    end

end
