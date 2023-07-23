import { useState, useEffect } from "react"
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  
  useEffect(() => {
    const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`

    if (name) {
      axios.get(url)
        .then(({ data }) => setCountry({ 
            found: true,
            data: { 
              name: data.name.common,
              capital: data.capital,
              population: data.population,
              flag: data.flags.svg
            }
        }))
        .catch(error => {
          console.log(error)
          setCountry({ found:false })
        })
    }
  }, [name])

  return country
}

