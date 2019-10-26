/*
The Secret Life Of Objects


Encapsulation

The core idea in object-oriented programming is to DIVIDE programs into SMALLER pieces and makes each piece responsible for managing its OWN state
    * this way: some knowledge about the way a piece of the program works can be kept LOCAL to that piece
    * whenever these LOCAL details change, only the code directly AROUND it needs to be updated

DIFFERENT pieces of a program interact with each other through 'interfaces', limited set of a functions or bindings that provide useful functionality @ a more abstract level (hiding their precise implementations)

Object interfaces consist of a SPECIFIC set of methods and properties
    * properties that are part of the interface are PUBLIC
    * the other, which outside code should NOT be touching, are called PRIVATE
    
* JS does NOT distinguish PUBLIC vs PRIVATE properties BUT JS provides a work around
    * it is common to put an '_' @ the start of a property to indicate that those properties are PRIVATE

SEPARATING interface from implementation is called ENCAPSULATION


Methods

Methods are just properties that hold function values
*/

// Example of Methods
let rabbit = {};
rabbit.speak = function(line) {
    console.log(`The rabbit says '${line}'`);
};

rabbit.speak("I'm alive.");
// The rabbit says 'I'm alive.'


/*
Usually a method needs to do something with the object it was called on

When a function is called as a method - looked up as a property and immediately called, as in 'object.method()' - the binding called 'this' in its BODY automatically POINTS at the object it was called on
*/


function speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
}

let whiteRabbit = {type: "white", speak};
let hungryRabbit = {type: "hungry", speak};

whiteRabbit.speak("Oh my ears and whiskers, " + "how late it's getting!");
// The white rabbit says 'Oh my ears and whiskers, how late it's getting!'
hungryRabbit.speak("I could use a carrot right now.");
// The hungry rabbit says 'I could use a carrot right now.'


/*
Think of 'this' as 'self' in Python

* Think of 'this' as an extra parameter that is passed in a DIFFERENT way
    - if you want to pass it explicitly, you can use a function's 'call' method which takes the 'this' value as its FIRST argument and treats FURTHER arguments as NORMAL parameters
*/


speak.call(hungryRabbit, 'Burp!')
// The hungry rabbit says 'Burp!'


/*
Since each function has its own 'this' binding, whose values depends on the way it is called, you CANNOT refer to the 'this' of the wrapping scope in a regular function defined with the function keyword

Arrow functions are DIFFERENT - they do NOT bind their own 'this' but can see the 'this' binding of the scope AROUND them

Example: you can do something like the following code which references 'this' from inside a LOCAL function
*/


function normalize() {
    // map creates a new array
    // n divided by the object's length for every n in coords
    // these values will be pushed to the newly created array
    console.log(this.coords.map(n => n / this.length));
}

normalize.call({coords: [0,2,3], length: 5});
// [ 0, 0.4, 0.6 ]


/*
** if I had written the argument to 'map' using the 'function' keyword, the code would NOT work


Prototypes

Look at the example below
*/


let empty = {};
console.log(empty.toString);
// [Function: toString]
console.log(empty.toString());
// [object Object]


/*
Javascript Objects

In addition to their set of properties, most objects also have a PROTOTYPE

* A prototype is another objects that is used as a FALLBACK source of properties

* When an object gets a request for a propety that it does NOT have, its property will be searched for the property, then the prototype's property and so on

* So what is the prototype of an EMPTY object?
    * "Object.prototype"
*/


console.log(Object.getPrototypeOf({}) == Object.prototype);
// true
console.log(Object.getPrototypeOf(Object.prototype))
// null


/*
'Object.getPrototypeOf' returns the prototype of an object

The prototype relations of JS objects form a TREE-SHAPED structure and @ the ROOT of this structure sits 'Object.prototype'

Object.prototype provides a few methods that show up in ALL objects
    1 example: 'toString' which converts an object to a string representation

Many objects don't directly have Object.prototype as their prototype BUT INSTEAD have another object that provides a DIFFERENT set of default properties

* Functions derive from 'Function.prototype' and arrays derive from 'Array.prototype'
*/


console.log(Object.getPrototypeOf(Math.max) == Function.prototype);
// true
console.log(Object.getPrototypeOf([]) == Array.prototype)
// true


/*
Such a prototype object will itself have a prototype, often Object.prototype, so that it still INDIRECTLY provides methods like 'toString'

You can use 'Object.create' to create an object with a specific prototype
*/


let protoRabbit = {
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
};

let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";
killerRabbit.speak("SKREEE!");
// The killer rabbit says 'SKREEE!'


/*
A property like 'speak(line)' in an OBJECT EXPRESSION is a SHORTHAND way of defining a METHOD
    * CREATES a property called 'speak' and gives it a FUNCTION as its VALUE

The "proto" rabbit acts as a CONTAINER for the properties that are shared by ALL rabbits

An individual rabbit object like the 'killerRabbit' contains properties that apply only to itself (in this case its type) and derives SHARED properties from its prototype


Classes


JS's prototype system can be interpreted as a somewhat informal take on OOP concept called classes
    * a class defines the shape of a type of object - what methods and properties it has
    * such an object is called an 'instance' of the class

Prototypes are useful for defining PROPERTIES for which ALL instances of a class SHARE the SAME value such as methods

Properties that differ per instance, such as our rabbits' 'type' property need to be STORED DIRECTLY in the objects themselves

To create an instance of a given class, you have to make an OBJECT that derives from the proper prototype BUT also have to make sure it, itself, has the properties that instances of this class are supposed to have
    * this is what a 'constructor' function does
*/


function makeRabbit(type) {
    let rabbit = Object.create(protoRabbit);
    rabbit.type = type;
    return rabbit;
}

let blueRabbit = makeRabbit('blue');
blueRabbit.speak("YER")
// The blue rabbit says 'YER'


/*
JS provides a way to make defining this type of function easier
    * the 'new' keyword in FRONT of a function call is used to make the function a CONSTRUCTOR
    - this means that an object with the RIGHT prototype is automatically created, bound to 'this' in the function and returned at the END of the function

...
*/