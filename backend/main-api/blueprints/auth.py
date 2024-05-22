from flask import Blueprint, jsonify, request
import pymongo
import uuid
from passlib.hash import pbkdf2_sha256

MONGO_CONNECTION_STRING = "mongodb://root:Passw0rd321@mongo:27017/"
DB_NAME = "archiver_database"
client = pymongo.MongoClient(MONGO_CONNECTION_STRING)
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
	username = request.json.get("username")
	password = request.json.get("password")
	user_collection = db["users"]
	query_result = user_collection.find_one({"username": username})
	if (query_result):
		if (pbkdf2_sha256.verify(password, query_result["password"])):
			session_id = str(uuid.uuid4())
			query = {"session_id": session_id}

			return jsonify({
				"success": True,
				"msg": "Login successful."
			})
				RESPONSE["success"] = True
				RESPONSE["msg"] = "Login successful."
				RESPONSE["session_id"] = session_id
				user.insert_one(query)

	return jsonify({
		"success": False,
		"msg": "Wrong username or password."
	})

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