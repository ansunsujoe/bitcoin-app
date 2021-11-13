from app import db

class Transaction(db.Model):
    transaction_id = db.Column(db.Integer, primary_key=True)
    trader_id = db.Column(db.Integer)