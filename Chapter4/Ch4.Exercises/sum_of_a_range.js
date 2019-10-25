/*
Write a 'range' function that takes 2 arguments, start and end, 
and 
returns an array containing all the numbers from 'start' up to (and including) 'end'.

Write a 'sum' function that takes an array of numbers and returns the sum of these numbers.
Run the example program and see whether it does indeed return 55

**Bonus**
Modify your 'range' function to take an optional 3rd argument that indicates the "step" value used when building an array

If no step is give, the elements go up by increments of 1

range(1,10,2) --> [1,3,5,7,9]
range(5, 2, -1) --> [5,4,3,2]
*/

function range(start, end, step = 1) {
    let arr = [];
    if (step >= 0) {
        if (start < end) {
            for (let count = start; count <= end; count+=step) {
                arr.push(count);
            }
        } else if (start > end) {
            for (let count = start; count >= end; count -= step) {
                arr.push(count);
            }
        }
    } else if (step < 0) {
        if (start < end) {
            for (let count = end; count >= start; count+=step) {
                arr.push(count);
            }
        } else if (start > end) {
            for (let count = start; count >= end; count += step) {
                arr.push(count);
            }
        }
    }
    return arr; 
}

// console.log(range(-5,10,-1));
// // [ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5 ]
// console.log(range(8,2,-2));
// // [ 8, 6, 4, 2 ]
// console.log(range(1,5,2));
// // [ 1, 3, 5 ]
// console.log(range(8,3));
// // [ 8, 7, 6, 5, 4, 3 ]
// console.log(range(8,3,2));
// // [ 8, 6, 4 ]
// console.log(range(5,2));


function sum(a) {
    let total = 0;
    for (let i of a) {
        total += i;
    };
    return total;
}

console.log(sum([1,2,3,4]));

// console.log(sum(range(1,5)));
// 5 + 4 + 3 + 2 + 1
// // 15
// console.log(sum(range(1,3)));
// // 6
// console.log(sum(range(1,10)));
// // 55


// Answer to 1st Part

// function range(start, end) {
//     let arr = [];
//     for (let count = end; count >= start; count--){
//         arr.unshift(count);
//     }   
//     return arr; 
// }

// console.log(range(2,4));
// // [ 2, 3, 4 ]
// console.log(range(1,9));
// // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]