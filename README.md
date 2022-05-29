# Getting started

## Installation

First time installation requires you to run `npm install` and afterwards create a .env file with required mongodb credentials.

The .env should contain the environments variables described below:

```
DB_USERNAME=username
DB_PASSWORD=password
DB_URL=mongodb url
DB_NAME=database name
```

## Run backend

After installation you can get started by running `npm start`.\
Once started open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## About

School project.\
A backend and frontend login page.\
[Click here to get to frontend](https://github.com/fplanting/node-loginpage-frontend).\
Register an account and subscribe to a newsletter, login and see your information and change status on subscription.\
All users get collected in a MongoDB database.

### Packages used

express \
express-session \
mongodb \
mongoose \
nodemon \
cors \
dotenv
