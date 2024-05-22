from flask import Flask
from blueprints.archive import archive
from blueprints.bookmark import bookmark_bp
from blueprints.register import register

app = Flask(__name__)

app.register_blueprint(archive, url_prefix="/archive")
app.register_blueprint(bookmark_bp, url_prefix="/bookmark")
app.register_blueprint(register, url_prefix="/register")

@app.route('/')
def index():
    return "You really shouldn't be here..."

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000')
