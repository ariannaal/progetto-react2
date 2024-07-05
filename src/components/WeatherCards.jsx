import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

const WeatherCards = () => {
    const cities = [
        { name: 'London' },
        { name: 'New York' },
        { name: 'Sydney' }
    ];

    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const promises = cities.map(city =>
                    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=0b00253d99812c0b42696ce6a9ea61e9&units=metric`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(data => ({
                            id: data.id,
                            name: data.name,
                            temp: data.main.temp,
                            description: data.weather[0].description,
                            icon: data.weather[0].icon
                        }))
                );

                const weatherData = await Promise.all(promises);
                setWeatherData(weatherData);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, []);

    return (
        <div className="mt-4 d-flex flex-column align-items-center form-wrapper">
            <h2 className="text-center text my-4">Weather Forecast</h2>
            <div className="w-100 d-flex justify-content-center flex-wrap">
                {weatherData.map((weather) => (
                    <Card key={weather.id} className="custom-card m-3">
                        <Card.Body className="custom-card-body">
                            <Card.Title className="text-center fw-bold text-white mb-3">{weather.name}</Card.Title>
                            <Card.Text className="text-center text-white">{weather.temp} °C</Card.Text>
                            <Card.Text className="text-center text-white">{weather.description}</Card.Text>
                            <div className="text-center">
                                <img
                                    src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                                    alt="Weather Icon"
                                    className="weather-icon"
                                />
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default WeatherCards;