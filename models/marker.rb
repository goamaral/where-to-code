class Marker
  include Mongoid::Document
  include Mongoid::Timestamps

  field :lat, type: Float, presence: :true
  field :lng, type: Float, presence: true
  field :name, type: String, presence: true
  field :opens_at, type: Time, presence: true
  field :closes_at, type: Time, presence: true
  field :has_wifi, type: Boolean, presence: true
  field :has_plugs, type: Boolean, presence: true
  field :up_votes, type: Integer, presence: true, default: 0
  field :total_votes, type: Integer, presence: true, default: 0

  def up
    up_votes += 1
    down
  end

  def down
    total_votes += 1
    save
  end
end
