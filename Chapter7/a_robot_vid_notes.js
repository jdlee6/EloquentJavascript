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


// let graph = Object.create(null);
// // creates a new array of [from, to] entries
// console.log(roads.map(r => r.split("-")))

// // assigns an array consisting of ['Bobs House'] as the value assigned to ['Alices House']
// graph['Alices House'] = ['Bobs House'];
// console.log(graph);

// // because the array was created, you can easily just push new values on to the list
// graph['Alices House'].push('Bobs House');
// console.log(graph);


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

console.log(next);
// VillageState { place: 'Alice\'s House', parcels: [] }
console.log(next);
// VillageState { place: 'Alice\'s House', parcels: [] }




/*
The objective is to move the parcel TO Alice's House FROM the Post Office

* NOTE what 'next' returns - it does NOT modify 'first' but instead it is returning a NEW state which is why it is always the SAME
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
Take a step back:
    function runRobot(state, robot, memory)

    * you need to understand and figure out what type of parameters 'runRobot' is expecting or you will NOT be able to understand what this function is actually doing

What are the types of 'robot', 'state' and 'memory' in this excerpt?
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;

    1. 'robot()' behaves like a FUNCTION
    2. 'memory' is the robot's (function) STATE
        * history of what it knows and what it has done
        - when you run robot(state, memory) and you are given a NEW STATE

    3. 'state' is the VillageState's STATE
        - aka MORE STATE

    4. action is an OBJECT because it has .memory & .direction properties

What we NOW know:
    1. robot(state, memory) is returning an 'action' which is an object with .memory and .direction properties

    2. state is the result of calling state.move()
        * Recall that .move() is a METHOD and takes a parameter, action.direction, and returns a whole NEW object
        * Recall that the TYPE of class that 'state' is a VillageState
            * b/c VillageState.move() returns a NEW state, we can determine that the 'state' in function runRobot(state, robot, memory) is a VillageState object!
    
** UNLIKE OOP, Functional programming relies on changing/mutating the STATE by CHANGING the OBJECT itself
*/


function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}


/*
        function randomPick(array) {
            let choice = Math.floor(Math.random() * array.length);
            return array[choice];
        }

    1. Math.random() returns a number between 0 (INCLUSIVE) and 1 (EXCLUSIVE)
    2. We then multiply that number by array length & use Math.floor() to retrieve the INDEX of the array
        ie. a = [1,2,3]
            i. .99 * 3 -> 2.97 -> Math.floor(2.97) -> 2
                * Math.floor() rounds DOWN to the nearest WHOLE number
            ii. 0.1 * 3 -> 0.3 -> Math.floor(0.3) -> 0
    3. Now that we have the INDEX after using Math.floor(), we are returning the element at that index with array[choice], where 'choice' is the variable that stores the INDEX

    ** essentially, randomPick() function generates a RANDOM element out of the ARRAY

        function randomRobot(state) {
            return {direction: randomPick(roadGraph[state.place])};
        }
    
    * Recall that 'roadGraph' is the variable that stores the buildGraph() function which generates a GRAPH of all the places TO & FROM
        - an OBJECT with keys and values
            * Alice's House: ['Bob's House', 'Cabin', 'Post Office'] ...

    1. NOTE how randomRobot(state) takes the parameter 'state'
        * RECALL that we defined this 'state' as the VillageState
        * so 'state' has 2 properties because it is a VillageState
            - state.place (FROM)
            - state.addresses (TO)

    2. so 'state.place' refers to ANY place that we are currently AT 

        return {direction: randomPick(roadGraph[state.place])}

        * so we're going to look up whereever we are at in this 'roadGraph' object and it will give us an ARRAY of VALUES, which will tell us the POSSIBLE locations that we can go
*/


VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            // body
            place = randomPick(Object.keys(roadGraph));
                // condition
        } while (place == address);
        parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
};


/*
VillageState.random takes a parcelCount parameter
    let address = randomPick(Object.keys(roadGraph));

        * we get 1 of the keys with the randomPick() function we created and we store that key in the 'address' variable

    do {
        place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({place, address});

The 'do/while' loop checks for an EDGE case:
    ** Recall that a do/while loop has a BODY in the do code block and a CONDITION in the 'while' 
    - it generates a place randomly and stores that value in the 'place' variable
        * the loop executes the body, then CHECKS the condition and if it is TRUE, it executes code in the do code block again and again
    
    * so if the condition in while loop is FALSE, then you push the ({place, address}) to the 'parcels' ARRAY
        * NOTE {place} outputs {place: 'place variable'}
        * Refer to the example below

TYPICALLY when you are programming in JS, you wouldn't want to use 'parcels' as the variable but instead it would make more sense to use 'tasks' because these are the things that need to be done
*/


console.log(Object.keys(roadGraph));
// [ 'Alice\'s House',
//   'Bob\'s House',
//   'Cabin',
//   'Post Office',
//   'Town Hall',
//   'Daria\'s House',
//   'Ernie\'s House',
//   'Grete\'s House',
//   'Farm',
//   'Shop',
//   'Marketplace' ]

console.log(randomPick(Object.keys(roadGraph)));
// Town Hall
console.log(randomPick(Object.keys(roadGraph)));
// Farm
console.log(randomPick(Object.keys(roadGraph)));
// Grete's House

// let parcels = [];
// let place = 'store';
// let address = 'home';
// parcels.push({place, address});
// console.log(parcels);
// // [ { place: 'store', address: 'home' } ]


console.log(VillageState.random());
// VillageState {
//     place: 'Post Office',
//     parcels:
//      [ { place: 'Bob\'s House', address: 'Shop' },
//        { place: 'Farm', address: 'Grete\'s House' },
//        { place: 'Daria\'s House', address: 'Grete\'s House' },
//        { place: 'Shop', address: 'Farm' },
//        { place: 'Bob\'s House', address: 'Ernie\'s House' } ] }
  

// runRobot(VillageState.random(), randomRobot);
// // → Moved to Marketplace
// // → Moved to Town Hall
// // → …
// // → Done in 63 turns


const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];


/*
Mail Route
    * a route that hits all of the possible places
    * the worst case would it run twice, 1 to pick up and 1 to drop off

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
routeRobot(state, memory)
    * INITIALIZING 'memory' to the mailRoute
    * 'state' and 'memory' are BOTH states
    * .slice(# of elements) removes the # of elements and returns a NEW array

    return {direction: memory[0], memory: memory.slice(1)};

        - 'direction' is set to the 1st element of memory array
        - 'memory' is set to the REST of the array WITHOUT that 1st element


Refer to https://eloquentjavascript.net/code/#7 for the ANIMATION of this program

The buildings (assigned by 1 letter) refers to the keys of roadGraph (Object.keys(roadGraph))
    - there are visuals for the packages as well
*/

// let a = [1,2,3,4,5];
// console.log(a.slice(1));
// // [ 2, 3, 4, 5 ]
// console.log(a.slice(2));
// // [ 3, 4, 5 ]



// Graph Theory 
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