import { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import iconWind from "../assets/images/wind-solid.svg";
import iconPressure from "../assets/images/temperature.svg";
import iconHumidity from "../assets/images/droplet-solid.svg";

function DetailPage() {
    const { lat, lon } = useParams();
    const [placeData, setPlaceData] = useState(null);

    useEffect(() => {
        const fetchPlaceWeather = () => {
            fetch(
                `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0b00253d99812c0b42696ce6a9ea61e9`
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Fetch dei dati:", data);
                    setPlaceData(data);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        };

        fetchPlaceWeather();
    }, [lat, lon]);

    const degrees = (kelvin) => {
        return Math.floor(kelvin - 273.15);
    };

    const convertUnixToDate = (dataUNIX) => {
        const date = new Date(dataUNIX * 1000);
        const options = { day: "numeric", month: "long", year: "numeric" };
        return date.toLocaleDateString("en-EN", options);
    };

    const iconUrl = (iconCode) => {
        return `http://openweathermap.org/img/w/${iconCode}.png`;
    };

    return (
        <div className="container-forecast">
            {placeData && (
                <div>
                    <h4 className="text">{convertUnixToDate(placeData.dt)}</h4>
                    <h2 className="text-center my-5 text">
                        {placeData.name}, {placeData.sys.country}
                    </h2>
                    <div className="d-flex justify-content-center align-items-center">
                        <img
                            src={iconUrl(placeData.weather[0].icon)}
                            alt="Weather Icon"
                            className="icon-weather"
                        />
                        <h3 className="text-center degrees text ms-3">
                            {degrees(placeData.main.temp)} °C
                        </h3>
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                        <p className="text-center text fw-bold me-2">
                            Max: {degrees(placeData.main.temp_max)} °C{" "}
                        </p>
                        <p className="text-center text fw-bold ms-2">
                            Min: {degrees(placeData.main.temp_min)} °C{" "}
                        </p>
                    </div>
                    {/* <h5 className="text-center mt-3 text">{placeData.weather[0].description}</h5> */}
                    {/* <Row className="mt-5 w-100">
                <Col  xs={12} sm={6} md={4}> */}

                    <div className="d-flex justify-content-center gap-5">
                        <Card className="custom-card">
                            <Card.Body className="custom-card-body">
                                <div className="d-flex">
                                    <Card.Title className="text text-center text-white">
                                        Wind
                                    </Card.Title>
                                    <img
                                        src={iconWind}
                                        alt="icon wind"
                                        className="icon-svg ms-1"
                                    />
                                </div>
                                <Card.Text className="text-center mt-3 text-white">
                                    {placeData.wind.speed} km/h
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card className="custom-card">
                            <Card.Body className="custom-card-body">
                                <div className="d-flex">
                                    <Card.Title className="text text-center text-white">
                                        Pressure
                                    </Card.Title>
                                    <img
                                        src={iconPressure}
                                        alt="icon wind"
                                        className="icon-svg ms-1"
                                    />
                                </div>
                                <Card.Text className="text-center mt-3 text-white">
                                    {placeData.main.pressure} hPa
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card className="custom-card">
                            <Card.Body className="custom-card-body">
                                <div className="d-flex">
                                    <Card.Title className="text text-center text-white">
                                        Humidity
                                    </Card.Title>
                                    <img
                                        src={iconHumidity}
                                        alt="icon wind"
                                        className="icon-svg ms-1"
                                    />
                                </div>
                                <Card.Text className="text-center mt-3 text-white">
                                    {placeData.main.humidity} %
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DetailPage;
