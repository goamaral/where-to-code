class CreateMarker < ActiveRecord::Migration[5.2]
  def change
    create_table :markers do |t|
      t.string :name, :null => false, :unique => true
      t.float :lat, :null => :false
      t.float :lng, :null => false
      t.date :opens_at, :null => false
      t.date :closes_at, :null => false
      t.boolean :has_wifi, :null => false
      t.boolean :has_plugs, :null => false
      t.float :rating, :null => false
      t.integer :up_votes, :null => false
      t.integer :n_votes, :null => false
      t.references :user, :null => false
    
      t.timestamps
    end
  end
end
