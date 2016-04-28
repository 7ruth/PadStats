class AddTravetimeToLocations < ActiveRecord::Migration
  def change
    add_column :locations, :traveltime, :string
  end
end
