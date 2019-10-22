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
        
            let value = {color: 'blue'}
            console.log(value.color)
            console.log(value['col'+'or'])

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
This means that BRACES or "{}" have 2 meaning in JS
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

// console.log(object2.value);
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


// let journal = [];
// function addEntry(events, squirrel) {
//     journal.push({events, squirrel});
// }


/*
Instead of DECLARING properties like events: events, it just gives a property name
    * SHORTCUT BUT MEANS THE SAME THING: 
        - if a property name in BRACE notation is NOT followed by a value, its value is taken from the binding with the SAME name
*/


// addEntry(["work", "touched tree", "pizza", "running", "television"], false);
// addEntry(["work", "ice cream", "cauliflower", "lasagna","touched tree", "brushed teeth"], false);
// addEntry(["weekend", "cycling", "break", "peanuts", "beer"], true);

// console.log(journal);
// // [ { events: [ 'work', 'touched tree', 'pizza', 'running', 'television' ],
// //     squirrel: false },
// //   { events:
// //      [ 'work',
// //        'ice cream',
// //        'cauliflower',
// //        'lasagna',
// //        'touched tree',
// //        'brushed teeth' ],
// //     squirrel: false },
// //   { events: [ 'weekend', 'cycling', 'break', 'peanuts', 'beer' ],
// //     squirrel: true } ]


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


// function phi(table) {
//     return (table[3] * table[0] - table[2] * table[1]) / 
//     Math.sqrt((table[2] + table[3]) * 
//               (table[0] + table[1]) * 
//               (table[1] + table[3]) * 
//               (table[0] + table[2]));
// }

// console.log(phi([76,9,4,1]))
// // 0.06859943405700354


/*
The example above is a DIRECT translation of the 'phi' formula into JS

* "Math.sqrt" is the square root function which is provided by the Math object in a standard JS environment

** Look at journal.js
    - covers array loops
    - implements phi() function for correlation


Further Arrayology

* remember that ".push" and ".pop" methods were to add and remove elements at the END of the array

* the methods for adding and removing elements at the START of the array are called ".unshift()" and ".shift()"
*/


// let todoList = [];
// function remember(task) {
//     todoList.push(task);
// }
// function getTask() {
//     return todoList.shift();
// }
// function rememberUrgently(task) {
//     todoList.unshift(task);
// }

// remember('take out garbage');
// remember('clean dishes');
// console.log(todoList);
// // [ 'take out garbage', 'clean dishes' ]

// // .shift() REMOVES the 1st element of the array
// console.log(getTask());
// // take out garbage

// // .unshift() ADDS the task as the 1st element of the array
// rememberUrgently('fold clothes');
// console.log(todoList);
// // [ 'fold clothes', 'clean dishes' ]


/*
The program aboves manages a queue of tasks
    - you can add tasks to the end of the queue by calling 'remember('task')' which uses .push()
    - you can remove the 1st item from the queue with 'getTask()' which uses .shift()
    - you can add a task as the 1st item in the queue with '.unshift()'

To search for a specific value, arrays provide an .indexOf() method
    - searches through the array from START to END and return the INDEX at which the requesed value was found 
        * if NOT found it returns -1

    - to search from the end instead of the start, you can use .lastIndexOf() method
*/


// let nums = [1,2,7,3,2];

// console.log(nums.indexOf(2));
// // 1
// console.log(nums.lastIndexOf(2));
// // 4


/*
Both .indexOf() and .lastIndexOf() take an OPTIONAL 2nd argument that indicates WHERE to START searching

.slice() method takes a START and END indices and returns an array that has only the elements between them
    * START index is INCLUSIVE
    * END index is EXCLUSIVE
*/


// console.log(nums.slice(0,3));
// // [ 1, 2, 7 ]

// // when the END index is NOT given, 'slice' will take ALL of the elements AFTER the START index
// console.log(nums.slice(1));
// // [ 2, 7, 3, 2 ]

// // You can also OMIT the START index to copy the entire array
// console.log(nums.slice())
// // [ 1, 2, 7, 3, 2 ]


/*
.concat() method can be used to GLUE arrays together to create a NEW array 
    * similar to the '+' operators for STRINGS

Example: shows both .concat() and .slice() in action
    - takes an array and an index and it returns a new array that is a copy of the original array with the element at the given index removed
*/


// function remove(array, index) {
//     return array.slice(0, index).concat(array.slice(index+1));
// }

// console.log(remove(['a','b','c','d','e'], 2));
// // [ 'a', 'b', 'd', 'e' ]

// // if .concat() receives an argument that is NOT an array, that value will be added to the NEW array as it were a 1-element array 
// let alphabet = ["a","b","c","d","e"];
// console.log(alphabet.slice(0,2).concat(1))
// // [ 'a', 'b', 1 ]


/*
Strings and Their Properties

.length() & .toUpperCase()

Manually adding properties do NOT stick (look at the example below)
*/


// let kim = "Kim";
// kim.age = 88;
// console.log(kim.age);
// // undefined


/*
Strings, Numbers, and Booleans, are NOT objects therefore does NOT store any properties
    * these values are IMMUTABLE and CANNOT be changed

String Built In Properties

Arrays and Strings share the following properties:
    .slice()
    .indexOf()
*/


// let phrase = "Hello World";
// console.log(phrase.slice(0,5));
// // Hello
// console.log(phrase.indexOf("W"));
// // 6
// console.log(phrase.indexOf("l"));
// // 2

// // searches from the last index to the first index
// console.log(phrase.lastIndexOf("l"));
// // 9


/*
the String's .indexOf() method can search for a string containing more than 1 character, whereas the corresponding 

.trim() method REMOVES whitespaces (spaces, newlines, tabs, and similar characters) from the start and end of a string

.padStart() takes the desired length and padding characters as arguments

.split() can be used to split a string on every occurence of another string

.join() can be used to join it again

.repeat() method can be used to repeat the string

.length() method is used to find the length

string[index] retrieves the character at the index given
*/


// console.log(phrase.indexOf("llo"));
// // 2
// console.log("       yerrrr      ".trim());
// // yerrrr
// console.log(String(6).padStart(3, "0"));
// // 006
// console.log(phrase.split(" "));
// // [ 'Hello', 'World' ]
// console.log(phrase.split(" ").join("_"));
// // Hello_World
// console.log(phrase.repeat(2));
// // Hello WorldHello World
// console.log("Yo"[1]);
// // o


/*
Rest Parameters

Math.max() computes the maximum of ALL the arguments it is given

ANY number of arguments can be represented with '...' in the parameters
*/


// function maxi(...numbers) {
//     let result = -Infinity;
//     for (let number of numbers) {
//         if (number > result) result = number;
//     }
//     return result;
// }

// console.log(maxi(2,3,1,23,1));
// // 23


/*
When such a function is called, the "rest parameter" is bound to an ARRAY containing all further arguments

If there are other parameters before it, their values aren't part of that array

When, as in 'max', it is the only parameter, it will hold ALL arguments

You can use a similar '...' notation to CALL a function with an array of arguments
    - this SPREADS out the array into the function call and passes its elements as SEPARATE arguments
    * you can also include an array like that ALONG with other arguments
        maxi(0, ...numbers, 2)
*/


// let numbers = [5,1,7];
// console.log(maxi(...numbers));
// // 7
// console.log(maxi(numbers));
// // -Infinity
// console.log(maxi(0, ...numbers, 2));
// // 7

// // [] array nottation similarly allows '...' operator to spread another array into a new array
// let words = ["never", "fully"];
// console.log(["will", ...words, "understand"]);
// // [ 'will', 'never', 'fully', 'understand' ]


/*
Math Object

Math.max() - maximum
Math.min() - minimum
Math.sqrt() - square root

Math object is used as a contianer to group related functionalities
    - provides a 'namespace' so that all these functions and values do NOT have to be global bindings
    * more names taken, the more likely you accidentally overwrite an existing binding

Math.cos - cosine
Math.sin - sine
Math.tan - tangent

Inverse:
Math.acos, Math.asin, Math.atan 
Math.PI - PI / 3.14....

Math.random - returns a random number between 0 and 1
Math.floor - rounds DOWN to the nearest whole number
Math.ceil - rounds UP to the nearest whole number
Maht.round - rounds to the nearest whole number
Math.abs - takes the absolute value of the number


* Old programming tradition to write names of CONSTANT values in ALL CAPS
*/


// function randomPointOnCircle(radius) {
//     let angle = Math.random() * 2 * Math.PI;
//     return {x: radius * Math.cos(angle),
//             y: radius * Math.sin(angle)};
// }

// console.log(randomPointOnCircle(2));
// // { x: -1.286131462459016, y: -1.5316219707463825 }

// console.log(Math.floor(1.8131231));
// // 1

// // whole random number with Math.floor() on the result of Math.random()
// // multiplying the random number by 10 gives us a number between 0 and 10 and Math.floor rounds down
// console.log(Math.floor(Math.random()*10));
// // 2


/*
Destructuring

Recall the phi function that we made

    function phi(table) {
        return (table[3] * table[0] - table[2] * table[1]) /
            Math.sqrt((table[2] + table[3]) *
                (table[0] + table[1]) *
                (table[1] + table[3]) *
                (table[0] + table[2]));
    }

This function is awkward to read because we have binding pointing at our array but we'd rather have bindings for the ELEMENTS of the array like so:
    let n00 = table[0]

    function phi([n00, n01, n10, n11]) {
        return (n11 * n00 - n10 * n01) /
            Math.sqrt((n10 + n11) * (n00 + n01) *
                      (n01 + n11) * (n00 + n10));
    }

* If you know the value you are binding is an array, you can use [] to "look inside" of the value and bind its contents

* Similar trick works for objects using {} instead of []
*/


let name = {name: "Faraji"};
console.log(name);
// { name: 'Faraji' }
let {age} = {name: "Faraji"};
console.log(age);
// undefined
let {birthday} = {name:"Faraji", birthday:"May"};
console.log(birthday);
// May


/*
JSON

Serialization format - JSON 
    - JS Object Notation
    * used as a data storage and communication format

- All property names have to be surrounded by "" / double quotes
    - ONLY simple data expressions are ALLOWED
    * NO function calls, bindings, or anything that involve computation
    ** Comments are NOT allowed in JSON

Example: 
    {
    "squirrel": false,
    "events": ["work", "touched tree", "pizza", "running"]
    }

JSON methods:
    JSON.stringify - takes a JS value and returns a JSON encoded string
    JSON.parse - takes a JSON encoded string and converts it to the value it encodes
*/


let string = JSON.stringify({squirrel: false, events: ["weekend"]});

console.log(string);
// {"squirrel":false,"events":["weekend"]}
console.log(JSON.parse(string));
// { squirrel: false, events: [ 'weekend' ] }
console.log(JSON.parse(string).events);
// ["weekend"]