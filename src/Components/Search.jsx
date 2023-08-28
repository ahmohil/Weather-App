import { AsyncPaginate } from "react-select-async-paginate"
import { useState } from "react";
import { geoAPIOptions, geo_API_url } from "../api";
const Search = ({onSearchChange}) =>{
    const [search, setSearch] = useState("");

    const handleChange = (searchData) =>{
        setSearch(searchData)
        onSearchChange(searchData)
    } 

    const loadOptions = async (inputValue) =>{
        try {
            console.log(inputValue)
            const response = await fetch(`${geo_API_url}/cities?minPopulation=10000&namePrefix=${inputValue}`, geoAPIOptions);
            console.log(response)
            const result = await response.json();
            //console.log(result);
            console.log(result.data)
            if( result.data.length == 0 ){
                const input = inputValue.slice(0, 1).toUpperCase() +  inputValue.slice(1);
                return{
                    options:[
                        {
                            value: `${input}`,
                            label: `${input}`
                        }
                    ]
                    }
                }
            
            console.log(result.data)
            return {
                options:result.data.map((city)=>{
                    return{
                        value: `${city.name}`,
                        label: `${city.name}, ${city.countryCode}`,
                    }
                }),
            };
        } catch (error) {
            console.error(error);
        }
    }

    return(
     
        <AsyncPaginate

            placeholder = "Enter City"
            debounceTimeout={700}
            value={search}
            onChange={handleChange}
            loadOptions={loadOptions}
            styles={{
                control: (baseStyles, state) => ({
                ...baseStyles,
                border: 'none',
                borderColor: state.isFocused ? 'orange' : 'red',
                ring: 0, // Remove the ring effect
                backgroundColor: 'transparent',
                paddingLeft: '1.4rem',
                }),
                option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isFocused ? '#3699FF' : null,
                    color: state.isFocused ? 'black' : null,
                    color: state.hover ? 'black' : null,
                    color:'black',
                }),
                }}
            />

    )

}

export default Search;
