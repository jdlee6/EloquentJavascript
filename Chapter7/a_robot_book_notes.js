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
        * BUT it also needs to create a NEW set of parcels - parcels that the robot is carrying (that are at the robot's CURRENT place) need to be MOVED along TO the NEW place
        * parcels that are addressed to the NEW place need to be delivered - that is, they need to be REMOVED from the set of UNDELIVERED parcels
            * the call to 'map' takes care of the MOVING
                * returns a NEW array by updating the 'place' property with the destination
                
            * the call to 'filter' does the DELIVERING
                - if you do NOT have the .filter() then the parcel object would be 
                    {place: "Alice's House", address: "Alice's House"}
                        * so if the place/address is the SAME then that means the parcel has been DELIVERED and the parcels property should be EMPTY

Parcel objects are NOT changed when they are MOVED but RE-CREATED

* The move() method gives us a NEW village state but leaves the old one entirely intact
*/


let first = new VillageState("Post Office", [{place: "Post Office", address: "Alice's House"}]);
let next = first.move("Alice's House");


// console.log(next);
// // VillageState { place: 'Alice\'s House', parcels: [] }

// console.log(next.place);
// // Alice's House

// console.log(next.parcels);
// // []

// // because "Nowhere" is NOT a valid move it is simply returning the OLD state
// console.log(first.move("Nowhere"));
// // VillageState {
// //     place: 'Post Office',
// //     parcels: [ { place: 'Post Office', address: 'Alice\'s House' } ] }

// console.log(first.place);
// // Post Office
// console.log(first.parcels);
// // [ { place: 'Post Office', address: 'Alice\'s House' } ]



/* 
The move causes the parcel to be DELIVERED and this is reflected in the NEXT state

But the INITIAL state still describes the situation where the robot is at the post office and the parcel is UNDELIVERED


Persistent Data

Data structures that do NOT change are called IMMUTABLE/PERSISTENT
    * behave like STRINGS/NUMBERS 

* In JS, just about everything CAN be changed so working with values that are supposed to be IMMUTABLE requires some restraint
    * 'Object.freeze()' changes an object so that writing to its properties is IGNORED
    * you can use this to make that your objects are NOT changed if you want to be careful
        
CONS of Object.freeze():
    - requires the computer to do EXTRA work
    - having updates ignored is just as CONFUSING to someone if they are told to do the wrong thing
    ** the IDEAL way it to just tell people that a given object should NOT be messed with
*/


// let object = Object.freeze({value: 5});
// object.value = 10;
// console.log(object.value);
// // 5


/*
Simulation

The robot will look at the world and decide in which direction it wants to move

We could say that a ROBOT is a FUNCTION that takes a VillageState object and returns the name of a nearby place
    * we want the robot to be able to REMEMBER things so that they can make and execute plans

    * also pass them their memory and allow them to return a NEW memory
        * the thing a ROBOT returns is an OBJECT 
            * Object contains BOTH the DIRECTION it wants to move in & a MEMORY value that will be given back to it the NEXT time it is called
*/


function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            break;
        }

        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}

/*
Consider what a robot has to do to "solve" a given state
    * must PICK up all parcels by visiting every location that has a parcel & DELIVER them by visiting every location that a parcel is addressed to but ONLY AFTER picking up the parcel

Dumbest strategy?
    - robot could just walk in a RANDOM direction every turn
        * eventually it will run into ALL parcels and then also at some point reach the place where they should be delivered

* Look at the code below
*/

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

/*
Explanation

Math.random() returns a number between 0 and 1 but ALWAYS below 1
    * multiplying by the length of an array and then applying Math.floor() gives us a RANDOM index for the array

Since this robot does NOT need to remember anything, it ignores its 2nd argument
    *** In JS, functions can be called with EXTRA arguments without any effects) and omits the memory property in its returned object

Let's see this robot in action 
    1st need a way to CREATE a NEW state with some parcels
        * a 'static' method is a good place to the put that functionality
*/


VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
            // don't want any parcels that arent sent from the SAME place as they are ADDRESSED to
            // and IF that happens, the do loop will assign a new place to the 'place' variable
        } while (place == address);
        parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
};


runRobot(VillageState.random(), randomRobot);
// → Moved to Marketplace
// → Moved to Town Hall
// → …
// → Done in 63 turns


/*
/*
The Mail Truck's Route

If we find a route that passes all places in the village, the robot could run that route TWICE at which point it is guaranteed to be DONE (similar to the REAL WORLD)
    1 route can be seen below (starting from "Post Office")
*/


const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

/*
To implement the route-following robot, we will need to make use of the robot MEMORY
    * the robot keeps the REST of its route in its MEMORY and drops the 1st element EVERY turn
*/

function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}


/* 
Pathfinding

Efficient method:
    1. Be able to deliberately move towards a given parcel or toward the location where a parcel has to be delivered
    * doing that, even when the goal is more than 1 move away will REQUIRE some kind of route finding function

* The problem of finding a route through a graph is a typical search problem
    - we can tell whether a given solution (a route) is a valid solution but we can't directly compute the solution the way we could for 2 + 2
        * INSTEAD, we have to keep creating potential solutions until we find one that works

The number of possible routes through a graph is infinite
    * BUT when searching for a route from A to B, we are only interested in the ones that start at A 
        - and routes that visit the SAME place TWICE are INEFFICIENT

What we want is the SHORTEST ROUTE
    - make sure we look at SHORT routes BEFORE we look at LONGER ones
    - a good approach would be to "grow" routes from the STARTING point
        * explore each reachable place that has NOT been visited yet until a route reaches the goal
        
        * this way, we'll only explore routes that are potentially interesting and we'll find the SHORTEST route to the goal
*/


function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({at: place, route: route.concat(place)})
            }
        }
    }
}


/*
The exploring has to be done in the right order, the places that were reached first have to be EXPLORED first
    1. function keeps a 'work' list 
        - an array of places that should be explored next, along with the route that got us there
            * starts at START position aka 'from' and has an EMPTY route

    2. the search begins by taking the next item in the list and exploring that, which means all roads from that place are LOOKED at
        - if 1 of them is the goal, a finished route can be returned
        - otherwise, if we haven't look at this place before, a new item is added to the list
        * if we have looked at it before, since we are looking at SHORT routes first, we've found either a longer route to that place or 1 precisely as long as the existing one and we DON't need to explore it

* Picture a web of known routes from the START location, growing evenly on all sides
    * as soon as the 1st thread reaches the GOAL, that thread is traced BACK to the start --> gives us our route

* Background info:
    - we know that the graph is connected, meaning that every location can be reached from all other locations
*/


function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}
    

/*
The robot uses its memory value as a LIST of directions to move in
    * when the list is EMPTY, it has to figure out what to do NEXT
    - takes the 1st undelivered parcel in the set and if that parcel hasn't been picked up yet, plots a route toward it
    - if that parcel has been picked up, it still needs to be delivered so that robot creates a route toward the delivery address instead
*/


