from flask import Flask, jsonify, request
import pymongo
import uuid
from passlib.hash import pbkdf2_sha256

# Database
client = pymongo.MongoClient('localhost', 27017)
db = client.register

app = Flask(__name__)

# route check user is valid or not
@app.route('/register/check/', methods= ['POST'])
def check():
    return User().check()

# route do register
@app.route('/register/do_register/', methods= ['POST'])
def do_register():
    return User().do_register()

class User:
  def check(self):

    # Get username from JSON 
    username = request.args.get('username')

    # check username is more than = 6 character
    if len(username) < 6:
      return jsonify({
        "success": True,
        "message": "Username is less than 6."
        }), 400

    # check username is avalable or not
    if db.user.find_one({"username": username}):
      return jsonify({
        "success": True,
        "message": "Username is avalable."
        }), 400


  def do_register(self):

    # Create user object and get data from JSON
    user = {
    "_id": uuid.uuid4().hex,
    "username": request.args.get('username'),
    "password": request.args.get('password'),
    }

    # check if password is more than = 8 character
    if len(user['password']) < 8:
      return jsonify({
        "success": False,
        "message": "Password is less than 8 chacracter!"
         }), 400
    
    # Encrypt the password
    user['password'] = pbkdf2_sha256.encrypt(user['password'])

    # Insert user to mongodb
    if db.user.insert_one(user):
      return jsonify({
        "success": True,
         "message": "Signup Successful!"
         }), 400
    
    return jsonify({
      "success": False,
      "message": "Signup failed!"
      }), 400
