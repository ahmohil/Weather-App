import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "../src/Components/Sidebar.jsx";
import City from "./Components/City";
import Clock from "./Components/Clock";
import { weatherDescriptions, cities } from "./Components/descriptions";

function App() {
  const [weather, setWeather] = useState("");

  // Define a function to receive data from the child
  const handleDataFromChild = (data) => {
    setWeather(data);
    console.log(weather);
  };


  return (
    <main className="blur-image     overflow-scroll">
      <div
        className="grid lg:grid-cols-12 lg:gap-2
      md:grid-cols-8 md:gap-2
      sm:grid-cols-4 sm:gap-2
      md:min-h-full
      content
      backdrop-blur-sm
  "
      >
        <div className="md:col-span-3 lg:col-span-3 sm:col-span-4 p-10 border-solid md:border-r-2 lg:border-r-2 md:shadow-lg md:shadow-white-200/70 rounded-3xl">
          <Sidebar passToParent={handleDataFromChild} />
        </div>

        <div className="lg:col-span-9 md:col-span-5 sm:col-span-4  md:pl-8 lg:pl-10 p-10 ">
          <div className="flex flex-col md:h-full">
            <div className="hidden md:block lg:block">
              <h2 className="text-lg leading-none font-medium tracking-widest font-serif">
                {" "}
                National
              </h2>
              <h2 className="text-lg leading-none font-medium tracking-widest font-serif">
                {" "}
                Weather
              </h2>
            </div>

            <div className="md:pt-20">
              <h3 className="hidden md:block md:text-base md:font-normal">
                {" "}
                Weather Forecast
              </h3>
            </div>
            {typeof weather.weather !== "undefined" ? (
              <div>
                <h1 className="text-lg pt-7 font-semibold">
                  {weather.weather[0].main}
                </h1>
                <h1 className="text-4xl tracking-wide font-semibold">
                  {weatherDescriptions[weather.weather[0].main]}
                </h1>
                <div className="font-mono font-medium text-base flex mt-2">
                  {weather.sys.country}, <Clock cityName={weather.name} />
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="flex flex-row justify-between w-full md:mt-auto mt-7  flex-wrap">
              {cities.map((city) => (
                <City city={city} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
