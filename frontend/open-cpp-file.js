const cppFileInput =

document.getElementById(
    "cppFileInput"
);

if (cppFileInput) {

    cppFileInput.addEventListener(

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

                    "cppFile",

                    e.target.result
                );

                window.location.href =
                "cpp.html";
            };

            reader.readAsText(file);
        }
    );
}
