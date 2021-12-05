from app import app, db, bcrypt
from flask import request, session
from app.models import User, Client
from app.util import to_json, to_response

# List all users
@app.route("/users", methods=["GET"])
def get_users():
    try:
        result = db.session.query(User).all()
        response = {
            "results": [{"id": user.user_id, "name": user.name} for user in result]
        }
    except Exception:
        return {}
    return response

# Modify/delete user
@app.route("/users/<user_id>", methods=["GET", "PUT", "DELETE"])
def user_info(user_id):
    if request.method == "GET":
        try:
            # User client query
            response = db.session.query(
                User, Client
            ).filter(
                User.user_id == user_id
            ).filter(
                User.user_id == Client.user_id
            ).first()

            if response is not None:
                user, client = response
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
        except Exception:
            return {}
    
   
    
@app.route("/users/clients/<client_id>", methods=["GET"])
def client_info(client_id):
   try: 
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
   except Exception:
       return {} 

@app.route("/users/traders", methods=["GET"])
def trader_list():
    try:
     result = db.session.query(User).filter(User.is_trader)
     return {
        "results": [{"id": trader.user_id, "name": trader.name} for trader in result]
     }
    except Exception:
        return {}
    
@app.route("/users/clients", methods=["GET"])
def client_list():
   try:
    result = db.session.query(User).filter(User.is_client)
    return {
        "results": [{"id": client.user_id, "name": client.name} for client in result]
    }
   except Exception:
       return {}

@app.route("/users/clients/all", methods=["GET"])
def client_list_all():
    result = db.session.query(User).filter(User.is_client)
    return {
            "results": [{"id": client.user_id, 
            "name": client.name, 
            "address": client.street_address+", "+client.city+", "+client.state+", "+client.zip, 
            "email": client.email, 
            "cell": client.cell 
            } for client in result]
        }

@app.route("/users/clients/<search_query>", methods=["GET"])
def client_list_search(search_query):
    result = db.session.query(User
                ).filter(User.is_client
                ).filter((User.name.like("%{}%".format(search_query))) | (User.street_address.like("%{}%".format(search_query))) | (User.email.like("%{}%".format(search_query))) | (User.cell.like("%{}%".format(search_query))))
    return {
        "results": [{"id": client.user_id, "name": client.name} for client in result]
    }

@app.route("/users/login", methods=["POST"])
def login():
   try:
    request_data = request.get_json()

    username = request_data.get("username")
    password = request_data.get("password")
    user = db.session.query(User).filter(User.user_name == username).first()   
    if(user):
      content = bcrypt.check_password_hash(user.password, password)  
      if(content):
        return { "success" : True, "content" : {
            "username" : user.name,
            "user_id" : user.user_id
      }}
      return {"success" : False}
    return {"success" : False}
   except Exception:
     return {"success" : False}


@app.route("/users/register", methods=["POST"])
def register():
   try: 
    request_data = request.get_json()
    username = request_data.get("username")
    user = db.session.query(User).filter(User.user_name == username).first()   
    if(user):
      return {"success" : False, "message" : "User Exists"}
    is_trader=request_data.get("trader")
    is_manager=request_data.get("manager")
    is_client=request_data.get("client")
    userData = User(
        name=request_data.get("name"),
        phone_number=request_data.get("telephone"),
        cell=request_data.get("cell"),
        user_name=username,
        email=request_data.get("email"),
        street_address=request_data.get("address"),
        city=request_data.get("city"),
        state=request_data.get("state"),
        zip=request_data.get("zip"),
        password=bcrypt.generate_password_hash(request_data.get("password")),
        is_trader=1 if is_trader=="yes" else 0,
        is_manager=1 if is_manager=="yes" else 0,
        is_client=1 if is_client=="yes" else 0
    )
    # Commit to database
    db.session.add(userData)
    db.session.commit()
    user = db.session.query(User).filter(User.user_name == username).first() 
    return { "success" : True, "content" : {
            "username" : user.user_name,
            "user_id" : user.user_id
    }}
   except Exception:
       return {"success" : False, "message" : "Unknown exception"}