require('./mongoose_connect')

//EXPRESS
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

//MONGO USER MODEL
const UserModel = require('./Mongoose_Models/user')
const TaskModel = require('./Mongoose_Models/tasks')

//MIDDLEWARE
const middlewareAuth = require('./Middleware/middleware')

//TOKEN BLACKLIST
const blacklist = require('./Mongoose_Models/token_blacklist')


//Middleware to prevent users from accessing some routes
// request -> do something -> run route handler
// We get access to req, res, and next
// app.use((req, res, next) => {

//     //Request Information
//     // req.method -> HTTP request method used
//     // req.path -> path requested
    

//     //Call next to execute route handler
//     //If next() is not called, route handler will not execute. 
//     next()
// })


app.use(express.json());


//Create a new user
app.post('/users', async (req, res) => {

    // Create a new user object from the model
    var thisPerson = new UserModel.model(req.body)

    try {
        await thisPerson.save()
        //Return a token
        var token = await UserModel.authorize(thisPerson._id)
        res.status(201).send(token)
    } catch (error) {
        res.status(400).send(error)
    }

    //Only runs when the user is saved. If rejected, below will no run

    // Changed into ASYNC/AWAIT 
    // thisPerson.save().then((success)=> {
    //     res.send('Saved user successfully with' + success)
    // }).catch((error) => {
    //     res.status(404).send(e)
    // })

})

//Fetch a single user
app.get('/users', middlewareAuth ,async (req, res) => {

    try {
        res.status(200).send(req.user) 
    } catch (error) {
        res.status(500).send()
    }

    // Changed into ASYNC/AWAIT 
    // UserModel.model.find({}).then((users)=>{
    //     res.send(users)
    // }).catch((error) => {
    //     res.status(500).send()
    // })
})

//Fetch a single user by ID
app.get('/users/:id', async (req, res) => {
    var _id = req.params.id

    try {
        var query = await UserModel.model.findById(_id)
        if(!query){
            return res.status(404).send()
        }
        res.send(query)

    } catch (error) {
        res.status(500).send()
    }

    // Changed into ASYNC/AWAIT 
    // UserModel.model.findById(_id).then((user) => {
    //     if(!user){
    //         return res.status(404).send()
    //     }
    //     console.log(user);
    // }).catch((error) => {
    //     res.status(500).send()
    // })
})

//Updating a user. Use PATCH
//Update parameters will be passed in through the body
app.patch('/users/:id', middlewareAuth,async (req, res) => {
    var id = req.params.id
    try {
        // Below code bypasses save middlware
        var query = await UserModel.model.findOneAndUpdate({_id: id}, req.body, {new: true, runValidators: true})
    
        res.send(query)
    } catch (error) {
        res.status(500).send()
    }
})

//Delete a user. USE DELETE
app.delete('/users/:id', middlewareAuth, async(req, res) => {
    var _id = req.params.id

    try {
        var query = await UserModel.model.findByIdAndDelete(_id,)
        if(!query){
            return res.status(404).send()
        }
        res.send(query)
    } catch (error) {
        res.status(500).send()
    }
})


//TASKS
//Create a new task 
app.post('/tasks', async (req, res) => {
    var thisTask = new TaskModel.TaskModel(req.body)

    try {
        var saved = await thisTask.save()
        res.send(saved)
    } catch (error) {
        res.status(500).send()
    }

    // Changed into ASYNC/AWAIT 
    // thisTask.save().then((success)=> {
    //     res.status(201).send('Saved task successfully with' + success)
    // }).catch((error) => {
    //     res.status(404).send(e)
    // })
})

//Fetch all tasks
app.get('/tasks', async (req, res) => {

    try {
        var allTasks = await TaskModel.TaskModel.find()
        res.send(allTasks)
    } catch (error) {
        res.status(500).send()
    }

    // Changed into ASYNC/AWAIT 
    // TaskModel.TaskModel.find().then((tasks) => {
    //     res.status(200).send(tasks)
    // }).catch((error) => {
    //     console.log(error);
    //     res.status(500).send()
    // })
})


//Fetch task by ID
app.get('/tasks/:id', async (req, res) => {
    var _id = req.params.id

    try {
        var task = await TaskModel.TaskModel.findById(_id)
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }

    // TaskModel.TaskModel.findById(_id).then((task)=>{
    //     if(!task){
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((error) => {
    //     console.log(error)
    //     res.status(500).send()
    // })
})

//Update a task by PATCH
//Update passed in through the body of the request
app.patch('/tasks/:id', async (req, res) => {
    
    var _id = req.params.id
    try {
        var query = await TaskModel.TaskModel.findOneAndUpdate(_id, req.body, {new: true, runValidators: true})
        res.send(query)
    } catch (error) {
        res.status(500).send()
    }

})

//Delete a task by DELETE
app.delete('/tasks/:id', async (req, res) => {
    var _id = req.params.id

    try {
        var query = await TaskModel.TaskModel.findByIdAndDelete(_id)
        if(!query){
            return res.status(404).send()
        }
        res.send(query)
    } catch (error) {
        res.status(500).send()
    }
})


//LOG IN AUTHENTICATION
app.post('/users/login', async(req, res) => {
    try {
        
        //Verify password and username is correct. Otherwise, catch block will run 
        const user = await UserModel.findByCredentials(req.body.email, req.body.password);

        //JWT token creation
        const token = await UserModel.authorize(user._id)

        //Return tokens
        res.send(token)
    } catch (error) {
        res.status(400).send()
    }
})

//SIGN OUT
app.post('/users/logout', middlewareAuth, async (req, res) => {

    var newToken = new blacklist({
        token: req.token,
    })
    await newToken.save();
    res.send('Sucessfully logged out')
})


app.listen(PORT)


var d 