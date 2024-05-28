#!venv/bin/python
import secrets
from flask import Flask
from blueprints.archive import archive
from blueprints.bookmark import bookmark_bp
from blueprints.register import register
from blueprints.auth import auth
from blueprints.oauth import oauth

app = Flask(__name__)
app.config["SECRET_KEY"] = secrets.token_hex()

app.register_blueprint(oauth, url_prefix="/auth")
app.register_blueprint(archive, url_prefix="/archive")
app.register_blueprint(bookmark_bp, url_prefix="/bookmark")
app.register_blueprint(register, url_prefix="/register")
app.register_blueprint(auth, url_prefix="/auth")

@app.route('/')
def index():
    return "You really shouldn't be here..."

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000')
