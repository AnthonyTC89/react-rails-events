# frozen_string_literal: true

if Rails.env === 'production'
  Rails.application.config.session_store :cookie_store, key: '_react-rails-events', domain: 'react-rails-events.herokuapp.com'
else
  Rails.application.config.session_store :cookie_store, key: '_react-rails-events'
end
