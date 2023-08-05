from flask import Flask
from pathlib import Path
import json

app = Flask(__name__)

def gets_from_db():
    data = Path("db.json").read_text()
    f = json.loads(data)
    return f

def get_name():
    name = gets_from_db()["name"]
    return name

def get_age():
    age = gets_from_db()["age"]
    return age

def get_email():
    email = gets_from_db()["email"]
    return email

@app.route("/")
def index():
    name = get_name()
    age = get_age()
    email = get_email()
    
    return f"Name: {name}\nAge: {age}\nEmail: {email}"

if __name__ == "__main__":
    app.run(debug=True)
