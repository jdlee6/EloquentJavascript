/*
Reversing an Array


Arrays have a '.reverse()' method that changes the array by inverting the order in which its elements appear

For this exercise, write 2 functions:
    reverseArray
        - takes an array as argument and produces a new array that has the same elements in inverse order

    reverseArrayInPlace
        - does what the .reverse() method does:
            - it 'modifies' the array given as argument by reversing its elements
    
* Neither may use the standard .reverse() method
*/

let test = [1,2,3,4,5];
let sample = ["A", "B", "C", "D"];

function reverseArray(a) {
    let arr = [];
    for (let index = 0; index <= a.length-1; index++) {
        arr.unshift(a[index]);
    }
    return arr;
}
console.log(reverseArray(test));
// // [ 4, 3, 2, 1 ]
console.log(reverseArray(sample));
// [ 'D', 'C', 'B', 'A' ]


function reverseArrayInPlace(a) {
    for (let count = 0; count < Math.floor(a.length-1)/2; count++) {
        let temp = a[count];
        a[count] = a[a.length-1-count];
        a[a.length-1-count] = temp;
    }
    return a;
}
console.log(reverseArrayInPlace(test));
// [ 5, 4, 3, 2, 1 ]
console.log(reverseArrayInPlace(sample));
// [ 'D', 'C', 'B', 'A' ]