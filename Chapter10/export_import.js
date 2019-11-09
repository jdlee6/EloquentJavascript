/*
Export and Import


Export before Declarations

We can label any declaration as EXPORTED by placing 'export' BEFORE the variable/function/class
* look at export_ex1.js


Export apart from Declarations

We can put 'export' separately
    1. declare variables/functions/constants/classes
    2. export them
* look at export_ex2.js


Import *

Usually we put a list of what to import in curly braces 
    'import {...}'
* look at import_ex1.js

But if there's a lot to import, we can import EVERYTHING as an object using import * as <obj>
* look at import_ex2.js

Reason to explicitly list what we need to import:
    1. optimize them to speed up loading and remove unused stuff
        * ie. use 1 function out of 20 available functions in module
    2. explicitly listing what to import gives shorter names
    3. explicit list of imports gives better overview of the code structure


Import "as"

we use "as" to import under different names
* look at import_ex3.js


Export "as"

If you want to export functions with shorter names you can use "as" as well
* look at export_ex4.js


Export Default

In practice, there are 2 kinds of modules
    1. modulse that contain a library, pack of functions
    2. modules that declare a single entity, a module 'user.js' exports only 'class User'

'export default' syntax to make the 'one thing per module' look better
    * put 'export default" before the entity to export
    * there may be ONLY 1 'export default' per file
    * then import it WITHOUT curly braces
* look at export_default_ex.js


Import WITHOUT curly braces look NICER

    Named export                |   Default Export
    export class User {...}         export default class User {...}
    import {User} from ...          import User from ...

** A module has EITHER named export or the default one

** Because there may be at MOST 1 DEFAULT EXPORT per file, the exported entity may have NO name
* look at export_default_ex2.js
    NOTE exports WITHOUT 'default' NEED a name


The "default" name

In some situations the 'default' keyword is used to reference the defaulty export
* look at export_default_ex3.js


A word against default imports

Named exports are EXPLICIT - exactly name what they import
    * enforce us to use exactly the RIGHT name to import

        import {User} from './user.js';

Default export, we have to CHOOSE the name when importing;

        import User from './user.js'; (works)
        import MyUser from './user.js'; (works too)
            * 'import <ANYTHING>' and it would work

In order to avoid that chaos, there is a RULE that IMPORTED variables should correspond to their file NAMES

        import User from './user.js'
        import LoginForm from './loginForm.js'
        import func from './path/to/func.js'


Re-Export

"Re-export" == "export ... from ..." allows to IMPORT things and immediately EXPORT them (possibly under another name)

    export {sayHi} from './say.js' // re-export sayHi
    export {default as User} from './user.js' // re-export default

Essentially does:
    1. 
        // import login/logout and immediately export them
        import {login, logout} from './helpers.js';
        export {login, logout};

        // import default as User and export it
        import User from './user.js';
        export {User};
        ...

    2. 
    // import login/logout and immediately export them
    export {login, logout} from './helpers.js';

    // import default as User and export it
    export {default as User} from './user.js';
    ...


Re-exporting the default export

The 'default export' needs SEPARATE handling when re-exporting

    // 📁 user.js
    export default class User {
        // ...
    }

    1. 'export {default as User}'
    2. 'export * from './user.js' 
        * re-exports ONLY NAMED exports & IGNORES the default one
    * if you need to re-export BOTH then 2 statements are needed
        
        export * from './user.js'; // to re-export named exports
        export {default} from './user.js'; // to re-export the default export
*/