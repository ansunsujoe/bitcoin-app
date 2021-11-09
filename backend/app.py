from flask import Flask
from flask_cors import CORS
from flask import request, session
import os

# Flask App config setup
app = Flask(__name__)
app.config['ENV'] = "development"
app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=True)
app.secret_key = os.environ.get("SECRET_KEY")
CORS(app, supports_credentials=True)

# Root endpoint
@app.route("/")
def index():
    return "Hello World!"

# Main method
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)