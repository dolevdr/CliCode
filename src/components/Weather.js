import { useEffect, useState } from "react";
import "./Weather.css";
import axios from "axios";

const Weather = (props) => {
  let [_weather, setWeather] = useState(null);

  let [precipitation, setPer] = useState(null);

  useEffect(()=>{
    getLocation(props.latitude, props.longitude);
  });

  async function getLocation(lat, long) {
    if (lat && long && !_weather) {
      const data_s = await axios.get(
        ` http://localhost:3001/weather/${lat}/${long}`
      );
      setWeather(await data_s.data.cur);
      //Sum first 24 cells in the returned precipitation array (each cell represent one hour)
      const sliced = data_s.data.pre.slice(0, 24);
      const p = sliced.reduce((a, b) => a + b, 0);
      setPer(p);
    }
  }

  return (
    <div style={{height:window.innerHeight*0.7}}>
      {_weather && (
        <div className="weather">
          <div style={{fontSize:'90px', fontWeight:'normal'}}>{_weather.temperature}&deg;</div>
          <p  >
            Long: {props.longitude} | Lat: {props.latitude}
          </p>
          <hr style={{ width:'90%'}}/>
          <div><b>המלצת היום</b></div>
          <div>
            {_weather.temperature > 22
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
