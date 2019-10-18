/*
Data Structures: Objects and Arrays


Data Sets

Example: Represent a collection of the numbers 2,3,5,7, and 11

JS provides a data type specifically for storing sequences of values called an ARRAY
    - written as a list of values between square brackets, separated by commas
*/


// let listOfNumbers = [2,3,5,7,11];
// console.log(listOfNumbers[2]);
// // 5
// console.log(listOfNumbers[0]);
// // 2
// console.log(listOfNumbers[2-1]);
// // 3


/*
Indices are represented in [] that follows the array object


Properties

Expressions like 'myString.length' (length of string) and Math.max (maximum function) are expressions that access a PROPERTY of some value

Almost ALL JS values have properties
    * exceptions are 'null' and 'undefined'
    ** if you try to access a property on 1 of these nonvalues --> error
*/


// console.log(null.length);
// // TypeError: Cannot read property 'length' of null


/*
2 main ways to access properties in JS are with a '.' or '[]'
    * BOTH 'value.x' and 'value[x]' access a PROPERTY on value - but NOT the SAME property
        - the difference is in how 'x' is interpreted
        i. when using a '.', the after the '.' is the literal name of the property
        ii. when using '[]', the expression between the '[]' is evaluated to get the property name

    Example: 
        i. value.x fetches the property of 'value' named "x"
        ii. value[x] tries to evaluate the expression 'x' and uses the result, converted to a string, as the property NAME

    Example 2: 
        * if you know that the property you are interested in is CALLED 'color', you say 'value.color'
        * if you want to EXTRACT the property named by the value held in the binding 'i', you say value[i]

The elements in an array are stored as the array's properties, using NUMBERS as property names
    * can NOT use the '.' notation with numbers
    * '[]' with numbers

The 'length' property of an array tells us how many elements it has
    * 'array.length'


Methods

Both string and array objects contain a number of properties that hold function values
*/


// let doh = "Doh";
// console.log(typeof doh.toUpperCase);
// // function
// console.log(doh.toUpperCase());
// // DOH


/*
Every string has a 'toUpperCase' property
    - when called, it will return a string with all its letters in UPPERCASE

Another property is 'toLowerCase' which converts the letters in the string to lowercase

Properties that contain functions are called 'methods' of the value they belong to
    - toUpperCase is a METHOD of a string

Example: 2 methods you can use to manipulate arrays
*/


// let sequence = [1,2,3];
// sequence.push(4);
// sequence.push(5);
// console.log(sequence);
// // [ 1, 2, 3, 4, 5 ]
// console.log(sequence.pop());
// // 5
// console.log(sequence);
// // [ 1, 2, 3, 4 ]


/*
The 'push' method adds values to the END of an array
The 'pop' method does the opposite, REMOVING the LAST value in the array and returning it

* These are traditional terms for operations on a STACK
    - LIFO structure (items that were added LAST are removed FIRST)


Objects

Values of the type 'object' are arbitrary collections of properties

1 way to create an object is by using BRACES or "{}" as an expression
*/


// let day1 = {
//     squirrel: false,
//     events: ["work", "touched tree", "pizza", "running"]
// };

// console.log(day1.squirrel);
// // false
// console.log(day1.wolf);
// // undefined
// day1.wolf = false;
// console.log(day1.wolf);
// // false


/*
Inside the braces or {}, there is a list of properties separated by commas

* Each property has a NAME followed by a colon (:) and value

When an object is written over multiple lines, indenting it like in the example helps with readability

Propeties whose names aren't valid binding names or valid numbers HAVE to be quoted
*/


// let descriptions = {
//     work: "went to work",
//     "touched tree": "Touched a Tree"
// };


/*
This means that BRACES or "{}" have 2 meaning in IS
    - at the START of a statement, they start a BLOCK of statements
    - in any other position, they describe an OBJECT

Reading a property that does NOT exist will give you a value "undefined"

It is possible to assign a value to a property expression with the "=" operator
    - this will replace the property's value if it ALREADY existed or create a new property on the object if it did NOT

Property Bindings grasp values but other bindings and rooperties might be holding onto those SAME values

* 'delete' operator is a UNARY operator that, when applied to an object property, will REMOVE the named property from the object
    * NOT common BUT possible
*/


// let anObject = {
//     left: 1,
//     right: 2
// };
// console.log(anObject.left);
// // 1
// delete anObject.left;
// console.log(anObject.left);
// // undefined
// console.log("left" in anObject);
// // false
// console.log("right" in anObject);
// // true


/*
"in" is a BINARY operator
    - when applied to a STRING and an OBJECT, it tells you whether that object has a property with that name

The difference between setting a property to "undefined" and actually deleting it is that in the 1st case, the object still HAS the property (just no value) whereas in the 2nd case, there property is NO LONGER PRESENT and "in" will return 'false'

To find out what properties an object has, you can use "Object.keys(<an object>)" function
    - you give it an object and it returns an ARRAY of strings which are the object's property names
*/


// let anotherObject = {
//     x:0,
//     y:0,
//     z:2
// };
// console.log(Object.keys(anotherObject))
// // [ 'x', 'y', 'z' ]
// console.log(Object.keys({x: 0, y: 0, z: 2}))
// // [ 'x', 'y', 'z' ]


/*
"Object.assign()" function COPIES all properties from 1 object into ANOTHER

In the example below:
    - objectA already has keys 'a' and 'b' with their respective values
    - we use "Object.assign(<object>, <new keys/values>)" to update the current object
        * the old b has a value of 2 but we use 'assign' to update the object and now b has a value of 3
*/


// let objectA ={
//     a: 1,
//     b: 2
// };
// Object.assign(objectA, {b: 3, c: 4});
// console.log(objectA);
// // { a: 1, b: 3, c: 4 }


/*
Arrays are just a kind of object specialized for storing SEQUENCES of things

If you evaluate "typeof []", it produces "object"

Jacques & Squirrel Example: 
    we will represent the journal that Jacques keeps as an ARRAY of OBJECTS
*/


// let journal = [
//     {events: ["work", "touched tree", "pizza",             "running", "television"],
//     squirrel: false},
//     {events: ["work", "ice cream", "cauliflower","lasagna", "touched tree", "brushed teeth"],
//     squirrel: false},
//     {events: ["weekend", "cycling", "break",             "peanuts", "beer"],
//     squirrel: true},
//     // and so on
// ];


/*
Mutability

We saw that object VALUES can be modified
    * Numbers, Strings, Booleans are ALL IMMUTABLE (IMPOSSIBLE to change values of these types)

Objects work differently --> You can CHANGE their properties, causing a single object value to have different content at different times

With objects:
    there is a DIFFERENCE between having 2 references to the SAME object 
    and 
    having 2 DIFFERENT objects that contain the SAME properties

Example below
*/


// let object1 = {value: 10};
// let object2 = object1;
// let object3 = {value: 10};

// console.log(object1 == object2);
// // true
// console.log(object1 == object3);
// // false

// // equal operator UPDATES the existing key
// object1.value = 15;

// console.log(object1.value);
// // 15
// console.log(object3.value);
// // 10


/*
object1 and object2 bindings grasp the SAME object which is why CHANGING object1 also CHANGES the value of object 2
    * same identity

object3 points to a different object which initially contains the SAME properties as object1 but lives a SEPARATE life

Bindings can also be changeable or constant but this is SEPARATE from the way their values behave

Even though number values don't change, you can use a 'let' binding to keep TRACK of a changing number by changing the value the bind points at

a 'const' binding to an object can itself NOT be changed and will continue to point to the SAME object but the CONTENTS of that object might change
*/


// const score = {
//     visitors: 0,
//     home: 0
// };
// // = operator is used to change the value of an existing property
// score.visitors = 1;
// console.log(score)
// // { visitors: 1, home: 0 }

// // can NOT change the object like this
// score = {visitors:1, home:1};
// // TypeError: Assignment to constant variable.


/*
Jacques Example continued
*/


let journal = [];
function addEntry(events, squirrel) {
    journal.push({events, squirrel});
}


/*
Instead of DECLARING properties like events: events, it just gives a property name
    * SHORTCUT BUT MEANS THE SAME THING: 
        - if a property name in BRACE notation is NOT followed by a value, its value is taken from the binding with the SAME name
*/


addEntry(["work", "touched tree", "pizza", "running", "television"], false);
addEntry(["work", "ice cream", "cauliflower", "lasagna","touched tree", "brushed teeth"], false);
addEntry(["weekend", "cycling", "break", "peanuts", "beer"], true);

console.log(journal);
// [ { events: [ 'work', 'touched tree', 'pizza', 'running', 'television' ],
//     squirrel: false },
//   { events:
//      [ 'work',
//        'ice cream',
//        'cauliflower',
//        'lasagna',
//        'touched tree',
//        'brushed teeth' ],
//     squirrel: false },
//   { events: [ 'weekend', 'cycling', 'break', 'peanuts', 'beer' ],
//     squirrel: true } ]


/*
"Correlation" is a measure of DEPENDENCE between statistical variables
    - In statistics, you have a set of measurements and each variable is measured for EVERY measurement
    * "Correlation" between variables is usually expressed as a value that ranges from -1 to 1
        * 0  correlation means the variables are NOT related
        * 1 correlation indicates the 2 are perfectly related
        * -1 correlation means that the 2 are OPPOSITES

To compute the measure of correlation between 2 Boolean variables, we can use the "phi coefficient"
    - this is a formula whose INPUT is a FREQUENCY TABLE containing the number of times the different combinations of the variables were observed
    * the output of the formula iis a number between -1 and 1 which describes the correlation

We could take the event of eating 'pizza' and put that in a frequency table where each number indicates the amount of times that combination occured in our measurements

* Look at the textbook to see the formula
    - with the calculations made using that formula, we get an output of 0.069 which is TINY 


Computing Correlation

1. Represent a 2x2 table in JS with a 4 element array
    ([76, 9, 4, 1])
    * Most simple option
*/

function phi(table) {
    return (table[3] * table[0] - table[2] * table[1]) / 
    Math.sqrt((table[2] + table[3]) * 
              (table[0] + table[1]) * 
              (table[1] + table[3]) * 
              (table[0] + table[2]));
}

console.log(phi([76,9,4,1]))
// 0.06859943405700354


/*
The example above is a DIRECT translation of the 'phi' formula into JS

* "Math.sqrt" is the square root function which is provided by the Math object in a standard JS environment

** Look at journal.js


Array Loops
*/
