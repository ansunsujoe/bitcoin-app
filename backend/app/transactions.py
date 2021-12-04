from datetime import datetime
from app import app, db
from app.util import to_response
from flask import request, session
from app.models import Transaction, User, Client
import requests
from decimal import Decimal

def btc_rate():
    r = requests.get("https://api.coindesk.com/v1/bpi/currentprice.json")
    data = r.json()
    return data.get("bpi").get("USD").get("rate_float")

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
        Transaction, User, Client
        ).filter(
            Transaction.action == "buy"
        ).filter(
            Transaction.status == "Pending"
        ).filter(
            Transaction.trader_id == trader_id
        ).filter(
            User.user_id == Transaction.client_id
        ).filter(
            Client.user_id == Transaction.client_id
        ).all()
    transactions = []
    for t, u, c in result:
        transactions.append({
            "tid": t.transaction_id,
            "time": t.date,
            "name": u.name,
            "commission": t.commission_type,
            "status": t.status,
            "value": t.amount,
            "btcBalance": c.btc_balance,
            "fiatBalance": c.fiat_balance
        })
    return to_response(transactions)

# Sell transactions for trader
@app.route("/users/traders/<trader_id>/transactions/sells", methods=["GET"])
def trader_transaction_sells(trader_id):
    result = db.session.query(
        Transaction, User, Client
        ).filter(
            Transaction.action == "sell"
        ).filter(
            Transaction.status == "Pending"
        ).filter(
            Transaction.trader_id == trader_id
        ).filter(
            User.user_id == Transaction.client_id
        ).filter(
            Client.user_id == Transaction.client_id
        ).all()
    transactions = []
    for t, u, c in result:
        transactions.append({
            "tid": t.transaction_id,
            "time": t.date,
            "name": u.name,
            "commission": t.commission_type,
            "status": t.status,
            "value": t.amount,
            "btcBalance": c.btc_balance,
            "fiatBalance": c.fiat_balance
        })
    return to_response(transactions)

# Delete transactions (trader cancels)
@app.route("/transactions/<transaction_id>", methods=["DELETE"])
def transaction_delete(transaction_id):
    transaction = db.session.query(Transaction).filter(Transaction.transaction_id == transaction_id).first()
    transaction.status = "Cancelled"
    db.session.commit()
    return "Success"

# Accept transactions (trader cancels)
@app.route("/transactions/<transaction_id>/accept", methods=["PUT"])
def transaction_accept(transaction_id):
    # Get transaction and client ID
    transaction = db.session.query(Transaction).filter(Transaction.transaction_id == transaction_id).first()
    client = db.session.query(Client).filter(Client.user_id == transaction.client_id).first()
    
    # Handle a buy and a sell
    if transaction.action == "buy":
        client.btc_balance += transaction.amount
        client.fiat_balance -= transaction.amount * Decimal(btc_rate())
    elif transaction.action == "sell":
        client.btc_balance -= transaction.amount
        client.fiat_balance += transaction.amount * Decimal(btc_rate())
    
    # Set transaction to complete
    transaction.status = "Complete"
    db.session.commit()
    return "Success"

# Get transactions between datetime
@app.route("/transactions/<start_date>/<end_date>", methods=["GET"])
def transaction_between(start_date, end_date):
    result = db.session.query(
        Transaction, User
        ).filter(
            Transaction.date >= start_date
        ).filter(
            Transaction.date <= end_date
        ).filter(
            User.user_id == Transaction.client_id
        ).all()
    transactions = []
    for t, u in result:
        transactions.append({
            "tid": t.transaction_id,
            "time": t.date,
            "name": u.name,
            "commission": t.commission_type,
            "status": t.status,
            "value": t.amount
        })
    return to_response(transactions)

# Get buying power
@app.route("/users/clients/<client_id>/buying-power", methods=["GET"])
def buying_power(client_id):
    # Get all unprocessed buys
    current_buys = db.session.query(
        Transaction
        ).filter(
            Transaction.action == "buy"
        ).filter(
            Transaction.client_id == client_id
        ).filter(
            Transaction.status == "Pending"
        ).all()
        
    # Calculate total number of bitcoin being processed in buys
    num_bitcoin = 0.0
    for b in current_buys:
        num_bitcoin += float(b.amount)
        
    # Get user total balance so far
    client_info = db.session.query(
        User, Client
        ).filter(
            Client.user_id == User.user_id
        ).filter(
            User.user_id == client_id
        ).first()
    u, c = client_info
    
    # Btc Rate
    return to_response(float(c.fiat_balance) / btc_rate() - num_bitcoin)