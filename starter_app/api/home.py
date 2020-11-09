from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from sqlalchemy import or_ 
from starter_app.models import db, Question, Example, Answer, User, Ask
from sqlalchemy.orm import joinedload
import re

bp = Blueprint("home", __name__)

@bp.route('/questions')
def questions():
  response = Question.query.all()
  return { "questions": [question.to_dict() for question in response]}


@login_required
@bp.route('/request', methods=["POST"])
def requestFriend():
  requestor = request.json.get("requestor", None)
  recipient = request.json.get("recipient", None)
  newAsk = Ask(requestor=requestor, recipient=recipient)
  db.session.add(newAsk)
  db.session.commit()
  return { "ask": "successful"}, 200




@login_required
@bp.route('/answers', methods=["POST", "DELETE"])  
def answers():
  answers = request.json.get("answers", None)
  user_id = request.json.get("user_id", None)
  #delete user's answer in past. 
  oldAnswer = Answer.query.filter_by(user_id=user_id).first()
  if oldAnswer:
    db.session.delete(oldAnswer)
    db.session.commit()
  newAnswer = Answer(user_id=user_id, selected=answers)
  db.session.add(newAnswer)
  db.session.commit()

  # calling itimacy logic and received top/bottom 3
  intimate_users = intimacyLogic(user_id)
  #key
  intimacies = list(intimate_users.keys())
  top_bottom_3 = intimacies[0:3]
  bottom3 = intimacies[-3:]
  top_bottom_3.extend(bottom3)
  #value
  intimacies_val = list(intimate_users.values())
  top_bottom_3_val = intimacies_val[0:3]
  bottom3_val = intimacies_val[-3:]
  top_bottom_3_val.extend(bottom3_val)
  print("top_bottom_3:::::",top_bottom_3 )
  print("top_bottom_3_val::::", top_bottom_3_val)
  # print("AAAAAAAA", [ val/3 for val in top_bottom_3_val])
  match_percent = [int(v/4*100) for v in top_bottom_3_val ]
  #zip them together
  top_bottom_three = dict(zip(top_bottom_3, match_percent))
  print("top_bottom_three:::::::::",top_bottom_three)

  

  recommends = User.query.filter(User.id.in_(top_bottom_3))
  # q = User.query.filter(User.id.in_(top_bottom_3))
  # reco_map = { t.id: t for t in q}
  # team = [reco_map[n] for n in id]
  first = User.query.filter_by(id = top_bottom_3[0])
  second = User.query.filter_by(id = top_bottom_3[1])
  third = User.query.filter_by(id = top_bottom_3[2])
  last_third = User.query.filter_by(id = top_bottom_3[3])
  last_second = User.query.filter_by(id = top_bottom_3[4])
  last_first = User.query.filter_by(id = top_bottom_3[5])
  print('first::::', first)
  # .order_by(User.id.in_(top_bottom_3))
  print([user.to_dict() for user in recommends])
  # final_list= [user.to_dict(), top_bottom_three for user in recommends if recommends.id == top_bottom_three.keys() ]

  

  print("recommends::::::::",[user.to_dict() for user in recommends] ) 
  return {"top_bottom_3": top_bottom_3,
          "top_bottom_three": top_bottom_three,
          "first": [user.to_dict() for user in first],
          "second": [user.to_dict() for user in second],
          "third": [user.to_dict() for user in third],
          "last_third": [user.to_dict() for user in last_third],
          "last_second": [user.to_dict() for user in last_second],
          "last_first": [user.to_dict() for user in last_first],
          "recommends": [user.to_dict() for user in recommends]}, 200


# intimacy Logic
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
  print("intimacies:::::", intimacies)
  intimate_users = list(intimacies.keys())
  # intimate_nums = list(intimacies.values())

  # return intimate_users
  return intimacies

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





