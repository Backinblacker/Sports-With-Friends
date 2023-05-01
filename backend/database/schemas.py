from flask_marshmallow import Marshmallow
from marshmallow import post_load, fields
from database.models import User, Car, Team, Review, Event

ma = Marshmallow()

# Auth Schemas
class RegisterSchema(ma.Schema):
    """
    Schema used for registration, includes password
    """
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    password = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    is_establishment = fields.Boolean(default=False)
    class Meta:
        fields = ("id", "username",  "password", "first_name", "last_name", "email", "is_establishment")

    @post_load
    def create_user(self, data, **kwargs):
        return User(**data)

class TeamSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    sport = fields.String(required=True)
    name = fields.String(required=True)
    league = fields.String(required=True)
    division = fields.String()
    conference =fields.String()
    class Meta:
        fields = ("id", "sport", "name", "league", "division", "conference")
    
    @post_load
    def create_team(self, data, **kwargs):
        return Team(**data)
    
team_schema = TeamSchema()
teams_schema = TeamSchema(many=True)

class UserSchema(ma.Schema):
    """
    Schema used for displaying users, does NOT include password
    """
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    is_establishment = fields.Boolean()
    # Only shows up if user is an establishment
    establishment_name = fields.String()
    opening_time = fields.Time()
    closing_time = fields.Time()
    menu_url = fields.String()
    specials = fields.String()
    social_media = fields.String()
    entertainment = fields.String()
    teams = fields.Nested(TeamSchema, many=True)
    class Meta:
        fields = ("id", "username", "first_name", "last_name", "email", "is_establishment", "establishment_name", "opening_time", "closing_time", "menu_url", "specials", "event", "social_media", "entertainment", "teams")


register_schema = RegisterSchema()
user_schema = UserSchema()
users_schema = UserSchema(many=True)


# Car Schemas
class CarSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    make = fields.String(required=True)
    model = fields.String(required=True)
    year = fields.Integer()
    user_id = fields.Integer()
    user = ma.Nested(UserSchema, many=False)
    class Meta:
        fields = ("id", "make", "model", "year", "user_id", "user")
    
    @post_load
    def create_car(self, data, **kwargs):
        return Car(**data)

car_schema = CarSchema()
cars_schema = CarSchema(many=True)


# TODO: Add your schemas below

class ReviewSchema(ma.Schema):
    review_id = fields.Integer(primary_key=True)
    text = fields.String(required=True)
    rating = fields.String(required=True)
    class Meta:
        fields = ("review_id", "text", "rating")
    
    @post_load
    def create_review(self,data,**kwargs):
        return Review(**data)
    
review_schema = ReviewSchema()
reviews_schema = ReviewSchema(many=True)

class EventSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    text = fields.String(required=True)
    event_image = fields.String(required=True)
    team_id = fields.Integer()
    team = ma.Nested(TeamSchema, many=True)
    class Meta:
        fields = ("id", "text", "event_image", "team_id")
    
    @post_load
    def create_event(self,data,**kwargs):
        return Event(**data)
    
event_schema = EventSchema()
events_schema = EventSchema(many=True)