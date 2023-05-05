from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_migrate import Migrate
from database.models import db
from database.schemas import ma
from resources.auth import LoginResource, RegisterResource
from resources.cars import AllCarResource, UserCarResource
from resources.resources import PostReviewResource,  TeamsResource, ReviewDetailResource, EventDetailResource, PostEventResource, UserToEstablishmentResource, EventListResource, EstablishmentEventListResource, UserResource
from dotenv import load_dotenv
from os import environ

# Adds variables from .env file to environment
load_dotenv()

# Creates instances of additional libraries
bcrypt = Bcrypt()
jwt= JWTManager()
cors = CORS()
migrate = Migrate()

def create_app():
    """
    App factory that creates app instance
    """
    # Creates app instance
    app = Flask(__name__)

    # Loads config properties from .env file
    app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('SQLALCHEMY_DATABASE_URI')
    app.config['JWT_SECRET_KEY'] = environ.get('JWT_SECRET_KEY')

    # Registers all routes with API
    api = create_routes()

    # Registers Flask app with additional libraries created/imported above
    db.init_app(app)
    ma.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)
    api.init_app(app)
    migrate.init_app(app, db)

    return app


def create_routes():
    """
    Creates Flask Restful instance and registers all Resource routes
    """
    api = Api()
    api.add_resource(RegisterResource, '/api/auth/register')
    api.add_resource(LoginResource, '/api/auth/login')
    api.add_resource(AllCarResource, '/api/cars')
    api.add_resource(UserCarResource, '/api/user_cars')
    # TODO: Create files for your Resources in resources folder, add them here
    api.add_resource(PostReviewResource, '/api/user_reviews')
    api.add_resource(ReviewDetailResource, '/api/user_reviews/<int:review_id>')
    api.add_resource(PostEventResource, '/api/events')
    api.add_resource(EventDetailResource, '/api/eventdetails/<int:event_id>')
    api.add_resource(EventListResource, '/api/eventsbyteam/<int:team_id>')
    api.add_resource(EstablishmentEventListResource, '/api/eventsbyuser/<int:user_id>')
    api.add_resource(UserToEstablishmentResource, '/api/user/<int:user_id>')
    api.add_resource(UserResource, '/api/userinfo/<int:user_id>/')
    api.add_resource(TeamsResource, '/api/teams/<string:sport>')
    return api
