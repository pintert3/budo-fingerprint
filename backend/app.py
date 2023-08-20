from flask import Flask, render_template, request, redirect, url_for
import requests
from pathlib import Path
import json

ARDUINO_URL = "http://192.168.16.156"

app = Flask(__name__)

def get_db():
    data = Path("db.json").read_text()
    f = json.loads(data)
    return f

def write_db(new_data):
    data = json.dumps(new_data)
    Path("db.json").write_text(data)
    return True

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

@app.route("/verification/<int:total>/<user_id>")
def verification(total, user_id):
    data = get_db()
    data["current_user_id"] = user_id
    return render_template("verification.html", order_total=total)

@app.route("/form", methods=["GET", "POST"])
def myform():
    if request.method == "POST":
        print(dict(request.form))
        return redirect(url_for("index"))
    else:
        return render_template("form.html")

@app.route("/arduino/<int:order_total>")
def arduino(order_total):
    data = get_db()
    current_student = data["current_student_id"]
    print("hello")
    print(data)
    # ask arduino for id
    res = requests.get(ARDUINO_URL)
    print(res)
    finger_id = res.json()["id"]
    result = False
    error = ""
    if (finger_id in data["users"]) :
        #check balance
        balance = data["users"][finger_id]["balance"]
        print(balance)
        if (balance >= order_total):
            new_balance = balance - order_total
            result = True
        else:
            error = "Balance too low"
    else:
        error = "Invalid user ID"
    return {"valid" : result, "error": error}

if __name__ == "__main__":
    app.run(debug=True)
