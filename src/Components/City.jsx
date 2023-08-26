import { fetchData } from "../api.jsx";
import { useEffect, useState } from "react";

function City({ city }) {
  const [weather, setWeather] = useState("");

  const fetch = async () => {
    setWeather(await fetchData(city));
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <section className="text-left rounded-b-sm mb-2 md:mt-0 mt-7 mx-2">
      <h2>
        {typeof weather.main !== "undefined" ? (
          <div className="font-extralight text-sm">
            <h3>
            <span className="font-normal">
            Feels like:
              </span> {weather.main.feels_like}°

            </h3>
            <div className="md:text-5xl  md:font-extralight text-xl font-light mt-3">
            
              {Math.floor(weather.main.temp)+ " °" }

            </div>
          </div>
        ) : (
          ""
        )}
      </h2>
      <h3 className=" font-medium text-lg -tracking-tighter mt-2">{city}</h3>
    </section>
  );
}

export default City;
