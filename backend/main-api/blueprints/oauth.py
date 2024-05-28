from flask import jsonify, redirect, url_for, session, Blueprint
from authlib.integrations.flask_client import OAuth
import pymongo
from .auth import is_logged_in
import uuid

#from datetime import timedelta
MONGO_CONNECTION_STRING = "mongodb://root:Passw0rd321@mongo:27017/"
DB_NAME = "archiver_database"
client = pymongo.MongoClient(MONGO_CONNECTION_STRING)
db = client[DB_NAME]
# App config
oauth_gg = Blueprint('oauth', __name__)
# Session config
oauth_gg.config['SESSION_COOKIE_NAME'] = 'google-login-session'
#oauth_gg.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=5)
oauth_gg.config["GOOGLE_CLIENT_ID"] = "373240734174-h2flbojop81jumt5mrqpt4hvehifup9n.apps.googleusercontent.com"
oauth_gg.config["GOOGLE_CLIENT_SECRET"] = "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"
# oAuth Setup
oauth = OAuth(oauth_gg)
google = oauth.register(
    name='google',
    client_id = oauth_gg.config["GOOGLE_CLIENT_ID"],
    client_secret = oauth_gg.config["GOOGLE_CLIENT_SECRET"],
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    api_base_url='https://www.googleapis.com/oauth2/v1/',
    client_kwargs={'scope': 'email profile'},
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration'
)

class User_gg:
	def is_available(self, userid):
		entry = db.users_gg.find_one({"user_id":userid})
		return not entry
	
	def do_register(self):
		user_gg = {
            "user_id": str(uuid.uuid4())
        }	
		db.users_gg.insert_one(user_gg)
		google = oauth.create_client('google')  # create the google oauth client
		redirect_uri = url_for('authorize', _external=True)
		return google.authorize_redirect(redirect_uri)
        
@oauth_gg.route('/')
def default():
	return jsonify({})

@oauth_gg.route('/login')
def login():
	if User_gg().is_available():
		return User_gg().do_register()
	else:
		google = oauth.create_client('google')  # create the google oauth client
		redirect_uri = url_for('authorize', _external=True)
		return google.authorize_redirect(redirect_uri)

@oauth_gg.route('/authorize')
def authorize():
    google = oauth.create_client('google')  # create the google oauth client
    token = google.authorize_access_token()  # Access token from google (needed to get user info)
    resp = google.get('userinfo')  # userinfo contains stuff u specificed in the scrope
    user_info = resp.json()
    user = oauth.google.userinfo()  # uses openid endpoint to fetch user info
    # Here you use the profile/user data that you got and query your database find/register the user
    # and set ur own data in the session not the profile from google
    session['user_id'] = user_info
    session.permanent = True  # make the session permanant so it keeps existing after broweser gets closed
    return redirect('/')

@oauth_gg.route('/logout', methods=['GET','POST'])
def logout():
	if is_logged_in():
		session.clear()
		return jsonify({
			"success": True,
			"msg": "Logout successful."
		})
	else:
		return jsonify({"success": False, "msg": "Not logged in."})
