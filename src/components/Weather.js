import { useEffect, useReducer, useMemo } from "react";
import "./Weather.css";
import axios from "axios";
import LoadingSpinner from "./Loading/Loading";


//Domain of the server
const domain = "http://localhost:3001";

//Constants for the reducer types
const FetchData = "FetchData";
const Load = "Load";
const Error = "Error";


const Weather = () => {

  //Reducer init
  const initialState = {
    weather: null,
    location: null,
    precipitation: null,
    load: true,
  };

  //Define reducer action
  const reducer = (state, action) => {
    switch (action.type) {
      case Load:
        return { ...state, load: true };
      case FetchData:
        return {
          location: action.payload.location,
          load: false,
          precipitation: action.payload.precipitation,
          weather: action.payload.weather,
        };
      case Error:
        return { msg: "Error in fetching" };
      default:
        return state;
    }
  };


  const [state, dispatch] = useReducer(reducer, initialState);

  


  //Display what to wear according the result
  const wearType = useMemo(() => {
    if (state.weather?.temperature > 22) return "לבוש קצר";
    else {
      if (state.precipitation > 0) return "מעיל";
      return "לבוש ארוך";
    }
  }, [state.weather?.temperature, state.precipitation]);

  
  useEffect(() => {
    //Get browser coordinates and get data
    if (!state.weather && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        getLocation(position.coords.latitude, position.coords.longitude);
        
      });
    }
   
  }, [state.weather]);
  async function getLocation(lat, long) {
    const data_s = await axios.get(`${domain}/weather/${lat}/${long}`);

    //update current weather and city name from the response
    if (data_s.status === 200){

      dispatch({
        type: FetchData,
        payload: {
          weather: data_s.data.cur,
          location: data_s.data.location,
          precipitation: data_s.data.pre,
        },
      });
    }else {
      dispatch({
        type: Error
      });
    }
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

          {/* Next line show precipitation */}
          {/* <div dir="rtl">({state.precipitation} מ"מ)</div> */}
        </div>
      )}
    </div>
  );
};

export default Weather;
