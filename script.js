async function runCode() {

    const output = document.getElementById("output");
    const code = document.getElementById("code").value;

    output.textContent = "Running...";
    output.style.color = "yellow";

    try {

        const response = await fetch("http://127.0.0.1:5000/run", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: code
            })
        });

        const data = await response.json();

        output.textContent = data.output;

        if (data.output.includes("Blocked")) {
            output.style.color = "red";
        }
        else {
            output.style.color = "lightgreen";
        }

    } catch (error) {

        output.textContent = "Connection Error!";
        output.style.color = "red";

        console.log(error);
    }
}
