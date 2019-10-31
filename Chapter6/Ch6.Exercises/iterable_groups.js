/*
Iterable Groups

Make the Group class from the previous exercise iterable

If you used an array to represent the group's members, don't just reutnr the iterator createed by calling the Symbol.iterator method on the array
    * that would work but it would defeat the purpose of this exercise
*/


class Group {
    constructor() {
        this.members = [];
    }
    add(member) {
        if (!(this.members.includes(member))) {
            this.members.push(member);
        }
    }
    delete(member) {
        for (let item of this.members) {
            if (item == member) {
                let index = this.members.indexOf(member);
                this.members.splice(index, 1);
            }
        }
    }
    has(member) {
        for (let item of this.members) {
            if (member == item) {
                return true;
            }
        }
        return false;
    }
    static from(iterable) {
        let group = new Group;
        for (let item of iterable) {
            group.add(item);
        }
        return group;
    }
}


// Group Iterator
class GroupIterator {
    constructor(group) {
        this.position = 0;
        this.group = group;
    }
    next() {
        if (this.position == this.group.members.length) return {done: true};

        let value = this.group.members[this.position];

        this.position++;
        return {value, done: false};
    }
}


Group.prototype[Symbol.iterator] = function() {
    return new GroupIterator(this);
}

for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
}
// a
// b
// c

let groupI = new GroupIterator(Group.from(['a', 'b']));
console.log(groupI.next());
// { value: 'a', done: false }
console.log(groupI.next());
// { value: 'b', done: false }
console.log(groupI.next());
// { done: true }


/* 
In the textbook Solution, instead of adding the [Symbol.iterator] as an addition to the Group.prototype

He just put [Symbol.iterator]() as an additional method to the Group class like so:

        ...
    [Symbol.iterator]() {
        return new GroupIterator(this);
    }
}
*/