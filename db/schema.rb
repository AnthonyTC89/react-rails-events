# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20_200_124_144_804) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'attendees', force: :cascade do |t|
    t.bigint 'user_id', null: false
    t.bigint 'event_id', null: false
    t.integer 'status'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['event_id'], name: 'index_attendees_on_event_id'
    t.index ['user_id'], name: 'index_attendees_on_user_id'
  end

  create_table 'events', force: :cascade do |t|
    t.string 'title'
    t.string 'description'
    t.date 'date'
    t.time 'time'
    t.string 'location'
    t.integer 'status'
    t.bigint 'user_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['user_id'], name: 'index_events_on_user_id'
  end

  create_table 'users', force: :cascade do |t|
    t.string 'username'
    t.string 'email'
    t.string 'password_digest'
    t.integer 'status'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.string 'auth_token'
    t.index ['auth_token'], name: 'index_users_on_auth_token', unique: true
  end

  add_foreign_key 'attendees', 'events'
  add_foreign_key 'attendees', 'users'
  add_foreign_key 'events', 'users'
end
