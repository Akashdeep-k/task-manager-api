const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/db/models/user.js");
const Task = require("../../src/db/models/task.js");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: "mike",
    email: "mike@example.com",
    password: "mypasswd",
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET_KEY)
    }]
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: "john",
    email: "john@example.com",
    password: "myhostel077",
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET_KEY)
    }]
};

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: "First task for first user",
    completed: false,
    author: userOneId
}
const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: "Second task for first user",
    completed: true,
    author: userOneId
}
const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: "First task for second user",
    completed: true,
    author: userTwoId
}

const setupDatabase = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
}

module.exports = {
    setupDatabase,
    userOneId,
    userOne, 
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree
}