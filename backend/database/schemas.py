from flask_marshmallow import Marshmallow
from marshmallow import post_load, fields
from database.models import User, Car, Team, Fan, Establishment, Review

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
    class Meta:
        fields = ("id", "username",  "password", "first_name", "last_name", "email")

    @post_load
    def create_user(self, data, **kwargs):
        return User(**data)
    
class UserSchema(ma.Schema):
    """
    Schema used for displaying users, does NOT include password
    """
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    class Meta:
        fields = ("id", "username", "first_name", "last_name", "email",)

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

class FanSchema(ma.Schema):
    user_id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    email = fields.String(required=True)
    team_id = fields.Integer()
    team = ma.Nested(TeamSchema, many=True)
    class Meta:
        fields = ("user_id", "username", "email", "team_id", "team")
    
    @post_load
    def create_fan(self,data,**kwargs):
        return Fan(**data)

fan_schema = FanSchema()
fans_schema = FanSchema(many=True)

class EstablishmentSchema(ma.Schema):
    establishment_id = fields.Integer(primary_key=True)
    name = fields.String(required=True)
    address = fields.String(required=True)
    city = fields.String(required=True)
    state = fields.String(required=True)
    zip_code = fields.Integer(required=True)
    website = fields.String()
    team_id = fields.Integer()
    team = ma.Nested(TeamSchema, many=True)
    class Meta:
        fields = ("establishment_id", "name", "address", "city", "state", "zip_code", "website", "team_id", "team")
    
    @post_load
    def create_fan(self,data,**kwargs):
        return Establishment(**data)

establishment_schema = EstablishmentSchema()
establishmentss_schema = EstablishmentSchema(many=True)

class ReviewSchema(ma.Schema):
    review_id = fields.Integer(primary_key=True)
    text = fields.String(required=True)
    rating = fields.String(required=True)
    class Meta:
        fields = ("review_id", "text", "rating")
    
    @post_load
    def create_fan(self,data,**kwargs):
        return Review(**data)
    
review_schema = ReviewSchema()
reviews_schema = ReviewSchema(many=True)