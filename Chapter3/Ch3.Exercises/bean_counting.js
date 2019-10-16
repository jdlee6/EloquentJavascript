/*
You can get the Nth character ,or letter, from a string by writing "string"[N]
The returned value will be a string containing ONLY 1 character (for example, "b")
The first character has position 0, which causes the last one to be found at position 'string.length - 1'
In other words, a 2 character string has length 2 and its characters have positions 0 and 1

Write a function 'countBs' that takes a string as its only argument and returns a number that indicates how many uppercase "B" characters there are in the string.

Next, write a function called 'countChar' that behaves like 'countBs', except it takes a 2nd argument that indicates the charcter that is to be counted (rather than counting only uppercase "B" characters). Rewrite countBs to make use of this new function
*/

let test = "BigBallerBrandB";

function countBs(word) {
    let count = 0;
    for (let index = 0; index <= word.length-1; index++) {
        if (word[index] == "B") {
            count += 1;
        }
    }
    return count;
}
console.log(countBs(test));
// 3


// countChar function
function countChar(word, letter) {
    let count = 0;
    for (let index = 0; index <= word.length-1; index++) {
        if (word[index] == letter) {
            count += 1;
        }
    }
    return count;
}
console.log(countChar(test, "B"))
// 4
console.log(countChar(test, "a"))
// 2