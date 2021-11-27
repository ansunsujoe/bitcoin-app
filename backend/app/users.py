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
        # User client query
        user, client = db.session.query(
            User, Client
        ).filter(
            User.user_id == user_id
        ).filter(
            User.user_id == Client.user_id
        ).first()

        if user is not None:
            client_json = {
                "id": user.user_id,
                "name": user.name,
                "btcBalance": round(client.btc_balance, 1),
                "fiatBalance": round(client.fiat_balance, 2),
                "classification": client.user_classification,
                "isClient": True,
                "isTrader": user.is_trader,
                "isManager": user.is_manager,
                "phoneNumber": user.phone_number,
                "cell": user.cell,
                "email": user.email,
                "streetAddress": user.street_address,
                "city": user.city,
                "state": user.state,
                "zip": user.zip
            }
            return client_json
        
        # User query
        user = db.session.query(
            User
        ).filter(
            User.user_id == user_id
        ).first()
        
        # User json
        user_json = {
            "id": user.user_id,
            "name": user.name,
            "isClient": False,
            "isTrader": user.is_trader,
            "isManager": user.is_manager,
            "phoneNumber": user.phone_number,
            "cell": user.cell,
            "email": user.email,
            "streetAddress": user.street_address,
            "city": user.city,
            "state": user.state,
            "zip": user.zip
        }
        return user_json
    
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
        "btcBalance": round(client.btc_balance, 1),
        "fiatBalance": round(client.fiat_balance, 2),
        "classification": client.user_classification,
        "isTrader": user.is_trader,
        "isManager": user.is_manager,
        "phoneNumber": user.phone_number,
        "cell": user.cell,
        "email": user.email,
        "streetAddress": user.street_address,
        "city": user.city,
        "state": user.state,
        "zip": user.zip
    }
    return client_json

@app.route("/users/traders", methods=["GET"])
def trader_list():
    result = db.session.query(User).filter(User.is_trader)
    return {
        "results": [{"id": trader.user_id, "name": trader.name} for trader in result]
    }