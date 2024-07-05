import { useEffect, useState } from 'react';

function FutureWeather({ lat, lon }) {
    const [forecastData, setForecastData] = useState([]);

    useEffect(() => {
        const fetchFuturetWeather = () => {
            fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=0b00253d99812c0b42696ce6a9ea61e9`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('future weather data:', data);
                    setForecastData(data.list);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };

        fetchFuturetWeather();
    }, [lat, lon]);

    const degrees = (kelvin) => {
        return Math.floor(kelvin - 273.15);
    }

    const getHours = (date) => {
        return ('0' + date.getHours()).slice(-2);
    };



    return (
        <div >
            <h2 className="text-center text my-5">Future Weather</h2>
            <div className="d-flex justify-content-center flex-wrap">
                {forecastData.map((forecast, index) => (
                    <div key={index} className='card custom-card m-2'>
                        <div className='card-body custom-card-body'>

                            <p className='text-center text-white'>
                                {getHours(new Date(forecast.dt * 1000))}
                            </p>
                            <p className='text-center text-white fw-bold'>
                                {degrees(forecast.main.temp)} °C
                            </p>
                            <p className='text-center text-white'>
                                {forecast.weather[0].description}
                            </p>
                            <img
                                src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
                                alt="Weather Icon"
                                className='d-block mx-auto'
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FutureWeather;