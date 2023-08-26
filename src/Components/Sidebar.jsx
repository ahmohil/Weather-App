import { CiSearch } from "react-icons/ci";
import { WiThermometer, WiCloudy } from "react-icons/wi";
import { IoOpenOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import {airQuality, fetchData} from '../api.jsx';
import axios from "axios";

const airQualityStages = {
  1: "Air quality is considered good. Little to no risk to health. Suitable for outdoor activities.",
  2: "Air quality is acceptable. Moderate health concern for sensitive individuals. Unlikely to affect the general public.",
  3: "People with respiratory or heart conditions may be affected. Sensitive groups should limit outdoor exertion.",
  4: "Health effects possible for everyone. Sensitive groups may experience serious effects. Avoid outdoor activities.",
  5: "Serious health effects for everyone. Outdoor activities should be avoided. Sensitive groups should stay indoors.",
};


function Sidebar({passToParent}) {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [air_pollution, setAirPollution] = useState("");
  const [isError , setIsError] = useState(false);
  const [error, setError] = useState(null);

  const forecast = passToParent;

  const handleSubmit = async () => {
    setWeather(await fetchData(city))
    setAirPollution(await airQuality(city));
    forecast(await fetchData(city));
  };

 

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            console.log("INside try");
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            console.log(response)
            setCity(response.data.address.city);
            console.log(response.data.address.city)
          } catch (error) {
            console.log("inside catch")
            setError('Error fetching city name.');
          }
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }

    console.log(error);
  };

  useEffect(() => {
    fetchUserLocation();
  }, []);
  useEffect(() =>{
    if (city) {
      // Fetch weather data
      handleSubmit();
    }
  },[]);  // This will check on first render if the city is not null so get its weather

  return (
    <div className="flex flex-col md:h-full">
      {/* Top Div*/}
      <div>
        <div className="relative flex md:justify-center lg:block">
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white-400">
            <WiThermometer />
          </span>
          <input
            className="w-full border-t-0 border-l-0 border-r-0 border-b-2 border-white bg-transparent focus:border-blue-400 p-1 pl-8 pr-12 focus:outline-none  placeholder-white"
            type="search"
            placeholder="Enter City or Town"
            onChange={(e) => {
              setCity(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 md:text-center  focus:outline-none"
            onClick={handleSubmit}
          >
            <CiSearch className="text-xl text-white-400" />
          </button>
        </div>

        {
          /* Show weather */
          typeof weather.main !== "undefined"  ? (
            <div>
              <h2 className="text-7xl md:text-6xl pt-14 md:font-thin font-medium">
                {Math.floor(weather.main.temp) + " °"}
              </h2>
              <h2 className="text-right md:text-xs text-sm font-semibold">
                Wind: {weather.wind.speed + " mph"}
              </h2>
              <h2 className="flex text-center items-center font-semibold text-lg">
                <WiCloudy className=" mr-1" />
                {weather.clouds.all}%
              </h2>
            </div>
          ) : (
            ""
          )
        }
      </div>
      {/* Bottom Div*/}
      {typeof weather.main !== "undefined" &&
      typeof air_pollution.list !== "undefined" ? (
        <div className="md:mt-auto mt-8">
          <h2 className="font-bold md:font-semibold md:py-2 text-lg tracking-wider">
            {weather.name}, {weather.sys.country}
          </h2>
          <p>{airQualityStages[air_pollution.list[0].main.aqi]}</p>
        </div>
      ) : (
        ""
      )}

      
    </div>
  );
}
export default Sidebar;
