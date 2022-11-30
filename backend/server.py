
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
		return {"message":"The User with current Email already exists,Please provide new email"}
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

@app.route("/insertgate",methods = ['get','post'])
def insertgate():
	if "username" in session and session['org'] == 'airport':
		if request.method == "POST":
			d = request.json
			d["lastAssignedFlight"] = ""
			d["lastAssignedTime"] = 0
			d["status"] = 0
			collection = db['gates']
			if collection.find_one({'name':d['name']}) == None:
				collection.insert_one(d)
				return {"message":"Success"}
			return {"message":"The gate is already present in the list"}
		collection = db['gates']
		gates = []
		for i in collection.find():
			del i['_id']
			gates.append(i)
		return {"message":"Success", "data":gates}
	return {"message":"You cannot access this page"}

@app.route("/api/insertbaggage",methods = ['get','post'])
def insertbaggage():
	if "username" in session and session['org'] == 'airport':
		if request.method == "POST":
			d = request.json
			d["lastassignedFlight"] = ""
			d["lastAssignedTime"] = 0
			d["status"] = 0
			d["comments"] = "New gate"
			collection = db['baggages']
			if collection.find_one({'name':d['name']}) == None:
				collection.insert_one(d)
				return {"message":"Success","status":"success" }
			return {"message":"The baggage is already present in the list"}
		collection = db['baggages']
		baggages = []
		for i in collection.find():
			del i['_id']
			baggages.append(i)
		return {"message":"success","status":"success", "data":baggages}
	return {"message":"You cannot access this page"}


@app.route("/api/modifygate",methods = ['get','post'])
def modifygate():
	if "username" in session and session['org'] == 'airport':
		if request.method == "POST":
			d = request.json
			collection = db['gates']
			if collection.find_one({"name":d['name']}) == None:
				return {"message":"No gate exists with the given name"}
			collection.update_one({"name":d["name"]},{"$set":{"status":int(d['status']),"comments":d["comments"]}})
			return {"message":"Modified successfully",'status':"success"}
		collection = db['gates']
		gates = []
		for i in collection.find():
			del i['_id']
			gates.append(i)
		return {"message":"Success", "data":gates}
	return {"message":"You cannot access this page"}

@app.route("/api/modifybaggage",methods = ['get','post'])
def modifybaggage():
	if "username" in session and session['org'] == 'airport':
		if request.method == "POST":
			d = request.json
			collection = db['baggages']
			if collection.find_one({"name":d['name']}) == None:
				return {"message":"No baggage exists with the given name"}
			collection.update_one({"name":d["name"]},{"$set":{"status":int(d['status']),"comments":d["comments"]}})
			return {"message":"Baggage has been modifed","status":"success"}
		collection = db['baggages']
		baggages = []
		for i in collection.find():
			del i['_id']
			baggages.append(i)
			try:
				if i['lastAssignedTime'] !=0:
					i['lastAssignedTime'] = datetime.datetime.fromtimestamp(i['lastAssignedTime'],tz=timezone('US/Pacific'))
			except:
				i['lastAssignedTime'] = "None"
		return {"message":"Success", "data":baggages}
	return {"message":"You cannot access this page"}


@app.route("/api/addflights",methods = ["get","post"])
def addflight():
	collection = db['flights']
	if "username" in session and session['org'] == 'airline':
		if request.method == "POST":
			d = request.json
			time = datetime.datetime.strptime(d['time'], "%d %m %y %H %M")
			time = time.timestamp()+(time - time.astimezone(tz=timezone('US/Pacific')).replace(tzinfo=None)).total_seconds()
			d['time'] = time
			d['baggage'] = ''
			d['gate'] = ''
			airline_employee_collection = db['AirlineEmployee']
			employee_data = airline_employee_collection.find_one({"email":session['username']})
			if employee_data== None:
				return {"message":"Access denied",}
			airlineemp = db['AirlineEmployee'].find_one({"email":session['username']})
			if airlineemp == None:
				return {"message":"You cannot access this page"}
			print(airlineemp)
			flight_code = db['Airlines'].find_one({"code":airlineemp['airline']})
			if flight_code == None:
				return {"message":"You cannot access this page"}
			flight_code = flight_code["code"]
			d['airline'] = employee_data['airline']
			d['name'] = flight_code + str(d['name'])
			if collection.find_one({"name":d['name']}) == None:
				collection.insert_one(d)
				return {"message":"Data has been inserted successfully","status":"success"}
			return {"message":"A flight already exists with the name"}
		airline_company = db['AirlineEmployee'].find_one({"email":session["username"]})['airline']
		all_flights = []
		for i in collection.find({"airline":airline_company}).sort("time",-1):
			del i['_id']
			i['time'] ="-".join(str(datetime.datetime.fromtimestamp(i['time'],tz=timezone('US/Pacific'))).split("-")[:-1])
			all_flights.append(i)
		return {"message":"Success","data" : all_flights,"currenttime":"-".join(str(datetime.datetime.now(tz=timezone('US/Pacific')) - datetime.timedelta(hours = 1)).split("-")[:-1])}
	return {"message":"You cannot access this page"}
@app.route("/api/addflights",methods = ["get","post"])
def addflight():
	collection = db['flights']
	if "username" in session and session['org'] == 'airline':
		if request.method == "POST":
			d = request.json
			time = datetime.datetime.strptime(d['time'], "%d %m %y %H %M")
			time = time.timestamp()+(time - time.astimezone(tz=timezone('US/Pacific')).replace(tzinfo=None)).total_seconds()
			d['time'] = time
			d['baggage'] = ''
			d['gate'] = ''
			airline_employee_collection = db['AirlineEmployee']
			employee_data = airline_employee_collection.find_one({"email":session['username']})
			if employee_data== None:
				return {"message":"Access denied",}
			airlineemp = db['AirlineEmployee'].find_one({"email":session['username']})
			if airlineemp == None:
				return {"message":"You cannot access this page"}
			print(airlineemp)
			flight_code = db['Airlines'].find_one({"code":airlineemp['airline']})
			if flight_code == None:
				return {"message":"You cannot access this page"}
			flight_code = flight_code["code"]
			d['airline'] = employee_data['airline']
			d['name'] = flight_code + str(d['name'])
			if collection.find_one({"name":d['name']}) == None:
				collection.insert_one(d)
				return {"message":"Data has been inserted successfully","status":"success"}
			return {"message":"A flight already exists with the name"}
		airline_company = db['AirlineEmployee'].find_one({"email":session["username"]})['airline']
		all_flights = []
		for i in collection.find({"airline":airline_company}).sort("time",-1):
			del i['_id']
			i['time'] ="-".join(str(datetime.datetime.fromtimestamp(i['time'],tz=timezone('US/Pacific'))).split("-")[:-1])
			all_flights.append(i)
		return {"message":"Success","data" : all_flights,"currenttime":"-".join(str(datetime.datetime.now(tz=timezone('US/Pacific')) - datetime.timedelta(hours = 1)).split("-")[:-1])}
	return {"message":"You cannot access this page"}

@app.route("/api/modifyflight",methods = ['get','post'])
def modifyflight():
	collection = db['flights']
	if "username" in session and session['org'] == 'airline':
		if request.method == "POST":
			d = request.json
			a = collection.find_one({"name":d['name']})
			if a == None:
				return {"message":"No flight exists with the given name"}
			time = datetime.datetime.strptime(d['time'], "%d %m %y %H %M")
			time = time.timestamp()+(time - time.astimezone(tz=timezone('US/Pacific')).replace(tzinfo=None)).total_seconds()
			# print(time,time.timestamp())
			collection.update_one({"name":d["name"]},{"$set":{"time": time,"baggage":"","gate":""}})
			return {"message":"Data has been modifed successfully"}
		airline_company = db['AirlineEmployee'].find_one({"email":session["username"]})['airline']
		all_flights = []
		for i in collection.find({"airline":airline_company}).sort("time",-1):
			del i['_id']
			all_flights.append(i)
		return {"message":"Success","data" : all_flights}
	return {"message":"You cannot access this page"}

@app.route("/api/getflights")
def getflights():
	flights_collection = db['flights']
	flight = [[],[],[]]
	onehr = [0,0,0]
	twohr = [0,0,0]
	threehr = [0,0,0]
	d = {'A':1,'D':2}
	for i in flights_collection.find({"time":{"$lt":datetime.datetime.timestamp(datetime.datetime.now(tz=timezone('US/Pacific')))+3600,'$gt':datetime.datetime.timestamp(datetime.datetime.now(tz=timezone('US/Pacific')))}}).sort('time'):
		del i['_id']
		i['time'] ="-".join(str(datetime.datetime.fromtimestamp(i['time'],tz=timezone('US/Pacific'))).split("-")[:-1])
		flight[d[i['status']]].append(i)
		onehr[0]+=1
		flight[0].append(i)
		onehr[d[i['status']]]+=1
	for i in flights_collection.find({"time":{"$lt":datetime.datetime.timestamp(datetime.datetime.now(tz=timezone('US/Pacific')))+7200,'$gt':datetime.datetime.timestamp(datetime.datetime.now(tz=timezone('US/Pacific')))+3600}}).sort('time'):
		del i['_id']
		i['time'] ="-".join(str(datetime.datetime.fromtimestamp(i['time'],tz=timezone('US/Pacific'))).split("-")[:-1])
		flight[0].append(i)
		flight[d[i['status']]].append(i)
		twohr[d[i['status']]]+=1
		twohr[0]+=1
	for i in range(3):
		twohr[i] += onehr[i]
	for i in flights_collection.find({"time":{"$lt":datetime.datetime.timestamp(datetime.datetime.now(tz=timezone('US/Pacific')))+10800,'$gt':datetime.datetime.timestamp(datetime.datetime.now(tz=timezone('US/Pacific')))+7200}}).sort('time'):
		del i['_id']
		i['time'] ="-".join(str(datetime.datetime.fromtimestamp(i['time'],tz=timezone('US/Pacific'))).split("-")[:-1])
		flight[0].append(i)
		flight[d[i['status']]].append(i)
		threehr[d[i['status']]]+=1
		threehr[0]+=1
	for i in range(3):
		threehr[i]+= twohr[i]
	l1 = [[],[],[]]
	l2 = [onehr,twohr,threehr]
	for i in range(3):
		for j in range(3):
			l1[j].append(l2[i][j])
	print(l1,l2)
	return {'data':flight,'time' : l1}

@app.route("/api/forceclosegate")
def forceclosegate():
	flights_collection = db['flights']
	if "username" in session and session['org'] == 'airport':
		if request.method == "POST":
			d = request.json
			collection = db['gates']
			if collection.find_one({"name":d['name']}) == None:
				return {"message":"No gate exists with the given name"}
			collection.update_one({"name":d["name"]},{"$set":{"status":int(d['status']),"comments":d["comments"]}})
			for i in flights_collection.find({"time":{'$gt':datetime.datetime.timestamp(datetime.datetime.now(tz=timezone('US/Pacific')))-3000},"gate":d['name']}):
				flights_collection.update_one({'name':i['name']},{"$set":{'gate':"","baggage":""}})
				assignflights()
			return {"message":"Modified successfully",'status':"success"}
		collection = db['gates']
		gates = []
		for i in collection.find():
			del i['_id']
			gates.append(i)
		return {"message":"Success", "data":gates}
	return {"message":"You cannot access this page"}

@app.route("/api/forceclosebaggage",methods = ['get','post'])
def forceclosebaggage():
	flights_collection = db['flights']
	if "username" in session and session['org'] == 'airport':
		if request.method == "POST":
			d = request.json
			collection = db['baggages']
			if collection.find_one({"name":d['name']}) == None:
				return {"message":"No baggage exists with the given name"}
			collection.update_one({"name":d["name"]},{"$set":{"status":int(d['status']),"comments":d["comments"]}})
			for i in flights_collection.find({"time":{'$gt':datetime.datetime.timestamp(datetime.datetime.now(tz=timezone('US/Pacific')))-3000},"baggage":d['name']}):
				flights_collection.update_one({'name':i['name']},{"$set":{'baggage':"","gate":""}})
				assignflights()
			return {"message":"Baggage has been modifed","status":"success"}
		collection = db['baggages']
		baggages = []
		for i in collection.find():
			del i['_id']
			baggages.append(i)
			try:
				if i['lastAssignedTime'] !=0:
					i['lastAssignedTime'] = datetime.datetime.fromtimestamp(i['lastAssignedTime'],tz=timezone('US/Pacific'))
			except:
				i['lastAssignedTime'] = "None"
		return {"message":"Success", "data":baggages}
	return {"message":"You cannot access this page"}

@app.route('/api/logout')
def logout():
	print(session)
	session.clear()
	print(session)
	return {"message":"Success"}

# Route for seeing a data
@app.route('/api/data')
def get_time():

	# Returning an api for showing in reactjs
	return {
		'Name':"geek",
		"Age":"22",
		"Date":x,
		"programming":"python"
		}

	
# Running app
if __name__ == '__main__':
	app.run(debug=True)
