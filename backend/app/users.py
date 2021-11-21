from app import app, db
from flask import request, session
from app.models import User

# List all users
@app.route("/users", methods=["GET", "POST"])
def get_users():
    pass

# Modify/delete user
@app.route("/users/<user_id>", methods=["PUT", "DELETE"])
def modify_user(user_id):
    pass
