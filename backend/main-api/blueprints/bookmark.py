from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from datetime import datetime

# Create blueprint 
bookmark_bp = Blueprint('bookmark', __name__)

# Connect MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['your_database']
bookmarks_collection = db['bookmarks']

# Check Session_ ID
def check_session(session_id):
    sessions_collection = db['sessions']
    return sessions_collection.find_one({"session_id": session_id}) is not None

@bookmark_bp.route('/recent', methods=['POST'])
def get_recent():
    data = request.get_json()
    session_id = data.get('session_id')
    if not check_session(session_id):
        return jsonify({"success": False, "message": "Invalid session_id"}), 401
    
    user_bookmarks = bookmarks_collection.find({"session_id": session_id}).sort("timestamp", -1).limit(5)
    recent_urls = [bookmark['url'] for bookmark in user_bookmarks]
    
    return jsonify({"success": True, "recent": recent_urls})

@bookmark_bp.route('/add', methods=['POST'])
def add_bookmark():
    data = request.get_json()
    session_id = data.get('session_id')
    url = data.get('url')
    
    if not check_session(session_id):
        return jsonify({"success": False, "message": "Invalid session_id"}), 401
    
    bookmarks_collection.update_one(
        {"session_id": session_id, "url": url},
        {"$set": {"url": url, "tags": [], "timestamp": datetime.utcnow()}},
        upsert=True
    )
    
    return jsonify({"success": True})

@bookmark_bp.route('/remove', methods=['POST'])
def remove_bookmark():
    data = request.get_json()
    session_id = data.get('session_id')
    url = data.get('url')
    
    if not check_session(session_id):
        return jsonify({"success": False, "message": "Invalid session_id"}), 401
    
    bookmarks_collection.delete_one({"session_id": session_id, "url": url})
    
    return jsonify({"success": True})

@bookmark_bp.route('/add_tag', methods=['POST'])
def add_tag():
    data = request.get_json()
    session_id = data.get('session_id')
    url = data.get('url')
    tags = data.get('tags')
    
    if not check_session(session_id):
        return jsonify({"success": False, "message": "Invalid session_id"}), 401
    
    result = bookmarks_collection.update_one(
        {"session_id": session_id, "url": url},
        {"$addToSet": {"tags": {"$each": tags}}}
    )
    
    if result.modified_count > 0:
        return jsonify({"success": True})
    else:
        return jsonify({"success": False, "message": "URL not found or tags not added"}), 400

@bookmark_bp.route('/remove_tag', methods=['POST'])
def remove_tag():
    data = request.get_json()
    session_id = data.get('session_id')
    url = data.get('url')
    tags = data.get('tags')
    
    if not check_session(session_id):
        return jsonify({"success": False, "message": "Invalid session_id"}), 401
    
    result = bookmarks_collection.update_one(
        {"session_id": session_id, "url": url},
        {"$pullAll": {"tags": tags}}
    )
    
    if result.modified_count > 0:
        return jsonify({"success": True})
    else:
        return jsonify({"success": False, "message": "Tags not present"}), 400

@bookmark_bp.route('/list', methods=['POST'])
def list_bookmarks():
    data = request.get_json()
    session_id = data.get('session_id')
    
    if not check_session(session_id):
        return jsonify({"success": False, "message": "Invalid session_id"}), 401
    
    user_bookmarks = bookmarks_collection.find({"session_id": session_id})
    bookmarks = [{"url": bookmark['url'], "tags": bookmark.get('tags', [])} for bookmark in user_bookmarks]
    
    return jsonify({"success": True, "bookmarks": bookmarks})

@bookmark_bp.route('/list_by_tag', methods=['POST'])
def list_by_tag():
    data = request.get_json()
    session_id = data.get('session_id')
    tag = data.get('tag')
    
    if not check_session(session_id):
        return jsonify({"success": False, "message": "Invalid session_id"}), 401
    
    user_bookmarks = bookmarks_collection.find({"session_id": session_id, "tags": tag})
    bookmarks = [{"url": bookmark['url'], "tags": bookmark.get('tags', [])} for bookmark in user_bookmarks]
    
    return jsonify({"success": True, "bookmarks": bookmarks})
