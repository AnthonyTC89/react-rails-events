# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(username:'admin', email:'ptonyptc@gmail.com', password:'admin123', password_confirmation:'admin123', status:1 )
User.create(username:'anthony', email:'ptonyp19@hotmail.com', password:'123456', password_confirmation:'123456', status:2 )
User.create(username:'user', email:'user@gmail.com', password:'123456', password_confirmation:'123456', status:3 )