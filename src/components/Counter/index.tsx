"use client"
import { FC, useEffect, useState } from 'react'

interface CounterProps {
    description: string;
    defaultCounter: number
}


const Counter: FC<CounterProps> = ({description, defaultCounter}) => {
    const [counter, setCounter] = useState<number>(defaultCounter);
    const [incrementor, setIncrementor] = useState<number>(1)
    const [isBig, setBig] = useState(defaultCounter >= 15);

    // Solution 1 clean up useEffect to avoid memory leak
    // useEffect(() => {
    //     let id: NodeJS.Timeout;

    //     if(counter >= 15) {
    //         id = setTimeout(() => {
    //             setBig(true);
    //         }, 300)
    //     }

    //     return function cleanup() {
    //         clearTimeout(id);
    //     }
    // })

    // Solution 2 clean up useEffect to avoid memory leak
    useEffect(() => {
        let isMounted = true;

        if(counter >= 15) {
            setTimeout(() => {
                if(isMounted) setBig(true)
            }, 300)
        }

        return () => {
            isMounted = false;
        }
    })

    return ( 
        <div className="container">
            <h1 className="text-2xl leading font-bold">{description}</h1>
            <button className="bg-zinc-900 text-white py px-2 rounded mb-2" aria-label='reset' onClick={() => { 
                setCounter(prev => prev = 0);
                setIncrementor(1);
            }}>Reset</button>
            <br />
            <label>
                Incrementor:<input type="number" aria-label="inc-input" value={incrementor} onChange={(evt) => setIncrementor(parseInt(evt.target.value) || 0)} className="ml-1"/>
            </label>
            <div className="flex gap-4 items-center">
                <button aria-label="decrement" className="bg-black rounded text-white py-2 px-4" onClick={() => setCounter(prev => prev - incrementor)}>-</button>
                <p>Current count: {counter}</p>
                <button aria-label="increment" className="bg-black rounded text-white py-2 px-4" onClick={() => 
                setTimeout(() => {
                    setCounter(prev => prev + incrementor)
                }, 200)
                }
                >+</button>
            </div>

            {
                isBig ? null : <p>This is too small</p>
            }
        </div>
    );
}

export default Counter;