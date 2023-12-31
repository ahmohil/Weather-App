export const geo_API_url =  'https://wft-geo-db.p.rapidapi.com/v1/geo';
const api = {
  base: "https://api.openweathermap.org/data/2.5/",
};

function fetchData(city) {
  return new Promise(async function (resolve, reject) {
    // do async thing
    const res = await fetch(
      `${api.base}weather?q=${city}&units=metric&APPID=${
        import.meta.env.VITE_API_KEY
      }`
    );
    // your custom code

    resolve(res.json());
  });
}

function coordinates(city) {
  return new Promise(async function (resolve, reject) {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${
        import.meta.env.VITE_API_KEY
      }`
    );

    resolve(res.json());
  });
}
async function airQuality(city) {
  const coords = await coordinates(city);
  console.log(coords[0].lon);
  const lat = coords[0].lat;
  const lon = coords[0].lon;
  console.log(coords[0].lat);

  return new Promise(async function (resolve, reject) {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_API_KEY
      }`
    );

    resolve(res.json());
  });
}

export const geoAPIOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '53baec7486mshc0fc6ba9395f7f9p1c6573jsn47f70261e3c4',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};


export { fetchData, airQuality };
