from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Review, Event, User, Team
from database.schemas import review_schema, reviews_schema, event_schema, user_schema

class PostReviewResource(Resource):
    # Post Review
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        name = form_data.get('name')
        rating = form_data.get('rating')
        text = form_data.get('text')
        new_review = Review(user_id=user_id, name=name, rating=rating, text=text)
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
        db.session.commit()
        return review_schema.dump(review), 200
    
    def delete(self, review_id):
        review_from_db = Review.query.get_or_404(review_id)
        db.session.delete(review_from_db)
        db.session.commit()
        return '', 204
    
class PostEventResource(Resource):
    # Post Event
    @jwt_required()
    def post(self):
        current_user = get_jwt_identity()
        form_data = request.get_json()
        print(form_data)
        # image = form_data.get('event_image')
        # text = form_data.get('text')
        # new_event = Event(user_id=current_user, event_image=image, text=text)
        new_event = event_schema.load(form_data)
        new_event.user_id = current_user
        db.session.add(new_event)
        db.session.commit()
        return event_schema.dump(new_event), 201

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
        if 'event_image_url' in request.json:
            event.event_imate_url=request.json['event_image_url']
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
        return user_schema.dump(user, options={"include": ["teams"]})
    
class UserToEstablishmentResource(Resource):
    def put(self,user_id):
        establishment = User.query.filter_by(id=user_id).first_or_404()
        if 'is_establishment' in request.json:
            establishment.is_establishment=request.json['is_establishment']
        if 'establishment_name' in request.json:
            establishment.establishment_name=request.json['establishment_name']
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
        return user_schema.dump(establishment), 200