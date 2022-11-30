import React from "react";
import BasicCard from "./card";
import BasicFlightCard from "./flightcard";
export default function FlightsList(props){
    // window.location.reload(false);
    return (
        <div>
             {(props.data!=null && props.data.length !=0)?
             
           <BasicFlightCard data = {props.data} time = {props.time}></BasicFlightCard> 
           
        :null}
        </div>
       
    );
};
