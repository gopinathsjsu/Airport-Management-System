import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ModifyGateForm from "./modifygateform";
export default function ModifyGate(props){
    // window.location.reload(false);
    const location = useLocation(); // React Hook
    var a = location.pathname.split("/")
    return (
        <div>
             {(props.data!=null)?
             <ModifyGateForm data = {props.data.data} gate = {a[a.length-1]} force = {props.force}></ModifyGateForm>
           
           
        :null}
        </div>
       
    );
};