/*
Promises Chaining


Let's return to the problem mentioned in callbacks_intro.js
    * we have a sequence of asynchronous tasks to be done 1 after another
        ie. loading scripts
            * How do we code this WELL?

Promises provide a couple of recipes to do this..
    * A solution is to implement promise chaining
*/


new Promise(function(resolve, reject) {

    setTimeout(() => resolve(1), 1000); // (*)

}).then(function(result) { // (**)

    alert(result); // 1
    return result * 2;

}).then(function(result) {// (***)

    alert(result); // 2
    return result * 2;

}).then(function(result) {

    alert(result); // 4
    return result * 2;

});


/*
The idea is that the result is passed through the chain of .then() handlers

The flow:
    1. Initial promise resolves in 1 second (*)
    2. Then the .then handler is called (**)
    3. The value that it returns is passed to the next .then handler (***)
    4. ... and so on 

As the result is passed along the chain of handlers, we can see a sequence of 'alert' calls:
        1 --> 2 --> 4

* A call to 'promise.then' returns a promise so that we can call the next '.then' on it
    * Promise.then() returns another Promise (this is how promise chaining works)
    *** Adding many .then() to a SINGLE promise object is NOT chaining

Look at the example below
*/


let promise = new Promise(function(resolve, reject) {
    setTimeout(() => resolve(1), 1000);
});

promise.then(function(result) {
    alert(result);
    return result * 2;
});

promise.then(function(result) {
    alert(result);
    return result * 2;
});

promise.then(function(result) {
    alert(result);
    return result * 2;
});


/*
NOTE how the example above only just alerts the result from the initial 'new Promise(...)' (where value = 1)
    * the promises do NOT chain together and do NOT pass the result to each other (only processes it independtly)
    - All .then on the same promise get the SAME result - the result of the initial promise which is why each alert shows 1


Returning Promises

A handler used in '.then(handler)' may create and return a promise
    - further handlers wait UNTIL it SETTLES and then gets its result

Look at the example below
*/


new Promise(function(resolve, reject) {

    setTimeout(() => resolve(1), 1000);

}).then(function(result) {

    alert(result); // 1

    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(result*2), 1000);
    });

}).then(function(result) { // (**)
    
    alert(result); // 2

    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(result * 2), 1000);
    });

}).then(function(result) {

    alert(result); // 4

});


/*
Explanation:
    1. The 1st .then shows 1 and returns 'new Promise(...)' @ (*)
    2. After 1 sec it resolves and the result (the argument of 'resolve' or (result * 2) is passed on to handler of the 2nd .then @ (**))
    3. That handler does the same exact thing 

The output is the same as the first example but now there is a 1 second delay between the alert calls

Returning promises allow us to build chains of ASYNC actions


Example: loadScript

Let's use this feature with the promisified 'loadScript' to load scripts 1 by 1
*/


import { loadScript } from './loadscript.js';

loadScript("/article/promise-chaining/one.js")
    .then(function(script) {
        return loadScript("/article/promise-chaining/two.js");
    })
    .then(function(script) {
        return loadScript("/article/promise-chaining/three.js");
    })
    .then(function(script) {
        // use functions declared in scripts
        // to show that they indeed loaded
        one();
        two();
        three();
    });


// simplify the code with arrow functions
loadScript("/article/promise-chaining/one.js")
    .then(script => loadScript("/article/promise-chaining/two.js"))
    .then(script => loadScript("/article/promise-chaining/three.js"))
    .then(script => {
        // scripts are loaded FIRST, then we can use functions declared in scripts
        one();
        two();
        three();
    });


/*
Explanation

* each 'loadScript' call returns a promise -> the next .then() runs when it resolves -> which initiates the loading of the next scripts -> so the scripts are loaded 1 after another

we can add MORE ASYNC actions to the chain
    - the code is still 'FLAT' (grows down, NOT to the right) 
    * this is good b/c there are NO signs of callback hell

we can also add .then DIRECTLY to each loadScript call as well
*/


loadScript("/article/promise-chaining/one.js").then(script1 => {
    loadScript("/article/promise-chaining/two.js").then(script2 => {
        loadScript("/article/promise-chaining/three.js").then(script3 => {
            // this function has access to variables script1, script2 and script 3
            // the functions are being called from each respective module
            one();
            two();
            three();
        });
    });
});


/*
This code does the SAME
    - loads 3 scripts in sequence
    * NOTE how it "grows to the right" (this is BAD)

Chaining is PREFERRED

Exception
    - sometimes its ok to write '.then' directly because the nested function has access to the outer scope
    * in the example above, the MOST nested callback has access to ALL variables script1, script2, script3


Thenables

* A handler may return NOT exactly a promise but a so-called 'thenable' obejct - an ARBITRARY object that has a method .then
    * these are treated the SAME way as a promise

3rd part libraries may implement "promise-compatible" objects of their own
    - can have extended set of methods but also be compatible with native promises because they implement '.then'

Look at the example below
*/


class Thenable {
    constructor(num) {
        this.num = num;
    }

    then(resolve, reject) {
        alert(resolve); // function() { native code }
        setTimeout(() => resolve(this.num * 2), 1000); // (**)
    }
}

new Promise(resolve => resolve(1))
    .then(result => {
        return new Thenable(result); // (*)
    })
    .then(alert); // shows 2 after 1000 ms


/*
Explanation

JS checks the object returned by the .then handler in line (*): if it has a callable method named 'then', then it calls that method providing NATIVE functions 'resolve', 'reject' as arguments (similar to an executor) and waits until 1 of them is called

In the example above:
    - resolve(2) is called after 1 second (**) & then the result is passed further down the chain
    * feature allows us to integrate custom objects with promise chains without having to inherit from Promise


Bigger Example: Fetch

In frontend development - promises are OFTEN used for network requests

'fetch' method will be used to LOAD information about the user from the remote server
*/


let promise = fetch(url);


/*
this makes a network request to the url and returns a PROMISE
    - the promise resolves with a RESPONSE object when the remote server responds with headers but BEFORE the full response is downloaded

To read the full response, we should call the method 'response.text()'
    - this returns a promise that resolves when the full text is downloaded from the remote server, with that text as a result

Look at the code below
*/


fetch('/article/promise-chaining/user.json')
    // .then below runs when the remote server RESPONDS
    .then(function(response) {
        // reponse.text() returns a NEW promise that resolves with the full response text when it loads
        return response.text();
    })
    .then(function(text) {
        // ... and here's the content of the remote file
        alert(text); // {"name": "iliakan", isAdmin: true}
    })


/*
There is also a method 'response.json()' that reads the remote data and pases it as JSON
    * this would be even more convenient
*/


fetch('/artcle/promise-chaining/user.json')
    .then(response => response.json())
    .then(user => alert(user.name)); // iliakan, got user name


// Let's do something with the loaded user
fetch('/article/promise-chaining/user.json')
    // load it as json
    .then(response => response.json())
    // make a request to github
    .then(user => fetch(`https://api.github.com/user/${user.name}`))
    // load the response as json
    .then(response => response.json())
    // show the avatar image (githubUser.avatar_url) for 3 seconds
    .then(githubUser => {
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = "promisee-avatar-example";
        document.body.append(img);

        setTimeout(() => img.remove(), 3000); // (*)
    })


/*
The code above works but there is a typical error of those who begin to use promises
    Look at the line (*) - how can we do something after the avatar has finished showing and gets removed?
        ie. we'd like to show a form for editing that user or something else

To make the chain extendable, we need to return a promise that resolves when the avatar finishes showing

Look at the example below
*/


fetch('/article/promise-chaining/user.json')
    .then(response => response.json())
    .then(user => fetch(`https://api.github.com/user/${user.name}`))
    .then(response => response.json())
    .then(githubUser => new Promise(function(resolve, reject) { // (*)
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => {
            img.remove();
            resolve(githubUser); // (**)
        }, 3000);
    }))
    .then(githubUser => alert(`Finished showing ${githubUser.name}`));


/*
.then handler @ (*) now returns a 'new Promise' that becomes settled only AFTER the call of 'resolve(githubUser)' in setTimeout (**)

The next .then in chain will WAIT for that

Good practice:
    Async actions should ALWAYS return a promise
        - makes it possible to plan actions after it (even if we don't plan to extend the chain now, we many need it later)

Let's refactor the code a bit to make it into reusable functions
*/


function loadJson(url) {
    return fetch(url)
        .then(response => response.json());
}

function loadGithubUser(name) {
    return fetch(`https://api.github.com/users/${name}`)
        .then(response => response.json());
}

function showAvatar(githubUser) {
    return new Promise(function(resolve, reject) {
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => {
            img.remove();
            resolve(githubUser);
        }, 3000);
    })
}

// Use the functions
loadJson('article/promise-chaining/user.json')
    .then(user => loadGithubUser(user.name))
    .then(showAvatar)
    .then(githubUser => alert(`Finished showing ${githubUser.name}`))
    // ...


/*
Summary

if a .then (or .catch/.fiinally) handler returns a promise, the rest of the chain WAITS until it settles
    - when it does, its result (or error) is PASSED further
*/