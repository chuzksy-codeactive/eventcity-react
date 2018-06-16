[![Maintainability](https://api.codeclimate.com/v1/badges/9c9a7e144dfdc43d16ec/maintainability)](https://codeclimate.com/github/chuzksy-codeactive/eventcity-react/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/9c9a7e144dfdc43d16ec/test_coverage)](https://codeclimate.com/github/chuzksy-codeactive/eventcity-react/test_coverage) [![Build Status](https://travis-ci.org/chuzksy-codeactive/eventcity-react.svg?branch=jsdoc)](https://travis-ci.org/chuzksy-codeactive/eventcity-react)
[![Coverage Status](https://coveralls.io/repos/github/chuzksy-codeactive/eventcity-react/badge.svg?branch=develop)](https://coveralls.io/github/chuzksy-codeactive/eventcity-react?branch=develop)

You can view the hosted website on https://chuzksy-codeactive.github.io/andela-eventcity/template/index.html#


# Entity Relationship Diagram for this project
![](https://github.com/chuzksy-codeactive/andela-eventcity/blob/master/erm.PNG)

# EventManager is an Event Management System (EMS).
EMS is a comprehensive room scheduling software that is designed to facilitate the management of meetings and events. EventManager can be used as a solution for scheduling conference meetings and classrooms, coordinating events and room setup, assigning resources and services for an event.

# Features 
1.	Sign Up: Users interested in booking a center will have to sign up first
2.	Sign In: Users should sign in into the application to book an event for a center
3.	View Events: Users can view up coming event for a specific center
4.	Edit/Delete Events: Users are able to either edit the date scheduled for a center or delete a booked event
5.	Create Centers: Only Admin have the privilege to create a center
6.	Edit/Delete Centers: Admins can also edit or delete a center

# Why is EventManager useful?
It provides centers nearest to your location, allowing users to book events for their convenience.

# The project has 6 branches as follows:
1.	Master branch: This is the master, which is the root of all branches. It is the first level branch.
2.	Gh-pages branch: This branch is used to host the static web application into github pages
3.	UI-template branch: This is the branch for the pre-week challenge project. 
4.	Server branch: This branch is created for the 2nd week challenge, which is setting up server-side and creating API endpoints with dummy data.
5.	Sequelize-server branch: This branch is created for the 3rd week challenge, which is securing the API and integrating database using postgres and sequelize
6.	Develop branch: This is the second level branch containing ui-templates, server and sequelize-server branches

# How to setup the Sequelize-server branch.
1.	Make sure Node and npm is installed on your machine. 
2.	Click on the link below, then clone repository to your machine.
3.	Change directory into the folder, then type “npm install” on your command line interface. This will install the necessary packages.
4.	Type npm run start to host the server in your local machine, then go to any browser of your choice and type localhost:3000

# How to test for all endpoints
The following are the various API endpoints that can be tested on the server “localhost:3000”
1.	Localhost:3000/users – GET: This is to get all users that has signed up for the application
2.	Localhost:3000/users/login – POST: This endpoint handles the login functionality of the app
3.	Localhost:3000/users/ - POST: This endpoint is used to signup users
4.	Localhost: 3000/events/ - POST: This endpoint creates an event
5.	Localhost:3000/events/ - GET: This endpoint gets all the centers.
6.	Localhost:3000/events/:id – GET: This endpoint gets a single event of a specific id.
7.	Localhost:3000/centers/ - POST: This endpoint creates a center
8.	Localhost:3000/centers/:id – GET: This endpoint get a center of a specific id.

# How to run the test
In the CLI, type "npm run test". 
To view the source code for the test. check the test folder in the root directory. 

# Limitations of the project
This project is a Build-A-Product-Challenge for up coming develpers who are aspiring to become an Andela Fellow. It is a challenge to test our skills. It is not a perfect work. 
It is not a complete working web application. Each branch contains a week's challenge. You can perus the branches to check the piece work. 

# Contributors to this project
1. Ichiato Ikikin - Bootcamp Facilitator Assistant, who once told me to see this bootcamp process as a learning process. That was a very big contribution to this project outcome. Because I really learnt a lot in the process.
2. Onyekachi - Bootcamper, who has always been patient with me each time I ask for his help. 
3. Chinedu Ofor - Bootcamp Facilitator Assistant, who at the eleventh hour gave me an important feedback to work. Very insightful feedback.
4. To all bootcamper who helped me in one way or the other to solve a particular problem. Thank you.


# reset.css
reset.css |=> set of CSS rules that resets the styling of all HTML elements to a consistent baseline.
# eventcity-server
