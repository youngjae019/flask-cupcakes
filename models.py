"""Models for Cupcake app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DEFAULT_IMG_URL = "https://tinyurl.com/demo-cupcake"

def connect_db(app):
    """Connect database to app"""
    db.app = app
    db.init_app(app)

class Cupcake(db.Model):
    """Cupcake information"""

    __tablename__ = "cupcake"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flavor = db.Column(db.Text, nullable=False)
    size = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    image = db.Column(db.Text, nullable=False, default=DEFAULT_IMG_URL)

    