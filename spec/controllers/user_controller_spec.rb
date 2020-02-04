# frozen_string_literal: true

require 'rails_helper'
require 'capybara/rails'

RSpec.describe Api::V1::UsersController, type: :controller do

  describe 'GET #index' do
    before do
      DatabaseCleaner.start
      create(:user)
      create(:admin)
      create(:superuser)
    end

    after do
      DatabaseCleaner.clean
    end

    it "return expected all users" do
      get :index
      expect(response).to have_http_status(:success)
      json_response = JSON.parse(response.body)
      expect(json_response.size).to eq(2)
    end
  end

  describe 'GET #show' do
    before do
      DatabaseCleaner.start
    end

    after do
      DatabaseCleaner.clean
    end

    it "returns valid user" do
      user = create(:user)
      get :show, params: { id: user.id }
      expect(response).to have_http_status(:success)
      json_response = JSON.parse(response.body)
      expect(json_response['username']).to eql(user.username)
    end
  end

  describe 'POST #create' do
    before do
      DatabaseCleaner.start
      create(:admin)
    end

    after do
      DatabaseCleaner.clean
    end

    it 'return a valid post create user' do
      data = {
        user: {
          username: 'user', 
          email: 'user@user.com', 
          password: 'user', 
          password_confirmation: 'user', 
          status: 3
        }
      }
      post :create , params: data
      expect(response).to have_http_status(:success)
      json_response = JSON.parse(response.body)
      user_response = json_response['user']
      expect(user_response['username']).to eql('user')
    end
    
    it 'return a invalid user' do
      data = {
        user: {
          username: 'admin', 
          email: 'admin@admin.com', 
          password: 'admin', 
          password_confirmation: 'admin', 
          status: 1
        }
      }
      post :create , params: data
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe 'PATCH/PUT #update' do
    before do
      DatabaseCleaner.start
    end

    after do
      DatabaseCleaner.clean
    end

    it 'return an accepted update user' do
      user = create(:user)
      put :update, params: { id: user.id, user: { username: 'updated' }}
      expect(response).to have_http_status(:success)
      json_response = JSON.parse(response.body)
      expect(json_response['username']).to eql('updated')
    end
  end

  describe 'DELETE #destroy' do 
    before do
      DatabaseCleaner.start
    end

    after do
      DatabaseCleaner.clean
    end
    
    it 'return an accepted update user' do
      user = create(:user)
      delete :destroy, params: {id: user.id}
      expect(response).to have_http_status(:success)
      user = build(:user)
      expect(user.valid?).to be(true)
    end
  end
end
