/*
Trouble understanding .reduce() from Eloquent JS
This is practice utilizing Mosh's Explanation (Youtube)
*/

// Calculate the total sum of the array with .reduce()

const numbers = [1,-1,2,3];

// Start by declaring a variable called sum
let sum = 0;

for (let n of numbers)
    sum += n;
console.log(sum)
// 5


/*
A better way to do this is using the .reduce() method

ALL arrays have a .reduce() method that can reduce ALL the elements in an array into a SINGLE value
    - that SINGLE value can be a number, string, object

In the example above, we would like to reduce all the elements in 'numbers' into a single number aka the sum


Background info:
    Callback function is a function that is to be executed after another function finished executing

.reduce() takes a CALLBACK function with 2 parameters (accumulator, currentValue)
    * the 'accumulator' parameter can be thought of as the 'sum' binding we have above
    * the 'currentValue' parameter can be thought of each element in the array
    
.reduce() takes another argument, 'initialValue', which initializes the 'accumulator' at this value

Therefore:
    .reduce(<callback function>, initialValue)
*/


// this will reduce down to a SINGLE value
numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
}, 0)

let reduceSum = numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
}, 0);

console.log(reduceSum);
// 5


/*
Ok, but how does this work?

Steps:
    1. accumulator = 0, currentValue = 1 => accumulator = 1
    2. accumulator = 1, currentValue = -1 => accumulator = 0
    3. accumulator = 0, currentValue = 2 => accumulator = 2
    4. accumulator = 2, currentValue = 3 => accumulator = 5

How do we make this code SHORTER?
    * if you do NOT set the initialValue --> the accumulator will take the value of the FIRST element of the array

    1. accumulator = 1, currentValue = -1 => accumulator = 0
    2. accumulator = 0, currentValue = 2 => accumulator = 2
    3. accumulator = 2, currentValue = 3 => accumulator = 5
*/

// NO initialValue argument
let reduceSum2 = numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue
});
console.log(reduceSum2)
// 5


// To make this code even SHORTER:
// we can OMIT the 'return' keyword because the body of the arrow function is a SINGLE line
let reduceSum3 = numbers.reduce((accumulator, currentValue) => accumulator + currentValue);
console.log(reduceSum3);
// 5


/*
This is a much CLEANER and more EFFICIENT way to reduce the values in an array than a for loop!
*/


// Practice Problem - Find the total if you multiply ALL elements in the array with each other using reduce
let factors = [1,2,3,4,5];
let multiple = factors.reduce((accumulator, currentValue) => accumulator * currentValue);

console.log(multiple);
// 120


