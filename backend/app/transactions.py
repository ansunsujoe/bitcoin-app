from datetime import datetime
from app import app, db
from app.util import to_response
from flask import request, session
from app.models import Transaction, User
import requests

# Root endpoint
@app.route("/")
def index():
    return "Hello World!"

@app.route("/btc-rate")
def btc_balance():
    r = requests.get("https://api.coindesk.com/v1/bpi/currentprice.json")
    try:
        data = r.json()
        return to_response(data.get("bpi").get("USD").get("rate_float"))
    except Exception:
        return "Could not reach CoinDesk API to get BTC price", 500

# Add transaction
@app.route("/transactions", methods=["GET"])
def get_transactions():
    pass

# Transactions for user
@app.route("/users/<user_id>/transactions", methods=["GET", "POST"])
def user_transaction(user_id):
    if request.method == "GET":
        result = db.session.query(Transaction).all()
        return "Success"
    elif request.method == "POST":
        # Read from form
        response = request.get_json()
        
        # Create transaction object
        new_transaction = Transaction(
            trader_id=int(response.get("traderId")),
            client_id=int(user_id),
            commission_type=response.get("commission_type"),
            status="Pending",
            date=datetime.now(),
            action=response.get("action"),
            amount=response.get("amount")
        )
        
        # Commit to database
        db.session.add(new_transaction)
        db.session.commit()
        return "Success"

# Buy transactions for user
@app.route("/users/<user_id>/transactions/buys", methods=["GET"])
def user_transaction_buys(user_id):
    result = db.session.query(
        Transaction, User
        ).filter(
            Transaction.action == "buy"
        ).filter(
            Transaction.client_id == user_id
        ).filter(
            User.user_id == Transaction.trader_id
        ).all()
    transactions = []
    for t, u in result:
        transactions.append({
            "time": t.date,
            "name": u.name,
            "commission": t.commission_type,
            "status": t.status,
            "value": t.amount
        })
    return to_response(transactions)

# Sell transactions for user
@app.route("/users/<user_id>/transactions/sells", methods=["GET"])
def user_transaction_sells(user_id):
    result = db.session.query(
        Transaction, User
        ).filter(
            Transaction.action == "sell"
        ).filter(
            Transaction.client_id == user_id
        ).filter(
            User.user_id == Transaction.trader_id
        ).all()
    transactions = []
    for t, u in result:
        transactions.append({
            "time": t.date,
            "name": u.name,
            "commission": t.commission_type,
            "status": t.status,
            "value": t.amount
        })
    return to_response(transactions)

# Buy transactions for trader
@app.route("/users/traders/<trader_id>/transactions/buys", methods=["GET"])
def trader_transaction_buys(trader_id):
    result = db.session.query(
        Transaction, User
        ).filter(
            Transaction.action == "buy"
        ).filter(
            Transaction.trader_id == trader_id
        ).filter(
            User.user_id == Transaction.client_id
        ).all()
    transactions = []
    for t, u in result:
        transactions.append({
            "time": t.date,
            "name": u.name,
            "commission": t.commission_type,
            "status": t.status,
            "value": t.amount
        })
    return to_response(transactions)

# Sell transactions for trader
@app.route("/users/traders/<trader_id>/transactions/sells", methods=["GET"])
def trader_transaction_sells(trader_id):
    result = db.session.query(
        Transaction, User
        ).filter(
            Transaction.action == "sell"
        ).filter(
            Transaction.trader_id == trader_id
        ).filter(
            User.user_id == Transaction.client_id
        ).all()
    transactions = []
    for t, u in result:
        transactions.append({
            "time": t.date,
            "name": u.name,
            "commission": t.commission_type,
            "status": t.status,
            "value": t.amount
        })
    return to_response(transactions)

# Delete transactions (trader cancels)
@app.route("/transactions/<transaction_id>", methods=["DELETE"])
def transaction_delete(transaction_id):
    db.session.query(Transaction).filter(Transaction.transaction_id == transaction_id).delete()
    db.session.commit()

# Accept transactions (trader cancels)
@app.route("/transactions/<transaction_id>/accept", methods=["PUT"])
def transaction_accept(transaction_id):
    transaction = db.session.query(Transaction).filter(Transaction.transaction_id == transaction_id).first()
    transaction.status = "Complete"
    db.session.commit()