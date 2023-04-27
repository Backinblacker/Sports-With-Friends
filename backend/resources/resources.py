from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Review, Event
from database.schemas import review_schema, reviews_schema, event_schema

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
            review.text=request.json['rating']
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
        user_id = get_jwt_identity()
        form_data = request.get_json()
        event_id = form_data.get('event_id')
        image = form_data.get('event_image')
        text = form_data.get('text')
        new_review = Event(user_id=user_id, event_id=event_id, image=image, text=text)
        db.session.add(new_review)
        db.session.commit()
        return event_schema.dump(new_review), 201

class EventDetailResource(Resource):
    # Get Event
    @jwt_required()
    def get(self, event_id):
        event = Event.query.get_or_404(event_id)
        return event_schema.dump(event), 200
    
    # Edit event
    @jwt_required()
    def put(self, event_id):
        review = Event.query.get_or_404(event_id)
        if 'text' in request.json:
            review.text=request.json['text']
        if 'event_image_url' in request.json:
            review.text=request.json['event_image_url']
        db.session.commit()
        return review_schema.dump(review), 200
    
    def delete(self, event_id):
        event_from_db = Event.query.get_or_404(event_id)
        db.session.delete(event_from_db)
        db.session.commit()
        return '', 204