from flask import jsonify, url_for, session, Blueprint
from authlib.integrations.flask_client import OAuth
import pymongo
from .auth import is_logged_in
#from datetime import timedelta

MONGO_CONNECTION_STRING = "mongodb://root:Passw0rd321@mongo:27017/"
DB_NAME = "archiver_database"
client = pymongo.MongoClient(MONGO_CONNECTION_STRING)
db = client[DB_NAME]
# App config
oauth_gg = Blueprint('oauth', __name__)
oauth_gg.config = {}
@oauth_gg.record
def record_params(setup_state):
	app = setup_state.app
	oauth_gg.config = dict([(key,value) for (key,value) in app.config.items()])

oauth = OAuth(oauth_gg)
# Session config
oauth_gg.config['SESSION_COOKIE_NAME'] = 'google-login-session'
#oauth_gg.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=5)
oauth_gg.config["GOOGLE_CLIENT_ID"] = "373240734174-h2flbojop81jumt5mrqpt4hvehifup9n.apps.googleusercontent.com"
oauth_gg.config["GOOGLE_CLIENT_SECRET"] = "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"
# oAuth Setup
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
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
)

@oauth_gg.route('/')
def default():
	return jsonify({})

@oauth_gg.route('/login_gg')
def login():
    google = oauth.create_client('google') # create the google oauth client
    redirect_uri = url_for('oauth.authorize', _external=True)
    return google.authorize_redirect(redirect_uri)
		
@oauth_gg.route('/authorize')
def authorize():
    google = oauth.create_client('google')  # create the google oauth client
    token = google.authorize_access_token()  # Access token from google (needed to get user info)
    resp = google.get('userinfo')  # userinfo contains stuff u specificed in the scrope
    user_info = resp.json()
    user = oauth.google.userinfo()  # uses openid endpoint to fetch user info
    if resp.status_code == 200:
        email = user_info['email']
        if db.users_gg.find_one({'email': email}):
            session['user_id'] = user_info
            session.permanent = True  # make the session permanant so it keeps existing after broweser gets closed
            return jsonify({
                    "success": True,
                    "msg": "Login successful."
            })
        else:
            db.users_gg.insert_one({'email': email})
            session['user_id'] = user_info			
            session.permanent = True  # make the session permanant so it keeps existing after broweser gets closed
            return jsonify({
                    "success": True,
                    "msg": "Register and login successful."
            })
        
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
