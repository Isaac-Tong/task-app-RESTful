const jwt = require('jsonwebtoken')
const UserModel = require('../Mongoose_Models/user')

const middlewareAuth = async (req, res, next) => {
    try {
        
        var token = req.header('Authorization').replace("Bearer ","");
        
        //jwt.verify returns payload decoded and throws an error if token is incorrect. 
        const isAuth = jwt.verify(token, 'isaactoken1515')

        const user = await UserModel.model.findOne({_id: isAuth._id})

        //Add a property to the req object
        //This is so that we dont need to query the database a second time
        req.user = user
        req.token = token 

        next()
    } catch (error) {
        res.status(401).send('Please authenticate')
    }
}
module.exports = middlewareAuth;
