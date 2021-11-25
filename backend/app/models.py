from app import db
from sqlalchemy_utils import UUIDType
import uuid

class User(db.Model):
    user_id = db.Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
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
    transaction_id = db.Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    trader_id = db.Column(UUIDType(binary=False), db.ForeignKey(User.user_id))
    client_id = db.Column(UUIDType(binary=False), db.ForeignKey(User.user_id))
    commission_type = db.Column(db.String)
    status = db.Column(db.String)
    date = db.Column(db.DateTime)
    action = db.Column(db.String)
    amount = db.Column(db.Float)

class Client(db.Model):
    user_id = db.Column(UUIDType(binary=False), db.ForeignKey(User.user_id), primary_key=True)
    fiat_balance = db.Column(db.Float)
    btc_balance = db.Column(db.Float)
    user_classification = db.Column(db.String)
    last_classification_update = db.Column(db.DateTime)

class Processed(db.Model):
    order_id = db.Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    trader_id = db.Column(UUIDType(binary=False), db.ForeignKey(User.user_id))
    transaction_id = db.Column(UUIDType(binary=False), db.ForeignKey(Transaction.transaction_id))
    commission_paid = db.Column(db.Float)