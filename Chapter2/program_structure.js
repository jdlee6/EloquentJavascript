/*
Program Structure


Expressions and Statements

A fragment of code that produces a value is called an "expression"
    * Every value that is written literally is an expression (ie. 22 or "psychoanalysis")

An expression between parentheses is also an expression, as is a binary operator applied to 2 expressions or a unary operator applied to 1

Expressions can contain other expressions in a way similar to how subsentences in human languages are nested
    - if an expressions corresponds to a sentence fragment, a JS statement corresponds to a FULL sentence
    * a program is a list of statements

SIMPLEST kind of statement is an expression after a SEMICOLON or ; after it like the example below 
*/


// console.log(1);
// 1
// console.log(!false);
// true


/*
* the 'console.log' part is optional
    - the main takeaway is that anything with a ; at the end of the line means that it is a STATEMENT

An expression can be content to just produce a value which can then be used by the enclosing code

Statements could display something on the screen or it could change the internal state of the machine in a way that will AFFECT statements that come AFTER it
    * these changes are called "side effects"

    * the statements in the previous example just PRODUCE the values 1 and true and then immediate THROW them away
        * leaves NO impression on the world at all
        
SOME cases: JS allows you to omit the semicolon at the end of a statement

OTHER cases: the semicolon HAS to be there or the next line will be treated as part of the same statement
    * the rules for when it can be safely omitted is beyond the scope of this book therefore every statement that needs a semicolon will always get 1


Bindings

To catch and hold values, JS provides a thing called a binding or a variable
*/


// let caught = 5 * 5;
// console.log(caught);
// // 25


/*
The special word, 'let', indicates that this sentence is going to define a binding
    * it is followed by the name of the binding and, if we want to immediately give it a value, by an = operator and an expression

The previous statement creates a binding called 'caught' and uses it to grab hold of the number that is produced by multiplying 5 * 5

After a binding has been defined, its name can be used as an expression
    * the value of such an expression is the value the binding currently holds
*/


// let ten = 10;
// console.log(ten*10);
// // 100


/*
When a binding points at a value, that does NOT mean it is tied to that value forever

The = operator can be used at anytime on EXISTING bindings to DISCONNECT them from their current value and have them point to a NEW one
*/


// let mood = "light";
// console.log(mood);
// // light
// mood = "dark";
// console.log(mood)
// // dark


/*
Bindings do NOT contain values; they GRASP them - 2 bindings can refer to the same value

A program can access only the values that it still has a reference to

Example 2: 
    - to remember the number of dollars that Luigi still owes you, you create a binding
    - and then when he pays back $35, you give this binding a new value
*/


// let luigisDebt = 140;
// luigisDebt = luigisDebt - 35;
// console.log(luigisDebt);
// // 105


/*
When you define a binding WITHOUT giving it a value, you will get the value 'undefined'

A SINGLE 'let' statement may define MULTIPLE bindings
    * the definitions must be separated by commas
*/


// let bind;
// console.log(bind);
// // undefined

// let one=1, two=2;
// console.log(one+two)
// // 3


/*
The words 'var' and 'const' can also be used to create bindings, in a way SIMILAR to 'let'

Example:
*/


// var name = "Ayda";
// const greeting = "Hello ";
// console.log(greeting+name);
// // Hello Ayda


/*
The 1st 'var' (short for 'variable') is the way bindings were declared in PRE-2015 JS (differences between 'let' and 'var' will be discussed in the next chapter)

The word 'const' stands for 'constant'
    - defines a constant binding, which points at the same value for as long as it lives
    * this is useful for bindings that give a name to value so that you can easily refer to it later


Binding Names

Binding names can any word
Digits can be part of binding names - catch22 is valid name
    * BUT the name must NOT start with a digit
    * Binding name may include ($) dollar signs or (_) underscores but NO OTHER punctuation or special characters

Words with a special meaning (keywords) such as 'let', 'var' are "keywords" and they may NOT be used as binding names
    * there are also a number of words that are "reserved for use" in future version of JS which also can't be used as binding names

* TIP FOR DEBUGGING: When creating a binding produces an unexpected syntax error, see whether you're trying to define a reserved word
*/


// let let=3;
// console.log(let)
// // SyntaxError: let is disallowed as a lexically bound name


/*
The Environment

Collection of bindings and their values that exist at a given time is called the "environment"

When a program starts up, this environment is NOT empty
    - ALWAYS contains bindings that are part of the language standard and most of the time, it also has bindings that provide ways to interact with the surrounding system

Example: in a browser, there are functions to interact with the currently loaded website and to read mouse and keyboard input


Functions

A function is a piece of program wrapped in a value
    - such values can be 'applied' in order to run the wrapped program

Example: 
    - in a browser environment, the binding "prompt" holds a function that shows a little dialog box asking for user input
    * take a look at prompt.html 
        - (JS function is held within <script></script>)

Executing a function is called invoking, calling, or applying it
    - you can call a function by putting parentheses after an expression that produces a function value
        - usually you'll directly use the name of the binding that holds the function
        - values between the parentheses are given to the program inside the function
    
    - in this example, the 'prompt' function uses the string that we give it as the text to show in the dialog box

Values given to functions are called arguments
    - different functions might need a different number or different types of arguments

* 'prompt' function isn't used much in modern web programming
    * why? --> because you have NO control over the way the resulting dialog looks, but can be helpful in toy programs and experiments


console.log Function

Most JS systems (all modern web browsers and Node.js) provide a console.log function 
    - writes out its arguments to some text output device

In browsers, output lands in the JS console
    - you can access the console in the browser by pressing F12 or via Developer Tools

Though binding names cannot contain period characters, 'console.log' function does have 1
    - this is because console.log isn't a simple binding
    * it is actually an expression that retrieve the 'log' property from the value held by the 'console' binding (more info in Ch 4)
*/


// let x = 30;
// console.log("the value of x is", x);
// // the value of x is 30


/*
Return Values

Showing a dialog box or writing text the screen is a 'side effect'

A lot of functions are useful because of the 'side effects' they produce

Functions may also produces values, in which case they don't need to have a 'side effect' to be useful

Example: the function 'Math.max' takes any amount of number arguments and gives back the greatest
*/


// console.log(Math.max(2,4,6,7,8));
// // 8


/*
When a function produces a value, it RETURNS a value

Anything that produces a value is an expression in JS which means function calls can be used within larger expressions

Example: Math.min (opposite of Math.max) is used part of a plus expression
*/


// console.log(Math.min(2,4,5,6,7)+100);
// // 102


/*
Control Flow

When your program contains more than 1 statement, the statements are executed as if they are a story (TOP -> BOTTOM)

The following example has 2 statements:
    1. 1st one asks the user for a number
    2. 2nd shows the square of that number
*/


// * BROWSER ONLY CODE
// let theNumber = Number(prompt("Pick a number"));
// console.log("Your number is the square root of " + theNumber * theNumber);

/*
the function Number converts a value to a number
    - similar to int() in Python

We need that conversion because the result of prompt() is a STRING value whereas we want a NUMBER

Similar functions to Number() are String() and Boolean() that convert values to those types


Conditional Execution

*/