from datetime import datetime
from app import app, db
from app.util import to_json
from flask import request, session
from app.models import Transaction
import uuid

# Root endpoint
@app.route("/")
def index():
    return "Hello World!"

# Add transaction
@app.route("/transactions", methods=["GET"])
def get_transactions():
    pass

# Transactions for user
@app.route("/users/<user_id>/transactions", methods=["GET"])
def user_transaction(user_id):
    pass

# Buy transactions for user
@app.route("/users/<user_id>/transactions/buys", methods=["GET", "POST"])
def user_transaction_buys(user_id):
    if request.method == "GET":
        result = db.session.query(Transaction).filter(Transaction.currency_type == "BTC").all()
        return to_json(result)
    elif request.method == "POST":
        # Read from form
        response = request.form
        
        # Create transaction object
        new_transaction = Transaction(
            transaction_id=uuid.uuid4(),
            trader_id=uuid.uuid4(),
            client_id=uuid.uuid4(),
            commission_type="BTC",
            status="Pending",
            date=datetime.now(),
            currency_type="BTC",
            amount=60
        )
        
        # Commit to database
        db.session.add(new_transaction)
        db.session.commit()
        return "Success"

# Sell transactions for user
@app.route("/users/<user_id>/transactions/sells", methods=["GET", "POST"])
def user_transaction_sells(user_id):
    if request.method == "GET":
        result = db.session.query(Transaction).filter(Transaction.currency_type == "USD").all()
        return to_json(result)
    elif request.method == "POST":
        # Read from form
        response = request.form
        
        # Create transaction object
        new_transaction = Transaction(
            transaction_id=uuid.uuid4(),
            trader_id=uuid.uuid4(),
            client_id=uuid.uuid4(),
            commission_type="BTC",
            status="Pending",
            date=datetime.now(),
            currency_type="USD",
            amount=60
        )
        
        # Commit to database
        db.session.add(new_transaction)
        db.session.commit()
        return "Success"

# Delete transactions (trader cancels)
@app.route("/transactions/<transaction_id>", methods=["DELETE", "PUT"])
def user_transaction_sells(transaction_id):
    pass