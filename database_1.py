from dotenv import load_dotenv
load_dotenv()

from starter_app import app, db
from starter_app.models import User, Question, Example, Answer, Friend, Message

with app.app_context():
  db.drop_all()
  db.create_all()


  
  user1 =  User(name='demo', email='demo@example.com',  password='password', avatar='/images/friends.png')
  user2 = User(name='Alec', email='alec@aa.io', password='password', avatar='/images/friends.png')
  user3 = User(name='Ammar', email='ammar@aa.io', password='password', avatar='/images/friends.png')
  user4 = User(name='Andrea', email='andrea@aa.io',  password='password', avatar='/images/friends.png')
  user5 = User(name='Andrew', email='andrew@aa.io',  password='password', avatar='/images/friends.png')
  user6 = User(name='Ben', email='ben@aa.io',  password='password', avatar='/images/friends.png')
  user7 = User(name='Dan B', email='danb@example.com',  password='password', avatar='/images/friends.png')
  user8 = User(name='Daniel', email='daniel@aa.io',  password='password', avatar='/images/friends.png')
  user9 = User(name='Dillon', email='dillon@aa.io',  password='password', avatar='/images/friends.png')
  user10 = User(name='Erin', email='erin@example.com',  password='password', avatar='/images/friends.png')

  user11 = User(name='Isaac', email='isaac@aa.io',  password='password', avatar='/images/friends.png')
  user12 = User(name='Ivan', email='ivan@aa.io', password='password', avatar='/images/friends.png')
  user13 = User(name='James', email='james@aa.io', password='password', avatar='/images/friends.png')
  user14 = User(name='Jaron', email='jaron@aa.io',  password='password', avatar='/images/friends.png')
  user15 = User(name='Jeff', email='jeff@aa.io',  password='password', avatar='/images/friends.png')
  user16 = User(name='John A', email='johna@aa.io',  password='password', avatar='/images/friends.png')
  user17 = User(name='John M', email='johnm@example.com',  password='password', avatar='/images/friends.png')
  user18 = User(name='Jony', email='jony@aa.io',  password='password', avatar='/images/friends.png')
  user19 = User(name='Julie', email='julie@aa.io',  password='password', avatar='/images/friends.png')
  user20 = User(name='Juliet', email='juliet@example.com',  password='password', avatar='/images/friends.png')

  user21 = User(name='Kasey', email='kasey@aa.io',  password='password', avatar='/images/friends.png')
  user22 = User(name='Krisna', email='krisna@aa.io', password='password', avatar='/images/friends.png')
  user23 = User(name='Matt R', email='mattr@aa.io', password='password', avatar='/images/friends.png')
  user24 = User(name='Matt Z', email='mattz@aa.io',  password='password', avatar='/images/friends.png')
  user25 = User(name='Miah', email='miah@aa.io',  password='password', avatar='/images/friends.png')
  user26 = User(name='Michael', email='michael@aa.io',  password='password', avatar='/images/friends.png')
  user27 = User(name='Peter', email='peter@example.com',  password='password', avatar='/images/friends.png')
  user28 = User(name='Quincy', email='quincy@aa.io',  password='password', avatar='/images/friends.png')
  user29 = User(name='Quynn', email='quynn@aa.io',  password='password', avatar='/images/friends.png')
  user30 = User(name='Sam', email='sam@example.com',  password='password', avatar='/images/friends.png')

  user31 = User(name='Sophie', email='sophie@aa.io',  password='password', avatar='/images/friends.png')
  user32 = User(name='Tyna', email='tyna@aa.io', password='password', avatar='/images/friends.png')
  user33 = User(name='Tom', email='tom@aa.io', password='password', avatar='/images/friends.png')
  user34 = User(name='Corina', email='corina@aa.io',  password='password', avatar='/images/friends.png')
  user35 = User(name='Joanna', email='joanna@aa.io',  password='password', avatar='/images/friends.png')
  user36 = User(name='Mylo', email='mylo@aa.io',  password='password', avatar='/images/friends.png')
  user37 = User(name='Geoffery', email='geoffery@aa.io',  password='password', avatar='/images/friends.png')
  user38 = User(name='Ian', email='ian@aa.io',  password='password', avatar='/images/friends.png')
  user39 = User(name='Javier', email='javier@aa.io', password='password', avatar='/images/friends.png')
  user40 = User(name='Dean', email='dean@aa.io', password='password', avatar='/images/friends.png')

  user41 = User(name='Angela', email='angela@aa.io',  password='password', avatar='/images/friends.png')
  user42 = User(name='Soon-Mi', email='soonmi@aa.io',  password='password', avatar='/images/friends.png')
  user43 = User(name='Alissa', email='alissa@aa.io',  password='password', avatar='/images/friends.png')
  user44 = User(name='Aaron', email='aaron@aa.io',  password='password', avatar='/images/friends.png')

  

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
  answer7 = Answer(user_id = 7, selected =['1', '6', '12', '16'])
  answer8 = Answer(user_id = 8, selected =['1', '6', '9', '13'])
  answer9 = Answer(user_id = 9, selected =['2', '7', '11', '14'])
  answer10 = Answer(user_id =10, selected =['3', '7', '9', '15'])

  answer11 = Answer(user_id = 11, selected =['1', '6', '12', '16'])
  answer12 = Answer(user_id = 12, selected =['1', '6', '9', '13'])
  answer13 = Answer(user_id = 13, selected =['2', '7', '11', '14'])
  answer14 = Answer(user_id = 14, selected =['3', '5', '9', '15'])
  answer15 = Answer(user_id = 15, selected =['4', '5', '10', '16'])
  answer16 = Answer(user_id = 16, selected =['1', '6', '12', '16'])
  answer17 = Answer(user_id = 17, selected =['2', '6', '12', '16'])
  answer18 = Answer(user_id = 18, selected =['3', '6', '9', '13'])
  answer19 = Answer(user_id = 19, selected =['2', '7', '11', '14'])
  answer20 = Answer(user_id = 20, selected =['4', '7', '9', '15'])

  friend1 = Friend(user_id = 1, friend_id = 4, match_rate = 85, status = 'friend')
  friend2 = Friend(user_id = 4, friend_id = 1, match_rate = 85, status = 'friend')
  friend3 = Friend(user_id = 1, friend_id = 24, match_rate = 54, status = 'friend')
  friend4 = Friend(user_id = 24, friend_id = 1, match_rate = 54, status = 'friend')
  friend5 = Friend(user_id = 1, friend_id = 19, match_rate = 65, status = 'friend')
  friend6 = Friend(user_id = 19, friend_id = 1, match_rate = 65, status = 'friend')
  friend7 = Friend(user_id = 1, friend_id = 41, match_rate = 75, status = 'friend')
  friend8 = Friend(user_id = 41, friend_id = 1, match_rate = 75, status = 'friend')

  
     

  


  db.session.add(user1)
  db.session.add(user2)
  db.session.add(user3)
  db.session.add(user4)
  db.session.add(user5)
  db.session.add(user6)
  db.session.add(user7)
  db.session.add(user8)
  db.session.add(user9)
  db.session.add(user10)

  db.session.add(user11)
  db.session.add(user12)
  db.session.add(user13)
  db.session.add(user14)
  db.session.add(user15)
  db.session.add(user16)
  db.session.add(user17)
  db.session.add(user18)
  db.session.add(user19)
  db.session.add(user20)

  db.session.add(user21)
  db.session.add(user22)
  db.session.add(user23)
  db.session.add(user24)
  db.session.add(user25)
  db.session.add(user26)
  db.session.add(user27)
  db.session.add(user28)
  db.session.add(user29)
  db.session.add(user30)

  db.session.add(user31)
  db.session.add(user32)
  db.session.add(user33)
  db.session.add(user34)
  db.session.add(user35)
  db.session.add(user36)
  db.session.add(user37)
  db.session.add(user38)
  db.session.add(user39)
  db.session.add(user40)

  db.session.add(user41)
  db.session.add(user42)
  db.session.add(user43)
  db.session.add(user44)

  db.session.add(friend1)
  db.session.add(friend2)
  db.session.add(friend3)
  db.session.add(friend4)
  db.session.add(friend5)
  db.session.add(friend6)
  db.session.add(friend7)
  db.session.add(friend8)
  
  



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
  db.session.add(answer7)
  db.session.add(answer8)
  db.session.add(answer9)
  db.session.add(answer10)

  db.session.add(answer11)
  db.session.add(answer12)
  db.session.add(answer13)
  db.session.add(answer14)
  db.session.add(answer15)
  db.session.add(answer16)
  db.session.add(answer17)
  db.session.add(answer18)
  db.session.add(answer19)
  db.session.add(answer20)


  db.session.commit()