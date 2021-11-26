from datetime import datetime
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

# Flask App config setup
app = Flask(__name__)
app.config['ENV'] = "development"
app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=True)
app.secret_key = os.environ.get("SECRET_KEY")
CORS(app, supports_credentials=True)

# Flask Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@host.docker.internal:3307/bitcoin'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from app import transactions, users
from app.models import *

# Create tables
db.create_all()
db.session.commit()

# Check if DB is empty
if db.session.query(User).first() is None:
    
    # Create default user
    default_client = User(
        name="Jason Wozniak",
        phone_number="888-555-3232",
        cell="354-252-4545",
        email="jason.wozniak@bt.com",
        street_address="7474 Hawthorne Drive",
        city="West Smithville",
        state="AZ",
        zip="63433",
        password="money",
        is_trader=False,
        is_manager=False
    )

    # Commit to database
    db.session.add(default_client)
    db.session.commit()

    # Create default client
    default_client_account = Client(
        user_id=1,
        fiat_balance=20000,
        btc_balance=0,
        user_classification="silver",
        last_classification_update=datetime.now()
    )

    # Create default trader
    default_trader = User(
        name="Amit Hassan",
        phone_number="868-383-4545",
        cell="354-252-4545",
        email="amit.hassan@bt.com",
        street_address="420 Peach Street",
        city="West Smithville",
        state="AZ",
        zip="63433",
        password="money",
        is_trader=True,
        is_manager=False
    )

    # Commit to database
    db.session.add(default_client_account)
    db.session.add(default_trader)
    db.session.commit()