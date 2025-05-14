"use client"
import { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate';
import './SearchBar.css';
import { GEO_API_URL, geoApiOptions } from '../../api';

const SearchBar = ({onSearchChange}) => {
    const [city, setCity] = useState(null);

    const loadOptions = (inputValue) => {
            return fetch(`${GEO_API_URL}/cities?namePrefix=${inputValue}`, geoApiOptions)
            .then((response) => response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value:`${city.latitude} ${city.longitude}`,
                            label:`${city.name}, ${city.countryCode}`,
                        }
                    })
                }
            })
            .catch(err => {
                console.error(err);
                return { options: [] };
            });
    };

    const handleOnChange = (searchData) => {
        setCity(searchData);
        onSearchChange(searchData);
    }
  return (
    <AsyncPaginate
        placeholder="Enter City Here..."
        debounceTimeout={600}
        value={city}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        className='search-bar'
    />
  )
}

export default SearchBar;
