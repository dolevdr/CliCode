import { useEffect, useReducer, useMemo } from "react";
import "./Weather.css";
import axios from "axios";
import LoadingSpinner from "./Loading/Loading";

const domain = "http://localhost:3001";

const Weather = (props) => {
  const initialState = {
    weather: null,
    location: null,
    precipitation: null,
    load: true,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "setWeather":
        return { ...state, weather: action.payload };
      case "setLocation":
        return { ...state, location: action.payload };
      case "setPrecipitation":
        return { ...state, precipitation: action.payload };
      case "setLoad":
        return { ...state, load: false };
      default:
        return state;
    }
  };

  const { coordinates } = props;

  const [state, dispatch] = useReducer(reducer, initialState);

  const wearType = useMemo(() => {
    if (state.weather?.temperature > 22) return "לבוש קצר";
    else {
      if (state.precipitation > 0) return "מעיל";
      return "לבוש ארוך";
    }
  }, [state.weather?.temperature, state.precipitation]);

  useEffect(() => {
    //Get data only once
    if (!state.weather) {
      getLocation(coordinates.lat, coordinates.long);
    }
  }, [state.weather, coordinates]);

  async function getLocation(lat, long) {
    const data_s = await axios.get(
      `${domain}/weather/${lat}/${long}`
    );

    //update current weather and city name from the response
    dispatch({ type: "setWeather", payload: data_s.data.cur });
    dispatch({ type: "setLoad" });
    dispatch({ type: "setLocation", payload: data_s.data.location });

    //Get the precipitation amount in the last hour
    dispatch({ type: "setPrecipitation", payload: data_s.data.pre });
  }

  return (
    <div className="container">
      {state.load && <LoadingSpinner></LoadingSpinner>}
      {state.weather && (
        <div className="weather">
          <div className="temp">{state.weather.temperature}&deg;</div>
          {state.location && (
            <>
              {state.location.city}, {state.location.country}
            </>
          )}
          <hr className={"divider"} />
          <b>המלצת היום</b>
          <br />
          {wearType}
          <div dir="rtl">({state.precipitation} מ"מ)</div>
        </div>
      )}
    </div>
  );
};

export default Weather;
