import { useEffect, useState } from "react";
import "./App.css";
import Weather from "./components/Weather";

function App() {
  
  let [coord, setCoord] = useState(null);

  const pageStyle = {
    background: "linear-gradient(to right,#22007C,#140152)",
    width: "100%",
    height: window.innerHeight,
  };
  useEffect(() => {
    //Set browser coordinates
    if (!coord) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoord({lat:position.coords.latitude, long:position.coords.longitude})
            
          },
          function (error) {
            console.log(error);
          }
        );
      }
    }
  }, [coord]);

  return (
    <div className="page" style={pageStyle}>
      <p style={{ fontSize: "50px", fontWeight: "lighter" }}>מה לובשים עכשיו</p>
      {coord && <Weather coordinates={coord}></Weather>}
    </div>
  );
}

export default App;
