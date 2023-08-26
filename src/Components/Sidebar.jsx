import { CiSearch } from "react-icons/ci";
import { WiThermometer, WiCloudy } from "react-icons/wi";
import { IoOpenOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
const airQualityStages = {
  1: "Air quality is considered good. Little to no risk to health. Suitable for outdoor activities.",
  2: "Air quality is acceptable. Moderate health concern for sensitive individuals. Unlikely to affect the general public.",
  3: "People with respiratory or heart conditions may be affected. Sensitive groups should limit outdoor exertion.",
  4: "Health effects possible for everyone. Sensitive groups may experience serious effects. Avoid outdoor activities.",
  5: "Serious health effects for everyone. Outdoor activities should be avoided. Sensitive groups should stay indoors.",
};

const api = {
  base: 'https://api.openweathermap.org/data/2.5/',
};


function Sidebar({ fetchData }) {
  const [city, setCity] = useState("");
  const [cityFromInput,setCityFromInput] = useState(""); 
  const [weather, setWeather] = useState("");
  const [air_pollution, setAirPollution] = useState("");

  useEffect(() => {
    if (city) {
      // Fetch weather data
      fetch(`${api.base}weather?q=${city}&units=metric&APPID=${import.meta.env.VITE_API_KEY}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });

      // Fetch geo data and air pollution data
      fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${import.meta.env.VITE_API_KEY}`)
        .then((res) => res.json())
        .then((result) => {
          const lat = result[0].lat;
          const lon = result[0].lon;

          fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}`)
            .then((res) => res.json())
            .then((result) => {
              setAirPollution(result);
            })
            .catch((error) => {
              console.error("Fetch error:", error);
            });
        });
    }
  }, [city]);

  const handleSubmit = () => {
    // Set the city state to trigger the useEffect
    setCity(cityFromInput);
  };

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
              setCityFromInput(e.target.value);
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
          typeof weather.main !== "undefined" &&
          typeof air_pollution.list !== "undefined" ? (
            <div>
              <h2 className="text-7xl md:text-6xl pt-14 md:font-thin font-medium">
                {Math.floor(weather.main.temp) + " °"}
              </h2>
              <h2 className="text-right md:text-xs text-lg font-semibold">
                Wind: {weather.wind.speed + " mph"}
              </h2>
              <h2 className="flex text-center items-center font-semibold text-lg">
                <WiCloudy className=" mr-1" />
                {weather.clouds.all}%
              </h2>
              {/* 
              <h2>Max: {weather.main.temp_max + " °C"}</h2>
              <h2>Min: {weather.main.temp_min + " °C"}</h2>

              <h2>Direction: {weather.wind.deg + " °"}</h2>

              <div className="flex flex-row items-center">
                <h1>Air Quality: {air_pollution.list[0].main.aqi}</h1>
                <a
                  href="https://openweathermap.org/api/air-pollution"
                  target="_blank"
                  className="ml-2"
                >
                  <IoOpenOutline />
                </a>
              </div>
            */}
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
            {weather.name}
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
