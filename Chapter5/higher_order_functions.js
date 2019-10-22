/*
Higher Order Functions

Examples Below:
    1st: self-contained and 6 lines long
    2nd: relies on 2 external functions and is 1 line long
        * if we count the size of the definitions that make up 'sum' and 'range', the 2nd program is also big
*/


// // 1st Example
// let total = 0, count = 1;
// while (count <= 10) {
//     total += count;
//     count += 1;
// }
// console.log(total);

// // 2nd Example
// console.log(sum(range(1,10)));


/*
Abstraction

Abstractions are vocabulary (ie. sfunctions 'sum' and 'range') that hide details and give us the ability to talk about problems at a higher level

* Recipe Example
    1st: in depth explanation (step by step)
    2nd: short and concise but requires knowledge of the keywords
        - 'soak', 'simmer', chop' ... etc.


Abstracting Repetition
*/


// Do something a given number of times
for (let i = 0; i < 10; i++) {
    console.log(i);
}

// Can we abstract doing something N times?
function repeatLog(n) {
    for (let i = 0; i < n; i++) {
        console.log(i);
    }
}

// What if we want to do something other than logging the numbers?
function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i);
    }
}
repeat(3, console.log);
// 0
// 1
// 2

/*
NOTE - we do NOT have to pass a predefined function to 'repeat'
    * it is often EASIER to create a function value on the SPOT instead
*/


// higher order function with no arrow function
// let labels = [];
// repeat(5, function(i) {
//     labels.push(`Item ${i+1}`);
// })
// console.log(labels);
// // [ 'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5' ]


// The standardized arrow function to simplify the example above
let labels = [];
repeat(5, i => {
    labels.push(`Unit ${i+1}`);
});
console.log(labels);
// // [ 'Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5' ]


/*
1st describes the kind of loop and then provides a body
    * body is written as a function value, which is wrapped in the parentheses of the call to 'repeat'
    * therefore it MUST be closed with a closing BRACE and closing PARENTHESES

In cases like the example above, where the body is a SINGLE small expression, you could OMIT the braces and write the loop on a single line
*/


// let labels = [];
// repeat(5, i => labels.push(`Unit ${i+1}`));
// console.log(labels);
// // [ 'Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5' ]


/*
Higher Order Functions

Functions that operate on other functions, either by taking them as arguments or by returning them are called 'higher order function'

Higher order functions allow us to abstract over actions, not just values

Example: we can have function that create new functions
*/


function greaterThan(n) {
    return m => m > n;
}

let greaterThan10 = greaterThan(10)
console.log(greaterThan10(9));
// false
console.log(greaterThan10(11));
// true


// we can have functions that change other functions
function noisy(f) {
    return (...args) => {
        console.log("calling with", args);
        let result = f(...args);
        console.log("called with", args, ", returned", result);
        return result;
    };
}

noisy(Math.min)(3,2,1);
// calling with [ 3, 2, 1 ]
// called with [ 3, 2, 1 ] , returned 1


// we can even write functions that provide new types of control flow
function unless(test, then) {
    if (!test) then();
}

repeat(3, n => {
    unless(n % 2 == 1, () => {
        console.log(n, "is even");
    });
});
// 0 'is even'
// 2 'is even'


// built-in array method, 'forEach', provides something like a 'for/of' loop as a higher-order function
["A", "B"].forEach(l => console.log(l));
// A
// B


/*
Script Data Set

In the examples below, we will use a data set about scripts - writing systems such as Latin, Cyrillic, or Arabic
*/