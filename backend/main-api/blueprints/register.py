from flask import Flask, jsonify, request
import pymongo
import uuid
from passlib.hash import pbkdf2_sha256

# Database
client = pymongo.MongoClient('localhost', 27017)
db = client.register

app = Flask(__name__)

@app.route('/register/', methods= ['POST'])
def signup():
    return User().signup()

class User:
  def signup(self):

    # Create user object
    user = {
        "_id": uuid.uuid4().hex,
        "username": request.form.get('username'),
        "email": request.form.get('email'),
        "password": request.form.get('password'),
    }
    rePassword = request.form.get('rePassword')


    # check username is more than = 8 character
    if len(user['username']) < 8:
      return jsonify({"error": "Username is less than 8 chacracter!"}), 400

    # Check for existing email address
    if db.user.find_one({"email": user['email']}):
       return jsonify({"error": "Email address already in use!"}), 400

    # check if password is more than = 8 character
    if len(user['password']) < 8:
      return jsonify({"error": "Password is less than 8 chacracter!"}), 400

    # check password is matched or not
    if user['password'] != rePassword:
       return jsonify({"error": "Password is not matched!"}), 400

    # Encrypt the password
    user['password'] = pbkdf2_sha256.encrypt(user['password'])

    # Insert user to mongodb
    if db.user.insert_one(user):
       return jsonify(user), 200
    
    return jsonify({"error": "Signup failed!"}), 400
  
  
if __name__ == "__main__":
    app.run()