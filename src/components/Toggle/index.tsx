'use client';

import { useToggle } from "@/hooks/use-toggle/useToggle";

const Toggle = () => {
    
    const { value: isToggled, toggle } = useToggle();

    return ( 
        <div className="container">
            <h1 className="text-center text-1xl md:text-2xl font-bold">Toggle Component w/ Unit Testing</h1>
            <br />
            
            <button onClick={() => toggle()} className="bg-zinc-900 text-white rounded px-3 py-1 text-base uppercase">{ isToggled ? 'Close' : 'Toggle'}</button>
        
            {
                isToggled ? <p>Show content</p> : null
            }
        </div>
    );
}

export default Toggle;