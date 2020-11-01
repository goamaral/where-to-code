# frozen_string_literal: true

class SpotsController < ApplicationController

  def index
    @spots = params[:name].present? ? Spot.search_by_name(params[:name]) : Spot.all
  end

  private

  def index_name_param
    params.fetch(:name)
  end

end
