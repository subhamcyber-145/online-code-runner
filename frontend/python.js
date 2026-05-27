localStorage.setItem(
    "lastEditor",
    "python.html"
);




createEditor({

    language: "python",

    storageKey: "pythonCode",

    defaultCode:

`print("Hello World")`
});





document.getElementById(
    "run-btn"
).addEventListener(

    "click",

    function () {

        runCode({

            language: "python"
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

                language: "python"
            });
        }
    }
);
