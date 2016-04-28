class CreateJoinTable
  User < ActiveRecord::Migration
  def change
    create_join_table :placetypes, :users do |t|
      # t.index [:place_type_id, :user_id]
      # t.index [:user_id, :place_type_id]
    end
  end
end
