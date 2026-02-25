export const getWeatherData = async () => {
  try {
    const res = await fetch(
      'https://pub-54904ef3b9374b6c9f80cf1763a31f5b.r2.dev/cc-datas/weather-data.json'
    );
    if (!res.ok) {
      console.log('Дата авахад алдаа гарлаа');
      return null;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Дата авахад алдаа гарлаа', error);
    return null;
  }
};

const parseWeather = (raw) => {
  const currentWeather = raw.current;

  const weatherForNextThreeDays = raw.forecast;

  const preciseForecastData = raw.forecast.forecastday;

  const getForecastData = preciseForecastData.map((data) => {
    const date = data.date;
    const time = data.hour;

    const tempEachHour = time.map((hour) => {
      const temps = hour.temp_c;
      return temps;
    });

    const sumOfTemp = tempEachHour.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    const avg = Number((sumOfTemp / 24).toFixed(1));

    const windEachHour = time.map((hour) => {
      const wind = hour.wind_kph;
      return wind;
    });
    const maxValueOfWind = Math.max(...windEachHour);

    const precipHourly = time.map((hour) => {
      const precip = hour.precip_mm;
      return precip;
    });

    const findTotalPrecip = precipHourly.reduce((acc, curr) => {
      return acc + curr;
    }, 0);

    const totalPrecip = Number(findTotalPrecip.toFixed(1));

    return {
      date: date,
      avgTemp: avg,
      maxWind: maxValueOfWind,
      precipTotal: totalPrecip,
    };
  });

  console.log(getForecastData);

  return currentWeather, weatherForNextThreeDays, getForecastData;
};

const weather = await getWeatherData();

parseWeather(weather);

console.log(parseWeather(weather));
