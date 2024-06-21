from flask import Flask
app = Flask(__name__)


@app.route("/")
def home():
    return "Hello, Flask!"


@app.route("/SayHello")
def SayHello():
    return "Saying Hello!!!"