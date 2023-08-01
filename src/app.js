const express = require("express");
require("./db/mongoose.js");
const userModel = require("./db/models/user.js");
const taskModel = require("./db/models/task.js");

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/users", (req, res) => {
    userModel.find({}).then((users) => {
        res.send(users);
    }).catch((e) => {
        res.status(500).send(e);
    });
})

app.get("/users/:userid", (req, res) => {
    const { userid } = req.params;
    userModel.findById(userid).then((user) => {
        if (!user) {
            return res.status(404).send()
        }
        res.send(user);

    }).catch((e) => {
        res.status(500).send(e);
    })
});

app.get("/tasks", (req, res) => {
    taskModel.find({}).then((tasks) => {
        res.send(tasks);
    }).catch((e) => {
        res.status(500).send(e);
    });
})

app.get("/tasks/:taskid", (req, res) => {
    const { taskid } = req.params;
    taskModel.findById(taskid).then((task) => {
        if (!task) {
            return res.status(404).send()
        }
        res.send(task);

    }).catch((e) => {
        res.status(500).send(e);
    })
});

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