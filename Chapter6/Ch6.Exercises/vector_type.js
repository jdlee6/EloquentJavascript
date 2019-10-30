/*
Vector Type

Write a class Vec that represents sa vector in 2D space
    - takes 'x', 'y' parameters (numbers) which it should save to properties of the same name

Give the Vec prototype 2 methods
    'plus' and 'minus' that takes another vector as a parameter and return a NEW vector that has the sum or difference of the 2 vectors' (this and the parameter) x and y values

Add a getter property 'length' to the prototype that computes the length of the vector - that is, the distance of the point (x, y) from the origin (0, 0)
*/


class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    // plus method
    plus(other) {
        return new Vec(this.x + other.x, this.y + other.y);
    }
    // minus method
    minus(other) {
        return new Vec(this.x - other.x, this.y - other.y);
    }
    // getter method
    get length() {
        return Math.floor(Math.sqrt(this.x**this.x, this.y**this.y));;
    }
}

// let v1 = new Vec(1, 1);
// console.log(v1.plus(new Vec(2,2)));
console.log(new Vec(1, 2).plus(new Vec(2, 3)));
console.log(new Vec(1, 2).minus(new Vec(2, 3)));

// getter method to the Prototype
console.log(new Vec(3, 4).length);