import { useEffect, useState } from "react";
import "./App.css";
import Weather from "./components/Weather";

function App() {
  const [coord, setCoord] = useState();
  
  useEffect(() => {
    //Set browser coordinates
    if (!coord && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoord({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      });
    }
  }, [coord]);

  return (
    <div className="page" >
      <p className="wear">מה לובשים עכשיו</p>
      {coord && <Weather coordinates={coord}></Weather>}
    </div>
  );
}

export default App;
