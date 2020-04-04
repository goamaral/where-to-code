# frozen_string_literal: true

class PlatformController < ApplicationController

  before_action :authenticate_user!

  def index
  end

end
