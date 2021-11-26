from app import app, db
from flask import request, session
from app.models import User, Client
from app.util import to_json

# List all users
@app.route("/users", methods=["GET", "POST"])
def get_users():
    if request.method == "GET":
        pass
    elif request.method == "POST":
        pass

# Modify/delete user
@app.route("/users/<user_id>", methods=["GET", "PUT", "DELETE"])
def user_info(user_id):
    if request.method == "GET":
        user = db.session.query(User).filter(User.user_id == user_id).first()
        return to_json(user)
    elif request.method == "PUT":
        pass
    elif request.method == "DELETE":
        pass
    
@app.route("/users/clients/<client_id>", methods=["GET"])
def client_info(client_id):
    result = db.session.query(
            User, Client
        ).filter(
            User.user_id == client_id
        ).filter(
            User.user_id == Client.user_id
        ).all()
    return to_json(result)

@app.route("/users/traders", methods=["GET"])
def trader_list():
    result = db.session.query(User).filter(User.is_trader)
    return {
        "results": [{"id": trader.user_id, "name": trader.name} for trader in result]
    }