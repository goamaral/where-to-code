# frozen_string_literal: true

class CreateSpots < ActiveRecord::Migration[6.0]

  def change
    create_table :spots do |t|
      t.string :name, null: false
      t.string :opening_hours, null: false
      t.string :closing_hours, null: false
      t.integer :network_quality, min: 0, max: 5, null: false
      t.boolean :plugs_available, null: false
      t.decimal :latitude, precision: 10, scale: 6
      t.decimal :longitude, precision: 10, scale: 6

      t.timestamps
    end
  end

end
