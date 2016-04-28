class CreateJoinTablePlaceUser < ActiveRecord::Migration
  def changes
    create_join_table :placetypes, :users do |t|
      # t.index [:placetype_id, :user_id]
      # t.index [:user_id, :placetype_id]
    end
  end
end
