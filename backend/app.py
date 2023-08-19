from flask import Flask, render_template, request, redirect, url_for
import requests
from pathlib import Path
import json

app = Flask(__name__)

def get_db():
    data = Path("db.json").read_text()
    f = json.loads(data)
    return f

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/order")
def order():
    return render_template("order.html")

@app.route("/checkout")
def checkout():
    return render_template("checkout.html")

@app.route("/payment")
def payment():
    return render_template("payment.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/db")
def db():
    return get_db()


@app.route("/form", methods=["GET", "POST"])
def myform():
    if request.method == "POST":
        print(dict(request.form))
        return redirect(url_for("index"))
    else:
        return render_template("form.html")

@app.route("/arduino")
def arduino():
    print("hello")
    res = requests.get("http://10.32.36.40")
    print(res)
    data = res.json()
    print(data)
    return "Hello, World!"

if __name__ == "__main__":
    app.run(debug=True)
