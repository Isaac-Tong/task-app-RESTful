//Timeout function that returns a promise
//Rejects on negative numbers
//Returns the sum
const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a < 0 || b < 0){
                return reject('Numbers must be non-negative')
            }
            resolve(a + b)
        }, 1000)
    })
}

//Function that returns multiple calls of the add() function
//Returns promise
var doWork = async () => {
    var sum = await add(1, 99)
    var sum2 = await add(sum, -50)
    return sum2
}

//Run the doWork() function and after it call .then() and .catch for any errors within the async/await doWork() function
doWork().then((result) => {
    console.log(result);
    
}).catch((err) => {
    console.log(err + ' runned here');
})
