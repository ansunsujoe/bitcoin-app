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
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost/bitcoin'
db = SQLAlchemy(app)

from app import transactions, users
from app.models import *

# Create tables
db.create_all()
db.session.commit()