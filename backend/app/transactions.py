from datetime import datetime
from app import app, db
from app.util import to_json
from flask import request, session
from app.models import Transaction

# Root endpoint
@app.route("/")
def index():
    return "Hello World!"

# Add transaction
@app.route("/transactions", methods=["GET"])
def get_transactions():
    pass

# Transactions for user
@app.route("/users/<user_id>/transactions", methods=["GET", "POST"])
def user_transaction(user_id):
    if request.method == "GET":
        result = db.session.query(Transaction).all()
        return to_json(result)
    elif request.method == "POST":
        # Read from form
        response = request.get_json()
        
        # Create transaction object
        new_transaction = Transaction(
            trader_id=2,
            client_id=1,
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
    result = db.session.query(Transaction).filter(Transaction.action == "buy").all()
    return to_json(result)

# Sell transactions for user
@app.route("/users/<user_id>/transactions/sells", methods=["GET"])
def user_transaction_sells(user_id):
    result = db.session.query(Transaction).filter(Transaction.action == "sell").all()
    return to_json(result)

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