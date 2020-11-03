from dotenv import load_dotenv
load_dotenv()

from starter_app import app, db
from starter_app.models import User, Question, Example

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

  question1 = Question(category='hobby', content='When you have spare time, what do you do?')

  example1 = Example(question_id = 1, question_content = "reading books")
  example2 = Example(question_id = 1, question_content = "watching TV")
  example3 = Example(question_id = 1, question_content = "taking naps")
  example4 = Example(question_id = 1, question_content = "do nothing")

  question2 = Question(category='habbit', content='When you are in bed for sleep, what do you thik?')

  example2_1 = Example(question_id = 2, question_content = "thinking about what I am going to do tomorrow")
  example2_2 = Example(question_id = 2, question_content = "thinking about lovers")
  example2_3 = Example(question_id = 2, question_content = "thinking aobut foods")
  example2_4 = Example(question_id = 2, question_content = "thinking about the miserable past")

  db.session.add(ian)
  db.session.add(javier)
  db.session.add(dean)
  db.session.add(angela)
  db.session.add(soonmi)
  db.session.add(alissa)

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





  db.session.commit()