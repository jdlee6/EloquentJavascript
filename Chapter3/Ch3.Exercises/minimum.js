/*
Write a function 'min' that takes 2 arguments and returns their minimum
*/

function mini(x, y) {
    if (x < y) {
        return x;
    } else {
        return y;
    }
}


console.log(mini(5,10));
// 5
console.log(mini(5,4));
// 4
console.log(mini(10,-20));
// -20
console.log(mini(-30,10));
// -30