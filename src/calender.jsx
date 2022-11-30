import React, { useState } from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';


function MyApp() {
  const [value, onChange] = useState(new Date());
  function raisealert(){
    alert(value);
    return;
    }
  return (
    <div>
      <Calendar className={"calender"} onChange={onChange} value={value} />
      <button onClick={raisealert}>Submit</button>
    </div>
  );
}

export default MyApp;