class AddIndexToPlacetypes < ActiveRecord::Migration
  def change
    add_column :placetypes, :jsindex, :string
  end
end
