const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model("task", taskSchema);

module.exports = Task;