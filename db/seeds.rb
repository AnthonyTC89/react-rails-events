# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae officiis temporibus libero nam hic! Libero autem quia eum beatae necessitatibus?'
admin = User.new(username: 'admin', email: 'admin@gmail.com', password: 'admin', password_confirmation: 'admin', status: 1)
admin.save
superUser = User.new(username: 'superuser', email: 'superuser@gmail.com', password: 'superuser', password_confirmation: 'superuser', status: 2)
superUser.save
User.create(username: 'user', email: 'user@gmail.com', password: 'user', password_confirmation: 'user', status: 3)
Event.create(title: 'Event 1 Title', description: lorem, date: Date.today, time: Time.now, location: 'Arequipa', status: 1, user_id: admin.id)
Event.create(title: 'Event 2 Title', description: lorem, date: Date.today - 1, time: Time.now, location: 'Puno', status: 1, user_id: admin.id)
Event.create(title: 'Event 3 Title', description: lorem, date: Date.today + 1, time: Time.now, location: 'Lima', status: 1, user_id: superUser.id)
Event.create(title: 'Event 4 Title', description: lorem, date: Date.today + 30, time: Time.now, location: 'Cusco', status: 1, user_id: superUser.id)
