from flask import Blueprint, request, jsonify, session
import pymongo
from datetime import datetime
from .auth import is_logged_in

# Create blueprint 
bookmark_bp = Blueprint('bookmark', __name__)

# client = MongoClient('mongodb://localhost:27017/')
MONGO_CONNECTION_STRING = "mongodb://root:Passw0rd321@mongo:27017/"
DB_NAME = "archiver_database"
client = pymongo.MongoClient(MONGO_CONNECTION_STRING)
db = client[DB_NAME]

bookmarks_collection = db['bookmarks']
recents_collection = db['recents']

def add_recent(url):
    if is_logged_in():
        exist = recents_collection.find_one({"user_id": uid, "url": url})
        if (not exist):
            uid = session["user_id"]
            recents = list(recents_collection.find({"user_id": uid}).sort([("$natural", 1)]))
            if (len(recents) == 5): # max recents
                ts = recents[0]["timestamp"]
                recents_collection.delete_one({"timestamp": ts}) # delete oldest entry
            recent_entry = {"user_id": uid, "url": url, "timestamp": str(datetime.utcnow())}
            recents_collection.insert_one(recent_entry)

@bookmark_bp.route('/recent', methods=['POST'])
def get_recent():
    if is_logged_in():
        uid = session['user_id']
        recent_urls = list(recents_collection.find({"user_id": uid}, {"_id": False}))
        return jsonify({"success": True, "recent_urls": recent_urls})
    else:
        return jsonify({"success": False, "msg": "Not logged in."})
    # user_bookmarks = bookmarks_collection.find({"session_id": session_id}).sort("timestamp", -1).limit(5)
    # recent_urls = [bookmark['url'] for bookmark in user_bookmarks]
    # return jsonify({"success": True, "recent": recent_urls})

@bookmark_bp.route('/add', methods=['POST'])
def add_bookmark():
    if is_logged_in():
        data = request.get_json()
        uid = session["user_id"]
        url = data.get["url"]
        if not url:
            return jsonify({"success": False, "message": "URL is empty"}), 401
        # bookmarks_collection.update_one(
        #     {"session_id": session_id, "url": url},
        #     {"$set": {"url": url, "tags": [], "timestamp": datetime.utcnow()}},
        #     upsert=True
        # )
        bookmarks_collection.insert_one({
            "user_id": uid,
            "url": url,
            "tags": [],
            "timestamp": str(datetime.utcnow())
        })
        return jsonify({"success": True})
    else:
        return jsonify({"success": False, "msg": "Not logged in."})

@bookmark_bp.route('/remove', methods=['POST'])
def remove_bookmark():
    if is_logged_in():
        data = request.get_json()
        uid = session["user_id"]
        url = data.get["url"]
    
        bookmarks_collection.delete_one({"user_id": uid, "url": url})
        return jsonify({"success": True})
    else:
        return jsonify({"success": False, "msg": "Not logged in."})

@bookmark_bp.route('/add_tag', methods=['POST'])
def add_tag():
    if is_logged_in():
        data = request.get_json()
        uid = session["user_id"]
        url = data.get('url')
        tags = data.get('tags')
        
        result = bookmarks_collection.update_one(
            {"user_id": uid, "url": url},
            {"$addToSet": {"tags": {"$each": tags}}}
        )
        
        if result.modified_count > 0:
            return jsonify({"success": True})
        else:
            return jsonify({"success": False, "message": "URL not found or tags not added"}), 400
    else:
        return jsonify({"success": False, "msg": "Not logged in."})

@bookmark_bp.route('/remove_tag', methods=['POST'])
def remove_tag():
    if is_logged_in():
        data = request.get_json()
        uid = session["user_id"]
        url = data.get('url')
        tags = data.get('tags')
        
        result = bookmarks_collection.update_one(
            {"user_id": uid, "url": url},
            {"$pullAll": {"tags": tags}}
        )
        
        if result.modified_count > 0:
            return jsonify({"success": True})
        else:
            return jsonify({"success": False, "message": "Tags not present"}), 400
    else:
        return jsonify({"success": False, "msg": "Not logged in."})

@bookmark_bp.route('/list', methods=['POST'])
def list_bookmarks():
    if is_logged_in():
        data = request.get_json()
        uid = session["user_id"]
        
        user_bookmarks = bookmarks_collection.find({"user_id": uid})
        bookmarks = [{"url": bookmark['url'], "tags": bookmark.get('tags', [])} for bookmark in user_bookmarks]
        
        return jsonify({"success": True, "bookmarks": bookmarks})
    else:
        return jsonify({"success": False, "msg": "Not logged in."})

@bookmark_bp.route('/list_by_tag', methods=['POST'])
def list_by_tag():
    if is_logged_in():
        data = request.get_json()
        uid = session["user_id"]
        tag = data.get('tag')
        
        user_bookmarks = bookmarks_collection.find({"user_id": uid, "tags": tag})
        bookmarks = [{"url": bookmark['url'], "tags": bookmark.get('tags', [])} for bookmark in user_bookmarks]
        
        return jsonify({"success": True, "bookmarks": bookmarks})
    else:
        return jsonify({"success": False, "msg": "Not logged in."})
