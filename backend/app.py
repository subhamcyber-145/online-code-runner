from flask import Flask, request, jsonify
from flask_cors import CORS

from executor import *

app = Flask(__name__)

CORS(app)


@app.route("/")
def home():

    return "Backend Running"


@app.route("/run", methods=["POST"])

def run_code():

    try:

        data = request.json

        code = data.get("code")

        language = data.get("language")

        if language == "python":

            output = execute_python_code(code)

        elif language == "javascript":

            output = execute_javascript_code(code)

        elif language == "cpp":

            output = execute_cpp_code(code)

        else:

            output = "Unsupported language"

        return jsonify({

            "output": output
        })

    except Exception as e:

        return jsonify({

            "output": str(e)
        })


@app.route("/logs")
def get_logs():

    try:

        with open("logs.txt", "r") as log_file:

            logs = log_file.read()

        return jsonify({
            "logs": logs
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        })


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
