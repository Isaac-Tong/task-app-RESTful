const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
})

// 'Pre' Middleware to encrypt password before 'save' method
userSchema.pre('save', async function(next){
    
    this.password = await bcrypt.hash(this.password, 8)
    next()
})
// 'Pre' Middleware to encrypt password before 'findOneAndUpdate' method
userSchema.pre('findOneAndUpdate', async function(next){
    console.log('this is update');
    next()
})


//Create user constructor
const User = mongoose.model('User', userSchema)


//USER AUTHENTICATION
const findByCredentials = async (inputEmail, inputPassword) => {

    //First find the user
    const user = await User.findOne({email: inputEmail})
    if(!user){
        throw new Error('Email not found')
    }

    // Compare the inputPassword to queried user's password
    const isMatch = await bcrypt.compare(inputPassword, user.password)

    if(!isMatch){
        throw new Error('Password incorrect')
    }

    //Return the user object if matching password/email combination is found
    return user
}

//USER AUTHORIZATION
const userAuthorization = async (userID) => {

    //Create and return a token. Expiry time of 1 minute
    return jwt.sign({_id: userID,}, 'isaactoken1515', {expiresIn: '7d'})
}


module.exports.model = User;
module.exports.findByCredentials = findByCredentials;
module.exports.authorize = userAuthorization

