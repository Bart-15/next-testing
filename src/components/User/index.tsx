'use client'
import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

const User = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrMsg] = useState('');

    useEffect(() => {
        let isMounted = true;

        async function init() {
            setLoading(true);
            try {
                const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
                isMounted && setUsers(data);
            }catch(e) {
                if(e instanceof AxiosError) {
                    setErrMsg(e.response?.data.message)
                }
            }finally {
                setLoading(false);
            }
        }

        init();

        return () => {
            isMounted = false;
        }

    }, [])


    return ( 
        <div>
            <h1 className="text-center text-zinc-900 text-base md:text-2xl">User's</h1>
            { loading ? (<p className="text-center">Loading...</p>) : null }
            {
                users?.map((user: any) => {
                    return (<p key={user.id}>{user?.name}</p>)
                })
            }
        </div>
    );
}

export default User;