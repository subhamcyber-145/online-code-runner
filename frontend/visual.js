createEditor({

    language: "html",

    storageKey: "visualCode",

    defaultCode:

`<!DOCTYPE html>

<html>

<body style="background:black; color:white;">

<h1>Hello Visual Playground</h1>

</body>

</html>`
});





function updatePreview() {

    const code =
    editor.getValue();



    const iframe =
    document.getElementById(
        "preview-frame"
    );



    iframe.srcdoc = code;
}





setTimeout(

    function () {

        updatePreview();



        editor.onDidChangeModelContent(

            function () {

                updatePreview();
            }
        );

    },

    1000
);
