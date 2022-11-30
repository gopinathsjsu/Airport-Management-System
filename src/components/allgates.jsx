import React from "react";
import BasicCard from "./card";
import BasicFlightCard from "./flightcard";
import BasicBaggageCard from "./baggagecard";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import BasicGateCard from "./gateCard";
export default function GatesList(props){
    // window.location.reload(false);
    return (
        <div>
            <Button component = {Link} to = "/addgate">Add Gate</Button>
            <br></br>
             {(props.data!=null && props.data.length !=0)?
             <BasicGateCard data = {props.data.data}></BasicGateCard>
          
        :null}
        </div>
       
    );
};