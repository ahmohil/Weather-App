import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";

const Clock = ({ cityName }) => {
  const [currentTime, setCurrentTime] = useState(DateTime.local());
  const [timeZone, setTimezone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the timezone for the given city
    const fetchTimezoneOffset = async () => {
      try {
        setTimezone("");
        setLoading(true);
        const response = await fetch(
          `https://api.ipgeolocation.io/timezone?apiKey=${
            import.meta.env.VITE_CLOCK_API_KEY
          }&location=${cityName}`
        );
        const data = await response.json();
        setTimezone(data.timezone);
      } catch (error) {
        console.error("Error fetching timezone offset", error);
      }
    };

    fetchTimezoneOffset();
  }, [cityName]);

  useEffect(() => {
    // Update the current time based on the timezone
    const interval = setInterval(() => {
      if (timeZone != "") {
        setCurrentTime(DateTime.local({ zone: timeZone }));
        setLoading(false);
      } else {
        setLoading(true);
      }
    }, 1000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [timeZone]);

  return (
    <div>
      <p>
        {loading == true
          ? "Loading Time..."
          : currentTime.toFormat("hh:mm:ss a")}
      </p>
    </div>
  );
};

export default Clock;
