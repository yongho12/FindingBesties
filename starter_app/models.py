from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(100), nullable=False)
  avatar = db.Column(db.String(40), nullable=True)
  status = db.Column(db.String(20), nullable=True)

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
      "hashed_password": self.hashed_password,
      "status": self.status,
      "avatar": self.avatar
    }

class Question(db.Model):
  __tablename__='questions'

  id = db.Column(db.Integer, primary_key=True)
  category = db.Column(db.String(15), nullable=False)
  question = db.Column(db.String(400), nullable=False)

  examples = db.relationship("Example", back_populates="question")

  def to_dict(self):
    return {
      "id": self.id,
      "category": self.category,
      "question": self.question,
      # "choice" : self.examples.choice
    }

class Example(db.Model):
  __tablename__='examples'

  id = db.Column(db.Integer, primary_key=True)
  question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
  choice = db.Column(db.String(100), nullable=False)

  question = db.relationship("Question", back_populates="examples")

  def to_dict(self):
    return {
      "id": self.id,
      "question_id": self.question_id,
      "choice": self.choice,
      "question":self.question.question
    }


