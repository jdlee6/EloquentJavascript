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
    "use string" @ top of your program/function is NOT a big thing to add and may help you spot your problems


Types

* JS considers types ONLY when actually running the program and often converts the values to the type it expects

A lot of mistakes come from ebing confused about the kind of value that goes INTO or comes OUT of a function
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

