localStorage.setItem(
    "lastEditor",
    "javascript.html"
);




createEditor({

    language: "javascript",

    storageKey: "javascriptCode",

    defaultCode:

`console.log("Hello World");`
});





document.getElementById(
    "run-btn"
).addEventListener(

    "click",

    function () {

        runCode({

            language: "javascript"
        });
    }
);





document.addEventListener(

    "keydown",

    function (e) {

        if (

            e.ctrlKey

            &&

            e.key === "Enter"

        ) {

            e.preventDefault();

            runCode({

                language: "javascript"
            });
        }
    }
);
