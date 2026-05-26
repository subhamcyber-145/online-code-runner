let editor;

let isRunning = false;

localStorage.setItem(
"lastEditor",
"javascript.html"
);

require.config({

    paths: {

        vs:
"https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs"

    }

});

require(

    ["vs/editor/editor.main"],

    function () {

document.getElementById(
"editor-loading"
).style.display = "none";

        editor =
        monaco.editor.create(

            document.getElementById(
                "editor"
            ),

            {

                value:

localStorage.getItem(
"javascriptCode"
)

||

`console.log("Hello World");`,

                language: "javascript",

                theme: "vs-dark",

                automaticLayout: true,

                fontSize: 15
            }
        );

        editor.onDidChangeModelContent(

            function () {

                localStorage.setItem(

                    "javascriptCode",

                    editor.getValue()
                );
            }
        );

    }
);

async function runCode() {

const status =
document.getElementById(
"execution-status"
);

    if (

        isRunning

    ) {

        return;
    }

requestAnimationFrame(

    () => {

        document.getElementById(
            "run-btn"
        ).style.opacity = "0.7";
    }
);

    const output =
    document.getElementById(
        "output"
    );

    const runButton =
    document.getElementById(
        "run-btn"
    );

    const code =
    editor.getValue();

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

isRunning = true;

status.textContent =
"Running...";

runButton.disabled = true;

runButton.textContent =
"Running...";

    isRunning = false;

    runButton.style.opacity =
"1";

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

                    language: "javascript"
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

        if (

    data.output
    .toLowerCase()
    .includes("error")

    ||

    data.output
    .toLowerCase()
    .includes("traceback")

) {

    output.style.color =
    "#ff6b6b";

    output.textContent =

`[ EXECUTION ERROR ]

${data.output}`;
}

        else {

            output.style.color =
            "#f0f6fc";

status.textContent =

`${executionTime}s`;

            output.textContent =

`[ SUCCESS ]

${data.output}

Executed in ${executionTime}s`;
        }

    }

    catch (error) {

        output.style.color =
        "#ff6b6b";

        status.textContent =
        "Failed";

        output.textContent =

`[ BACKEND ERROR ]

Execution server unreachable.

Check:
- backend running
- Docker active
- Flask server status`
    }

    runButton.disabled = false;

    runButton.textContent =
    "Run";
}

async function saveFile() {

    const code =
    editor.getValue();

    const blob =
    new Blob(

        [code],

        {

            type: "text/plain"
        }
    );

    const handle =
    await window.showSaveFilePicker({

        suggestedName: "main.js",

        types: [

            {

                description:
                "JavaScript File",

                accept: {

                    "text/plain":
                    [".js"]
                }
            }
        ]
    });

    const writable =
    await handle.createWritable();

    await writable.write(
        blob
    );

    await writable.close();
}

document.addEventListener(

    "keydown",

    function (e) {

        if (

            e.ctrlKey

            &&

            e.key === "Enter"

        ) {

            e.preventDefault();

            runCode();
        }

        if (

            e.ctrlKey

            &&

            e.key.toLowerCase() === "s"

        ) {

            e.preventDefault();

            saveFile();
        }
    }
);
