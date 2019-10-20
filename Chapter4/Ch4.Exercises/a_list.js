/*
A List


Objects can be used to build all sorts of data structures

A common data structure is the 'list' (not to be confused with array)

A list is a NESTED SET of objects, with the 1st object holding a reference to the 2nd, the 2nd to the 3rd and so on...

        let list = {
            value: 1,
            rest: {
                value: 2,
                rest: {
                value: 3,
                rest: null
                }
            }
        };

A nice thing about lists is that they can share parts of their structure

Example:
    if I create 2 new values 
        {value: 0, rest: list} and {value: -1, rest: list}
    * 'list' referring to the binding defined earlier
    * they are BOTH independent lists but they share the structure that makes up their last 3 elements
    * the OG list is also still a valid 3-element list

Write a function, 'arrayToList', that builds up a list structure like the 1 shown when given [1,2,3] as argument

Write a function 'listToArray' that produces an array from a list

Write a helper function 'prepend' which takes an element and a list and creates a new list that adds the element to the FRONT of the input list 

Write a function 'nth' which takes a list and a number and returns the element at the given position in the list 
*/



function arrayToList(a) {
    var list = null;
    for (let i = a.length-1; i >= 0; i--) {
        list = {value: a[i], rest: list};
    }
    return list;
}
// console.log(arrayToList([1,2,3]));
// // { value: 1, rest: { value: 2, rest: { value: 3, rest: null } } }
// console.log(arrayToList([10,20]));
// // { value: 10, rest: { value: 20, rest: null } }



// for every iteration, 'node' points to the current sublist
// at the end of an iteration, node moves to the next sub list
// when node.value is 'null', we have reached the end
function listToArray(list) {
    var arr = [];
    for (let node = list; node; node = node.rest) {
        arr.push(node.value);
    }
    return arr;
}
// console.log(listToArray(arrayToList([10, 20, 30])))
// // [ 10, 20, 30 ]



// Write a helper function 'prepend' which takes an element and a list and creates a new list that adds the element to the FRONT of the input list 
function prepend(element, list) {
    list = {value: element, rest: list};
    return list;
}
// console.log(prepend(10, prepend(20, null)));
// // { value: 10, rest: { value: 20, rest: null } }



// Write a function 'nth' which takes a list and a number and returns the element at the given position in the list 
function nth(list, number) {
    var l = listToArray(list);
    for (let i = 0; i <= l.length; i++) {
        if (i == number) {
            return l[i];
        }
    }
}

// console.log(nth(arrayToList([10, 20, 30]), 1));
// // 20