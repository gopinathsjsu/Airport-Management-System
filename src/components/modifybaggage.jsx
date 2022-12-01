import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ModifyBaggageForm from "./modifybaggageform";
export default function ModifyBaggage(props){
    // window.location.reload(false);
    const location = useLocation(); // React Hook
    var a = location.pathname.split("/")
    return (
        <div>
             {(props.data!=null)?
            <ModifyBaggageForm data = {props.data.data} baggage = {a[a.length-1]} force = {props.force}></ModifyBaggageForm>
           
           
        :null}
       
        </div>
       
    );
};
