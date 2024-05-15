from flask import Blueprint, jsonify, request
import uuid

auth = Blueprint('auth', __name__)

def check_session(session_id):
	return True

@auth.route('/')
def default():
	return jsonify({})

@auth.route('/login', methods=['GET','POST'])
def login():
	RESPONSE = {}
	# username = request.form.get("username")
	username = request.args.get("username")
	# password = request.form.get("password")
	password = request.args.get("password")
	if (username == None or password == None):
		RESPONSE["success"] = False
		RESPONSE["msg"] = "Wrong username or password"
	else:
		RESPONSE["success"] = True
		RESPONSE["msg"] = "Login successful"
		RESPONSE["session_id"] = str(uuid.uuid4())
	return jsonify(RESPONSE)

@auth.route('/logout', methods=['GET','POST'])
def logout():
	RESPONSE = {}
	# session_id = request.form.get("session_id")
	session_id = request.args.get("session_id")
	if (session_id == None):
		RESPONSE["success"] = False
		RESPONSE["msg"] = "Session ID is empty"
	else:
		RESPONSE["success"] = True
		RESPONSE["msg"] = "Logout successful"
	return jsonify(RESPONSE)