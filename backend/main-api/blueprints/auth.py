from flask import Blueprint, jsonify, request
import pymongo
import uuid

DB_NAME = "archiver_database"
client = pymongo.MongoClient('localhost', 27017)
db = client[DB_NAME]

auth = Blueprint('auth', __name__)

def start_session(session_id):
	return True

@auth.route('/')
def default():
	return jsonify({})

@auth.route('/login', methods=['GET','POST'])
def login():
	RESPONSE = {}
	username = request.args.get("username")
	password = request.args.get("password")
	user = db["users"]
	query = {"username": username, "password": password}
	user_query = user.find_one(query)
	session_id = str(uuid.uuid4())
	query = {"session_id": session_id}
	if (user_query == None):
		RESPONSE["success"] = False
		RESPONSE["msg"] = "Wrong username or password."
	else:
		RESPONSE["success"] = True
		RESPONSE["msg"] = "Login successful."
		RESPONSE["session_id"] = session_id
		user.insert_one(query)
	return jsonify(RESPONSE)

@auth.route('/logout', methods=['GET','POST'])
def logout():
	RESPONSE = {}
	session_id = request.args.get("session_id")
	user = db["users"]
	query = {"session_id": session_id}
	session_id_query = user.find_one(query)
	if (session_id_query == None):
		RESPONSE["success"] = False
		RESPONSE["msg"] = "Session ID is empty."
	else:
		user.delete_one(query)
		RESPONSE["success"] = True
		RESPONSE["msg"] = "Logout successful."
	return jsonify(RESPONSE)