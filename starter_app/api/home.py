from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from sqlalchemy import or_
from starter_app.models import db, Question, Example, Answer
from sqlalchemy.orm import joinedload

bp = Blueprint("home", __name__)

@bp.route('/questions')
def questions():
  response = Question.query.all()
  return { "questions": [question.to_dict() for question in response]}

# @login_required
@bp.route('/answers', methods=["POST"])  
def answers():
  answers = request.json.get("answers", None)
  user_id = request.json.get("user_id", None)
  newAnswer_1 = Answer(user_id=user_id,choice_id=answers[0])
  newAnswer_2 = Answer(user_id=user_id,choice_id=answers[1])
  newAnswer_3 = Answer(user_id=user_id,choice_id=answers[2])
  db.session.add(newAnswer_1)
  db.session.add(newAnswer_2)
  db.session.add(newAnswer_3)
  db.session.commit()
  return {}, 200




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