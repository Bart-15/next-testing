'use client'
import { useState } from 'react';
import { CountryTypes } from "@/type/country";
import useSWR from 'swr';
import { ApiError } from '@/type/ApiError';

const CarBrands = () => {
    const [country, setCountry] = useState<CountryTypes>("Germany")

    const buttons = ['Germany', 'France', 'Italy'];

    const { isValidating, error, data: cars } = useSWR<string[], ApiError>(`/api/cars?query=${country}`)
    
    return ( 
        <div>
            <h1 className="text-1xl md:text-2xl font-bold mb-2">Car App</h1>
            <div className='container flex flex-row gap-2'>
                {
                    buttons.map((button, idx) => <button className="text-white bg-zinc-900 px-3 rounded" key={idx}  onClick={() => setCountry(button as CountryTypes)}>{button}</button>)
                }
            </div>
            { isValidating && !error ? (<p>Loading...</p>) : null}
            { error ? (<p className="text-red-700">{error.message}</p>) : null}
            
            <p className="font-bold text-1xl my-6">Car Brands from {country}</p>
            <ul className="list-none w-36">
                {
                    !cars?.length && !isValidating && !error  ? (<div className="text-gray-900">No data to show...</div>) : cars?.map((car, idx) => (
                        <li key={idx}>
                            {car}
                        </li>   
                    ))
                }
            </ul>
        </div>
    );
}

export default CarBrands;