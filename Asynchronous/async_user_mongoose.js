require('../mongoose_connect')
const User = require('../Mongoose_Models/user')
const Task = require('../Mongoose_Models/tasks')


//Accepts two parameters to find the user and update its age
//Returns a promise
var updateAgeCount = async (_id, updatedAge) => {

    //findByIdAndUpdate returns the query of what it updated.
    var user = await User.model.findByIdAndUpdate(_id, {age: updatedAge})

    //Count the number of documents given the specified age
    var count = await User.model.countDocuments({age: updatedAge})

    //Returns a promise of the count
    return count

}

//Since updateAgeCount returns a promise, can use .then() and .catch()
updateAgeCount('5edb4ad3fc566a589c3d7aae', 0).then((count) => {
    console.log(count);
    
}).catch((error) => {
    console.log(error);
})

