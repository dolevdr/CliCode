import { useEffect, useState } from "react";
import "./App.css";
import Weather from "./components/Weather";

function App() {
  let [lat, setLat] = useState(null);
  let [long, setLong] = useState(null);

  const pageStyle = {
    background: "linear-gradient(to left,#140152, #22007C)",
    width: "100%",
    height: window.innerHeight,
  };
  useEffect(() =>{
    if(!lat || !long){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
          },
          function (error) {
            console.log(error);
          }
        );
      }

    }

  }, [lat, long]);

  return (
    <div className="page" style={pageStyle}>
      <p style={{fontSize:'50px', fontWeight:'lighter'}}>מה לובשים עכשיו</p>
      {lat && long && <Weather latitude={lat} longitude={long}></Weather>}
    </div>
  );
}

export default App;
