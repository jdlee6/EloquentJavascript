/*
Borrowing a Method

Recall the object's 'hasOwnProperty' which can be used as a more robust alternative to the 'in' operator when you want to ignore the prototype's properties

What if your map needs to include the word "hasOwnProperty"?
    * you won't be able to call that method anymore because the object's own property hides the method value

Think of a way to call 'hasOwnProperty' on an object that has its own property by that name
*/

let map = {one: true, two: true, hasOwnProperty: true};

// Fix this call
// console.log(map.hasOwnProperty("one"));
// // true

console.log(hasOwnProperty.call(map, "one"));


// textbook solution
console.log(Object.prototype.hasOwnProperty.call(map, "one"));