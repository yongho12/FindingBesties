from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from sqlalchemy import or_
from starter_app.models import db, Question, Example, Answer
from sqlalchemy.orm import joinedload
import re

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
  newAnswer = Answer(user_id=user_id, selected=answers)
  db.session.add(newAnswer)
  db.session.commit()
  intimacyLogic(user_id)
  intimacies=intimacyLogic(user_id)
  print(intimacies) 
  return {"similar1": intimacies[0],
          "similar2": intimacies[1],
          "similar3": intimacies[2],
          "opposite1":intimacies[-1],
          "opposite2":intimacies[-2],
          "opposite3":intimacies[-3]
          }, 200

def intimacyLogic(my_id):
  response = db.session.query(Answer).all()
  all_answers=[answer.to_dict_match() for answer in response] 
  answer_sheets=enrich(all_answers)

  all_users = list(answer_sheets.keys())
  all_users.remove(my_id)
  my_answer = answer_sheets[my_id]

  intimacies = {}

  for x in range(0, len(all_users)):
    user_id = all_users[x]
    user_answer = answer_sheets[user_id]

    #compare
    intimacy = 0
    for i in range(0, len(my_answer)):

      if user_answer[i] == my_answer[i]:
        intimacy += 1

    intimacies[user_id] = intimacy

  intimacies = {k: v for k, 
                v in sorted(intimacies.items(),
                            key=lambda item:item[1],
                            reverse=True)
                }
  intimate_users = list(intimacies.keys())

  return intimate_users

def enrich(raw_data):
  v_answer_sheets = {}
  #converting raw data to simple dictionary format
  for i in range(0, len(raw_data)):
      user_data = raw_data[i]
      #print (user_data)
      #output {7: '{3,8,11,15}'}

      user_id = list(user_data.keys())[0]
      user_answers = list(user_data.values())[0]
      #print(user_answers)
      #output before conversion : {3,8,11,15}  -->string

      #converting string to list (remove {} from the string and split by comma)
      user_answers = (re.sub('[{}]', '', user_answers)).split(",")
      #print(user_answers)
      #output after conversion : ['3', '8', '11', '15'] -->list

      # v_answer_sheets[user_id]= user_value
      v_answer_sheets[user_id] = user_answers

  #print(v_answer_sheets)
  #output {7: ['3', '8', '11', '15'], 5: ['3', '8', '11', '15'], 3: ['3', '8', '11', '15'], 4: ['3', '8', '11', '15']}
  return v_answer_sheets





