from app import db

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    phone_number = db.Column(db.String)
    cell = db.Column(db.String)
    email = db.Column(db.String)
    street_address = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    zip = db.Column(db.String)
    password = db.Column(db.String)
    is_trader = db.Column(db.Boolean)
    is_manager = db.Column(db.Boolean)

class Transaction(db.Model):
    transaction_id = db.Column(db.Integer, primary_key=True)
    trader_id = db.Column(db.Integer, db.ForeignKey(User.user_id))
    client_id = db.Column(db.Integer, db.ForeignKey(User.user_id))
    commission_type = db.Column(db.String)
    status = db.Column(db.String)
    date = db.Column(db.DateTime)
    currency_type = db.Column(db.String)
    amount = db.Column(db.Float)

class Client(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey(User.user_id), primary_key=True)
    fiat_balance = db.Column(db.Float)
    btc_balance = db.Column(db.Float)
    user_classification = db.Column(db.String)

class Processed(db.Model):
    order_id = db.Column(db.Integer, primary_key=True)
    trader_id = db.Column(db.Integer, db.ForeignKey(User.user_id))
    transaction_id = db.Column(db.Integer, db.ForeignKey(Transaction.transaction_id))
    commission_paid = db.Column(db.Float)
    
class Issues_On_Behalf(db.Model):
    pass