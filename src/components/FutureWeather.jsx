import { useEffect, useState } from 'react';

function FutureWeather({ lat, lon }) {
    const [forecastData, setForecastData] = useState([]);

    useEffect(() => {
        const fetchFutureWeather = () => {
            fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=0b00253d99812c0b42696ce6a9ea61e9`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Future weather data:', data);
                    setForecastData(data.list);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };

        fetchFutureWeather();
    }, [lat, lon]);

    const degrees = (kelvin) => {
        return Math.floor(kelvin - 273.15);
    };

    const getHours = (date) => {
        return ('0' + date.getHours()).slice(-2);
    };

    const groupForecastByDay = () => {
        const groupedForecasts = {};

        forecastData.forEach(forecast => {
            const date = new Date(forecast.dt * 1000);
            const day = date.getDate();

            if (!groupedForecasts[day]) {
                groupedForecasts[day] = [];
            }

            groupedForecasts[day].push(forecast);
        });

        return groupedForecasts;
    };

    const groupedForecasts = groupForecastByDay();

    return (
        <div>
            <h2 className="text-center text my-5">Future Weather</h2>
            {Object.keys(groupedForecasts).map(day => (
                <div key={day} className="row mb-3">
                    <div className="col">
                        <div className="card future-card">
                            <div className="card-body custom-card-body d-flex">
                                <h5 className="card-title text-white text-center mb-4">
                                    {new Date(groupedForecasts[day][0].dt * 1000).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                                </h5>
                                {groupedForecasts[day].map((forecast, index) => (
                                    <div key={index} className="mb-3 single-fw">
                                        <p className="text-center text-white">
                                            {getHours(new Date(forecast.dt * 1000))}:00
                                        </p>
                                        <p className="text-center text-white fw-bold">
                                            {degrees(forecast.main.temp)} °C
                                        </p>
                                        <p className="text-center text-white">
                                            {forecast.weather[0].description}
                                        </p>
                                        <img
                                            src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
                                            alt="Weather Icon"
                                            className="d-block mx-auto"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FutureWeather;