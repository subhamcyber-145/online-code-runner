import subprocess
import tempfile
import os



def execute_python_code(code):

    try:

        with tempfile.NamedTemporaryFile(
            mode="w",
            suffix=".py",
            delete=False
        ) as temp_file:

            temp_file.write(code)

            temp_path = temp_file.name



        command = [

            "docker",

            "run",

            "--rm",

            "--memory",

            "100m",

            "--cpus",

            "1",

            "--network",

            "none",

            "-v",

            f"{temp_path}:/app/main.py",

            "python:3.11-slim",

            "python",

            "/app/main.py"
        ]



        result = subprocess.run(

            command,

            capture_output=True,

            text=True,

            timeout=10,
        )



        os.remove(temp_path)



        output = result.stdout + result.stderr



        if output.strip() == "":

            return "Program executed successfully with no output."



        return output



    except subprocess.TimeoutExpired:

        return "Execution timed out."



    except Exception as e:

        return f"Execution error: {str(e)}"





def execute_javascript_code(code):

    try:

        with tempfile.NamedTemporaryFile(
            mode="w",
            suffix=".js",
            delete=False
        ) as temp_file:

            temp_file.write(code)

            temp_path = temp_file.name



        command = [

            "docker",

            "run",

            "--rm",

            "--memory",

            "100m",

            "--cpus",

            "1",

            "--network",

            "none",

            "-v",

            f"{temp_path}:/app/main.js",

            "node:20-slim",

            "node",

            "/app/main.js"
        ]



        result = subprocess.run(

            command,

            capture_output=True,

            text=True,

            timeout=20,
        )



        os.remove(temp_path)



        output = result.stdout + result.stderr



        if output.strip() == "":

            return "Program executed successfully with no output."



        return output



    except subprocess.TimeoutExpired:

        return "Execution timed out."



    except Exception as e:

        return f"Execution error: {str(e)}"



def execute_cpp_code(code):

    try:

        with tempfile.TemporaryDirectory() as temp_dir:

            cpp_path = os.path.join(
                temp_dir,
                "main.cpp"
            )

            with open(
                cpp_path,
                "w"
            ) as cpp_file:

                cpp_file.write(code)



            command = [

                "docker",

                "run",

                "--rm",

                "--memory",

                "100m",

                "--cpus",

                "1",

                "--network",

                "none",

                "-v",

                f"{temp_dir}:/app",

                "gcc:13",

                "bash",

                "-c",

                "g++ /app/main.cpp -o /app/main && /app/main"
            ]



            result = subprocess.run(

                command,

                capture_output=True,

                text=True,

                timeout=10
            )



            output = (

                result.stdout
                +
                result.stderr
            )



            if output.strip() == "":

                return "Program executed successfully with no output."



            return output



    except subprocess.TimeoutExpired:

        return "Execution timed out."



    except Exception as e:

        return f"Execution error: {str(e)}"



