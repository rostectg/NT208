from flask import Blueprint, jsonify, request
import pymongo
import uuid
from passlib.hash import pbkdf2_sha256

# Create Blueprint 
register = Blueprint('register', __name__)

MONGO_CONNECTION_STRING = "mongodb://root:Passw0rd321@mongo:27017/"
DB_NAME = "archiver_database"

client = pymongo.MongoClient(MONGO_CONNECTION_STRING)
db = client[DB_NAME]

# route check user is valid or not
@register.route('/check', methods= ['POST'])
def check():
    return User().check()

# route do register
@register.route('/do_register', methods= ['POST'])
def do_register():
    return User().do_register()

class User:
  def check(self):
    # Get username from JSON 
    username = request.json.get('username')

    # check username is avalable or not
    if (not db.user.find_one({"username": username})):
      return jsonify({
        "success": True,
        "message": "Username is avalable."
        }), 200
    else:
      return jsonify({
        "success": False,
        "message": "Username is not available."
        }), 200

  def do_register(self):
    # Create user object and get data from JSON
    user = {
    "user_id": str(uuid.uuid4()),
    "email": request.json.get('email', default=""),
    "username": request.json.get('username'),
    "password": request.json.get('password'),
    }

    # check if password is more than = 8 character
    if len(user['password']) < 8:
      return jsonify({
        "success": False,
        "message": "Password is less than 8 chacracter!"
         }), 200
    
    # Encrypt the password
    user['password'] = pbkdf2_sha256.encrypt(user['password'])

    # Insert user to mongodb
    if db.user.insert_one(user):
      return jsonify({
        "success": True,
         "message": "Signup Successful!"
         }), 200
    
    return jsonify({
      "success": False,
      "message": "Signup failed!"
      }), 200
