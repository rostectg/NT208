#!venv/bin/python
from flask import Flask

from blueprints.archive import archive
from blueprints.register import register

app = Flask(__name__)

app.register_blueprint(archive, url_prefix="/archive")
app.register_blueprint(register, url_prefix="/register")


@app.route('/')
def index():
    return "You really shouldn't be here..."

if __name__ == '__main__':
    #app.run(debug=True)
    app.run(host='0.0.0.0', port='5000')