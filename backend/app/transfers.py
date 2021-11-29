from datetime import datetime
from app import app, db
from app.util import to_response
from flask import request, session
from app.models import Transfer, User
import requests

# Add transfer
@app.route("/transfers", methods=["GET"])
def get_transfers():
    pass

# Transfers for user
@app.route("/users/<user_id>/transfers", methods=["GET", "POST"])
def user_transfer(user_id):
    if request.method == "GET":
        result = db.session.query(Transfer).all()
        return "Success"
    elif request.method == "POST":
        # Read from form
        response = request.get_json()
        
        # Create transfer object
        new_transfer = Transfer(
            trader_id=response.get("traderId"),
            client_id=user_id,
            status="Pending",
            date=datetime.now(),
            amount=response.get("amount")
        )
        
        # Commit to database
        db.session.add(new_transfer)
        db.session.commit()
        return "Success"

# Buy transfers for trader
@app.route("/users/traders/<trader_id>/transfers/buys", methods=["GET"])
def trader_transfer_buys(trader_id):
    result = db.session.query(
        Transfer, User
        ).filter(
            Transfer.trader_id == trader_id
        ).filter(
            User.user_id == Transfer.client_id
        ).all()
    transfers = []
    for t, u in result:
        transfers.append({
            "time": t.date,
            "name": u.name,
            "commission": t.commission_type,
            "status": t.status,
            "value": t.amount
        })
    return to_response(transfers)

# Delete transfers (trader cancels)
@app.route("/transfers/<transfer_id>", methods=["DELETE"])
def transfer_delete(transfer_id):
    db.session.query(Transfer).filter(Transfer.transfer_id == transfer_id).delete()
    db.session.commit()

# Accept transfers (trader cancels)
@app.route("/transfers/<transfer_id>/accept", methods=["PUT"])
def transfer_accept(transfer_id):
    transfer = db.session.query(Transfer).filter(Transfer.transfer_id == transfer_id).first()
    transfer.status = "Complete"
    db.session.commit()