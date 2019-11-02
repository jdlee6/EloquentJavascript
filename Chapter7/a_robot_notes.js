// Deeper context for this project via https://www.youtube.com/watch?v=PK2rB9VGWSA

const roads = [
    "Alice's House-Bob's House",
    "Alice's House-Cabin",
    "Alice's House-Post Office",
    "Bob's House-Town Hall",
    "Daria's House-Ernie's House",
    "Daria's House-Town Hall",
    "Ernie's House-Grete's House",
    "Grete's House-Farm",
    "Grete's House-Shop",
    "Marketplace-Farm",
    "Marketplace-Post Office",
    "Marketplace-Shop",
    "Marketplace-Town Hall",
    "Shop-Town Hall"
];

let graph = Object.create(null);
// creates a new array of [from, to] entries
console.log(roads.map(r => r.split("-")))

// assigns an array consisting of ['Bobs House'] as the value assigned to ['Alices House']
graph['Alices House'] = ['Bobs House'];
console.log(graph);

// because the array was created, you can easily just push new values on to the list
graph['Alices House'].push('Bobs House');
console.log(graph);


// VillageState excerpt
class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p;
                return {place: destination, address: p.address}
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }
}


/*
STATE:
    - all the functions that are being called - all the processes being manipulated in memory that is being stored in memory are referred to as STATE
        ie. as we travel through this 'graph', we're going to have the location of where we're at and where we're going to go (this is what is referred to as STATE)
            * starting from NEW locations & etc

'this' is an implicit method of passing around STATE from 1 method to another
    * when you have an object, the object is stored in STATE
    * 'this' is the STATE of the object
        ie. 'this.parcels' refers to the parcels in the current STATE

RECALL that the constructor is what sets up the STATE for the object

    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

        * defines a place property and also a parcels property

EVERY subsequent method you call has 'this' in it & that 'this' has access to the 'place' and 'parcels' that you constructed the object with
    * we have no idea what 'place' and 'parcels' object TYPES are so in JS to determine that - you will have to look at how they are being USED within the program to make those inferences

        if (!roadGraph[this.place].includes(destination)) {
            return this;
        }

        * we can see that 'this.place' may be used as a STRING

        let parcels = this.parcels.map(p => {
            if (p.place != this.place) return p;
        }

        * we can infer that 'this.parcels' is an ARRAY

How can we determine what the contents of that array are though?
        if (p.place != this.place) return p;

        * you can tell it is an OBJECT because of the 'p.place' part where .place is referring a object's PROPERTY
        
SO FAR WHAT WE DO KNOW:
    1. this.place is a STRING
    2. this.parcels is an ARRAY
    3. this.parcels contains OBJECTS
*/


// VillageState in Action Excerpt
let first = new VillageState("Post Office", [{place: "Post Office", address: "Alice's House"}]);
let next = first.move("Alice's House");
