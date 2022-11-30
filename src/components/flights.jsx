import * as React from 'react';
import FlightTable from './flighttable';
import BasicCard from './card';
import { Button } from '@mui/material';
import BaggageTable from './baggagetable';
export default function Flightpage(props) {
//   const [flights,setflights] = React.useState(null)
//   useEffect(() => {
//     fetch("/getflights")
//     .then(response => response.json())
// 		.then(data => {
// 			console.log(data);
//             setflights(data);
// 		});
//   });
// let value = 0;
const [value,setValue] = React.useState(0);
  return (
    <div>
    <Button onClick={() => setValue(0)}><BasicCard name = "All Flights"></BasicCard></Button>
    <Button onClick={() => setValue(1)} ><BasicCard name = "Arrival"></BasicCard></Button>
    <Button onClick={() => setValue(2)} ><BasicCard name = "Departure"></BasicCard></Button>
    {(props.data!=null)?<FlightTable data = {props.data['data'][value]} time = {props.data['time'][value]} value = {value} mapping = {props.mapping}>{console.log(props.data)}</FlightTable>:null}
    {(props.data!= null)?<BaggageTable data = {props.data['data'][1]} time = {props.data['time'][1][0]}></BaggageTable>:null}
    </div>
    
  );
}
