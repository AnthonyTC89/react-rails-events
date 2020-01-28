<p align="center">
  <h1 align="center">REACT RAILS EVENTS</h1>

  <p align="center">
    Project Create with React and RailsAPI
    <br>
    <br>
    <a href="https://react-rails-events.herokuapp.com/" target="_blank">Live Demo</a>
    .
    <a href="https://github.com/AnthonyTC89/react-rails-events/issues">Report Bug</a>
    ·
    <a href="https://github.com/AnthonyTC89/react-rails-events/issues">Request Feature</a>
  </p>
</p>


<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Installation](#installation)

<!-- ABOUT THE PROJECT -->
## About The Project

Based on the [PROJECT: HCIE App UI/UX Design](https://www.behance.net/gallery/71179603/HCIE-App-UIUX-Design) as a part of the Final Capstone in Microverse curriculum.

This App is designed for mobile, but it's possible to use in Desktop.

The purpose is to get:
- A real-world-like project, built with business specifications.
- Get feedback about the achievement of technical and soft skills.

The following are actions that can be done on the application.
  1. Create an Account and Login in to the App. 
  2. See all the upcoming events such a common user.
  3. Update your Account with different username and password.
  4. Join in Events and filter them.
  5. Ask for an upgrade of the Account.
  6. As a SuperUser. It's posible to create events and edit them.
  7. There is an Admin User who can Delete Users and Events.
  8. Logout from the App.

### Built With
* [JavaScript](https://www.javascript.com/)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Ruby](https://www.ruby-lang.org/en/)
* [RailsAPI](https://rubyonrails.org/)

### Pre-Installation
  1. npm version 6.13.4 or lastest
  2. node version 8.17.0 or more
  3. ruby version 2.6.5 or more
  4. rails version 6.0.2.1 or more

### Installation
  1. clone the repository [react-rails-events](https://github.com/AnthonyTC89/react-rails-events)
  2. cd in to the folder and run `bundle install`
  3. run `rails db:create && rails db:migrate && rails db:seed`
    * (If there are problems with the service of postgresql check DB Section) 
  4. cd in to /client folder and run `npm install`
  5. return to root folder and run `rails start`
  6. wait until both servers will be initialized
  7. go to [localhost:3000](http://localhost:3000)

### DataBase Setup
  1. Run: `sudo apt-get update && sudo apt-get install postgresql`
  2. Run: `sudo service postgresql start`
  2. Run: `sudo -i -u postgres`
  3. Run: `psql`
  4. Run: `CREATE USER rails with encrypted password 'rails';` (with semicolon)
  5. Run: `ALTER USER rails createdb;` 

### Contact

* **[Anthony Tapia Cossio](https://github.com/AnthonyTC89) - [Linkedin](linkedin.com/in/anthony-tapia-cossio) - [Twitter](https://twitter.com/ptonypTC)**
