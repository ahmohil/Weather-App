import { useState } from "react";
import "./App.css";
import Sidebar from '../src/Components/Sidebar.jsx';

function App() {
  const [weather, setWeather] = useState("");
 
  // Define a function to receive data from the child
  const handleDataFromChild = (data) => {
    setWeather(data);
    console.log("inside handle data");
  };

  const weatherDescriptions = {
    Clear: "The sky is clear and blue.",
    Sunny: "The sky is clear and the sun is shining.",
    Clouds: "The sky is partially covered by clouds.",
    Rain: "Raindrops are falling from the sky.",
    Drizzle: "Light rain is falling gently.",
    Thunderstorm: "There's a powerful thunderstorm in progress.",
    Snow: "Snowflakes are gently falling from the sky.",
    Mist: "A light mist is covering the landscape.",
    Smoke: "The air contains smoke particles.",
    Haze: "There's a slight haze in the air.",
    Dust: "Dust particles are floating in the air.",
    Fog: "Thick fog is reducing visibility.",
    Sand: "A sandstorm is sweeping through the area.",
    Ash: "Volcanic ash is filling the atmosphere.",
    Squall: "A strong wind squall is blowing.",
    Tornado: "A tornado is wreaking havoc.",
  };

  const cities = [ 'Karachi', 'Lahore', 'Faislabad', 'Gujranwala', 'Rawalpindi'];

  return (
    <main className="blur-image">
      <div
        className="grid lg:grid-cols-12 lg:gap-2
      md:grid-cols-8 md:gap-2
      sm:grid-cols-4 sm:gap-2
      min-h-full
      content"
      >



        <div className="md:col-span-3 lg:col-span-3 sm:col-span-4 p-10 border-solid md:border-r-2 lg:border-r-2 md:shadow-lg md:shadow-white-200/70 rounded-3xl">
        <Sidebar fetchData={handleDataFromChild}/>
         </div>

        <div className="lg:col-span-9 md:col-span-5 sm:col-span-4  md:pl-8 lg:pl-10 p-10 ">
          <div className="hidden md:block lg:block">
            <h2 className="text-lg leading-none font-medium tracking-widest"> National</h2>
            <h2 className="text-lg leading-none font-medium tracking-widest"> Weather</h2>
          </div>

          <div className="md:pt-20">
            <h3 className="hidden md:text-base md:font-normal"> Weather Forecast</h3>
          </div>
          {typeof weather.weather !== "undefined" ? (
            <div>
              <h1 className="text-lg pt-7 font-semibold">{weather.weather[0].main}</h1>
              <h1 className="text-4xl tracking-wide font-semibold">
                {weatherDescriptions[weather.weather[0].main]}
              </h1>
            </div>
          ) : (
            ""
          )}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5"></div>
        </div>
      </div>
    </main>
  );
}

export default App;
