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

*/