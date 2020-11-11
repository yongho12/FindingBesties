from dotenv import load_dotenv
load_dotenv()

from starter_app import app, db
from starter_app.models import User, Question, Example, Answer, Friend

with app.app_context():
  db.drop_all()
  db.create_all()

  ian = User(name='Ian', email='ian@aa.io',  password='password')
  javier = User(name='Javier', email='javier@aa.io', password='password')
  dean = User(name='Dean', email='dean@aa.io', password='password')
  angela = User(name='Angela', email='angela@aa.io',  password='password')
  soonmi = User(name='Soon-Mi', email='soonmi@aa.io',  password='password')
  alissa = User(name='Alissa', email='alissa@aa.io',  password='password')
  demo = User(name='demo', email='demo@example.com',  password='password')

  question1 = Question(category='hobby', question='When you have spare time, what do you mostly do?')

  example1 = Example(question_id = 1, choice = "reading books")
  example2 = Example(question_id = 1, choice = "watching TV")
  example3 = Example(question_id = 1, choice = "taking naps")
  example4 = Example(question_id = 1, choice = "playing sports")

  question2 = Question(category='habbit', question='When you are in bed before sleeping, what do you mostly think about?')

  example2_1 = Example(question_id = 2, choice = "what am I going to do tomorrow")
  example2_2 = Example(question_id = 2, choice = "my exgirlfriends or exboyfriends ")
  example2_3 = Example(question_id = 2, choice = "what am I going to eat tomorrow.")
  example2_4 = Example(question_id = 2, choice = "what I have to do at work tomorrow")

  question3 = Question(category='habbit', question='Where do you prefer to live?')

  example3_1 = Example(question_id = 3, choice = "in a trendy downtown apartment")
  example3_2 = Example(question_id = 3, choice = "in the suburbs")
  example3_3 = Example(question_id = 3, choice = "in a rural or farm location")
  example3_4 = Example(question_id = 3, choice = "in a tent or homeless shelter")

  question4 = Question(category='habbit', question='What kind of car would you like to drive')

  example4_1 = Example(question_id = 4, choice = "a minivan for kids")
  example4_2 = Example(question_id = 4, choice = "a mid-size sedan")
  example4_3 = Example(question_id = 4, choice = "a pickup truck")
  example4_4 = Example(question_id = 4, choice = "I don't drive")

  answer1 = Answer(user_id = 1, selected =['1', '6', '12', '16'])
  answer2 = Answer(user_id = 2, selected =['1', '6', '9', '13'])
  answer3 = Answer(user_id = 3, selected =['2', '7', '11', '14'])
  answer4 = Answer(user_id = 4, selected =['3', '7', '9', '15'])
  answer5 = Answer(user_id = 5, selected =['4', '5', '10', '16'])
  answer6 = Answer(user_id = 6, selected =['1', '6', '12', '16'])
  

  db.session.add(ian)
  db.session.add(javier)
  db.session.add(dean)
  db.session.add(angela)
  db.session.add(soonmi)
  db.session.add(alissa)
  db.session.add(demo)

  db.session.add(question1)

  db.session.add(example1)
  db.session.add(example2)
  db.session.add(example3)
  db.session.add(example4)

  db.session.add(question2)

  db.session.add(example2_1)
  db.session.add(example2_2)
  db.session.add(example2_3)
  db.session.add(example2_4)

  db.session.add(question3)

  db.session.add(example3_1)
  db.session.add(example3_2)
  db.session.add(example3_3)
  db.session.add(example3_4)

  db.session.add(question4)

  db.session.add(example4_1)
  db.session.add(example4_2)
  db.session.add(example4_3)
  db.session.add(example4_4)

  db.session.commit()

  db.session.add(answer1)
  db.session.add(answer2)
  db.session.add(answer3)
  db.session.add(answer4)
  db.session.add(answer5)
  db.session.add(answer6)


  db.session.commit()