from app import app, db
from flask import request, session
from app.models import User, Client
from app.util import to_json, to_response

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
    user, client = db.session.query(
        User, Client
        ).filter(
            User.user_id == client_id
        ).filter(
            User.user_id == Client.user_id
        ).first()
    
    client_json = {
        "id": user.user_id,
        "name": user.name,
        "btcBalance": client.btc_balance,
        "fiatBalance": client.fiat_balance,
        "classification": client.user_classification,
        "isTrader": user.is_trader,
        "isManager": user.is_manager
    }
    return client_json

@app.route("/users/traders", methods=["GET"])
def trader_list():
    result = db.session.query(User).filter(User.is_trader)
    return {
        "results": [{"id": trader.user_id, "name": trader.name} for trader in result]
    }