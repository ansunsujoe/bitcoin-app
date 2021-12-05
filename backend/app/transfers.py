from datetime import datetime
from app import app, db
from app.util import to_response
from flask import request, session
from app.models import Transfer, User, Client
#import requests

# Add transfer
@app.route("/transfers", methods=["GET"])
def get_transfers():
    pass

# Transfers for user
@app.route("/users/<user_id>/transfers", methods=["GET", "POST"])
def user_transfer(user_id):
    if request.method == "GET":
        result = db.session.query(Transfer).all()
        transfers = []
        for t, u in result:
            transfers.append({
                "time": t.date,
                "name": u.name,
                "status": t.status,
                "value": t.amount
            })
        return to_response(transfers)
    elif request.method == "POST":
        # Read from form
        response = request.get_json()
        
        # Create transfer object
        new_transfer = Transfer(
            trader_id=response.get("traderId"),
            client_id=user_id,
            status="Pending",
            date=datetime.now(),
            amount=float(response.get("amount"))
        )
        
        # Commit to database
        db.session.add(new_transfer)
        db.session.commit()
        return "Success"

# Transfers by trader on behalf of client
@app.route("/users/traders/<trader_user_id>/transfers", methods=["GET", "POST"])
def trader_transfer(trader_user_id):
    if request.method == "GET":
        result = db.session.query(
        Transfer, User
        ).filter(
            Transfer.trader_id == trader_user_id
        ).filter(
            User.user_id == Transfer.client_id
        ).all()
        transfers = []
        for t, u in result:
            transfers.append({
                "time": t.date,
                "name": u.name,
                "status": t.status,
                "amount": t.amount
            })
        return to_response(transfers)
    elif request.method == "POST":
        # Read from form
        response = request.get_json()
        
        # Create transfer object
        new_transfer = Transfer(
            trader_id=trader_user_id,
            client_id=response.get("clientId"),
            status="Completed",
            date=datetime.now(),
            amount=float(response.get("amount"))
        )
        
        # Commit to database
        db.session.add(new_transfer)
        transfer_client = db.session.query(Client).filter(Client.user_id == new_transfer.client_id).first()
        transfer_client.fiat_balance+=new_transfer.amount
        db.session.commit()
        return "Success"

# Delete transfers (trader cancels)
@app.route("/transfers/<transfer_id>", methods=["PUT"])
def transfer_delete(transfer_id):
    transfer = db.session.query(Transfer).filter(Transfer.transfer_id == transfer_id).first()
    transfer.status = "Cancelled"
    db.session.commit()

# Accept transfers (trader accepts)
@app.route("/transfers/<transfer_id>/accept", methods=["PUT"])
def transfer_accept(transfer_id):
    transfer = db.session.query(Transfer).filter(Transfer.transfer_id == transfer_id).first()
    transfer.status = "Complete"
    transfer_client = db.session.query(Client).filter(Client.user_id == transfer.client_id).first()
    transfer_client.fiat_balance+=transfer.amount
    db.session.commit()