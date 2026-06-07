from flask import Flask, request, jsonify
from flask_cors import CORS

from executor import *

app = Flask(__name__)

app.config["MAX_CONTENT_LENGTH"] = 1024 * 1024

CORS(app)


@app.route("/")
def home():

    return jsonify({
        "status": "online"
    })


@app.route("/run", methods=["POST"])
def run_code():

    try:

        data = request.get_json()

        if not data:

            return jsonify({
                "output": "Invalid request"
            }), 400

        code = data.get("code", "")
        language = data.get("language", "")

        if not code:

            return jsonify({
                "output": "No code provided"
            }), 400

        if language == "python":

            output = execute_python_code(code)

        elif language == "javascript":

            output = execute_javascript_code(code)

        elif language == "cpp":

            output = execute_cpp_code(code)

        else:

            return jsonify({
                "output": "Unsupported language"
            }), 400

        return jsonify({
            "output": output
        })

    except Exception:

        return jsonify({
            "output": "Internal server error"
        }), 500


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000
    )
