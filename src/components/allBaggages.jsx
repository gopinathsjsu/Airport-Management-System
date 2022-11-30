import React from "react";
import BasicCard from "./card";
import BasicFlightCard from "./flightcard";
import BasicBaggageCard from "./baggagecard";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
export default function BaggagesList(props){
    // window.location.reload(false);
    return (
        <div>
            <Button component = {Link} to = "/addbaggage">Add Baggage</Button>
            <br></br>
             {(props.data!=null && props.data.length !=0)?
             <BasicBaggageCard data = {props.data.data}></BasicBaggageCard>
          
        :null}
        </div>
       
    );
};
