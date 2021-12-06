from datetime import datetime
from app import app, db
from app.util import to_response
from flask import request, session
from app.models import Transaction, User, Client
import requests
from decimal import Decimal

class_prices = {
    "silver": 0.03,
    "gold": 0.01
}

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
            amount=response.get("amount"),
            fiat_amount=None,
            commission_paid=None,
            date_processed=None
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
            "value": t.amount,
            "fiatValue": t.fiat_amount
        })
        app.logger.debug(t.fiat_amount)
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
            "value": t.amount,
            "fiatValue": t.fiat_amount
        })
        app.logger.debug(t.fiat_amount)
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
        if c.fiat_balance < t.amount * Decimal(btc_rate()):
            is_valid = False
        else:
            if t.commission_type == "BTC":
                if c.btc_balance < t.amount * Decimal(class_prices.get(c.user_classification)):
                    is_valid = False
                else:
                    is_valid = True
            else:
                if c.fiat_balance < t.amount * Decimal(btc_rate() * (1 + class_prices.get(c.user_classification))):
                    is_valid = False
                else:
                    is_valid = True
        transactions.append({
            "tid": t.transaction_id,
            "time": t.date,
            "name": u.name,
            "commission": t.commission_type,
            "status": t.status,
            "value": t.amount,
            "fiatValue": t.fiat_amount,
            "btcBalance": c.btc_balance,
            "fiatBalance": c.fiat_balance,
            "isValid": is_valid
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
        if c.btc_balance < t.amount:
            is_valid = False
        else:
            if t.commission_type == "BTC":
                if c.btc_balance < t.amount * Decimal(1 + class_prices.get(c.user_classification)):
                    is_valid = False
                else:
                    is_valid = True
            else:
                if c.fiat_balance < t.amount * Decimal(btc_rate() * class_prices.get(c.user_classification)):
                    is_valid = False
                else:
                    is_valid = True
        transactions.append({
            "tid": t.transaction_id,
            "time": t.date,
            "name": u.name,
            "commission": t.commission_type,
            "status": t.status,
            "value": t.amount,
            "fiatValue": t.fiat_amount,
            "btcBalance": c.btc_balance,
            "fiatBalance": c.fiat_balance,
            "isValid": is_valid
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
    response = request.get_json()
    transaction = db.session.query(Transaction).filter(Transaction.transaction_id == transaction_id).first()
    client = db.session.query(Client).filter(Client.user_id == transaction.client_id).first()
    btcRate = response.get("btcRate")
    
    # Handle a buy and a sell
    commission_rate = class_prices.get(client.user_classification)
    if transaction.action == "buy":
        if transaction.commission_type == "BTC":
            client.btc_balance += transaction.amount + Decimal(1 - commission_rate)
            client.fiat_balance -= transaction.amount * Decimal(btcRate)
            commission_paid = transaction.amount * Decimal(commission_rate)
        else:
            client.btc_balance += transaction.amount
            client.fiat_balance -= transaction.amount * Decimal(btcRate * (1 + commission_rate))
            commission_paid = transaction.amount * Decimal(commission_rate * btcRate)
    elif transaction.action == "sell":
        if transaction.commission_type == "BTC": 
            client.btc_balance -= transaction.amount * Decimal(1 + commission_rate)
            client.fiat_balance += transaction.amount * Decimal(btcRate)
            commission_paid = transaction.amount * Decimal(commission_rate)
        else:
            client.btc_balance -= transaction.amount
            client.fiat_balance += transaction.amount * Decimal(btcRate * (1 - commission_rate))
            commission_paid = transaction.amount * Decimal(commission_rate * btcRate)
    
    # Set transaction to complete
    transaction.status = "Complete"
    transaction.commission_paid = commission_paid
    transaction.fiat_amount = transaction.amount * Decimal(btcRate)
    transaction.date_processed = datetime.now()
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
            "value": t.amount,
            "fiatValue": t.fiat_amount
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
    try:
        client_info = db.session.query(
            User, Client
            ).filter(
                Client.user_id == User.user_id
            ).filter(
                User.user_id == client_id
            ).first()
        u, c = client_info
    except Exception:
        return to_response(0.0)
    
    # Btc Rate
    commission_rate = class_prices.get(c.user_classification)
    return to_response((float(c.fiat_balance) / btc_rate() - num_bitcoin) * (1 - commission_rate))