class Song < ApplicationRecord
  has_many :remixes, dependent: :destroy
end
