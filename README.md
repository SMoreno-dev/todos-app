# TODOs App

This is the server-side/backend repo. You can find the client-side/frontend repo [here](https://github.com/SMoreno-dev/todos-app-client).

This project integrates a React frontend with a Node.js backend through a REST API with a PostgreSQL database.

Features include:

- Creation and authentication of users, necessary to gain access tokens.
- Authorization of actions through json web tokens.
- A feed that lists all TODO entries.
- Creation and Deletion of TODOs

## Screenshots

|                                                   |                                                       |
| :-----------------------------------------------: | :---------------------------------------------------: |
| <img width="768" alt="Todo List" src="https://user-images.githubusercontent.com/67179213/147695403-0c58e340-14b6-4170-860b-c9ce5ebc3022.png">Todo List | <img width="768" alt="Create Post" src="https://user-images.githubusercontent.com/67179213/147607856-3233beea-6a49-46bf-bc70-32bef19676ce.png">Create Post |
|<img width="768" alt="Register" src="https://user-images.githubusercontent.com/67179213/147607880-2c893599-2067-4265-ad8a-37fd2e668c54.png">Register  |      <img width="768" alt="Log In" src="https://user-images.githubusercontent.com/67179213/147607898-a5e2a24b-903d-455f-901c-0682e86398fa.png">Log In      |

## Dependencies

### Front End Dependencies

| Library Name       | Description                                      |
| ------------------ | ------------------------------------------------ |
| `react`            | Javascript library for creating user interfaces  |
| `react-dom`        | React package for working with the DOM           |
| `bootstrap`        | Open-source, front-end, responsive css framework |
| `react-router`     | Declarative routing for React                    |
| `react-router-dom` | DOM bindings for react-router                    |

### Back End Dependencies

| Library Name   | Description                                                             |
| -------------- | ----------------------------------------------------------------------- |
| `bcrypt`       | A library to help in hashing passwords                                  |
| `express`      | Web framework for Node.js                                               |
| `cors`         | Provides a Connect/Express middleware that can be used to enable CORS   |
| `pg`           | Non-blocking PostgreSQL client for Node.js                              |
| `pg-hstore`    | A module for serializing and deserializing JSON data into hstore format |
| `cross-env`    | Run scripts that set and use environment variables across platforms     |
| `dotenv`       | Loads environment variables from .env file                              |
| `jsonwebtoken` | An implementation of JSON web tokens                                    |
| `sequelize`    | Promise-based ORM tool for Node.js                                      |

### Backend Dev Dependencies

| Library Name    | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| `chai`          | BDD/TDD assertion library for node.js and the browser             |
| `chai-http`     | Provides an interface for live integration testing via superagent |
| `mocha`         | JavaScript test framework for Node.js & The Browser               |
| `nodemon`       | Simple monitor script for use during development of a node.js app |
| `sequelize-cli` | A Command Line Interface (CLI) for Sequelize                      |

## API Endpoints

| API             | VERB   | Parameters                          | Description          |
| --------------- | ------ | ----------------------------------- | -------------------- |
| /users/register | POST   | (email, password)                   | Register a new user  |
| /users/login    | POST   | (email, password)                   | Log In               |
| /todos          | GET    | none                                | List of all TODOs    |
| /todos          | POST   | (title, content, userId, completed) | Creates a new TODO   |
| /todos/:id      | PATCH  | (title, userId, content, completed) | Updates a TODO by id |
| /todos/:id      | DELETE | none                                | Deletes a TODO by id |

## Guide

### Setting up the database

Install [postgresql](https://www.postgresql.org/) locally. Then use the following command to check if the `psql` shell is working:

```
psql -U postgres
```

You won't need to create the database manually as long as you've got your environment variables set up properly.

### Setting up Node.js

Start by cloning the server-side repo:

```
git clone https://github.com/SMoreno-dev/todos-app-server
```

Then install:

1. [node](https://nodejs.org/en/)
2. [npm](https://www.npmjs.com/get-npm)

Next, `cd` to your project directory and run `npm install`

```
cd directory/server-side-project
npm install
```

You'll need to keep track of the environment variables. These are detailed in .env.example for your convenience.

```
app.listen(PORT, HOST, () => {
  console.log("Server running on port ", PORT);
});

```

Now you can simply run the server by using:

| Script  | Description                                                         |
| ------- | ------------------------------------------------------------------- |
| `start` | Runs the app in production mode                                     |
| `dev`   | Drops and creates a dev database, and runs the server using nodemon |
| `test`  | Drops and creates a test database, and runs mocha tests             |

You should be able to access the server on http://[host]:[port]/

As for the client-side, you'll need to create a new directory, and clone the other repo:

```
git clone https://github.com/SMoreno-dev/todos-app-client
```

And again, `cd` to the project directory and run `npm install`:

```
cd directory/client-side-project
npm install
```

Finally, you can run the react app with the following command:

```
npm start
```

By default, this should run the react app in http://localhost:3000/. Make sure it doesn't match your back-end port.
