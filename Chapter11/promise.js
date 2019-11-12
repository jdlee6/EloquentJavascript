/*
Promise

Analogy:
    1. A "producing code" that does something and takes time
        ie. code that loads the data over a network ("singer")

    2. A "consuming code" that wants the RESULT of the "producing code" once its read. Many functions may need that result. ("fans")
    
    3. A PROMISE is a special JS object that links the "producing code" and the "consuming code" together
        * In our analgy: this is the "subscription list"
            - the "producing code" takes whatever time it needs to produce the PROMISED RESULT & the "promise" makes that result available to ALL of the subscribed code when it's ready

Analogy is ok - but JS PROMISES are much more complex than this

The constructor syntax for a PROMISE object can be seen below:
*/


// let promise = new Promise(function(resolve, reject) {
//     // executor (the producing code aka the "singer")
// });


/*
The function passed to 'new Promise' is called the EXECUTOR

When 'new Promise' is CREATED, it runs AUTOMATICALLY
    * contains "producing code" that should eventually produce a result
    * in terms of our analogy - the executor is the "singer"
    
'resolve' & 'reject' are CALLBACKS provided by JS itself

The code inside is the EXECUTOR

When the EXECUTOR obtains the result - does NOT matter when, it should call 1 of these callbacks:
    * resolve(value) - if the job finished SUCCESSFULLY, with the result 'value'
    * reject(error) - if an error occured, 'error' is the error object

Summarize: the EXECUTOR runs AUTOMATICALLY - should do a job and then call either 'resolve' or 'reject'

The 'promise' object return by 'new Promise' constructor has internal properties:
    1. 'state'
        - initially "pending", then changes to either "fulfilled" when 'resolve' is CALLED or "rejected" when 'reject' is called

    2. 'result' - initially 'undefined', then changes to 'value' when 'resolve(value)' called or 'error' when 'reject(error)' is called

Essentially, the executor moves 'promise' to 1 of these states:

    new Promise(executor) 
    state: "pending"       -resolve(value)->    state:"fulfilled"
    result: undefined                           result: value

    new Promise(executor)
    state: "pending"       -reject(error)->     state: "rejected"
    result: undefined                           result: error

Look at the example below
*/


let promise = new Promise(function(resolve, reject) {
    // the function is executed AUTOMATICALLY when the promise is constructed

    // after 1 second, signal that the job is done with the result "done"
    setTimeout(() => resolve("done"), 1000);
})


/*
The example above is a promise constructor with a simple executor function with "producing code" that takes time (via setTimeout)

When the code above is ran:
    1. the EXECUTOR is called automatically and immediately by 'new Promise'
    2. the EXECUTOR receives 2 arguments: 'resolve' and 'reject' - these functions are predefined by JS
        * ONLY call 1 of them when ready
    
After 1 second of "processing", the executor calls 'resolve("done")' to produce the result which CHANGES the STATE of the PROMISE object

new Promise(executor)
state: "pending"        -resolve("done")->      state: "fulfilled"
result: undefined                               result: "done"
*/


// // An example of the executor REJECTING the promise with an error
// let promise = new Promise(function(resolve, reject) {
//     // after 1 second, signal that the job is finished with an error
//     setTimeout(() => reject(new Error("whoops!")), 1000);
// })


/*
The call to 'reject(...)' moves the promise object to "rejected" state

new Promise(executor)
state: "pending"        -reject(error)->        state: "rejected"
result: undefined                               result: error

Summary: the EXECUTOR should do a job (something that takes time usually) and then call 'resolve' or 'reject' to CHANGE the STATE of the corresponding PROMISE object

A promise that is either RESOLVED or REJECTED is called SETTLED as opposed to an initially PENDING promise


Important Notes
    1. There can ONLY be a SINGLE result or an error (refer to ex1)
        * 'resolve' & 'reject' expect ONLY 1 argument (or none) and will ignore additional arguments

    2. Reject with 'Error' objects
        * in case something goes wrong, the executor should call 'reject'
            - RECOMMENDED to use 'Error' objects (or objects that inherit from 'Error')

    3. Immediately calling 'resolve'/'reject'
        * in practice, an executor usually does something ASYNCHRONOUSLY and calls 'resolve'/'reject' after some time but it does NOT have to
            - we can call 'resolve'/'reject' immediately (refer to ex3)

    4. The 'state' and 'result' are INTERNAL
        * the properties 'state' and 'result' of the Promise object are INTERNAL
            * we can NOT directly access them
            * we can use the methods '.then/.catch/.finally' for that
*/


// // ex1
// let promise = new Promise(function(resolve, reject) {
//     resolve("done"); 

//     reject(new Error("...")); // IGNORED
//     setTimeout(() => resolve("...")); // IGNORED
// });


// // ex3
// let promise = new Promise(function(resolve, reject) {
//     resolve(123); // immediately gives the result: 123
// })


/*
Consumers: then, catch, finally

A promise object serves as a link between the EXECUTOR & the CONSUMING functions, which will receive the result or error

CONSUMING functions can be registered using methods .then/.catch/.finally


Then

This is the MOST fundamental one
*/


promise.then(
    function(result) { // handle a successful result // 
    },
    function(error) { //handle an error
    }
);



/*
The 1st argument of .then is a function that runs when the promise is RESOLVED and receives the result

The 2nd argument of .then is a function that runs when the promise is REJCTED and receives the error


Example: Successfully resolved promise
*/

// // look at index.html
// let promise = new Promise(function(resolve, reject) {
//     setTimeout(() => resolve("done!"), 1000);
// });

// // resolve runs the first function in .then
// promise.then(
//     result => alert(result), //shows "done!" after 1 seconds
//     error => alert(error) // this is IGNORED
// );


/*
status: pending         -->     status: fulfilled
value: undefined                value: done!
...
then goes through .then() to call result => alert(result)

NOTE how the 1st function was executed

Example: Rejection
*/


let promise = new Promise(function(resolve, reject) {
    setTimeout(() => reject(new Error("Whoops!")), 1000);
})

promise.then(
    result => alert(result), // this is IGNORED
    error => alert(error) // shows "Error: Whoops!" after 1 second
);


/*
If we're interested ONLY in successful completions, then we can provide ONLY 1 function argument to .then
*/


// let promise = new Promise(resolve => {
//     setTimeout(() => resolve("Done!"), 1000);
// });

// promise.then(alert);


/*
Catch

If we're intersted ONLY in ERRORS, then we can use 'null' as the 1st argument: 
    .then(null, errorHandlingFunction)
            or
    .catch(errorHandlingFunction)

BOTH do the exact same thing
    * the call '.catch(f)' is the SAME as '.then(null, f)'
        * basically a SHORTER version
*/


let promise = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// .catch(f) is the SAME as promise.then(null, f)
promise.catch(alert); // Shows "Error: Whoops!" after 1 second


/*
Finally

Just like there's a 'finally' clause in a regular 'try/catch', there are 'finally' in promises

The call '.finally(f)' is similar to '.then(f, f)' in the sense that 'f' always runs when the promise is settled: be it resolve or rejct

'finally' is a good handler for performing CLEAN UP
    ie. stopping our loading indicators as they are NOT needed anymore, no matter what the outcome is

    new Promise((resolve, reject) => {
        /* do something that takes time, and then call resolve/reject     
    })
        // runs when the promise is settled, doesn't matter successfully or not
        .finally(() => stop loading indicator)
        .then(result => show result, err => show error)

Differences betwewen .then(f, f) vs. .finally()
    1. a 'finally' handler has NO arguments. 
        - in 'finally', we do NOT know whether the promise is succesful or not
        * our task is usually to perform 'general' finalizing procedures

    2. a 'finally' handler passes through results and errors to the next handler
        * look at the example below
*/


// example of the result passing through 'finally' to 'then'
let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("result"), 2000)
})
    .finally(() => alert("promise ready!")) // "promise ready" is the value of result that is passed into .then
    .then(result => alert(result)); // .then handles the result


// example of a promise with an error that is passed through 'finally' to 'catch'

let promise = new Promise((resolve, reject) => {
    throw new Error("error");
})
    .finally(() => alert("Promise ready!"))
    .catch(err => alert(err)); // .catch handles the error object
    // "Error: error" is displayed in the browser


/*
This is very CONVENIENT because 'finally' is NOT meant to process a promise result so it just passes it through

'finally(f)' is a more CONVENIENT syntax than '.then(f, f)'
    - no need to DUPLICATE the function 'f'

** On settled promises handlers run immediately
    - if a promise is PENDING, '.then/catch/finally' handlers WAIT for it
    * if a promise is SETTLED, they execute IMMEDIATELY
*/


let promise = new Promise(resolve => resolve("Done!"));
promise.then(alert);


/*
Example:
    Rewrite the 'loadScript' function for loading a script from the previous chapter using Promises

        function loadScript(src, callback) {
        let script = document.createElement('script');
        script.src = src;

        script.onload = () => callback(null, script);
        script.onerror = () => callback(new Error(`Script load error for ${src}`));

        document.head.append(script);
        }
*/


function loadScript(src) {
    return new Promise(function(resolve, reject) {
        let script = document.createElement('script');
        script.src = src;

        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Script load error for ${script.src}`))

        document.head.append(script);
    });
}


// usage
let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
    script => alert(`${script.src} is loaded!`),
    error => alert(`Error: ${error.message}`)
);
promise.then(script => alert(`Another handler...`))

/*
Process of Example Above
    1. alert that the ${script.src} is loaded
    2. alerts `Another handler` following the first alert


Few benefits of Promises vs. Callback based Patterns

Promises:
    Promises allow us to do things in the natural order
        1. run loadScript(script) and '.then' we write what to do with the result
        2. we can call '.then' on a Promise as MANY times as we want
            - each time we're adding a new "fan", a new "subscribing function", to the "subscription list"
    
Callbacks:
    We must have a 'callback' function at our disposal when calling loadScript(script, callback)
        * in other words, we must know what to do with the result BEFORE 'loadScript' is called
        ** there can only be 1 CALLBACK
*/