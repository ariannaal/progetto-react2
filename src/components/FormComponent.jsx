
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import WeatherCards from './WeatherCards';


function FormComponent() {
    const [searchPlace, setSearchPlace] = useState('');
    const [results, setResults] = useState([]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        console.log('ricerca per:', searchPlace);
        setResults([]);
    };

    useEffect(() => {
        const fetchPlaces = () => {
            if (searchPlace) {
                fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchPlace}&limit=10&appid=0b00253d99812c0b42696ce6a9ea61e9`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Fetch dei dati:', data);
                        setResults(data);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            }
        };

        fetchPlaces();
    }, [searchPlace]);

    const handleInputChange = (e) => {
        setSearchPlace(e.target.value);
        console.log('nuovo valore cercato:', e.target.value);
    };

    return (
        <div className="mt-4 d-flex flex-column align-items-center form-wrapper">
            <Form.Group className="w-100" style={{ maxWidth: '400px' }}>
                <Form.Control
                    className='form-control fw-bold'
                    style={{ textAlign: 'center' }}
                    type="search"
                    placeholder="Search a place"
                    value={searchPlace}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
            </Form.Group>
            {results.length > 0 && (
                <ListGroup className="w-100 mt-4 list-group" style={{ maxWidth: '400px' }}>
                    {results.map((result) => (
                        <Link
                            to={`/detail/${result.lat}/${result.lon}`}
                            className='list-group-item list-item'
                            key={result.lat}
                        >
                            {result.name}, {result.country}
                        </Link>
                    ))}
                </ListGroup>
            )}
            <WeatherCards />
        </div>
    );
}

export default FormComponent;