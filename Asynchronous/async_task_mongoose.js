require('../mongoose_connect')
const User = require('../Mongoose_Models/user')
const Task = require('../Mongoose_Models/tasks')

//Function takes in the id of the task to remove then counts number of tasks
var deleteTaskCount = async (_id) => {
    
    //Returns the query of what it deleted
    var deletedTask = await Task.TaskModel.findByIdAndRemove(_id)
    
    //Counts the number of documents
    var count = await Task.TaskModel.countDocuments({})

    return count
}

//Run the deleteTaskCount() function and since it returns a promise, we can use .then() and .catch()
deleteTaskCount('5edca73ae5d47a07788735e4').then((count) => {
    console.log(count);
}).catch((error) => {
    console.log(error);
})