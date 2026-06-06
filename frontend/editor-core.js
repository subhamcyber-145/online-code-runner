window.editor = null;
window.isRunning = false;



function getOutput() {

    return document.getElementById(
        "output"
    );
}



function getStatus() {

    return document.getElementById(
        "execution-status"
    );
}



function getRunButton() {

    return document.getElementById(
        "run-btn"
    );
}



function clearTerminal() {

    const output =
    getOutput();

    if (output) {

        output.textContent = "";
    }
}



function setStatus(
    text,
    className
) {

    const status =
    getStatus();

    if (!status) {

        return;
    }

    status.textContent =
    text;

    status.className =
    className;
}



function updateFileName(
    filename
) {

    const fileLabel =

    document.getElementById(
        "current-file"
    );

    if (fileLabel) {

        fileLabel.textContent =
        "📄 " + filename;
    }
}



function getTimestamp() {

    return new Date()
        .toLocaleTimeString();
}





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
    getOutput();



    const runButton =
    getRunButton();



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



    setStatus(
        "Running...",
        "status-running"
    );



    window.isRunning = true;



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
        getTimestamp();



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



            setStatus(
                "Error",
                "status-error"
            );



            output.textContent =

`[ EXECUTION ERROR ]

${timestamp}

${data.output}`;
        }

        else {

            output.style.color =
            "#f0f6fc";



            setStatus(

                `${executionTime}s`,

                "status-success"
            );



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



        setStatus(
            "Error",
            "status-error"
        );



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

            setStatus(
                "Idle",
                "status-idle"
            );

        },

        3000
    );



    window.isRunning = false;
};





function downloadCode(filename) {

    const code =
    window.editor.getValue();



    const blob =

    new Blob(

        [code],

        {

            type:
            "text/plain"
        }
    );



    const url =

    URL.createObjectURL(
        blob
    );



    const link =

    document.createElement(
        "a"
    );



    link.href =
    url;



    link.download =
    filename;



    link.click();



    URL.revokeObjectURL(
        url
    );
}





document
.getElementById(
    "download-btn"
)
?.addEventListener(

    "click",

    function () {

        const page =

        window.location.pathname;



        if (

            page.includes(
                "python"
            )

        ) {

            downloadCode(
                "main.py"
            );
        }

        else if (

            page.includes(
                "javascript"
            )

        ) {

            downloadCode(
                "app.js"
            );
        }

        else if (

            page.includes(
                "cpp"
            )

        ) {

            downloadCode(
                "main.cpp"
            );
        }
    }
);





document
.getElementById(
    "upload-btn"
)
?.addEventListener(

    "click",

    function () {

        document
        .getElementById(
            "file-input"
        )
        ?.click();
    }
);





document
.getElementById(
    "file-input"
)
?.addEventListener(

    "change",

    function (event) {

        const file =

        event.target.files[0];



        if (!file) {

            return;
        }



        const reader =

        new FileReader();



        reader.onload =

        function (e) {

            if (

                window.editor

            ) {

                window.editor.setValue(

                    e.target.result
                );
            }



            updateFileName(
                file.name
            );
        };



        reader.readAsText(
            file
        );
    }
);





document
.getElementById(
    "clear-terminal-btn"
)
?.addEventListener(

    "click",

    function () {

        clearTerminal();
    }
);





document.addEventListener(

    "keydown",

    function (event) {

        if (

            event.ctrlKey

            &&

            event.key.toLowerCase() === "l"

        ) {

            event.preventDefault();

            clearTerminal();
        }
    }
);





document.addEventListener(

    "DOMContentLoaded",

    function () {

        setStatus(
            "Idle",
            "status-idle"
        );
    }
);
