class Location < ActiveRecord::Base
  belongs_to :user
  # it might be nice to have some kind of validation here
end
