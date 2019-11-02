/*
Project: A robot

The project in this chapter is to build an automation, a little program that performs a task in a virtual world
    The automation will be a mail-delivery robot picking up and dropping off parcels


Meadowfield
    * consists of 11 places with 14 roads between them
        * can be described with an array
    
    The network of roads in the village forms a 'graph'
        * a graph is a collectioin on points (places in the village) with lines between them (roads)
        * this graph will be the world the our robot moves through
*/

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


/*
The array of strings is NOT easy to work with
    * we are interested in the DESTINATIONS that we can reach from a given place

Need to convert the list of roads to a data structure that, for each place, tells us what can be reached from there
*/


function buildGraph(edges) {
    let graph = Object.create(null);

    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to]; 
        } else {
            graph[from].push(to);
        }
    }

    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

const roadGraph = buildGraph(roads);

/*
buildGraph() creates a 'map' object that for each node stores an array of connected nodes
    * uses the '.split()' method to go from the road strings, which have the form "Start-End" to 2 element arrays containing the start and end as separate strings


The Task

The robot will be moving around the village
    * there are parcels in various places, each addressed to some other place
    * robot picks up parcels when it comes to them and delivers them when it arrives at their destinations

The automation must decide, at each point, where to go next
It has FINISHED its task when ALL parcels have been delivered

To simulate this process:
    1. define a virtual world that can describe it
        * model will tell us where the robot is and where the parcels are
        * when the robot has decided to MOVE somewhere, we need to UPDATE the model to reflect the NEW situation

*** DO NOT USE THE TYPICAL OOP FOR THIS ***


Instead, let's condense the village's state down to the minimal set of values that define it
    - the robot's current location
    - collection of undelivered parcels
        - each parcel has a current location & a destination
    * let's make it so that we do NOT change this state when the robot moves but rather compute a NEW state for the situation AFTER the move
*/


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
.move(destination) method - a function in a class that expects 'this'
    1. checks whether there is a road going from the CURRENT place to the DESTINATION and if NOT, it returns the OLD state since this is NOT a valid move

    2. it then creates a NEW state with the destination as the robot's NEW place 
        * BUT it also needs to create a NEW set of parcels - parcels that the robot is carrying (that are at the robot's CURRENT place) need to be MOVED along to the new place
        * parcels that are addressed to the NEW place need to be delivered - that is, they need to be REMOVED from the set of UNDELIVERED parcels
            * the call to 'map' takes care of the MOVING
            * the call to 'filter' does the DELIVERING
    
Parcel objects are NOT changed when they are MOVED but RE-CREATED

* The move() method gives us a NEW village state but leaves the old one entirely intact
*/


let first = new VillageState("Post Office", [{place: "Post Office", address: "Alice's House"}]);
let next = first.move("Alice's House");

console.log(next.place);
// Alice's House
console.log(next.parcels);
// []
console.log(first.place);
// Post Office
console.log(first.parcels);
// [ { place: 'Post Office', address: 'Alice\'s House' } ]


/* 
The move causes the parcel to be DELIVERED and this is reflecteed in the NEXT state

But the INITIAL state still describes the situation where the robot is at the post office and the parcel is UNDELIVERED


Persistent Data
*/