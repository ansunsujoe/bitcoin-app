from app import db

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    