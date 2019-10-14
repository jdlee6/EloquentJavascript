/*
Write a loop that makes seven calls to console.log to output the following triangle:

* may be useful to know that you can find the LENGTH of a string by writing .length after it

Example:
    let abc = "abc";
    console.log(abc.length);
    3
*/

//  while loop
let char = "#";
while (char.length < 7) {
    console.log(char);
    char += "#";
}
// #
// ##
// ###
// ####
// #####
// ######


// for loop
for (let char = "#"; char.length < 7; char += "#") {
    console.log(char);
}
// #
// ##
// ###
// ####
// #####
// ######