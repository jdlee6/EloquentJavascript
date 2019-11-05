/*
Persistent Group


Most DS provided in JS's standard environment are NOT well suited for PERSISTENT use

Arrays:
    .slice() & .concat() methods to allow them to easily create NEW arrays WITHOUT damaging the OLD one

But 'Set' has no methods for creating a NEW set with an item added or removed

Write a new class PGroup, similar to the Group class, which stores a set of values
    - implements an add, delete and has method
        * 'add' method should return a NEW PGroup instance with the given member ADDED and leave the OLD one UNCHANGED
        * 'delete' creates a NEW instance without a given member

The class should work for values of ANY type & does NOT have to be efficient when used with large amounts of values

* The constructor should NOT be part of the class's interface 
    * INSTEAD there is an empty instance, PGroup.empty that can be used as a STARTING value
*/


class PGroup {
    constructor(members) {
        this.members = members;
    }

    add(value) {
        if (this.has(value)) return this;
        return new PGroup(this.members.concat([value]));
    }

    has(value) {
        return this.members.includes(value);
    }

    delete(value) {
        if (!this.has(value)) return this;
        return new PGroup(this.members.filter(v => v != value));
    }
}


PGroup.empty = new PGroup([]);
let a = PGroup.empty.add('a');

console.log(a);
// PGroup { members: [ 'a' ] }

// when attempting to add the same letter -> returns old STATE without any changes
console.log(PGroup.empty.add('a'));
// PGroup { members: [ 'a' ] }
console.log(a.has('b'));
// false
console.log(a.has('a'));
// true
console.log(a.delete('b'));
// PGroup { members: [ 'a' ] }
console.log(a.delete('a'));
// PGroup { members: [] }
console.log(a);
// PGroup { members: [ 'a' ] }


// Textbook tests
let ab = a.add("b");
let b = ab.delete("a");
console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false