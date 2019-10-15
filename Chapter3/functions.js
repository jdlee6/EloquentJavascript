/*
Functions


Defining a Function

A function definition is a regular binding where the value of the binding is a function

Example: this code defines a 'square' to refer to a function that produces the square of a given number
*/


// const square = function(x) {
//     return x * x;
// };

// console.log(square(12))
// // 144


/*
A function is created with an expression that starts with the keyword "function"

Functions have a set of parameters (in the example above, ONLY 'x') and a "body", which contains the statements that are to be executed when the function is called

The function "body" of a function that is created this way MUST always be wrapped in braces, even when it consists of a SINGLE statement
*/


// const hello = function(name) {
//     return "hello " + name
// }

// console.log(hello())
// // hello undefined

// console.log(hello("joe"))
// // hello joe


/*
A function can have MULTIPLE parameters or NO parameters at all

Example: 
    makeNoise does NOT list any parameter names, whereas 'power' lists 2
*/


// const makeNoise = function() {
//     console.log("Ping!");
// }

// makeNoise();
// // Ping!

// const power = function(base, exponent) {
//     let result = 1;
//     for (let count = 0; count < exponent; count++) {
//         result *= base;
//     }
//     return result;
// }

// console.log(power(2,10));
// // 1024


/*
Some functions produce a value, such as "power()" and "square()" and some do NOT such as "makeNoise()"

A "return" statement determines the value the function returns
    * when the control hits a "return" statement, it immediately jumps out of the current function and gives the returned value to the code that called the function

A "return" keyword without an expression AFTER it will cause a function to return "undefined"

Functions that don't have a "return" statement at all, such as makeNoise(), similarly return "undefined"

Parameters to a function behave like regular bindings, but their initial values are given by the "caller" of the function, not the code in the function itself


Bindings and Scopes

Each binding has a scope, which is the part of the program in which the binding is VISIBLE

For bindings defined OUTSIDE of any function or block, the scope is the WHOLE program
    * these are called GLOBAL bindings

For bindings created for function parameters or declared inside a function can ONLY be referenced inside that function
    * these are called LOCAL bindings

Every time the function is called, new instances of these bindings are created
    * provides some isolation between functions
        * each function call acts in its OWN local environment

Bindings declared with "let" and "const" are in fact LOCAL to the BLOCK that they are DECLARED IN
    - if you create 1 of those inside of a loop, the code before and after the loop CANNOT see it
*/


// let x = 10;
// if (true) {
//     const w = 10;
//     let y = 20;
//     var z = 30;
//     console.log(w + x + y + z);
// }
// // 70

// console.log(x+z);
// // 40

// // y is LOCAL because of the "let"
// console.log(x+y);
// // ReferenceError: y is not defined

// // w is LOCAL because of the "const"
// console.log(w+x);
// // ReferenceError: w is not defined


/*
Each scope can "look out" into the scope around it, so 'x' is visible inside the block in the example above
    - x is GLOBAL bc it is declared outside the block

Exception is when MULTIPLE bindings have the same name 
    * in this case, code can see ONLY the innermost 1
    - Example: when the code inside the 'halve' function refers to n, it is seeing its OWN 'n' (locally), not the global n
*/


// const halve = function(n) {
//     return n/2;
// };

// let n = 10;
// console.log(halve(40));
// // 20

// // notice how the function doesn't use the global n but uses the n passed in as an argument
// console.log(n);
// // 10


/*
Nested Scope

JS distinguishes not just GLOBAL and LOCAL bindings

Blocks and functions can be created inside OTHER blocks and functions, producing MULTIPLE degrees of locality

Example: the function below - outputs the ingredients needed to make a batch of hummus - has another function inside it
*/


// const hummus = function(factor) {
//     const ingredient = function(amount, unit, name) {
//         let ingredientAmount = amount * factor;
//         if (ingredientAmount > 1) {
//             unit += "s";
//         }
//         console.log(`${ingredientAmount} ${unit} ${name}`);
//     };
//     ingredient(1, "can", "chickpeas");
//     ingredient(0.25, "cup", "tahini");
//     ingredient(2, "cup", "lemon juice");
//     ingredient(2, "table spoon", "olive oil");
// }

// hummus(2)
// 2 cans chickpeas
// 0.5 cup tahini
// 4 cups lemon juice
// 4 table spoons olive oil


/*
The code INSIDE the ingredient() function can see the 'factor' binding from the OUTER function

But its LOCAL bindings, such as 'unit' or 'ingredientAmount', are NOT visible in the OUTER function

The set of bindings visible inside a block is determined by the place of that block in the program text

Each local scope can also see all the local scopes that contain it and ALL scopes can see the GLOBAL scope
    * this approach to binding visibility is called "LEXICAL Scoping"


Functions as Values

A function binding usually simply acts as a name for a specific piece of the program
    - such a binding is defined ONCE and NEVER changed
    * this may cause some confusion about the function and its name

A function value can do ALL the things that other values can do; NOT limited to calling it but you can use it in arbitrary expressions
    * also possible to store a function value in a NEW binding, pass it as an argument to a function and so on

A binding that holds a function is still just a REGULAR binding and can, if NOT constant, be assigned a NEW value like in the example below
*/


// let safeMode = true;
// let launchMissles = function() {
//     missileSystem.launch("now");
// };
// if (safeMode) {
//     launchMissles = function() {
//         /* do nothing */
//     };
// }

// launchMissles()


/*
Declaration Notation

A SHORTER way to create a function binding can be done when the "function" keyword is used at the start of a statement, it works differently
*/


// function square(x) {
//     return x * x;
// }
// console.log(square(2))
// // 4


/*
This is a FUNCTION DECLARATION

The statement defines the binding 'square' and points it at the given function
    * much easier to write and does NOT require a ';' AFTER the function

* 1 subtlety with this form of function defintion
*/


// // notice how the function is declared AFTER the statement that uses the function
// console.log("the future says:", future());
// function future() {
//     return "you'll never have flying cars";
// }
// // the future says: you'll never have flying cars


/*
The code above WORKS even though the function is DEFINED BELOW the code that uses it

Function declarations are NOT part of the regular top-to-bottom flow of control
    - they are conceptually moved to the TOP of their scope and can be used by all the code in that scope
    * USEFUL because it offers the freedome to order code in a way that seems meaningful without worrying about having to define ALL functions before they are used


Arrow Functions
*/