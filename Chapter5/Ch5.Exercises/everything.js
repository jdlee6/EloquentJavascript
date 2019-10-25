/*
Everything

Analagous to the .some() method, arrays also have an .every() method

.every()
    returns 'true' when the given funtions returns true for EVERY element in the array

* in a way, .some() is a version of the || operator that acts on arrays and .every() is like the && operator

Implement .every() as a function that takes an array and a predicate function as parameters

Write 2 versions
    1. using a loop
    2. using a some method
*/

// // loop
// function every(array, test) {
//     let arr = [];
//     for (let element of array) {
//         if (test(element)) arr.push(element);
//         if (!test(element)) return false;
//     }
//     return arr.length == array.length
// }

// or

function every(array, test) {
    for (let element of array) {
        if (!test(element)) return false;
    }
    return true;
}

// console.log(every([1, 3, 5], n => n < 10));
// // → true
// console.log(every([2, 4, 16], n => n < 10));
// // → false
// console.log(every([], n => n < 10));
// // → true


// .some() takes a test function and returns true if ANY of the tests are true
function every2(array, test) {
    return !array.some(element => !test(element));
}

// console.log(every2([1, 3, 5], n => n < 10));
// // → true
// console.log(every2([2, 4, 16], n => n < 10));
// → false

/*
Explanation 

Applying the some() only method will NOT work, since latter returns true when one element in the array passes the test.

To test if ALL elements pass the test with the some() method, use De Morgan’s laws, which states that
!(A && B) === !A || !B

We can modify De Morgan’s laws by using a double negation:
(A && B) === ! (!A || !B)


Walk through
    arr = [2,4,16] 
    test = (n => n < 10)
        i. !(2 < 10) --> false 
        ii. !(4 < 10) --> false 
        iii. !(16 < 10) --> true 
            ...
        array.some(n => !n < 10) returns true
            ...
        * therefore you must NEGATE the array as well
        !true --> false

    arr = [1,3,5]
    test = (n => n < 10)
        i. !(1 < 10) --> false
        ii. !(2 < 10) --> false
        iii. !(5 < 10) --> false
            ...
        array.some(n => !n < 10) returns false
            ...
        * therefore you must NEGATE the array as well
        !false = true
*/
