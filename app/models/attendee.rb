# frozen_string_literal: true

class Attendee < ApplicationRecord
  belongs_to :user
  belongs_to :event

  validates :user, presence: true
  validates :event, presence: true
end
