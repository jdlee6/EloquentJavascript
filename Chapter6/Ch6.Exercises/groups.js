/*
Groups

Standard JS environment provides another data structure called 'Set'

Like an instance of 'Map', a 'Set' holds a COLLECTION of VALUES
    * UNLIKE 'Map', it does NOT associate other values with those - it just tracks which values are part of the set

    * A value can be part of a set ONLY once - adding it again does NOT have any effect


Write a class called 'Group' (since Set is already taken)
    * Like Set, it has 'add', 'delete' and 'has' methods
    * its constructor creates an EMPTY group
    * 'add' ADDS a value to the group but ONLY if it is NOT already a member
    * 'delete' REMOVES its argument from the group (if it was a member)
    * 'has' returns a Boolean value indicating whether its argument is a member of the group

Use the === operator or something equivalent such as 'indexOf' to determine whether 2 values are the same

Give the class a 'static 'from'' method that takes an iterable object as an argument and creates a group that contains all the values produced by iterating over it
*/

class Group {
    constructor() {
        this.members = [];
    }

    // add method
    add(member) {
        if (!(this.members.includes(member))) {
            this.members.push(member);
        }
    }

    // delete method
    delete(member) {
        for (let item of this.members) {
            if (item == member) {
                let index = this.members.indexOf(member);
                this.members.splice(index, 1);
            }
        }
    }

    // has method
    has(member) {
        for (let item of this.members) {
            if (member == item) {
                return true;
            }
        }
        return false;
    }
    
    // static 'from' method
    static from(iterable) {
        let group = new Group;
        for (let item of iterable) {
            group.add(item);
        }
        return group;
    }
}

// add method is weird
let group = Group.from([10,20]);
console.log(group);
group.add(10);
console.log(group.members);
// console.log(group.has(10));
// group.delete(10);
// console.log(group.members);
// group.delete(20);
// console.log(group.members);