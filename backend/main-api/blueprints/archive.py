from flask import Blueprint, jsonify, request
from threading import Thread
import pymongo
import validators
import requests
import time
import uuid

DB_NAME = "archiver_database"
#STORAGE_DIR = "../storage/snapshots"
STORAGE_DIR = "./snapshots"   #docker

MONGO_CONNECTION_STRING = "mongodb://root:Passw0rd321@mongo:27017/"
#MONGO_CONNECTION_STRING = "mongodb://root:Passw0rd321@172.22.0.2:27017/"

SINGLEFILE_SERVER = "http://singlefile"
#SINGLEFILE_SERVER = "http://127.0.0.1:8000"


client = pymongo.MongoClient(MONGO_CONNECTION_STRING)
db = client[DB_NAME]

archive = Blueprint('archive', __name__)



def check_session(session_id):
	return True

def do_archive_thread(url):
	url_list = db["urls"]
	query = {"url": url}
	url_query_result = url_list.find_one(query)

	if (not url_query_result):  # new url
		data = {"url": url, "status": "archiving"}
		url_list.insert_one(data)
	
	req_body = {"url": url}
	print("Archiving: " + url)
	try:
		raw_html = requests.post(SINGLEFILE_SERVER, data=req_body).content
		print("Done.")
	except Exception as e:
		print(repr(e))
	timestamp = time.time()

	if (raw_html == b''):  # Error. URL unreachable.
		data = {"$set": {"status": "unreachable"}}
		url_list.update_one(query, data)
	else:
		filepath = f"{STORAGE_DIR}/{timestamp}.html"
		with open(filepath, "wb") as f:
			f.write(raw_html)
		data = {"$set": {"status": "archived"}}
		url_list.update_one(query, data)

		# Save snapshot information
		snapshot_list = db["snapshots"]
		date_str = time.strftime("%Y-%m-%d %H:%M:%S %Z%z", time.localtime(timestamp))
		data = {
			"snapshot_id": str(timestamp),
			"created_time": date_str,
			"url": url,
			"file_path": filepath
		}
		snapshot_list.insert_one(data)



@archive.route('/')
def default():
	return jsonify({})


#@archive.route('/is_archived/<string:url>', methods=['GET'])
@archive.route('/is_archived', methods=['GET', 'POST'])
def is_archived():
	RESPONSE = {}
	url = request.args.get("url")
	if (not url):
		url = request.json["url"]
	if (not url):
		RESPONSE["success"] = False
		RESPONSE["msg"] = "URL is empty"
	elif (not validators.url(url)):
		RESPONSE["success"] = False
		RESPONSE["msg"] = "URL is malformed"
	else:
		RESPONSE["success"] = True
		collection = db["urls"]
		query = {"url": url}
		query_result = collection.find_one(query)			
		if (query_result):
			RESPONSE["status"] = query_result["status"]
		else:
			RESPONSE["status"] = "not_archived"
	return jsonify(RESPONSE)


@archive.route('/do_archive', methods=['GET', 'POST'])
def do_archive():
	RESPONSE = {}
	url = request.args.get("url")
	if (not url):
		url = request.json["url"]
	if (url == None):
		RESPONSE["success"] = False
		RESPONSE["msg"] = "URL is empty"
	elif (not validators.url(url)):
		RESPONSE["success"] = False
		RESPONSE["msg"] = "URL is malformed"
	else:
		RESPONSE["success"] = True
		RESPONSE["msg"] = "Archiving target site, please wait."
		Thread(target = do_archive_thread, args = (url,)).start()
	return jsonify(RESPONSE)

@archive.route('/list', methods=['GET', 'POST'])
def list_snapshots():
	RESPONSE = {}
	url = request.args.get("url")
	if (not url):
		url = request.json["url"]
	if (url == None):
		RESPONSE["success"] = False
		RESPONSE["msg"] = "URL is empty"
	elif (not validators.url(url)):
		RESPONSE["success"] = False
		RESPONSE["msg"] = "URL is malformed"
	else:
		snapshot_list = db["snapshots"]
		query = {"url": url}
		results = snapshot_list.find(query, {"_id":0, "snapshot_id":1, "created_time":1}).sort({"$natural":-1})
		results = list(results)

		if (results):
			RESPONSE["success"] = True
			RESPONSE["snapshot_list"] = list(results)
		else:
			RESPONSE["success"] = False
			RESPONSE["msg"] = "No snapshot found."
	return jsonify(RESPONSE)


@archive.route('/view_raw', methods=['GET', 'POST'])
def view_snapshot():
	RESPONSE = {}
	sid = request.args.get("snapshot_id")
	if (not sid):
		sid = request.json["snapshot_id"]
	snapshot_list = db["snapshots"]
	query = {"snapshot_id": sid}
	query_result = snapshot_list.find_one(query)

	if (query_result):
		filepath = query_result["file_path"]
		with open(filepath, "rb") as f:
			RESPONSE = f.read()
		return RESPONSE

	else:  # not found
		RESPONSE["success"] = False
		RESPONSE["msg"] = "Invalid snapshot_id"
		return jsonify(RESPONSE)