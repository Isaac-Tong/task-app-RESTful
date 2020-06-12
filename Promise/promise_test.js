require('../mongoose_connect')
const User = require('../Mongoose_Models/user')
const Task = require('../Mongoose_Models/tasks')


User.model.findByIdAndUpdate('5edb4ad3fc566a589c3d7aae', {age: 0}).then((user) => {
    console.log(user);
    return User.model.countDocuments({age: 0})
}).then((result) => {
    console.log(result);
})

Task.TaskModel.deleteOne({_id: '5eda4ae4cefb8452ac778345'}).then((result) => {
    console.log(result);
    return Task.TaskModel.countDocuments({__v:0})
}).then((result) => {
    console.log(result);
})




