# frozen_string_literal: true

module Api::V1
  class SessionsController < ApplicationController
    # include SessionHelper
    def create
      @user = User.find_by(email: session_params[:email])
      if @user
        if @user.authenticate(session_params[:password])
          @user.regenerate_auth_token
          render json: {
            logged_in: true,
            status: :accepted,
            user: @user,
            errors: []
          }
        else
          render json: {
            logged_in: false,
            status: :unauthorized,
            errors: ['Password invalid.', 'Try again']
          }
        end
      else
        render json: {
          logged_in: false,
          status: :not_found,
          errors: ['User invalid.', 'Try again or signup']
        }
      end
    end

    def logged_in?
      if logged_in? && current_user
        render json: {
          logged_in: true,
          user: current_user
        }
      else
        render json: {
          logged_in: false,
          message: 'no such user'
        }
      end
    end

    def destroy
      @user = User.find_by(email: session_params[:email])
      @user.regenerate_auth_token
      render json: {
        status: 200,
        logged_out: true
      }
    end

    private

    def session_params
      params.require(:user).permit(:username, :email, :password)
    end
  end
end
