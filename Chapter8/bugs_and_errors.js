/*
Bugs and Errors


Strict Mode

JS can be a little stricter by enabling 'strict mode'
    * This is done by putthing "use strict" (with quotes) at the TOP of a file or a function body
*/


// function problem() {
//     // without this, the function runs fine
//     // "use strict";
//     for (counter = 0; counter < 10; counter++) {
//         console.log("Happy happy");
//     }
// }

// problem();
// // ReferenceError: counter is not defined


/*
Normally, when you FORGET the 'let' in front a binding, JS quietly creates a GLOBAL binding and uses that
*/


// // 'counter' is accessed as a GLOBAL variable when it is within the function problem's scope
// console.log(counter);
// // 10


/*
Strict mode - an error is reported instead
    * very helpful
    * does NOT work when the binding in question EXISTS as a GLOBAL binding

Another change in strict mode is that the 'this' binding holds the value 'undefined' in functions that are NOT called as methods
    * when you call w/o 'strict mode', 'this' refers to the GLOBAL scope object which is an object whose properties are the GLOBAL bindings

    * if you call a METHOD or CONSTRUCTOR incorrectly in strict mode, JS will produce an error as soon as it tries to read 'this'

Example below:
    * calls a constructor function without 'new' keyword so that its 'this' will NOT refer to a newly constructed object
*/


// function Person(name) { this.name = name; }
// let p1 = Person("Joe"); // no new keyword
// console.log(name);
// "Joe"

// function Person(name) { 
//     "use strict";
//     this.name = name; 
// }
// let ferdinand = Person("Ferdinand");
// console.log(name);
// // TypeError: Cannot set property 'name' of undefined


/*
NOTE: 
    modern day classes aka 'class' keyword will ALWAYS complain if you are missing 'new' keyword

Other things:
    1. Disallows giving a function MULTIPLE parameters with the SAME name
    2. Removes certain problematic language features entirely ('with' statement) 

Overall: 
    "use strict" @ top of your program/function is NOT a big thing to add and may help you spot your problems


Types

* JS considers types ONLY when actually running the program and often converts the values to the type it expects

A lot of mistakes come from being confused about the kind of value that goes INTO or comes OUT of a function
    1. You can ADD a comment like the example below to define the types
*/ 


// // (VillageState, Array) → {direction: string, memory: Array}
// function goalOrientedRobot(state, memory) {
//     // ...
//   }


/*
What would the type of the randomPick() function that returns a random element from an array?
    * Need to introduce a 'type' variable, T, which stands for ANY type
*/


// ([T]) -> T (function from an array of Ts to a T)
// function randomPick(array) {
//     let choice = Math.floor(Math.random() * array.length);
//     return array[choice];
// }


/*
A language that points out types BEFORE the program is run is TypeScript which is a JS dialect 


Testing

If JS won't help us find our mistakes then we would have to RUN our programs and see what happens
    * Annoying & Time Exhausting

Automated testing is the process of writing a program that tests ANOTHER program
    - WRITING tests is a more work
        * but worth it
        * when you break something, you immediate notice 

Tests usually take the form of little labeled programs that verify an ASPECT of your code

Writing tests like the example below is REPETITIVE & AWKWARD
    * the better alternative is 'test runners' which is from 'test suites'
*/


// // Example: a set of tests for the 'toUpperCase' method might look like this
// function test(label, body) {
//     if (!body()) console.log(`Failed: ${label}`);
// }

// test("convert Latin text to uppercase", () => {
//     return "hello".toUpperCase() == "HELLO";
// });


/*
Debugging

Sometimes the line that trigged the problem is simply the first place where a flaky value produced elsewhere gets used in an invalid way

Refer to the example below:
    * tries to convert a whole number to a string in a given base (decimal, binary, and so on) by repeatedly picking out the last digit and then dividing the number to get rid of this digit
*/


// function numberToString(n, base = 10) {
//     let result = "", sign = "";
//     if (n < 0) {
//         sign = "-";
//         n = -n;
//     } do {
//         result = String(n % base) + result;
//         n /= base;
//         console.log(n);
//     } while (n > 0);
//     return sign + result;
// }


// console.log(numberToString(13, 10));
// 1.5e-3231.3e-3221...


/*
we know that our program is malfunctioning and we want to find out why
    - Analyze whats happening and come up with a theory of why it might be happening
    * putting a few strategic console.log calls into the program is a GOOD way to get addition info about your program

    Example above: console.log(n);
                13
                1.3
                0.13
                0.013
                …
                1.5e-323
        * Dividing 13 by 10 does NOT produce a WHOLE number
*/


// function numberToString(n, base = 10) {
//     let result = "", sign = "";
//     if (n < 0) {
//         sign = "-";
//         n = -n;
//     } do {
//         result = String(n % base) + result;
//         n = Math.floor(n/base);
//     } while (n > 0);
//     return sign + result;
// }

// console.log(numberToString(13, 10));
// // 13


/*
Alternative to 'console.log()' to peek into the program's behavior is 'debugger'
    * breakpoints can be set on a specific line of your code

Another way to set a breakpoint is to include a "debugger" statement (consisting of that keyword


Error Propagation

The point of error propation is to actively do something in RESPONSE to the problem

Example: say you have promptNumber() that asks the user for a number and returns it. What should it return if the user inputs a string?
    * 1 option is to make it return a special value (null, undefined, -1)
*/


// function promptNumber(question) {
//     let result = Number(prompt(question));
//     if (Number.isNaN(result)) return null;
//     else return result;
// }

// console.log(promptNumber("how many trees?"));


/*
In situations when errors are common and the caller should be explicitly taking them into account, return a special value is a GOOD way to indicate an error
    * BUT there are DOWNSIDES
        - what if the function can already return every possible kind of value?
            * in this scenario, you'll have to wrap the result in an objecto be able to distinguish success from failure
*/


// function lastElement(array) {
//     if (array.length == 0) {
//         return {failed: true};
//     } else {
//         return {element: array[array.length - 1]};
//     }
// }


/*
Exceptions

Exceptions are a mechanism that makes it possible for code that runs into a problem to 'raise' (or throw) an exception
*/

// Browser Code
function promptDirection(question) {
    let result = prompt(question);
    if (result.toLowerCase() == "left") return "L";
    if (result.toLowerCase() == "right") return "R";
    throw new Error("Invalid direction: " + result);
}
// Uncaught Error: Invalid direction: none

function look() {
    if (promptDirection("Which way?") == "L") {
        return 'a house';
    } else {
        return "2 angry bears";
    }
}

try {
    console.log("You see", look());
} catch (error) {
    console.log("Something went wrong: " + error);
}
// Something went wrong: Error: Invalid direction: L
// You see a house


/*
'throw' keyword is used to RAISE an exception
    * used 'Error' constructor to CREATE our EXCEPTION value
        - creates an object with a 'message' proeprty


Catching an error id done by wrapping a piece of code in a 'try' block followed by a 'catch' keyword
    - when the code in the 'try' block causes an exception to be raised, the 'catch' block is evaluted w/ the name in parentheses bound to the EXCEPTION VALUE

After the 'catch' block finishes - or if the 'try' block finishes WITHOUT problems - the program proceeds beneath the ENTIRE 'try/catch' statement

* Error handling code is necessary ONLY at the point where the error occurs and at the point where it is handled


Cleaning Up After Exceptions

Every action that might CAUSE an exception might cause control to suddenly LEAVE your code
    * when code has several side effects, an exception might PREVENT some of the functions in the code from taking place

Example below
*/


const accounts = {
    a: 100,
    b: 0,
    c: 20
};

function getAccount() {
    let accountName = prompt("Enter an account name");
    if (!accounts.hasOwnProperty(accountName)) {
        throw new Error(`No such account: ${accountName}`);
    }
    return accountName;
}

function transfer(from, amount) {
    if (accounts[from] < amount) return;
    accounts[from] -= amount;
    accounts[getAccount()] += amount;
}

/*
The 'transfer' function transfers a sum of money from a given account to another, asking for the name of the other account in the PROCESS

If given an invalid account name, getAccount throws an EXCEPTION

BUT 'transfer' 1st removes the money from the account and then calls 'getAccount' before it adds it to another account
    * if it is broken off by an exception at the point, it'll just make the $ disappear


Another feature that 'try' statements have is a 'finally' block
    * this is used either INSTEAD of or in ADDITION to a 'catch' block

* A 'finally' block says "NO matter what happens, run this code after trying to the run the code in the try block"
*/


function transfer(from, amount) {
    if (accounts[from] < amount) return;
    let progress = 0;
    try {
        accounts[from] -= amount;
        progress = 1;
        accounts[getAccount()] += amount;
        progress = 2;
    } finally {
        if (progress == 1) {
            // adds back the $ taken out if code doesn't update progress to 2
            accounts[from] += amount;
        }
    }
}


/*
NOTE that even though the 'finally' code is run when an EXCEPTION is thrown in the 'try' block, it does NOT interfere the exception

*/


try {
    if (1 + 2 == 4) {
        console.log('This line is SKIPPED');
    } 
} finally {
    if (1 + 2 == 3) {
        console.log('Duh');
    }
}


/*
Selective Catching

when an exception makes it to the BOTTOM of the stack WITHOUT being caught, it gets handled by the env
    * in browsers, a description of the error gets written
    * node.js is more careful - it aborts the WHOLE process when an unhandled exception occurs

When a 'catch' body is entered, all we know is that something in our 'try' body caused an exception
    * we do NOT know what did or which exception it caused

* JS does NOT provide direct support for selectively catching exceptions
    - either you catch them ALL or you DON'T catch ANY


To catch a SPECIFIC kind of exception, we can do this by checking the 'catch' block whether the exception we got is the one we are interested in and rethrowing it otherwise

The proper way is to define a new tpye of error and use 'instanceof' to identify it
*/


// class InputError extends Error {}

// function promptDirection(question) {
//   let result = prompt(question);
//   if (result.toLowerCase() == "left") return "L";
//   if (result.toLowerCase() == "right") return "R";
//   throw new InputError("Invalid direction: " + result);
// }
// // Uncaught Error: Invalid direction: ??


/*
The new error class extends 'Error'
    * does NOT define its own constructor which means that it inherits the 'Error' constructor which expects a string message as argument

* the class is EMPTY
* this just helps us to recognize them SPECIFICALLY
*/


// DO NOT TRY THIS CODE
// for (;;) {
//     try {
//       let dir = promptDirection("Where?");
//       console.log("You chose ", dir);
//       break;
//     } catch (e) {
//       if (e instanceof InputError) {
//         console.log("Not a valid direction. Try again.");
//       } else {
//         throw e;
//       }
//     }
//   }


/*
This will catch ONLY instances of InputError and let unrelated exceptions through


Assertions

Assertions are checks inside a program that verify that something is the way it is supposed to be
    * used to find PROGRAMMER MISTAKES
*/