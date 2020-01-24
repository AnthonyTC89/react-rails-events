class Event < ApplicationRecord
  belongs_to :user
  has_many :attendees
  has_many :users, :through => :attendees
  
  validates :title, presence: true, length: { minimum: 4 }
  validates :description, presence: true, length: { minimum: 4 }
  validates :date, presence: true
  validates :location, presence: true
end
