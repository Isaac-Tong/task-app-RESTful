//Testing file for JWT implementation
const jwt = require('jsonwebtoken')

var token = () => {

    //Generate a token
    var jsonToken = jwt.sign({_id: 'abcdefg'}, 'abc1313123', )
    console.log(jsonToken);
    
    //Verify a token
    const data = jwt.verify(jsonToken, 'abc1313123')
    console.log(data);
    
    //Expire token 
    //Creates "exp":1591776624 key value pair
    var jsonToken = jwt.sign({_id: 'abcdefg'}, 'abc1313123', {expiresIn: '7 days'})
    console.log(jsonToken);
}

token()