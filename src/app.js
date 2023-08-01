const express = require("express");
require("./db/mongoose.js");
const userModel = require("./db/models/user.js");
const taskModel = require("./db/models/task.js");

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json()) 

app.post("/users", (req, res) => {
    const user = new userModel(req.body);

    user.save().then(() => {
        res.status(201).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

app.post("/tasks", (req, res) => {
    const task = new taskModel(req.body);

    task.save().then(() => {
        res.status(201).send(task);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

app.listen(3000, () => {
    console.log("Server is running on port " + port)
})