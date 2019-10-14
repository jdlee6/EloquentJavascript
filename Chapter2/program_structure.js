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

Conditional execution is created with the "if" keyword in JS

In simple case, we want some code to be executed 'if and only if' a certain condition holds

Example: Want to show the square of the input ONLY if the input is actually a number
*/


// BROWSER ONLY CODE
// let theNumber = Number(prompt("Pick a number"));
// if (!Number.isNaN(theNumber)) {
//     console.log("your number is the square root of " + theNumber * theNumber);
// }


/*
If you enter "parrot" into the prompt, NO output is shown

The 'if' keyword executes or skips a statement depending on the value of a Boolean expression

The deciding expression is written AFTER the keyword, BETWEEN parentheses, followed by the statement to execute
    - the Number.isNaN function is a STANDARD JS function that returns 'true' ONLY if the argument it is given is NaN

    * the Number function happens to return NaN when you give it a STRING that doesn't represent a valid number

    --> therefore the condition translates to "unless theNumber is not-a-number, do this"

The statement after the 'if' is wrapped in braces {} in this example 
    - braces can be used to group any number of statements into a SINGLE statement, called a "block"
    ** this can be OMITTED but to avoid having to think about whether they are needed, most JS programmers use them in every wrapped statement
        * special conditions where braces may NOT be need are 1 liners
*/

// if (1+1==2) console.log("It's True");
// // It's True

/*
Often times, you will have code that executes with multiple conditions

To do this in JS, you can use the 'else' keyword together with 'if' to create 2 SEPARATE, ALTERNATIVE execution paths
*/


// BROWSER ONLY CODE
// let theNumber = Number(prompt("Pick a Number"));
// if (!Number.isNaN(theNumber)) {
//     console.log("Your number is the square root of " + theNumber * theNumber);
// } else {
//     console.log("Hey. Why didn't you give me a number?");
// }


/*
If you have MORE than 2 paths to choose from, you can "chain" multiple if/else pairs together like so
*/

//  BROWSER ONLY CODE
// let num = Number(prompt("Pick a Number"));
// if (num < 10) {
//     console.log("smaller than 10");
// } else if (10 < num < 50) {
//     console.log("smaller than 50");
// } else {
//     console.log("too big");
// }


/*
In the example above, it will 1st check whether 'num' is less than 10
    * if it is, it chooses that branch and shows "smaller than 10" and is done
    
    ** if it is NOT then it takes the else branch which itself contains a 2nd if
        * if the 2nd condition (10 < num < 50) holds, that means the number is between 10 and 50 and "smaller than 50" is shown
        
        *** if NEITHER of the 1st or 2nd condition holds true, then the else condition is chosen which will display the "too big"


While and Do Loops

Consider a program that outputs all even numbers from 0 to 12 
    * the annoying way to do is exemplified by the example below
*/


// console.log(0);
// // 0
// console.log(2);
// // 2
// console.log(4);
// // 4
// console.log(6);
// // 6
// console.log(8);
// // 8
// console.log(10);
// // 10


/*
A loop can be created with the following code

* NOTE += in JS is the same as += in Python
       *= in JS is the same as *= in Python
*/


// let number = 0;
// while (number <= 12) {
//     console.log(number);
//     number += 2;
// }
// // 0
// // 2
// // 4
// // 6
// // 8
// // 10
// // 12

// let num = 0;
// while (num <= 12) {
//     console.log(num);
//     num = num + 2;
// }
// // 0
// // 2
// // 4
// // 6
// // 8
// // 10
// // 12


/*
A statement starting with the keyword "while" creates a loop

The word "while" is FOLLOWED by an expression in parenthesis and then a statement, much like the "if" keyword
    * the loop keeps entering that statement as long as the expression produces a value that gives 'true' when converted to Boolean

The "number" binding demonstrates the way a binding can track the PROGRESS of a program
    * every time the loop repeats, "number" gets a value that is 2 MORE than its previous value
    ** at the beginning of every reprition, it is compared with the number 12 to decide whether the program's work is finished

Example: Let's write a program that calculates and shows the value of 2^10 (2 to the 10th power) with a while loop
    2 bindings will be used:
        1 to keep track of our result
        1 to count how often we have multiplied this result by 2
    * the loop tests whether the 2nd binding has reached 10 yet and, if NOT, updates both bindings
*/


// let result = 1;
// let count = 0;
// while (count < 10) {
//     result *= 2;
//     count += 1;
// }
// console.log(result)
// // 1024


/*
a "do" loop is a control structure SIMILAR to a "while" loop

the DIFFERENCE is that a "do" loop ALWAYS executes its body at LEAST once, and it starts testing whether it should stop only after that 1st execution

Example shown below
    - the body is executed at LEAST once
    * then it starts testing whether it should STOP only after that 1st execution
*/

// BROWSER ONLY CODE
// let yourName;
// do {
//     yourName = prompt("who are you?");
// } while (!yourName);
// console.log(yourName);


/*
In the 1st example, the program will force you to enter a name

It will ask again and again until it gets something that is NOT an empty string
    * Applying the "!" operator will convert a value to Boolean type before NEGATING it, and all strings EXCEPT "" convert to "true"
        - this means the loop continues going round until you provide a NON-EMPTY name


Indenting Code

* Spaces are NOT required and that code will run fine without the spaces

BUT the role of this indentation inside blocks is to make the STRUCTURE of the code stand out

In code where new blocks re opened inside other blocks, it can become HARD to see where 1 block ends and another begins

With proper indentation, the visual shape of a program corresponds to the shape of the blocks inside
    * use 2 spaces for every open block
    ** SOME people use 4 spaces and SOME people use 'tab'
    *** MOST important thing is that EACH new block adds the SAME amount of space
*/


// if (false != true) {
//     console.log("Obviously false is not true");
//     if (1 < 2) {
//         console.log("Obviously 1 is less than 2");
//     }
// }
// // Obviously false is not true
// // Obviously 1 is less than 2


/*
For Loops

Many loops follow the pattern shown in the 'while' examples
    - 1st a "counter" binding is created to track the PROGRESS of the loop
    - then comes a "while" loop, usually with a TEST expression that checks whether the counter has reached its end value
    ** at the END of the loop body, the counter is updated to track progress

Because this pattern is so COMMON, JS and similar languages have a SHORTER and more COMPREHENSIVE form, "for" loop
*/


// for (let number = 0; number < 12; number += 2) {
//     console.log(number);
// }
// // 0
// // 2
// // 4
// // 6
// // 8
// // 10


/*
This program is exactly equivalent to the earlier even-number-printing example

ONLY change is that ALL the statements that are related to the "state" of the loop are grouped together AFTER "for" keyword

The parentheses after a "for" keyword must contain 2 semicolons
    - the part before the 1st semicolon INITIALIZES the loop usually by defining a binding

    - the 2nd part is the expression that CHECKS whether loop must continue

    - the FINAL part updates the state of the loop after every iteration

* in MOST cases, a 'for' loop is shorter and clearer than a 'while' loop construct

Look at the example below that computes using 2^10 using a 'for' instead of 'while
*/


// let result = 1;
// for (let counter = 0; counter < 10; counter += 1) {
//     result *= 2;
// }
// console.log(result)
// // 1024


/*
Breaking Out of a Loop

Having the looping condition produce 'false' is NOT the only way a loop can finish

* special statements called 'break" that has the effect of immediately jumping out of the enclosing loop

Example below illustrates the "break" statement
    - it finds the 1st number that both greater than or equal to 20 AND divisible by 7
*/


// for (let current = 20; ; current = current + 1) {
//     if (current % 8 == 0) {
//         console.log(current);
//         break;
//     }
// }
// // 24


/*
% modulo operator is used to test whether a number is divisble by another number
    * if it is then the remainder of their division is 0

the "for" construct in the example does NOT have a part that checks for the END of the loop
    * this means that the loop will never stop unless the "break" statement inside is executed

* if the "break" statement is REMOVED or you accidentally write an end condition that ALWAYS produces true, your program would get stuck in an INFINITE LOOP
    * CTRL+C to get out of an infinite loop
*/


// for (let num = 0; ; num += 2) {
//     if (num % 1 == 0);
//     console.log(num);
// }


/*
"continue" keyword is similar to "break", in that it influences the PROGRESS of a loop
    - when a "continue" is encountered in a loop body, control jumps out of the body and continues with the loop's next iteration


Updating Bindings Succintly

Especially when looping, a program often needs to "update" a binding to hold a value BASED on that binding's PREVIOUS value

    counter = counter + 1;

JS provides a shortcut for this

    counter += 1;

Similar shortcuts work for many other operators:
    
    result *= 2 (double result)
    counter -= 1 (count downward by 1)

* These arithmetic shortcuts are the same in Python
* The benefits of these shortcuts it to make shorten our counting examples a little more

** JS specific:
    counter += 1 <--> counter ++
    counter -= 1 <--> counter -- 
*/


// for (let number = 0; number <= 12; number += 2) {
//     console.log(number);
// }
// // 0
// // 2
// // 4
// // 6
// // 8
// // 10
// // 12

// for (let number = 0; number < 4; number++) {
//     console.log(number);
// }
// // 0
// // 1
// // 2
// // 3

// for (let number = 0; number > -4; number--) {
//     console.log(number);
// }
// // 0
// // -1
// // -2
// // -3


/*
Dispatching On A Value with Switch

The example below is quite common to look like:
*/

// if (x == "value1") action1();
// else if (x == "value2") action2();
// else if (x == "value3") action3();
// else defaultAction();

/*
Another way to write the example above: 

There is a construct called 'switch' that is intended to express such a "dispatch" in a MORE DIRECT way
    * the syntax JS uses for this is somewhat AWKWARD and in many cases a chain of "if" statements shown above may look better
    ** this was inherited from C/Java
*/


// switch (prompt("What is the weather like?")) {
//     case "rainy":
//         console.log("remember to bring an umbrella");
//         break;
//     case "sunny":
//         console.log("dress lightly");
//     case "cloudy":
//         console.log("go outside");
//         console.log("this statement will print too because sunny does not have a break statement");
//         break;
//     default:
//         console.log("unknown weather type!");
//         break;
// }


/*
You may put any number of 'case' labels inside the block OPENED by the 'switch'

The program will start executing at the label that corresponds to the value that 'switch' was given or at 'default' if NO matching value is found

It will CONTINUE executing until it reaches a break statement
    * it is easy to forget a "break" statement and doing so will cause the program to execute code you do NOT want executed


Capitalization

Binding names may NOT contain spaces, yet it is often helpful to use MULTIPLE words to clearly describe what the binding represents

Theses are your choices for writing a binding name with MULTIPLE words:
    fuzzylittleturtle (all lower case)
    fuzzy_little_turtle (separated by _)
    FuzzyLittleTurtle (all words capitalized)
    fuzzyLittleTurtle (1st word lowercase, words following after that should be capitalized)

1st style (lowercase) is HARD to read

underscores is nice but painful to type

** the STANDARD JS functions follow the bottom style - they capitalize every word except the first 
    * just like in Python


Comments

Some times you might just want to include some comments
    // single line
    /* multi line
*/