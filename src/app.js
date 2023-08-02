const express = require("express");
require("./db/mongoose.js");
const userRouter = require("./routers/user.js");
const taskRouter = require("./routers/task.js");

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(3000, () => {
    console.log("Server is running on port " + port)
})