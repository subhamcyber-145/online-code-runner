let visualEditor;

localStorage.setItem(
"lastEditor",
"visual.html"
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

        visualEditor =
        monaco.editor.create(

            document.getElementById(
                "visual-editor"
            ),

            {

value:

localStorage.getItem(
"visualCode"
)

||

`<html>

<body style="background:black;">

<h1 style="color:white;">

Hello Visual Playground

</h1>

</body>

</html>`,

                language: "html",

                theme: "vs-dark",

                automaticLayout: true,

                fontSize: 15
            }
        );

        runVisualCode();

        let previewTimeout;

        visualEditor.onDidChangeModelContent(
            () => {

                clearTimeout(
                    previewTimeout
                );

                previewTimeout =
                setTimeout(() => {

                    runVisualCode();

                }, 500);
            }
        );
    }
);

visualEditor.onDidChangeModelContent(

    function () {

        localStorage.setItem(

            "visualCode",

            visualEditor.getValue()
        );
    }
);

function runVisualCode() {

    const code =
    visualEditor.getValue();

    const previewFrame =
    document.getElementById(
        "preview-frame"
    );

    previewFrame.srcdoc = code;
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

document.addEventListener(

    "keydown",

    function (e) {

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

function saveFile() {

    const code =
    visualEditor.getValue();

    const blob =
    new Blob(

        [code],

        {

            type: "text/html"
        }
    );

    const url =
    URL.createObjectURL(
        blob
    );

    const a =
    document.createElement("a");

    a.href = url;

    a.download = "index.html";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(
        url
    );
}

document.addEventListener(

    "keydown",

    function (e) {

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

