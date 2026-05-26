def execute_python_code(code):

    dangerous_keywords = [
        "import os",
        "import subprocess",
        "import socket",
        "import shutil",
        "os.system",
        "__import__",
        "eval(",
        "exec(",
        "open(",
    ]

    for keyword in dangerous_keywords:
        if keyword in code:
            return f"Blocked dangerous keyword: {keyword}"

    try:
