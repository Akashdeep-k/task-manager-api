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

const taskModel = mongoose.model("task", taskSchema);

module.exports = taskModel;