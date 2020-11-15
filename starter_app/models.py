from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import datetime


db = SQLAlchemy()

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(100), nullable=False)
  avatar = db.Column(db.String(40), nullable=True)
  status = db.Column(db.String(20), nullable=True)

  asks = db.relationship('Ask', backref='user', lazy=True)
  friends = db.relationship('Friend', backref='user', lazy=True)
  messages = db.relationship('Message', backref='user', lazy=True)
  # asks = db.relationship('Ask', back_populates='user', lazy=True)

  @property
  def password(self):
    return self.hashed_password

  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)

  def check_password(self, password):
    return check_password_hash(self.password, password)

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "email": self.email,
      "status": self.status,
      "avatar": self.avatar
    }

  def to_dict_id_name(self):
    return {
      self.id : self.name
    }

class Question(db.Model):
  __tablename__='questions'

  id = db.Column(db.Integer, primary_key=True)
  category = db.Column(db.String(15), nullable=False)
  question = db.Column(db.String(400), nullable=False)

  examples = db.relationship("Example", back_populates="question")

  def to_dict(self):
    example_list = [ ex.to_dict_for_question() for ex in self.examples]

    return {
      "id": self.id,
      "category": self.category,
      "question": self.question,
      "examples": example_list
    }

class Example(db.Model):
  __tablename__='examples'

  id = db.Column(db.Integer, primary_key=True)
  question_id = db.Column(db.Integer, db.ForeignKey('questions.id', ondelete='cascade'),nullable=False)
  choice = db.Column(db.String(100), nullable=False)

  question = db.relationship("Question", back_populates="examples")

  def to_dict(self):
    return {
      "id": self.id,
      "question_id": self.question_id,
      "choice": self.choice,
      "question":self.question.question
    }
  
  def to_dict_for_question(self):
    return {
      "ex_id": self.id,
      "choice": self.choice,
    }

class Answer(db.Model):
  __tablename__='answers'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='cascade'),nullable=False)
  selected = db.Column(db.String(30), nullable=False)
  # question_id = db.Column(db.Integer, db.ForeignKey('questions.id', ondelete='cascade'),nullable=False)
  # choice_id = db.Column(db.Integer, db.ForeignKey('examples.id', ondelete='cascade'),nullable=False)

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "selected": self.selected
    }

  def to_dict_match(self):
    return {
      self.user_id: self.selected
    }

class Ask(db.Model):
  __tablename__='asks'

  id = db.Column(db.Integer, primary_key=True)
  # requestor = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='cascade'),nullable=False)
  requestor = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
  recipient = db.Column(db.Integer, nullable=True)
  match_rate = db.Column(db.Integer, nullable=True)
  status = db.Column(db.String(10), nullable=False)
  created_at = db.Column('created_at', db.DateTime, default=datetime.datetime.now)

  # requestor_user = db.relationship('User', foreign_keys=[requestor])
  # recipient_user = db.relationship('User', foreign_keys=[recipient])


  def to_dict(self):
    return {
      "id": self.id,
      "requestor": self.requestor,
      "recipient": self.recipient,
      "requestor_name": self.user.name,
      "match_rate" : self.match_rate,
      "status": self.status,
      "created_at": self.created_at 
    }

  def to_dict_recipient(self):
    return {
      "recipient": self.recipient,
    }

class Friend(db.Model):
  __tablename__='friends'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, nullable=False)
  friend_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='cascade'),nullable=False)
  match_rate = db.Column(db.Integer, nullable=True)
  status = db.Column(db.String(10), nullable=False)
  created_at = db.Column('created_at', db.DateTime, default=datetime.datetime.now)

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "friend_id": self.friend_id,
      "friend_name": self.user.name,
      "friend_email": self.user.email,
      "friend_avatar": self.user.avatar,
      "match_rate": self.match_rate,
      "status": self.status,
      "created_at": self.created_at 
    }

  def to_dict_matchlogic(self):
    return {
      "id": self.friend_id
    }
  
  def to_dict_match(self):
    return {
      self.friend_id: self.friend_id
  }
  
class Message(db.Model):
  __tablename__='messages'

  id = db.Column(db.Integer, primary_key=True)
  from_user = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='cascade'),nullable=False)
  to_user = db.Column(db.Integer, nullable=False)
  message = db.Column(db.String(300), nullable=True)
  status = db.Column(db.String(10), nullable=False)
  created_at = db.Column('created_at', db.DateTime, default=datetime.datetime.now)

  def to_dict(self):
    return {
      "id": self.id,
      "from_user": self.from_user,
      "to_user": self.to_user,
      "from_user_name": self.user.name,
      "message": self.message,
      "status": self.status,
      "created_at": self.created_at 
    }


  

