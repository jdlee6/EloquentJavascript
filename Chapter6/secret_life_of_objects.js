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

* When an object gets a request for a propety that it does NOT have, its prototype will be searched for the property, then the prototype's prototype and so on

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

The prototype object used when constructing objects is found by taking the 'prototype' property of the constructor function
*/


// // DEPRECATED WAY TO DECLARE A CLASS
// // constructor because it is Rabbit is capitalized
// function Rabbit(type) {
//     this.type = type;
// }
// // constructors AUTOMATICALLY have a property named 'prototype'
// // add .speak() property to the existing object
// Rabbit.prototype.speak = function(line) {
//     console.log(`The ${this.type} rabbit says '${line}'`);
// }

// let weirdRabbit = new Rabbit('weird');
// weirdRabbit.speak('I am weird');
// // The weird rabbit says 'I am weird'


/*
Constructors (all functions, in fact) AUTOMATICALLY get a property named 'prototype', which by default holds a plain, empty object that derives from Object.prototype

You can OVERWRITE it with a NEW object if you want 
or
Like in the example above, you can add properties to the existing object

Constructors' names are CAPITALIZED so that they can easily be distiniguished from other functions

* IMPORTANT to understand the distinction between the way a prototype is associated with a constructor (through its prototype) vs. the way objects 'have' a prototype (which can be found w. 'Object.getPrototypeOf')
    * the actual prototype of a constructor is 'Function.prototype' since constructors are functions
    * Its prototype property holds the prototype used for instances created through it
*/


// console.log(Object.getPrototypeOf(Rabbit) == Function.prototype);
// // true
// console.log(Object.getPrototypeOf(weirdRabbit) == Rabbit.prototype);
// // true


/*
Classes Notation

JS classes are constructor functions with a prototype property

Modern day notation:
*/


class Rabbit {
    constructor(type) {
        this.type = type;
    }
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
}

let purpleRabbit = new Rabbit("purple");
purpleRabbit.speak('I have purple fur!');
// The purple rabbit says 'I have purple fur!'
let greenRabbit = new Rabbit("green");
greenRabbit.speak('I have green fur!');
// The green rabbit says 'I have green fur!'


// Professor example
class Professor {
    constructor(subject, age, gender, name) {
        this.subject = subject;
        this.age = age;
        this.gender = gender;
        this.name = name; 
    }
    intro(line) {
        console.log(`Hello my name is Professor ${this.name} and I am ${this.age} years old. I am ${this.gender} and I teach ${this.subject}. ${line}`);
    }
}

let professorX = new Professor("mutants", 30, "male", "X");
professorX.intro('Welcome to class');
// Hello my name is Professor X and I am 30 years old. I am male and I teach mutants. Welcome to class


/*
The 'class' keyword starts a class declaration, which allows us to define a constructor and a set of methods all in a single place

Any number of methods may be written inside the declaration's braces

* the one named 'constructor' is treated SPECIALLY
    - provides the ACTUAL constructor function which will be found to the name Rabbit/Professor
    ** the others are packaged into that constructor's prototype
** this way looks much more nicer than the DEPRECATED way to write a class

Class declarations currently allow ONLY 'methods' - properties that hold functions - to be added to the prototype
    * this can be inconveneient when you want to save a NON-FUNCTION value in there
    ** For now, you can create such properties by DIRECTLY manipulating the prototype AFTER you've defined the class

Like 'function', 'class' can be used both in statements and in expressions
    * when used as an expression, it does NOT define a binding but just produces the CONSTRUCTOR as a value
        * you are allowed to OMIT the class name in a class expression
*/


let object = new class { getWord() { return "hello"; } };
console.log(object.getWord());
// hello


/*
Overriding Derived Properties

When you add a property to an object, whether it is present in the prototype or not, the property is added to the OBJECT ITSELF, NOT the prototype

If there was ALREADY a property with the same name in the prototype, this property will NO longer affect the object, as it is now HIDDEN behind the OBJECT's OWN property
*/


Rabbit.prototype.teeth = "small";
console.log(purpleRabbit.teeth);
// small
purpleRabbit.teeth = "small, short and dull";
console.log(purpleRabbit.teeth);
// small, short and dull
console.log(greenRabbit.teeth);
// small
console.log(Rabbit.prototype.teeth);
// small


/*
Refer to the diagram in the textbook
    Overriding properties that EXIST in a PROTOTYPE can be a useful thing to do
        - as the example above shows, overriding can be used to express EXCEPTIONAL properties in INSTANCES of a more generic class of objects, while letting the NONEXCEPTIONAL objects take a standard value from their prototype

    * Overriding is also used to give the standard FUNCTION and ARRAY prototypes a different 'toString()' method than the basic object prototype
*/


console.log(Array.prototype.toString == Object.prototype.toString);
// false
console.log([1,2].toString());
// 1,2


/*
Calling 'toString' on an array gives a result similar to calling '.join(",")' on it - it puts commas between the values in the array

Directly calling Object.prototype.toString with an array produces a different string
    * that function does NOT know about array, so it simply puts the word 'object' and the name of the type between square brackets
*/


console.log(Object.prototype.toString.call([1,2]));
// [object Array]


/*
Maps

We saw the word 'map' (higher order function) used transforms a data structure by applying a function to its elements

*** SAME word is also used for a RELATED but rather DIFFERENT thing

A 'map' (noun) is a data structure that associates values (the keys) with OTHER values
    Example: You might want to map 'names' to 'ages'
*/


// let ages = {
//     Boris: 39,
//     Liang: 22,
//     Julia: 62
// };

// console.log(`Julia is ${ages["Julia"]}`);
// // Julia is 62
// console.log("is Jack's age known?", "Jack" in ages);
// // is Jack's age known? false
// console.log("Is toString's age known?", "toString" in ages);
// // Is toString's age known? true


/*
Here, the object's property names are the PEOPLE'S NAMES and the property values are their AGES

* we did NOT list anybody named 'toString' in our map 
    * because plain objects deerive from Object.prototype - it looks like the property is there
    
** This is why using plain objects as 'maps' is DANGEROUS
    - there are several possible ways to avoid this problem
        1. it is possible to create objects with NO prototypes
            - if you pass 'null' to Object.create, the resulting object will NOT derive from Object.prototype and can be safely used as a 'map'
*/


console.log("toString" in Object.create(null));
// false


/*
Object property NAMES MUST be in strings
    - if you need a map whose keys can't easily be converted to strings - such as objects- you cannot use an object as your map

Fortunately JS comes with a built in class 'Map' that is written for this EXACT purpose
    * stores a mapping and allows ANY type of keys
*/

let ages = new Map();
ages.set("Boris", 39);
ages.set("Liang", 22);
ages.set("Julia", 62);

console.log(`Julia is ${ages.get("Julia")}`);
// Julia is 62
console.log("Is Jack's age known?", ages.has("Jack"));
// Is Jack's age known? false
console.log(ages.has("toString"));
// false


/*
The methods: set, get, has are part of the interface of the 'Map' object

If you do have a plain OBJECT that you need to treat as a MAP for some reason, it useful to known that 'Object.keys' returns only an object's own keys, NOT those in the prototype

As an alternative to the 'in' operator, you can use the .hasOwnProperty() method, which ignores the OBJECT'S PROTOTYPE
*/


console.log({x: 1}.hasOwnProperty("x"));
// true
console.log({x: 1}.hasOwnProperty("toString"));
// false
console.log("toString" in {x: 1});
// true


/*
Polymorphism
...


*/