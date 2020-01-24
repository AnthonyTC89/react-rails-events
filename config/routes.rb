Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'
      get '/logged_in', to: 'sessions#is_logged_in?'
      resources :users
      resources :events
      delete '/attendees/leave', to: 'attendees#leave'
      resources :attendees
    end
  end
end
