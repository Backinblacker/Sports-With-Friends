from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Review, Event, User, Team, Favorite, FavoriteEvent
from database.schemas import favorite_event_schema, favorite_events_schema, favorite_schema, favorites_schema, review_schema, reviews_schema, event_schema, events_schema, user_schema, users_schema, teams_schema
from datetime import datetime

class PostReviewResource(Resource):
    # Post Review
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        username = form_data.get('username')
        rating = form_data.get('rating')
        text = form_data.get('text')
        reviewee_id = form_data.get('reviewee_id')
        date = datetime.utcnow()
        #must have the user and reviewer because this will populate the username field in the data base.
        user = User.query.filter_by(id=user_id).first()
        new_review = Review(username=username, rating=rating, text=text, reviewer=user, reviewee_id=reviewee_id)
        db.session.add(new_review)
        db.session.commit()
        return review_schema.dump(new_review), 201

class ReviewDetailResource(Resource):
    # Get Review
    @jwt_required()
    def get(self, review_id):
        review = Review.query.get_or_404(review_id)
        return review_schema.dump(review), 200
    
    # Edit review
    @jwt_required()
    def put(self, review_id):
        review = Review.query.get_or_404(review_id)
        if 'text' in request.json:
            review.text=request.json['text']
        if 'rating' in request.json:
            review.rating=request.json['rating']
        if 'reviewee_id' in request.json:
            review.reviewee_id=request.json['reviewee_id']
        db.session.commit()
        return review_schema.dump(review), 200
    
    def delete(self, review_id):
        review_from_db = Review.query.get_or_404(review_id)
        db.session.delete(review_from_db)
        db.session.commit()
        return '', 204

class EstablishmentReviewsResource(Resource):
    # Get Review of establishments
    @jwt_required()
    def get(self, user_id):
        reviews = Review.query.filter_by(reviewee_id=user_id).all()
        return reviews_schema.dump(reviews), 200

       
class PostEventResource(Resource):
    # Post Event
    @jwt_required()
    def post(self):
        current_user = get_jwt_identity()
        form_data = request.get_json()
        new_event = event_schema.load(form_data)
        new_event.user_id = current_user

        # current_user.favorite_events.append(new_event)

        db.session.add(new_event)
        db.session.commit()
        return event_schema.dump(new_event), 201


class EventListResource(Resource):
    # Get Event by team_id
    @jwt_required()
    def get(self, team_id):
        event = Event.query.filter_by(team_id=team_id)
        return events_schema.dump(event), 200

class EstablishmentEventListResource(Resource):
    # Get Events by user_id
    @jwt_required()
    def get(self, user_id):
        event = Event.query.filter_by(user_id=user_id).all()
        return events_schema.dump(event), 200

class EventDetailResource(Resource):
    # Get Event
    @jwt_required()
    def get(self, event_id):
        event = Event.query.get_or_404(event_id)
        return event_schema.dump(event), 200
    
    # Edit event
    @jwt_required()
    def put(self, event_id):
        event = Event.query.get_or_404(event_id)
        if 'text' in request.json:
            event.text=request.json['text']
        if 'event_image' in request.json:
            event.event_image=request.json['event_image']
        if 'team_id' in request.json:
            event.team_id=request.json['team_id']
        db.session.commit()
        return event_schema.dump(event), 200
    
    # Delete Event
    def delete(self, event_id):
        event_from_db = Event.query.get_or_404(event_id)
        db.session.delete(event_from_db)
        db.session.commit()
        return '', 204
    
class UserResource(Resource):
    def get(self, user_id):
        user = User.query.filter_by(id=user_id).first_or_404()
        return user_schema.dump(user)
    
class EstablishmentUserResource(Resource):
    def get(self):
        users = User.query.filter_by(is_establishment=True)
        return users_schema.dump(users)
    
class UserToEstablishmentResource(Resource):
    def put(self,user_id):
        establishment = User.query.filter_by(id=user_id).first_or_404()
        if 'first_name' in request.json:
            establishment.first_name=request.json['first_name']
        if 'last_name' in request.json:
            establishment.last_name=request.json['last_name']
        if 'email' in request.json:
            establishment.email=request.json['email']
        if 'is_establishment' in request.json:
            establishment.is_establishment=request.json['is_establishment']
        if 'establishment_name' in request.json:
            establishment.establishment_name=request.json['establishment_name']
        if 'zip_code' in request.json:
            establishment.zip_code=request.json['zip_code']
        if 'opening_time' in request.json:
            establishment.opening_time=request.json['opening_time']
        if 'closing_time' in request.json:
            establishment.closing_time=request.json['closing_time']
        if 'menu_url' in request.json:
            establishment.menu_url=request.json['menu_url']
        if 'specials' in request.json:
            establishment.specials=request.json['specials']
        if 'social_media' in request.json:
            establishment.social_media=request.json['social_media']
        if 'entertainment' in request.json:
            establishment.entertainment=request.json['entertainment']
        if 'teams' in request.json:
            temp_teams_list=[]
            for team_id in request.json['teams']:
                team_on_tv=Team.query.get_or_404(team_id)
                temp_teams_list.append(team_on_tv)
            establishment.teams = temp_teams_list
        db.session.commit()
        return user_schema.dump(establishment), 201
    
class TeamsResource(Resource):
    def get(self, sport):
        teams = Team.query.filter_by(sport=sport).all()
        return teams_schema.dump(teams)
    
class PostFavoriteResource(Resource):
    @jwt_required()
    def post(self):
        favorite_user = get_jwt_identity()
        form_data = request.get_json()
        print(form_data)
        new_favorite = favorite_schema.load(form_data)
        new_favorite.user_id = favorite_user
        db.session.add(new_favorite)
        db.session.commit()
        return favorite_schema.dump(new_favorite), 201

class GetFavoritesResouce(Resource):
    #get all favorite
    @jwt_required()
    def get(self):
        favorite = Favorite.query.filter_by(user_id=get_jwt_identity())
        return favorites_schema.dump(favorite), 200
 
class DeleteFavoriteResouce(Resource):   
    #delete favorite
    def delete(self, favorite_id):
        favorite_from_db = Favorite.query.get_or_404(favorite_id)
        db.session.delete(favorite_from_db)
        db.session.commit()
        return '', 204

class PostFavoriteEventResource(Resource):
    #post favorite event
    @jwt_required()
    def post(self):
        favorite_user = get_jwt_identity()
        form_data = request.get_json()
        print(form_data)
        new_favorite_event = favorite_event_schema.load(form_data)
        new_favorite_event.user_id = favorite_user
        db.session.add(new_favorite_event)
        db.session.commit()
        return favorite_event_schema.dump(new_favorite_event), 201

class GetFavoritesEventsResource(Resource):
    @jwt_required()
    #get all users who favorited an event
    def get(self, event_id):
        users = User.query.filter(User.favorite_events.any(FavoriteEvent.event_id==event_id)).all()
        return users_schema.dump(users), 200
    
class GetUserFavoriteEventsResource(Resource):
    @jwt_required()
    def get(self, user_id):
        user = User.query.get_or_404(user_id)

        favorite_events = user.favorite_events
        return favorite_events_schema.dump(favorite_events), 200
