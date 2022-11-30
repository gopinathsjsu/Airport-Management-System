// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./form"
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from "./components/signin";
import SignUpAirport from "./components/airport_signup";
import SignUpAirline from "./components/airline_signup";
import ResponsiveAppBar from './components/navbar';
import Home from "./components/home";
import FlightTable from "./components/flights";
import FlightsList from "./components/allflightslist";
import ModifyAirline from "./components/modifyairline";
import Addflight from "./components/addflight";
import ApproveRequests from "./components/approverequests";
import ModifyBaggage from "./components/modifybaggage";
import BaggagesList from "./components/allBaggages";
import AddBaggage from "./components/addbaggage";
import GatesList from "./components/allgates";
import AddGate from "./components/addgate";
import ModifyGate from "./components/modifygate";
import InsertAirline from "./components/insertairline";
function App() {
	const [flights,setflights] = React.useState(null);
	const [baggage,setBaggage] = React.useState(null);
	const [gate,setGate] = React.useState(null);	
	const [Mapping,setMapping] = React.useState({});
	// usestate for setting a javascript
	// object for storing and using data
	const [data, setdata] = useState({
		name: "",
		age: 0,
		date: "",
		programming: "",
	});

	// Using useEffect for single rendering
	const [pendingrequests,setpendingrequests] = React.useState();
	const [airlines,setAirlines] =  React.useState([]);
	const [codes,setCodes] = React.useState([]);
	const [flightslists,setflightslists] = React.useState([]);
	const [currenttime,setcurrenttime] = React.useState([]);
	useEffect(() => {
		function componentDidMount() {
			
			setInterval(loadData, 300000);
		  }
		
		  function loadData() {
			 try {
				fetch("/api/assignflights")
				.then(response => response.json())
			} catch (e) {
				console.log(e);
			}
		  }
		  componentDidMount();
		 fetch("/api/getairlines")
		.then(response => response.json())
		.then(data => {
			setAirlines(data['data']);
			setCodes( data['codes']);
			var mapping = {}
			for(let i = 0;i<data['data'].length;i++){
				mapping[data['codes'][i]] = data['data'][i];
			}
			setMapping(mapping);
		});
		fetch("/api/getflights")
		.then(response => response.json())
			.then(data => {
				setflights(data);
			});
		fetch("/api/modifybaggage")
		.then(response => response.json())
			.then(data => {
				setBaggage(data);
			});
			fetch("/api/modifygate")
		.then(response => response.json())
			.then(data => {
				setGate(data);
			});
		// Using fetch to fetch the api from
		// flask server it will be redirected to proxy
		fetch("/api/data").then((res) =>
			res.json().then((data) => {
				// Setting a data from api
				setdata({
					name: data.Name,
					age: data.Age,
					date: data.Date,
					programming: data.programming,
				});
			})
		);
		fetch("/api/approverequests")
		.then(response => response.json())
			.then(data => {
				setpendingrequests(data.data);
			});

		fetch("/api/addflights")
		.then(response => response.json())
			.then(data => {
				setflightslists(data.data);
				setcurrenttime(data.currenttime)
			});
	}, []);

	return (
		<React.StrictMode>
		{/* <App /> */}
		{/* <Navbar></Navbar> */}
		
		<ResponsiveAppBar ></ResponsiveAppBar>
		  <Routes>
		  
			<Route path="/"></Route>
			
			  <Route index element = {<Home></Home>}></Route>
			 <Route path="login/airport" element = {<SignIn name = {"Airport"}/>}></Route>
			 <Route path="login/airline" element = {<SignIn name = {"Airline"}/>}></Route>
			 <Route path="signup/airport" element = {<SignUpAirport name = {"Airport"}/>}></Route>
			 <Route path="signup/airline" element = {<SignUpAirline airlines = {airlines} codes = {codes} name = {"Airline"}/>}></Route>
			 <Route path="flights" element = {<FlightTable data = {flights} mapping  = {Mapping}></FlightTable>}></Route>
			 <Route path = "modifyflight" element = {<FlightsList data = {flightslists} time = {currenttime}></FlightsList>}></Route>
			 <Route path="modifyflight/:id" element = {<ModifyAirline data = {flightslists}></ModifyAirline>}></Route>
			 <Route path = "addflight" element = {<Addflight></Addflight>}></Route>
			 <Route path="approverequests" element = {<ApproveRequests data = {pendingrequests}></ApproveRequests>}></Route>
			 <Route path="modifybaggage/:id" element = {<ModifyBaggage data = {baggage} force = {null}></ModifyBaggage>}></Route>
			 <Route path = "baggage" element = {<BaggagesList data = {baggage}></BaggagesList>}></Route>
			 <Route path = "addbaggage" element = {<AddBaggage></AddBaggage>}></Route>
			 <Route path = "gate" element = {<GatesList data = {gate}></GatesList>}></Route>
			 <Route path = "addgate" element = {<AddGate></AddGate>}></Route>
			 <Route path = "modifygate/:id" element={<ModifyGate data = {gate} force = {null}></ModifyGate>}></Route>
			 <Route path = "modifygateforce/:id" element={<ModifyGate data = {gate} force = {true}></ModifyGate>}></Route>
			 <Route path="modifybaggageforce/:id" element = {<ModifyBaggage data = {baggage} force = {true}></ModifyBaggage>}></Route>
			 <Route path="/insertairline" element = {<InsertAirline></InsertAirline>}></Route>
		  </Routes>
	  </React.StrictMode>
		// <div className="body">
		// 	{/* <Calender></Calender> */}
		// 	<Datetime></Datetime>
		// </div>
// 		<div className="App">
// 			<header className="App-header">
// 				<h1>React and flask</h1>
// 				{/* Calling a data from setdata for showing */}
// 				<p>{data.name}</p>
// 				<p>{data.age}</p>
// 				<p>{data.date}</p>
// 				<p>{data.programming}</p>
// <Calender className = "App"></Calender>
// 			</header>
//       <Form></Form>
	  
// 		</div>
	);
}

export default App;
