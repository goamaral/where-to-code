class CreateSpots < ActiveRecord::Migration[6.0]
  def change
    create_table :spots do |t|
      t.text :name, null: false
      t.time :opening_hours, null: false
      t.time :closing_hours, null: false
      t.integer :network_quality, min: 0, max: 5, null: false
      t.boolean :plugs_available, null: false

      t.float :rating, null: false, default: 0
      t.datetime :rating_expires_at, default: nil

      t.decimal :latitude, precision: 10, scale: 6
      t.decimal :longitude, precision: 10, scale: 6

      t.timestamps
    end
  end
end
