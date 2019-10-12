// console.log('time to start learning js ... here we go - wish me luck')
/*
This is used for Multiline Comments
*/
// This is used for One line Comments

/* 
Values

Chunks that represent pieces of information in a js environment are valled values
    - play different roles
    - every value has a type that determines its roles 
    * some 'Values' are numbers, some 'Values' are strings, some 'Values' are functions and etc...

To create a value, all you have to do is invoke its name (call for a value)
    * as soon as you no longer use a value, it will be deleted


Numbers

Values of the number type are NUMERIC values
    * Example: 13, 16
    * Use that in a program and it will cause the bit pattern for those numbers to come into existence
    
JS uses a fixed number of bits, 64 of them, to store a SINGLE number value
    * number of different numbers that can be representeed is limited
    ** Given 64 binary digits, you can represent 2^64 different numbers

Not all whole numbers fit in a JS number
    * this bits are stored as negative numbers so 1 bit indicates the sign of the number

Another issue is that non whole numbers must also be represented
    - to do this, some of the bits are used to store the position of the decimal point

Fraction numbers are written by using a dot
    * Example: 13.52

For very big or very small numbers, you may use scientific notation by adding an 'e' (for exponent), followed by the exponent of the number

Important take away is that you must treat FRACTIONAL digital numbers as approximations NOT as precise values
*/


// console.log(13,15.23, 2.2e9)


/*
Arithmetic

Addition or Multiplication take 2 number values and produce a new number from them

+ and * symbols are OPERATORS (addition and multiplication)
    * putting an operator between 2 values will apply it to those values and produce a new value

Example:
    100 + 4 * 11
    * does this example mean add 4 and 100 first then multiply the result by 11 OR does the multiplication done before adding?
        * multiplication happens first (PEMDAS)
        * to do the prior, just wrap the addition in parentheses

    (100 + 4) * 11

- is the subtraction operator
/ is the division operator

* When operators appear together without parentheses, the order in which they are applied is determined by the PRECEDENCE of the operators
    * aka PEMDAS
    * when multiple operators with the SAME precedence appear next to each other as in 1 - 2 + 1, they are applied LEFT to RIGHT (1-2) + 1

% is the modulo operator (remainder operation)
    Example: 314 % 100 --> 14
             144 % 12 -->  12
*/


// console.log(100+4*11)
// console.log((100+4)*11)
// console.log(1-2+1)
// console.log((1-2)+1)
// console.log(314%100)
// console.log(144%12)


/*
Special Numbers

There are 3 special values in Javascript that are considered numbers but do NOT behave like normal numbers

The 1st 2 are 'Infinity' and '-Infinity', POSITIVE and NEGATIVE infinities
    * 'Infinity - 1' is still Infinity

The 3rd is 'NaN'
    * stands for 'not a number' (but the value is of the number type)
    * this is the result for examples like 0/0 (0 divided by 0) or Infinity - Infinity
*/


// console.log(Infinity)
// console.log(Infinity-1)
// console.log(0/0)


/*
Strings

The next basic data type is the string
    - used to represent text
    - written by enclosing their content in quotes
    * Example
        - `Down on the sea`
        - "Lie on the ocean"
        - 'Float on the ocean'

    * you can use single quotes, double quotes or backticks to mark strings as long as the quotes are at the START and the END of the string match

Special Characters that are difficult to turn into a String
    - *Newlines* (the characters you get when you press Enter) can be included without escaping only when the string is quoted with backticks

    * to make it possible to include such characters in a string:
        - whenever a BACKSLASH (\) is found inside quoted text, it indicates that the character after it has a SPECIAL meaning
            * this is called ESCAPING the character

        - when an 'n' character occurs after the backslash, it is interpreted as a new line
        - 't' for tab
*/

// console.log(`Down on the sea`)
// console.log('Lie on the ocean')
// console.log("Float on the ocean")
// console.log("this is the first line\nAnd this is the second")

/*
There are situations where you want a backslash in a string to be just a backslash
    * this what happens when 2 backslashes follow each other
*/


// console.log('A newline character is written like \"\\n\".')


/*
Strings must be modeled as a series of bits to be able to exist inside the computer
    - this is handled by the Unicode standard (assigns a number to virtually every character you would ever need)
        * if we have a number for every character, a string can be described by a sequence of numbers

Javascript's representation uses 16 bits per string element (2^16)
    * some characters take up 2 'character positions' in JS strings

Strings can NOT be divided, multiplied, or subtracted
    * BUT the + operator can be used on them
        ** it does NOT add but it CONCATENATES 2 strings together
        - Example: "con" + "cate" + "nate" --> concatenate
*/


// console.log('con'+'cate'+'nate')


/*
* String values have a number of associated functions (methods) that can be used to perform other operations on them (Later Chapter)

Strings written with SINGLE or DOUBLE quotes behave very much the same
    * ONLY difference is in which type of quote you need to escape inside of them
        * Backtick-quoted strings are usually called 'template literals' 
            * f-strings in Python f'{100/2}' is the same as 
            * `{100/2}` in JS (back-tick)
            
        * Apart from being able to span lines, they can also embed other values
*/


// console.log(`half of 100 
// is 
// ${100/2}

// This line spans multiple
// lines
// because
// it is back-ticked`)


/*
Unary Operators

Not all operators are symbols
* Some are written as words
    - Example: 'typeof'
        * typeof operator produces a string value naming the type of the value you give it
*/


// console.log(typeof 4.5)
// number
// console.log(typeof "x")
// string


/*
The other operators shown all operated on 2 values
    * 'typeof' ONLY operators on 1 value

Operators that use 2 values are called 'binary operators'
Operators that use 1 value are called 'unary' operators
    * the - operator (minus) can be used both as a binary operator and as a unary operator
*/


// console.log(10-2)
// 8
// console.log(-(10-2))
// -8


/*
Boolean Values

It is often useful to have a value that distinguishes between only 2 possibilities
    -'yes' and 'no'
    - 'on' and 'off'

    JS has a Boolean type which has just 2 values, true and false
        * in Python these are capitalized, in JS these are ALL lowercase


Comparison

Example: 1 way to produce Boolean values
    - console.log(3>2)
    - console.log(3<2)
*/


// console.log(3>2)
// true
// console.log(3<2)
// false


/* 
- the < and > signs are the traditional symbols for "greater than" and "less than"
    * these are BINARY operators

Strings can be compared in the same way
    - Example: "Aardvark" < "Zoroaster"

    * the way strings are ORDERED is roughly alphabetic 
        * UPPERCASE letters < lowercase letters
        * "Z" < "a"
        * NONALPHABETIC characters (!, -, and so on) are also included in the ordering
    
    * when comparing strings, JS goes over the characters from LEFT to RIGHT, comparing the unicode codes 1 by 1

* other similar operators are >= (greater than or equal to), <= (less than or equal to), == (equal to) and != (not equal to)

** there is ONLY 1 value in JS that is NOT equal to itself and that is NaN ("not a number")
    * NaN is supposed to denote the result of a nonsensical computation therefore it isn't equal to the result of any OTHER non sensical computations
*/


// console.log("Aardvark" > "Zoroaster")
// false
// console.log("Itchy" != "Scratchy")
// true
// console.log("Apple" == "Orange")
// false
// console.log(NaN == NaN)
// false


/*
Logical Operators

There are also some operations that can be APPLIED to Boolean values themselves
    - JS supports 3 logical operators: 'and', 'or', 'not'
        * these are used to "reason" about Booleans

    * && operator represents logical 'and'
        - binary operators and its reult is true ONLY if BOTH the values given to it are true
*/

// console.log(true && false)
// false
// console.log(true && true)
// true

/* 
    * || operator denotes logical 'or'
        - produces true if either of the values given to it is true

    * ! operator denotes logical 'not'
        - !true --> false and !false --> true

When mixing these Boolean operators with arithmetic and other operators, it is NOT always obvious when parentheses are needed
    * in terms of precedence, from lowest to highest:
        - || 
        - &&
        - comparison operators (>, ==, etc.)
        - the rest of the operators
*/

// console.log(1+2==3 || 2+1==1)
// true
// console.log(!true)
// false
// console.log(1+1==2 && 10*10>50)
// true

/*
the last logical operator is TERNARY (operating on 3 values)
    * written with a question mark and a colon
    Example
        - true ? 1 : 2
        - false ? 1 : 2
    * ?: is called a CONDITIONAL/TERNARY operator
        - the value on the LEFT of the ? "picks" which of the other 2 values will come out
        
        * when it is true, it chooses the MIDDLE value
        * when it is false, it chooses the value on the RIGHT
*/


// console.log(true ? 1 : 2)
// 1
// console.log(false ? 0 : 3)
// 3


/*
Empty Values

There are 2 special values, written 'null' and 'undefined' that are used to denote the absence of a meaningful value
    * these are values themselves but they carry NO information

Many operations in the language that don't produce a meaningful value yield 'undefined' simply because they have to yield some value

* can treat 'undefined' and 'null' as interchangeable


Automatic Type Conversion

* JS goes out of its way to accept almost any program you give it, even programs that do odd things

* When an operator is applied to the "wrong" type of a value, JS will quietly CONVERT that value to the type it needs
    * this is called 'type coercion'
*/


// console.log(8 * null)
// 0
// console.log("5" - 1)
// 4
// console.log("5" + 1)
// 51
// console.log("five" * 2)
// NaN
// console.log(false == 0)
// true
// console.log(false == 1)
// false


/*
1. 'null' in the 1st expression becomes 0
2. "5" in the second expressions becomes 5 (string -> number)
3. + tries string concatenation BEFORE numeric addition, so 1 is converted to "1" (number -> string)

* 4.  when something that does NOT map to a number in an obvious way ("five" or undefined) is converted to a number, you get the value NaN
    - further arithmetic operations on NaN keep producing NaN so if you find yourself getting 1 of those in an unexpected place, look for accidental type conversions

5. comparing values of the SAME type using ==
    - true when BOTH values are the same EXCEPT in the case of NaN
    * when the types DIFFER, JS uses a complicated and confusing set of rules to determine what to do
    
    * MOST cases, it tries to convert 1 of the values to the other value's type
        - when null or undefined occurs on either side of the operator, it produces true only if BOTH side are one of null or undefined

    * this behavior is useful when you want to test whether a value has a real value instead of null or undefined
        - can compare with the == or != operator

    ** what if you want to test whether something refers to the precise value false?
        - expressions such as 
            - 0 == false
            - "" == false
            * these are true because of the automatic type conversion

        * when you do NOT want any type conversions to happen, there are 2 additional operators
            * === and !==
                i. ===: this tests whether a value is precisely equal to the other
                ii. !==: tests whether it is NOT precisely equal
            
            - Example
                "" === false is false as expected

* three character comparison operators should be used when you are not certain of the types of both sides
*/


// console.log(null == undefined) 
// true
// console.log(null == 0)
// false         

// === compares the types of both sides which is different
// console.log(2==="2")
// false

// == converts 1 of the values to the other value's type
// console.log(2=="2")
// true

// console.log(2===2)
// true
// console.log(0==false)
// true
// console.log(0===false)
// false


/*
Short Circuiting of Logical Operators

The logical operators && and || handle values of DIFFERENT types in a SPECIFIC way

They will convert the value on their LEFT side to Boolean type in order to decide what to do 
BUT 
depending on the operator and the result of that conversion, they will return either the original left hand value or the right hand value

Example: || operator
    * will return the value to its left when that can be converted to true and will return the value on its right otherwise
*/


// console.log(null || "user")
// user
// console.log("Agnes" || "user")
// Agnes


/*
* use this functionality as a way to FALL BACK on a default value
    * if you have a value that might be EMPTY, you can put || after it with a replacement value
        * if the initial value can be converted to false, you'll get the replacement instead
    
- the rules for converting strings and numbers to Boolean values staes that 0, NaN, and the empty string "" count as false
- while ALL the other values count as true
    * example: 0 || -1 --> -1
               "" || "!?" --> "!?"

- the && operator works similarly but the other way around
    - when the value to its LEFT is something that converts to false, it returns that value and OTHERWISE it returns the value on its RIGHT

Another important property of these 2 operators is that the part to their right is evaluated only when NECESSARY
    - Example: true || X
        * no matter what X is - the result will be true and X is never evaluated
    - Example: false && X
        * false and will ignore X
    * this is called Short-Circuit Evaluation
*/

console.log(0 || -1)
// -1
console.log(true && -2)
// -2
console.log(false && -2)
// false