/*
Retry 


Say you have a function 'primitiveMultiply()' that in 20% of cases multiplies 2 numbers and in the other 80% of cases raises an exception of type 'MultiplicatorUnitFailure'

Write a function that wraps this clunky function and just keeps trying until a call succeeds, after which it returns the result

* Make sure you handle ONLY the exceptions you are trying to handle
*/

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
    if (Math.random() < 0.2) {
        return a * b;
    } else {
        throw new MultiplicatorUnitFailure("Klunk");
    }
}

function reliableMultiply(a, b) {
    // infinite loop
    for (;;) {
        try {
            return primitiveMultiply(a, b);
        } catch (e) {
            if (!(e instanceof MultiplicatorUnitFailure)) {
                throw e;
            }
        }
    }
}


// function reliableMultiply(a, b) {
//     for (let i = 0;;i++) {
//         try {
//             return primitiveMultiply(a, b);
//         } catch (e) {
//             if (!(e instanceof MultiplicatorUnitFailure)) {
//                 throw e;
//             }
//         }
//     }
// }

// console.log(primitiveMultiply(8, 8));

console.log(reliableMultiply(8, 8));
// // → 64