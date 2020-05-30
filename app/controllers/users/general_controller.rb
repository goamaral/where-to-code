# frozen_string_literal: true

class Users::GeneralController < ApplicationController

  before_action :authenticate_user!

  def index
  end

end
