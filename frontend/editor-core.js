window.editor = null;



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
