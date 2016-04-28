class CreateJoinTablePlacetypeUser < ActiveRecord::Migration
  def change
    create_join_table :placetypes, :users do |t|
      # t.index [:placetype_id, :user_id]
      # t.index [:user_id, :placetype_id]
    end
  end
end
