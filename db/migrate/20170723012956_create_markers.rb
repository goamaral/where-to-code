class CreateMarkers < ActiveRecord::Migration[5.1]
  def change
    create_table :markers do |t|
      t.integer :lat
      t.integer :lng
    end
  end
end
