from app import db

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    phone_number = db.Column(db.String(15))
    user_name = db.Column(db.String(50),unique=True)
    cell = db.Column(db.String(15))
    email = db.Column(db.String(50))
    street_address = db.Column(db.String(50))
    city = db.Column(db.String(50))
    state = db.Column(db.String(20))
    zip = db.Column(db.String(5))
    password = db.Column(db.String(200))
    is_trader = db.Column(db.Boolean)
    is_manager = db.Column(db.Boolean)
    is_client = db.Column(db.Boolean)

class Transaction(db.Model):
    transaction_id = db.Column(db.Integer, primary_key=True)
    trader_id = db.Column(db.Integer, db.ForeignKey(User.user_id))
    client_id = db.Column(db.Integer, db.ForeignKey(User.user_id))
    commission_type = db.Column(db.String(3))
    status = db.Column(db.String(10))
    date = db.Column(db.DateTime)
    action = db.Column(db.String(10))
    amount = db.Column(db.Numeric(32, 10))
    fiat_amount = db.Column(db.Numeric(32, 10))
    commission_paid = db.Column(db.Numeric(32, 10))
    date_processed = db.Column(db.DateTime)

class Client(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey(User.user_id), primary_key=True)
    fiat_balance = db.Column(db.Numeric(32, 10))
    btc_balance = db.Column(db.Numeric(32, 10))
    user_classification = db.Column(db.String(10))
    last_classification_update = db.Column(db.DateTime)

class Transfer(db.Model):
    transfer_id = db.Column(db.Integer, primary_key=True)
    trader_id = db.Column(db.Integer, db.ForeignKey(User.user_id))
    client_id = db.Column(db.Integer, db.ForeignKey(User.user_id))
    status = db.Column(db.String(10))
    date = db.Column(db.DateTime)
    amount = db.Column(db.Numeric(32, 10))