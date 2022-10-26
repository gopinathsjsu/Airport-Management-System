
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

@app.route("/airlinesignup",methods = ['get','post'])
def airlinesignup():
	collection=db['AirlineEmployee']
	if request.method == "POST":
		d = request.json
		d['approved'] = 0
		if collection.find_one({"email":d["email"]}) == None:
			collection.insert_one(d)
			collection=db['PendingRequests']
			collection.insert_one({"Airline":1,"name":d['name'],"email":d['email']})
			return {"message":"Your signup request has been sent for approval"}
		return {"message":"The User with current Email already exists"}
	return {}
@app.route("/airlinelogin",methods = ['get','post'])
def airlinelogin():
	collection = db['AirlineEmployee']
	if request.method == "POST":
		d = request.json
		entry = collection.find_one({"email":d["email"]})
		if entry == None:
			return {"message":"User doesnot exist"}
		if entry['password']!=d['password']:
			return {"message":"Enter correct password"}
		if entry['approved'] != 1:
			return {"message":"Your request has not been approved"}
		session['username'] = d['email']
		session['name'] = entry['name']
		session['org'] = 'airline'
		return {"message":"Success"}
	return {}

@app.route("/airportlogin",methods = ['get','post'])
def airportlogin():
	collection = db['AirportEmployee']
	if request.method == "POST":
		d = request.json
		entry = collection.find_one({"email":d["email"]})
		if entry == None:
			return {"message":"User doesnot exist"}
		if entry['password']!=d['password']:
			return {"message":"Enter correct password"}
		if entry['approved'] != 1:
			return {"message":"Your request has not been approved"}
		session['username'] = d['email']
		session['name'] = entry['name']
		session['org'] = 'airport'
		return {"message":"Success"}
	return {}

@app.route("/approverequests",methods = ['get','post'])
def approveRequests():
	if "username" in session and session['org'] == 'airport':
		collection = db['PendingRequests']
		if request.method == "POST":
			d = request.json
			email = d['email']
			pending_user = collection.find_one({"email":email})
			if pending_user == None:
				return {"message":"No such user exists"}
			if "Airport" in pending_user:
				airportemployee_collection = db['AirportEmployee']
				user = airportemployee_collection.find_one({"email":email})
				if user == None:
					return {"message":"No such user exists"}
				airportemployee_collection.update_one({"email":email},{"$set":{"approved":1}})
			if "Airline" in pending_user:
				airportemployee_collection = db['AirlineEmployee']
				user = airportemployee_collection.find_one({"email":email})
				if user == None:
					return {"message":"No such user exists"}
				airportemployee_collection.update_one({"email":email},{"$set":{"approved":1}})
			collection.delete_one({"email":email})
			return {"message":"User Has been Approved successfully"}
		airport_pending = []
		airline_pending = []
		# print(list(collection.find()))
		for i in list(collection.find()):
			del i['_id']
			if 'Airport' in i:	
				airport_pending.append(i)
			if 'Airline' in i:
				airline_pending.append(i)
		return {"message":"Data fetched successfully","data":{"Airport":airport_pending,"Airline":airline_pending}}
	return {"message":"You cannot access this page"}

@app.route("/getairlines")
def getairlines():
	collection = db['Airlines']
	airlines = []
	airlinecodes = []
	for i in collection.find():
		airlines.append(i['name'])
		airlinecodes.append(i['code'])
	return {"message":"Success","data":airlines,"codes" : airlinecodes}


@app.route("/insertairline",methods = ['get','post'])
def insert_airline():
	if "username" in session and session['org'] == 'airport':
		a = getairlines()
		if request.method == "POST":
			collection = db['Airlines']
			data = request.json
			for i in a["codes"]:
				if i == data['code']:
					return {"message":"The Airline with given code is already present in the list"}
			if collection.find_one({'name':data['name']})==None:
				collection.insert_one({"name":data['name'],"country":data['country'],"code":data['code']})
				return {"message":"Airline has been inserted succesfully"}
			return {"message":"The Airline is already present in the list"}
		return a
	return {"message":"You cannot access this page"}

