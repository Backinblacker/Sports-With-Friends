from flask_bcrypt import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()

establishment_teams = db.Table('establishment_teams',
                    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
                    db.Column('team_id', db.Integer, db.ForeignKey('team.id'))
                    )

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    is_establishment = db.Column(db.Boolean)
    establishment_name = db.Column(db.String(255))
    zip_code = db.Column(db.Integer)
    opening_time = db.Column(db.Time)
    closing_time = db.Column(db.Time)
    menu_url = db.Column(db.String(255))
    specials = db.Column(db.String(255))
    social_media = db.Column(db.String(255))
    entertainment = db.Column(db.String(255))
    teams = db.relationship("Team", secondary=establishment_teams, backref='establishment')
    reviews_written = db.relationship('Review', foreign_keys='Review.username')
    reviews_received = db.relationship('Review', foreign_keys='Review.reviewee_id')
    favorite_events = db.relationship('FavoriteEvent', foreign_keys='FavoriteEvent.favorited_by_id')
    
    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return self.username

class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(255), nullable=False)
    model = db.Column(db.String(255), nullable=False)
    year = db.Column(db.Integer)
    # Adds user_id as an Integer column on the car table which references the id column on user table
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    # Establishes object relation between car-user so we can grab values like car.user.username
    user = db.relationship("User")

# TODO: Add your models below, remember to add a new migration and upgrade database
class Team(db.Model):
    __tablename__ = 'team'
    id = db.Column(db.Integer, primary_key=True)
    sport = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    league = db.Column(db.String(100), nullable=False)
    division = db.Column(db.String(100))
    conference = db.Column(db.String(100))

    
class Review(db.Model):
    __tablename__ = 'review'
    review_id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(500), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    username = db.Column(db.String(50), db.ForeignKey('user.username'))
    reviewee_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    date = db.Column(db.DateTime, default=datetime.utcnow)
    #back_populates helps create a two-way relationship between User and Review tables
    reviewer = db.relationship('User', back_populates='reviews_written', foreign_keys=[username])
    reviewee = db.relationship('User', back_populates='reviews_received', foreign_keys=[reviewee_id])
    
class Event(db.Model):
    __tablename__ = 'event'
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(500), nullable=False)
    event_image = db.Column(db.String(500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User')
    team_id = db.Column(db.Integer, db.ForeignKey('team.id'))
    team = db.relationship('Team')
    
class Favorite(db.Model):
    __tablename__ = 'favorites'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', foreign_keys = user_id)
    establishment_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    establishment = db.relationship('User', foreign_keys = establishment_id)
    
class FavoriteEvent(db.Model):
    __tablename__ = 'favorite_event'
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
    event = db.relationship('Event', foreign_keys = event_id)
    favorited_by_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    favorited_by = db.relationship('User', back_populates='favorite_events', foreign_keys=[favorited_by_id])
    
user_favorite_event = db.Table('user_favorite_event',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('favorite_event_id', db.Integer, db.ForeignKey('favorite_event.id'), primary_key=True)
)