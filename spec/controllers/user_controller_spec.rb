# frozen_string_literal: true

require 'rails_helper'
require 'capybara/rails'

RSpec.describe Api::V1::UsersController, type: :controller do

  describe 'GET #index' do
    before do
      DatabaseCleaner.start
      get :index
    end

    after do
      DatabaseCleaner.clean
    end

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it 'return a valid unique users on creating' do
      user = create(:user)
      expect(user.valid?).to be(true)
      superuser = create(:superuser)
      expect(superuser.valid?).to be(true)
      admin = create(:admin)
      expect(admin.valid?).to be(true)
      user = build(:user)
      expect(user.valid?).to be(false)
    end
  end
end
    # it "JSON body response contains expected users" do
    #   admin = create(:user)
    #   p "admin: #{admin}"
    #   json_response = JSON.parse(response.body)
    #   p "json_response: #{json_response}"
    #   expect(json_response.keys).to match_array([:id, :username, :email])
    # end