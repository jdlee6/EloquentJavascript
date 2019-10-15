/*
Write a program that creates a string that represents an 8 x 8 grid, using newline characters to separate lines

At each position of the grid, there is either a space or a "#" character

The characters should form a chessboard something like this:

 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # #

When you have a program that generates this pattern - define a binding size = 8 and change the program so that it works for any size, outputting a grid of the given width and height
*/

var str = "";
var size = 8;

for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
        if ((i + j) % 2 == 0) 
            str += " ";
        else if ((i + j) % 2 == 1) 
            str += "#";
    }
    // console.log(str.length)
    str += "\n"
}

console.log(str);