class CreateAddresses < ActiveRecord::Migration[5.1]
  def change
    create_table :addresses do |t|
      t.integer :country_id
      t.integer :city_id
    end
  end
end
