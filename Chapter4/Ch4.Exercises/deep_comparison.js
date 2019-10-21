/*
Deep Comparison


The '==' operator compares objects by identity BUT sometimes you'd prefer to compare the values of their actual properties

Write a function 'deepEqual' that takes 2 values and returns 'true' only if they are the same value or are objects with the same properties
    where the values of the properties are equal when compared with a recursive call to deepEqual

To find out whether values should be compared directly (use the '===' operator) or have their properties compared, you can use the 'typeof' operator

If it produces 'object' for BOTH values, then you should do a deep comparison

** NOTE 'typeof null' also produces 'object'
Object.keys functions will be useful when you need to go over the properties of objects to compare them
*/


let obj = {here: {is: "an"}, object: 2};
let obj1 = {naw: 1, object: 2};
let obj2 = {here: 1, object: 2};

function deepEqual(a, b) {
    if (a === b) {
        return true;
    } else if ((typeof a == "object" && b != null) && (typeof b == "object" && b != null)) {
        if (Object.keys(a).length != Object.keys(b).length) {
            return false;
        }
        for (var key in a) {
            if (b.hasOwnProperty(key)) {
                if (! deepEqual(a[key], b[key])) {
                    return false;
                }
            } else {
                return false;
            }
        } return true;
    } else {
        return false;
    }
} 

console.log(deepEqual(obj, obj));
// true
console.log(deepEqual(obj, obj1));
// false
console.log(deepEqual(obj,obj2));
// false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// true