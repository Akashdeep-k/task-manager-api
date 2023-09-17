
# Task Manager API


# Introduction
This repository is related to Udemy course of NodeJs: The Complete Node.js Developer Course (3rd Edition)

# Run

### Install

```
npm install
```

### Start API

```
npm start
```

# Routes

### Tasks

```
GET      /tasks
GET      /tasks/:taskid
POST     /tasks
PATCH    /tasks/:taskid
DELETE   /tasks/:taskid
```

### Users

```
GET      /users/me
POST     /users/logout
POST     /users/logoutAll
PATCH    /users/me
DELETE   /users/me
POST     /users/me/avatar
DELETE   /users/me/avatar
GET      /users/:id/avatar
```

#### Register new user

```
POST     /users
```

#### Login user

```
POST     /users/login
```