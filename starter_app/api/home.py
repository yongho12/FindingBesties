from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from sqlalchemy import or_ 
from starter_app.models import db, Question, Example, Answer, User, Ask, Friend, Message
from sqlalchemy.orm import joinedload
import re

bp = Blueprint("home", __name__)

@bp.route('/questions')
def questions():
  response = Question.query.all()
  return { "questions": [question.to_dict() for question in response]}

# ask to be a bestie
@login_required
@bp.route('/request', methods=["POST"])
def requestFriend():
  requestor = request.json.get("requestor", None)
  recipient = request.json.get("recipient", None)
  match_rate = request.json.get("match_rate", None)
  status = request.json.get("status", None)
  old_ask = Ask.query.filter_by(requestor = requestor).filter_by(recipient = recipient).first()
  if old_ask:
    return {"ask": "asked bestie before"}, 201
  newAsk = Ask(requestor=requestor, recipient=recipient, match_rate=match_rate, status=status)
  db.session.add(newAsk)
  db.session.commit()
  return { "ask": "successful"}, 200

#being asked status
@bp.route('/beingasked/<int:user_id>')
def askbeingfriend(user_id):
  response = db.session.query(Ask) \
              .options(joinedload(Ask.user)) \
              .filter(Ask.recipient == user_id) \
              .filter(Ask.status == "asking")
  return {'beingAsked':[ asked.to_dict() for asked in response ]},200 


# respond yes for asking
@bp.route('/yesforask/<int:id>', methods=["PATCH"])
def yesforask(id):
  ask = Ask.query.filter(Ask.id == id).first()
  status = request.json.get("status_msg", None)
  user_id = request.json.get("user_id", None)

  if ask:
    ask.status = status
    friendOne = ask.requestor
    match_rate = ask.match_rate
    newFriendOne = Friend(user_id=user_id, friend_id=friendOne, status=status, match_rate=match_rate )
    newFriendTwo = Friend(user_id=friendOne, friend_id=user_id, status=status, match_rate=match_rate )
    db.session.add(newFriendOne)
    db.session.add(newFriendTwo)
    db.session.commit()
    return {"ask": [id]}, 200
  return {"errors": ["id not found"]}, 404 


# respond no for asking
@bp.route('/noforask/<int:id>', methods=["PATCH"])
def noforask(id):
  ask = Ask.query.filter(Ask.id == id).first()
  status = request.json.get("status_msg", None)
  user_id = request.json.get("user_id", None)
  if ask:
    ask.status = status
    db.session.commit()
    return {"ask": [id]}, 200
  return {"errors": ["id not found"]}, 404 


#asking status
@bp.route('/askingstatus/<int:user_id>')
def askedfriend(user_id):
  # user_id = request.json.get("user_id", None)
  response = db.session.query(Ask) \
              .filter(Ask.requestor == user_id) \
              .filter(Ask.status == "asking") 
  friends1 = [ asked.to_dict_recipient() for asked in response ]
  friends = [ list(id.values())[0] for id in friends1]
  friends2 = db.session.query(User) \
              .filter(User.id.in_(friends)).all()
  friends3 = [ user.to_dict_id_name() for user in friends2 ]
  f_id = [ list(f.keys())[0] for f in friends3]
  f_name = [ list(f.values())[0] for f in friends3]
  f_id_name = dict(zip(f_id, f_name))
  return {'askingStatus':[ user.to_dict() for user in response ],
          'askingList': f_id_name,
          },200 

# friend list 
@bp.route('/friendslist/<int:user_id>')
def friendlist(user_id):
  response = db.session.query(Friend) \
              .options(joinedload(Friend.user)) \
              .filter(Friend.user_id == user_id) \
              .filter(Friend.status == "friend")
  return {'friends':[ friend.to_dict() for friend in response ]},200 

# messaging to friend
@bp.route('/friendsmessage/<int:user_id>', methods=['POST'])
def message(user_id):
  if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
  from_user = user_id
  to_user = request.json.get("to_user", None)
  message = request.json.get("message", None)
  status = "open"
  newMessage = Message(from_user=from_user, to_user=to_user, message=message, status=status)
  db.session.add(newMessage)
  db.session.commit()
  return { "msg":"message saved successfully" }, 200
  

# received message
@bp.route('/messagereceived/<int:user_id>')
def messagereceived(user_id):
  response = db.session.query(Message) \
              .options(joinedload(Message.user)) \
              .filter(Message.to_user == user_id) \
              .filter(Message.status == "open")
  return {'msgreceived':[ asked.to_dict() for asked in response ]},200 



# MatchingLogic
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

  #!!!!!!!!!!!!!!!Switch for Logic one or two!!!!!!

  # intimacyLogic is including current friends
  intimate_users = intimacyLogic(user_id)

  # intimacyLogic2 is excluding current friends
  # intimate_users = intimacyLogic2(user_id)
  
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

  match_percent = [int(v/4*100) for v in top_bottom_3_val ]
  #zip them together
  top_bottom_three = dict(zip(top_bottom_3, match_percent))
  
  first = User.query.filter_by(id = top_bottom_3[0])
  second = User.query.filter_by(id = top_bottom_3[1])
  third = User.query.filter_by(id = top_bottom_3[2])
  last_third = User.query.filter_by(id = top_bottom_3[3])
  last_second = User.query.filter_by(id = top_bottom_3[4])
  last_first = User.query.filter_by(id = top_bottom_3[5])
 
  #finding usr's friend list
  friends_query = Friend.query.filter(Friend.user_id == user_id).all()
  all_friends=[friend.to_dict_match() for friend in friends_query] 
  friends_list = [ list(f.keys())[0] for f in all_friends]
  friends = dict(zip(friends_list, friends_list))

  return {
          "top_bottom_three": top_bottom_three,
          "first": [user.to_dict() for user in first],
          "second": [user.to_dict() for user in second],
          "third": [user.to_dict() for user in third],
          "last_third": [user.to_dict() for user in last_third],
          "last_second": [user.to_dict() for user in last_second],
          "last_first": [user.to_dict() for user in last_first],
          "friends": friends }, 200

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

  intimate_users = list(intimacies.keys())

  return intimacies

# intimacy Logic - intimacyLogic2
def intimacyLogic2(my_id):
  response = db.session.query(Answer).all()
  all_answers=[answer.to_dict_match() for answer in response] 

  answer_sheets=enrich(all_answers)

  all_users = list(answer_sheets.keys())
  all_users.remove(my_id)
  
  #deleting the current friends
  friends_query = Friend.query.filter(Friend.user_id == my_id).all()
  all_friends = [ friend.to_dict_matchlogic() for friend in friends_query]
  friends = [list(id.values())[0] for id in all_friends]

  for x in range(0, len(friends)):
    if friends[x] in all_users:
      all_users.remove(friends[x])  

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

  # return intimate_users
  return intimacies


def enrich(raw_data):
  v_answer_sheets = {}
  #converting raw data to simple dictionary format
  for i in range(0, len(raw_data)):
      user_data = raw_data[i]

      user_id = list(user_data.keys())[0]
      user_answers = list(user_data.values())[0]

      user_answers = (re.sub('[{}]', '', user_answers)).split(",")
  
      v_answer_sheets[user_id] = user_answers

  return v_answer_sheets





