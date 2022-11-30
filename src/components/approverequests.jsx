import React from "react";
import ApproveCard from "./approvecard";
export default function ApproveRequests(props)
{
    console.log(props.data);
    return (
        <div>
             {(props.data)?(props.data['Airport'].length == 0 && props.data['Airline'].length==0)?<h1>No Requests to approve</h1>:
             <div> 
             <ApproveCard data = {props.data['Airline']}></ApproveCard>
             <ApproveCard data = {props.data['Airport']}></ApproveCard>
             </div>:
             <h1>No requests to approve</h1>
             }
        </div>
       
    );
}