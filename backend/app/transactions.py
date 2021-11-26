from datetime import datetime
from app import app, db
from app.util import to_response
from flask import request, session
from app.models import Transaction, User

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
        return "Success"
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
    result = db.session.query(
        Transaction, User
        ).filter(
            Transaction.action == "buy"
        ).filter(
            Transaction.client_id == user_id
        ).filter(
            User.user_id == Transaction.client_id
        ).all()
    transactions = []
    for t in result:
        transactions.append({
            "time": t.transaction.date,
            "client": t.user.name,
            "commission": t.transaction.commission_type,
            "status": t.transaction.status,
            "value": t.transaction.amount
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
            User.user_id == Transaction.client_id
        ).all()
    transactions = []
    for t in result:
        transactions.append({
            "time": t.transaction.date,
            "client": t.user.name,
            "commission": t.transaction.commission_type,
            "status": t.transaction.status,
            "value": t.transaction.amount
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