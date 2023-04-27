from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Review
from database.schemas import review_schema, reviews_schema

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
    
    
        