/*
Write a program that uses console.log to print all the numbers from 1 to 100 with 2 exceptions
    1. For numbers divisible by 3, print "Fizz"
    2. For numbers divisible by 5 (not 3), print "Buzz"

Once that is completed, modify program to print "FizzBuzz" for numbers that are both divisible by both 3 and 5
*/

for (let x = 1; x <= 15; x++) {
    if (x % 3 == 0 && x % 5 == 0) {
        console.log("FizzBuzz");
    } else if (x % 3 == 0) {
        console.log("Fizz");
    } else if (x % 5 == 0) {
        console.log("Buzz");
    } else { 
        console.log(x);
    }
}

// console.log(0 % 3 == 0)