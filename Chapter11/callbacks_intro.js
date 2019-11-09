/*
Introduction: Callbacks

Actions in JS are ASYNCHRONOUS  
    - initiate them NOW but finish LATER

We can schedule actions using 'setTimeout'

Look at the funciton below:
    - loads a script with the given 'src'
    appends to the document the new, dynamically created, tag <script src="...">

        function loadScript(src) {
            let script = document.createElement('script');
            script.src = src;
            document.head.append(script);
        }

        loadScript('/my/script.js')

The script is executed "asynchronously" as it starts LOADING NOW, but RUNS LATER, when the function has ALREADY finished

** If there was any code below loadScript(...) - it does NOT wait until the script loading finishes

What if we need to use the new script as soon as it loads (declares new functions and we want run them)?
    - if we do that immediately AFTER 'loadScript(...)' call, it would NOT work

        loadScript('/my/script.js'); // the script has "function newFunction() {…}"
        newFunction(); // no such function!

    * the browser did NOT have time to load the script
        - 'loadScript()' does NOT provide a way to TRACK the load COMPLETION
        * the script loads and eventually runs, that's it
            * we'd like to know when it happens to use NEW functions and variables from THAT script

In order to mediate this, we can add a CALLBACK function as a second argument to 'loadScript()' that should execute when the script loads

1. 
    function loadScript(src, callback) {
        let script = document.createElement('script');
        script.src = src;

        script.onload = () => callback(script);

        document.head.append(script);
    }

Now if we want to call NEW functions FROM the script, we should write that in the CALLBACK:

2. 
    loadScript('/my/script.js', function() {
        // the callback runs after the script is loaded
        newFunction(); // so now it works
        ...
    });

* this is the idea: the 2nd argument is a FUNCTION (usually anonymous) that runs when the action is COMPLETED

Look at the example below
*/

// function loadScript(src, callback) {
//     let script = document.createElement('script');
//     script.src = src;
//     script.onload = () => callback(script);
//     document.head.append(script);
// }

// loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
//     alert(`Cool, the script ${script.src} is loaded`);
//     alert( _ ); // function declared in the loaded script
// });


/*
A function that does something ASYNCHRONOUSLY should provide a CALLBACK argument where we put the function to run after it's complete


Callback in callback

How can we load 2 scripts SEQUENTIALLY: the FIRST one and THEN the SECOND one after it?
    * Natural solution would be to put the second 'loadScript' call INSIDE the CALLBACK like so:

    loadScript('/my/script.js', function(script) {
        alert(`Cool, the ${script.src} is loaded, let's load one more);

        loadScript('/my/script2.js', function(script) {
            alert(`Cool, the second script is loaded`);
        });
    });

After the OUTER 'loadScript' is COMPLETE, the CALLBACK initiates the inner one

What about another script?

    loadScript('/my/script.js', function(script) {
        loadScript('/my/script2.js', function(script) {
            loadScript('/my/script3.js', function(script) {
            // ...continue after all scripts are loaded
            });
        })
    });

* Although this is OK for FEW actions, it is NOT good for MANY


Handling Errors

What if the script loading fails? Our CALLBACK should be able to react to that

    // improved version with tracking errors
    function loadScript(src, callback) {
        let script = document.createElement('script');
        script.src = src;

        script.onload = () => callback(null, script);
        script.onerror = () => callback(new Error(`Script load error for ${src}`));

        document.head.append(script);
    }

The function above calls 'callback(null, script)' for SUCCESSFUL load and 'callback(error)' otherwise

    Usage:
    loadScript('/my/script.js', function(error, script) {
        if (error) {
            // handle error
        } else {
            // script loaded successfully
        }
    });

* this is COMMON and is known as "Error-First-Callback"

Convention is:
    1. 1st argument of the callback is reserved for an ERROR if it occurs --> callback(err) is called
    2. 2nd argument (and the ones if needed) are for SUCCESSFUL results --> callback(null, result1, result2...) is called

* SINGLE callback function is used BOTH for reporting errors and passing back results


Pyramid of Doom

For 1 or 2 nested calls - callbacks are completely fine to use

But if you have MULTIPLE asynchronous actions that follow one AFTER another the code will look like this:

loadScript('1.js', function(error, script) {
    if (error) {
        handleError(error);
    } else {
        // ...
        loadScript('2.js', function(error, script) {
            if (error) {
                handleError(error);
            } else {
                // ...
                loadScript('3.js', function(error, script) {
                    if (error) {
                        handleError(error);
                    } else {
                        // ...continue after all scripts are loaded (*)
                    }
                });
            }
        })
    }
});

    1. we load 1.js, then if there's NO error
    2. we load 2.js, then if there's NO error
    3. we load 3.js, then if there's NO error -> do something else (*)

As calls become MORE NESTED, the code becomes DEEPER and increasingly DIFFICULT to manage ESPECIALLY if there is code that needs to be processed at (*) with more loops/conditionals and etc.

This type of scenario is typically known as "callback hell" or "pyramid of doom"

This is NOT good code

To alleviate these types of situations, we need to make EVERY ACTION a standalone function like so:

    loadScript('1.js', step1);

    function step1(error, script) {
        if (error) {
            handleError(error)
        } else {
            loadScript('2.js', step2);
        }
    }

    function step2(error, script) {
        if (error) {
            handleError(error)
        } else {
            loadScript('3.js', step3);
        }
    }

    function step3(error, script) {
        if (error) {
            handleError(error)
        } else {
            ...(*)...
        }
    }

NOTE how it does the SAME but there is NO longer any more DEEP nesting now because we made every action a SEPARATE top-level function

BUT this is STILL bad - it is DIFFICULT to read

Luckily, there are other ways to avoid such pyramids. 1 of the BEST way is to use "promises" (next chapter)
*/
