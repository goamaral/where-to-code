# frozen_string_literal: true

class Spot < ApplicationRecord

  include PgSearch::Model
  pg_search_scope :search_by_name, against: :name

end
