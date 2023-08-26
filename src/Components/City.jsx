import { fetchData } from "../api.jsx";
import { useEffect, useState } from "react";

function City({ city }) {
  const [weather, setWeather] = useState("");

  const fetch = async () => {
    setWeather(await fetchData(city));
  };

  useEffect(() => {
      fetch();
  },[])

  return (
    <section className="text-left rounded-b-sm mb-2 md:mt-0 mt-7 mx-2">
      <h2 className="md:text-5xl  md:font-thin font-light">
        {
            typeof weather.main !== 'undefined' ? Math.floor(weather.main.temp) + " °": ""}
      </h2>
      <h2 className="font-medium -tracking-tighter mt-2">{city}</h2>
    </section>
  );
}

export default City;
