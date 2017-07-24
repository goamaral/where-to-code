class CreateMarkers < ActiveRecord::Migration[5.1]
  def change
    create_table :markers do |t|
      t.float :lat, :precision => 10
      t.float :lng, :precision => 10
      t.integer :address_id

      t.timestamps
    end
  end
end
