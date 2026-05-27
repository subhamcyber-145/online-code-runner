localStorage.setItem(
    "lastEditor",
    "cpp.html"
);




createEditor({

    language: "cpp",

    storageKey: "cppCode",

    defaultCode:

`#include <iostream>

using namespace std;

int main() {

    cout << "Hello C++";

    return 0;
}`
});





document.getElementById(
    "run-btn"
).addEventListener(

    "click",

    function () {

        runCode({

            language: "cpp"
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

                language: "cpp"
            });
        }
    }
);
