window.editor = null;
window.isRunning = false;



function createEditor(config) {

    require.config({

        paths: {

            vs:
            "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs"
        }
    });




    require(

        ["vs/editor/editor.main"],

        function () {

            window.editor =

            monaco.editor.create(

                document.getElementById(
                    "editor"
                ),

                {

                    value:

                    localStorage.getItem(
                        config.storageKey
                    )

                    ||

                    config.defaultCode,

                    language:
                    config.language,

                    theme:
                    "vs-dark",

                    automaticLayout:
                    true,

                    fontSize:
                    15
                }
            );



            window.editor.onDidChangeModelContent(

                function () {

                    localStorage.setItem(

                        config.storageKey,

                        window.editor.getValue()
                    );
                }
            );



            document.getElementById(
                "editor-loading"
            ).style.display = "none";
        }
    );
}





window.runCode = async function (config) {

    if (

        window.isRunning

    ) {

        return;
    }



    const output =
    document.getElementById(
        "output"
    );



    const runButton =
    document.getElementById(
        "run-btn"
    );



    const status =
    document.getElementById(
        "execution-status"
    );



    const code =
    window.editor.getValue();



    if (

        code.trim() === ""

    ) {

        output.style.color =
        "#ff6b6b";



        output.textContent =

`[ EMPTY FILE ]

Write some code before running.`;

        return;
    }



    output.style.color =
    "#58a6ff";



    output.textContent =

`[ RUNNING ]

Executing code...`;



    window.isRunning = true;


status.textContent =
"Running...";

status.className =
"status-running";


    runButton.disabled = true;



    runButton.textContent =
    "Running...";



    try {

        const startTime =
        performance.now();



        const response =
        await fetch(

            "http://127.0.0.1:5000/run",

            {

                method: "POST",

                headers: {

                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({

                    code: code,

                    language:
                    config.language
                })
            }
        );



        const data =
        await response.json();



        const endTime =
        performance.now();



        const executionTime = (

            (endTime - startTime)

            / 1000

        ).toFixed(2);



        const timestamp =

        new Date()
        .toLocaleTimeString();



        const lowerOutput =

        (data.output || "")
        .toLowerCase();



        if (

            lowerOutput.includes("error")

            ||

            lowerOutput.includes("traceback")

        ) {

            output.style.color =
            "#ff6b6b";



            status.textContent =
            "Error";



            output.textContent =

`[ EXECUTION ERROR ]

${timestamp}

${data.output}`;
        }

        else {

            output.style.color =
            "#f0f6fc";



status.textContent =

`${executionTime}s`;

status.className =
"status-success";


            output.textContent =

`[ SUCCESS ]

${timestamp}

${data.output}

Executed in ${executionTime}s`;
        }

    }

    catch (error) {

        output.style.color =
        "#ff6b6b";



        status.textContent =
        "Error";

        status.className =
        "status-error";


        output.textContent =

`[ BACKEND ERROR ]

Execution server unreachable.`;
    }



    runButton.disabled = false;



    runButton.textContent =
    "Run";



    runButton.style.opacity =
    "1";


setTimeout(

    function () {

        status.textContent =
        "Idle";

        status.className =
        "status-idle";

    },

    3000
);


    window.isRunning = false;
};





document
.getElementById(
    "clear-terminal-btn"
)
?.addEventListener(

    "click",

    function () {

        document.getElementById(
            "output"
        ).textContent = "";
    }
);

document.addEventListener(

    "DOMContentLoaded",

    function () {

        const status =

        document.getElementById(
            "execution-status"
        );

        if (status) {

            status.className =
            "status-idle";
        }
    }
);
