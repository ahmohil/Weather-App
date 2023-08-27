import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

const Clock = ({ cityName }) => {
  const [currentTime, setCurrentTime] = useState(DateTime.local());
  const [timezoneOffset, setTimezoneOffset] = useState(0);
  const [timeZone, setTimezone] = useState('');

  useEffect(() => {
    // Fetch the timezone offset for the given city
    const fetchTimezoneOffset = async () => {
      try {
        const response = await fetch(`https://api.ipgeolocation.io/timezone?apiKey=c98cdbd8e0bf4afb87b8d0a30fa2bad7&location=${cityName}`);
        const data = await response.json();
        console.log(data);
        setTimezoneOffset(data.timezone_offset);
        setTimezone(data.timezone);
      } catch (error) {
        console.error('Error fetching timezone offset', error);
      }
    };

    fetchTimezoneOffset();
  }, [cityName]);

  useEffect(() => {
    // Update the current time based on the timezone offset
    const interval = setInterval(() => {
      setCurrentTime(DateTime.local({ zone: timeZone }));
    }, 1000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [timezoneOffset]);

  return (
    <div>
      <p>{currentTime.toFormat('hh:mm:ss a')}</p>
    </div>
  );
};

export default Clock;
