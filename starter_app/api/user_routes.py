from flask import Blueprint, jsonify
from starter_app.models import User, Question

user_routes = Blueprint('users', __name__)

@user_routes.route('/')
def index():
  response = User.query.all()
  return { "users": [user.to_dict() for user in response]}

  


# @user_routes.route('/questions')
# def questions():
#   response = Question.query.all()
#   return { "questions": [question.to_dict() for question in response]}
