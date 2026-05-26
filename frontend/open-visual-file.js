const visualFileInput =

document.getElementById(
    "visualFileInput"
);

if (visualFileInput) {

    visualFileInput.addEventListener(

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

                    "visualFile",

                    e.target.result
                );

                window.location.href =
                "visual.html";
            };

            reader.readAsText(file);
        }
    );
}
