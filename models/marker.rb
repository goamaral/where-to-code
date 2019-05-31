class Marker
  include Mongoid::Document
  include Mongoid::Timestamps

  field :lat, type: Float
  field :lng, type: Float
  field :name, type: String
  field :opens_at, type: Time
  field :closes_at, type: Time
  field :has_wifi, type: Boolean
  field :has_plugs, type: Boolean
  field :up_votes, type: Integer, default: 0
  field :total_votes, type: Integer, default: 0

  validates :lat, presence: true
  validates :lng, presence: true
  validates :name, presence: true
  validates :opens_at, presence: true
  validates :closes_at, presence: true
  validates :has_wifi, presence: true
  validates :has_plugs, presence: true

  def up
    up_votes += 1
    down
  end

  def down
    total_votes += 1
    save
  end
end
