class User < ActiveRecord::Base
  has_secure_password
  validates :email, presence: true, uniqueness: true

  has_many :locations, dependent: :destroy
  has_and_belongs_to_many :placetypes

end
