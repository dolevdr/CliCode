import { useEffect, useState } from "react";
import "./Weather.css";
import axios from "axios";
import LoadingSpinner from "./Loading/Loading";

const Weather = (props) => {
  let [weather, setWeather] = useState(null);
  let [city, setCity] = useState(null);
  let [load, setLoad] = useState(true);

  let [precipitation, setPer] = useState(null);

  useEffect(()=>{
    //Get data only once
    if (!weather) {
        getLocation(props.coordinates.lat, props.coordinates.long);
    
    }
  }, [weather, props]);

  async function getLocation(lat, long) {
      const data_s = await axios.get(
        ` http://localhost:3001/weather/${lat}/${long}`
      );

      //update current weather and city name from the response
      setLoad(false);
      setWeather(data_s.data.cur);
      setCity(data_s.data.city);

      //Sum first 24 cells in the returned precipitation array (each cell represent one hour)
      const p = data_s.data.pre.reduce((a, b) => a + b, 0);
      setPer(p);
    
  }

  return (
    <div style={{height:window.innerHeight*0.7}}>
        {load &&
        <LoadingSpinner></LoadingSpinner>

        }
      {weather && (
        <div className="weather">
          <div style={{fontSize:'90px', fontWeight:'normal'}}>{weather.temperature}&deg;</div>
        {city &&
          <p  >
                {/* Long: {props.coordinates.long} | Lat: {props.coordinates.lat}            */}
                {city.city}, {city.country}
          </p>
        }
          <hr style={{ width:'90%'}}/>
          <div><b>המלצת היום</b></div>
          <div>
            {weather.temperature > 22
              ? "לבוש קצר"
              : precipitation > 0
              ? "מעיל"
              : "לבוש ארוך"}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
