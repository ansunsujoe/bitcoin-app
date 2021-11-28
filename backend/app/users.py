from app import app, db
from flask import request, session
from app.models import User, Client
from app.util import to_json, to_response

# List all users
@app.route("/users", methods=["GET"])
def get_users():
    result = db.session.query(User).all()
    print(result)
    return {
        "results": [{"id": user.user_id, "name": user.name} for user in result]
    }
    

# Modify/delete user
@app.route("/users/<user_id>", methods=["GET"])
def user_info(user_id):
        user = db.session.query(User).filter(User.user_id == user_id).first()
        return to_json(user)
   
    
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

@app.route("/users/login", methods=["POST"])
def login():
    request_data = request.get_json()
    username = request_data.get("name")
    password = request_data.get("password")
    print(username, password)
    user = db.session.query(User).filter(User.user_name == username).first()
    print(user)
    if(user and user.password == password):
        return { "success" : True, "content" : {
            "username" : user.name,
            "user_id" : user.user_id
        }}
    
    return {"success" : False}


@app.route("/users/register", methods=["POST"])
def register():
    return