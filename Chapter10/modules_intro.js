// Referencing javascript.info

/*
Modules Introduction

Modules can load each other and use special directives 'export' and 'import' to interchange functionality, call functions of 1 module from another one
    * 'export' keyword labels vairables and functions that should be accessible from the outside the current module

    * 'import' allows to import functionality form other modules

Example: sayHi.js

Browser (index.html):
    1. 'export' keyword before function name
    2. 
        <script type="module">
            import {sayHi} from './sayHi.js';
            
            document.body.innerHTML = sayHi("Joe");
        </script>


Node:
    1. Save ALL modules with the '.mjs' extension
        a. sayHi.mjs
            * "export default <func name>"
        b. main.mjs
            * "import <funcName> from <file>"

    2. node  --experimental-modules  <filename>.mjs


Core Module Features
    * Modules ALWAYS "use strict" by default
    * Module level scope
        * Each module has its OWN top level scope - in other words, top level variables and functions from a module are NOT seen in other scripts
    
Example: hello.js & user.js in index2.html
    * No such variable exists in hello.js therefore NOTHING shows up on index2.html

Example 2: hello.js 
    * when you import the variable in to 'hello.js' and then set it as the document.body.innerHTML -> it shows on the browser
        * HAD to remove the import of "user.js" in index.html

Example 3: In the browser, independent top-level scope also exists for each <script type="module">

    <script type="module">
        // The variable is only visible in this module script
        let user = "John";
    </script>

    <script type="module">
        alert(user); // Error: user is not defined
    </script>

* if we need to make a WINDOW-LEVEL GLOBAL variable, we can explicitly assign it to 'window' and access as 'window.user'
    * this is typically done ONLY if there is a good reason for this


A module code is evaluated only the 1st time when imported

If the SAME module is imported into MULTIPLE other places, its code is executed ONLY the FIRST time and then exports are given to all importers

Example 4:
    If executing a module code brings side-effects (like showing a message), then importing it multiple time will trigger it ONLY ONCE - the FIRST TIME

Example 5: Let's say a module exports an object
    * if a module is imported from MULTIPLE files, the module is ONLY evaluated the FIRST time
        ie:
            'admin' object is created and then passed to all further importers
                - all importers get 1 and ONLY 'admin' object
                * changes made in the first import will appear in the following imports
    Explanation:
        - exports are generated and then they are SHARED between importers
            - if something CHANGES, the other imports will see that

Example 6: 'admin.js' may provide certain functionality but expect the credentials to come into the 'admin' object from outside
    1. export 'admin' object from admin.js WITHOUT name property defined
    2. added a name property in init.js to the 'admin' object
    3. we set an alert to the name property in other.js and then we call the function defined in admin.js


Import.meta

'import.meta' (an object) contains the information about the CURRENT module
    * content depends on the environment
    * in the browser, it contains the url of the script or a current webpage url if inside HTML
        outputs the main url of the html page 

    
In a module, "this" is UNDEFINED

    In a module, TOP-LEVEL 'this' is undefined
    But in non-module scripts, 'this' is a global object and refers to the "Object Window"


Browser-specific Features

There are several browser specific differences of scripts with "type="module"" compared to regular ones
    * Revisit this section after you have covered DOM


Summary:
    1. module is a file
        * to make 'import/export' work, browsers need <script type="module"></script>
        differences: ... 
    2. modules have their own, local top level scope and interchange functionality via 'import/export'
    3. modules always use "use strict"
    4. module code is executed only ONCE. Exports are created once and shared between importers.
*/