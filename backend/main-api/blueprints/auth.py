from flask import Blueprint, jsonify, request, session
import pymongo
import uuid
from passlib.hash import pbkdf2_sha256

MONGO_CONNECTION_STRING = "mongodb://root:Passw0rd321@mongo:27017/"
DB_NAME = "archiver_database"
client = pymongo.MongoClient(MONGO_CONNECTION_STRING)
db = client[DB_NAME]

auth = Blueprint('auth', __name__)

def is_logged_in():
	return ("user_id" in session)

@auth.route('/')
def default():
	return jsonify({})

@auth.route('/login', methods=['GET','POST'])
def login():
	username = request.json.get("username")
	password = request.json.get("password")
	this_user = db.users.find_one({"username": username})
	# this_user = db.users.find_one("$or": [{"username": username}, {"email": username}])
	if (this_user):
		if (pbkdf2_sha256.verify(password, this_user["password"])):
			session["user_id"] = this_user["user_id"]
			return jsonify({
				"success": True,
				"msg": "Login successful."
			})
	return jsonify({
		"success": False,
		"msg": "Wrong username or password."
	})

@auth.route('/logout', methods=['GET','POST'])
def logout():
	if is_logged_in():
		session.clear()
		return jsonify({
			"success": True,
			"msg": "Logout successful."
		})
	else:
		return unauthenticated

	# session_id = request.args.get("session_id")
	# user = db["users"]
	# query = {"session_id": session_id}
	# session_id_query = user.find_one(query)
	# if (session_id_query == None):
	# 	RESPONSE["success"] = False
	# 	RESPONSE["msg"] = "Session ID is empty."
	# else:
	# 	user.delete_one(query)
	# 	RESPONSE["success"] = True
	# 	RESPONSE["msg"] = "Logout successful."
	# return jsonify(RESPONSE)