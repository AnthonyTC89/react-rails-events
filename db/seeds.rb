# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(username:'admin', email:'ptonyptc@gmail.com', password:'123', password_confirmation:'123', status:1 )
User.create(username:'anthony', email:'ptonyp19@hotmail.com', password:'123', password_confirmation:'123', status:2 )
User.create(username:'user0', email:'user0@gmail.com', password:'123', password_confirmation:'123', status:0 )
User.create(username:'user1', email:'user1@gmail.com', password:'123', password_confirmation:'123', status:3 )
User.create(username:'user2', email:'user2@gmail.com', password:'123', password_confirmation:'123', status:3 )
User.create(username:'user3', email:'user3@gmail.com', password:'123', password_confirmation:'123', status:3 )
User.create(username:'user4', email:'user4@gmail.com', password:'123', password_confirmation:'123', status:4 )
Event.create(title: 'Event 1 Title', description: 'Event 1 Description Description Description', date: Date.today, time: Time.now, location: 'Arequipa', status: 1, user_id: 1)
Event.create(title: 'Event 2 Title', description: 'Event 2 Description Description Description', date: Date.today-1, time: Time.now, location: 'Arequipa', status: 1, user_id: 2)
Event.create(title: 'Event 3 Title', description: 'Event 3 Description Description Description', date: Date.today+1, time: Time.now, location: 'Arequipa', status: 1, user_id: 2)
Event.create(title: 'Event 4 Title', description: 'Event 4 Description Description Description', date: Date.today+30, time: Time.now, location: 'Arequipa', status: 1, user_id: 3)