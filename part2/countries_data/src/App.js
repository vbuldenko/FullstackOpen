// Importing resourses
import { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';

// A functional component that displays the weather of the selected city
function Weather ({city, countryCode}) {
    const apiKey = 'd4d42d94cddee3952d8f0ad931e243e5';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&appid=${apiKey}`;
    let temperature = '';
    let wind = '';
    axios
        .get(url)
        .then(({data}) => {
            temperature = data.main.temp
            wind = data.wind.speed

            console.log(temperature)
            console.log(wind)
        })
        .catch(error => console.error('Error:', error));

    return (
        <div>
            <h1>Weather in {city}</h1>
            <p>temperature {temperature} Celcius</p>
            <p>wind {wind} m/s</p>
        </div>
    )
}

// A functional component that displays basic country data
function Country ({country}) {
    const [fullinfo, setFullinfo] = useState(false);

    function languageReturner () {
        const languages = [];

        for (let key in country.languages){
            languages.push(country.languages[key])
        }

        return languages.map(lang => <li key={lang}>{lang}</li>)
    }

    return ( !fullinfo ? <div>{country.name.common} <button onClick={() => setFullinfo(true)}>show</button></div>:
        <div>
            <div>
                <h1>{country.name.common}</h1>
                <button onClick={() => setFullinfo(false)}>hide</button>
            </div>
            <p>{`capital ${country.capital}`}</p>
            <p>{`area ${country.area}`}</p>
            <div><b>languages:</b><ul>{languageReturner()}</ul></div>
            <img src={country.flags.png} alt='flag of the country'/>
            <Weather city={country.capital} countryCode={country.cca2} />
        </div>
    )
}

// A functional component that renders a list of countries based on user input
function Countries ({countries, input}) {
    // If there are no countries to display, return null
    if (!countries) { 
        return null 
    }

    const message = <p>Too many matches, specify another filter</p>;

    // If the user has entered some text in the search box
    if (input.length > 0) {
        // Display the message if there are more than 10 countries or display the list of countries
        if (countries.length > 10) {
            return message;
        } else if (countries.length > 1 && countries.length <= 10){
            return countries.map(country => <Country key={country.name.common} country={country} />);
        } else if (countries.length === 1) {
            return <Country country={countries[0]} />;
        }
        
    }

}

// The main component
function App() {
    const [input, setInput] = useState('');
    const [countries, setCountries] = useState(null);
    const [filteredCountries, setFilteredCountries] = useState(null)
    
    // A function that updates the input state, and filters the list of countries based on the input
    function handleChange(event) {
        const {value} = event.target;
        setInput(value)
        setFilteredCountries(countries.filter(country => country.name.official.toLowerCase().includes(value)))
    }

    // A function for the useEffect hook to get the list of all countries when the component mounts for the first time
    function getCountriesInfo () {
        console.log("UseEffect run!")
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(({data}) => setCountries(data))
    }
    useEffect(getCountriesInfo, [])

    return (
        <div className="App">
            <div>find countries <input value={input} onChange={handleChange}></input></div>
            <Countries countries={filteredCountries} input={input} />
        </div>
    );
}

export default App;