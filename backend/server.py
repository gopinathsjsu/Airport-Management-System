
from flask import Flask,request,session
import datetime
from pymongo import MongoClient
from pytz import timezone
app=Flask(_name_)

cluster=MongoClient("mongodb+srv://sjcairport:sjcairport@cluster0.0orucyg.mongodb.net/?retryWrites=true&w=majority")

db=cluster['SJCAirport']


x = datetime.datetime.now(tz=timezone('US/Pacific'))

# Initializing flask app
app = Flask(_name_)
app.secret_key = "abc"
@app.route("/airportsignup",methods = ['get','post'])
def airportsignup():
	collection=db['AirportEmployee']
	if request.method == "POST":
		d = request.json
		d['approved'] = 0
		if collection.find_one({"email":d["email"]}) == None:
			collection.insert_one(d)
			collection=db['PendingRequests']
			collection.insert_one({"Airport":1,"name":d['name'],"email":d['email']})
			return {"message":"Your signup request has been sent for approval"}
		return {"message":"The User with current Email already exists"}
	return {}

