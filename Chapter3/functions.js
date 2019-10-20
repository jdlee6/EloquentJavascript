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

Instead of the 'function' keyword, it uses an arrow (=>) which is made up of an EQUAL sign and a GREATER THAN character
    * this should NOT be mistaken with the 'greater than or equal to' operator which is >=
*/

// const power = (base, exponent) => {
//     let result = 1;
//     for (let count = 0; count < exponent; count++) {
//         result *= base;
//     }
//     return result;
// };

// console.log(power(2, 5))
// // 32


/*
the "arrow" comes AFTER the list of parameters and is FOLLOWED by the function's body
    - expresses something like "this input (the parameters) produces this result (the body)"

When there is ONLY 1 parameter name, you can omit the parentheses around the parameter list

If the body is a single expression, rather than a block in braces, that expression will be returned from the function

The 2 code examples below do exactly the SAME thing
*/

// const square1 = (x) => { return x * x; };
// const square2 = x => x * x;

// console.log(square1(3))
// // 9
// console.log(square2(3))
// // 9


/*
When an arrow function has NO parameters at all, its parameter list is just an EMPTY set of parentheses
*/


// const horn = () => {
//     console.log("Toot");
// };

// horn()
// // Toot


/*
Arrow functions were added to make it possible to write small function expressions in a less verbose way


The Call Stack

Look at the simple program below that makes a few function calls
*/


// function greet(who) {
//     console.log("Hello " + who);
// }

// greet("Harry");
// // Hello Harry
// console.log("Bye");
// // Bye


/*
A run through this program goes roughly like this:
    1. the call to greet causes the control to jump to the start of that function (315)
    2. function calls console.log, which takes control, does its job, and then returns control to line 315
    3. reaches the end of the 'greet()' function so it returns to the place that called it (line 318)
    4. the line after that (320) calls console.log again and after than return, the program has reached its end

Flow of Control looks something like this:
    not in function 
        in greet()
            in console.log
        in greet()
    not in function
        in console.log
    not in function

Because a function has to jump back to the place that called it when it RETURNS, the computer must remember the context from which the call happened
    1st case, console.log has to return to the greet() when it is done
    2nd case, it returns to the end of the program

Place where the computer stores this context is the "call stack"
    - every time a function is called, the current context is stored on TOP of this stack
        * when a function returns, it removes the top context from the stack and uses that context to continue execution
    *** hence the word "stack" - FIFO

When the stack grows too BIG, the computer will fail with a message like "out of stack space" or "too much recursion"

Example of an Infinite Stack below
*/


// function chicken() {
//     return egg();
// }
// function egg() {
//     return chicken();
// }

// console.log(chicken() + " came first.");
// // RangeError: Maximum call stack size exceeded


/*
Optional Arguments

The following code is allowed and executes without any problem
*/


// function square(x) { return x * x; }
// console.log(square(4, true, "hedgehog"));
// // 16


/*
We defined 'square()' with ONLY 1 parameter
    - when we call it with 3, the language does NOT throw any error 
    * it IGNORES the extra arguments and computes the square of the 1st argument

In JS:
    - if you pass too many arguments, the EXTRA ones are ignored
    - if you pass too few, the missing parameters get assigned the value "undefined"

DOWNSIDE of this is that it is possible that you'll accidentally pass the WRONG number of arguments to function
    * No warnings will be given

UPSIDE is that this behavior can be used to allow a function to be called with different number of arguments

Look at the example below: this minus() function tries to imitate the - opperator by acting on either 1 or 2 arguments
*/


// function minus(a,b) {
//     if (b===undefined) return -a;
//     else return a-b;
// }

// console.log(minus(10));
// // -10
// console.log(minus(10, 5))
// // 5


/*
If you write an '=' operator after a parameter, followed by an expression, the value of that expression will replace the argument when it is NOT given
    * in other words, this is how you set a default parameter

Example: this version of power() makes its second argument optional
    - if you dont provide it or pass the value 'undefined', it will default to 2 and the function will behave like square
*/


// function power(base, exponent = 2) {
//     let result = 1;
//     for (let count = 0; count < exponent; count++) {
//         result *= base;
//     }
//     return result;
// }
// console.log(power(3));
// // 9
// console.log(power(2, 6));
// // 64

// function hello(name = "joe") {
//     console.log("hello " + name);
// }
// hello();
// // hello joe
// hello("jake");
// // hello jake


/*
Closure

What happens to local bindings when the function call that created them is NO longer active?

The example below does following:
    1. defines a function, wrapValue(), and creates a LOCAL binding
    2. returns a function that accesses and returns this local binding
*/


// function wrapValue(n) {
//     let local = n;
//     return () => local;
// }

// let wrap1 = wrapValue(1);
// let wrap2 = wrapValue(2);

// console.log(wrap1());
// // 1
// console.log(wrap2());
// // 2


/*
This is allowed and works as you'd hope - both instances of the binding can still be accessed

This example demonstates that LOCAL bindings are created anew for every call and different calls can NOT trample on one another's LOCAL bindings

A function that references bindings from LOCAL scopes around it is called a CLOSURE

With a slight change, we can turn the previous example into a way to create functions that multiply by an arbitrary amount
*/


function multiplier(factor) {
    return number => number * factor;
}

let twice = multiplier(2);
console.log(twice(5));
// 10

// multiplier(factor: any): (number: any) => number
console.log(multiplier(2)(5));
// 10


/*
Keypoints from the example above:
    * number is an anonymous function that returns 'number * factor'
    * multiplier(2) essentially returns a function that does 'number * 2'
    * twice is a binding for multiplier(2) which is essentially 'number * 2'
    * twice(5) --> return 5 * 2 where 5 is used as the argument for 'number'

In the example above, 'multiplier' is called and creates an ENVIRONMENT in which its factor parameter is bound to 2
    * the function value it returns, 'number * 2' which is stored in 'twice', remembers this environment 
    * when that is called, it multiplies its argument by 2


Recursion

A function that calls itself is called recursive
*/

function power(base, exponent) {
    if (exponent == 0) {
        return 1;
    } else {
        return base * power(base, exponent - 1);
    }
}

console.log(power(2,3))
// 8

/*
the base case is that when exponent = 0, return 1
    - when it reaches this base case, this 1 is used for each of recursive calls

Process:
    base * power(2, 2) 
    base * power(2, 1)
    base * power(2, 0) --> exponent == 0 so power(2, 0) --> 1

    work up the call stack:
    2 * 1 --> 2
    2 * 2 --> 4
    2 * 4 --> 8

Problem: in typical JS implementations, recursion is about 3x SLOWER than the looping version
    * running through a simple loop is generally CHEAPER than calling a function multiple times

** In the case of the power() function, the looping version is much more simple and easy to read
    * does not make sense to replace that with the recursive version


Puzzle: Starting from the number 1 and repeatedly adding 5 or multiplying by 3, an infinite set of numbers can be produced.
    How would you write a function that, given a number, tries to find a sequence of such additions and multiplications that produce that number?

Example: the number 13 could be reached by first multiplying by 3 and then adding 5 twice, whereas the number 15 cannot be reached at all
*/


// recursive solution
function findSolution(target) {
    function find(current, history) {
        if (current == target) {
            return history;
        } else if (current > target) {
            return null;
        } else {
            return find(current + 5, `(${history} + 5)`) ||  find(current * 3, `(${history} * 3)`);
        }
    }
    return find(1, "1");
}

console.log(findSolution(24));
// (((1 * 3) + 5) * 3)


/*
Process:
    The inner function find() does the actual recursing
        - takes 2 arguments, the current number and a string that records how we reached that number
        * if it finds a solution, it returns a string that shows how to get tot he target
        * if there is NO solution, it returns null

To do this, the function performs 1 of 3 actions
    1. if the current number is the target number, the current history is away to reach that target so it is returned

    2. if the current number > target, there's no sense in further exploring this branch because both adding and multiplying will make the number bigger therefore it returns 'null'

    3. if we're still below the target number, the function tries both possible paths that start from the current number by calling itself TWICE, once for addition and once for multiplication
        - if the 1st call returns something that is not 'null', it is returned
        * otherwise, the 2nd call is returned, regardless of whether it produces a string or 'null'

Step by Step Process:
find(1, "1")
    find(6, "(1 + 5)")
        find(11, "((1 + 5) + 5))")
            find(16, "(((1 + 5) + 5) + 5)")
                too big
            find(33, "(((1 + 5) + 5) * 3)")
                too big 
        find(18, "((1 + 5) * 3)")
            too big
    find(3, "(1 * 3)")
        find(8, "((1 * 3) + 5)")
            find(13, "(((1 * 3) + 5) + 5)")
                FOUND
            
* The indentation indicates the depth of the call stack

- 1st time 'find' is called, it starts by calling itself to explore the solution that starts with (1 + 5)
    * this call will further recurse to explore EVERY continued solution that yields a number LESS than or EQUAL to the target number
    ** Since it does NOT find 1 that hits the target, it returns 'null' back to the first call 
        * the || operator causes the call that explores (1 * 3) to happen
        * the 1st recursive call, through yet another recursive call, hits the target number


Growing Functions

1. find yourself writing similar code multiple times
    - need to make code dry so you take the repeated functionality and put it into a function

2. you need some functionality that you haven't written yet but sounds like it deserves its own function

Practice: 
    Write a program that prints 2 numbers: the numbers of cows and chickens on a farm, with the words 'Cows' and 'Chickens' after them and zeros padded before both numbers so they are always 3 digits long.
        - function of 2 arguments, the # of cows and the # of chickens
*/


// function printFarmInventory(cows, chickens) {
//     let cowString = String(cows);
//     while (cowString.length < 3) {
//         cowString = "0" + cowString;
//     }
//     console.log(`${cowString} Cows`);
//     let chickenString = String(chickens);
//     while (chickenString.length < 3) {
//         chickenString = "0" + chickenString;
//     }
//     console.log(`${chickenString} Chickens`);
// }

// printFarmInventory(3, 11);
// // 003 Cows
// // 011 Chickens


//  Extend this function so that we can add a pigs parameter as well

function zeroPad(number) {
    let string = String(number);
    while (string.length < 3) {
        string = "0" + string;
    }
    return string;
}

function printFarmInventory(cows, chickens, pigs) {
    console.log(`${zeroPad(cows)} Cows`);
    console.log(`${zeroPad(chickens)} Chickens`);
    console.log(`${zeroPad(pigs)} Pigs`);
}

printFarmInventory(3, 12, 133);
// 003 Cows
// 012 Chickens
// 133 Pigs


/*
Functions and Side Effects

Functions can be divided into those that are called for their 'side effects' and those that are called for their return value

In the example problem above:
    - the 1st helper function in the farm example was printZeroPaddedWithLabel is called for its side effect: printing a line

    - the revised helper function, zeroPad, is called for its return value
    ** 2nd is useful in MORE situations than the 1st

Function that create values are easier to combine in new ways than functions that directly perform 'side effects'

A PURE function is a specific kind of value-producing function that NOT only has NO side effects but also doesn't rely on side effects from other code
    - doesn't read global bindings whose value might change
    - when a pure function is called with the same arguments, it alwaus produces the SAME value

A function should RETURN something that can be used elsewhere
*/