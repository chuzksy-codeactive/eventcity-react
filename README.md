[![Maintainability](https://api.codeclimate.com/v1/badges/9c9a7e144dfdc43d16ec/maintainability)](https://codeclimate.com/github/chuzksy-codeactive/eventcity-react/maintainability)  [![Build Status](https://travis-ci.org/chuzksy-codeactive/eventcity-react.svg?branch=develop)](https://travis-ci.org/chuzksy-codeactive/eventcity-react) [![Coverage Status](https://coveralls.io/repos/github/chuzksy-codeactive/eventcity-react/badge.svg?branch=feature%2F159032001%2Fe2e-test)](https://coveralls.io/github/chuzksy-codeactive/eventcity-react?branch=feature%2F159032001%2Fe2e-test)  [![codecov](https://codecov.io/gh/chuzksy-codeactive/eventcity-react/branch/staging/graph/badge.svg)](https://codecov.io/gh/chuzksy-codeactive/eventcity-react)

# EventCity
EventCity is a comprehensive room scheduling software that is designed to facilitate the management of meetings and events. EventManager can be used as a solution for scheduling conference meetings and classrooms, coordinating events and room setup, assigning resources and services for an event.

# Entity Relationship Diagram for this project
![](https://github.com/chuzksy-codeactive/andela-eventcity/blob/master/erm.PNG)

## [](https://github.com/chuzksy-codeactive/eventcity-react/#table-of-contents)Table of Contents

-   [Features](https://github.com/chuzksy-codeactive/eventcity-react/#features)
-   [Technologies](https://github.com/chuzksy-codeactive/eventcity-react/#technology)
-   [Installation and Setup](https://github.com/chuzksy-codeactive/eventcity-react/#installation-and-setup)
-   [Limitations](https://github.com/chuzksy-codeactive/eventcity-react/#limitations)
-   [How to Contribute](https://github.com/chuzksy-codeactive/eventcity-react/#how-to-contribute)
-   [API Endpoints](https://github.com/chuzksy-codeactive/eventcity-react/#api-endpoints)
-   [Questions and Support](https://github.com/chuzksy-codeactive/eventcity-react/#questions-and-support)
-   [License](https://github.com/chuzksy-codeactive/eventcity-react/#license)

## Features

EventCity has the following features:
> **SignUp:** Users interested in booking a center will have to sign up first
> **Sign In:** Users should sign in into the application to book an event for a center
> **View Events:** Users can view up coming event for a specific center
> **Edit/Delete Events:** Users are able to either edit the date scheduled for a center or delete a booked event
> **Create Centers:** Only Admin have the privilege to create a center
> **Edit/Delete Centers:** Admins can also edit or delete a center
## Technology

eventCity is built majorly with Model-View-Controller and Middleware patterns and architecture. It is built with the following technologies and tools:

> eventCity is built with  **JavaScript es6**
>**Express.js**: Express.js is a web application framework for Node.js. It provides various features that make web application development fast and easy.
>**ReactJS**: React is a front-end library that is used for handling the view layer of web and mobile applications.
> **Redux**: Redux is a predictable state container for JavaScript apps. It helps applications that behave consistently.
>**PostgreSQL**: PostgreSQL is a powerful, open source object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads.
>**Sequelize ORM**: Sequelize is an ORM which is designed to work with Node.JS. It supports many major database engines.

## Installation and Setup
1.  Make sure [nodejs](https://nodejs.org/) is installed on your system.
2.  Clone the repository:
```
git clone  hhttps://github.com/chuzksy-codeactive/eventcity-react.git
```
2.  Change directory into the cloned repository directory using:
```
cd eventcity-react  
```
3.  Install dependencies:
```
npm install  
```
4.  Install PostgreSql username and database.  [Getting Started with PostgreSQL](https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb).
5.  Rename  **.env-example**  to  **.env**  and modify appropriately.
6.  Install  **sequelize-cli**  globally and run migrations
```
npm install -g seqeulize-cli  
&& sequelize db:migrate  
```
9.  **To start the application for development, run**
```
npm run start  -To start node application server.
npm run start:client:dev  -To Frontend development server.
```
## Testing

To run the automated test for the project. Run either of the commands below in your terminal for either backend test or frontend test.

For backend test, run  `npm run test`  on the terminal. For frontend test run  `client:test`  on the terminal.

## Limitations

This is an open source project that is open to your contribution. Currently, the following limitation exist within the application:

-   Payment System is not implemented .
-   The user can not edit their profile after signing up.
    
## How to Contribute

You can contribute to this project by:

1.  **Fork**  this repository.
2.  Follow  [Installation and Setup](https://github.com/chuzksy-codeactive/eventcity-react/#installation-and-setup)  steps.
3.  Create a your  **_feature branch_**  off the  **_master branch_**.
4.  Make changes and Commit following this recommended commit message format.
5.  Raise a pull request against  **_develop branch_**.

**Note:**  It is recommended to use  [airbnb style guide](https://github.com/airbnb/javascript)  coding convention when contributing to this codebase.

## API Endpoints

See  [API Documentation](https://eventcity.herokuapp.com/api-docs)

## Questions and Support

> This project has been developed in highly modularized fashion. Thus, each components can be broken down and tested separately.  
> For questions and support, you can contact the author [Onuchukwu Chika](mailto:onuchukwu.chika@andela.com)

## License

Licensed under the [MIT License](https://github.com/chuzksy-codeactive/eventcity-react/blob/staging/LICENSE)  Copyright (c) 2018 chuzksy
