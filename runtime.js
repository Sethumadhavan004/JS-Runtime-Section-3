// runtime.js

// Same IIFE(Immediately Invoked Function Expression)
((globalThis) => {
    const core = Deno.core;  // initialising the Deno.core package

    // function convert inputs given when calling console in example.js to strings
    function argsToMessage(...args) {
        return args.map((arg) => JSON.stringify(arg)).join(" ");
    }


    const sarcasticPhrases = [
        "Oh, what a groundbreaking discovery!",
        "Great job on becoming a Web developer.",
        "Sarcasm level: God.",
    ];

    //gives the time of executing in console
    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    }

    // To find whether Debugging was done
    const debugFlag = true;  



    // Defining the methods that are called in example.js.

    globalThis.console = {
        log: (...args) => {
            core.print(`[out]: ${argsToMessage(...args)}\n`, false);
        },

        sarcasm: (...args) => {
            
            const time = getCurrentTime();
            const sarcasticMessage = sarcasticPhrases[Math.floor(Math.random() * sarcasticPhrases.length)];
            const logMessage = `\x1b[1;35m[${time}][sarcasm]:\x1b[0m ${argsToMessage(...args)} \n\x1b[1m${sarcasticMessage}\x1b[0m`;
            core.print(`${logMessage}\n`, true);
        },

        // Creating warn method
        warn: (...args) => {
            const time = getCurrentTime(); // also displays time
            const warningMessage = `\x1b[1;33m[${time}][warn]:\x1b[0m ${argsToMessage(...args)}`;
            core.print(`${warningMessage}\n`, true);
        },

        // Creating error method
        error: (...args) => {
            const time = getCurrentTime();
            const errorMessage = `\x1b[1;31m[${time}][error]:\x1b[0m ${argsToMessage(...args)}`;
            core.print(`${errorMessage}\n`, true);
        },

        // Creating debug method 
        debug: (...args) => {
            if (debugFlag) {
                const time = getCurrentTime();
                const debugMessage = `\x1b[1;36m[${time}][debug]:\x1b[0m ${argsToMessage(...args)}`;
                core.print(`${debugMessage}\n`, true);
            }
        },
    };
})(globalThis);
