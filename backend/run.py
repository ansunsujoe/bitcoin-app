from flask import Flask
from flask_cors import CORS
from flask import request, session
from app import app

# Main method
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True) 