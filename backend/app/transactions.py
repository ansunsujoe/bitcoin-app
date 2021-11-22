from app import app, db
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
    pass

# Buy transactions for user
@app.route("/users/<user_id>/transactions/buys", methods=["GET"])
def user_transaction_buys(user_id):
    pass

# Sell transactions for user
@app.route("/users/<user_id>/transactions/sells", methods=["GET"])
def user_transaction_sells(user_id):
    pass

# Delete transactions (trader cancels)
@app.route("/transactions/<transaction_id>", methods=["DELETE", "PUT"])
def user_transaction_sells(transaction_id):
    pass