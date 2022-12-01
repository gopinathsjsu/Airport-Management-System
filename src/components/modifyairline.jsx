import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ModifyFlightForm from "./modifyflightform";
export default function ModifyAirline(props){
    useEffect(()=>{
        fetch("/")
    })
    // window.location.reload(false);
    const location = useLocation(); // React Hook
    var a = location.pathname.split("/")
    return (
        <div>
             {(props.data!=null)?
            
           <ModifyFlightForm data = {props.data} flight = {a[a.length-1]}></ModifyFlightForm>
           
        :null}
        </div>
       
    );
};