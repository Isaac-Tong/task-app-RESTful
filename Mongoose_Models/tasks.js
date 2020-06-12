const mongoose = require('mongoose')

const TaskModel = mongoose.model('tasks', {
    name: {
        type: String
    },
    content: {
        type: String,
    },
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
});



module.exports.TaskModel = TaskModel;
