# frozen_string_literal: true

class Admins::GeneralController < ApplicationController

  before_action :authenticate_admin!

  def index
  end

end
