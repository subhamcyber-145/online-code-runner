const fileInput =
document.getElementById("fileInput");

if (fileInput) {

    fileInput.addEventListener(

        "change",

        function (event) {

            const file =
            event.target.files[0];

            if (!file) return;

            const reader =
            new FileReader();

            reader.onload =
            function (e) {

                localStorage.setItem(

                    "javascriptFile",

                    e.target.result
                );

                window.location.href =
                "javascript.html";
            };

            reader.readAsText(file);
        }
    );
}
