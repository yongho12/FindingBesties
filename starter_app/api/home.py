from flask import Blueprint, jsonify
from starter_app.models import db, Question, Example
from sqlalchemy.orm import joinedload

bp = Blueprint("home", __name__)

@bp.route('/questions')
def questions():
  response = Question.query.all()
  return { "questions": [question.to_dict() for question in response]}

# @bp.route('/questions')
# def questions():
#     response = db.session.query(Question) \
#                 .options(joinedload(Question.examples))
#     return { "questions": [question.to_dict() for question in response]}

# @bp.route('/questions')
# def questions():
#     response = db.session.query(Example) \
#                 .options(joinedload(Example.question)) \
#                 .order_by(Example.question_id)
#     return { "questions": [question.to_dict() for question in response]}