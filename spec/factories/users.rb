# frozen_string_literal: true

FactoryBot.define do
  factory :admin, class: User do
    username { 'admin' }
    email { 'admin@admin.com' }
    password { 'admin' }
    password_confirmation { 'admin' }
    status { 1 }
  end
  factory :superuser, class: User do
    username { 'superuser' }
    email { 'superuser@superuser.com' }
    password { 'superuser' }
    password_confirmation { 'superuser' }
    status { 2 }
  end
  factory :user, class: User do
    username { 'user' }
    email { 'user@user.com' }
    password { 'user' }
    password_confirmation { 'user' }
    status { 2 }
  end
end
